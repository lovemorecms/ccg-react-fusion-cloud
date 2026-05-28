import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../FusionButton'
import { DocOnThisPageNav, type DocTocItem } from './DocOnThisPageNav'

export type KnowledgeBaseNavLink = {
  label: string
  to?: string
  href?: string
  active?: boolean
}

export type KnowledgeBaseNavGroup = {
  id: string
  title: string
  links: KnowledgeBaseNavLink[]
  defaultOpen?: boolean
}

export type KnowledgeBaseTocItem = DocTocItem

export type KnowledgeBaseQuickLink = {
  label: string
  href: string
}

export type KnowledgeBasePageLayoutProps = {
  breadcrumbs: ReactNode
  /** Full-width header above the three-column grid */
  pageTitle: string
  pageSubtext: string
  /** Center column heading and optional lead */
  articleTitle: string
  articleIntro?: string
  topNavSections?: string[]
  navGroups?: KnowledgeBaseNavGroup[]
  bottomNavSections?: string[]
  onThisPage: KnowledgeBaseTocItem[]
  quickLinks: KnowledgeBaseQuickLink[]
  showRailCta?: boolean
  showFooterCta?: boolean
  children: ReactNode
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3H3v10h10V10M11 2h3v3M8 8l6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

function useDocNavFilter(
  query: string,
  topNavSections: string[],
  bottomNavSections: string[],
  navGroups: KnowledgeBaseNavGroup[],
) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    const match = (s: string) => !q || s.toLowerCase().includes(q)
    const top = topNavSections.filter(match)
    const bottom = bottomNavSections.filter(match)
    const groups = navGroups
      .map((group) => ({
        ...group,
        links: group.links.filter((item) => match(item.label)),
      }))
      .filter((group) => !q || match(group.title) || group.links.length > 0)
    const navIsEmpty = top.length === 0 && bottom.length === 0 && groups.length === 0
    return { q, top, bottom, groups, navIsEmpty }
  }, [query, topNavSections, bottomNavSections, navGroups])
}

