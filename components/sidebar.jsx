import Link from 'next/link'
import AdSlot from './ad-slot'
import { relativeTime } from '../lib/format'
import { CATEGORIES, categoryHref } from '../lib/site'

export default function Sidebar({ latest = [] }) {
  const items = latest.slice(0, 6)
  return (
    <aside className="sidebar" aria-label="Latest and categories">
      <div className="side-card">
        <h3 className="side-title">ताज़ा खबरें · Latest</h3>
        <ol className="rank-list">
          {items.map((story, index) => (
            <li key={story.slug}>
              <span className="rank-num">{index + 1}</span>
              <div>
                <Link href={`/news/${story.slug}`}>{story.title}</Link>
                {story.publishedISO && (
                  <span className="meta">{relativeTime(story.publishedISO)}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_MIDDLE_SLOT} />

      <div className="side-card">
        <h3 className="side-title">Categories</h3>
        <div className="chip-row">
          {CATEGORIES.map((category) => (
            <Link key={category} href={categoryHref(category)} className="chip">
              {category}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
