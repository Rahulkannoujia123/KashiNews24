import { fetchFreshStories } from '../lib/news';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

export default async function sitemap() {
  const stories = await fetchFreshStories();
  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    { url: `${siteUrl}/contact`, lastModified: new Date() },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${siteUrl}/terms`, lastModified: new Date() },
    { url: `${siteUrl}/disclaimer`, lastModified: new Date() },
    { url: `${siteUrl}/editorial-policy`, lastModified: new Date() },
    { url: `${siteUrl}/correction-policy`, lastModified: new Date() },
    { url: `${siteUrl}/advertise`, lastModified: new Date() },
    { url: `${siteUrl}/search`, lastModified: new Date() },
    ...stories.map((story) => ({
      url: `${siteUrl}/news/${story.slug}`,
      ...(story.publishedAtISO && Number.isFinite(Date.parse(story.publishedAtISO)) ? { lastModified: new Date(story.publishedAtISO) } : {})
    }))
  ];
}
