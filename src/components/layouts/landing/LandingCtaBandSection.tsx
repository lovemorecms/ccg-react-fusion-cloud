import { FusionButton } from '../../FusionButton'

export type LandingCtaBandSectionProps = {
  id: string
  title: string
  body: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
}

export function LandingCtaBandSection({
  id,
  title,
  body,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
}: LandingCtaBandSectionProps) {
  const primaryIsExternal = primaryHref.startsWith('http')
  const secondaryIsExternal = secondaryHref.startsWith('http')

  return (
    <section id={id} className="lpl-section lpl-section--cta-band fusion-section-reveal" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container lpl-cta-band">
        <h2 id={`${id}-heading`} className="lpl-cta-band__title">
          {title}
        </h2>
        <p className="lpl-cta-band__body">{body}</p>
        <div className="lpl-cta-band__actions">
          <FusionButton to={primaryIsExternal ? undefined : primaryHref} href={primaryHref} variation="solid" onDark>
            {primaryCta}
          </FusionButton>
          <FusionButton to={secondaryIsExternal ? undefined : secondaryHref} href={secondaryHref} variation="ghost" onDark>
            {secondaryCta}
          </FusionButton>
        </div>
      </div>
    </section>
  )
}
