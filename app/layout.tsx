import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hardypaintworks.com'),
  title: 'Hudson Valley Paintworks — Fine Painting & Design | Hudson Valley, NY',
  description: 'Fine painting, decorative finishes, custom murals, and architectural color design led by an MFA artist. Serving Kingston, Rhinebeck, Woodstock, and the Hudson Valley.',
  openGraph: {
    title: 'Hudson Valley Paintworks — Fine Painting & Design',
    description: 'Fine painting, decorative finishes, custom murals, and architectural color design led by an MFA artist in the Hudson Valley.',
    url: 'https://hardypaintworks.com',
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
}
  /*
  title: 'Hudson Valley Paintworks — Fine Painting & Design',
  description: 'Fine painting, decorative finishes, murals, color design and artistic services throughout the Hudson Valley.',
}

  */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Hudson Valley Paintworks',
  description: 'Fine residential and commercial painting, decorative finishes, custom murals, and architectural color design in the Hudson Valley.',
  telephone: '+1-518-847-4071',
  email: 'hudsonvalleypaintworks@proton.me',
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
