import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { SiteHeader } from '../components/SiteHeader'

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
  },
  {
    title: 'CMS GitHub',
    description:
      'CMS manages our code bases in GitHub Enterprise, configure GitHub repositories for your project to manage and coordinate access to CMS Hybrid Cloud.',
    cta: 'Get started',
    href: '#github',
  },
  {
    title: 'Knox (cloud.cms.gov)',
    description:
      'Knox is a single sign on (SSO) portal that helps you simplify, automate, and manage sign-in and provision services for CMS Hybrid Cloud.',
    cta: 'Learn more about Knox',
    href: '#knox',
  },
]

const docCategories: { title: string; href: string }[] = [
  { title: 'CMS Hybrid Cloud', href: '#' },
  { title: 'Cloud Governance', href: '#' },
  { title: 'Quickstarts', href: '#' },
  { title: 'Computing', href: '#' },
  { title: 'Containers', href: '#' },
  { title: 'DevOps', href: '/learn/knowledge-center/devops' },
  { title: 'Incident Management', href: '#' },
  { title: 'Monitoring', href: '#' },
  { title: 'Networking', href: '#' },
  { title: 'Security & Compliance', href: '#' },
  { title: 'Site reliability', href: '#' },
  { title: 'Storage', href: '#' },
  { title: 'User Access', href: '#' },
  { title: 'Platforms', href: '#' },
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
    to: '/learn/knowledge-center/devops',
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

const cmsWebsites = [
  'CMS.gov',
  'MyMedicare.gov',
  'Medicare.gov',
  'Medicaid.gov',
  'CMS.gov',
  'HHS.gov',
]

const additionalResources = [
  'CMS Design System',
  'Inspector General',
  'The Act Act',
  'Plain Writing',
  'USA.gov',
]

function OverviewIcon({ type }: { type: string }) {
  if (type === 'book') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--fusion-blue)]" strokeWidth={1.5} aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'code') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--fusion-blue)]" strokeWidth={1.5} aria-hidden>
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--fusion-blue)]" strokeWidth={1.5} aria-hidden>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TopicIcon({ gradient }: { gradient: string }) {
  const gradients: Record<string, [string, string]> = {
    gold: ['var(--color-accent-primary)', 'var(--color-accent-primary-dark)'],
    blue: ['var(--fusion-blue)', 'var(--fusion-blue-deep)'],
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

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} ref={revealRef}>
        {/* Breadcrumb Bar */}
        <div className="kc-breadcrumb-bar">
          <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
            <ol className="kc-breadcrumb-list">
              <li>
                <a href="/" className="kc-breadcrumb-link">Home</a>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="kc-breadcrumb-current">Knowledge Base</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="kc-hero">
          <div className="kc-hero__inner">
            <h1 className="kc-hero__heading">Knowledge Base</h1>
            <p className="kc-hero__description">
              Welcome to CMS Hybrid Cloud Documentation. Everything you need to start building
              with CMS Hybrid Cloud. Our guides and resources will help you set up and optimize
              your application.
            </p>

            <div className="kc-hero__search">
              <div className="kc-hero__search-field">
                <svg className="kc-hero__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M19 19l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="kc-hero__search-input"
                />
                <FusionButton type="submit" accent size="small">
                  Search
                </FusionButton>
              </div>
            </div>

            <div className="kc-hero__stats">
              <div className="kc-hero__stat">
                <span className="kc-hero__stat-number">500+</span>
                <span className="kc-hero__stat-label">Guide Articles</span>
              </div>
              <div className="kc-hero__stat">
                <span className="kc-hero__stat-number">13</span>
                <span className="kc-hero__stat-label">Categories</span>
              </div>
              <div className="kc-hero__stat">
                <span className="kc-hero__stat-number">6</span>
                <span className="kc-hero__stat-label">Resources</span>
              </div>
              <div className="kc-hero__stat">
                <span className="kc-hero__stat-number">DT</span>
                <span className="kc-hero__stat-label">Developer Tools</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="kc-content">
          {/* Overview Section */}
          <section className="kc-section kc-reveal">
            <h2 className="kc-section-heading">What You&rsquo;ll Find in This Documentation</h2>
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

          {/* Account Essentials */}
          <section className="kc-section kc-reveal">
            <h2 className="kc-section-heading">Account Essentials</h2>
            <p className="kc-section-subtitle">
              These tools provide foundational access to SPHERE services and infrastructure.
              Set up your account to start building on CMS Hybrid Cloud.
            </p>
            <div className="kc-essentials-grid">
              {accountEssentials.map((item) => (
                <div key={item.title} className="kc-essentials-card">
                  <h3 className="kc-essentials-card__title">{item.title}</h3>
                  <p className="kc-essentials-card__body">{item.description}</p>
                  <FusionButton href={item.href} variation="ghost" className="kc-essentials-card__cta">
                    {item.cta}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </FusionButton>
                </div>
              ))}
            </div>
          </section>

          {/* Documentation Categories */}
          <section className="kc-section kc-reveal">
            <h2 className="kc-section-heading">Documentation Categories</h2>
            <div className="kc-categories-grid">
              {docCategories.map((cat) => {
                const inner = (
                  <>
                    <span className="kc-category-link__text">{cat.title}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M6 4l4 4-4 4" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )
                return cat.href.startsWith('/') ? (
                  <Link key={cat.title} to={cat.href} className="kc-category-link">
                    {inner}
                  </Link>
                ) : (
                  <a key={cat.title} href={cat.href} className="kc-category-link">
                    {inner}
                  </a>
                )
              })}
            </div>
          </section>

          {/* Popular Topics */}
          <section className="kc-section kc-reveal">
            <div className="kc-popular-header">
              <div className="kc-popular-header__left">
                <h2 className="kc-section-heading">Popular Topics</h2>
              </div>
              <a href="#" className="kc-view-all">
                View all guides
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                      <path d="M6 4l4 4-4 4" stroke="#d1d5dc" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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
        </div>

        {/* Getting Started Section */}
        <section className="kc-getting-started kc-reveal">
          <div className="kc-getting-started__bg-orb kc-getting-started__bg-orb--gold" />
          <div className="kc-getting-started__bg-orb kc-getting-started__bg-orb--blue" />
          <div className="kc-getting-started__inner">
            <h2 className="kc-getting-started__heading">Getting started with CMS Hybrid Cloud</h2>
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </FusionButton>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <section className="kc-footer-links kc-reveal">
          <div className="kc-footer-links__inner">
            <div className="kc-footer-links__col">
              <h3 className="kc-footer-links__heading">CMS &amp; HHS Websites</h3>
              <ul className="kc-footer-links__list">
                {cmsWebsites.map((site, i) => (
                  <li key={`${site}-${i}`}>
                    <a href="#" className="kc-footer-links__link">{site}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="kc-footer-links__col">
              <h3 className="kc-footer-links__heading">Additional resources</h3>
              <ul className="kc-footer-links__list">
                {additionalResources.map((resource) => (
                  <li key={resource}>
                    <a href="#" className="kc-footer-links__link">{resource}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
