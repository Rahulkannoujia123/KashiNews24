import Link from 'next/link'
import SiteHeader from '../components/site-header'
import SiteFooter from '../components/site-footer'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="shell static-page">
          <h1 className="page-title" style={{ fontSize: 72 }}>404</h1>
          <p className="article-lead">
            Yeh page nahi mila. Shayad khabar hata di gayi ho ya link galat ho.
          </p>
          <p>
            <Link className="primary" href="/">← Home par wapas jaayein</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
