import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from './ShareButtons';
import { categoryLabel, fetchFreshStories, getStory, toCategoryRoute } from '../../../lib/news';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

export async function generateMetadata({ params }) {
  const liveStories = await fetchFreshStories();
  const story = getStory((await params).slug, liveStories);

  return story ? {
    title: story.seoTitle || story.title,
    description: (story.seoDescription || story.excerpt || story.title).slice(0, 160),
    alternates: { canonical: `${siteUrl}/news/${story.slug}` },
    openGraph: {
      title: story.seoTitle || story.title,
      description: story.seoDescription || story.excerpt,
      url: `${siteUrl}/news/${story.slug}`,
      type: 'article',
      publishedTime: story.publishedAtISO,
      modifiedTime: story.updatedAtISO || story.publishedAtISO,
      ...(story.image ? { images: [{ url: story.image, alt: story.imageAlt || story.title }] } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: story.seoTitle || story.title,
      description: story.seoDescription || story.excerpt,
      images: [story.image]
    },
    robots: { index: true, follow: true }
  } : { title: 'खबर उपलब्ध नहीं', robots: { index: false, follow: false } };
}

export default async function Article({ params }) {
  const liveStories = await fetchFreshStories();
  const story = getStory((await params).slug, liveStories);
  if (!story) notFound();

  const related = liveStories.filter((item) => item.slug !== story.slug).slice(0, 3);
  const latest = liveStories.slice(0, 5);
  const canonicalUrl = `${siteUrl}/news/${story.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.title,
    description: story.excerpt,
    ...(story.image ? { image: [story.image] } : {}),
    articleSection: story.category,
    keywords: story.tags || [story.category, story.location],
    author: { '@type': 'Organization', name: story.isOriginal ? 'Kashi Live News 24' : (story.authorName || story.author || story.source || 'Kashi Live News 24') },
    publisher: { '@type': 'Organization', name: 'Kashi Live News 24' },
    mainEntityOfPage: canonicalUrl,
    ...(story.publishedAtISO ? { datePublished: story.publishedAtISO, dateModified: story.updatedAtISO || story.publishedAtISO } : {}),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'होम', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: categoryLabel(story.category), item: `${siteUrl}${toCategoryRoute(story.category)}` },
        { '@type': 'ListItem', position: 3, name: story.title, item: canonicalUrl }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} />
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
        <div className="shell article-layout">
          <article className="article-page">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">होम</Link>
              <span> / </span>
              <Link href={toCategoryRoute(story.category)}>{story.category}</Link>
              <span> / </span>
              <span>{story.title}</span>
            </nav>

            <div className="article-header">
              <div className="kicker">{categoryLabel(story.category)} · {story.location}</div>
              <h1>{story.title}</h1>
              <p className="article-lead">{story.excerpt}</p>
              <div className="meta">
                <span>{story.isOriginal ? 'Kashi Live News 24' : `स्रोत: ${story.source || story.author || 'बाहरी प्रकाशक'}`}</span>
                {story.publishedAt ? <span> · प्रकाशित: {story.publishedAt}</span> : null}
                {story.updatedAt && story.updatedAt !== story.publishedAt ? <span> · अपडेट: {story.updatedAt}</span> : null}
              </div>
            </div>

            {story.image ? <Image className="article-image" src={story.image} alt={story.imageAlt || story.title} width={1200} height={700} priority sizes="(max-width: 768px) 100vw, 1000px" /> : null}

            <ShareButtons title={story.title} url={canonicalUrl} />

            <div className="article-content">
              {story.content ? story.content.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>{story.excerpt}</p>}
              {story.sourceUrl ? <p className="article-source-link">मूल रिपोर्ट पढ़ें: <a href={story.sourceUrl} target="_blank" rel="noreferrer">{story.source || story.author}</a></p> : null}
            </div>

            <div className="story-section">
              <div className="section-head">
                <h2>संबंधित खबरें</h2>
              </div>
              <div className="news-grid">
                {related.map((item) => (
                  <article className="card" key={item.slug}>
                    {item.image ? <Image src={item.image} alt={item.imageAlt || item.title} width={600} height={350} sizes="(max-width: 768px) 100vw, 33vw" /> : null}
                    <div className="card-body">
                      <div className="kicker">{categoryLabel(item.category)}</div>
                      <Link href={`/news/${item.slug}`}><h3>{item.title}</h3></Link>
                      <div className="meta">{item.publishedAt}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <aside className="sidebar article-sidebar" aria-label="ताज़ा खबरें">
            <div className="sidebar-block">
              <h3>ताज़ा खबरें</h3>
              {latest.map((item) => (
                <Link href={`/news/${item.slug}`} key={item.slug} className="sidebar-link">{item.title}</Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}