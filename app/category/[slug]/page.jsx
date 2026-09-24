import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryFromSlug, categoryLabel, fetchFreshStories, normalizeCategory } from '../../../lib/news';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = categoryFromSlug(slug);
  if (!resolved) return {};

  return {
    title: `${categoryLabel(resolved)} खबरें`,
    description: `${categoryLabel(resolved)} की ताज़ा खबरें और वाराणसी-काशी की लाइव कवरेज।`,
    alternates: { canonical: `${siteUrl}/category/${slug}` }
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categoryFromSlug(slug) || normalizeCategory(slug) || '';
  if (!category) notFound();

  const stories = await fetchFreshStories(category);

  return (
    <>
      <header className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand" aria-label="Kashi Live News 24 home">
            <span className="brand-mark">क</span>
            <span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span>
          </Link>
          <Link href="/" className="icon-btn" aria-label="Home">⌂</Link>
        </div>
      </header>

      <main className="page-shell">
        <div className="shell page-body">
          <div className="content-column">
            <section className="story-section">
              <div className="section-head">
                <h1>{categoryLabel(category)} खबरें</h1>
                <Link href="/">← होम पर जाएं</Link>
              </div>

              {stories.length ? (
                <div className="news-grid">
                  {stories.map((story) => (
                    <article className="card" key={story.slug}>
                      {story.image ? <Image src={story.image} alt={story.imageAlt || story.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" /> : null}
                      <div className="card-body">
                        <div className="kicker">{categoryLabel(story.category)} · {story.location}</div>
                        <Link href={`/news/${story.slug}`}><h2>{story.title}</h2></Link>
                        <p>{story.excerpt}</p>
                        <div className="meta">
                          {story.publishedAt} · {story.isOriginal ? 'Kashi Live News 24' : `स्रोत: ${story.source || story.author || 'बाहरी प्रकाशक'}`}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="empty">आज {categoryLabel(category)} की सत्यापित खबर उपलब्ध नहीं है।</p>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}