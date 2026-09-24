import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFreshStories, getStory } from '../../../lib/news';

export async function generateMetadata({ params }) {
  const liveStories = await fetchFreshStories();
  const story = getStory((await params).slug, liveStories);

  return story
    ? {
        title: story.title,
        description: story.excerpt,
        alternates: { canonical: `/news/${story.slug}` },
        openGraph: { title: story.title, images: [story.image] }
      }
    : {};
}

export default async function Article({ params }) {
  const liveStories = await fetchFreshStories();
  const story = getStory((await params).slug, liveStories);
  if (!story) notFound();

  const related = liveStories.filter((item) => item.slug !== story.slug).slice(0, 3);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.title,
    description: story.excerpt,
    image: [story.image],
    datePublished: story.publishedAt,
    dateModified: story.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://kashilive24.in/news/${story.slug}` },
    author: { '@type': 'Person', name: story.author },
    publisher: {
      '@type': 'Organization',
      name: 'Kashi Live 24',
      url: 'https://kashilive24.in'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand">
            <div className="brand-mark">क</div>
            <div className="brand-name">
              Kashi Live 24<span>VARANASI KI HAR KHABAR, SABSE PEHLE</span>
            </div>
          </Link>
          <Link href="/" className="admin-btn">← Home</Link>
        </div>
      </div>

      <main>
        <article className="article">
          <div className="kicker">{story.category} · {story.location}</div>
          <h1>{story.title}</h1>
          <p className="article-lead">{story.excerpt}</p>
          <div className="meta">
            By <strong>{story.author}</strong> · Published {story.publishedAt}
            {story.sourceUrl && <> · <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a></>}
          </div>

          <Image className="article-image" src={story.image} alt={story.title} width={1200} height={700} priority unoptimized />

          <div className="share">
            <button>Share</button>
            <button>WhatsApp</button>
            <button>Copy link</button>
          </div>

          <div className="article-content">
            <p>
              {story.excerpt}
            </p>
            <p>
              Is khabar se judi jankari ko sambandhit official/public sources se verify karke hi publish kiya gaya hai. Readers ko kisi bhi unverified message ko share karne se bachna chahiye.
            </p>
            <p>
              <strong>Source:</strong> {story.sourceUrl ? <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">Original source</a> : 'Kashi Live 24 reporting / public information'}.
            </p>
          </div>

          <div className="section-head">
            <h2>Related News</h2>
          </div>

          <div className="news-grid">
            {related.map((item) => (
              <article className="card" key={item.slug}>
                <Image src={item.image} alt={item.title} width={600} height={350} unoptimized />
                <div className="card-body">
                  <div className="kicker">{item.category}</div>
                  <Link href={`/news/${item.slug}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  <div className="meta">{item.publishedAt}</div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
