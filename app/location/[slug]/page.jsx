import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areas, categoryLabel, fetchFreshStories } from '../../../lib/news';
import { JsonLd, createWebPageSchema, createBreadcrumbSchema } from '../../../components/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

function slugify(value='') {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const area = areas.find((item) => slugify(item) === slug);
  if (!area) return {};
  return {
    title: `${area} की लोकल खबरें`,
    description: `${area}, वाराणसी की ताज़ा स्थानीय खबरें और अपडेट।`,
    alternates: { canonical: `${siteUrl}/location/${slug}` }
  };
}

export default async function LocationPage({ params }) {
  const slug = (await params).slug;
  const area = areas.find((item) => slugify(item) === slug);
  if (!area) notFound();

  const stories = await fetchFreshStories();
  const term = area.toLocaleLowerCase('hi-IN');
  const pageUrl = `${siteUrl}/location/${slug}`;
  const pageSchema = createWebPageSchema({
    url: pageUrl,
    name: `${area} की लोकल खबरें | Kashi Live News 24`,
    description: `${area}, वाराणसी की ताज़ा स्थानीय खबरें और अपडेट।`,
    type: 'CollectionPage'
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'होम', url: siteUrl },
    { name: area, url: pageUrl }
  ]);

  const results = stories.filter((story) =>
    [story.title, story.excerpt, story.content, ...(story.tags || [])]
      .filter(Boolean).join(' ').toLocaleLowerCase('hi-IN').includes(term)
  );

  return <><JsonLd data={pageSchema} id="location-jsonld"/><JsonLd data={breadcrumbSchema} id="location-breadcrumb-jsonld"/>
    <header className="masthead">
      <div className="shell masthead-row">
        <Link href="/" className="brand"><span className="brand-mark">क</span><span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span></Link>
        <Link href="/" className="icon-btn" aria-label="Home">⌂</Link>
      </div>
    </header>
    <main className="page-shell"><div className="shell">
      <section className="story-section">
        <div className="section-head"><h1>{area} की खबरें</h1><Link href="/">← होम</Link></div>
        <p className="empty">वाराणसी के {area} इलाके से संबंधित आज की उपलब्ध खबरें।</p>
        {results.length ? <div className="news-grid">
          {results.map((story) => <article className="card" key={story.slug}>
            {story.image ? <Link href={`/news/${story.slug}`}><Image src={story.image} alt={story.imageAlt || story.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" /></Link> : null}
            <div className="card-body">
              <div className="kicker">{categoryLabel(story.category)} · {area}</div>
              <Link href={`/news/${story.slug}`}><h2>{story.title}</h2></Link>
              <p>{story.excerpt}</p>
              <div className="meta">{story.publishedAt} · स्रोत: {story.source || 'बाहरी प्रकाशक'}</div>
            </div>
          </article>)}
        </div> : <div className="empty"><p>आज {area} से संबंधित खबर नहीं मिली।</p><Link className="primary" href="/">सभी खबरें देखें</Link></div>}
      </section>
    </div></main>
    <footer className="footer"><div className="shell"><p>© {new Date().getFullYear()} Kashi Live News 24 · वाराणसी | काशी | बनारस</p></div></footer>
  </>;
}
