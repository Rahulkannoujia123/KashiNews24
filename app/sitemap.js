import { fetchFreshStories } from '../lib/news'
import { SITE, CATEGORIES, LEGAL_LINKS, categoryHref } from '../lib/site'

export const revalidate = 900

export default async function sitemap() {
  const base = SITE.url
  const now = new Date()

  const staticRoutes = [
    { url: `${base}/`, changeFrequency: 'hourly', priority: 1 },
    { url: `${base}/send-news`, changeFrequency: 'monthly', priority: 0.5 },
    ...LEGAL_LINKS.map((link) => ({
      url: `${base}${link.href}`,
      changeFrequency: 'yearly',
      priority: 0.3,
    })),
  ].map((route) => ({ ...route, lastModified: now }))

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${base}${categoryHref(category)}`,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 0.7,
  }))

  let storyRoutes = []
  try {
    const pool = await fetchFreshStories('')
    storyRoutes = pool.map((story) => ({
      url: `${base}/news/${story.slug}`,
      lastModified: story.updatedISO || story.publishedISO || now,
      changeFrequency: 'daily',
      priority: 0.8,
    }))
  } catch {
    storyRoutes = []
  }

  return [...staticRoutes, ...categoryRoutes, ...storyRoutes]
}
