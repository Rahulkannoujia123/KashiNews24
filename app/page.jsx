import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '../components/AdSlot';
import { areas, navItems, fetchFreshStories, normalizeCategory, categoryLabel, CATEGORY_OPTIONS, toCategoryRoute } from '../lib/news';

export async function generateMetadata({ searchParams }) {
  const requested = String((await searchParams)?.category || '').trim();
  const category = normalizeCategory(requested);
  return category ? {
    title: `${categoryLabel(category)} खबरें`,
    description: `${categoryLabel(category)} की ताज़ा खबरें और वाराणसी-काशी के अपडेट।`,
    alternates: { canonical: `/?category=${encodeURIComponent(category)}` }
  } : {
    title: 'Kashi Live News 24',
    description: 'वाराणसी समाचार, काशी अपडेट, स्थानीय सुर्खियां और बनारस की खबरें।'
  };
}

function Header() {
  return (
    <>
      <div className="topbar">
        <div className="shell">
          <span>{new Intl.DateTimeFormat('hi-IN', { dateStyle: 'full', timeZone: 'Asia/Kolkata' }).format(new Date())}</span>
          <span className="location">वाराणसी · उत्तर प्रदेश</span>
        </div>
      </div>
      <header className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand" aria-label="Kashi Live News 24 home">
            <span className="brand-mark">क</span>
            <span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span>
          </Link>
          <div className="mast-actions">
            <Link href="/search" className="icon-btn" aria-label="Search stories">⌕</Link>
          </div>
        </div>
      </header>
      <nav className="nav" aria-label="News categories">
        <div className="shell">
          {navItems.filter((item) => item !== 'Videos' && item !== 'Events' && item !== 'Traffic').map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : toCategoryRoute(item)}>{item === 'Home' ? 'होम' : categoryLabel(item)}</Link>
          ))}
        </div>
      </nav>
    </>
  );
}

function BreakingTicker({ stories }) {
  const items = stories.filter((story) => story.isBreaking || story.isFeatured).slice(0, 6);
  if (!items.length) return null;

  return (
    <div className="ticker" aria-live="polite">
      <div className="shell">
        <span className="ticker-label">ब्रेकिंग</span>
        <div className="ticker-track">
          {items.flatMap((story, index) => [
            <Link key={story.slug} href={`/news/${story.slug}`}>{story.title}</Link>,
            index < items.length - 1 ? <span key={`${story.slug}-sep`} className="ticker-separator">·</span> : null
          ])}
        </div>
      </div>
    </div>
  );
}

