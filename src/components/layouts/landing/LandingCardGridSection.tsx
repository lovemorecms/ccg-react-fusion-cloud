import { useId, useState } from 'react'
import { FusionButton } from '../../FusionButton'
import { LandingSectionHeader } from './LandingSectionHeader'

type Card = {
  id: string
  title: string
  body: string
  cta: string
}

type LayoutOption = {
  id: string
  label: string
}

export type LandingCardGridSectionProps = {
  id: string
  title: string
  lede: string
  cards: Card[]
  layouts: readonly LayoutOption[]
}

function CardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function cardsForLayout(layoutId: string, cards: Card[]): Card[] {
  if (layoutId === 'two') return cards.slice(0, 2)
  if (layoutId === 'four') return cards.slice(0, 4)
  return cards.slice(0, 3)
}

export function LandingCardGridSection({
  id,
  title,
  lede,
  cards,
  layouts,
}: LandingCardGridSectionProps) {
  const baseId = useId()
  const [layoutId, setLayoutId] = useState(layouts[0]?.id ?? 'three')
  const activeLayout = layouts.find((layout) => layout.id === layoutId) ?? layouts[0]
  const visibleCards = cardsForLayout(activeLayout?.id ?? 'three', cards)
  const isTextOnly = activeLayout?.id === 'text'

  return (
    <section
      id={id}
      className="lpl-section lpl-section--cards fusion-section-reveal fusion-section-reveal--stagger"
      aria-labelledby={`${id}-heading`}
      tabIndex={-1}
    >
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />

        <div className="lpl-ms-tabs lpl-ms-tabs--cards">
          <div className="lpl-ms-tabs__bar" role="tablist" aria-label="Card layout variants">
            {layouts.map((layout) => {
              const isSelected = layout.id === activeLayout?.id
              return (
                <button
                  key={layout.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-${layout.id}-tab`}
                  aria-selected={isSelected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`lpl-ms-tabs__tab${isSelected ? ' lpl-ms-tabs__tab--active' : ''}`}
                  onClick={() => setLayoutId(layout.id)}
                >
                  {layout.label}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-${activeLayout?.id}-tab`}
            className="lpl-ms-tabs__panel"
          >
            <div
              className={`lpl-card-grid lpl-card-grid--${activeLayout?.id ?? 'three'}${
                isTextOnly ? ' lpl-card-grid--text' : ''
              }`}
            >
              {visibleCards.map((card) => (
                <article
                  key={`${activeLayout?.id}-${card.id}`}
                  className={`lpl-card${isTextOnly ? ' lpl-card--text' : ''}`}
                  aria-labelledby={`${activeLayout?.id}-${card.id}-title`}
                >
                  {!isTextOnly ? (
                    <div className="lpl-card__icon-wrap">
                      <CardIcon />
                    </div>
                  ) : null}
                  <h3 id={`${activeLayout?.id}-${card.id}-title`} className="lpl-card__title">
                    {card.title}
                  </h3>
                  <p className="lpl-card__body">{card.body}</p>
                  {!isTextOnly ? (
                    <FusionButton href="#" variation="ghost" className="lpl-card__cta">
                      {card.cta}
                    </FusionButton>
                  ) : (
                    <FusionButton href="#" variation="ghost" className="lpl-card__cta lpl-card__cta--text">
                      {card.cta}
                    </FusionButton>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
