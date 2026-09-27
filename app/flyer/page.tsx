import './flyer.css'

function PaintworksLogo() {
  return (
    <a className="flyer-logo" href="#contact" aria-label="Hudson Valley Paintworks">
      <span className="logo-region">HUDSON VALLEY</span>
      PAINTWORKS
      <span>FINE PAINTING &amp; DESIGN</span>
    </a>
  )
}

export default function FlyerPage() {
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
          <p>Careful interior and exterior painting for homes, businesses, and hospitality spaces—plus cabinet refinishing, murals, and decorative finishes.</p>
        </div>
      </section>

      <section className="flyer-contact">
        <div>
          <p className="flyer-contact-label">CALL FOR A FREE ESTIMATE</p>
          <a className="flyer-phone" href="tel:+15188474071">1 518 847 4071</a>
        </div>
        <div className="flyer-qr-block">
          <p className="flyer-contact-label">SCAN TO EXPLORE</p>
          <img src="/qr-code-paintworks-correct.png" alt="QR code linking to Hudson Valley Paintworks" />
        </div>
        <div className="flyer-contact-bottom">
          <PaintworksLogo />
          <span>FINE PAINTING / DESIGN / MURALS</span>
        </div>
      </section>
    </main>
  )
}
