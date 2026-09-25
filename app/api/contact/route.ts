import { NextResponse } from 'next/server'

const text = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!)

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const name = text(body?.name)
  const email = text(body?.email)
  const phone = text(body?.phone)
  const location = text(body?.location)
  const service = text(body?.service)
  const message = text(body?.message)

  if (text(body?.website)) return NextResponse.json({ ok: true })
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter your name, a valid email, and a project message.' }, { status: 400 })
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'Please keep your message a little shorter.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL
  const from = process.env.RESEND_FROM_EMAIL || 'Hudson Valley Paintworks <onboarding@resend.dev>'
  if (!apiKey || !to) return NextResponse.json({ error: 'The contact form is not configured yet.' }, { status: 503 })

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'User-Agent': 'hardy-paintworks-contact-form' },
    body: JSON.stringify({
      from, to: [to], reply_to: email, subject: `New Hudson Valley Paintworks inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nLocation: ${location || 'Not provided'}\nService: ${service || 'General inquiry'}\n\nMessage:\n${message}`,
      html: `<h2>New Hudson Valley Paintworks inquiry</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
<p><strong>Location:</strong> ${escapeHtml(location || 'Not provided')}</p>
<p><strong>Service:</strong> ${escapeHtml(service || 'General inquiry')}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    }),
  })

  if (!response.ok) return NextResponse.json({ error: 'We could not send your message right now. Please call us directly.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
