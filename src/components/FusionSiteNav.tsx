import { useCallback, useEffect, useRef } from 'react'
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
  panelBg: string
  featured: FeaturedCard
  columns: MenuColumn[]
}

const megaMenuItems: MegaMenuItem[] = [
  {
    id: 'about',
    label: 'About',
    panelBg: 'bg-[#faf9f7]',
    featured: {
      title: 'Success Stories',
      description:
        'Discover how organizations are transforming with our platform',
      ctaLabel: 'Read Case Studies',
      ctaHref: '#case-studies',
      ctaVariant: 'navy',
    },
    columns: [
      {
        links: [
          { label: 'Program Overview', href: '#program-overview' },
          { label: 'Benefits', href: '#benefits' },
          { label: 'Success Stories', href: '#success-stories' },
          { label: 'Contact Us', href: '#contact-us' },
        ],
      },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    panelBg: 'bg-[#e8f4fd]',
    featured: {
      title: 'Cloud Platforms',
      description:
        'Enterprise-grade infrastructure across AWS, Azure, GCP, and Oracle',
      ctaLabel: 'View All Platforms',
      ctaHref: '#platforms',
      ctaVariant: 'navy',
    },
    columns: [
      {
        title: 'Platforms',
        links: [
          { label: 'AWS Commercial', href: '#aws-commercial' },
          { label: 'AWS Outposts', href: '#aws-outposts' },
          { label: 'Azure Commercial', href: '#azure-commercial' },
          { label: 'Google Cloud Platform', href: '#gcp' },
          { label: 'Oracle Cloud Infrastructure', href: '#oci' },
          { label: 'Oracle at Customer', href: '#oracle-at-customer' },
        ],
      },
      {
        title: 'Fusion Toolkit',
        links: [
          { label: 'BaseCamp', href: '#basecamp' },
          { label: 'Helix', href: '#helix' },
          { label: 'Lens', href: '#lens' },
          { label: 'Match', href: '#match' },
        ],
      },
      {
        title: 'Shared Services',
        links: [
          { label: 'Compute', href: '#compute' },
          { label: 'Development Support', href: '#dev-support' },
          { label: 'Financial Operations (FinOps)', href: '#finops' },
          { label: 'Network', href: '#network' },
          { label: 'Operations & Maintenance', href: '#ops-maintenance' },
          { label: 'Platform', href: '#platform' },
          { label: 'Security & Compliance', href: '#security-compliance' },
          { label: 'Storage', href: '#storage' },
          { label: 'Solutions Engineering', href: '#solutions-engineering' },
          { label: 'User Access', href: '#user-access' },
        ],
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    panelBg: 'bg-[#fef9e7]',
    featured: {
      title: 'Training & Enablement',
      description:
        'Comprehensive learning paths and certification programs',
      ctaLabel: 'Start Learning',
      ctaHref: '#training',
      ctaVariant: 'gold',
    },
    columns: [
      {
        links: [
          { label: 'Knowledge Center', href: '/learn/knowledge-center' },
          { label: 'Initiatives', href: '/learn/initiatives' },
          { label: 'Training & Enablement', href: '#training-enablement' },
          { label: 'Customer Roadmap', href: '#customer-roadmap' },
        ],
      },
    ],
  },
  {
    id: 'get-started',
    label: 'Get Started',
    panelBg: 'bg-[#e8f8f0]',
    featured: {
      title: 'Quick Onboarding',
      description:
        'Get up and running in minutes with our guided setup process',
      ctaLabel: 'Begin Setup',
      ctaHref: '#onboarding',
      ctaVariant: 'green',
    },
    columns: [
      {
        links: [
          { label: 'New Onboarding', href: '#new-onboarding' },
          { label: 'Migrate', href: '#migrate' },
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

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export type FusionSiteNavProps = {
  searchOpen: boolean
  onSearchToggle: () => void
  activeMenu: string | null
  onMenuToggle: (id: string) => void
  onMenuClose: () => void
}

export function FusionSiteNav({
  searchOpen,
  onSearchToggle,
  activeMenu,
  onMenuToggle,
  onMenuClose,
}: FusionSiteNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  const handleSearchClick = useCallback(() => {
    onMenuClose()
    onSearchToggle()
  }, [onMenuClose, onSearchToggle])

  useEffect(() => {
    if (!activeMenu) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        onMenuClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [activeMenu, onMenuClose])

  useEffect(() => {
    if (!activeMenu) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMenuClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeMenu, onMenuClose])

  const activeItem = megaMenuItems.find((item) => item.id === activeMenu)

  return (
    <div className="fusion-site-nav" ref={navRef}>
      <div className="mx-auto flex max-w-[var(--fusion-site-max-width)] items-center justify-between px-[var(--fusion-site-padding-x)] py-3 md:px-[var(--fusion-site-padding-x-md)]">
        {/* Logo */}
        <a
          href="/"
          className="fusion-site-nav__logo inline-flex shrink-0 items-center"
        >
          <img
            src="/images/fusion-orbit-logo.png"
            alt="FUSION Sphere"
            width={213}
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
        <div className="flex shrink-0 items-center gap-3">
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
            href="#support"
            className="fusion-site-nav__support hidden items-center gap-1.5 px-2 text-sm font-medium text-[color:var(--fusion-blue)] transition-colors hover:text-[color:var(--color-primary-darkest)] lg:inline-flex"
          >
            <SparkleIcon className="size-4 text-[#f5a623]" />
            Need Support?
          </a>

          <FusionButton href="#get-help" accent size="small">
            Get Help
          </FusionButton>
        </div>
      </div>

      {/* Mega menu panels */}
      {activeItem && (
        <div
          key={activeItem.id}
          id={`mega-panel-${activeItem.id}`}
          className={`fusion-mega-panel border-t border-neutral-200/60 ${activeItem.panelBg}`}
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
