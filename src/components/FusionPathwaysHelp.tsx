import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** “How can we help you today?” — staggered pill pathways */
const pathways = [
  {
    id: 'host',
    title: 'I Need to Host an Application',
    href: '#multi-cloud-services',
    Icon: IconSpeechBubble,
  },
  {
    id: 'migrate',
    title: 'I Need to Migrate an Application',
    href: '/learn/initiatives',
    Icon: IconRefresh,
  },
  {
    id: 'guidance',
    title: 'I Need Guidance',
    href: '/learn/knowledge-center',
    Icon: IconStopwatch,
  },
  {
    id: 'support',
    title: 'I Need Support',
    href: '#site-footer',
    Icon: IconQuestion,
    iconWrapSupport: true,
  },
  {
    id: 'explore',
    title: 'Explore Options',
    href: '#fusion-ecosystem',
    Icon: IconGrid,
  },
] as const

type PathwayCard = (typeof pathways)[number]

function PathwayPill({ card, compact }: { card: PathwayCard; compact: boolean }) {
  const navigate = useNavigate()

  const iconWrapClass =
    'iconWrapSupport' in card && card.iconWrapSupport
      ? 'fusion-pathways-help__pill-icon-wrap fusion-pathways-help__pill-icon-wrap--support'
      : 'fusion-pathways-help__pill-icon-wrap'

  const className = compact
    ? 'fusion-pathways-help__pill fusion-pathways-help__pill--compact fusion-reveal-child'
    : 'fusion-pathways-help__pill fusion-reveal-child'

  const inner = (
    <>
      <span className={iconWrapClass} aria-hidden>
        <card.Icon className="fusion-pathways-help__pill-icon" />
      </span>
      <span className="fusion-pathways-help__pill-label">{card.title}</span>
      <ChevronRight className="fusion-pathways-help__pill-chevron" />
    </>
  )

  if (card.href.startsWith('/')) {
    return (
      <a
        href={card.href}
        className={className}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          if (e.button !== 0) return
          e.preventDefault()
          navigate(card.href)
        }}
      >
        {inner}
      </a>
    )
  }

  return (
    <a href={card.href} className={className}>
      {inner}
    </a>
  )
}

export function FusionPathwaysHelp() {
  const headerRef = useScrollReveal<HTMLElement>()
  const rowsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' })
  const row1 = pathways.slice(0, 2)
  const row2 = pathways.slice(2, 5)

  return (
    <section
      id="pathways"
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
        <header
          ref={headerRef}
          className="fusion-pathways-help__header fusion-home-section__header fusion-reveal max-w-[62rem]"
        >
          <h2 id="fusion-pathways-heading" className="fusion-pathways-help__heading m-0">
            How can we help you today?
          </h2>
          <p className="fusion-pathways-help__lede m-0 max-w-[935px]">
            Select a pathway to access services, resources, and support across the cloud ecosystem
          </p>
        </header>

        <nav ref={rowsRef} className="fusion-pathways-help__layout fusion-reveal-stagger" aria-labelledby="fusion-pathways-heading">
          <ul className="fusion-pathways-help__row fusion-pathways-help__row--two m-0 list-none p-0">
            {row1.map((card) => (
              <li key={card.id} className="flex min-w-0">
                <PathwayPill card={card} compact={false} />
              </li>
            ))}
          </ul>
          <ul className="fusion-pathways-help__row fusion-pathways-help__row--three m-0 list-none p-0">
            {row2.map((card) => (
              <li key={card.id} className="flex min-w-0">
                <PathwayPill card={card} compact />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSpeechBubble({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 9h8M8 13h5"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
      <path
        d="M8 5h12a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 3v-3H8a2 2 0 01-2-2V7a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconRefresh({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 9a7 7 0 0113-2l1 2M19 15a7 7 0 01-13 2l-1-2"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 9V5h4M19 15v4h-4"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconStopwatch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth={1.75} />
      <path d="M12 10V7M9 3h6" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
      <path d="M12 14l3-2" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  )
}

function IconQuestion({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 9a2.5 2.5 0 114.8 1.2c-.6.8-1.3 1.1-1.8 1.8-.4.6-.5 1-.5 1.5V14"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
      <path d="M12 17h.01" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  )
}

function IconGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
    </svg>
  )
}
