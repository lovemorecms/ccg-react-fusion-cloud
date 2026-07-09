import type { LandingTimelineStatus } from '../../../data/landingPageTemplateContent'
import { LandingSectionHeader } from './LandingSectionHeader'

type Quarter = {
  quarter: string
  year: string
  monthRange: string
  status: LandingTimelineStatus
  title: string
  description: string
  tags: string[]
}

export type LandingTimelineSectionProps = {
  id: string
  title: string
  lede: string
  quarters: Quarter[]
}

export function LandingTimelineSection({ id, title, lede, quarters }: LandingTimelineSectionProps) {
  return (
    <section id={id} className="lpl-section lpl-section--timeline fusion-section-reveal" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />
        <div className="init-timeline lpl-timeline" role="region" aria-label={title}>
          <ol className="init-timeline__list">
            {quarters.map((q) => (
              <li
                key={`${q.quarter}-${q.year}`}
                className={`init-timeline__row init-timeline__row--${q.status}`}
                aria-current={q.status === 'current' ? 'step' : undefined}
              >
                <div className="init-timeline__track">
                  <span className={`init-timeline__marker init-timeline__marker--${q.status}`} aria-hidden />
                </div>
                <div className={`init-timeline__label-cell init-timeline__label-cell--${q.status}`}>
                  <span className="init-timeline__q">
                    {q.quarter} <span className="init-timeline__yr">{q.year}</span>
                  </span>
                  <span className="init-timeline__months">{q.monthRange}</span>
                  {q.status === 'current' ? <span className="init-timeline__now-badge">Now</span> : null}
                </div>
                <article className={`init-timeline__hq-card init-timeline__hq-card--${q.status}`}>
                  <h3 className="init-timeline__hq-title">{q.title}</h3>
                  <p className="init-timeline__hq-desc">{q.description}</p>
                  <ul className="init-timeline__tags" aria-label="Themes">
                    {q.tags.map((tag) => (
                      <li key={tag} className="init-timeline__tag init-timeline__tag--default">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
