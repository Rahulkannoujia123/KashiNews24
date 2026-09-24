import Link from 'next/link'
import SiteHeader from '../components/site-header'
import SiteFooter from '../components/site-footer'
import BreakingTicker from '../components/breaking-ticker'
import ArticleCard from '../components/article-card'
import SectionBlock from '../components/section-block'
import Sidebar from '../components/sidebar'
import AdSlot from '../components/ad-slot'
import { fetchFreshStories, groupByCategory, areas } from '../lib/news'
import { relativeTime } from '../lib/format'
import {
  SITE,
  HOME_SECTIONS,
  CATEGORIES,
  categoryHref,
} from '../lib/site'

export const revalidate = 900

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams
  const category = CATEGORIES.find(
    (c) => c.toLowerCase() === (sp?.category || '').toLowerCase(),
  )
  if (category) {
    return {
      title: `${category} News - ${SITE.name}`,
      description: `${category} se judi latest khabrein, updates aur reports - ${SITE.name}.`,
      alternates: { canonical: categoryHref(category) },
    }
  }
  return {
    title: `${SITE.name} - Varanasi & Kashi Latest Hindi News`,
    description: SITE.description,
    alternates: { canonical: '/' },
  }
}

function HeroBlock({ featured, side }) {
  if (!featured) return null
  return (
    <section className="hero" aria-label="Top stories">
      <Link href={`/news/${featured.slug}`} className="hero-main">
        <img src={featured.image || '/placeholder.svg'} alt={featured.title} />
        <div className="hero-copy">
          <span className="kicker">{featured.category}</span>
          <h1>{featured.title}</h1>
          <p className="meta">
            {featured.isOriginal ? featured.author : `Source: ${featured.source || featured.author}`}
            {featured.publishedISO ? ` · ${relativeTime(featured.publishedISO)}` : ''}
          </p>
        </div>
      </Link>
      <div className="side-stories">
        {side.map((story) => (
          <Link href={`/news/${story.slug}`} className="story-row" key={story.slug}>
            <img src={story.image || '/placeholder.svg'} alt={story.title} loading="lazy" />
            <div>
              <span className="kicker">{story.category}</span>
              <h3>{story.title}</h3>
              <span className="meta">{relativeTime(story.publishedISO)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function AreasBlock() {
  return (
    <section aria-label="Local areas">
      <div className="section-head">
        <h2>इलाके · Varanasi Areas</h2>
      </div>
      <div className="areas">
        {areas.map((area) => (
          <Link key={area} href={`/search?q=${encodeURIComponent(area)}`}>
            {area}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default async function Home({ searchParams }) {
  const sp = await searchParams
  const requested = CATEGORIES.find(
    (c) => c.toLowerCase() === (sp?.category || '').toLowerCase(),
  )

  const pool = await fetchFreshStories(requested || '')

  // Category view: show only stories for the requested category.
  if (requested) {
    return (
      <>
        <SiteHeader />
        <main>
          <div className="shell">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>{requested}</span>
            </nav>
            <div className="section-head">
              <h1 className="page-title">{requested} News</h1>
              <span className="count">{pool.length} stories</span>
            </div>
            <div className="page-grid">
              <div>
                {pool.length ? (
                  <div className="news-grid">
                    {pool.map((story) => (
                      <ArticleCard key={story.slug} story={story} />
                    ))}
                  </div>
                ) : (
                  <div className="empty">
                    <p>Is category mein abhi koi taaza khabar available nahi hai.</p>
                    <Link className="read" href="/">← Home par wapas jaayein</Link>
                  </div>
                )}
                <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT} />
              </div>
              <Sidebar latest={pool} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  // Homepage view.
  const featured = pool[0]
  const side = pool.slice(1, 5)
  const latest = pool.slice(5)
  const used = new Set(pool.slice(0, 5).map((s) => s.slug))
  const grouped = groupByCategory(pool)

  return (
    <>
      <SiteHeader />
      <BreakingTicker stories={pool} />
      <main>
        <div className="shell">
          <HeroBlock featured={featured} side={side} />
          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT} />
          <div className="page-grid">
            <div>
              <SectionBlock title="ताज़ा खबरें · Latest" stories={latest} limit={6} />
              {HOME_SECTIONS.map((category) => {
                const items = (grouped[category] || []).filter((s) => !used.has(s.slug))
                if (!items.length) return null
                items.forEach((s) => used.add(s.slug))
                return (
                  <SectionBlock
                    key={category}
                    title={category}
                    category={category}
                    stories={items}
                    limit={3}
                  />
                )
              })}
              <AreasBlock />
            </div>
            <Sidebar latest={pool} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
