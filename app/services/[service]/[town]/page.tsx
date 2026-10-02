import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '../../services.css'

type PageParams = { service: string; town: string }

const pages = {
  'interior-painting/kingston-ny': {
    title: 'Interior Painters in Kingston, NY',
    description: 'Thoughtful interior painting for Kingston homes, historic properties, and renovated weekend houses by Hudson Valley Paintworks.',
    eyebrow: 'Kingston / Interior painting',
    intro: 'Color, preparation, and finish for rooms that feel considered.',
    body: 'We paint walls, ceilings, trim, doors, and built-ins with a careful eye for the architecture. Every project begins with surface preparation and a conversation about light, materials, and how the rooms connect.',
    details: ['Historic homes and apartments', 'Whole-home and room-by-room painting', 'Trim, doors, built-ins, and cabinetry', 'Color consultation and finish selection'],
    image: '/images/completed-interior-painting.png',
    alt: 'Completed warm interior painting project with painted walls and built-ins',
  },
  'cabinet-refinishing/rhinebeck-ny': {
    title: 'Cabinet Refinishing in Rhinebeck, NY',
    description: 'Furniture-like cabinet refinishing for Rhinebeck kitchens, built-ins, and millwork by Hudson Valley Paintworks.',
    eyebrow: 'Rhinebeck / Cabinet refinishing',
    intro: 'A new surface for the pieces that shape the room.',
    body: 'Cabinet refinishing can change a kitchen without replacing its best bones. We prepare, repair, prime, and finish cabinetry by hand or spray for a durable, even result that works with the home’s architecture.',
    details: ['Kitchen cabinets and islands', 'Built-ins, doors, and millwork', 'Color matching and palette development', 'Durable sprayed or hand-finished surfaces'],
    image: '/images/completed-cabinet-refinishing.png',
    alt: 'Completed kitchen with deep blue refinished cabinetry',
  },
  'custom-murals/woodstock-ny': {
    title: 'Custom Murals in Woodstock, NY',
    description: 'Site-specific murals, hand-painted graphics, and custom art for Woodstock homes, hospitality spaces, and creative businesses.',
    eyebrow: 'Woodstock / Murals + custom art',
    intro: 'A wall can hold an idea, a landscape, or a little strangeness.',
    body: 'We develop murals around the character of a room and the people who will live or work with it. From botanical and landscape motifs to playful storefront graphics, each piece is designed, drawn, and painted for its place.',
    details: ['Residential feature walls', 'Restaurant and hospitality murals', 'Storefront graphics and signage', 'Concept development, color, and installation'],
    image: '/images/completed-botanical-bird-mural.png',
    alt: 'Completed hand-painted botanical and bird mural',
  },
  'historic-exterior-painting/rhinebeck-ny': {
    title: 'Historic Exterior Painting in Rhinebeck, NY',
    description: 'Careful exterior painting and color planning for Rhinebeck Victorian and historic homes by Hudson Valley Paintworks.',
    eyebrow: 'Rhinebeck / Historic exterior painting',
    intro: 'Exterior color that respects the house and its setting.',
    body: 'Older homes ask for patience: sound preparation, thoughtful color relationships, and careful work around trim, porches, shutters, and weathered details. We help create an exterior that feels rooted in the village and right for the light.',
    details: ['Victorian and historic homes', 'Exterior color consultation', 'Trim, shutters, doors, and porch details', 'Surface preparation and durable finish systems'],
    image: '/images/rhinebeck-victorian-exterior.png',
    alt: 'Painted Victorian village home with blue-green siding and cream trim',
  },
  'commercial-painting/woodstock-ny': {
    title: 'Commercial Painting in Woodstock, NY',
    description: 'Interior painting, storefront graphics, and murals for Woodstock hospitality, retail, and creative businesses.',
    eyebrow: 'Woodstock / Commercial painting',
    intro: 'A good space tells people where they are.',
    body: 'We help hospitality spaces, shops, studios, and creative businesses make a clear impression through color and finish. Work is planned around access, sequencing, durability, and the details customers notice first.',
    details: ['Restaurants, inns, and retail spaces', 'Storefronts and hand-painted graphics', 'Feature walls and murals', 'Color direction and finish coordination'],
    image: '/images/cat-mural-detail-black-cat.png',
    alt: 'Finished hand-painted storefront mural detail with a black cat',
  },
} as const

export function generateStaticParams(): PageParams[] {
  return Object.keys(pages).map((key) => {
    const [service, town] = key.split('/')
    return { service, town }
  })
}

async function getPage(params: Promise<PageParams>) {
  const { service, town } = await params
  return pages[`${service}/${town}` as keyof typeof pages]
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const page = await getPage(params)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/services/${(await params).service}/${(await params).town}` },
    openGraph: { title: page.title, description: page.description, images: [{ url: page.image, alt: page.alt }] },
  }
}

export default async function ServiceTownPage({ params }: { params: Promise<PageParams> }) {
  const { service, town } = await params
  const page = pages[`${service}/${town}` as keyof typeof pages]
  if (!page) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'Hudson Valley Paintworks', url: 'https://paintworks-nine.vercel.app' },
    areaServed: { '@type': 'City', name: town.replace(/-ny$/, '').replaceAll('-', ' ') },
    image: `https://paintworks-nine.vercel.app${page.image}`,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://paintworks-nine.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: page.title, item: `https://paintworks-nine.vercel.app/services/${service}/${town}` },
    ],
  }

  return (
    <main className="service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <header className="service-page-header">
        <Link className="service-page-logo" href="/">HUDSON VALLEY PAINTWORKS</Link>
        <Link className="service-page-back" href="/#contact">Start a project ↗</Link>
      </header>
      <section className="service-page-hero">
        <div>
          <p className="service-page-eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="service-page-intro">{page.intro}</p>
          <Link className="service-page-button" href="/#contact">Talk about your project <span>↗</span></Link>
        </div>
        <img src={page.image} alt={page.alt} />
      </section>
      <section className="service-page-content">
        <div><p className="service-page-label">A considered finish</p><h2>Made for the <i>place</i> it belongs to.</h2></div>
        <div><p>{page.body}</p><ul>{page.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
      </section>
      <footer className="service-page-footer"><Link href="/">Hudson Valley Paintworks</Link><Link href="/#contact">Send an inquiry ↗</Link></footer>
    </main>
  )
}
