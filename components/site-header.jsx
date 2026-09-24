'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { SITE, CATEGORIES, categoryHref } from '../lib/site'

function DesktopNav() {
  const params = useSearchParams()
  const active = params.get('category') || ''
  return (
    <nav className="nav" aria-label="Categories (desktop)">
      <div className="shell">
        <Link href="/" className={!active ? 'is-active' : ''}>Home</Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={categoryHref(category)}
            className={active.toLowerCase() === category.toLowerCase() ? 'is-active' : ''}
          >
            {category}
          </Link>
        ))}
      </div>
    </nav>
  )
}

function DesktopNavFallback() {
  return (
    <nav className="nav" aria-label="Categories (desktop)">
      <div className="shell">
        <Link href="/">Home</Link>
        {CATEGORIES.map((category) => (
          <Link key={category} href={categoryHref(category)}>
            {category}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function SiteHeader() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [today, setToday] = useState('')

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat('hi-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      }).format(new Date()),
    )
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const submitSearch = (event) => {
    event.preventDefault()
    const q = query.trim()
    if (!q) return
    setSearchOpen(false)
    setMenuOpen(false)
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header>
      <div className="topbar">
        <div className="shell">
          <span className="location">{SITE.locationLine}</span>
          <span suppressHydrationWarning>{today || '\u00a0'}</span>
        </div>
      </div>

      <div className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand" aria-label={`${SITE.name} homepage`}>
            <div className="brand-mark" aria-hidden="true">क</div>
            <div className="brand-name">
              {SITE.shortName}
              <span>{SITE.tagline}</span>
            </div>
          </Link>
          <div className="mast-actions">
            <button
              className="icon-btn"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              ⌕
            </button>
            <Link className="admin-btn" href="/admin">Admin</Link>
            <button
              className="icon-btn menu-toggle"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <form className="shell" onSubmit={submitSearch} role="search">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Khabar dhoondein... (e.g. BHU, Ganga aarti, traffic)"
              aria-label="Search news"
            />
            <button className="primary" type="submit">Search</button>
          </form>
        </div>
      )}

      <Suspense fallback={<DesktopNavFallback />}>
        <DesktopNav />
      </Suspense>

      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <aside
            className="drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="drawer-head">
              <strong>{SITE.name}</strong>
              <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
            </div>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            {CATEGORIES.map((category) => (
              <Link key={category} href={categoryHref(category)} onClick={() => setMenuOpen(false)}>
                {category}
              </Link>
            ))}
            <div className="drawer-divider" />
            <Link href="/send-news" onClick={() => setMenuOpen(false)}>Send Us News</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </aside>
        </div>
      )}
    </header>
  )
}
