import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '../components/AdSlot';
import { categoryLabel, fetchFreshStories, CATEGORY_OPTIONS, toCategoryRoute } from '../lib/news';
import { fetchVaranasiSocialFeeds } from '../lib/social';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

export async function generateMetadata() {
  return {
    title: 'वाराणसी की ताज़ा खबरें | Kashi Live News 24',
    description: 'वाराणसी, काशी और बनारस की ताज़ा स्थानीय खबरें, अपराध, शिक्षा, खेल, रोजगार, मौसम और उत्तर प्रदेश अपडेट।',
    alternates: { canonical: siteUrl },
    openGraph: { title: 'Kashi Live News 24', description: 'वाराणसी और काशी की ताज़ा खबरें।', url: siteUrl, type: 'website' }
  };
}

function Header({ breaking = [] }) {
  const nav = ['Home','Varanasi','Kashi','Crime','Politics','Education','Business','Sports','Weather','Jobs','Entertainment','Health'];
  return (
    <>
      <div className="topbar"><div className="shell"><span>{new Intl.DateTimeFormat('hi-IN',{dateStyle:'full',timeZone:'Asia/Kolkata'}).format(new Date())}</span><span className="location">वाराणसी · उत्तर प्रदेश</span></div></div>
      <header className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand" aria-label="Kashi Live News 24 home"><span className="brand-mark">क</span><span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span></Link>
          <div className="mast-actions"><Link href="/send-news" className="primary">हमें खबर भेजें</Link><Link href="/search" className="icon-btn" aria-label="Search">⌕</Link><Link href="/archive" className="icon-btn" aria-label="News archive">▤</Link></div>
        </div>
      </header>
      <nav className="nav" aria-label="News categories"><div className="shell">{nav.map(item => <Link key={item} href={item==='Home' ? '/' : toCategoryRoute(item)}>{item==='Home'?'होम':categoryLabel(item)}</Link>)}</div></nav>
      {breaking.length > 0 && <div className="ticker" aria-label="Breaking news"><div className="shell"><span className="ticker-label">🔴 ब्रेकिंग</span><div className="ticker-track">{breaking.slice(0,6).map((s,i)=><span key={s.slug}><Link href={`/news/${s.slug}`}>{s.title}</Link>{i<Math.min(5,breaking.length-1)?' · ':''}</span>)}</div></div></div>}
    </>
  );
}

