import Link from 'next/link'
import ArticleCard from './article-card'
import { categoryHref } from '../lib/site'

export default function SectionBlock({ title, category, stories = [], limit = 3 }) {
  const items = stories.slice(0, limit)
  if (!items.length) return null
  return (
    <section aria-label={title}>
      <div className="section-head">
        <h2>{title}</h2>
        {category && <Link href={categoryHref(category)}>View all →</Link>}
      </div>
      <div className="news-grid">
        {items.map((story) => (
          <ArticleCard key={story.slug} story={story} />
        ))}
      </div>
    </section>
  )
}
