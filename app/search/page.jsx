import Image from 'next/image';
import Link from 'next/link';
import { fetchFreshStories } from '../../lib/news';

export const metadata = { title: 'खबरें खोजें', description: 'शीर्षक, श्रेणी, कीवर्ड या स्थान से Kashi Live News 24 की खबरें खोजें।' };

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = String(params?.q || '').trim().slice(0, 100);
  const term = query.toLocaleLowerCase('hi-IN');
  const stories = await fetchFreshStories();
  const results = term ? stories.filter((story) =>
    [story.title, story.excerpt, story.category, story.location, ...(story.tags || [])]
      .filter(Boolean).join(' ').toLocaleLowerCase('hi-IN').includes(term)
  ) : [];

  return (
    <>
      <header className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand">
            <span className="brand-mark">क</span>
            <span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span>
          </Link>
          <Link href="/" className="icon-btn" aria-label="Home">⌂</Link>
        </div>
      </header>
      <main className="shell">
        <section className="form-page search-page">
          <h1>खबरें खोजें</h1>
          <form action="/search" className="search-form">
            <label className="field">
              शीर्षक, कीवर्ड, श्रेणी या स्थान
              <input type="search" name="q" defaultValue={query} maxLength={100} placeholder="जैसे वाराणसी, अपराध, BHU…" />
            </label>
            <button className="primary" type="submit">खोजें</button>
          </form>
          <p>{query ? `“${query}” के लिए ${results.length} परिणाम` : 'खबर खोजने के लिए कोई शब्द लिखें।'}</p>
          {query && results.length === 0 ? <p className="empty">इस खोज के लिए कोई खबर नहीं मिली।</p> : (
            <div className="news-grid search-results">
              {results.map((story) => (
                <article className="card" key={story.slug}>
                  {story.image ? <Image src={story.image} alt={story.imageAlt || story.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" /> : null}
                  <div className="card-body">
                    <div className="kicker">{story.category} · {story.location}</div>
                    <Link href={`/news/${story.slug}`}><h2>{story.title}</h2></Link>
                    <p>{story.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
