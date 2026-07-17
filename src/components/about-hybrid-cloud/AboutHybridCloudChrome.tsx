import { Link, useNavigate } from 'react-router-dom'
import {
  aboutHybridCloudHero,
  aboutHybridCloudNavItems,
  type AboutHybridCloudSectionId,
} from '../../data/aboutHybridCloudContent'
import { FusionButton } from '../FusionButton'
import { InteriorSectionNav } from '../layouts/InteriorSectionNav'

const aboutHeroBackground = `${import.meta.env.BASE_URL}images/sections/benefits/customer-support-hero.png`

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
  backgroundImage = aboutHeroBackground,
  showActions = true,
}: AboutHybridCloudHeroProps) {
  return (
    <header
      className={`tpl-2col-hero-band${backgroundImage ? ' about-hybrid-cloud-hero-band--image' : ''}`}
    >
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          className="about-hybrid-cloud-hero__background"
          decoding="async"
          fetchPriority="high"
        />
      ) : null}
      <div className="tpl-2col-breadcrumb-bar">
        <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
          <ol className="kc-breadcrumb-list">
            <li>
              <Link to="/" className="kc-breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="kc-breadcrumb-sep">
              <BreadcrumbChevron />
            </li>
            <li>
              <Link to="/about/program-overview" className="kc-breadcrumb-link">
                About Hybrid Cloud
              </Link>
            </li>
            <li aria-hidden="true" className="kc-breadcrumb-sep">
              <BreadcrumbChevron />
            </li>
            <li>
              <span className="kc-breadcrumb-current">{currentLabel}</span>
            </li>
          </ol>
        </nav>
      </div>

      <section
        className={`po-hero about-hybrid-cloud-hero${backgroundImage ? ' about-hybrid-cloud-hero--image' : ''}`}
        aria-labelledby="about-hybrid-cloud-heading"
      >
        <div className="po-hero__glow" aria-hidden />
        <div className="init-hero__inner po-hero__inner">
          <div className="init-hero__text po-hero__text">
            <h1 id="about-hybrid-cloud-heading" className="init-hero__heading po-hero__heading">
              {title}
            </h1>
            <p className="init-hero__description po-hero__description">
              {description}
            </p>
            {showActions ? (
              <div className="init-hero__actions">
                <FusionButton href="/about/contact-us" accent onDark>
                  Get Started
                  <ArrowIcon />
                </FusionButton>
                <FusionButton href="/about/program-overview" variation="ghost" onDark>
                  Learn More
                </FusionButton>
              </div>
            ) : null}
          </div>
        </div>
      </section>
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
      ariaLabel="About Hybrid Cloud pages"
      onNavClick={(id) => {
        const target = aboutHybridCloudNavItems.find((item) => item.id === id)
        if (target) navigate(target.href)
      }}
    />
  )
}
