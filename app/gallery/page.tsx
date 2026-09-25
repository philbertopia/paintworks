import Link from 'next/link'
import '../globals.css'

const artwork = [
  { image: '/images/artwork-geometric-navy-rose.png', title: 'Geometric Study', meta: 'Original painting / mixed media', alt: 'Original geometric abstract painting in navy, rose, cream, and ochre' },
  { image: '/images/artwork-blush-mixed-media.png', title: 'Blush + Umber', meta: 'Original painting / mixed media', alt: 'Original blush pink and umber mixed-media painting' },
  { image: '/images/artwork-soft-landscape.png', title: 'Soft Landscape', meta: 'Original painting / oil and texture', alt: 'Original gestural landscape painting in sage, blue, clay, and lavender' },
  { image: '/images/landscape-river-valley.png', title: 'River Valley', meta: 'Hudson Valley study / original painting', alt: 'Hudson River Valley-inspired painting with layered mountains and a broad river' },
  { image: '/images/landscape-wide-river.png', title: 'Open Water', meta: 'Hudson Valley study / original painting', alt: 'Hudson River Valley-inspired painting of a wide river between green hills' },
  { image: '/images/landscape-autumn-valley.png', title: 'Autumn Light', meta: 'Hudson Valley study / original painting', alt: 'Hudson River Valley-inspired autumn landscape painting' },
  { image: '/images/landscape-dusk-hudson.png', title: 'Dusk on the Hudson', meta: 'Hudson Valley study / original painting', alt: 'Hudson River Valley-inspired dusk landscape painting with a rose sky' },
  { image: '/images/artwork-golden-retriever.png', title: 'Good Dog', meta: 'Animal portrait / original painting', alt: 'Original painted portrait of a golden retriever' },
  { image: '/images/artwork-black-white-cat.png', title: 'Quiet Observer', meta: 'Animal portrait / original painting', alt: 'Original painted portrait of a black-and-white cat' },
  { image: '/images/artwork-hudson-fox.png', title: 'Fox in the Meadow', meta: 'Wildlife study / original painting', alt: 'Original painted portrait of a red fox in a Hudson Valley meadow' },
  { image: '/images/artwork-family-garden.png', title: 'Garden Portrait', meta: 'Family portrait / original painting', alt: 'Original painted family portrait in a warm garden' },
  { image: '/images/artwork-siblings-under-tree.png', title: 'Under the Tree', meta: 'Family portrait / original painting', alt: 'Original painted portrait of two siblings under a tree' },
]

export default function GalleryPage() {
  return <main className="gallery-page">
    <header className="site-header">
      <Link className="logo" href="/"><span className="logo-region">HUDSON VALLEY</span> PAINTWORKS<span>FINE PAINTING & DESIGN</span></Link>
      <nav><Link href="/">Home</Link><Link href="/#services">Painting</Link><Link href="/gallery">Gallery</Link><Link href="/#color">Color + Design</Link></nav>
      <a className="header-phone" href="tel:+15188474071">Call for a free estimate · 1 518 847 4071</a>
      <Link className="header-cta" href="/#contact">Get a free estimate <span>↗</span></Link>
    </header>
    <section className="gallery-page-intro section-pad">
      <div className="section-label">Gallery / Original artwork</div>
      <div className="gallery-page-heading"><h1>A ROOM<br />FOR <i>GOOD ART.</i></h1><div><p className="gallery-page-lead">Hudson Valley landscapes, abstract studies, and artwork made to be lived with.</p><p>A growing collection of original paintings by Philip Hardy and artists we admire. Every piece is available for inquiry, consultation, framing, and thoughtful installation.</p><Link className="button dark" href="/#contact">Ask about a piece <span>↗</span></Link></div></div>
    </section>
    <section className="gallery-page-grid section-pad" aria-label="Artwork for sale">{artwork.map((item, index) => <article className={index === 0 ? 'gallery-art-card gallery-art-card-feature' : 'gallery-art-card'} key={item.image}><div className="gallery-art-image"><img src={item.image} alt={item.alt} /></div><div className="gallery-art-meta"><span>0{index + 1}</span><div><h2>{item.title}</h2><p>{item.meta}</p></div><Link href="/#contact" aria-label={`Ask about ${item.title}`}>↗</Link></div></article>)}</section>
    <section className="gallery-page-services section-pad"><div><div className="section-label">Art / Installation + care</div><h2>FROM THE FIRST <i>YES</i><br />TO THE LAST NAIL.</h2></div><div><p>Art belongs to the room around it. We can help with sourcing, scale, color, framing, finish carpentry, patching, restoration, and careful installation.</p><Link className="button light" href="/#contact">Talk about an artwork <span>↗</span></Link></div></section>
    <footer><Link className="logo" href="/"><span className="logo-region">HUDSON VALLEY</span> PAINTWORKS<span>FINE PAINTING & DESIGN</span></Link><p>Kingston · Woodstock · Saugerties · Rhinebeck<br />Red Hook · New Paltz · Hudson Valley</p><p><a href="tel:+15188474071">Call for a free estimate<br />1 518 847 4071 ↗</a><br />© 2026 Hudson Valley Paintworks<br /><Link href="/#contact">Send an inquiry ↗</Link></p></footer>
  </main>
}
