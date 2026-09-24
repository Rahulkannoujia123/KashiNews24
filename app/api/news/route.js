import { NextResponse } from 'next/server';
import { fetchFreshStories, normalizeCategory } from '../../../lib/news';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().slice(0, 100).toLowerCase();
  const categoryParam = (searchParams.get('category') || '').trim().slice(0, 40);
  const category = normalizeCategory(categoryParam) || '';
  const location = (searchParams.get('location') || '').trim().slice(0, 80).toLowerCase();
  const stories = await fetchFreshStories(category || '');
  const items = stories.filter((story) => {
    const searchable = `${story.title} ${story.excerpt} ${story.location} ${story.category} ${(story.tags || []).join(' ')}`.toLowerCase();
    return (!q || searchable.includes(q))
      && (!category || normalizeCategory(story.category) === category)
      && (!location || story.location?.toLowerCase() === location);
  });

  return NextResponse.json({
    source: process.env.GNEWS_API_KEY && process.env.USE_GNEWS !== 'false' ? 'GNews API + Google News RSS fallback' : 'Google News RSS',
    language: 'hi',
    query: q || category || 'वाराणसी काशी बनारस',
    items,
    total: items.length
  }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' }
  });
}
