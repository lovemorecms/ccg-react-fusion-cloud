import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FusionAcademy } from '../components/FusionAcademy'
import { FusionButton } from '../components/FusionButton'
import { FusionEcosystem } from '../components/FusionEcosystem'
import { FusionFeaturedResources } from '../components/FusionFeaturedResources'
import { FusionHero } from '../components/FusionHero'
import { FusionMultiCloudServices } from '../components/FusionMultiCloudServices'
import { FusionPathwaysHelp } from '../components/FusionPathwaysHelp'
import { FusionQuickAccess } from '../components/FusionQuickAccess'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'

type AnnouncementItem = {
  id: string
  date: string
  dateIso?: string
  title: string
  description: string
  href: string
}

const defaultAnnouncements: AnnouncementItem[] = [
  {
    id: '1',
    date: 'April 15, 2026',
    dateIso: '2026-04-15',
    title: 'New Multi-Cloud Migration Tools Available',
    description: 'Enhanced automation capabilities for seamless cloud transitions',
    href: '#',
  },
  {
    id: '2',
    date: 'April 18, 2026',
    dateIso: '2026-04-18',
    title: 'Scheduled Maintenance: Match Platform',
    description: 'System updates on April 20, 2026 from 2:00 AM - 4:00 AM EST',
    href: '#',
  },
  {
    id: '3',
    date: 'April 22, 2026',
    dateIso: '2026-04-22',
    title: 'Introducing Catalyst: Accelerated Deployments',
    description: 'New platform tool for faster CI/CD pipeline integration',
    href: '#',
  },
  {
    id: '4',
    date: 'April 28, 2026',
    dateIso: '2026-04-28',
    title: 'Governance Office Hours — May Sessions',
    description: 'Drop-in Q&A for ATO artifacts and cloud control alignment',
    href: '#',
  },
  {
    id: '5',
    date: 'May 1, 2026',
    dateIso: '2026-05-01',
    title: 'Fusion Academy: New Learning Paths Live',
    description: 'Self-paced modules for cloud governance and DevOps fundamentals',
    href: '#',
  },
  {
    id: '6',
    date: 'May 8, 2026',
    dateIso: '2026-05-08',
    title: 'Security Baseline Updates',
    description: 'Review revised controls effective for new workload onboarding',
    href: '#',
  },
]

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LatestAnnouncementsSection({
  items = defaultAnnouncements,
  viewAllHref = '#',
}: {
  items?: AnnouncementItem[]
  viewAllHref?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useScrollReveal<HTMLElement>()
  const [scrollable, setScrollable] = useState(false)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const overflow = scrollWidth > clientWidth + 1
    setScrollable(overflow)
    setCanPrev(scrollLeft > 2)
    setCanNext(scrollLeft < scrollWidth - clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [items, updateScrollState])

  const scrollByDir = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-announcement-card]')
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || '16') || 16
    const step = (card?.offsetWidth ?? 280) + gap
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: dir * step,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const trackId = 'fusion-announcements-track'

  return (
    <section className="fusion-announcements" aria-labelledby="fusion-announcements-heading">
      <div className="fusion-announcements__inner">
        <header
          ref={headerRef}
          className="fusion-announcements__header fusion-home-section__header fusion-home-section__header--banner fusion-reveal"
        >
          <h2 id="fusion-announcements-heading" className="fusion-announcements__title">
            Latest Announcements
          </h2>
          <FusionButton href={viewAllHref} accent className="fusion-announcements__view-all">
            View All
          </FusionButton>
        </header>

        <div
          className={`fusion-announcements__viewport-wrap${scrollable ? ' fusion-announcements__viewport-wrap--scrollable' : ''}`}
        >
          <button
            type="button"
            className="fusion-announcements__arrow fusion-announcements__arrow--prev"
            aria-label="Previous announcements"
            aria-controls={trackId}
            disabled={!scrollable || !canPrev}
            onClick={() => scrollByDir(-1)}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            className="fusion-announcements__arrow fusion-announcements__arrow--next"
            aria-label="Next announcements"
            aria-controls={trackId}
            disabled={!scrollable || !canNext}
            onClick={() => scrollByDir(1)}
          >
            <Chevron dir="right" />
          </button>

          <div
            ref={trackRef}
            id={trackId}
            className="fusion-announcements__track"
            role="group"
            aria-label="Announcement items"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                scrollByDir(-1)
              }
              if (e.key === 'ArrowRight') {
                e.preventDefault()
                scrollByDir(1)
              }
            }}
          >
            {items.map((item) => (
              <article key={item.id} className="fusion-announcements__card" data-announcement-card>
                <a href={item.href} className="fusion-announcements__card-link">
                  <span className="fusion-announcements__meta">
                    <CalendarIcon className="fusion-announcements__cal" />
                    {item.dateIso ? (
                      <time dateTime={item.dateIso}>{item.date}</time>
                    ) : (
                      item.date
                    )}
                  </span>
                  <h3 className="fusion-announcements__card-title">{item.title}</h3>
                  <p className="fusion-announcements__card-desc">{item.description}</p>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <FusionHero />
        <FusionQuickAccess />
        <FusionPathwaysHelp />
        <FusionMultiCloudServices />
        <FusionFeaturedResources />
        <FusionAcademy />
        <FusionEcosystem />
        <LatestAnnouncementsSection />
      </main>
      <SiteFooter />
    </>
  )
}
