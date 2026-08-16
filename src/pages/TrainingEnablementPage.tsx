import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { ChevronLeft, ChevronRight } from '../components/icons/Chevron'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const learningOpportunities = [
  {
    id: 'sessions',
    title: 'Hybrid Cloud Program Sessions',
    description:
      'Join structured learning sessions covering fundamental to advanced CMS Hybrid Cloud implementation strategies and best practices.',
    icon: 'graduation',
    href: '#learning-paths',
  },
  {
    id: 'modules',
    title: 'Hybrid Cloud Program Modules',
    description:
      'Access modular, self-paced content designed to build specific skills and competencies in cloud architecture and deployment.',
    icon: 'book',
    href: '#learning-paths',
  },
  {
    id: 'platform',
    title: 'Industry and Platform Learning',
    description:
      'Gain specialized knowledge across healthcare, finance, and enterprise platforms with industry-specific training modules.',
    icon: 'rocket',
    href: '#featured-learning',
  },
] as const

const learningPaths = [
  {
    step: 1,
    title: 'Foundations',
    description:
      'Build strong fundamentals with basic principles and best practices for CMS Hybrid Cloud architecture and operations.',
    href: '#featured-learning',
  },
  {
    step: 2,
    title: 'Enablement',
    description:
      'Advance your capabilities with intermediate workflows, tools, and strategies for implementing cloud solutions.',
    href: '#featured-learning',
  },
  {
    step: 3,
    activeDots: 3,
    title: 'Optimization',
    description:
      'Master advanced techniques for performance tuning, cost optimization, and enterprise-scale deployment strategies.',
    href: '#get-started',
  },
] as const

const featuredCourses = [
  {
    id: 'preside-chat',
    title: 'Preside Chat',
    description: 'An extensible conversational design framework for building AI-driven chat interfaces.',
    icon: 'chat',
  },
  {
    id: 'consulting-tech',
    title: 'Consulting as Unpaid Tech',
    description: 'Frameworks and best practices for building human-centered technical solutions.',
    icon: 'users',
  },
  {
    id: 'ocdie',
    title: 'OCDIE Best Overview',
    description: 'Learn about the foundational principles of the OCDIE framework for complex deployments.',
    icon: 'code',
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security Essentials',
    description: 'Core security patterns and compliance practices for CMS Hybrid Cloud workloads.',
    icon: 'shield',
  },
  {
    id: 'devops',
    title: 'DevOps on Hybrid Cloud',
    description: 'CI/CD pipelines, infrastructure as code, and operational excellence for cloud teams.',
    icon: 'bolt',
  },
  {
    id: 'migration',
    title: 'Migration Playbook',
    description: 'Step-by-step guidance for planning and executing legacy-to-cloud migrations.',
    icon: 'rocket',
  },
] as const

const getStartedCards = [
  {
    id: 'start',
    title: 'Ready to get started?',
    description: 'Begin your learning journey with foundational courses and setup guides.',
    cta: 'Start Learning',
    href: '#learning-paths',
    icon: 'rocket',
  },
  {
    id: 'updates',
    title: 'Want updates?',
    description: 'Stay informed about new courses, features, and best practices.',
    cta: 'Subscribe',
    href: '/learn/initiatives',
    icon: 'bolt',
  },
  {
    id: 'help',
    title: 'Have more questions?',
    description: 'Access our comprehensive documentation and support resources.',
    cta: 'Get Help',
    href: '/learn/knowledge-center',
    icon: 'users',
  },
] as const

const COURSES_PER_PAGE = 3

function ArrowRight() {
  return <ChevronRight />
}

