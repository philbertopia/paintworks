import { put } from '@vercel/blob'
import sharp from 'sharp'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILES = 3
const MAX_FILE_BYTES = 8 * 1024 * 1024
const MAX_TOTAL_BYTES = 20 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const text = (value: FormDataEntryValue | null) => typeof value === 'string' ? value.trim() : ''
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!)

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
  if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) {
    return NextResponse.json({ error: 'Please keep all uploaded photos under 20 MB total.' }, { status: 400 })
  }
  if (files.length && !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Photo uploads are not configured yet. Please submit without photos or try again later.' }, { status: 503 })
  }

  const attachments: { filename: string; content: string }[] = []
  const storedPhotos: string[] = []

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'Photos must be JPG, PNG, or WebP files under 8 MB each.' }, { status: 400 })
    }

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
      const pathname = `contact-uploads/${crypto.randomUUID()}.jpg`
      await put(pathname, optimized, { access: 'private', contentType: 'image/jpeg', addRandomSuffix: false })
      storedPhotos.push(pathname)
      attachments.push({ filename: `project-photo-${index + 1}.jpg`, content: optimized.toString('base64') })
    } catch {
      return NextResponse.json({ error: 'One of the photos could not be processed. Please try another image.' }, { status: 400 })
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL
  const from = process.env.RESEND_FROM_EMAIL || 'Hudson Valley Paintworks <onboarding@resend.dev>'
  if (!apiKey || !to) return NextResponse.json({ error: 'The contact form is not configured yet.' }, { status: 503 })

  const photoText = storedPhotos.length ? `\nPrivate photo uploads: ${storedPhotos.join(', ')}` : ''
  const photoHtml = storedPhotos.length ? `<p><strong>Private photo uploads:</strong> ${storedPhotos.length} attached image${storedPhotos.length === 1 ? '' : 's'}</p>` : ''
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'User-Agent': 'hardy-paintworks-contact-form' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New Hudson Valley Paintworks inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nLocation: ${location || 'Not provided'}\nService: ${service || 'General inquiry'}${photoText}\n\nMessage:\n${message}`,
      html: `<h2>New Hudson Valley Paintworks inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Location:</strong> ${escapeHtml(location || 'Not provided')}</p><p><strong>Service:</strong> ${escapeHtml(service || 'General inquiry')}</p>${photoHtml}<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
      attachments,
    }),
  })

  if (!response.ok) return NextResponse.json({ error: 'We could not send your message right now. Please try again through the form.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
