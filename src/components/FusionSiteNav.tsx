import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FusionButton } from './FusionButton'
import { SearchIcon } from './SearchIcon'

type MenuLink = { label: string; href: string }
type MenuColumn = { title?: string; links: MenuLink[] }

type FeaturedCard = {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  ctaVariant: 'navy' | 'gold' | 'green'
}

type MegaMenuItem = {
  id: string
  label: string
  featured: FeaturedCard
  columns: MenuColumn[]
}

const megaMenuItems: MegaMenuItem[] = [
  {
    id: 'about',
    label: 'About',
    featured: {
      title: 'Success Stories',
      description:
        'Discover how organizations are transforming with our platform',
      ctaLabel: 'Read Case Studies',
      ctaHref: '/learn/initiatives',
      ctaVariant: 'navy',
    },
    columns: [
      {
        links: [
          { label: 'Program Overview', href: '/about/program-overview' },
          { label: 'Benefits', href: '/about/program-overview' },
          { label: 'Success Stories', href: '/learn/initiatives' },
          { label: 'Contact Us', href: '/#site-footer' },
        ],
      },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    featured: {
      title: 'Cloud Platforms',
      description:
        'Enterprise-grade infrastructure across AWS, Azure, GCP, and Oracle',
      ctaLabel: 'View All Platforms',
      ctaHref: '/explore',
      ctaVariant: 'navy',
    },
    columns: [
      {
        title: 'Platforms',
        links: [
          { label: 'AWS Commercial', href: '/explore#platforms' },
          { label: 'AWS Outposts', href: '/explore#platforms' },
          { label: 'Azure Commercial', href: '/explore#platforms' },
          { label: 'Google Cloud Platform', href: '/explore#platforms' },
          { label: 'Oracle Cloud Infrastructure', href: '/explore#platforms' },
          { label: 'Oracle at Customer', href: '/explore#platforms' },
        ],
      },
      {
        title: 'Fusion Toolkit',
        links: [
          { label: 'Overview', href: '/explore/fusion-toolkit#overview' },
          { label: 'BaseCamp', href: '/explore/fusion-toolkit#basecamp' },
          { label: 'Helix', href: '/explore/fusion-toolkit#helix' },
          { label: 'Lens', href: '/explore/fusion-toolkit#lens' },
          { label: 'Match', href: '/explore/fusion-toolkit#match' },
        ],
      },
      {
        title: 'Shared Services',
        links: [
          { label: 'Network', href: '/explore/shared-services#network' },
          { label: 'Storage', href: '/explore/shared-services#storage' },
          { label: 'User Access', href: '/explore/shared-services#user-access' },
          { label: 'Compute', href: '/explore/shared-services#compute' },
          { label: 'Security & Compliance', href: '/explore/shared-services#security-compliance' },
          { label: 'Platform', href: '/explore/shared-services#platform' },
          { label: 'Development Support', href: '/explore/shared-services#development-support' },
          { label: 'Operations & Maintenance', href: '/explore/shared-services#operations-maintenance' },
          { label: 'Financial Operations (FinOps)', href: '/explore/shared-services#finops' },
          { label: 'Solutions Engineering', href: '/explore/shared-services#solutions-engineering' },
        ],
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    featured: {
      title: 'Training & Enablement',
      description:
        'Comprehensive learning paths and certification programs',
      ctaLabel: 'Start Learning',
      ctaHref: '/learn/training-enablement',
      ctaVariant: 'gold',
    },
    columns: [
      {
        links: [
          { label: 'Documentation', href: '/learn/knowledge-center' },
          { label: 'Training & Enablement', href: '/learn/training-enablement' },
          { label: 'Customer Roadmap', href: '/learn/initiatives' },
        ],
      },
    ],
  },
  {
    id: 'get-started',
    label: 'Get Started',
    featured: {
      title: 'Quick Onboarding',
      description:
        'Get up and running in minutes with our guided setup process',
      ctaLabel: 'Begin Setup',
      ctaHref: '/#pathways',
      ctaVariant: 'green',
    },
    columns: [
      {
        links: [
          { label: 'New Onboarding', href: '/#pathways' },
          { label: 'Migrate', href: '/learn/initiatives' },
        ],
      },
    ],
  },
]

function megaMenuCtaProps(variant: FeaturedCard['ctaVariant']) {
  if (variant === 'gold') return { accent: true as const }
  if (variant === 'green') return { variation: 'solid' as const }
  return { variation: 'solid' as const }
}

function ChevronDown({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
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

export type FusionSiteNavProps = {
  searchOpen: boolean
  onSearchToggle: () => void
  /** Close search panel without toggling (e.g. when opening mobile nav). */
  onSearchClose: () => void
  activeMenu: string | null
  onMenuToggle: (id: string) => void
  onMenuClose: () => void
}

export function FusionSiteNav({
  searchOpen,
  onSearchToggle,
  onSearchClose,
  activeMenu,
  onMenuToggle,
  onMenuClose,
}: FusionSiteNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<Element>, href: string) => {
      setMobileDrawerOpen(false)
      if (href.startsWith('/')) {
        e.preventDefault()
        onMenuClose()
        navigate(href)
      } else {
        onMenuClose()
      }
    },
    [navigate, onMenuClose],
  )

  const toggleMobileDrawer = useCallback(() => {
    setMobileDrawerOpen((open) => {
      const next = !open
      if (next) {
        onSearchClose()
        onMenuClose()
      }
      return next
    })
  }, [onMenuClose, onSearchClose])

  const handleSearchClick = useCallback(() => {
    setMobileDrawerOpen(false)
    onMenuClose()
    onSearchToggle()
  }, [onMenuClose, onSearchToggle])

  useEffect(() => {
    if (!activeMenu && !mobileDrawerOpen) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        onMenuClose()
        setMobileDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [activeMenu, mobileDrawerOpen, onMenuClose])

  useEffect(() => {
    if (!activeMenu && !mobileDrawerOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onMenuClose()
        setMobileDrawerOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeMenu, mobileDrawerOpen, onMenuClose])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => {
      if (mq.matches) setMobileDrawerOpen(false)
    }
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  useEffect(() => {
    if (!mobileDrawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileDrawerOpen])

  const activeItem = megaMenuItems.find((item) => item.id === activeMenu)

  return (
    <div className="fusion-site-nav relative" ref={navRef}>
      <div className="mx-auto flex max-w-[var(--fusion-site-max-width)] items-center justify-between px-[var(--fusion-site-padding-x)] py-3 md:px-[var(--fusion-site-padding-x-md)]">
        {/* Logo */}
        <a
          href="/"
          className="fusion-site-nav__logo inline-flex shrink-0 items-center"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/cloud-fusion-logo.png`}
            alt="Cloud Fusion"
            width={346}
            height={49}
            className="h-10 w-auto md:h-[49px]"
          />
        </a>

        {/* Nav triggers */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-x-1 md:flex lg:gap-x-2"
        >
          {megaMenuItems.map((item) => {
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
                aria-controls={`mega-panel-${item.id}`}
                onClick={() => onMenuToggle(item.id)}
                onMouseEnter={() => {
                  if (activeMenu && activeMenu !== item.id)
                    onMenuToggle(item.id)
                }}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`shrink-0 transition-transform duration-200 ${
                    isActive ? 'rotate-180' : ''
                  }`}
                  style={{ width: 12, height: 12, marginLeft: 4, marginTop: 2 }}
                />
                <span
                  className={`pointer-events-none absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[color:var(--fusion-blue)] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* Right actions */}
        {/* Mobile menu */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            className="fusion-site-nav__menu-btn flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-white p-2 text-[color:var(--fusion-blue)] shadow-sm md:hidden"
            aria-expanded={mobileDrawerOpen}
            aria-controls="fusion-site-nav-mobile-drawer"
            aria-label={mobileDrawerOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobileDrawer}
          >
            {mobileDrawerOpen ? <IconMenuClose /> : <IconMenu />}
          </button>

          <button
            type="button"
            className={`flex size-10 items-center justify-center rounded-lg border-0 p-2 text-[color:var(--fusion-blue)] transition-colors hover:bg-neutral-100 ${
              searchOpen
                ? 'bg-neutral-100'
                : 'bg-transparent'
            }`}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            aria-controls={searchOpen ? 'site-search-region' : undefined}
            onClick={handleSearchClick}
          >
            <SearchIcon className="size-5 shrink-0" />
          </button>

          <a
            href="#get-help"
            className="fusion-site-nav__legacy-link fusion-site-nav__get-help"
            onClick={(e) => handleLinkClick(e, '#get-help')}
          >
            Get Help
          </a>
        </div>
      </div>

      {/* Mobile primary navigation (< md) */}
      <div
        id="fusion-site-nav-mobile-drawer"
        className="fusion-site-nav__mobile-drawer md:hidden"
        hidden={!mobileDrawerOpen}
      >
        <nav aria-label="Primary sections" className="fusion-site-nav__mobile-nav">
          {megaMenuItems.map((item) => (
            <details key={item.id} className="fusion-site-nav__mobile-details">
              <summary className="fusion-site-nav__mobile-summary">{item.label}</summary>
              <div className="fusion-site-nav__mobile-panel">
                <h3 className="fusion-site-nav__mobile-featured-title">{item.featured.title}</h3>
                <p className="fusion-site-nav__mobile-featured-desc">{item.featured.description}</p>
                <FusionButton
                  href={item.featured.ctaHref}
                  className="fusion-site-nav__mobile-featured-cta"
                  size="small"
                  onClick={(e) => handleLinkClick(e, item.featured.ctaHref)}
                  {...megaMenuCtaProps(item.featured.ctaVariant)}
                >
                  {item.featured.ctaLabel}
                </FusionButton>
                {item.columns.map((col, ci) => (
                  <div key={ci} className="fusion-site-nav__mobile-col">
                    {col.title ? (
                      <h4 className="fusion-site-nav__mobile-col-title">{col.title}</h4>
                    ) : null}
                    <ul className="fusion-site-nav__mobile-link-list">
                      {col.links.map((link) => (
                        <li key={`${item.id}-${link.label}-${link.href}`}>
                          <a
                            href={link.href}
                            className="fusion-site-nav__mobile-link"
                            onClick={(e) => handleLinkClick(e, link.href)}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </nav>
      </div>

      {/* Mega menu panels */}
      {activeItem && (
        <div
          key={activeItem.id}
          id={`mega-panel-${activeItem.id}`}
          className="fusion-mega-panel hidden md:block"
          role="region"
          aria-label={`${activeItem.label} menu`}
        >
          <div className="mx-auto flex max-w-[var(--fusion-site-max-width)] gap-8 px-[var(--fusion-site-padding-x)] py-10 md:px-[var(--fusion-site-padding-x-md)] lg:gap-12">
            {/* Featured card */}
            <div className="hidden w-full max-w-[22rem] shrink-0 rounded-xl border border-neutral-200/60 bg-white p-8 shadow-sm md:block">
              <h2
                className="fusion-mega-featured__title"
                style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, color: '#0a0a0a', margin: 0 }}
              >
                {activeItem.featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-[0.9375rem]">
                {activeItem.featured.description}
              </p>
              <FusionButton
                href={activeItem.featured.ctaHref}
                className="fusion-mega-featured__cta mt-6"
                onClick={(e) => handleLinkClick(e, activeItem.featured.ctaHref)}
                {...megaMenuCtaProps(activeItem.featured.ctaVariant)}
              >
                {activeItem.featured.ctaLabel}
                <span aria-hidden>&#8594;</span>
              </FusionButton>
            </div>

            {/* Menu columns */}
            <div
              className={`flex min-w-0 flex-1 gap-8 pt-1 lg:gap-12 ${
                activeItem.columns.length === 1 ? 'md:pl-4' : ''
              }`}
            >
              {activeItem.columns.map((col, ci) => (
                <div key={ci} className="min-w-0">
                  {col.title && (
                    <h4 className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-neutral-500">
                      {col.title}
                    </h4>
                  )}
                  <ul className="list-none space-y-3 p-0 m-0">
                    {col.links.map((link) => (
                      <li key={link.href} className="p-0">
                        <a
                          href={link.href}
                          className="fusion-mega-link group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[color:var(--fusion-blue)] transition-colors hover:text-[color:var(--color-primary-darkest)]"
                          onClick={(e) => handleLinkClick(e, link.href)}
                        >
                          {link.label}
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
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
