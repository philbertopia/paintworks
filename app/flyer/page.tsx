import './flyer.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Hudson Valley Paintworks Flyer',
  robots: { index: false, follow: false },
}

function PaintworksLogo() {
  return (
    <a className="flyer-logo" href="#contact" aria-label="Hudson Valley Paintworks">
      <span className="logo-region">HUDSON VALLEY</span>
      PAINTWORKS
      <span>FINE PAINTING &amp; DESIGN</span>
    </a>
  )
}

export default async function FlyerPage() {
  const host = (await headers()).get('host') ?? ''
  if (host && !host.startsWith('localhost') && !host.startsWith('127.0.0.1')) notFound()

  return (
    <main className="flyer-page">
      <section className="flyer-header">
        <PaintworksLogo />
      </section>

      <section className="flyer-work" aria-label="Completed painting and mural work">
        <div className="flyer-work-main">
          <img src="/images/completed-botanical-bird-mural.png" alt="Completed hand-painted botanical mural" />
        </div>
        <div className="flyer-work-side">
          <img src="/images/completed-interior-painting.png" alt="Completed interior painting project" />
          <img src="/images/completed-decorative-finish.png" alt="Completed decorative wall finish" />
        </div>
      </section>

      <section className="flyer-message">
        <h1>Painting with an artist&apos;s eye.</h1>
        <div className="flyer-service-copy">
          <strong>RESIDENTIAL + COMMERCIAL PAINTING</strong>
          <p>Careful interior and exterior painting for homes, businesses, and hospitality spaces. We handle thoughtful surface preparation, color consultation, clean lines, cabinet refinishing, murals, and decorative finishes from start to final detail.</p>
        </div>
      </section>

      <section className="flyer-contact">
        <div className="flyer-qr-block">
          <p className="flyer-contact-label">SCAN TO CONTACT</p>
          <img src="/qr-code-paintworks-correct.png" alt="QR code linking to Hudson Valley Paintworks" />
        </div>
      </section>
    </main>
  )
}
