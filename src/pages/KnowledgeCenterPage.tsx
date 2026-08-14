import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  fusionInfoCenterCategoryPath,
  knowledgeCenterDocCategories,
} from '../data/knowledgeCenterDocCategories'
import { FusionButton } from '../components/FusionButton'
import { ChevronRight } from '../components/icons/Chevron'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const docCategories = knowledgeCenterDocCategories

const overviewCards = [
  {
    title: 'Comprehensive Guides',
    description:
      'Step-by-step tutorials and detailed explanations to help you get started and master CMS Hybrid Cloud.',
    icon: 'book',
  },
  {
    title: 'API References',
    description:
      'Complete API documentation with code examples and best practices for integration.',
    icon: 'code',
  },
  {
    title: 'Tools & Resources',
    description:
      'Access essential tools, SDKs, and resources to streamline your development workflow.',
    icon: 'wrench',
  },
]

const accountEssentials = [
  {
    title: 'EUA',
    description:
      'Set up your EUA (Enterprise User Account) to access CMS Hybrid Cloud you will need to set up EUA first accounts.',
    cta: 'Get set up',
    href: '#eua',
    icon: 'id',
  },
  {
    title: 'CMS GitHub',
    description:
      'CMS manages our code bases in GitHub Enterprise, configure GitHub repositories for your project to manage and coordinate access to CMS Hybrid Cloud.',
    cta: 'Get started',
    href: '#github',
    icon: 'git',
  },
  {
    title: 'Knox (cloud.cms.gov)',
    description:
      'Knox is a single sign on (SSO) portal that helps you simplify, automate, and manage sign-in and provision services for CMS Hybrid Cloud.',
    cta: 'Learn more about Knox',
    href: '#knox',
    icon: 'key',
  },
]

const popularTopics: {
  title: string
  tag: string
  gradient: 'gold' | 'blue' | 'green'
  to?: string
}[] = [
  {
    title: 'DevOps services & tools',
    tag: 'How-to guide',
    gradient: 'blue',
    to: fusionInfoCenterCategoryPath('devops'),
  },
  { title: 'Setting up your group', tag: 'How-to guide', gradient: 'gold' },
  { title: 'CMS approved security tools and services', tag: 'How-to guide', gradient: 'blue' },
  { title: 'Setting up CloudBees Core', tag: 'How-to guide', gradient: 'green' },
  { title: 'Security controls reference guide', tag: 'Reference', gradient: 'gold' },
]

const gettingStartedCards = [
  {
    title: 'Ready to get started?',
    description:
      'Request access to CMS Hybrid Cloud and start building your application on our secure, compliant infrastructure.',
    cta: 'Request to use CMS Hybrid Cloud',
    ctaType: 'button' as const,
  },
  {
    title: 'Want to migrate?',
    description:
      'Already have an application? Learn how to migrate your existing workloads to CMS Hybrid Cloud with our migration guides.',
    cta: 'Sign up to get set up',
    ctaType: 'link' as const,
  },
  {
    title: 'Have more questions?',
    description:
      'A Hosting Coordinator can help answer questions and guide you through the process of getting started.',
    cta: 'Learn more',
    ctaType: 'link' as const,
  },
]

const heroStats = [
  { value: '500+', label: 'Guide Articles', icon: 'book' },
  { value: String(docCategories.length), label: 'Categories', icon: 'grid' },
  { value: '6', label: 'Resource Libraries', icon: 'stack' },
  { value: 'DT', label: 'Developer Tools', icon: 'wrench' },
] as const

function CategoryCardChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconStroke({ d, children }: { d?: string; children?: ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      {d ? <path d={d} strokeLinecap="round" strokeLinejoin="round" /> : children}
    </svg>
  )
}

function CategoryIcon({ id }: { id: string }) {
  switch (id) {
    case 'cms-hybrid-cloud':
      return <IconStroke d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    case 'cloud-governance':
      return <IconStroke d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
    case 'quickstarts':
      return <IconStroke d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    case 'computing':
      return <IconStroke d="M4 6h16v10H4zM8 20h8M12 16v4" />
    case 'containers':
      return <IconStroke d="M4 8h7v7H4zM13 8h7v7h-7zM8 4h8v4H8z" />
    case 'devops':
      return (
        <IconStroke>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </IconStroke>
      )
    case 'incident-management':
      return <IconStroke d="M12 9v4M12 17h.01M10.3 4.7L2.8 18a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.7a2 2 0 00-3.4 0z" />
    case 'monitoring':
      return <IconStroke d="M4 19V5M4 19h16M8 15l3-4 3 3 4-6" />
    case 'networking':
      return <IconStroke d="M12 4v4M8 12H4m16 0h-4M12 16v4M8.5 8.5l-2-2M15.5 8.5l2-2M8.5 15.5l-2 2M15.5 15.5l2 2M12 12a2 2 0 100-4 2 2 0 000 4z" />
    case 'security-compliance':
      return <IconStroke d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4zM9 12l2 2 4-4" />
    case 'site-reliability':
      return <IconStroke d="M12 8v4l3 2M12 22a10 10 0 100-20 10 10 0 000 20z" />
    case 'storage':
      return <IconStroke d="M4 7a8 3 0 0016 0A8 3 0 004 7zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
    case 'user-access':
      return <IconStroke d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    default:
      return <IconStroke d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v5H4zM13 15h7v5h-7z" />
  }
}

