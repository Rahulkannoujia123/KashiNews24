import { NextResponse } from 'next/server';
import { fetchFreshStories } from '../../../lib/news';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const q = (searchParams.get('q') || '').trim().toLowerCase();
	const category = searchParams.get('category')?.trim().toLowerCase();
	const location = searchParams.get('location')?.trim().toLowerCase();
	const stories = await fetchFreshStories(category || '');
	const items = stories.filter((story) => {
		const searchable = `${story.title} ${story.excerpt} ${story.location} ${story.category}`.toLowerCase();
		return (!q || searchable.includes(q))
			&& (!category || story.category.toLowerCase() === category)
			&& (!location || story.location.toLowerCase() === location);
	});

	return NextResponse.json({
		source: process.env.GNEWS_API_KEY ? 'GNews API' : 'Dainik Bhaskar fallback',
		language: 'hi',
		query: q || category || 'वाराणसी काशी बनारस',
		items,
		total: items.length
	});
}
