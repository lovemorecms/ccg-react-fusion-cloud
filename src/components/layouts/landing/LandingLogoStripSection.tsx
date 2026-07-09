import { LandingSectionHeader } from './LandingSectionHeader'

export type LandingLogoStripSectionProps = {
  id: string
  title: string
  lede: string
  logos: string[]
}

export function LandingLogoStripSection({ id, title, lede, logos }: LandingLogoStripSectionProps) {
  return (
    <section id={id} className="lpl-section lpl-section--partners fusion-section-reveal fusion-section-reveal--stagger" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />
        <ul className="lpl-logos">
          {logos.map((logo) => (
            <li key={logo} className="lpl-logos__item">
              <span className="lpl-logos__mark">{logo}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