function Card({ story, compact = false }) {
  return <article className={`card ${compact?'card-compact':''}`}>
    {story.image ? <Link href={`/news/${story.slug}`} aria-label={story.title}><Image src={story.image} alt={story.imageAlt || story.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" /></Link> : null}
    <div className="card-body">
      <div className="kicker">{categoryLabel(story.category)} · {story.location==='Varanasi'?'वाराणसी':story.location}</div>
      <Link href={`/news/${story.slug}`}><h3>{story.title}</h3></Link>
      {!compact && <p>{story.excerpt}</p>}
      <div className="meta">{story.publishedAt || 'आज'} · {story.isOriginal ? 'Kashi Live News 24' : `स्रोत: ${story.source || 'बाहरी प्रकाशक'}`}</div>
    </div>
  </article>;
}

function Section({ title, category, stories }) {
  if (!stories.length) return null;
  return <section className="story-section">
    <div className="section-head"><h2>{title}</h2>{category && <Link href={toCategoryRoute(category)}>सभी देखें →</Link>}</div>
    <div className="news-grid">{stories.slice(0,6).map(s=><Card key={s.slug} story={s}/>)}</div>
  </section>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-grid">
    <div><div className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></div><p>वाराणसी, काशी और बनारस की स्थानीय खबरें और जन-सूचनाएं।</p></div>
    <div><h4>श्रेणियां</h4><p>{['Varanasi','Kashi','Crime','Politics','Education','Sports','Jobs','Health'].map(c=><span key={c}><Link href={toCategoryRoute(c)}>{categoryLabel(c)}</Link><br/></span>)}</p></div>
    <div><h4>जानकारी</h4><p><Link href="/about">हमारे बारे में</Link><br/><Link href="/contact">संपर्क</Link><br/><Link href="/editorial-policy">संपादकीय नीति</Link><br/><Link href="/correction-policy">सुधार नीति</Link><br/><Link href="/privacy-policy">गोपनीयता</Link><br/><Link href="/disclaimer">अस्वीकरण</Link><br/><Link href="/terms">नियम व शर्तें</Link><br/><Link href="/advertise">विज्ञापन</Link><br/><Link href="/send-news">हमें खबर भेजें</Link><br/><Link href="/archive">न्यूज़ आर्काइव</Link></p></div>
  </div></footer>;
}

export default async function Home() {
  const [stories, socialFeeds] = await Promise.all([fetchFreshStories(), fetchVaranasiSocialFeeds()]);
  const breaking = stories.filter(s=>s.isBreaking || s.isFeatured);
  const featured = stories.find(s=>s.image) || stories[0];
  const secondary = stories.filter(s=>s.slug!==featured?.slug && s.image).slice(0,4);
  const used = new Set([featured?.slug,...secondary.map(s=>s.slug)].filter(Boolean));
  const latest = stories.filter(s=>!used.has(s.slug)).slice(0,8);
  const areas = ['Cantt','Lanka','BHU','Sigra','Bhelupur','Shivpur','Rohania','Sarnath','Ramnagar','Pindra','Sevapuri'];
  const categorySections = CATEGORY_OPTIONS.filter(c=>!['Varanasi','Kashi'].includes(c));

  return <>
    <Header breaking={breaking}/>
    <main className="page-shell">
      <div className="shell page-body">
        <div className="content-column">
          <div className="news-utility-bar"><span>अपडेट: {new Intl.DateTimeFormat('hi-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date())}</span><span>वाराणसी • काशी • बनारस</span><span>सत्यापित स्रोतों की खबरें</span></div>

          <div className="category-pills">{['Varanasi','Kashi','Crime','Education','Sports','Jobs','Weather','Health'].map(c=><Link className="category-pill" key={c} href={toCategoryRoute(c)}>{categoryLabel(c)}</Link>)}</div>

          <section className="hero" aria-label="मुख्य खबरें">
            {featured ? <Link href={`/news/${featured.slug}`} className={`hero-main${featured.image?'':' hero-main-no-image'}`}>
              {featured.image && <Image src={featured.image} alt={featured.imageAlt || featured.title} fill priority sizes="(max-width: 768px) 100vw, 65vw"/>}
              <div className="hero-copy"><div className="kicker">{categoryLabel(featured.category)} · प्रमुख खबर</div><h1>{featured.title}</h1><p>{featured.excerpt}</p><div className="meta">{featured.publishedAt} · {featured.isOriginal?'Kashi Live News 24':`स्रोत: ${featured.source}`}</div></div>
            </Link> : <div className="hero-main hero-main-no-image"><div className="hero-copy"><h1>आज की स्थानीय खबरें जल्द उपलब्ध होंगी</h1></div></div>}
            <div className="side-stories">{secondary.map(s=><Link href={`/news/${s.slug}`} className="story-row" key={s.slug}><Image src={s.image} alt={s.imageAlt || s.title} width={140} height={92} sizes="140px"/><div><div className="kicker">{categoryLabel(s.category)}</div><h3>{s.title}</h3><div className="meta">{s.publishedAt}</div></div></Link>)}</div>
          </section>

          <AdSlot label="Top banner"/>

          <section className="story-section">
            <div className="section-head"><h2>ताज़ा खबरें</h2><span>{stories.length} अपडेट</span></div>
            {latest.length ? <div className="news-grid">{latest.map(s=><Card key={s.slug} story={s}/>)}</div> : <p className="empty">आज की सत्यापित खबर उपलब्ध नहीं है।</p>}
          </section>

          <section className="story-section">
            <div className="section-head"><h2>वाराणसी के इलाके</h2><span>लोकल कवरेज</span></div>
            <div className="chip-list">{areas.map(a=><Link key={a} href={`/location/${String(a).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`} className="chip">{a}</Link>)}</div>
          </section>

          <Section title="वाराणसी खबरें" category="Varanasi" stories={stories.filter(s=>s.category==='Varanasi')}/>

          {socialFeeds.length > 0 && <section className="story-section social-section">
            <div className="section-head"><h2>सोशल मीडिया अपडेट</h2><Link href="/social">सभी देखें →</Link></div>
            <div className="news-grid">
              {socialFeeds.slice(0, 6).map(item => <article className="card social-card" key={item.id}>
                {item.image ? <a href={item.sourceUrl || '#'} target="_blank" rel="noreferrer">
                  <Image src={item.image} alt={item.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy"/>
                </a> : null}
                <div className="card-body">
                  <div className="kicker">{item.type === 'reel' ? '🎬 Reel' : '📘 Facebook'} · {categoryLabel(item.category)}</div>
                  <a href={item.sourceUrl || '#'} target="_blank" rel="noreferrer"><h3>{item.title}</h3></a>
                  <p>{item.excerpt}</p>
                  <div className="meta">{item.publishedAt} · स्रोत: {item.source}{item.likes ? ` · ❤️ ${item.likes}` : ''}</div>
                </div>
              </article>)}
            </div>
          </section>}
          <Section title="काशी खबरें" category="Kashi" stories={stories.filter(s=>s.category==='Kashi')}/>
          {categorySections.map(c=><Section key={c} title={`${categoryLabel(c)} खबरें`} category={c} stories={stories.filter(s=>s.category===c)}/>)}

          <AdSlot label="In-article"/>
        </div>

        <aside className="sidebar" aria-label="साइडबार">
          <div className="sidebar-block ad-block"><h3>विज्ञापन</h3><AdSlot label="Sidebar"/></div>
          <div className="sidebar-block"><h3>प्रमुख खबरें</h3>{stories.slice(0,7).map((s,i)=><Link href={`/news/${s.slug}`} key={s.slug} className="sidebar-item"><span className="sidebar-rank">{i+1}</span><div><strong>{s.title}</strong><small>{categoryLabel(s.category)} · {s.publishedAt}</small></div></Link>)}</div>
          <div className="sidebar-block"><h3>लोकप्रिय श्रेणियां</h3><div className="chip-list">{['Varanasi','Kashi','Crime','Politics','Education','Business','Sports','Jobs','Health','Technology'].map(c=><Link className="chip" key={c} href={toCategoryRoute(c)}>{categoryLabel(c)}</Link>)}</div></div>
          <div className="sidebar-block"><h3>हमें खबर भेजें</h3><p className="empty">अपने इलाके की खबर, फोटो या सूचना भेजें। प्रकाशन से पहले संपादकीय समीक्षा की जाएगी।</p><Link className="primary" href="/send-news">खबर भेजें →</Link></div>
        </aside>
      </div>
    </main>
    <Footer/>
  </>;
}
