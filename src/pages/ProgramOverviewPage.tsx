import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const imgBase = `${import.meta.env.BASE_URL}images/sections/program-overview/`

const platformCards = [
  {
    image: `${imgBase}secure-platforms.jpg`,
    title: 'Secure platforms',
    description:
      'Our infrastructure is built with security at its core, meeting the highest standards for government and healthcare.',
  },
  {
    image: `${imgBase}scalable-platforms.jpg`,
    title: 'Scalable platforms',
    description:
      'Grow with confidence knowing our systems can handle peak demands and expand as your needs evolve.',
  },
  {
    image: `${imgBase}stress-tested-platforms.jpg`,
    title: 'Stress-tested platforms',
    description:
      'Rigorously tested and proven to deliver reliable performance under the most demanding conditions.',
  },
] as const

const featureIcons = [
  {
    title: 'Secure platforms',
    description: 'Our infrastructure meets the highest security and compliance standards.',
    icon: 'cloud',
  },
  {
    title: 'Scalable platforms',
    description: "Systems designed to grow with your organization's needs.",
    icon: 'shield',
  },
  {
    title: 'Stress-tested platforms',
    description: 'Proven reliability under the most demanding conditions.',
    icon: 'bolt',
  },
  {
    title: 'Modern services',
    description: 'Cutting-edge technology to support your mission-critical applications.',
    icon: 'users',
  },
] as const

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Support' },
  { value: '100%', label: 'Compliant' },
  { value: 'Secure', label: 'Infrastructure' },
] as const

const securityItems = [
  'Advanced threat detection and response capabilities',
  'Continuous monitoring and security assessments',
  'Industry-leading encryption and data protection',
  'Regular security audits and compliance verification',
] as const

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureIcon({ type }: { type: string }) {
  const cls = 'po-feature-icon__svg'
  if (type === 'cloud') {
    return (
      <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'shield') {
    return (
      <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'bolt') {
    return (
      <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={1.5} />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="po-security__check">
      <circle cx="12" cy="12" r="10" fill="color-mix(in srgb, var(--color-primary) 12%, white)" />
      <path d="M8 12l3 3 5-6" stroke="var(--color-primary)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}

export default function ProgramOverviewPage() {
  const revealRef = useScrollReveal()

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} ref={revealRef} className="program-overview">
        <div className="kc-breadcrumb-bar kc-breadcrumb-bar--initiatives">
          <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
            <ol className="kc-breadcrumb-list">
              <li>
                <Link to="/" className="kc-breadcrumb-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <a href="#about" className="kc-breadcrumb-link">
                  About
                </a>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="kc-breadcrumb-current">Program Overview</span>
              </li>
            </ol>
          </nav>
        </div>

        <section className="po-hero" aria-labelledby="po-hero-heading">
          <div className="po-hero__glow" aria-hidden />
          <div className="init-hero__inner po-hero__inner">
            <div className="init-hero__text po-hero__text">
              <h1 id="po-hero-heading" className="init-hero__heading po-hero__heading">
                Why Hybrid Cloud Hosting
              </h1>
              <p className="init-hero__description po-hero__description">
                CMS's Hybrid Cloud service provides all the benefits of cloud hosting – secure, scalable,
                and cost effective – along with the added benefits of regulatory and organizational control of
                a traditional data center.
              </p>
              <div className="init-hero__actions">
                <FusionButton href="#get-started" accent onDark>
                  Get Started
                  <ArrowIcon />
                </FusionButton>
                <FusionButton href="#critical-work" variation="ghost" onDark>
                  Learn More
                </FusionButton>
              </div>
            </div>
          </div>
        </section>

        <div className="kc-content">
          <section className="kc-section kc-reveal" id="critical-work">
            <h2 className="kc-section-heading po-section-heading">We know your work is critical.</h2>
            <p className="kc-section-subtitle po-section-lede">
              CMS delivers secure and effective technology services and solutions to support the critical
              missions of CMS and our federal and state partners in administering Medicare, Medicaid, the
              Children&apos;s Health Insurance Program, and the Health Insurance Marketplace.
            </p>
            <div className="po-platform-grid">
              {platformCards.map((card) => (
                <article key={card.title} className="po-platform-card">
                  <div className="po-platform-card__media">
                    <img src={card.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="po-platform-card__body">
                    <h3 className="po-platform-card__title">{card.title}</h3>
                    <p className="po-platform-card__desc">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="po-band kc-reveal" aria-labelledby="po-features-heading">
          <div className="po-band__inner">
            <h2 id="po-features-heading" className="sr-only">
              Platform capabilities
            </h2>
            <div className="po-feature-grid">
              {featureIcons.map((item) => (
                <article key={item.title} className="po-feature-card">
                  <div className="po-feature-icon" aria-hidden>
                    <FeatureIcon type={item.icon} />
                  </div>
                  <div className="po-feature-card__text">
                    <h3 className="po-feature-card__title">{item.title}</h3>
                    <p className="po-feature-card__desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="kc-content">
          <section className="kc-section kc-reveal" id="services">
            <h2 className="kc-section-heading po-section-heading">Services to suit your needs</h2>
            <p className="kc-section-subtitle po-section-lede">
              From legacy modernization to cloud migration, CMS offers comprehensive technology services
              designed to meet the unique demands of healthcare and human services programs.
            </p>
            <ul className="po-stats">
              {stats.map((stat) => (
                <li key={stat.label} className="po-stat">
                  <span className="po-stat__value">{stat.value}</span>
                  <span className="po-stat__label">{stat.label}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="po-band kc-reveal" aria-labelledby="po-security-heading">
          <div className="po-band__inner po-security">
            <h2 id="po-security-heading" className="kc-section-heading po-section-heading">
              Keeping security top-of-mind
            </h2>
            <p className="kc-section-subtitle po-section-lede">
              CMS is committed to following industry leading security standards and privacy practices. We
              work to continuously strengthen our security posture and better protect our stakeholders and
              their information through innovative and proven security solutions.
            </p>
            <ul className="po-security__grid">
              {securityItems.map((item) => (
                <li key={item} className="po-security__item">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="po-cta kc-reveal" aria-labelledby="po-cta-heading">
          <div className="po-cta__inner">
            <h2 id="po-cta-heading" className="po-cta__heading">
              Building together
            </h2>
            <p className="po-cta__lede">
              Together, we&apos;re making government technology work better for the people it serves. Partner
              with CMS to deliver secure, scalable solutions that improve healthcare for millions of
              Americans.
            </p>
            <FusionButton href="#services" accent onDark className="po-cta__btn">
              Learn More About Our Services
            </FusionButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
