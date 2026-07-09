import { useId, useState } from 'react'
import { LandingSectionHeader } from './LandingSectionHeader'

type TabContent = {
  id: string
  label: string
  title: string
  body: string
  bullets: string[]
}

export type LandingTabsSectionProps = {
  id: string
  title: string
  lede: string
  tabs: TabContent[]
}

export function LandingTabsSection({ id, title, lede, tabs }: LandingTabsSectionProps) {
  const baseId = useId()
  const [selectedId, setSelectedId] = useState(tabs[0]?.id ?? '')
  const selected = tabs.find((tab) => tab.id === selectedId) ?? tabs[0]

  if (!selected) return null

  return (
    <section id={id} className="lpl-section lpl-section--tabs fusion-section-reveal" aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="lpl-container">
        <LandingSectionHeader title={title} lede={lede} headingId={`${id}-heading`} />

        <div className="lpl-ms-tabs">
          <div className="lpl-ms-tabs__bar" role="tablist" aria-label={title}>
            {tabs.map((tab) => {
              const isSelected = tab.id === selected.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-${tab.id}-tab`}
                  aria-selected={isSelected}
                  aria-controls={`${baseId}-${tab.id}-panel`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`lpl-ms-tabs__tab${isSelected ? ' lpl-ms-tabs__tab--active' : ''}`}
                  onClick={() => setSelectedId(tab.id)}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-${selected.id}-panel`}
            aria-labelledby={`${baseId}-${selected.id}-tab`}
            className="lpl-ms-tabs__panel"
          >
            <h3 className="lpl-ms-tabs__title">{selected.title}</h3>
            <p className="lpl-ms-tabs__body">{selected.body}</p>
            <ul className="lpl-ms-tabs__list">
              {selected.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
