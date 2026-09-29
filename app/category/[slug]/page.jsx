import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryFromSlug, categoryLabel, fetchFreshStories, normalizeCategory, toCategoryRoute } from '../../../lib/news';
import { JsonLd, createWebPageSchema, createBreadcrumbSchema } from '../../../components/JsonLd';

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://kashi-livenews24.vercel.app';

export async function generateMetadata({params}){
  const {slug}=await params; const category=categoryFromSlug(slug);
  if(!category)return {};
  return {title:categoryLabel(category)+' खबरें',description:categoryLabel(category)+' की ताज़ा खबरें और वाराणसी-काशी की लाइव कवरेज।',alternates:{canonical:siteUrl+'/category/'+slug}};
}

function Header(){
  const nav=['Home','Varanasi','Kashi','Crime','Politics','Education','Business','Sports','Weather','Jobs','Entertainment','Health'];
  return <><div className="topbar"><div className="shell"><span>{new Intl.DateTimeFormat('hi-IN',{dateStyle:'full',timeZone:'Asia/Kolkata'}).format(new Date())}</span><span className="location">वाराणसी · उत्तर प्रदेश</span></div></div><header className="masthead"><div className="shell masthead-row"><Link href="/" className="brand"><span className="brand-mark">क</span><span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span></Link><div className="mast-actions"><Link href="/send-news" className="primary">खबर भेजें</Link><Link href="/search" className="icon-btn" aria-label="Search">⌕</Link></div></div></header><nav className="nav"><div className="shell">{nav.map(n=><Link key={n} href={n==='Home'?'/':toCategoryRoute(n)}>{n==='Home'?'होम':categoryLabel(n)}</Link>)}</div></nav></>;
}

export default async function CategoryPage({params}){
  const {slug}=await params; const category=categoryFromSlug(slug)||normalizeCategory(slug)||'';
  if(!category)notFound();
  const stories=await fetchFreshStories(category);
  const pageUrl = `${siteUrl}/category/${slug}`;
  const pageSchema = createWebPageSchema({
    url: pageUrl,
    name: `${categoryLabel(category)} खबरें | Kashi Live News 24`,
    description: `${categoryLabel(category)} की ताज़ा खबरें और वाराणसी-काशी की लाइव कवरेज।`,
    type: 'CollectionPage'
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'होम', url: siteUrl },
    { name: categoryLabel(category), url: pageUrl }
  ]);
  return <><JsonLd data={pageSchema} id="category-jsonld"/><JsonLd data={breadcrumbSchema} id="category-breadcrumb-jsonld"/><Header/><main className="page-shell"><div className="shell page-body"><div className="content-column">
    <div className="news-utility-bar"><span>वाराणसी • काशी • बनारस</span><span>{categoryLabel(category)} कवरेज</span><span>अपडेटेड लाइव फीड</span></div>
    <section className="story-section"><div className="section-head"><h1>{categoryLabel(category)} खबरें</h1><Link href="/">← होम</Link></div>
      {stories.length?<div className="news-grid">{stories.map(story=><article className="card" key={story.slug}>{story.image?<Link href={'/news/'+story.slug}><Image src={story.image} alt={story.imageAlt||story.title} width={800} height={500} sizes="(max-width:768px) 100vw, 33vw"/></Link>:null}<div className="card-body"><div className="kicker">{categoryLabel(story.category)} · {story.location==='Varanasi'?'वाराणसी':story.location}</div><Link href={'/news/'+story.slug}><h2>{story.title}</h2></Link><p>{story.excerpt}</p><div className="meta">{story.publishedAt} · {story.isOriginal?'Kashi Live News 24':'स्रोत: '+(story.source||'बाहरी प्रकाशक')}</div><Link className="read" href={'/news/'+story.slug}>पूरी खबर →</Link></div></article>)}</div>:<div className="empty"><p>आज इस श्रेणी की सत्यापित खबर उपलब्ध नहीं है।</p><Link className="primary" href="/">दूसरी खबरें देखें</Link></div>}
    </section>
  </div><aside className="sidebar"><div className="sidebar-block"><h3>अन्य श्रेणियां</h3><div className="chip-list">{['Varanasi','Kashi','Crime','Politics','Education','Business','Sports','Jobs','Health','Technology'].filter(c=>c!==category).map(c=><Link className="chip" key={c} href={toCategoryRoute(c)}>{categoryLabel(c)}</Link>)}</div></div><div className="sidebar-block"><h3>हमें खबर भेजें</h3><p className="empty">अपने इलाके की सूचना संपादकीय समीक्षा के लिए भेजें।</p><Link className="primary" href="/send-news">खबर भेजें →</Link></div></aside></div></main><footer className="footer"><div className="shell"><p>© {new Date().getFullYear()} Kashi Live News 24 · वाराणसी | काशी | बनारस</p></div></footer></>;
}
