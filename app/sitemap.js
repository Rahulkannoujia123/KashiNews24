import { fetchFreshStories, CATEGORY_OPTIONS, areas } from '../lib/news';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';
const slugify = (value='') => String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

export default async function sitemap() {
  const stories = await fetchFreshStories();
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now },
    { url: `${siteUrl}/search`, lastModified: now },
    { url: `${siteUrl}/social`, lastModified: now },
    ...['about','contact','privacy-policy','terms','disclaimer','editorial-policy','correction-policy','advertise'].map((path) => ({ url: `${siteUrl}/${path}`, lastModified: now })),
    ...CATEGORY_OPTIONS.map((category) => ({ url: `${siteUrl}/category/${slugify(category)}`, lastModified: now })),
    ...areas.map((area) => ({ url: `${siteUrl}/location/${slugify(area)}`, lastModified: now })),
    ...stories.map((story) => ({
      url: `${siteUrl}/news/${story.slug}`,
      ...(story.publishedAtISO && Number.isFinite(Date.parse(story.publishedAtISO)) ? { lastModified: new Date(story.publishedAtISO) } : {})
    }))
  ];
}
