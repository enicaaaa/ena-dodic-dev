// src/app/sitemap.ts

import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/posts'
import { SITE } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllPostSlugs()

  const postUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE.url}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/speaking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/now`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postUrls,
  ]
}