export function KnowledgeBasePageLayout({
  breadcrumbs,
  pageTitle,
  pageSubtext,
  articleTitle,
  articleIntro,
  topNavSections = [],
  navGroups = [],
  bottomNavSections = [],
  onThisPage,
  quickLinks,
  showRailCta = true,
  showFooterCta = true,
  children,
}: KnowledgeBasePageLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navSearch, setNavSearch] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navGroups.map((g) => [g.id, g.defaultOpen ?? true])),
  )

  const filteredNav = useDocNavFilter(navSearch, topNavSections, bottomNavSections, navGroups)

  useEffect(() => {
    if (navSearch.trim()) {
      setOpenGroups((prev) => {
        const next = { ...prev }
        navGroups.forEach((g) => {
          next[g.id] = true
        })
        return next
      })
    }
  }, [navSearch, navGroups])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)')
    const onChange = () => {
      if (mq.matches) setSidebarCollapsed(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const layoutClass = [
    'ddoc-layout',
    mobileNavOpen && 'ddoc-layout--nav-open',
    sidebarCollapsed && 'ddoc-layout--sidebar-collapsed',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div className="ddoc-breadcrumb-bar">{breadcrumbs}</div>

      <div className="ddoc-shell tpl-3col-shell">
        <header className="tpl-2col-page-header tpl-3col-page-header">
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
          Documentation menu
          <ChevronRight className={mobileNavOpen ? 'ddoc-mobile-nav-toggle__chev--open' : undefined} />
        </button>

        <div className={layoutClass}>
          <aside
            className={`ddoc-sidebar${sidebarCollapsed ? ' ddoc-sidebar--collapsed' : ''}`}
            aria-label="Documentation sections"
          >
            {sidebarCollapsed ? (
              <button
                type="button"
                className="ddoc-sidebar__rail-toggle"
                onClick={() => setSidebarCollapsed(false)}
                aria-expanded={false}
                aria-label="Expand documentation navigation"
                title="Expand documentation navigation"
              >
                <ChevronRight />
                <span className="ddoc-sidebar__rail-toggle-text">Nav</span>
              </button>
            ) : (
              <div className="ddoc-sidebar__sticky-stack">
                <div className="ddoc-sidebar__toolbar">
                  <button
                    type="button"
                    className="ddoc-sidebar__collapse-trigger"
                    onClick={() => setSidebarCollapsed(true)}
                    aria-expanded={!sidebarCollapsed}
                    aria-controls="kb-sidebar-panel"
                    aria-label="Collapse documentation navigation"
                    title="Collapse documentation navigation"
                  >
                    <ChevronLeft />
                    <span>Collapse</span>
                  </button>
                </div>
                <form className="ddoc-sidebar__search" role="search" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="kb-nav-search" className="ddoc-sidebar__search-label">
                    Filter documentation navigation
                  </label>
                  <div className="ddoc-sidebar__search-field">
                    <svg
                      className="ddoc-sidebar__search-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M19 19l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="kb-nav-search"
                      type="search"
                      value={navSearch}
                      onChange={(e) => setNavSearch(e.target.value)}
                      placeholder="Search navigation…"
                      className="ddoc-sidebar__search-input"
                      autoComplete="off"
                    />
                  </div>
                </form>
                <div id="kb-sidebar-panel" className="ddoc-sidebar__card">
                  <nav className="ddoc-side-nav">
                    {filteredNav.navIsEmpty ? (
                      <p className="ddoc-sidebar__empty">No matching sections.</p>
                    ) : (
                      <>
                        {filteredNav.top.map((label) => (
                          <button key={label} type="button" className="ddoc-side-nav__row">
                            <span className="ddoc-side-nav__label">{label}</span>
                            <ChevronRight className="ddoc-side-nav__chev" />
                          </button>
                        ))}

                        {filteredNav.groups.map((group) => {
                          const isOpen = openGroups[group.id] ?? true
                          return (
                            <div key={group.id} className="ddoc-side-nav__group">
                              <button
                                type="button"
                                className="ddoc-side-nav__group-header"
                                aria-expanded={isOpen}
                                aria-controls={`kb-nav-group-${group.id}`}
                                id={`kb-nav-toggle-${group.id}`}
                                onClick={() =>
                                  setOpenGroups((prev) => ({ ...prev, [group.id]: !isOpen }))
                                }
                              >
                                <span className="ddoc-side-nav__group-title">{group.title}</span>
                                <ChevronRight
                                  className={`ddoc-side-nav__chev${isOpen ? ' ddoc-side-nav__chev--open' : ''}`}
                                />
                              </button>
                              <ul
                                id={`kb-nav-group-${group.id}`}
                                className="ddoc-side-nav__sub"
                                hidden={!isOpen}
                                aria-labelledby={`kb-nav-toggle-${group.id}`}
                              >
                                {group.links.length === 0 ? (
                                  <li className="ddoc-sidebar__sub-empty">No matching topics.</li>
                                ) : (
                                  group.links.map((item) => (
                                    <li key={item.label}>
                                      {item.to ? (
                                        <Link
                                          to={item.to}
                                          className={
                                            item.active
                                              ? 'ddoc-side-nav__sublink ddoc-side-nav__sublink--active'
                                              : 'ddoc-side-nav__sublink'
                                          }
                                          aria-current={item.active ? 'page' : undefined}
                                        >
                                          {item.label}
                                        </Link>
                                      ) : (
                                        <a href={item.href ?? '#'} className="ddoc-side-nav__sublink">
                                          {item.label}
                                        </a>
                                      )}
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          )
                        })}

                        {filteredNav.bottom.map((label) => (
                          <button key={label} type="button" className="ddoc-side-nav__row">
                            <span className="ddoc-side-nav__label">{label}</span>
                            <ChevronRight className="ddoc-side-nav__chev" />
                          </button>
                        ))}
                      </>
                    )}
                  </nav>
                </div>
              </div>
            )}
          </aside>

          <article className="ddoc-article">
            <h2 className="tpl-3col-article__title">{articleTitle}</h2>
            {articleIntro ? <p className="ddoc-article__intro">{articleIntro}</p> : null}
            {children}
          </article>

          <aside className="ddoc-rail" aria-label="Page tools">
            <div className="ddoc-rail__card">
              <h3 className="ddoc-rail__title">On this page</h3>
              <DocOnThisPageNav items={onThisPage} />
            </div>
            <div className="ddoc-rail__card">
              <h3 className="ddoc-rail__title">Quick links</h3>
              <ul className="ddoc-quick">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="ddoc-quick__link">
                      <ExternalLinkIcon className="ddoc-quick__icon" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {showRailCta ? (
              <div className="ddoc-rail__cta">
                <h3 className="ddoc-rail__cta-title">Need assistance?</h3>
                <p className="ddoc-rail__cta-text">Our support team is here to help you with any questions.</p>
                <FusionButton href="#" accent onDark className="ddoc-rail__cta-btn">
                  Contact Support
                </FusionButton>
              </div>
            ) : null}
          </aside>
        </div>

        {showFooterCta ? (
          <section className="ddoc-footer-cta" aria-label="Get started">
            <div className="ddoc-footer-cta__inner">
              <div className="ddoc-footer-cta__col">
                <h3 className="ddoc-footer-cta__heading">Ready to get started?</h3>
                <p className="ddoc-footer-cta__p">
                  Get started with our comprehensive guides and tutorials to begin building on CMS Hybrid Cloud.
                </p>
                <FusionButton href="#" accent onDark>
                  Request Access
                </FusionButton>
              </div>
              <div className="ddoc-footer-cta__col">
                <h3 className="ddoc-footer-cta__heading">Want assistance?</h3>
                <p className="ddoc-footer-cta__p">
                  Our team is ready to support you through your cloud journey with expert guidance and resources.
                </p>
                <a href="#" className="ddoc-footer-cta__textlink">
                  Contact Support
                  <ChevronRight />
                </a>
              </div>
              <div className="ddoc-footer-cta__col">
                <h3 className="ddoc-footer-cta__heading">Have more questions?</h3>
                <p className="ddoc-footer-cta__p">
                  Browse our knowledge base and community forums for answers to common questions.
                </p>
                <a href="#" className="ddoc-footer-cta__textlink">
                  Visit Help Center
                  <ChevronRight />
                </a>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </>
  )
}