function TrainingIcon({ type }: { type: string }) {
  const cls = 'te-icon__svg'
  switch (type) {
    case 'graduation':
      return (
        <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M6 12v5c0 0 3.5 2 6 2s6-2 6-2v-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      )
    case 'book':
      return (
        <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      )
    case 'rocket':
      return (
        <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      )
    case 'chat':
      return (
        <svg className={cls} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      )
    case 'users':
      return (
        <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={1.5} />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      )
    case 'code':
      return (
        <svg className={cls} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={cls} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      )
    case 'bolt':
      return (
        <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

type TeActionLinkProps = {
  href: string
  label: string
  context?: string
  className?: string
}

/** 508-friendly action link: unique name, visible focus, internal routes via React Router */
function TeIconRing({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex size-11 shrink-0 items-center justify-center md:size-[3.25rem]">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-25 blur-md"
        style={{ background: 'color-mix(in srgb, var(--fusion-yellow) 55%, transparent)' }}
        aria-hidden
      />
      <div className="fusion-accent-yellow-ring relative flex size-11 items-center justify-center rounded-full border-2 bg-[color:color-mix(in_srgb,var(--color-primary-darker)_35%,transparent)] md:size-[3.25rem]">
        {children}
      </div>
    </div>
  )
}

function TeFeaturedCard({
  id,
  title,
  description,
  href,
  cta,
  icon,
  accent = 'none',
}: {
  id: string
  title: string
  description: string
  href: string
  cta: string
  icon: string
  accent?: 'none' | 'violet' | 'success' | 'sky'
}) {
  return (
    <article
      className="fusion-featured-resources__card te-featured-card relative flex h-full min-h-[12rem] min-w-0 flex-1 flex-col rounded-xl p-5 pt-6 text-white sm:rounded-2xl md:p-6"
      aria-labelledby={`te-card-${id}`}
    >
      <span className="fusion-featured-resources__status-dot" aria-hidden />
      {accent !== 'none' ? (
        <span
          className={`fusion-featured-resources__accent-glow fusion-featured-resources__accent-glow--${accent}`}
          aria-hidden
        />
      ) : null}
      <TeIconRing>
        <span className="fusion-accent-yellow">
          <TrainingIcon type={icon} />
        </span>
      </TeIconRing>
      <h3 id={`te-card-${id}`} className="fusion-featured-resources__card-title m-0 mt-3 sm:mt-4">
        {title}
      </h3>
      <p className="te-featured-card__body">{description}</p>
      <TeActionLink href={href} label={cta} context={title} className="fusion-featured-resources__card-link" />
    </article>
  )
}

function TeActionLink({ href, label, context, className = 'fusion-featured-resources__card-link' }: TeActionLinkProps) {
  const content: ReactNode = (
    <>
      <span className="min-w-0">{label}</span>
      {context ? <span className="sr-only">{`: ${context}`}</span> : null}
      <span className="fusion-featured-resources__arrow" aria-hidden>
        <ArrowRight />
      </span>
    </>
  )

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  )
}

function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string
  title: string
  subtitle: string
}) {
  return (
    <header className="te-section__header">
      <h2 id={id} className="explore-section-heading explore-section-heading--lede">
        {title}
      </h2>
      <p className="te-section__subtitle">{subtitle}</p>
    </header>
  )
}

