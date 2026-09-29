import Image from 'next/image';
import Link from 'next/link';
import { listArchivedStories } from '../../lib/archive';
import { categoryLabel, CATEGORY_OPTIONS } from '../../lib/news';

export const metadata = {
  title: 'न्यूज़ आर्काइव | Kashi Live News 24',
  description: 'वाराणसी, काशी और बनारस की पुरानी एवं ताज़ा खबरों का न्यूज़ आर्काइव।',
};

export default async function ArchivePage({ searchParams }) {
  const params = await searchParams;
  const category = String(params?.category || '');
  const pageNumber = Math.max(Number(params?.page || 1), 1);
  const { items, total } = await listArchivedStories({ category, page: pageNumber, limit: 24 });
  const pages = Math.max(Math.ceil(total / 24), 1);

  return (
    <>
      <header className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand">
            <span className="brand-mark">क</span>
            <span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span>
          </Link>
          <Link href="/search" className="icon-btn" aria-label="Search">⌕</Link>
        </div>
      </header>
      <main className="page-shell">
        <div className="shell">
          <section className="form-page">
            <div className="section-head">
              <div>
                <div className="kicker">KASHI LIVE NEWS 24</div>
                <h1>न्यूज़ आर्काइव</h1>
              </div>
              <span>{total} खबरें</span>
            </div>

            <div className="chip-list">
              <Link className={!category ? 'chip active' : 'chip'} href="/archive">सभी</Link>
              {CATEGORY_OPTIONS.map((item) => (
                <Link className={category === item ? 'chip active' : 'chip'} key={item} href={'/archive?category=' + encodeURIComponent(item)}>
                  {categoryLabel(item)}
                </Link>
              ))}
            </div>

            {items.length ? (
              <div className="news-grid search-results">
                {items.map((story) => (
                  <article className="card" key={story.slug}>
                    {story.image ? <Image src={story.image} alt={story.imageAlt || story.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" /> : null}
                    <div className="card-body">
                      <div className="kicker">{categoryLabel(story.category)} · {story.location || 'वाराणसी'}</div>
                      <Link href={'/news/' + story.slug}><h2>{story.title}</h2></Link>
                      <p>{story.excerpt}</p>
                      <div className="meta">{story.publishedAt || 'तारीख उपलब्ध नहीं'} · स्रोत: {story.source || 'बाहरी प्रकाशक'}</div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty">अभी आर्काइव में खबरें उपलब्ध नहीं हैं। MONGODB_URI सेट होने के बाद नई खबरें अपने-आप सुरक्षित होती रहेंगी।</p>
            )}

            {pages > 1 && (
              <div className="section-head">
                {pageNumber > 1 ? <Link className="chip" href={'/archive?' + new URLSearchParams(Object.assign(category ? { category: category } : {}, { page: String(pageNumber - 1) })).toString()}>← पिछला</Link> : <span />}
                <span>पेज {pageNumber} / {pages}</span>
                {pageNumber < pages ? <Link className="chip" href={'/archive?' + new URLSearchParams(Object.assign(category ? { category: category } : {}, { page: String(pageNumber + 1) })).toString()}>अगला →</Link> : <span />}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
