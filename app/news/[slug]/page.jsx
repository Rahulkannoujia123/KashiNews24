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
    image: [story.image],
    datePublished: '2026-09-23T09:42:00+05:30',
    dateModified: '2026-09-23T09:42:00+05:30',
    author: { '@type': 'Person', name: story.author },
    publisher: { '@type': 'Organization', name: 'Kashi Live 24' }
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
            By <strong>{story.author}</strong> · Published {story.publishedAt} · Updated just now
          </div>

          <Image className="article-image" src={story.image} alt={story.title} width={1200} height={700} priority unoptimized />

          <div className="share">
            <button>Share</button>
            <button>WhatsApp</button>
            <button>Copy link</button>
          </div>

          <div className="article-content">
            <p>
              {story.excerpt} Kashi Live 24 ki ground reporting aur official public information ke aadhar par yeh update aap tak pahunchaya ja raha hai.
            </p>
            <p>
              Shehar mein taiyari aur vyavastha ko lekar sambandhit vibhaagon ne zaroori nirdesh jaari kiye hain. Nagrikon se appeal hai ki official advisories ka paalan karein aur kisi bhi unverified message ko share na karein.
            </p>
            <p>
              <strong>Source:</strong> Kashi Live 24 reporting and official public information. External information is clearly attributed where applicable.
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
