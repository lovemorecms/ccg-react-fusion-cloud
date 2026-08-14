import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { ChevronRight } from '../components/icons/Chevron'
import {
  fusionToolkitGridIntro,
  fusionToolkitHero,
  fusionToolkitProducts,
} from '../data/fusionToolkitContent'
import { FusionToolkitStickyNav } from '../components/fusion-toolkit/FusionToolkitStickyNav'
import { InteriorSectionNavProvider } from '../components/layouts/InteriorSectionNav'
import { useSectionReveal } from '../hooks/useSectionReveal'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

function ArrowRight() {
  return <ChevronRight />
}

function FeatureBullet() {
  return (
    <span className="ft-feature-bullet" aria-hidden>
      <span className="ft-feature-bullet__dot" />
    </span>
  )
}

function FusionToolkitBreadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="ft-breadcrumb">
      <ol className="kc-breadcrumb-list">
        <li>
          <Link to="/" className="kc-breadcrumb-link">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="kc-breadcrumb-sep">
          /
        </li>
        <li>
          <Link to="/explore" className="kc-breadcrumb-link">
            Explore
          </Link>
        </li>
        <li aria-hidden="true" className="kc-breadcrumb-sep">
          /
        </li>
        <li>
          <span className="kc-breadcrumb-current">Fusion Toolkit</span>
        </li>
      </ol>
    </nav>
  )
}

function ProductVisualization({ name, image }: { name: string; image: string }) {
  return (
    <div className="ft-product-viz">
      <div className="ft-product-viz__frame">
        <img src={image} alt="" className="ft-product-viz__img" decoding="async" />
        <p className="ft-product-viz__label">{name}</p>
      </div>
    </div>
  )
}

export default function FusionToolkitLandingPage() {
  const revealRef = useSectionReveal()

  useEffect(() => {
    document.title = 'Fusion Toolkit | Explore | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="explore-2 ft-page" ref={revealRef}>
        <InteriorSectionNavProvider>
          <div className="ft-page__shell">
            <FusionToolkitBreadcrumbs />

            <section
              id="overview"
              className="explore-hero ft-hero rounded-2xl relative overflow-hidden"
              aria-labelledby="ft-hero-heading"
              tabIndex={-1}
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
              <div className="explore-hero__content ft-hero__inner relative z-10">
                <h1 id="ft-hero-heading" className="fusion-hero__headline explore-hero__headline">
                  <span className="block font-semibold leading-[1.12] tracking-wide">
                    Fusion <span className="fusion-hero__headline-accent">Toolkit</span>
                  </span>
                </h1>
                <p className="fusion-hero__body explore-hero__body ft-hero__lede">{fusionToolkitHero.lede}</p>
                <div className="ft-hero__actions">
                  <FusionButton href={fusionToolkitHero.primaryCta.href} accent onDark>
                    {fusionToolkitHero.primaryCta.label}
                    <ArrowRight />
                  </FusionButton>
                  <FusionButton href={fusionToolkitHero.secondaryCta.href} variation="ghost" onDark>
                    {fusionToolkitHero.secondaryCta.label}
                  </FusionButton>
                </div>
              </div>
            </section>
          </div>

          <FusionToolkitStickyNav />
        </InteriorSectionNavProvider>

        <section
          id="toolkit-grid"
          className="ft-section ft-section--grid fusion-section-reveal fusion-section-reveal--stagger"
          aria-labelledby="ft-grid-heading"
          tabIndex={-1}
        >
          <div className="ft-container">
            <header className="ft-section__intro">
              <h2 id="ft-grid-heading" className="ft-section__title">
                {fusionToolkitGridIntro.title}
              </h2>
              <p className="ft-section__lede">{fusionToolkitGridIntro.description}</p>
            </header>

            <div className="ft-grid">
              {fusionToolkitProducts.map((product) => (
                <article key={product.id} className="ft-card" aria-labelledby={`ft-card-${product.id}`}>
                  <div className="ft-card__icon-wrap">
                    <img src={product.image} alt="" className="ft-card__icon-img" decoding="async" />
                  </div>
                  <h3 id={`ft-card-${product.id}`} className="ft-card__title">
                    {product.name}
                  </h3>
                  <p className="ft-card__tagline">{product.tagline}</p>
                  <p className="ft-card__body">{product.cardDescription}</p>
                  <a href={`#${product.id}`} className="ft-card__link">
                    Learn more
                    <ArrowRight />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {fusionToolkitProducts.map((product) => (
          <section
            key={product.id}
            id={product.id}
            className={`ft-section ft-section--product ft-section--${product.sectionVariant ?? 'light'}${product.imageReverse ? ' ft-section--reverse' : ''} fusion-section-reveal`}
            aria-labelledby={`ft-product-${product.id}`}
            tabIndex={-1}
          >
            <div className="ft-container ft-product">
              <div className="ft-product__copy">
                <div className="ft-card__icon-wrap ft-card__icon-wrap--lg">
                  <img src={product.image} alt="" className="ft-card__icon-img" decoding="async" />
                </div>
                <h2 id={`ft-product-${product.id}`} className="ft-product__title">
                  {product.name}
                </h2>
                <p className="ft-product__tagline">{product.tagline}</p>
                <p className="ft-product__body">{product.detailDescription}</p>
                <ul className="ft-features">
                  {product.features.map((feature) => (
                    <li key={feature} className="ft-features__item">
                      <FeatureBullet />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="ft-product__actions">
                  <FusionButton href="/learn/knowledge-center" accent onDark>
                    Get Started with {product.name}
                  </FusionButton>
                  <FusionButton href="/learn/knowledge-center" variation="ghost" onDark className="ft-btn-secondary">
                    Fusion Info Center
                  </FusionButton>
                </div>
              </div>
              <ProductVisualization name={product.name} image={product.image} />
            </div>
          </section>
        ))}

        <section className="ft-section ft-section--footer-band fusion-section-reveal" aria-label="Fusion Toolkit">
          <div className="ft-container ft-footer-band">
            <p className="ft-footer-band__text">
              Ready to explore the full Fusion Toolkit ecosystem on CMS Hybrid Cloud?
            </p>
            <div className="ft-footer-band__actions">
              <FusionButton href="/explore" variation="solid" onDark>
                Back to Explore
              </FusionButton>
              <FusionButton href="/" variation="ghost" onDark>
                Return Home
              </FusionButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
