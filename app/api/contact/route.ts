import sharp from 'sharp'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILES = 3
const MAX_FILE_BYTES = 4 * 1024 * 1024
const MAX_TOTAL_BYTES = 9 * 1024 * 1024
const MAX_REQUEST_BYTES = 10 * 1024 * 1024 + 512 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const ALLOWED_ORIGINS = new Set(['https://paintworks-nine.vercel.app', 'http://localhost:3000'])
const RATE_WINDOW_MS = 60 * 1000
const RATE_LIMIT = 5
const attempts = new Map<string, { count: number; resetAt: number }>()

const text = (value: FormDataEntryValue | null) => typeof value === 'string' ? value.trim() : ''

function hasValidSignature(buffer: Buffer, type: string) {
  if (type === 'image/jpeg') return buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  if (type === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  if (type === 'image/webp') return buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP'
  return false
}

function json(data: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: { 'Cache-Control': 'no-store', ...(init?.headers ?? {}) },
  })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: 'This form can only be submitted from the Paintworks website.' }, { status: 403 })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'Please keep the total upload under 10 MB.' }, { status: 413 })
  }

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const clientKey = forwardedFor || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const current = attempts.get(clientKey)
  if (!current || current.resetAt <= now) {
    if (attempts.size > 2000) {
      attempts.forEach((entry, key) => {
        if (entry.resetAt <= now) attempts.delete(key)
      })
    }
    attempts.set(clientKey, { count: 1, resetAt: now + RATE_WINDOW_MS })
  } else {
    current.count += 1
    if (current.count > RATE_LIMIT) {
      return json({ error: 'Too many submissions. Please wait a minute and try again.' }, {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)) },
      })
    }
  }

  const form = await request.formData().catch(() => null)
  if (!form) return json({ error: 'Please submit the form again.' }, { status: 400 })

  const name = text(form.get('name'))
  const email = text(form.get('email'))
  const location = text(form.get('location'))
  const service = text(form.get('service'))
  const message = text(form.get('message'))
  const honeypot = text(form.get('website'))
  const files = form.getAll('attachment').filter((value): value is File => value instanceof File && value.size > 0)

  if (honeypot) return json({ ok: true })
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({ error: 'Please enter your name, a valid email, and a project message.' }, { status: 400 })
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return json({ error: 'Please keep your message a little shorter.' }, { status: 400 })
  }
  if (files.length > MAX_FILES) return json({ error: 'Please upload no more than three photos.' }, { status: 400 })
  if (files.some((file) => !ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES)) {
    return json({ error: 'Photos must be JPG, PNG, or WebP files under 4 MB each.' }, { status: 400 })
  }

  let outgoingBytes = 0
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    const source = Buffer.from(await file.arrayBuffer())
    if (!hasValidSignature(source, file.type)) {
      return json({ error: 'One of the uploaded files is not a valid image.' }, { status: 400 })
    }

    let optimized: Buffer
    try {
      optimized = await sharp(source)
        .rotate()
        .resize({ width: 3000, height: 3000, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer()
    } catch {
      return json({ error: 'One of the photos could not be processed. Please try another image.' }, { status: 400 })
    }

    outgoingBytes += optimized.byteLength
    if (outgoingBytes > MAX_TOTAL_BYTES) {
      return json({ error: 'Please keep the uploaded photos under 10 MB total.' }, { status: 400 })
    }

    void index
  }

  return json({ ok: true })
}
