import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { FusionToolkitProductIcon } from '../components/fusion-toolkit/FusionToolkitIcons'
import {
  fusionToolkitGridIntro,
  fusionToolkitHero,
  fusionToolkitProducts,
} from '../data/fusionToolkitContent'
import { FusionToolkitStickyNav } from '../components/fusion-toolkit/FusionToolkitStickyNav'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureBullet() {
  return (
    <span className="ft-feature-bullet" aria-hidden>
      <span className="ft-feature-bullet__dot" />
    </span>
  )
}

function ProductVisualization({ productId }: { productId: 'basecamp' | 'helix' | 'lens' | 'match' }) {
  return (
    <div className="ft-product-viz">
      <div className="ft-product-viz__frame">
        <FusionToolkitProductIcon id={productId} className="ft-product-viz__icon" />
        <p className="ft-product-viz__label">Product visualization</p>
      </div>
    </div>
  )
}

export default function FusionToolkitLandingPage() {
  useEffect(() => {
    document.title = 'Fusion Toolkit | Explore | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <FusionToolkitStickyNav />

      <main id="main-content" tabIndex={-1} className="ft-page">
        <section id="overview" className="ft-hero" aria-labelledby="ft-hero-heading" tabIndex={-1}>
          <div className="ft-hero__glow ft-hero__glow--one" aria-hidden />
          <div className="ft-hero__glow ft-hero__glow--two" aria-hidden />
          <div className="ft-hero__streak" aria-hidden />

          <div className="ft-container ft-hero__inner">
            <h1 id="ft-hero-heading" className="ft-hero__title">
              Fusion <span className="ft-hero__title-accent">Toolkit</span>
            </h1>
            <p className="ft-hero__lede">{fusionToolkitHero.lede}</p>
            <div className="ft-hero__actions">
              <FusionButton href={fusionToolkitHero.primaryCta.href} variation="solid">
                {fusionToolkitHero.primaryCta.label}
                <ArrowRight />
              </FusionButton>
              <FusionButton href={fusionToolkitHero.secondaryCta.href} variation="ghost" className="ft-btn-secondary">
                {fusionToolkitHero.secondaryCta.label}
              </FusionButton>
            </div>
          </div>
        </section>

        <section id="toolkit-grid" className="ft-section ft-section--grid" aria-labelledby="ft-grid-heading" tabIndex={-1}>
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
                    <FusionToolkitProductIcon id={product.id as 'basecamp' | 'helix' | 'lens' | 'match'} />
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
            className={`ft-section ft-section--product ft-section--${product.sectionVariant ?? 'light'}${product.imageReverse ? ' ft-section--reverse' : ''}`}
            aria-labelledby={`ft-product-${product.id}`}
            tabIndex={-1}
          >
            <div className="ft-container ft-product">
              <div className="ft-product__copy">
                <div className="ft-card__icon-wrap ft-card__icon-wrap--lg">
                  <FusionToolkitProductIcon id={product.id as 'basecamp' | 'helix' | 'lens' | 'match'} />
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
                  <FusionButton href="/learn/knowledge-center" variation="solid">
                    Get Started with {product.name}
                  </FusionButton>
                  <FusionButton href="/learn/knowledge-center" variation="ghost" className="ft-btn-secondary">
                    Documentation
                  </FusionButton>
                </div>
              </div>
              <ProductVisualization productId={product.id as 'basecamp' | 'helix' | 'lens' | 'match'} />
            </div>
          </section>
        ))}

        <section className="ft-section ft-section--footer-band" aria-label="Fusion Toolkit">
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
            <nav className="ft-footer-band__crumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden> / </span>
              <Link to="/explore">Explore</Link>
              <span aria-hidden> / </span>
              <span>Fusion Toolkit</span>
            </nav>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
