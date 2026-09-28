import type { MetadataRoute } from 'next'

const siteUrl = 'https://paintworks-nine.vercel.app'
const servicePages = [
  'interior-painting/kingston-ny',
  'cabinet-refinishing/rhinebeck-ny',
  'custom-murals/woodstock-ny',
  'historic-exterior-painting/rhinebeck-ny',
  'commercial-painting/woodstock-ny',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...servicePages.map((page) => ({ url: `${siteUrl}/services/${page}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
