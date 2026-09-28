import { put } from '@vercel/blob'
import sharp from 'sharp'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILES = 3
const MAX_FILE_BYTES = 4 * 1024 * 1024
const MAX_TOTAL_BYTES = 9 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const text = (value: FormDataEntryValue | null) => typeof value === 'string' ? value.trim() : ''

function hasValidSignature(buffer: Buffer, type: string) {
  if (type === 'image/jpeg') return buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  if (type === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  if (type === 'image/webp') return buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP'
  return false
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: 'Please submit the form again.' }, { status: 400 })

  const name = text(form.get('name'))
  const email = text(form.get('email'))
  const location = text(form.get('location'))
  const service = text(form.get('service'))
  const message = text(form.get('message'))
  const honeypot = text(form.get('website'))
  const files = form.getAll('photos').filter((value): value is File => value instanceof File && value.size > 0)

  if (honeypot) return NextResponse.json({ ok: true })
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter your name, a valid email, and a project message.' }, { status: 400 })
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'Please keep your message a little shorter.' }, { status: 400 })
  }
  if (files.length > MAX_FILES) return NextResponse.json({ error: 'Please upload no more than three photos.' }, { status: 400 })
  if (files.some((file) => !ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES)) {
    return NextResponse.json({ error: 'Photos must be JPG, PNG, or WebP files under 4 MB each.' }, { status: 400 })
  }

  const outgoing = new FormData()
  outgoing.set('name', name)
  outgoing.set('email', email)
  outgoing.set('location', location)
  outgoing.set('service', service)
  outgoing.set('message', message)
  outgoing.set('_subject', `New Hudson Valley Paintworks inquiry from ${name}`)
  outgoing.set('_replyto', email)
  outgoing.set('_captcha', 'true')
  outgoing.set('_honey', '')

  let outgoingBytes = 0
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    const source = Buffer.from(await file.arrayBuffer())
    if (!hasValidSignature(source, file.type)) {
      return NextResponse.json({ error: 'One of the uploaded files is not a valid image.' }, { status: 400 })
    }

    try {
      const optimized = await sharp(source)
        .rotate()
        .resize({ width: 3000, height: 3000, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer()
      outgoingBytes += optimized.byteLength
      if (outgoingBytes > MAX_TOTAL_BYTES) {
        return NextResponse.json({ error: 'Please keep the uploaded photos under 10 MB total.' }, { status: 400 })
      }
      await put(`contact-uploads/${crypto.randomUUID()}.jpg`, optimized, { access: 'private', contentType: 'image/jpeg', addRandomSuffix: false })
      outgoing.append('attachment', new Blob([optimized], { type: 'image/jpeg' }), `project-photo-${index + 1}.jpg`)
    } catch {
      return NextResponse.json({ error: 'One of the photos could not be processed. Please try another image.' }, { status: 400 })
    }
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) return NextResponse.json({ error: 'The contact form is not configured yet.' }, { status: 503 })

  const response = await fetch(`https://formsubmit.co/${encodeURIComponent(contactEmail)}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: outgoing,
  })

  if (!response.ok) return NextResponse.json({ error: 'We could not send your message right now. Please try again through the form.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
