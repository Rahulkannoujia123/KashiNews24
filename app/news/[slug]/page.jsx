import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '../../../components/site-header'
import SiteFooter from '../../../components/site-footer'
import ArticleCard from '../../../components/article-card'
import ShareButtons from '../../../components/share-buttons'
import AdSlot from '../../../components/ad-slot'
import { fetchFreshStories, getStory, stories } from '../../../lib/news'
import { formatDateTime } from '../../../lib/format'
import { SITE, categoryHref } from '../../../lib/site'

export const revalidate = 900

async function resolveStory(slug) {
  const pool = await fetchFreshStories('')
  const fromPool = getStory(slug, pool)
  if (fromPool) return { story: fromPool, pool }
  const fromStatic = getStory(slug, stories)
  if (fromStatic) return { story: fromStatic, pool }
  return { story: null, pool }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { story } = await resolveStory(slug)
  if (!story) return { title: `Story not found - ${SITE.name}` }
  const url = `${SITE.url}/news/${story.slug}`
  return {
    title: `${story.title} - ${SITE.name}`,
    description: story.excerpt,
    alternates: { canonical: `/news/${story.slug}` },
    openGraph: {
      type: 'article',
      title: story.title,
      description: story.excerpt,
      url,
      siteName: SITE.name,
      images: story.image ? [{ url: story.image }] : [],
      publishedTime: story.publishedISO,
      modifiedTime: story.updatedISO || story.publishedISO,
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.excerpt,
      images: story.image ? [story.image] : [],
    },
  }
}

function buildBody(story) {
  const lead = story.excerpt
  if (story.isOriginal) {
    return [
      lead,
      `${SITE.name} ki team is khabar par nazar bnaye hue hai. Jaise hi naye official updates aur bayaan aayenge, is report ko update kiya jaayega.`,
      `Aapke area (${story.location || 'Varanasi'}) se koi khabar ya photo hai? Aap "Send Us News" ke through humein bhej sakte hain — hamari team verify karke publish karti hai.`,
    ]
  }
  return [
    lead,
    `Yeh summary ${story.source || story.author} ki report par aadhaarit hai. Poori aur original khabar padhne ke liye neeche diye source link par jaayein. ${SITE.name} har external khabar ke saath uska source clearly mention karta hai.`,
  ]
}

export default async function Article({ params }) {
  const { slug } = await params
  const { story, pool } = await resolveStory(slug)
  if (!story) notFound()

  const related = pool
    .filter((s) => s.slug !== story.slug && s.category === story.category)
    .slice(0, 3)
  const moreStories = pool.filter((s) => s.slug !== story.slug).slice(0, 3)
  const paragraphs = buildBody(story)
  const showUpdated = story.updatedISO && story.updatedISO !== story.publishedISO

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.title,
    description: story.excerpt,
    image: story.image ? [story.image] : undefined,
    datePublished: story.publishedISO,
    dateModified: story.updatedISO || story.publishedISO,
    articleSection: story.category,
    author: [{ '@type': story.isOriginal ? 'Organization' : 'Organization', name: story.author }],
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/news/${story.slug}` },
    isBasedOn: story.sourceUrl || undefined,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: story.category, item: `${SITE.url}${categoryHref(story.category)}` },
      { '@type': 'ListItem', position: 3, name: story.title, item: `${SITE.url}/news/${story.slug}` },
    ],
  }

  return (
    <>
      <SiteHeader />
      <main>
        <article className="article">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={categoryHref(story.category)}>{story.category}</Link>
          </nav>

          <span className="kicker">{story.category}</span>
          <h1>{story.title}</h1>
          <p className="article-lead">{story.excerpt}</p>

          <div className="byline">
            <span>
              {story.isOriginal ? 'By ' : 'Source: '}
              <strong>{story.isOriginal ? story.author : story.source || story.author}</strong>
            </span>
            {story.location && <span>· {story.location}</span>}
            {story.publishedISO && (
              <span>
                · Published:{' '}
                <time dateTime={story.publishedISO}>{formatDateTime(story.publishedISO)}</time>
              </span>
            )}
            {showUpdated && (
              <span>
                · Updated:{' '}
                <time dateTime={story.updatedISO}>{formatDateTime(story.updatedISO)}</time>
              </span>
            )}
          </div>

          <ShareButtons title={story.title} slug={story.slug} />

          {story.image && (
            <figure>
              <img
                className="article-image"
                src={story.image || '/placeholder.svg'}
                alt={story.title}
              />
              {!story.isOriginal && story.source && (
                <figcaption className="meta">Photo/Report source: {story.source}</figcaption>
              )}
            </figure>
          )}

          <div className="article-content">
            {paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {!story.isOriginal && story.sourceUrl && (
            <p className="source-box">
              Original source:{' '}
              <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer nofollow">
                {story.source || story.author} ↗
              </a>
            </p>
          )}

          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_MIDDLE_SLOT} />

          {related.length > 0 && (
            <section aria-label="Related stories">
              <div className="section-head">
                <h2>Related · {story.category}</h2>
              </div>
              <div className="news-grid">
                {related.map((item) => (
                  <ArticleCard key={item.slug} story={item} />
                ))}
              </div>
            </section>
          )}

          {related.length === 0 && moreStories.length > 0 && (
            <section aria-label="More stories">
              <div className="section-head">
                <h2>More stories</h2>
              </div>
              <div className="news-grid">
                {moreStories.map((item) => (
                  <ArticleCard key={item.slug} story={item} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  )
}
