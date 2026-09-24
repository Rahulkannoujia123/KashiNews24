import Link from 'next/link'
import { relativeTime } from '../lib/format'
import { categoryHref } from '../lib/site'

export default function ArticleCard({ story }) {
  return (
    <article className="card">
      <Link href={`/news/${story.slug}`} aria-hidden="true" tabIndex={-1} className="card-media">
        <img
          src={story.image || '/placeholder.svg'}
          alt={story.title}
          loading="lazy"
        />
      </Link>
      <div className="card-body">
        <Link href={categoryHref(story.category)} className="kicker">{story.category}</Link>
        <h3>
          <Link href={`/news/${story.slug}`}>{story.title}</Link>
        </h3>
        <p>{story.excerpt}</p>
        <div className="card-foot">
          <span className="meta">
            {story.isOriginal ? story.author : `Source: ${story.source || story.author}`}
            {story.publishedISO ? ` · ${relativeTime(story.publishedISO)}` : ''}
          </span>
          <Link className="read" href={`/news/${story.slug}`}>Read →</Link>
        </div>
      </div>
    </article>
  )
}
