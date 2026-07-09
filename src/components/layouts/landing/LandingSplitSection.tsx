import { FusionButton } from '../../FusionButton'

export type LandingSplitBlockProps = {
  title: string
  body: string
  bullets?: string[]
  cta?: string
  secondaryCta?: string
  mediaLabel: string
  reverse?: boolean
}

export function LandingSplitBlock({
  title,
  body,
  bullets = [],
  cta,
  secondaryCta,
  mediaLabel,
  reverse = false,
}: LandingSplitBlockProps) {
  return (
    <div className={`lpl-split${reverse ? ' lpl-split--reverse' : ''}`}>
      <div className="lpl-split__copy">
        <h3 className="lpl-split__title">{title}</h3>
        <p className="lpl-split__body">{body}</p>
        {bullets.length > 0 ? (
          <ul className="lpl-split__list">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {(cta || secondaryCta) && (
          <div className="lpl-split__actions">
            {cta ? (
              <FusionButton href="#" variation="solid">
                {cta}
              </FusionButton>
            ) : null}
            {secondaryCta ? (
              <FusionButton href="#" variation="ghost" className="ft-btn-secondary">
                {secondaryCta}
              </FusionButton>
            ) : null}
          </div>
        )}
      </div>
      <div className="lpl-split__media" aria-hidden>
        <div className="lpl-split__media-frame">
          <span className="lpl-split__media-label">{mediaLabel}</span>
        </div>
      </div>
    </div>
  )
}

export type LandingSplitSectionProps = {
  id: string
  title: string
  lede: string
  primary: LandingSplitBlockProps
  reverse?: LandingSplitBlockProps
}

export function LandingSplitSection({ id, title, lede, primary, reverse }: LandingSplitSectionProps) {
  return (
    <section id={id} className="lpl-section lpl-section--split fusion-section-reveal" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container">
        <header className="lpl-section__intro">
          <h2 id={`${id}-heading`} className="lpl-section__title">
            {title}
          </h2>
          <p className="lpl-section__lede">{lede}</p>
        </header>
        <div className="lpl-split-stack">
          <LandingSplitBlock {...primary} />
          {reverse ? <LandingSplitBlock {...reverse} reverse /> : null}
        </div>
      </div>
    </section>
  )
}
