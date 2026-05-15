import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useRef } from 'react'
import { FusionButton } from '../components/FusionButton'
import { SiteHeader } from '../components/SiteHeader'

const initiatives = [
  {
    num: '01',
    tag: 'Product',
    tagGradient:
      'linear-gradient(135deg, var(--color-primary-lightest) 0%, var(--color-primary-light) 45%, var(--color-primary) 100%)',
    title: 'Product Showcase',
    description:
      'Enhance the product showcase experience to streamline showcasing demos of applications that utilize our application programming interfaces, fostering better understanding and adoption.',
  },
  {
    num: '02',
    tag: 'AWS',
    tagGradient:
      'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 50%, var(--color-primary-darker) 100%)',
    title: 'AWS Commercial',
    description:
      'Migrate applications to AWS Commercial cloud for improved scalability and performance.',
  },
  {
    num: '03',
    tag: 'Azure',
    tagGradient:
      'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-darker) 55%, var(--color-primary-darkest) 100%)',
    title: 'Azure Commercial',
    description:
      'Expand cloud infrastructure capabilities through Azure Commercial integration.',
  },
  {
    num: '04',
    tag: 'Azure',
    tagGradient:
      'linear-gradient(135deg, var(--color-primary-darker) 0%, var(--color-primary-darkest) 100%)',
    title: 'Azure GCC High',
    description:
      'Implement Azure Government Cloud solutions for enhanced security compliance.',
  },
  {
    num: '05',
    tag: 'AWS',
    tagGradient:
      'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-primary-dark) 100%)',
    title: 'AWS Govcloud',
    description:
      'Deploy government-specific cloud infrastructure using AWS GovCloud services.',
  },
  {
    num: '06',
    tag: 'Oracle',
    tagGradient:
      'linear-gradient(135deg, var(--color-accent-primary-dark) 0%, var(--color-accent-primary-darker) 100%)',
    title: 'Oracle Cloud (EOM)',
    description:
      'Manage end-of-migration activities for Oracle Cloud infrastructure transition.',
  },
  {
    num: '07',
    tag: 'Google',
    tagGradient:
      'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary) 100%)',
    title: 'Google Cloud (EOM)',
    description:
      'Complete migration and optimization of Google Cloud infrastructure.',
  },
]

type TimelineStatus = 'completed' | 'current' | 'upcoming'

type TimelineTag = {
  label: string
  /** CMS-aligned chip tone */
  tone?: 'default' | 'accent' | 'success' | 'primary'
}

type TimelineQuarter = {
  quarter: string
  year: string
  monthRange: string
  status: TimelineStatus
  title: string
  description: string
  tags: TimelineTag[]
  /** Initiative names for this quarter (also listed in the card) */
  items: string[]
}

const timeline: TimelineQuarter[] = [
  {
    quarter: 'Q1',
    year: '2026',
    monthRange: 'Jan — Mar',
    status: 'completed',
    title: 'Initiative planning & architecture design',
    description:
      'Scope Product Showcase and AWS Commercial workstreams, align landing-zone patterns with governance, and lock ATO-ready architecture guardrails.',
    tags: [
      { label: 'Completed', tone: 'success' },
      { label: 'Architecture', tone: 'primary' },
      { label: 'Governance', tone: 'default' },
    ],
    items: ['Product Showcase', 'AWS Commercial'],
  },
  {
    quarter: 'Q2',
    year: '2026',
    monthRange: 'Apr — Jun',
    status: 'current',
    title: 'AWS Commercial & Azure scale-out',
    description:
      'Deliver Azure Commercial onboarding and AWS GovCloud migrations with CST support, monitoring, and FinOps tagging for the first migration wave.',
    tags: [
      { label: 'In progress', tone: 'accent' },
      { label: 'Azure Commercial', tone: 'primary' },
      { label: 'AWS GovCloud', tone: 'default' },
    ],
    items: ['Azure Commercial', 'AWS GovCloud'],
  },
  {
    quarter: 'Q3',
    year: '2026',
    monthRange: 'Jul — Sep',
    status: 'upcoming',
    title: 'Azure GCC High readiness',
    description:
      'Complete Azure GCC High design reviews, complete security testing milestones, and prepare production cutover playbooks.',
    tags: [
      { label: 'Planned', tone: 'default' },
      { label: 'Azure GCC High', tone: 'primary' },
      { label: 'Security', tone: 'default' },
    ],
    items: ['Azure GCC High'],
  },
  {
    quarter: 'Q4',
    year: '2026',
    monthRange: 'Oct — Dec',
    status: 'upcoming',
    title: 'Platform wind-down & connect services',
    description:
      'Execute Oracle Cloud and Google Cloud end-of-migration activities and launch cross-platform observability across hybrid environments.',
    tags: [
      { label: 'Planned', tone: 'default' },
      { label: 'Oracle Cloud EOM', tone: 'primary' },
      { label: 'Google Cloud EOM', tone: 'primary' },
    ],
    items: ['Oracle Cloud EOM', 'Google Cloud EOM'],
  },
]

