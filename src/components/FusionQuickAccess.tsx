import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** Quick Access row — Figma node 370:41106 */
const items = [
  {
    id: 'launchpad',
    title: 'Launchpad',
    subtitle: 'Start your journey',
    href: '#launchpad',
    Icon: IconLaunchpad,
  },
  {
    id: 'governance',
    title: 'Governance',
    subtitle: 'Oversight and trust',
    href: '#governance',
    Icon: IconGovernance,
  },
  {
    id: 'pathways',
    title: 'Pathways',
    subtitle: 'Find the right path',
    href: '#pathways',
    Icon: IconPathways,
  },
  {
    id: 'solutions',
    title: 'Solutions',
    subtitle: 'Explore cloud options',
    href: '#solutions',
    Icon: IconSolutions,
  },
  {
    id: 'support',
    title: 'Support',
    subtitle: 'Get CST help',
    href: '#support',
    Icon: IconSupport,
  },
  {
    id: 'learn',
    title: 'Learn',
    subtitle: 'Upskill and adapt',
    href: '#learn',
    Icon: IconLearn,
  },
] as const

export function FusionQuickAccess() {
  const headerRef = useScrollReveal<HTMLElement>()
  const panelRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -20px 0px' })

  return (
    <section
      className="fusion-quick-access fusion-band-gradient-primary-mist relative overflow-hidden"
      aria-labelledby="fusion-quick-access-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 top-[60%] size-64 rounded-full bg-[rgba(248,196,31,0.05)] blur-[64px] md:left-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-10 size-64 rounded-full fusion-quick-access__blur-primary blur-[64px] md:right-[10%]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] pb-[var(--fusion-section-pad-block)] pt-[var(--fusion-section-pad-after-hero)] md:px-[var(--fusion-site-padding-x-md)]">
        <header ref={headerRef} className="fusion-quick-access__header fusion-reveal mb-8 flex max-w-[935px] flex-col gap-3 md:mb-10 md:gap-4">
          <h2
            id="fusion-quick-access-heading"
            className="fusion-quick-access__heading m-0"
          >
            Quick Access
          </h2>
          <p className="fusion-quick-access__support m-0 max-w-[935px]">
            Heading support info
          </p>
        </header>

        <div ref={panelRef} className="fusion-quick-access__panel fusion-reveal-stagger relative overflow-hidden rounded-2xl border bg-[rgba(255,255,255,0.45)] p-6 backdrop-blur-sm md:p-8">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[rgba(220,238,252,0.45)] via-[rgba(236,248,252,0.2)] to-transparent"
            aria-hidden
          />
          <div className="relative z-[1] grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 xl:grid-cols-6 xl:gap-x-0">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`fusion-reveal-child flex min-w-0 flex-col items-center text-center xl:px-3 ${
                  index < items.length - 1
                    ? 'sm:border-transparent xl:border-e xl:border-[color:color-mix(in_srgb,var(--fusion-blue-bright)_45%,transparent)]'
                    : ''
                }`}
              >
                <a
                  href={item.href}
                  className="fusion-quick-access__link group flex w-full max-w-[14rem] flex-col items-center rounded-xl px-2 py-1 outline-offset-4 transition-colors"
                >
                  <IconRing>
                    <item.Icon className="h-6 w-6 text-[color:var(--fusion-blue)]" />
                  </IconRing>
                  <span className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.35px] text-[color:var(--fusion-blue)] sm:text-base">
                    {item.title}
                  </span>
                  <span className="mt-1 font-sans text-xs leading-tight text-[color:color-mix(in_srgb,var(--fusion-blue)_90%,transparent)] sm:text-sm">
                    {item.subtitle}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IconRing({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-20 blur-md"
        style={{
          backgroundImage: 'linear-gradient(90deg, var(--fusion-blue-bright), color-mix(in srgb, var(--fusion-blue) 70%, white))',
        }}
        aria-hidden
      />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[color:color-mix(in_srgb,var(--fusion-blue-bright)_50%,transparent)] bg-[color:color-mix(in_srgb,var(--fusion-blue-bright)_12%,transparent)]">
        {children}
      </div>
    </div>
  )
}

function IconLaunchpad({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconGovernance({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPathways({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 17V7l4-4h10l4 4v10l-4 4H7l-4-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9 9h6M9 13h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSolutions({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 14a5 5 0 0 1 10 0M6 14h12M9 10h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSupport({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.6.3-1.2.8-1.2 1.6V14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 17h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconLearn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10l8-5 8 5-8 5-8-5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M8 12v4.5l4 2.5 4-2.5V12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}
