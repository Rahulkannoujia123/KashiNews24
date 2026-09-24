import { fetchFreshStories } from '../../lib/news'
import { SITE } from '../../lib/site'

export const revalidate = 900

function escapeXml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  let pool = []
  try {
    pool = await fetchFreshStories('')
  } catch {
    pool = []
  }

  const items = pool
    .map((story) => {
      const link = `${SITE.url}/news/${story.slug}`
      const date = story.publishedISO ? new Date(story.publishedISO).toUTCString() : ''
      return `    <item>
      <title>${escapeXml(story.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(story.excerpt)}</description>
      <category>${escapeXml(story.category)}</category>
      ${date ? `<pubDate>${date}</pubDate>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>hi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=900, stale-while-revalidate=1800',
    },
  })
}
