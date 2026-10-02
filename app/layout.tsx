import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://paintworks-nine.vercel.app'),
  title: 'Hudson Valley Painters | Interior, Exterior & Mural Painting',
  description: 'Hudson Valley Paintworks provides residential and commercial interior painting, exterior painting, cabinet refinishing, murals, and decorative finishes in Kingston, Rhinebeck, Woodstock, and surrounding Hudson Valley towns.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Hudson Valley Painters | Hudson Valley Paintworks',
    description: 'Residential and commercial painting, cabinet refinishing, murals, and decorative finishes throughout the Hudson Valley.',
    url: 'https://paintworks-nine.vercel.app',
    siteName: 'Hudson Valley Paintworks',
    images: [
      {
        url: '/images/upstate-exterior-repaint.png',
        width: 1200,
        height: 630,
        alt: 'Hudson Valley Paintworks Fine Painting',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hudson Valley Painters | Hudson Valley Paintworks',
    description: 'Residential and commercial painting, cabinet refinishing, murals, and decorative finishes throughout the Hudson Valley.',
    images: ['/images/upstate-exterior-repaint.png'],
  },
}
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': 'https://paintworks-nine.vercel.app/#business',
  name: 'Hudson Valley Paintworks',
  description: 'Fine residential and commercial painting, decorative finishes, custom murals, and architectural color design in the Hudson Valley.',
  url: 'https://paintworks-nine.vercel.app',
  email: 'hudsonvalleypaintworks@proton.me',
  image: 'https://paintworks-nine.vercel.app/images/upstate-exterior-repaint.png',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Kingston, NY' },
    { '@type': 'AdministrativeArea', name: 'Rhinebeck, NY' },
    { '@type': 'AdministrativeArea', name: 'Woodstock, NY' },
    { '@type': 'AdministrativeArea', name: 'Saugerties, NY' },
    { '@type': 'AdministrativeArea', name: 'Red Hook, NY' },
    { '@type': 'AdministrativeArea', name: 'New Paltz, NY' },
    { '@type': 'AdministrativeArea', name: 'Hudson Valley, NY' },
  ],
  serviceType: [
    'Fine Interior Painting',
    'Historic Exterior Painting',
    'Custom Wall Murals',
    'Cabinet Refinishing',
    'Architectural Color Consultation',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hudson Valley Paintworks',
  url: 'https://paintworks-nine.vercel.app',
  publisher: { '@id': 'https://paintworks-nine.vercel.app/#business' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
