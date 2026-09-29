import Link from 'next/link';
import { fetchVaranasiSocialFeeds } from '../../lib/social';
import { categoryLabel } from '../../lib/news';
import { JsonLd, createWebPageSchema } from '../../components/JsonLd';

export const metadata = {
  title: 'वाराणसी सोशल मीडिया अपडेट',
  description: 'वाराणसी, काशी और बनारस से जुड़े सार्वजनिक रूप से खोजे गए Facebook और Instagram अपडेट।'
};

export default async function SocialPage() {
  const feeds = await fetchVaranasiSocialFeeds();
  const pageSchema = createWebPageSchema({
    url: 'https://kashi-livenews24.vercel.app/social',
    name: 'वाराणसी सोशल मीडिया अपडेट | Kashi Live News 24',
    description: 'वाराणसी, काशी और बनारस से जुड़े सार्वजनिक रूप से खोजे गए Facebook और Instagram अपडेट।',
    type: 'CollectionPage'
  });
  return <><JsonLd data={pageSchema} id="social-jsonld"/>
    <header className="masthead"><div className="shell masthead-row">
      <Link href="/" className="brand"><span className="brand-mark">क</span><span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span></Link>
      <Link href="/" className="icon-btn" aria-label="Home">⌂</Link>
    </div></header>
    <main className="page-shell"><div className="shell">
      <section className="story-section">
        <div className="section-head"><h1>सोशल मीडिया अपडेट</h1><Link href="/">← होम</Link></div>
        <p className="empty">ये लिंक सार्वजनिक रूप से इंडेक्स/उपलब्ध स्रोतों से खोजे जाते हैं। यह हर public post या reel की पूर्ण सूची नहीं है।</p>
        {feeds.length ? <div className="news-grid">{feeds.map(item => <article className="card social-card" key={item.id}>
          <div className="card-body">
            <div className="kicker">{item.type === 'reel' ? '🎬 Reel' : '📘 Facebook'} · {categoryLabel(item.category)}</div>
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"><h2>{item.title}</h2></a>
            <p>{item.excerpt}</p>
            <div className="meta">{item.publishedAt} · स्रोत: {item.source || item.platform}</div>
          </div>
        </article>)}</div> : <div className="empty"><p>अभी कोई सार्वजनिक सोशल अपडेट नहीं मिला।</p></div>}
      </section>
    </div></main>
  </>;
}
