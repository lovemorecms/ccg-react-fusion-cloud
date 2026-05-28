import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  navDemoMenuItems,
  type NavCategory,
  type NavCategoryPanel,
  type NavMenuItem,
} from '../../data/navDemoMenu'

const defaultLegacyCcg = {
  label: 'Legacy CCG',
  href: '#legacy-ccg',
  modalTitle: 'Redirecting to CCG Legacy',
  modalMessage: 'You are being redirected to the CCG Legacy website.',
}
import { FusionButton } from '../FusionButton'
import { SearchIcon } from '../SearchIcon'

function ChevronDown({ className, rotated }: { className?: string; rotated?: boolean }) {
  return (
    <svg
      className={`shrink-0 transition-transform duration-200 ${rotated ? 'rotate-180' : ''} ${className ?? ''}`}
      style={{ width: 12, height: 12, marginLeft: 4, marginTop: 2 }}
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function IconMenuClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function MegaLink({ label, href, onNavigate }: { label: string; href: string; onNavigate: (e: React.MouseEvent, href: string) => void }) {
  return (
    <a href={href} className="fusion-mega-link group inline-flex items-center gap-1.5" onClick={(e) => onNavigate(e, href)}>
      {label}
      <svg
        className="size-3.5 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path
          d="M4.5 2.5L8 6L4.5 9.5"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

function MegaMoreButton({
  href,
  onNavigate,
}: {
  href: string
  onNavigate: (e: React.MouseEvent, href: string) => void
}) {
  return (
    <button
      type="button"
      className="fusion-mega-more-btn"
      onClick={(e) => onNavigate(e, href)}
    >
      Learn more
    </button>
  )
}

function RightPanel({
  category,
  onNavigate,
}: {
  category: NavCategory
  onNavigate: (e: React.MouseEvent, href: string) => void
}) {
  const { panel } = category
  const isCappedCategory = category.id === 'knowledge-center' || category.id === 'customer-roadmap'
  const learnMoreHref =
    category.id === 'customer-roadmap' ? '/learn/initiatives' : '/learn/knowledge-center'

  if (panel.type === 'empty') {
    return (
      <div className="fusion-nav-v2__panel-content" key={category.id}>
        <ul className="fusion-nav-v2__link-list">
          <li>
            <MegaLink label={category.label} href="#" onNavigate={onNavigate} />
          </li>
        </ul>
      </div>
    )
  }

  if (panel.type === 'cards') {
    return (
      <div className="fusion-nav-v2__panel-content" key={category.id}>
        <div className="fusion-nav-v2__toolkit-grid">
          {panel.links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="fusion-nav-v2__toolkit-card"
              onClick={(e) => onNavigate(e, item.href)}
            >
              <span className="fusion-nav-v2__toolkit-card-label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (panel.type === 'columns') {
    const colClass =
      panel.columns.length >= 4
        ? 'fusion-nav-v2__columns fusion-nav-v2__columns--4'
        : panel.columns.length === 3
          ? 'fusion-nav-v2__columns fusion-nav-v2__columns--3'
          : 'fusion-nav-v2__columns'

    return (
      <div className={`fusion-nav-v2__panel-content ${colClass}`} key={category.id}>
        {panel.columns.map((col) => (
          <div key={col.title} className="fusion-nav-v2__column">
            <h4 className="fusion-nav-v2__column-title">{col.title}</h4>
            <ul className="fusion-nav-v2__link-list">
              {(isCappedCategory ? col.links.slice(0, 8) : col.links).map((item) => (
                <li key={item.label}>
                  <MegaLink label={item.label} href={item.href} onNavigate={onNavigate} />
                </li>
              ))}
              {isCappedCategory && col.links.length > 8 ? (
                <li key={`${col.title}-learn-more`}>
                  <MegaMoreButton href={learnMoreHref} onNavigate={onNavigate} />
                </li>
              ) : null}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="fusion-nav-v2__panel-content fusion-nav-v2__panel-content--list" key={category.id}>
      <ul className="fusion-nav-v2__link-list">
        {panel.links.map((item) => (
          <li key={item.label}>
            <MegaLink label={item.label} href={item.href} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export type FusionSiteNavV2Props = {
  searchOpen: boolean
  onSearchToggle: () => void
  onSearchClose: () => void
  menuItems?: NavMenuItem[]
  legacyCcg?: {
    label: string
    href: string
    modalTitle: string
    modalMessage: string
  }
}

export function FusionSiteNavV2({
  searchOpen,
  onSearchToggle,
  onSearchClose,
  menuItems = navDemoMenuItems,
  legacyCcg = defaultLegacyCcg,
}: FusionSiteNavV2Props) {
  const navRef = useRef<HTMLDivElement>(null)
  const legacyModalRef = useRef<HTMLDivElement>(null)
  const legacyTriggerRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()

  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [mobileNavId, setMobileNavId] = useState<string | null>(null)
  const [mobileCategoryId, setMobileCategoryId] = useState<string | null>(null)
  const [legacyCcgModalOpen, setLegacyCcgModalOpen] = useState(false)
  const legacyModalTitleId = useId()
  const legacyModalDescId = useId()

  const activeItem = menuItems.find((item) => item.id === activeMenu)
  const activeCategory =
    activeItem?.categories.find((c) => c.id === activeCategoryId) ?? activeItem?.categories[0]

  const closeMenu = useCallback(() => {
    setActiveMenu(null)
    setActiveCategoryId(null)
  }, [])

  const toggleMenu = useCallback(
    (id: string) => {
      setActiveMenu((current) => {
        if (current === id) {
          setActiveCategoryId(null)
          return null
        }
        const item = menuItems.find((m) => m.id === id)
        setActiveCategoryId(item?.categories[0]?.id ?? null)
        return id
      })
      setMobileDrawerOpen(false)
      onSearchClose()
    },
    [menuItems, onSearchClose],
  )

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (href.startsWith('/')) {
        e.preventDefault()
        closeMenu()
        setMobileDrawerOpen(false)
        navigate(href)
      } else {
        closeMenu()
        setMobileDrawerOpen(false)
      }
    },
    [navigate, closeMenu],
  )

  const openLegacyCcgModal = useCallback(() => {
    setMobileDrawerOpen(false)
    closeMenu()
    setLegacyCcgModalOpen(true)
  }, [closeMenu])

  const closeLegacyCcgModal = useCallback(() => {
    setLegacyCcgModalOpen(false)
    legacyTriggerRef.current?.focus()
  }, [])

  const continueToLegacyCcg = useCallback(() => {
    window.location.assign(legacyCcg.href)
  }, [legacyCcg.href])

  const toggleMobileDrawer = useCallback(() => {
    setMobileDrawerOpen((open) => {
      const next = !open
      if (next) {
        onSearchClose()
        closeMenu()
      }
      return next
    })
  }, [closeMenu, onSearchClose])

  const handleSearchClick = useCallback(() => {
    setMobileDrawerOpen(false)
    closeMenu()
    onSearchToggle()
  }, [closeMenu, onSearchToggle])

  useEffect(() => {
    if (!activeMenu && !mobileDrawerOpen) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu()
        setMobileDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [activeMenu, mobileDrawerOpen, closeMenu])

  useEffect(() => {
    if (!activeMenu && !mobileDrawerOpen && !legacyCcgModalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (legacyCcgModalOpen) closeLegacyCcgModal()
        else {
          closeMenu()
          setMobileDrawerOpen(false)
        }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeMenu, mobileDrawerOpen, legacyCcgModalOpen, closeMenu, closeLegacyCcgModal])

  useEffect(() => {
    if (!activeMenu && !mobileDrawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [activeMenu, mobileDrawerOpen])

  useEffect(() => {
    if (!legacyCcgModalOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    legacyModalRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [legacyCcgModalOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => {
      if (mq.matches) {
        setMobileDrawerOpen(false)
        setMobileNavId(null)
        setMobileCategoryId(null)
      }
    }
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  const onCategoryKeyDown = useCallback(
    (e: React.KeyboardEvent, item: NavMenuItem, index: number) => {
      const categories = item.categories
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = (index + 1) % categories.length
        setActiveCategoryId(categories[next].id)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = (index - 1 + categories.length) % categories.length
        setActiveCategoryId(categories[prev].id)
      } else if (e.key === 'Home') {
        e.preventDefault()
        setActiveCategoryId(categories[0].id)
      } else if (e.key === 'End') {
        e.preventDefault()
        setActiveCategoryId(categories[categories.length - 1].id)
      }
    },
    [],
  )

  const renderMobileLinks = (panel: NavCategoryPanel, category: NavCategory) => {
    if (panel.type === 'empty') {
      return (
        <ul className="fusion-site-nav__mobile-link-list">
          <li>
            <a href="#" className="fusion-site-nav__mobile-link" onClick={(e) => handleLinkClick(e, '#')}>
              {category.label}
            </a>
          </li>
        </ul>
      )
    }
    if (panel.type === 'cards') {
      return (
        <ul className="fusion-site-nav__mobile-link-list">
          {panel.links.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="fusion-site-nav__mobile-link" onClick={(e) => handleLinkClick(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )
    }
    if (panel.type === 'columns') {
      return panel.columns.map((col) => (
        <div key={col.title} className="fusion-site-nav__mobile-col">
          <h4 className="fusion-site-nav__mobile-col-title">{col.title}</h4>
          <ul className="fusion-site-nav__mobile-link-list">
            {col.links.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="fusion-site-nav__mobile-link" onClick={(e) => handleLinkClick(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))
    }
    return (
      <ul className="fusion-site-nav__mobile-link-list">
        {panel.links.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="fusion-site-nav__mobile-link" onClick={(e) => handleLinkClick(e, item.href)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="fusion-nav-v2 fusion-site-nav relative" ref={navRef}>
      <div className="mx-auto flex max-w-[var(--fusion-site-max-width)] items-center justify-between px-[var(--fusion-site-padding-x)] py-3 md:px-[var(--fusion-site-padding-x-md)]">
        <a href="/" className="fusion-site-nav__logo inline-flex shrink-0 items-center">
          <img
            src="/images/fusion-orbit-logo.png"
            alt="FUSION Sphere"
            width={213}
            height={49}
            className="h-10 w-auto md:h-[49px]"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-x-1 md:flex lg:gap-x-2">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`fusion-mega-trigger relative inline-flex items-center gap-1 border-0 bg-transparent px-3 py-2.5 text-[color:var(--fusion-blue)] transition-colors hover:text-[color:var(--color-primary-darkest)] lg:px-4 ${
                  isActive ? 'fusion-mega-trigger--active' : ''
                }`}
                style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1 }}
                aria-expanded={isActive}
                aria-controls={isActive ? `fusion-nav-v2-mega-${item.id}` : undefined}
                onClick={() => toggleMenu(item.id)}
              >
                <span>{item.label}</span>
                <ChevronDown rotated={isActive} />
                <span
                  className={`pointer-events-none absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[color:var(--fusion-blue)] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            className="fusion-site-nav__menu-btn flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-white p-2 text-[color:var(--fusion-blue)] shadow-sm md:hidden"
            aria-expanded={mobileDrawerOpen}
            aria-controls="fusion-nav-v2-mobile-drawer"
            aria-label={mobileDrawerOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobileDrawer}
          >
            {mobileDrawerOpen ? <IconMenuClose /> : <IconMenu />}
          </button>

          <button
            type="button"
            className={`flex size-10 items-center justify-center rounded-lg border-0 p-2 text-[color:var(--fusion-blue)] transition-colors hover:bg-neutral-100 ${
              searchOpen ? 'bg-neutral-100' : 'bg-transparent'
            }`}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            onClick={handleSearchClick}
          >
            <SearchIcon className="size-5 shrink-0" />
          </button>

          <button
            ref={legacyTriggerRef}
            type="button"
            className="fusion-site-nav__legacy-link"
            onClick={openLegacyCcgModal}
          >
            {legacyCcg.label}
          </button>

          <FusionButton href="#get-help" accent size="small" className="fusion-site-nav__get-help">
            Get Help
          </FusionButton>
        </div>
      </div>

      {activeMenu && activeItem && activeCategory
        ? createPortal(
            <button
              type="button"
              className="fusion-nav-v2__overlay"
              aria-label="Close menu"
              onClick={closeMenu}
            />,
            document.body,
          )
        : null}

      {activeMenu && activeItem && activeCategory ? (
        <div
          id={`fusion-nav-v2-mega-${activeItem.id}`}
          className="fusion-nav-v2__mega hidden md:block"
          role="region"
          aria-label={`${activeItem.label} menu`}
        >
          <div
            key={activeItem.id}
            className="fusion-nav-v2__mega-swap"
          >
            <div className="fusion-nav-v2__mega-container mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] md:px-[var(--fusion-site-padding-x-md)]">
              <div className="fusion-nav-v2__mega-inner">
              <div className="fusion-nav-v2__left">
                <h2
                  id={`fusion-nav-v2-menu-${activeItem.id}`}
                  className="fusion-nav-v2__menu-title"
                >
                  <a
                    href={activeItem.href}
                    className="fusion-nav-v2__menu-title-link"
                    onClick={(e) => handleLinkClick(e, activeItem.href)}
                  >
                    {activeItem.label}
                  </a>
                </h2>
                <div
                  role="tablist"
                  aria-labelledby={`fusion-nav-v2-menu-${activeItem.id}`}
                  className="fusion-nav-v2__categories"
                >
                {activeItem.categories.map((cat, index) => {
                  const selected = activeCategoryId === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      id={`fusion-nav-v2-tab-${activeItem.id}-${cat.id}`}
                      aria-selected={selected}
                      aria-controls={`fusion-nav-v2-panel-${activeItem.id}`}
                      tabIndex={selected ? 0 : -1}
                      className={`fusion-nav-v2__category${selected ? ' fusion-nav-v2__category--active' : ''}`}
                      onFocus={() => setActiveCategoryId(cat.id)}
                      onClick={() => setActiveCategoryId(cat.id)}
                      onKeyDown={(e) => onCategoryKeyDown(e, activeItem, index)}
                    >
                      {cat.label}
                    </button>
                  )
                })}
                </div>
              </div>
              <div
                id={`fusion-nav-v2-panel-${activeItem.id}`}
                role="tabpanel"
                aria-labelledby={`fusion-nav-v2-tab-${activeItem.id}-${activeCategory.id}`}
                className="fusion-nav-v2__right"
              >
                <RightPanel category={activeCategory} onNavigate={handleLinkClick} />
              </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {legacyCcgModalOpen
        ? createPortal(
            <div className="fusion-legacy-modal" role="presentation">
              <button
                type="button"
                className="fusion-legacy-modal__backdrop"
                aria-label="Close dialog"
                onClick={closeLegacyCcgModal}
              />
              <div
                ref={legacyModalRef}
                className="fusion-legacy-modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={legacyModalTitleId}
                aria-describedby={legacyModalDescId}
                tabIndex={-1}
              >
                <h2 id={legacyModalTitleId} className="fusion-legacy-modal__title">
                  {legacyCcg.modalTitle}
                </h2>
                <p id={legacyModalDescId} className="fusion-legacy-modal__message">
                  {legacyCcg.modalMessage}
                </p>
                <div className="fusion-legacy-modal__actions">
                  <FusionButton type="button" variation="ghost" onClick={closeLegacyCcgModal}>
                    Cancel
                  </FusionButton>
                  <FusionButton type="button" variation="solid" onClick={continueToLegacyCcg}>
                    Continue
                  </FusionButton>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      <div
        id="fusion-nav-v2-mobile-drawer"
        className="fusion-site-nav__mobile-drawer md:hidden"
        hidden={!mobileDrawerOpen}
      >
        <nav aria-label="Primary sections" className="fusion-site-nav__mobile-nav">
          {menuItems.map((item) => (
            <details
              key={item.id}
              className="fusion-site-nav__mobile-details"
              open={mobileNavId === item.id}
              onToggle={(e) => {
                const open = (e.target as HTMLDetailsElement).open
                setMobileNavId(open ? item.id : null)
                if (open) {
                  setMobileCategoryId(item.categories[0]?.id ?? null)
                }
              }}
            >
              <summary className="fusion-site-nav__mobile-summary">{item.label}</summary>
              <div className="fusion-site-nav__mobile-panel fusion-nav-v2__mobile-panel">
                <div className="fusion-nav-v2__mobile-categories" role="list">
                  {item.categories.map((cat) => {
                    const selected = mobileNavId === item.id && mobileCategoryId === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        className={`fusion-nav-v2__mobile-category${selected ? ' fusion-nav-v2__mobile-category--active' : ''}`}
                        onClick={() => {
                          setMobileNavId(item.id)
                          setMobileCategoryId(cat.id)
                        }}
                      >
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
                {mobileNavId === item.id && mobileCategoryId ? (
                  <div className="fusion-nav-v2__mobile-links">
                    {renderMobileLinks(
                      item.categories.find((c) => c.id === mobileCategoryId)?.panel ?? { type: 'empty' },
                      item.categories.find((c) => c.id === mobileCategoryId) ?? item.categories[0],
                    )}
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </nav>
      </div>
    </div>
  )
}