export default function TrainingEnablementPage() {
  const pageCount = Math.ceil(featuredCourses.length / COURSES_PER_PAGE)
  const [coursePage, setCoursePage] = useState(0)

  useEffect(() => {
    document.title = 'Training & Enablement | Learn | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  const visibleCourses = featuredCourses.slice(
    coursePage * COURSES_PER_PAGE,
    coursePage * COURSES_PER_PAGE + COURSES_PER_PAGE,
  )

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="explore-2 te-page">
        <div className="te-page__shell">
          <nav aria-label="Breadcrumb" className="te-breadcrumb">
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
                <Link to="/learn/knowledge-center" className="kc-breadcrumb-link">
                  Learn
                </Link>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                /
              </li>
              <li>
                <span className="kc-breadcrumb-current">Training &amp; Enablement</span>
              </li>
            </ol>
          </nav>

          <section
            className="explore-hero te-hero rounded-2xl relative overflow-hidden"
            aria-labelledby="te-hero-heading"
            style={{
              background:
                'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)',
              border: '1px solid var(--color-border-bright)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--fusion-deep-sea-500) 45%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--fusion-yellow) 22%, transparent) 0%, transparent 50%)',
              }}
              aria-hidden
            />
            <div className="explore-hero__content te-hero__copy relative z-10">
              <h1 id="te-hero-heading" className="fusion-hero__headline explore-hero__headline">
                <span className="block font-semibold leading-[1.12] tracking-wide">
                  Training &amp; Enablement
                </span>
              </h1>
              <p className="fusion-hero__body explore-hero__body">
                Build technical expertise for CMS Hybrid Cloud. Discover structured paths, expert-led
                sessions, and self-paced modules designed to accelerate your journey.
              </p>
              <div className="te-hero__actions">
                <FusionButton href="#learning-paths" accent onDark>
                  Get Started
                </FusionButton>
                <FusionButton href="#featured-learning" variation="ghost" onDark className="te-btn-secondary">
                  View All Courses
                </FusionButton>
              </div>
            </div>
            <img
              src={`${import.meta.env.BASE_URL}images/sections/academy-illustration-dark.png`}
              alt=""
              className="explore-hero__art te-hero__art"
              decoding="async"
            />
          </section>
        </div>

        <section className="te-section" aria-labelledby="te-opportunities-heading">
          <div className="te-container">
            <SectionHeading
              id="te-opportunities-heading"
              title="Learning Opportunities"
              subtitle="Explore our curated learning experiences designed to build comprehensive cloud expertise"
            />
            <div className="te-card-grid te-card-grid--3">
              {learningOpportunities.map((item) => (
                <TeFeaturedCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  cta="Learn more"
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="learning-paths" className="te-section te-section--paths" aria-labelledby="te-paths-heading">
          <div className="te-container">
            <SectionHeading
              id="te-paths-heading"
              title="Choose Your Learning Path"
              subtitle="Explore three interconnected paths to build your knowledge and capabilities from the ground up"
            />
            <div className="te-card-grid te-card-grid--3">
              {learningPaths.map((path) => (
                <TeFeaturedCard
                  key={path.step}
                  id={`path-${path.step}`}
                  title={path.title}
                  description={path.description}
                  href={path.href}
                  cta="Learn more"
                  icon={path.step === 1 ? 'book' : path.step === 2 ? 'graduation' : 'rocket'}
                  accent={path.step === 1 ? 'sky' : path.step === 2 ? 'violet' : 'success'}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="featured-learning" className="te-section" aria-labelledby="te-featured-heading">
          <div className="te-container">
            <SectionHeading
              id="te-featured-heading"
              title="Featured Learning"
              subtitle="Discover our most popular courses and latest learning content"
            />
            <div className="te-carousel" aria-labelledby="te-featured-heading">
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                Showing featured courses {coursePage * COURSES_PER_PAGE + 1}–
                {Math.min((coursePage + 1) * COURSES_PER_PAGE, featuredCourses.length)} of{' '}
                {featuredCourses.length}
              </p>
              <div className="te-card-grid te-card-grid--3">
                {visibleCourses.map((course, index) => (
                  <TeFeaturedCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    href="#get-started"
                    cta="Explore course"
                    icon={course.icon}
                    accent={(['violet', 'success', 'sky'] as const)[index % 3]}
                  />
                ))}
              </div>
              <nav className="te-carousel__controls" aria-label="Featured course pagination">
                <button
                  type="button"
                  className="te-carousel__btn"
                  aria-label="Previous featured courses"
                  disabled={coursePage === 0}
                  onClick={() => setCoursePage((p) => Math.max(0, p - 1))}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="te-carousel__dots">
                  {Array.from({ length: pageCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show featured courses, page ${i + 1} of ${pageCount}`}
                      aria-current={i === coursePage ? 'page' : undefined}
                      className={`te-carousel__dot${i === coursePage ? ' te-carousel__dot--active' : ''}`}
                      onClick={() => setCoursePage(i)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="te-carousel__btn"
                  aria-label="Next featured courses"
                  disabled={coursePage >= pageCount - 1}
                  onClick={() => setCoursePage((p) => Math.min(pageCount - 1, p + 1))}
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </div>
        </section>

        <section id="get-started" className="te-cta-band" aria-labelledby="te-cta-heading">
          <div className="te-cta-band__glow" aria-hidden />
          <div className="te-container">
            <header className="te-cta-band__header">
              <h2 id="te-cta-heading" className="explore-section-heading explore-section-heading--lede">
                Getting Started with CMS Hybrid Cloud
              </h2>
              <p className="te-cta-band__subtitle">
                Ready to get started? Choose your path based on your current needs
              </p>
            </header>
            <div className="te-card-grid te-card-grid--3">
              {getStartedCards.map((card) => (
                <TeFeaturedCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  cta={card.cta}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
