import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from './icons/Chevron'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** “How can we help you today?” — featured-resource-style pathway cards */
const pathways = [
  {
    id: 'host',
    title: 'I Need to Host an Application',
    description: 'Cloud hosting services',
    href: '#multi-cloud-services',
    Icon: IconSpeechBubble,
  },
  {
    id: 'migrate',
    title: 'I Need to Migrate an Application',
    description: 'Application migration',
    href: '/learn/initiatives',
    Icon: IconRefresh,
  },
  {
    id: 'support',
    title: 'I Need Support',
    description: 'Help and contact',
    href: '#site-footer',
    Icon: IconQuestion,
  },
  {
    id: 'explore',
    title: 'Explore Options',
    description: 'Browse the ecosystem',
    href: '#fusion-ecosystem',
    Icon: IconGrid,
  },
] as const

export function FusionPathwaysHelp() {
  const headerRef = useScrollReveal<HTMLElement>()
  const gridRef = useScrollReveal<HTMLUListElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' })
  const navigate = useNavigate()

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

        <ul
          ref={gridRef}
          className="fusion-pathways-help__grid fusion-reveal-stagger m-0 list-none p-0"
        >
          {pathways.map((item) => (
            <li key={item.id} className="flex min-h-0 min-w-0">
              <article
                className="fusion-featured-resources__card fusion-reveal-child relative flex h-full min-h-[10rem] min-w-0 flex-1 flex-col rounded-xl bg-[color:var(--color-primary)] p-3 pt-4 text-white shadow-md sm:min-h-[10.5rem] sm:rounded-2xl sm:p-5 sm:pt-6 md:min-h-[11rem] md:p-6"
                aria-labelledby={`fusion-pathway-${item.id}`}
              >
                <span className="fusion-featured-resources__status-dot" aria-hidden />

                <PathwayIconRing>
                  <item.Icon className="fusion-accent-yellow h-5 w-5 md:h-6 md:w-6" />
                </PathwayIconRing>

                <h3
                  id={`fusion-pathway-${item.id}`}
                  className="fusion-featured-resources__card-title m-0 mt-3 sm:mt-4"
                >
                  {item.title}
                </h3>
                <a
                  href={item.href}
                  className="fusion-featured-resources__card-link"
                  onClick={(e) => {
                    if (!item.href.startsWith('/')) return
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                    if (e.button !== 0) return
                    e.preventDefault()
                    navigate(item.href)
                  }}
                >
                  <span className="min-w-0">{item.description}</span>
                  <span className="fusion-featured-resources__arrow" aria-hidden>
                    <ChevronRight size={16} />
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

function PathwayIconRing({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex size-11 shrink-0 items-center justify-center md:size-[3.25rem]">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-25 blur-md"
        style={{
          background: 'color-mix(in srgb, var(--fusion-yellow) 55%, transparent)',
        }}
        aria-hidden
      />
      <div className="fusion-accent-yellow-ring relative flex size-11 items-center justify-center rounded-full border-2 bg-[color:color-mix(in_srgb,var(--color-primary-darker)_35%,transparent)] md:size-[3.25rem]">
        {children}
      </div>
    </div>
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
