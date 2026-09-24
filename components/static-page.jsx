import Link from 'next/link'
import SiteHeader from './site-header'
import SiteFooter from './site-footer'

export default function StaticPage({ title, updated, children }) {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="shell static-page">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{title}</span>
          </nav>
          <h1 className="page-title">{title}</h1>
          {updated && <p className="meta">Last updated: {updated}</p>}
          <div className="prose">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