function OverviewIcon({ type }: { type: string }) {
  if (type === 'book') {
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'code') {
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EssentialIcon({ type }: { type: string }) {
  if (type === 'git') {
    return <IconStroke d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77 5.44 5.44 0 003.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  }
  if (type === 'key') {
    return <IconStroke d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.77-7.77zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  }
  return <IconStroke d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" />
}

function StatIcon({ type }: { type: string }) {
  if (type === 'grid') {
    return <IconStroke d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v5H4zM13 15h7v5h-7z" />
  }
  if (type === 'stack') {
    return <IconStroke d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" />
  }
  if (type === 'wrench') {
    return (
      <IconStroke>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
      </IconStroke>
    )
  }
  return <IconStroke d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
}

function TopicIcon({ gradient }: { gradient: string }) {
  const gradients: Record<string, [string, string]> = {
    gold: ['var(--fusion-yellow)', '#b3a006'],
    blue: ['#6eb6ff', 'var(--fusion-deep-sea-500)'],
    green: ['#2e8540', '#1a5c28'],
  }
  const [from, to] = gradients[gradient] || gradients.gold
  return (
    <div className="kc-topic-icon" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} aria-hidden>
        <path d="M9 12h6M12 9v6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  )
}

function InfoCenterHeroArt() {
  return (
    <svg className="fic-hero__art" viewBox="0 0 420 320" fill="none" aria-hidden>
      <defs>
        <radialGradient id="fic-book-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#dfb01c" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#dfb01c" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#dfb01c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fic-page-l" x1="40" y1="60" x2="200" y2="260">
          <stop offset="0%" stopColor="#8eb4ff" />
          <stop offset="100%" stopColor="#0d2499" />
        </linearGradient>
        <linearGradient id="fic-page-r" x1="220" y1="60" x2="380" y2="260">
          <stop offset="0%" stopColor="#6eb6ff" />
          <stop offset="100%" stopColor="#07124d" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="210" rx="150" ry="70" fill="url(#fic-book-glow)" />
      <path d="M210 78c-38-22-118-18-158 8v148c42-28 122-32 158-8V78z" fill="url(#fic-page-l)" opacity="0.92" />
      <path d="M210 78c38-22 118-18 158 8v148c-42-28-122-32-158-8V78z" fill="url(#fic-page-r)" opacity="0.92" />
      <path d="M210 78v148" stroke="#dfb01c" strokeWidth="3" strokeLinecap="round" />
      <path d="M78 100c32-16 92-20 132-4M78 128c32-16 92-20 132-4M78 156c32-16 92-20 132-4" stroke="#b6bde0" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M210 96c40-16 100-12 132 4M210 124c40-16 100-12 132 4M210 152c40-16 100-12 132 4" stroke="#b6bde0" strokeOpacity="0.35" strokeWidth="2" />
      <g transform="translate(318 36)">
        <rect width="64" height="64" rx="16" fill="#0d2499" stroke="#6eb6ff" strokeOpacity="0.55" />
        <path d="M22 22l-10 10 10 10M42 22l10 10-10 10" stroke="#6eb6ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(28 168)">
        <rect width="56" height="56" rx="14" fill="#07124d" stroke="#dfb01c" strokeOpacity="0.5" />
        <path d="M34 18a10 10 0 00-12 12l-8 8 6 6 8-8a10 10 0 0012-12l-4 4-6-6 4-4z" stroke="#dfb01c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll('.kc-reveal')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('kc-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('kc-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}

export default function KnowledgeCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const revealRef = useScrollReveal()

  useEffect(() => {
    document.title = 'Fusion Info Center | Learn | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" className="explore-2 fic-page" tabIndex={-1} ref={revealRef}>
        <div className="fic-page__shell">
          <nav aria-label="Breadcrumb" className="fic-breadcrumb">
            <ol className="kc-breadcrumb-list">
              <li>
                <Link to="/" className="kc-breadcrumb-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                /
              </li>
              <li>
                <span className="kc-breadcrumb-current">Fusion Info Center</span>
              </li>
            </ol>
          </nav>

          <section className="explore-hero fic-hero rounded-2xl" aria-labelledby="fic-hero-heading">
            <div className="explore-hero__content fic-hero__copy">
              <h1 id="fic-hero-heading" className="fusion-hero__headline explore-hero__headline">
                <span className="block font-semibold leading-[1.12] tracking-wide">
                  Fusion Info Center
                </span>
              </h1>
              <p className="fusion-hero__body explore-hero__body">
                Everything you need to start building with CMS Hybrid Cloud. Guides, references, and
                tools to help you set up and optimize your application.
              </p>

              <form
                className="kc-hero__search"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="kc-hero__search-field">
                  <svg className="kc-hero__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M19 19l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Fusion Info Center..."
                    className="kc-hero__search-input"
                    aria-label="Search Fusion Info Center"
                  />
                  <FusionButton type="submit" accent onDark size="small">
                    Search
                  </FusionButton>
                </div>
              </form>

              <ul className="kc-hero__stats">
                {heroStats.map((stat) => (
                  <li key={stat.label} className="kc-hero__stat">
                    <span className="fic-stat-icon" aria-hidden>
                      <StatIcon type={stat.icon} />
                    </span>
                    <span className="kc-hero__stat-copy">
                      <span className="kc-hero__stat-number">{stat.value}</span>
                      <span className="kc-hero__stat-label">{stat.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fic-hero__art-wrap" aria-hidden>
              <InfoCenterHeroArt />
            </div>
          </section>

          <div className="kc-content">
            <section
              id="kc-doc-categories"
              className="kc-section kc-section--categories kc-reveal"
              aria-labelledby="kc-doc-categories-heading"
            >
              <h2 id="kc-doc-categories-heading" className="explore-section-heading">
                Browse by Category
              </h2>
              <p className="kc-section-subtitle">
                Parent topics for CMS Hybrid Cloud. Select a category to browse guides and references
                in that area.
              </p>
              <div className="kc-categories-grid">
                {docCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.href}
                    className="kc-category-link"
                    title={`${cat.itemCount} guides in ${cat.title}`}
                  >
                    <span className="kc-category-link__main">
                      <span className="fic-category-icon" data-tone={cat.id} aria-hidden>
                        <CategoryIcon id={cat.id} />
                      </span>
                      <span className="fic-category-copy">
                        <span className="kc-category-link__text">{cat.title}</span>
                        {cat.description ? <span className="fic-category-desc">{cat.description}</span> : null}
                      </span>
                      <span className="kc-category-link__count">{cat.itemCount}</span>
                    </span>
                    <CategoryCardChevron />
                  </Link>
                ))}
              </div>
            </section>

            <section className="kc-section kc-reveal">
              <h2 className="explore-section-heading">What You&rsquo;ll Find</h2>
              <div className="kc-overview-grid">
                {overviewCards.map((card) => (
                  <div key={card.title} className="kc-overview-card">
                    <div className="kc-overview-card__icon">
                      <OverviewIcon type={card.icon} />
                    </div>
                    <h3 className="kc-overview-card__title">{card.title}</h3>
                    <p className="kc-overview-card__body">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="kc-section kc-reveal">
              <h2 className="explore-section-heading">Account Essentials</h2>
              <p className="kc-section-subtitle">
                These tools provide foundational access to SPHERE services and infrastructure. Set up
                your account to start building on CMS Hybrid Cloud.
              </p>
              <div className="kc-essentials-grid">
                {accountEssentials.map((item) => (
                  <div key={item.title} className="kc-essentials-card">
                    <span className="fic-essential-icon" aria-hidden>
                      <EssentialIcon type={item.icon} />
                    </span>
                    <h3 className="kc-essentials-card__title">{item.title}</h3>
                    <p className="kc-essentials-card__body">{item.description}</p>
                    <a href={item.href} className="kc-essentials-card__cta">
                      {item.cta}
                      <ChevronRight />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="kc-section kc-reveal">
              <div className="kc-popular-header">
                <div className="kc-popular-header__left">
                  <h2 className="explore-section-heading">Popular Topics</h2>
                </div>
                <a href="#kc-doc-categories" className="kc-view-all">
                  View all guides
                  <ChevronRight />
                </a>
              </div>
              <div className="kc-topics-grid">
                {popularTopics.map((topic) => {
                  const inner = (
                    <>
                      <TopicIcon gradient={topic.gradient} />
                      <div className="kc-topic-card__content">
                        <span className="kc-topic-card__title">{topic.title}</span>
                        <span className="kc-topic-card__tag">{topic.tag}</span>
                      </div>
                      <svg className="kc-topic-card__chevron" width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )
                  return topic.to ? (
                    <Link key={topic.title} to={topic.to} className="kc-topic-card">
                      {inner}
                    </Link>
                  ) : (
                    <a key={topic.title} href="#" className="kc-topic-card">
                      {inner}
                    </a>
                  )
                })}
              </div>
            </section>

            <section className="kc-getting-started kc-reveal">
              <div className="fic-getting-started">
                <h2 className="explore-section-heading">Getting started with CMS Hybrid Cloud</h2>
                <div className="kc-getting-started__grid">
                  {gettingStartedCards.map((card) => (
                    <div key={card.title} className="kc-glass-card">
                      <h3 className="kc-glass-card__title">{card.title}</h3>
                      <p className="kc-glass-card__body">{card.description}</p>
                      {card.ctaType === 'button' ? (
                        <FusionButton href="#" accent onDark>
                          {card.cta}
                        </FusionButton>
                      ) : (
                        <FusionButton href="#" variation="ghost" onDark className="kc-glass-card__cta-link">
                          {card.cta}
                          <ChevronRight />
                        </FusionButton>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
