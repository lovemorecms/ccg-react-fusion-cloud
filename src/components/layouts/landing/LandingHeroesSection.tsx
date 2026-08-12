import { useId, useState, type ReactNode } from 'react'
import { FusionButton } from '../../FusionButton'
import { ChevronRight } from '../../icons/Chevron'
import { LandingSectionHeader } from './LandingSectionHeader'

export type LandingHeroCta = {
  label: string
  href: string
}

export type LandingHeroConcept = {
  id: string
  label: string
  description: string
  variant: 'contained' | 'fullwidth'
  title: string
  titleAccent?: string
  subtitle: string
  imageSrc: string
  imageAlt?: string
  primaryCta?: LandingHeroCta
  secondaryCta?: LandingHeroCta
}

export type LandingHeroesSectionProps = {
  id: string
  title: string
  lede: string
  concepts: LandingHeroConcept[]
}

function heroImageUrl(imageSrc: string) {
  return `${import.meta.env.BASE_URL}${imageSrc.replace(/^\//, '')}`
}

function ArrowRight() {
  return <ChevronRight />
}

function HeroCopy({
  headingId,
  title,
  titleAccent,
  subtitle,
  actions,
}: {
  headingId: string
  title: string
  titleAccent?: string
  subtitle: string
  actions?: ReactNode
}) {
  return (
    <div className="lpl-hero-copy">
      <h3 id={headingId} className="lpl-hero-copy__title">
        {titleAccent ? (
          <>
            <span className="lpl-hero-copy__title-accent">{titleAccent}</span> {title}
          </>
        ) : (
          title
        )}
      </h3>
      <p className="lpl-hero-copy__subtitle">{subtitle}</p>
      {actions ? <div className="lpl-hero-copy__actions">{actions}</div> : null}
    </div>
  )
}

function ContainedHeroConcept({ concept, headingId }: { concept: LandingHeroConcept; headingId: string }) {
  return (
    <div className="lpl-hero-showcase">
      <div className="lpl-hero-showcase__band" aria-labelledby={headingId}>
        <img
          src={heroImageUrl(concept.imageSrc)}
          alt={concept.imageAlt ?? ''}
          className="lpl-hero-showcase__bg"
          decoding="async"
        />
        <div className="lpl-hero-showcase__scrim" aria-hidden />
        <div className="lpl-hero-showcase__inner">
          <HeroCopy
            headingId={headingId}
            title={concept.title}
            titleAccent={concept.titleAccent}
            subtitle={concept.subtitle}
          />
        </div>
      </div>
    </div>
  )
}

function FullWidthHeroConcept({ concept, headingId }: { concept: LandingHeroConcept; headingId: string }) {
  const actions =
    concept.primaryCta || concept.secondaryCta ? (
      <>
        {concept.primaryCta ? (
          <FusionButton href={concept.primaryCta.href} accent onDark>
            {concept.primaryCta.label}
            <ArrowRight />
          </FusionButton>
        ) : null}
        {concept.secondaryCta ? (
          <FusionButton href={concept.secondaryCta.href} variation="ghost" onDark>
            {concept.secondaryCta.label}
          </FusionButton>
        ) : null}
      </>
    ) : undefined

  return (
    <div className="lpl-hero-fullwidth">
      <div className="lpl-hero-fullwidth__band" aria-labelledby={headingId}>
        <img
          src={heroImageUrl(concept.imageSrc)}
          alt={concept.imageAlt ?? ''}
          className="lpl-hero-fullwidth__bg"
          decoding="async"
        />
        <div className="lpl-hero-fullwidth__overlay" aria-hidden />
        <div className="lpl-hero-fullwidth__inner">
          <HeroCopy
            headingId={headingId}
            title={concept.title}
            titleAccent={concept.titleAccent}
            subtitle={concept.subtitle}
            actions={actions}
          />
        </div>
      </div>
    </div>
  )
}

export function LandingHeroesSection({ id, title, lede, concepts }: LandingHeroesSectionProps) {
  const baseId = useId()
  const [conceptId, setConceptId] = useState(concepts[0]?.id ?? '')
  const activeConcept = concepts.find((concept) => concept.id === conceptId) ?? concepts[0]
  const headingId = `${id}-${activeConcept?.id ?? 'hero'}-heading`

  if (!activeConcept) return null

  return (
    <section
      id={id}
      className="lpl-section lpl-section--heroes fusion-section-reveal"
      aria-labelledby={`${id}-heading`}
      tabIndex={-1}
    >
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />

        <div className="lpl-ms-tabs lpl-ms-tabs--heroes">
          <div className="lpl-ms-tabs__bar" role="tablist" aria-label="Hero concept variants">
            {concepts.map((concept) => {
              const isSelected = concept.id === activeConcept.id
              return (
                <button
                  key={concept.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-${concept.id}-tab`}
                  aria-selected={isSelected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`lpl-ms-tabs__tab${isSelected ? ' lpl-ms-tabs__tab--active' : ''}`}
                  onClick={() => setConceptId(concept.id)}
                >
                  {concept.label}
                </button>
              )
            })}
          </div>

          <p className="lpl-hero-concept__description">{activeConcept.description}</p>
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${activeConcept.id}-tab`}
        className="lpl-ms-tabs__panel lpl-ms-tabs__panel--heroes"
      >
        {activeConcept.variant === 'fullwidth' ? (
          <FullWidthHeroConcept concept={activeConcept} headingId={headingId} />
        ) : (
          <div className="lpl-container">
            <ContainedHeroConcept concept={activeConcept} headingId={headingId} />
          </div>
        )}
      </div>
    </section>
  )
}
