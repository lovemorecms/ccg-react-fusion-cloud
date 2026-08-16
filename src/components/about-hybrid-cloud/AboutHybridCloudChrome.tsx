import { Link, useNavigate } from 'react-router-dom'
import {
  aboutHybridCloudHero,
  aboutHybridCloudNavItems,
  type AboutHybridCloudSectionId,
} from '../../data/aboutHybridCloudContent'
import { FusionButton } from '../FusionButton'
import { InteriorSectionNav } from '../layouts/InteriorSectionNav'

const aboutHeroArt = `${import.meta.env.BASE_URL}images/about/about-hero-2.jpg`

function BreadcrumbChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type AboutHybridCloudHeroProps = {
  currentLabel: string
  title?: string
  description?: string
  backgroundImage?: string
  showActions?: boolean
}

export function AboutHybridCloudHero({
  currentLabel,
  title = aboutHybridCloudHero.title,
  description = aboutHybridCloudHero.description,
  backgroundImage = aboutHeroArt,
  showActions = true,
}: AboutHybridCloudHeroProps) {
  return (
    <header className="explore-2 about-hybrid-cloud-hero-band">
      <div className="about-hybrid-cloud-hero-band__shell">
        <nav aria-label="Breadcrumb" className="about-hybrid-cloud-hero-band__crumb">
          <ol className="kc-breadcrumb-list">
            <li>
              <Link to="/" className="kc-breadcrumb-link">
                Home
              </Link>
            </li>
            {currentLabel === 'About' ? (
              <>
                <li aria-hidden="true" className="kc-breadcrumb-sep">
                  <BreadcrumbChevron />
                </li>
                <li>
                  <span className="kc-breadcrumb-current">About</span>
                </li>
              </>
            ) : (
              <>
                <li aria-hidden="true" className="kc-breadcrumb-sep">
                  <BreadcrumbChevron />
                </li>
                <li>
                  <Link to="/about" className="kc-breadcrumb-link">
                    About
                  </Link>
                </li>
                <li aria-hidden="true" className="kc-breadcrumb-sep">
                  <BreadcrumbChevron />
                </li>
                <li>
                  <span className="kc-breadcrumb-current">{currentLabel}</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <section
          className="explore-hero about-hybrid-cloud-hero rounded-2xl relative overflow-hidden"
          aria-labelledby="about-hybrid-cloud-heading"
          style={{
            background:
              'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)',
            border: '1px solid var(--color-border-bright)',
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--fusion-deep-sea-500) 45%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--fusion-yellow) 22%, transparent) 0%, transparent 50%)',
            }}
            aria-hidden
          />
          <div className="explore-hero__content about-hybrid-cloud-hero__copy relative z-10">
            <h1 id="about-hybrid-cloud-heading" className="fusion-hero__headline explore-hero__headline">
              <span className="block font-semibold leading-[1.12] tracking-wide">{title}</span>
            </h1>
            <p className="fusion-hero__body explore-hero__body">{description}</p>
            {showActions ? (
              <div className="init-hero__actions about-hybrid-cloud-hero__actions">
                <FusionButton href="/about/contact-us" accent onDark>
                  Get Started
                </FusionButton>
                <FusionButton href="/about/benefits" variation="ghost" onDark className="po-hero__cta-secondary">
                  Learn More
                </FusionButton>
              </div>
            ) : null}
          </div>
          {backgroundImage ? (
            <img
              src={backgroundImage}
              alt="CMS Hybrid Cloud mission diagram with identity, zero trust, and cloud security integrations"
              className="explore-hero__art about-hybrid-cloud-hero__art"
              decoding="async"
              fetchPriority="high"
            />
          ) : null}
        </section>
      </div>
    </header>
  )
}

export function AboutHybridCloudStickyNav({
  activeSectionId,
}: {
  activeSectionId: AboutHybridCloudSectionId
}) {
  const navigate = useNavigate()
  const items = aboutHybridCloudNavItems.map(({ id, label, href }) => ({ id, label, href }))

  return (
    <InteriorSectionNav
      items={items}
      sectionIds={[activeSectionId]}
      activeSectionId={activeSectionId}
      ariaLabel="About pages"
      onNavClick={(id) => {
        const target = aboutHybridCloudNavItems.find((item) => item.id === id)
        if (target) navigate(target.href)
      }}
    />
  )
}
