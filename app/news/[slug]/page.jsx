import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from './ShareButtons';
import { categoryLabel, fetchFreshStories, getStory, toCategoryRoute } from '../../../lib/news';
import { findArchivedStory } from '../../../lib/archive';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

function SiteHeader({ stories }) {
  const nav=['Home','Varanasi','Kashi','Crime','Politics','Education','Business','Sports','Weather','Jobs','Entertainment','Health'];
  const breaking=stories.filter(s=>s.isBreaking||s.isFeatured).slice(0,5);
  return <>
    <div className="topbar"><div className="shell"><span>{new Intl.DateTimeFormat('hi-IN',{dateStyle:'full',timeZone:'Asia/Kolkata'}).format(new Date())}</span><span className="location">वाराणसी · उत्तर प्रदेश</span></div></div>
    <header className="masthead"><div className="shell masthead-row"><Link href="/" className="brand"><span className="brand-mark">क</span><span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span></Link><div className="mast-actions"><Link href="/send-news" className="primary">खबर भेजें</Link><Link href="/search" className="icon-btn" aria-label="Search">⌕</Link></div></div></header>
    <nav className="nav"><div className="shell">{nav.map(n=><Link key={n} href={n==='Home'?'/':toCategoryRoute(n)}>{n==='Home'?'होम':categoryLabel(n)}</Link>)}</div></nav>
    {breaking.length>0 && <div className="ticker"><div className="shell"><span className="ticker-label">🔴 ब्रेकिंग</span><div className="ticker-track">{breaking.map(s=><Link key={s.slug} href={'/news/'+s.slug}>{s.title}</Link>)}</div></div></div>}
  </>;
}

export async function generateMetadata({ params }) {
  const stories=await fetchFreshStories();
  let story=await findArchivedStory((await params).slug);
  if(!story) story=getStory((await params).slug,stories);
  if(!story) return {title:'खबर उपलब्ध नहीं',robots:{index:false,follow:false}};
  return {
    title:story.seoTitle||story.title,
    description:(story.seoDescription||story.excerpt||story.title).slice(0,160),
    alternates:{canonical:siteUrl+'/news/'+story.slug},
    openGraph:{title:story.seoTitle||story.title,description:story.seoDescription||story.excerpt,url:siteUrl+'/news/'+story.slug,type:'article',publishedTime:story.publishedAtISO,modifiedTime:story.updatedAtISO||story.publishedAtISO,images:story.image?[{url:story.image,alt:story.imageAlt||story.title}]:[]},
    twitter:{card:'summary_large_image',title:story.seoTitle||story.title,description:story.seoDescription||story.excerpt,images:story.image?[story.image]:[]},
    robots:{index:true,follow:true}
  };
}

export default async function Article({params}){
  const stories=await fetchFreshStories();
  let story=await findArchivedStory((await params).slug);
  if(!story) story=getStory((await params).slug,stories);
  if(!story) notFound();
  const related=stories.filter(s=>s.slug!==story.slug&&(s.category===story.category||s.location===story.location)).slice(0,4);
  const latest=stories.filter(s=>s.slug!==story.slug).slice(0,7);
  const canonical=siteUrl+'/news/'+story.slug;
  const schema={'@context':'https://schema.org','@type':'NewsArticle',headline:story.title,description:story.excerpt,...(story.image?{image:[story.image]}:{}),articleSection:categoryLabel(story.category),keywords:story.tags||[],author:{'@type':'Organization',name:story.isOriginal?'Kashi Live News 24':(story.authorName||story.source||'External publisher')},publisher:{'@type':'Organization',name:'Kashi Live News 24',url:siteUrl},mainEntityOfPage:canonical,isAccessibleForFree:true,...(story.publishedAtISO?{datePublished:story.publishedAtISO,dateModified:story.updatedAtISO||story.publishedAtISO}:{})};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <SiteHeader stories={stories}/>
    <main className="page-shell"><div className="shell article-layout">
      <article className="article-page">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">होम</Link><span>/</span><Link href={toCategoryRoute(story.category)}>{categoryLabel(story.category)}</Link><span>/</span><span>{story.title}</span></nav>
        <div className="article-header"><div className="kicker">{categoryLabel(story.category)} · {story.location==='Varanasi'?'वाराणसी':story.location}</div><h1>{story.title}</h1><p className="article-lead">{story.excerpt}</p><div className="meta">{story.isOriginal?'Kashi Live News 24':'स्रोत: '+(story.source||'बाहरी प्रकाशक')} · {story.publishedAt||'आज'}{story.updatedAt&&story.updatedAt!==story.publishedAt?' · अपडेट: '+story.updatedAt:''}</div></div>
        {story.image?<Image className="article-image" src={story.image} alt={story.imageAlt||story.title} width={1200} height={700} priority sizes="(max-width: 768px) 100vw, 1000px"/>:null}
        <ShareButtons title={story.title} url={canonical}/>
        <div className="article-content">
          <p className="article-summary-label">स्रोत आधारित सारांश</p>
          <p>{story.content||story.excerpt}</p>
          <div className="article-facts">
            <div><strong>श्रेणी:</strong> {categoryLabel(story.category)}</div>
            <div><strong>स्थान:</strong> {story.location==='Varanasi'?'वाराणसी':story.location||'वाराणसी'}</div>
            <div><strong>स्रोत:</strong> {story.source||'बाहरी प्रकाशक'}</div>
            {story.publishedAt?<div><strong>प्रकाशित:</strong> {story.publishedAt}</div>:null}
          </div>
          {!story.isOriginal&&<div className="source-note"><strong>संपादकीय सूचना:</strong> यह पेज उपलब्ध बाहरी स्रोत की जानकारी का सारांश है। बिना स्वतंत्र सत्यापन के नए तथ्य या दावे नहीं जोड़े गए हैं। पूरी रिपोर्ट और संदर्भ के लिए मूल स्रोत देखें।</div>}
          {story.sourceUrl?<p className="article-source-link"><a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">मूल स्रोत पढ़ें ↗</a></p>:null}
        </div>
        {related.length>0&&<section className="story-section"><div className="section-head"><h2>संबंधित खबरें</h2></div><div className="news-grid">{related.map(item=><article className="card" key={item.slug}>{item.image?<Image src={item.image} alt={item.imageAlt||item.title} width={600} height={350} sizes="(max-width:768px) 100vw, 33vw"/>:null}<div className="card-body"><div className="kicker">{categoryLabel(item.category)}</div><Link href={'/news/'+item.slug}><h3>{item.title}</h3></Link><div className="meta">{item.publishedAt}</div></div></article>)}</div></section>}
      </article>
      <aside className="sidebar article-sidebar"><div className="sidebar-block ad-block"><h3>विज्ञापन</h3><AdPlaceholder/></div><div className="sidebar-block"><h3>ताज़ा खबरें</h3>{latest.map(item=><Link href={'/news/'+item.slug} key={item.slug} className="sidebar-link">{item.title}</Link>)}</div><div className="sidebar-block"><h3>आपकी खबर</h3><Link className="primary" href="/send-news">खबर भेजें →</Link></div></aside>
    </div></main>
    <footer className="footer"><div className="shell"><p>© {new Date().getFullYear()} Kashi Live News 24 · वाराणसी | काशी | बनारस</p></div></footer>
  </>;
}

function AdPlaceholder(){ return <div className="ad-slot"><span>विज्ञापन</span></div>; }
