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
    activeDots: 1,
    title: 'Foundations',
    description:
      'Build strong fundamentals with basic principles and best practices for CMS Hybrid Cloud architecture and operations.',
    href: '#featured-learning',
  },
  {
    step: 2,
    activeDots: 2,
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

function PathDots({ active }: { active: number }) {
  return (
    <span className="te-path-dots" aria-hidden>
      {[1, 2, 3].map((dot) => (
        <span key={dot} className={`te-path-dots__dot${dot <= active ? ' te-path-dots__dot--active' : ''}`} />
      ))}
    </span>
  )
}

type TeActionLinkProps = {
  href: string
  label: string
  context?: string
  className?: string
}

/** 508-friendly action link: unique name, visible focus, internal routes via React Router */
function TeActionLink({ href, label, context, className = 'te-card__link' }: TeActionLinkProps) {
  const content: ReactNode = (
    <>
      {label}
      {context ? <span className="sr-only">{`: ${context}`}</span> : null}
      <ArrowRight />
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
  centered,
  accentVariant = 'blue',
}: {
  id: string
  title: string
  subtitle: string
  centered?: boolean
  accentVariant?: 'blue' | 'gold'
}) {
  return (
    <header className={`te-section__header${centered ? ' te-section__header--centered' : ''}`}>
      <div className="te-section__title-row">
        {centered ? (
          <>
            <span className="te-section__rule te-section__rule--left" aria-hidden />
            <h2 id={id} className="te-section__title">
              {title}
            </h2>
            <span className="te-section__rule te-section__rule--right" aria-hidden />
          </>
        ) : (
          <>
            <span className={`te-section__accent te-section__accent--${accentVariant}`} aria-hidden />
            <h2 id={id} className="te-section__title">
              {title}
            </h2>
          </>
        )}
      </div>
      <p className="te-section__subtitle">{subtitle}</p>
    </header>
  )
}

export default function TrainingEnablementPage() {
  const pageCount = Math.ceil(featuredCourses.length / COURSES_PER_PAGE)
  const [coursePage, setCoursePage] = useState(0)

  useEffect(() => {
    document.title = 'Training & Enablement | Learn | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
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

      <main id="main-content" tabIndex={-1} className="te-page">
        <header className="tpl-2col-hero-band">
          <div className="tpl-2col-breadcrumb-bar">
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
                  <Link to="/learn/knowledge-center" className="kc-breadcrumb-link">
                    Learn
                  </Link>
                </li>
                <li aria-hidden="true" className="kc-breadcrumb-sep">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </li>
                <li>
                  <span className="kc-breadcrumb-current">Training &amp; Enablement</span>
                </li>
              </ol>
            </nav>
          </div>

          <section className="po-hero te-hero" aria-labelledby="te-hero-heading">
            <div className="te-hero__orbit" aria-hidden />
            <div className="te-hero__fade" aria-hidden />
            <div className="po-hero__glow" aria-hidden />

            <div className="init-hero__inner po-hero__inner te-hero__inner">
              <div className="init-hero__text po-hero__text te-hero__text">
                <h1 id="te-hero-heading" className="init-hero__heading po-hero__heading">
                  Training
                </h1>
                <p className="init-hero__description po-hero__description">
                  Build and enhance your CMS Hybrid Cloud technical expertise. Discover our end-to-end learning
                  resources, structured paths, and expert-led modules designed to accelerate your journey.
                </p>
                <div className="init-hero__actions te-hero__actions">
                  <FusionButton href="#learning-paths" accent onDark>
                    Get Started
                    <ArrowRight />
                  </FusionButton>
                  <FusionButton href="#featured-learning" variation="ghost" onDark>
                    View All Courses
                  </FusionButton>
                </div>
              </div>
            </div>
          </section>
        </header>

        <section className="te-section" aria-labelledby="te-opportunities-heading">
          <div className="te-container">
            <SectionHeading
              id="te-opportunities-heading"
              title="Learning Opportunities"
              subtitle="Explore our curated learning experiences designed to build comprehensive cloud expertise"
            />
            <div className="te-card-grid te-card-grid--3">
              {learningOpportunities.map((item) => (
                <article key={item.id} className="te-card">
                  <div className="te-card__icon" aria-hidden>
                    <TrainingIcon type={item.icon} />
                  </div>
                  <h3 className="te-card__title">{item.title}</h3>
                  <p className="te-card__body">{item.description}</p>
                  <TeActionLink href={item.href} label="Learn more" context={item.title} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="te-divider te-divider--dots" aria-hidden />

        <section id="learning-paths" className="te-section te-section--paths" aria-labelledby="te-paths-heading">
          <div className="te-container">
            <SectionHeading
              id="te-paths-heading"
              title="Choose Your Learning Path"
              subtitle="Explore three interconnected paths to build your knowledge and capabilities from the ground up"
              centered
            />
            <div className="te-path-grid">
              {learningPaths.map((path, index) => (
                <article key={path.step} className="te-path-card">
                  <div className="te-path-card__rail" aria-hidden />
                  {index < learningPaths.length - 1 && <span className="te-path-card__connector" aria-hidden />}
                  <div className="te-path-card__step-row">
                    <span className="te-path-card__step">{path.step}</span>
                    <PathDots active={path.activeDots} />
                  </div>
                  <h3 className="te-path-card__title">{path.title}</h3>
                  <p className="te-path-card__body">{path.description}</p>
                  <TeActionLink href={path.href} label="Learn more" context={path.title} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="te-divider te-divider--beads" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <section id="featured-learning" className="te-section" aria-labelledby="te-featured-heading">
          <div className="te-container">
            <SectionHeading
              id="te-featured-heading"
              title="Featured Learning"
              subtitle="Discover our most popular courses and latest learning content"
              accentVariant="gold"
            />
            <div className="te-carousel" aria-labelledby="te-featured-heading">
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                Showing featured courses {coursePage * COURSES_PER_PAGE + 1}–
                {Math.min((coursePage + 1) * COURSES_PER_PAGE, featuredCourses.length)} of{' '}
                {featuredCourses.length}
              </p>
              <div className="te-card-grid te-card-grid--3">
                {visibleCourses.map((course) => (
                  <article key={course.id} className="te-card te-card--featured">
                    <div className="te-card__icon te-card__icon--lg" aria-hidden>
                      <TrainingIcon type={course.icon} />
                    </div>
                    <h3 className="te-card__title">{course.title}</h3>
                    <p className="te-card__body">{course.description}</p>
                    <TeActionLink
                      href="#get-started"
                      label="Explore course"
                      context={course.title}
                    />
                  </article>
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

        <div className="te-divider te-divider--wave" aria-hidden />

        <section id="get-started" className="te-cta-band" aria-labelledby="te-cta-heading">
          <div className="te-cta-band__glow" aria-hidden />
          <div className="te-container">
            <header className="te-cta-band__header">
              <h2 id="te-cta-heading" className="te-cta-band__title">
                Getting Started with CMS Hybrid Cloud
              </h2>
              <p className="te-cta-band__subtitle">
                Ready to get started? Choose your path based on your current needs
              </p>
            </header>
            <div className="te-card-grid te-card-grid--3">
              {getStartedCards.map((card) => (
                <article key={card.id} className="te-cta-card">
                  <div className="te-cta-card__icon" aria-hidden>
                    <TrainingIcon type={card.icon} />
                  </div>
                  <h3 className="te-cta-card__title">{card.title}</h3>
                  <p className="te-cta-card__body">{card.description}</p>
                  <TeActionLink
                    href={card.href}
                    label={card.cta}
                    context={card.title}
                    className="te-cta-card__link"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="te-powered">
          <span className="te-powered__rule" aria-hidden />
          <p className="te-powered__text">Powered by CMS Hybrid Cloud</p>
          <span className="te-powered__rule" aria-hidden />
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