function Card({ story }) {
  return (
    <article className="card">
      {story.image ? <Image src={story.image} alt={story.imageAlt || story.title} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" /> : null}
      <div className="card-body">
        <div className="kicker">{categoryLabel(story.category)} · {story.location === 'Varanasi' ? 'वाराणसी' : story.location}</div>
        <Link href={`/news/${story.slug}`}><h3>{story.title}</h3></Link>
        <p>{story.excerpt}</p>
        <div className="meta">
          {story.publishedAt} · {story.isOriginal ? 'Kashi Live News 24' : `स्रोत: ${story.source || story.author || 'बाहरी प्रकाशक'}`}
        </div>
        <div className="card-actions">
          <Link className="read" href={`/news/${story.slug}`}>पूरी खबर →</Link>
          {story.sourceUrl ? <a className="read" href={story.sourceUrl} target="_blank" rel="noreferrer">मूल स्रोत ↗</a> : null}
        </div>
      </div>
    </article>
  );
}

function StorySection({ title, category, stories }) {
  if (!stories.length) return null;
  return (
    <section className="story-section">
      <div className="section-head">
        <h2>{title}</h2>
        {category ? <Link href={toCategoryRoute(category)}>सभी देखें →</Link> : null}
      </div>
      <div className="news-grid">
        {stories.slice(0, 4).map((story) => (
          <Card story={story} key={story.slug} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></div>
          <p>वाराणसी, काशी और बनारस की स्थानीय खबरें और जन-सूचनाएं।</p>
        </div>
        <div>
          <h4>श्रेणियां</h4>
          <p><Link href={toCategoryRoute('Varanasi')}>वाराणसी</Link><br /><Link href={toCategoryRoute('Kashi')}>काशी</Link><br /><Link href={toCategoryRoute('Crime')}>अपराध</Link><br /><Link href={toCategoryRoute('Politics')}>राजनीति</Link></p>
        </div>
        <div>
          <h4>जानकारी</h4>
          <p><Link href="/about">हमारे बारे में</Link><br /><Link href="/contact">संपर्क</Link><br /><Link href="/editorial-policy">संपादकीय नीति</Link><br /><Link href="/correction-policy">सुधार नीति</Link><br /><Link href="/privacy-policy">गोपनीयता</Link><br /><Link href="/terms">नियम</Link><br /><Link href="/disclaimer">अस्वीकरण</Link><br /><Link href="/advertise">विज्ञापन</Link><br /><Link href="/send-news">हमें खबर भेजें</Link></p>
        </div>
      </div>
    </footer>
  );
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const requestedCategory = String(params?.category || '').trim().slice(0, 40);
  const requestedLocation = String(params?.location || '').trim().slice(0, 80);
  const category = normalizeCategory(requestedCategory) || '';
  const loadedStories = await fetchFreshStories(category);
  const location = areas.find((area) => area.toLowerCase() === requestedLocation.toLowerCase());
  const storyList = location ? loadedStories.filter((story) => story.location?.toLowerCase() === location.toLowerCase()) : loadedStories;
  const tickerSlugs = new Set(storyList.filter((story) => story.isBreaking || story.isFeatured).slice(0, 6).map((story) => story.slug));
  const contentStories = storyList.filter((story) => !tickerSlugs.has(story.slug));
  const featuredStory = contentStories.find((story) => story.image);
  const secondaryStories = contentStories.filter((story) => story.image && story.slug !== featuredStory?.slug).slice(0, 4);
  const latestStories = contentStories.slice(0, 6);
  const categorySections = CATEGORY_OPTIONS.filter((item) => item !== 'Varanasi' && item !== 'Kashi');
  const localHighlights = contentStories.slice(0, 3);
  const quickCategories = ['Varanasi', 'Kashi', 'Politics', 'Crime', 'Education', 'Sports'];

  return (
    <>
      <Header />
      <BreakingTicker stories={storyList} />
      <main className="page-shell">
        <div className="shell page-body">
          <div className="content-column">
            <div className="news-utility-bar">
              <span>अपडेट: {new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date())}</span>
              <span>वाराणसी • काशी • बनारस</span>
              <span>स्थानीय कवरेज</span>
            </div>

            <div className="category-pills" aria-label="Quick categories">
              {quickCategories.map((tag) => (
                <Link key={tag} href={toCategoryRoute(tag)} className="category-pill">{categoryLabel(tag)}</Link>
              ))}
            </div>

            <div className="trust-strip">
              <div>
                <strong>24/7</strong>
                <span>स्थानीय अपडेट</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>क्षेत्रीय कवरेज</span>
              </div>
              <div>
                <strong>समुदाय</strong>
                <span>न्यूज़ डेस्क</span>
              </div>
            </div>

            {featuredStory ? (
              <section className="hero">
                <Link href={`/news/${featuredStory.slug}`} className={`hero-main${featuredStory.image ? '' : ' hero-main-no-image'}`}>
                  {featuredStory.image ? <Image src={featuredStory.image} alt={featuredStory.imageAlt || featuredStory.title} fill priority sizes="(max-width: 768px) 100vw, 62vw" /> : null}
                  <div className="hero-copy">
                    <div className="kicker">{categoryLabel(featuredStory.category)} · प्रमुख खबर</div>
                    <h1>{featuredStory.title}</h1>
                    <div className="meta">{featuredStory.publishedAt} · {featuredStory.isOriginal ? 'Kashi Live News 24' : `स्रोत: ${featuredStory.source || featuredStory.author}`}</div>
                  </div>
                </Link>
                <div className="side-stories">
                  {secondaryStories.map((story) => (
                    <Link href={`/news/${story.slug}`} className="story-row" key={story.slug}>
                      {story.image ? <Image src={story.image} alt={story.imageAlt || story.title} width={140} height={92} sizes="140px" /> : null}
                      <div>
                        <div className="kicker">{categoryLabel(story.category)}</div>
                        <h3>{story.title}</h3>
                        <div className="meta">{story.publishedAt}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {!contentStories.length ? <p className="empty live-empty">आज की तारीख की सत्यापित लाइव खबर अभी स्रोत से उपलब्ध नहीं है।</p> : null}

            <AdSlot label="Top banner" />

            {!category ? (
              <section className="story-section premium-strip">
                <div className="section-head">
                  <h2>स्थानीय खबरें</h2>
                  <span>लाइव डेस्क</span>
                </div>
                <div className="mini-grid">
                  {localHighlights.map((story) => (
                    <Link href={`/news/${story.slug}`} key={story.slug} className="mini-card">
                      <span className="mini-tag">{categoryLabel(story.category)}</span>
                      <h3>{story.title}</h3>
                      <p>{story.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {category ? (
              <section className="story-section">
                <div className="section-head">
                  <h2>{categoryLabel(category)} खबरें</h2>
                  <span>{storyList.length} लाइव खबरें</span>
                </div>
                {storyList.length ? (
                  <div className="news-grid">
                    {storyList.map((story) => <Card story={story} key={story.slug} />)}
                  </div>
                ) : (
                  <p className="empty">आज {categoryLabel(category)} की सत्यापित खबर उपलब्ध नहीं है।</p>
                )}
              </section>
            ) : (
              <>
                <StorySection title="ताज़ा खबरें" stories={latestStories} />
                <StorySection title="वाराणसी खबरें" category="Varanasi" stories={contentStories.filter((story) => story.category === 'Varanasi')} />
                <StorySection title="काशी खबरें" category="Kashi" stories={contentStories.filter((story) => story.category === 'Kashi')} />
                {categorySections.map((sectionCategory) => (
                  <StorySection key={sectionCategory} title={`${categoryLabel(sectionCategory)} खबरें`} category={sectionCategory} stories={contentStories.filter((story) => story.category === sectionCategory)} />
                ))}
              </>
            )}

            <AdSlot label="In-article" />
          </div>

          {!category ? (
            <aside className="sidebar" aria-label="Sidebar news and categories">
              <div className="sidebar-block ad-block">
                <h3>प्रायोजित</h3>
                <AdSlot label="Sidebar" />
              </div>
              <div className="sidebar-block">
                <h3>सबसे ज्यादा पढ़ी गई</h3>
                {contentStories.slice(0, 4).map((story, index) => (
                  <Link href={`/news/${story.slug}`} key={story.slug} className="sidebar-item">
                    <span className="sidebar-rank">{index + 1}</span>
                    <div>
                      <strong>{story.title}</strong>
                      <small>{categoryLabel(story.category)}</small>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="sidebar-block">
                <h3>ताज़ा खबरें</h3>
                {latestStories.slice(0, 4).map((story) => (
                  <Link href={`/news/${story.slug}`} key={story.slug} className="sidebar-link">{story.title}</Link>
                ))}
              </div>
              <div className="sidebar-block">
                <h3>ट्रेंडिंग</h3>
                {['Varanasi', 'Kashi', 'Politics', 'Crime', 'Sports'].map((tag) => (
                  <Link key={tag} href={toCategoryRoute(tag)} className="chip">{categoryLabel(tag)}</Link>
                ))}
              </div>
              <div className="sidebar-block">
                <h3>लोकप्रिय श्रेणियां</h3>
                <div className="chip-list">
                  {['Politics', 'Varanasi', 'Crime', 'Education', 'Business', 'Sports'].map((tag) => (
                    <Link key={tag} href={toCategoryRoute(tag)} className="chip">{categoryLabel(tag)}</Link>
                  ))}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
