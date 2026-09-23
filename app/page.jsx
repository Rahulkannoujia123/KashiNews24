import Link from 'next/link';
import Image from 'next/image';
import { areas, navItems, fetchFreshStories } from '../lib/news';

function Header() {
  return <>
    <div className="topbar"><div className="shell"><span>Wednesday, 23 September 2026</span><span className="location">VARANASI · UTTAR PRADESH</span></div></div>
    <header className="masthead"><div className="shell masthead-row"><Link href="/" className="brand"><div className="brand-mark">क</div><div className="brand-name">Kashi Live 24<span>VARANASI KI HAR KHABAR, SABSE PEHLE</span></div></Link><div className="mast-actions"><button className="icon-btn" aria-label="Search">⌕</button><button className="icon-btn" aria-label="Menu">☰</button></div></div></header>
    <nav className="nav"><div className="shell">{navItems.map((item) => <Link key={item} href={item === 'Home' ? '/' : `/?category=${item}`}>{item}</Link>)}</div></nav>
    <div className="ticker"><div className="shell"><span className="ticker-label">BREAKING NEWS</span><div className="ticker-track">वाराणसी की ताज़ा खबरें · काशी में आज के प्रमुख समाचार · BHU और शहर की बड़ी अपडेट</div></div></div>
  </>;
}

function Card({ story }) {
  return <article className="card"><Image src={story.image} alt={story.title} width={800} height={500} unoptimized /><div className="card-body"><div className="kicker">{story.category} · {story.location}</div><Link href={`/news/${story.slug}`}><h3>{story.title}</h3></Link><p>{story.excerpt}</p><div className="meta">{story.publishedAt} · {story.views.toLocaleString('en-IN')} views · {story.author}</div><Link className="read" href={`/news/${story.slug}`}>Read full story →</Link>{story.sourceUrl && <a className="read" href={story.sourceUrl} target="_blank" rel="noreferrer">मूल खबर पढ़ें ↗</a>}</div></article>;
}

function AdSlot({ slot }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return client && slot ? <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /> : <div className="ad-slot">विज्ञापन · आपके व्यवसाय का प्रचार यहाँ करें</div>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div><div className="brand-name">Kashi Live 24<span>VARANASI KI HAR KHABAR, SABSE PEHLE</span></div><p>Varanasi aur Purvanchal ki original, responsible aur community-first local journalism.</p></div><div><h4>Explore</h4><p>Varanasi<br />Kashi<br />Crime<br />Traffic<br />Jobs</p></div><div><h4>Connect</h4><p>Send Us News<br />Contact Desk<br />Advertise with us<br />Privacy Policy</p></div></div></footer>;
}

export default async function Home({ searchParams }) {
  const requestedCategory = (await searchParams)?.category || '';
  const category = ['latest', 'local'].includes(requestedCategory.toLowerCase()) ? '' : requestedCategory;
  const loadedStories = await fetchFreshStories(category);
  const storyList = loadedStories.length ? loadedStories : await fetchFreshStories();
  const [lead, ...rest] = storyList;

  return <><Header /><main><div className="shell">
    <section className="hero"><Link href={`/news/${lead.slug}`} className="hero-main"><Image src={lead.image} alt={lead.title} fill priority unoptimized sizes="(max-width: 750px) 100vw, 65vw" /><div className="hero-copy"><div className="kicker">{lead.category} · Top story</div><h1>{lead.title}</h1><div className="meta">{lead.publishedAt} · By {lead.author}</div></div></Link><div className="side-stories">{rest.slice(0, 4).map((story) => <Link href={`/news/${story.slug}`} className="story-row" key={story.slug}><Image src={story.image} alt="" width={120} height={88} unoptimized /><div><div className="kicker">{story.category}</div><h3>{story.title}</h3><div className="meta">{story.publishedAt}</div></div></Link>)}</div></section>
    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT} />
    <section><div className="section-head"><h2>{category || 'Latest'} News</h2><Link href="/?category=latest">VIEW ALL →</Link></div><div className="news-grid">{storyList.slice(category ? 0 : 1).map((story) => <Card story={story} key={story.slug} />)}</div></section>
    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_MIDDLE_SLOT} />
    <section><div className="section-head"><h2>Varanasi Areas</h2><Link href="/?category=local">ALL LOCAL NEWS →</Link></div><div className="areas">{areas.map((area) => <Link href={`/?location=${area}`} key={area}>{area}</Link>)}</div></section>
    <section><div className="section-head"><h2>City Desk</h2></div><div className="strip">{[['Kashi Vishwanath', 'Darshan, corridor aur temple updates'], ['Ganga & Ghats', 'Aarti, boats aur riverfront stories'], ['Varanasi Traffic', 'Roads, diversions aur commute alerts'], ['Government Updates', 'Official schemes aur public notices']].map(([title, text]) => <Link className="strip-item" href={`/?category=${title}`} key={title}><div className="kicker">KASHI LIVE 24</div><h3>{title}</h3><p>{text}</p></Link>)}</div></section>
  </div></main><Footer /></>;
}
