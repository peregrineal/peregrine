import type { MetadataRoute } from 'next'

import { CANONICAL_URL as BASE, pathForSlug } from '@/lib/constants'
import { getPayloadClient } from '@/lib/data'
import { LOCALES } from '@/lib/i18n'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'pages',
      where: { _status: { equals: 'published' } },
      pagination: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    })
    // One entry per page and language, each listing its other language versions.
    return docs.flatMap((d) => {
      const languages = Object.fromEntries(LOCALES.map((l) => [l, `${BASE}${pathForSlug(d.slug, l)}`]))
      return LOCALES.map((l) => ({
        url: languages[l],
        lastModified: d.updatedAt,
        priority: d.slug === 'home' ? 1 : 0.7,
        alternates: { languages },
      }))
    })
  } catch {
    return [{ url: BASE, priority: 1 }]
  }
}
