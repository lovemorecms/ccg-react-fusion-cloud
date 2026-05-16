import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type AccentBar = 'none' | 'violet' | 'success' | 'sky'

const resources = [
  {
    id: 'spotlight',
    title: 'FUSION Spotlight',
    description: 'Platform overview',
    href: '#fusion-spotlight',
    accent: 'none' as AccentBar,
    Icon: IconDocument,
  },
  {
    id: 'briefings',
    title: 'Executive Briefings',
    description: 'Stakeholder updates',
    href: '#executive-briefings',
    accent: 'violet' as AccentBar,
    Icon: IconChart,
  },
  {
    id: 'status',
    title: 'System Status',
    description: 'All Systems Operational',
    href: '#system-status',
    accent: 'success' as AccentBar,
    Icon: IconInfo,
  },
  {
    id: 'announcements',
    title: 'Announcements',
    description: 'Latest program updates',
    href: '#announcements',
    accent: 'sky' as AccentBar,
    Icon: IconBell,
  },
] as const

export function FusionFeaturedResources() {
  const headerRef = useScrollReveal<HTMLElement>()
  const gridRef = useScrollReveal<HTMLUListElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' })

  return (
    <section
      className="fusion-featured-resources fusion-band-gradient-primary-mist relative overflow-hidden"
      aria-labelledby="fusion-featured-resources-heading"
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
        <header
          ref={headerRef}
          className="fusion-featured-resources__header fusion-home-section__header fusion-reveal max-w-[935px]"
        >
          <h2 id="fusion-featured-resources-heading" className="fusion-featured-resources__heading m-0">
            Featured Resources
          </h2>
          <p className="fusion-featured-resources__support m-0 max-w-[935px]">Heading support info</p>
        </header>

        <ul
          ref={gridRef}
          className="fusion-featured-resources__grid fusion-reveal-stagger m-0 list-none p-0"
        >
          {resources.map((item) => (
            <li key={item.id} className="flex min-h-0 min-w-0">
              <article
                className="fusion-featured-resources__card fusion-reveal-child relative flex h-full min-h-[10rem] min-w-0 flex-1 flex-col rounded-xl bg-[color:var(--color-primary)] p-3 pt-4 text-white shadow-md sm:min-h-[10.5rem] sm:rounded-2xl sm:p-5 sm:pt-6 md:min-h-[11rem] md:p-6"
                aria-labelledby={`fusion-featured-resource-${item.id}`}
              >
                <span className="fusion-featured-resources__status-dot" aria-hidden />
                {item.accent !== 'none' ? (
                  <span
                    className={`fusion-featured-resources__accent-glow fusion-featured-resources__accent-glow--${item.accent}`}
                    aria-hidden
                  />
                ) : null}

                <FeaturedIconRing>
                  <item.Icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                </FeaturedIconRing>

                <h3
                  id={`fusion-featured-resource-${item.id}`}
                  className="fusion-featured-resources__card-title m-0 mt-3 sm:mt-4"
                >
                  {item.title}
                </h3>
                <a href={item.href} className="fusion-featured-resources__card-link">
                  <span className="min-w-0">{item.description}</span>
                  <span className="fusion-featured-resources__arrow" aria-hidden>
                    →
                  </span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeaturedIconRing({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex size-11 shrink-0 items-center justify-center md:size-[3.25rem]">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-25 blur-md"
        style={{
          background: 'color-mix(in srgb, var(--color-accent-primary) 55%, transparent)',
        }}
        aria-hidden
      />
      <div className="relative flex size-11 items-center justify-center rounded-full border-2 border-[color:var(--color-accent-primary)] bg-[color:color-mix(in_srgb,var(--color-primary-darker)_35%,transparent)] md:size-[3.25rem]">
        {children}
      </div>
    </div>
  )
}

function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V5M4 19h16M7 15v3M12 9v9M17 12v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 16h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function IconBell({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
