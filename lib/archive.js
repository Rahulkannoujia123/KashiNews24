import { connectMongo } from './db';
import News from '../server/models/News';

function toArchiveDoc(story) {
  return {
    title: story.title,
    slug: story.slug,
    excerpt: story.excerpt || story.title,
    content: story.content || story.excerpt || story.title,
    featuredImage: story.image || '',
    imageAlt: story.imageAlt || story.title,
    category: story.category || 'Varanasi',
    location: story.location || 'Varanasi',
    tags: story.tags || ['वाराणसी'],
    author: story.author || story.source || 'External source',
    authorName: story.authorName || story.source || 'External source',
    isOriginal: Boolean(story.isOriginal),
    isFeatured: Boolean(story.isFeatured),
    isBreaking: Boolean(story.isBreaking),
    seoTitle: story.seoTitle || story.title,
    seoDescription: story.seoDescription || story.excerpt || story.title,
    summary: story.excerpt || story.title,
    source: story.source || 'External source',
    sourceName: story.source || 'External source',
    sourceUrl: story.sourceUrl || '',
    status: 'Published',
    publishedAt: story.publishedAtISO ? new Date(story.publishedAtISO) : new Date(),
    updatedAt: story.updatedAtISO ? new Date(story.updatedAtISO) : new Date(),
  };
}

function fromDoc(doc) {
  if (!doc) return null;
  const published = doc.publishedAt ? new Date(doc.publishedAt) : null;
  const updated = doc.updatedAt ? new Date(doc.updatedAt) : published;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt || doc.summary || doc.title,
    content: doc.content || doc.excerpt || doc.title,
    category: doc.category,
    location: doc.location || 'Varanasi',
    author: doc.author,
    authorName: doc.authorName,
    source: doc.sourceName || doc.source,
    sourceUrl: doc.sourceUrl || '',
    image: doc.featuredImage || '',
    imageAlt: doc.imageAlt || doc.title,
    tags: doc.tags || [],
    isOriginal: Boolean(doc.isOriginal),
    isFeatured: Boolean(doc.isFeatured),
    isBreaking: Boolean(doc.isBreaking),
    publishedAtISO: published && !Number.isNaN(published.getTime()) ? published.toISOString() : '',
    updatedAtISO: updated && !Number.isNaN(updated.getTime()) ? updated.toISOString() : '',
    publishedAt: published && !Number.isNaN(published.getTime()) ? new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(published) : '',
    updatedAt: updated && !Number.isNaN(updated.getTime()) ? new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(updated) : '',
  };
}

export async function archiveStories(stories = []) {
  if (!stories.length || !MONGODB_URI()) return 0;
  try {
    await connectMongo();
    let saved = 0;
    for (const story of stories) {
      if (!story?.sourceUrl) continue;
      const doc = toArchiveDoc(story);
      const result = await News.updateOne(
        { sourceUrl: story.sourceUrl },
        { $set: doc, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
      );
      if (result.upsertedCount || result.modifiedCount) saved += 1;
    }
    return saved;
  } catch (error) {
    console.error('[KashiNews24] archiveStories failed:', error?.message || error);
    return 0;
  }
}

function MONGODB_URI() {
  return process.env.MONGODB_URI;
}

export async function findArchivedStory(slug) {
  if (!slug || !process.env.MONGODB_URI) return null;
  try {
    await connectMongo();
    return fromDoc(await News.findOne({ slug, status: 'Published' }).lean());
  } catch (error) {
    console.error('[KashiNews24] findArchivedStory failed:', error?.message || error);
    return null;
  }
}

export async function searchArchivedStories(query = '', limit = 60) {
  if (!process.env.MONGODB_URI) return [];
  try {
    await connectMongo();
    const term = String(query || '').trim();
    const filter = { status: 'Published' };
    if (term) {
      filter.$text = { $search: term };
    }
    const docs = await News.find(filter)
      .sort({ publishedAt: -1 })
      .limit(Math.min(Number(limit) || 60, 100))
      .lean();
    return docs.map(fromDoc);
  } catch (error) {
    console.error('[KashiNews24] searchArchivedStories failed:', error?.message || error);
    return [];
  }
}

export async function listArchivedStories({ category = '', page = 1, limit = 24 } = {}) {
  if (!process.env.MONGODB_URI) return { items: [], total: 0 };
  try {
    await connectMongo();
    const filter = { status: 'Published' };
    if (category) filter.category = category;
    const safeLimit = Math.min(Math.max(Number(limit) || 24, 1), 60);
    const safePage = Math.max(Number(page) || 1, 1);
    const [docs, total] = await Promise.all([
      News.find(filter).sort({ publishedAt: -1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
      News.countDocuments(filter),
    ]);
    return { items: docs.map(fromDoc), total };
  } catch (error) {
    console.error('[KashiNews24] listArchivedStories failed:', error?.message || error);
    return { items: [], total: 0 };
  }
}
