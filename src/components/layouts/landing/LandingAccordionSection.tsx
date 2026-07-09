import { useId, useState } from 'react'
import { LandingSectionHeader } from './LandingSectionHeader'

type FaqItem = {
  id: string
  heading: string
  content: string
}

export type LandingAccordionSectionProps = {
  id: string
  title: string
  lede: string
  intro: string
  bullets: string[]
  items: FaqItem[]
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`lpl-acc__chevron${open ? ' lpl-acc__chevron--open' : ''}`}
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AccordionRow({
  item,
  defaultOpen,
}: {
  item: FaqItem
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = `${panelId}-button`

  return (
    <div className={`lpl-acc__item${open ? ' lpl-acc__item--open' : ''}`}>
      <h3 className="lpl-acc__heading">
        <button
          type="button"
          id={buttonId}
          className="lpl-acc__button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{item.heading}</span>
          <ChevronIcon open={open} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="lpl-acc__panel"
        hidden={!open}
      >
        <p className="lpl-acc__content">{item.content}</p>
      </div>
    </div>
  )
}

export function LandingAccordionSection({
  id,
  title,
  lede,
  intro,
  bullets,
  items,
}: LandingAccordionSectionProps) {
  return (
    <section id={id} className="lpl-section lpl-section--faq fusion-section-reveal" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />
        <div className="lpl-faq">
          <div className="lpl-faq__intro">
            <p className="lpl-faq__body">{intro}</p>
            <ul className="lpl-faq__list">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="lpl-faq__accordion" role="list">
            {items.map((item, index) => (
              <AccordionRow key={item.id} item={item} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
