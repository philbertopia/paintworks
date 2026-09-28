import Link from 'next/link'
import type { Metadata } from 'next'
import '../globals.css'
import './gallery.css'

export const metadata: Metadata = {
  title: 'Paintworks Gallery | Hudson Valley Original Art',
  description: 'Original paintings from Philip Hardy and artists connected to the Hudson Valley, including landscapes, abstract studies, portraits, and animal artwork.',
  alternates: { canonical: '/gallery' },
}

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

const gallerySections = [
  { id: 'abstract', title: 'Abstract + mixed media', intro: 'Layered color, gesture, and texture for rooms that want a point of view.', items: artwork.slice(0, 3) },
  { id: 'landscapes', title: 'Hudson Valley landscapes', intro: 'Painted studies of river, field, weather, and the particular light of this place.', items: artwork.slice(3, 7) },
  { id: 'portraits', title: 'Portraits + animals', intro: 'Personal paintings made to keep a person, animal, or feeling close.', items: artwork.slice(7) },
]

export default function GalleryPage() {
  return <main className="gallery-page">
    <header className="site-header">
      <Link className="logo" href="/"><span className="logo-region">HUDSON VALLEY</span> PAINTWORKS<span>FINE PAINTING &amp; DESIGN</span></Link>
      <nav><Link href="/">Home</Link><Link href="/#services">Painting</Link><Link href="/gallery">Gallery</Link></nav>
      <Link className="header-cta" href="/#contact">Ask about a piece <span>↗</span></Link>
    </header>
    <section className="gallery-page-intro section-pad">
      <div className="section-label">Paintworks Gallery / Original artwork</div>
      <div className="gallery-page-heading"><h1>ART FROM<br />THE <i>VALLEY.</i></h1><div><p className="gallery-page-lead">Original paintings from Philip Hardy and artists connected to the Hudson Valley.</p><p>Landscapes, abstract studies, portraits, and animal paintings selected to be lived with. Ask about availability, framing, color, and thoughtful installation.</p><Link className="button dark" href="/#contact">Ask about a piece <span>↗</span></Link></div></div>
    </section>
    <div className="gallery-collections">{gallerySections.map((section, sectionIndex) => <section className="gallery-collection" id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}><div className="gallery-collection-heading"><div><div className="section-label">Collection / 0{sectionIndex + 1}</div><h2 id={`${section.id}-heading`}>{section.title}</h2></div><p>{section.intro}</p></div><div className="gallery-page-grid">{section.items.map((item, index) => <article className={index === 0 ? 'gallery-art-card gallery-art-card-feature' : 'gallery-art-card'} key={item.image}><div className="gallery-art-image"><img src={item.image} alt={item.alt} loading={sectionIndex === 0 && index === 0 ? 'eager' : 'lazy'} /></div><div className="gallery-art-meta"><span>{String(sectionIndex * 4 + index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.meta}</p><Link className="gallery-art-inquiry" href="/#contact">Ask about this piece ↗</Link></div></div></article>)}</div></section>)}</div>
    <section className="gallery-painting-cta section-pad"><div><div className="section-label">Paintworks / House painting</div><h2>GOOD ART<br />NEEDS A <i>GOOD ROOM.</i></h2></div><div><p>Paintworks also creates thoughtful interiors, exteriors, murals, and finishes for Hudson Valley homes and businesses.</p><Link className="button dark" href="/#services">Explore house painting <span>↗</span></Link></div></section>
    <section className="gallery-page-services section-pad"><div><div className="section-label">Art / Installation + care</div><h2>FROM THE FIRST <i>YES</i><br />TO THE LAST NAIL.</h2></div><div><p>Art belongs to the room around it. We can help with sourcing, scale, color, framing, finish carpentry, patching, restoration, and careful installation.</p><Link className="button light" href="/#contact">Talk about an artwork <span>↗</span></Link></div></section>
    <footer><Link className="logo" href="/"><span className="logo-region">HUDSON VALLEY</span> PAINTWORKS<span>FINE PAINTING &amp; DESIGN</span></Link><p>Kingston · Woodstock · Saugerties · Rhinebeck<br />Red Hook · New Paltz · Hudson Valley</p><p>© 2026 Hudson Valley Paintworks<br /><Link href="/#contact">Send an inquiry ↗</Link></p></footer>
  </main>
}
