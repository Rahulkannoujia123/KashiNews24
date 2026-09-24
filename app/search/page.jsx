import Link from 'next/link'
import SiteHeader from '../../components/site-header'
import SiteFooter from '../../components/site-footer'
import ArticleCard from '../../components/article-card'
import Sidebar from '../../components/sidebar'
import { fetchFreshStories, stories } from '../../lib/news'
import { SITE } from '../../lib/site'

export const revalidate = 900

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams
  const q = (sp?.q || '').trim()
  return {
    title: q ? `Search: ${q} - ${SITE.name}` : `Search - ${SITE.name}`,
    description: `Kashi Live News 24 par khabar dhoondein.`,
    robots: { index: false, follow: true },
  }
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams
  const q = (sp?.q || '').trim()
  const pool = await fetchFreshStories('')
  const all = [...pool, ...stories].filter(
    (story, index, list) => list.findIndex((s) => s.slug === story.slug) === index,
  )

  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  const results = q
    ? all.filter((story) => {
        const haystack =
          `${story.title} ${story.excerpt} ${story.category} ${story.location || ''}`.toLowerCase()
        return terms.some((term) => haystack.includes(term))
      })
    : []

  return (
    <>
      <SiteHeader />
      <main>
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Search</span>
          </nav>
          <div className="section-head">
            <h1 className="page-title">{q ? `Results for "${q}"` : 'Search'}</h1>
            {q && <span className="count">{results.length} found</span>}
          </div>
          <div className="page-grid">
            <div>
              {!q && (
                <div className="empty">
                  <p>Upar search icon par click karke koi keyword type karein.</p>
                </div>
              )}
              {q && results.length === 0 && (
                <div className="empty">
                  <p>&quot;{q}&quot; se koi khabar match nahi hui. Doosra keyword try karein.</p>
                  <Link className="read" href="/">← Home</Link>
                </div>
              )}
              {results.length > 0 && (
                <div className="news-grid">
                  {results.map((story) => (
                    <ArticleCard key={story.slug} story={story} />
                  ))}
                </div>
              )}
            </div>
            <Sidebar latest={pool} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
