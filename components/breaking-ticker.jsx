import Link from 'next/link'

export default function BreakingTicker({ stories = [] }) {
  const items = stories.slice(0, 6)
  if (!items.length) return null
  return (
    <div className="ticker" role="region" aria-label="Breaking news">
      <div className="shell">
        <span className="ticker-label">BREAKING</span>
        <div className="ticker-track">
          {items.map((story, index) => (
            <span key={story.slug}>
              <Link href={`/news/${story.slug}`}>{story.title}</Link>
              {index < items.length - 1 && <span className="ticker-sep"> • </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
