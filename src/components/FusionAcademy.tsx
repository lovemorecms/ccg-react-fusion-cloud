/** Fusion Academy — full-bleed hero + offerings tiles (CMS.gov DS tokens; mirrors Featured Resources card patterns) */
import type { ReactNode } from 'react'
import { FusionButton } from './FusionButton'
import { useScrollReveal } from '../hooks/useScrollReveal'

type OfferingAccent = 'violet' | 'success' | 'sky'

const academyOfferings = [
  {
    id: 'paths',
    title: 'Role-based learning paths:',
    bullets: ['Business', 'Technical', 'Support teams'],
    cta: 'Start Learning',
    href: '#fusion-academy-role-paths',
    accent: 'sky' as OfferingAccent,
  },
  {
    id: 'docs',
    title: 'Documentation Library',
    bullets: ['Playbooks', 'Architecture patterns', 'Onboarding guides'],
    cta: 'View Docs',
    href: '#fusion-academy-documentation',
    accent: 'violet' as OfferingAccent,
  },
  {
    id: 'tools',
    title: 'Decision Support Tools',
    bullets: ['Cost calculators', 'Platform selection tools', 'Migration readiness assessments'],
    cta: 'View Tools',
    href: '#fusion-academy-tools',
    accent: 'success' as OfferingAccent,
  },
] as const

export function FusionAcademy() {
  const contentRef = useScrollReveal<HTMLDivElement>({ threshold: 0.12 })
  const offeringsRef = useScrollReveal<HTMLUListElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' })
  const academyHeroUrl = `${import.meta.env.BASE_URL}images/sections/fusion-academy-hero.png`

  return (
    <section id="fusion-academy" className="fusion-academy relative isolate overflow-hidden">
      <div
        className="fusion-academy__hero text-[color:var(--fusion-blue-deep)]"
        style={{ backgroundImage: `url(${academyHeroUrl})` }}
      >
        <div className="relative z-[1] mx-auto flex min-h-[min(22rem,58vh)] max-w-[var(--fusion-site-max-width)] items-center px-[var(--fusion-site-padding-x)] py-[var(--fusion-section-pad-block)] md:px-[var(--fusion-site-padding-x-md)] lg:min-h-[min(38rem,62vh)] xl:min-h-[min(42rem,64vh)]">
          <div ref={contentRef} className="fusion-academy__copy fusion-reveal w-full">
            <p className="fusion-academy__eyebrow">Empowering knowledge across the cloud ecosystem.</p>

            <h2 id="fusion-academy-heading" className="fusion-academy__heading">
              <span className="fusion-academy__heading-word">Fusion</span>{' '}
              <span className="fusion-hero__headline-accent fusion-academy__heading-accent">Academy</span>
            </h2>

            <p className="fusion-academy__lede">
              Learning in motion—connected, guided, and built for the CMS cloud ecosystem.
            </p>

            <p className="fusion-academy__body">
              FUSION ACADEMY is the learning and enablement layer of the Fusion Ecosystem—providing structured pathways,
              training resources, and guided experiences that empower CMS stakeholders to build knowledge, develop skills,
              and confidently navigate the multi-cloud landscape.
            </p>

            <div className="fusion-academy__actions mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <FusionButton href="#fusion-academy-start-learning" accent className="fusion-academy__cta-primary">
                Start Learning
              </FusionButton>
              <FusionButton
                href="#fusion-academy-explore-paths"
                variation="ghost"
                className="fusion-academy__cta-secondary"
              >
                Explore Paths
              </FusionButton>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fusion-academy__offerings fusion-band-gradient-primary-mist relative overflow-hidden"
        aria-labelledby="fusion-academy-offerings-heading"
      >
        <div
          className="pointer-events-none absolute -left-16 top-[55%] size-64 rounded-full bg-[rgba(248,196,31,0.05)] blur-[64px] md:left-10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 top-16 size-72 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary-light)_18%,transparent)] blur-[72px] md:right-[8%]"
          aria-hidden
        />

        <div className="relative z-[1] mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] py-[var(--fusion-section-pad-block)] md:px-[var(--fusion-site-padding-x-md)]">
          <h2 id="fusion-academy-offerings-heading" className="sr-only">
            Fusion Academy offerings
          </h2>

          <ul
            ref={offeringsRef}
            className="fusion-academy-offerings__grid fusion-reveal-stagger m-0 list-none p-0"
          >
            {academyOfferings.map((item) => (
              <li key={item.id} className="flex min-h-0 min-w-0">
                <article
                  className="fusion-academy-offerings__card fusion-reveal-child relative flex h-full min-h-[13rem] min-w-0 flex-1 flex-col rounded-xl bg-[color:var(--color-primary)] p-5 pt-6 text-left shadow-md sm:min-h-[14rem] sm:rounded-2xl sm:p-6 md:min-h-[15rem]"
                  aria-labelledby={`fusion-academy-offering-${item.id}`}
                >
                  <span className="fusion-academy-offerings__status-dot" aria-hidden />
                  <span
                    className={`fusion-academy-offerings__accent-glow fusion-academy-offerings__accent-glow--${item.accent}`}
                    aria-hidden
                  />

                  <AcademyIconRing>
                    <IconInsightBars className="h-6 w-6 text-white" />
                  </AcademyIconRing>

                  <h3 id={`fusion-academy-offering-${item.id}`} className="fusion-academy-offerings__title">
                    {item.title}
                  </h3>

                  <ul className="fusion-academy-offerings__list">
                    {item.bullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>

                  <a href={item.href} className="fusion-academy-offerings__cta">
                    <span>{item.cta}</span>
                    <span className="fusion-academy-offerings__cta-arrow" aria-hidden>
                      →
                    </span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function AcademyIconRing({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex size-[3.25rem] shrink-0 items-center justify-center">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-25 blur-md"
        style={{
          background: 'color-mix(in srgb, var(--color-accent-primary) 55%, transparent)',
        }}
        aria-hidden
      />
      <div className="relative flex size-[3.25rem] items-center justify-center rounded-full border-2 border-[color:var(--color-accent-primary)] bg-[color:color-mix(in_srgb,var(--color-primary-darker)_35%,transparent)]">
        {children}
      </div>
    </div>
  )
}

/** Three-bar insight icon (matches Academy card mock) */
function IconInsightBars({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19V11M12 19V5M19 19v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
