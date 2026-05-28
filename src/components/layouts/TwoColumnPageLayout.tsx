import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type TwoColumnNavItem = {
  id: string
  label: string
  href?: string
  to?: string
  active?: boolean
  onClick?: () => void
}

export type TwoColumnPageLayoutProps = {
  breadcrumbs: ReactNode
  /** Full-width page header above the two columns */
  pageTitle: string
  pageSubtext: string
  navLabel?: string
  navItems: TwoColumnNavItem[]
  /** Title shown at the top of the right content panel */
  contentTitle: string
  children: ReactNode
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NavRow({ item, onNavigate }: { item: TwoColumnNavItem; onNavigate?: () => void }) {
  const row = <span className="ddoc-side-nav__label">{item.label}</span>

  const handleActivate = () => {
    item.onClick?.()
    onNavigate?.()
  }

  if (item.to) {
    return (
      <Link
        to={item.to}
        className={item.active ? 'ddoc-side-nav__row ddoc-side-nav__row--active' : 'ddoc-side-nav__row'}
        aria-current={item.active ? 'page' : undefined}
        onClick={onNavigate}
      >
        {row}
      </Link>
    )
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        className={item.active ? 'ddoc-side-nav__row ddoc-side-nav__row--active' : 'ddoc-side-nav__row'}
        aria-current={item.active ? 'page' : undefined}
        onClick={onNavigate}
      >
        {row}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={item.active ? 'ddoc-side-nav__row ddoc-side-nav__row--active' : 'ddoc-side-nav__row'}
      onClick={handleActivate}
    >
      {row}
    </button>
  )
}

export function TwoColumnPageLayout({
  breadcrumbs,
  pageTitle,
  pageSubtext,
  navLabel = 'Section navigation',
  navItems,
  contentTitle,
  children,
}: TwoColumnPageLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)')
    const onChange = () => {
      if (!mq.matches) setMobileNavOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <div className="ddoc-breadcrumb-bar">{breadcrumbs}</div>

      <div className="tpl-2col-shell">
        <header className="tpl-2col-page-header">
          <div className="tpl-2col-page-header__inner">
            <h1 className="tpl-2col-page-header__title">{pageTitle}</h1>
            <p className="tpl-2col-page-header__subtext">{pageSubtext}</p>
          </div>
        </header>

        <button
          type="button"
          className="ddoc-mobile-nav-toggle"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {navLabel}
          <ChevronRight className={mobileNavOpen ? 'ddoc-mobile-nav-toggle__chev--open' : undefined} />
        </button>

        <div className={`tpl-2col-layout${mobileNavOpen ? ' tpl-2col-layout--nav-open' : ''}`}>
          <aside className="ddoc-sidebar tpl-2col-sidebar" aria-label={navLabel}>
            <div className="ddoc-sidebar__sticky-stack">
              <div className="ddoc-sidebar__card">
                <nav className="ddoc-side-nav">
                  {navItems.map((item) => (
                    <NavRow key={item.id} item={item} onNavigate={() => setMobileNavOpen(false)} />
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <div className="tpl-2col-content ddoc-article">
            <h2 className="tpl-2col-content__title">{contentTitle}</h2>
            <div className="tpl-2col-content__body">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
