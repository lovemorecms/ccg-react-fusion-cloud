import { FusionButton } from './FusionButton'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** “How can we help you today?” pathway cards — Figma node 370:41188 */
const pathways = [
  {
    id: 'host',
    title: 'I Need to Host an Application',
    body: 'Start hosting in the right environment.',
    cta: 'Start Hosting',
    href: '#host-application',
    Icon: IconHost,
  },
  {
    id: 'migrate',
    title: 'I Need to Migrate an Application',
    body: 'Move your applications to the cloud with confidence.',
    cta: 'Start Migration',
    href: '#migrate-application',
    Icon: IconMigrate,
  },
  {
    id: 'guidance',
    title: 'I Need Guidance',
    body: 'Get expert advice and decision support.',
    cta: 'Get Advice',
    href: '#guidance',
    Icon: IconGuidance,
  },
  {
    id: 'support',
    title: 'I Need Support',
    body: 'Access help, tools and support services.',
    cta: 'Get Support',
    href: '#support-services',
    Icon: IconSupportCard,
  },
  {
    id: 'explore',
    title: 'Explore Options',
    body: 'Compare platforms and capabilities.',
    cta: 'Explore',
    href: '#explore-options',
    Icon: IconExplore,
  },
] as const

export function FusionPathwaysHelp() {
  const headerRef = useScrollReveal<HTMLElement>()
  const cardsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' })

  return (
    <section
      className="fusion-pathways-help fusion-band-gradient-primary-mist relative overflow-hidden"
      aria-labelledby="fusion-pathways-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 top-[55%] size-64 rounded-full bg-[rgba(248,196,31,0.05)] blur-[64px] md:left-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-16 size-64 rounded-full fusion-pathways-help__orb-blue blur-[64px] md:right-[10%]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] py-[var(--fusion-section-pad-block)] md:px-[var(--fusion-site-padding-x-md)]">
        <header ref={headerRef} className="fusion-pathways-help__header fusion-reveal mb-10 flex max-w-[62rem] flex-col gap-4 md:mb-12 md:gap-5">
          <h2
            id="fusion-pathways-heading"
            className="fusion-pathways-help__heading m-0"
          >
            <span className="fusion-pathways-help__heading-muted">
              How can we{' '}
            </span>
            <span className="fusion-pathways-help__heading-accent">
              help you today?
            </span>
          </h2>
          <p className="fusion-pathways-help__lede m-0 max-w-[935px]">
            Select a pathway to access services, resources, and support across
            the cloud ecosystem
          </p>
        </header>

        <div
          ref={cardsRef}
          className="fusion-pathways-help__cards fusion-reveal-stagger flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch] xl:grid xl:grid-cols-5 xl:gap-4 xl:overflow-visible xl:pb-0 xl:snap-none 2xl:gap-5"
          role="list"
        >
          {pathways.map((card) => (
            <article
              key={card.id}
              role="listitem"
              className="fusion-pathways-help__card fusion-reveal-child flex w-[min(280px,82vw)] shrink-0 snap-center flex-col items-center rounded-[10px] border px-4 pb-8 pt-8 text-center text-white shadow-sm sm:w-[min(300px,70vw)] xl:min-w-0 xl:w-full xl:max-w-none xl:px-5 xl:pt-9"
            >
              <card.Icon className="mb-5 h-12 w-12 shrink-0 text-sky-200/90 xl:mb-6" />
              <h3 className="fusion-pathways-help__card-title m-0">
                {card.title}
              </h3>
              <p className="fusion-pathways-help__card-body m-0">
                {card.body}
              </p>
              <FusionButton href={card.href} accent className="fusion-pathways-help__cta">
                {card.cta}
              </FusionButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function IconHost({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect
        x="8"
        y="10"
        width="32"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 34v4M24 34v4M32 34v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 18h12M18 24h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconMigrate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M10 32h28M10 32l6-6M10 32l6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 18h20a4 4 0 0 1 4 4v6H10v-6a4 4 0 0 1 4-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 14V10h4v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconGuidance({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="22" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 36h12M24 32v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 18v4M24 18h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSupportCard({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 20a6 6 0 0 1 12 0c0 2-1.5 3.5-3 4.5S24 27 24 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 34h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconExplore({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M14 14h8v8h-8zM26 14h8v8h-8zM14 26h8v8h-8zM26 26h8v8h-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
