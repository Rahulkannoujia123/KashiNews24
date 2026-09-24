import Link from 'next/link'
import { SITE, CATEGORIES, LEGAL_LINKS, categoryHref } from '../lib/site'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand" style={{ marginBottom: 14 }}>
            <div className="brand-mark" aria-hidden="true">क</div>
            <div className="brand-name" style={{ color: '#fff' }}>
              {SITE.shortName}
              <span>{SITE.tagline}</span>
            </div>
          </div>
          <p>{SITE.description}</p>
          <p style={{ marginTop: 12 }}>
            Kashi Live News 24 ek independent digital news platform hai. Hum
            local reporting ke saath verified national aur agency updates bhi
            publish karte hain, source ke saath.
          </p>
        </div>

        <div>
          <h4>Sections</h4>
          <ul className="footer-links">
            {CATEGORIES.slice(0, 8).map((category) => (
              <li key={category}>
                <Link href={categoryHref(category)}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul className="footer-links">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/send-news">Send Us News</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {year} {SITE.name}. All rights reserved.</span>
        <span>Made in Varanasi, Uttar Pradesh · भारत</span>
      </div>
    </footer>
  )
}
