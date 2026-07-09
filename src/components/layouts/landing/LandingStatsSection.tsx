import { LandingSectionHeader } from './LandingSectionHeader'

type Stat = {
  value: string
  label: string
  detail: string
}

export type LandingStatsSectionProps = {
  id: string
  title: string
  lede: string
  stats: Stat[]
}

export function LandingStatsSection({ id, title, lede, stats }: LandingStatsSectionProps) {
  return (
    <section id={id} className="lpl-section lpl-section--metrics fusion-section-reveal fusion-section-reveal--stagger" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />
        <dl className="lpl-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="lpl-stats__item">
              <dt className="lpl-stats__label">{stat.label}</dt>
              <dd className="lpl-stats__value">{stat.value}</dd>
              <dd className="lpl-stats__detail">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