const whatsHappening = [
  {
    date: 'FALL 2024',
    title: 'Customer Survey Snapshot',
    description:
      'Get a snapshot of the results from the CMS Hybrid Cloud customer survey to help drive continuous improvement.',
    cta: 'Read more',
    borderColor: 'var(--color-primary)',
  },
  {
    date: 'FALL 2024',
    title: '2025 Infrastructure Capacity Planning',
    description:
      "Learn about the 2025 infrastructure capacity planning process and how to submit your application's capacity needs.",
    cta: 'Read more',
    borderColor: 'var(--color-primary)',
  },
  {
    date: 'ONGOING',
    title: 'Office Hours',
    description:
      'Join us for weekly office hours every Thursday from 2-3 PM ET to get your questions answered.',
    cta: 'Join now',
    borderColor: 'var(--color-accent-primary)',
  },
]

const learnConnectLinks = [
  { label: 'Team Support', icon: 'headset' },
  { label: 'Tools', icon: 'wrench' },
  { label: 'Events', icon: 'calendar' },
  { label: 'Training', icon: 'graduation' },
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

function LearnIcon({ type }: { type: string }) {
  if (type === 'headset') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} aria-hidden>
        <path d="M3 18v-6a9 9 0 0118 0v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'wrench') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} aria-hidden>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'calendar') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} aria-hidden>
        <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function InitiativesPage() {
  const revealRef = useScrollReveal()
  const initiativesHeroBgUrl = `${import.meta.env.BASE_URL}images/sections/initiatives-hero-cms-gov.png`

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} ref={revealRef}>
        {/* Sticky strip directly under site nav; CMS DS primary blues (KC pages unchanged). */}
        <div className="kc-breadcrumb-bar kc-breadcrumb-bar--initiatives">
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
                <a href="#" className="kc-breadcrumb-link">Infrastructure</a>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="kc-breadcrumb-current">Initiatives</span>
              </li>
            </ol>
          </nav>
        </div>

        <section className="init-hero">
          <img
            src={initiativesHeroBgUrl}
            alt=""
            className="init-hero__bg-img"
            decoding="async"
            fetchPriority="high"
          />
          <div className="init-hero__scrim" aria-hidden />
          <div className="init-hero__orb init-hero__orb--1" aria-hidden />
          <div className="init-hero__orb init-hero__orb--2" aria-hidden />
          <div className="init-hero__orb init-hero__orb--3" aria-hidden />

          <div className="init-hero__inner">
            <div className="init-hero__text">
              <h1 className="init-hero__heading">
                Infrastructure Hosting{' '}
                <span className="init-hero__heading-accent">Initiatives</span>
              </h1>
              <p className="init-hero__description">
                The CMS Hybrid Cloud Infrastructure Hosting Team has a number of initiatives
                planned for 2026, focusing on cloud migration, infrastructure optimization,
                and enhanced service delivery.
              </p>
              <div className="init-hero__actions">
                <FusionButton href="#initiatives" accent onDark>
                  View All Initiatives
                  <ArrowIcon />
                </FusionButton>
                <FusionButton href="#contact" variation="ghost" onDark>
                  Contact Team
                </FusionButton>
              </div>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="kc-content">
          {/* 2026 Initiatives Section */}
          <section className="kc-section kc-reveal" id="initiatives">
            <h2 className="kc-section-heading">2026 Initiatives</h2>
            <p className="kc-section-subtitle">
              Our strategic initiatives for 2026 focus on expanding cloud capabilities,
              improving infrastructure resilience, and delivering enhanced services to our stakeholders.
            </p>
            <div className="init-cards-grid">
              {initiatives.map((item) => (
                <div key={item.num} className="init-card">
                  <span className="init-card__num">{item.num}</span>
                  <div className="init-card__tag">
                    <span className="init-card__tag-dot" style={{ background: item.tagGradient }} />
                    <span className="init-card__tag-text">{item.tag}</span>
                  </div>
                  <h3 className="init-card__title">{item.title}</h3>
                  <p className="init-card__body">{item.description}</p>
                  <FusionButton href="#" variation="ghost" className="init-card__cta">
                    Learn more
                    <ArrowIcon />
                  </FusionButton>
                </div>
              ))}
            </div>
          </section>

          {/* Vertical timeline — CMS primary / accent / success tokens */}
          <section className="kc-section kc-reveal">
            <h2 className="kc-section-heading" id="initiatives-timeline">
              Consolidated Initiative Timeline
            </h2>
            <p className="kc-section-subtitle">Track our progress throughout the year</p>

            <div className="init-timeline" role="region" aria-labelledby="initiatives-timeline">
              <ol className="init-timeline__list">
                {timeline.map((q) => (
                  <li
                    key={q.quarter}
                    className={`init-timeline__row init-timeline__row--${q.status}`}
                    aria-current={q.status === 'current' ? 'step' : undefined}
                  >
                    <div className="init-timeline__track">
                      <span
                        className={`init-timeline__marker init-timeline__marker--${q.status}`}
                        aria-hidden
                      />
                    </div>
                    <div
                      className={`init-timeline__label-cell init-timeline__label-cell--${q.status}`}
                    >
                      <span className="init-timeline__q">
                        {q.quarter}{' '}
                        <span className="init-timeline__yr">{q.year}</span>
                      </span>
                      <span className="init-timeline__months">{q.monthRange}</span>
                      {q.status === 'current' ? (
                        <span className="init-timeline__now-badge">Now</span>
                      ) : null}
                    </div>
                    <article
                      className={`init-timeline__hq-card init-timeline__hq-card--${q.status}`}
                    >
                      <h3 className="init-timeline__hq-title">{q.title}</h3>
                      <p className="init-timeline__hq-desc">{q.description}</p>
                      <ul className="init-timeline__tags" aria-label="Themes">
                        {q.tags.map((t) => (
                          <li
                            key={`${q.quarter}-${t.label}`}
                            className={`init-timeline__tag init-timeline__tag--${t.tone ?? 'default'}`}
                          >
                            {t.label}
                          </li>
                        ))}
                      </ul>
                      <ul className="init-timeline__bullets">
                        {q.items.map((item) => (
                          <li key={item} className="init-timeline__bullet">
                            <span className="init-timeline__bullet-dot" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* What's Happening Section */}
          <section className="kc-section kc-reveal">
            <h2 className="kc-section-heading">What&rsquo;s Happening?</h2>
            <p className="kc-section-subtitle">
              Stay informed with the latest updates and opportunities
            </p>
            <div className="init-happening">
              {whatsHappening.map((item) => (
                <div key={item.title} className="init-happening__card" style={{ borderLeftColor: item.borderColor }}>
                  <span className="init-happening__date">{item.date}</span>
                  <h3 className="init-happening__title">{item.title}</h3>
                  <p className="init-happening__body">{item.description}</p>
                  <FusionButton href="#" variation="ghost" className="init-happening__cta">
                    {item.cta}
                    <ArrowIcon />
                  </FusionButton>
                </div>
              ))}
            </div>
          </section>

          {/* Learn & Connect */}
          <section className="kc-section kc-reveal">
            <div className="init-bottom-grid">
              <div className="init-learn">
                <div className="init-learn__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} aria-hidden>
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="init-learn__heading">Learn &amp; Connect</h2>
                <p className="init-learn__description">
                  Access training, tools, and collaboration opportunities to support your infrastructure journey.
                </p>
                <div className="init-learn__links">
                  {learnConnectLinks.map((link) => (
                    <a key={link.label} href="#" className="init-learn__link">
                      <LearnIcon type={link.icon} />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="init-get-started" id="contact">
                <h2 className="init-get-started__heading">Get Started</h2>
                <div className="init-get-started__steps">
                  <div className="init-step">
                    <div className="init-step__num">1</div>
                    <div className="init-step__content">
                      <h3 className="init-step__title">Explore Resources</h3>
                      <p className="init-step__desc">Review documentation and guidelines</p>
                    </div>
                  </div>
                  <div className="init-step">
                    <div className="init-step__num">2</div>
                    <div className="init-step__content">
                      <h3 className="init-step__title">Connect with Team</h3>
                      <p className="init-step__desc">Join office hours or reach out directly</p>
                    </div>
                  </div>
                  <div className="init-step">
                    <div className="init-step__num">3</div>
                    <div className="init-step__content">
                      <h3 className="init-step__title">Start Your Journey</h3>
                      <p className="init-step__desc">Begin migration and modernization</p>
                    </div>
                  </div>
                </div>
                <FusionButton href="#" accent className="init-btn--full">
                  Contact Us
                  <ArrowIcon />
                </FusionButton>
              </div>
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
