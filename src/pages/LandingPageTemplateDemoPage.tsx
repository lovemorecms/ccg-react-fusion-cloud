import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { useSectionReveal } from '../hooks/useSectionReveal'
import { LandingAccordionSection } from '../components/layouts/landing/LandingAccordionSection'
import { LandingCardGridSection } from '../components/layouts/landing/LandingCardGridSection'
import { LandingCtaBandSection } from '../components/layouts/landing/LandingCtaBandSection'
import { LandingLogoStripSection } from '../components/layouts/landing/LandingLogoStripSection'
import { LandingSplitSection } from '../components/layouts/landing/LandingSplitSection'
import { LandingStatsSection } from '../components/layouts/landing/LandingStatsSection'
import { LandingTabsSection } from '../components/layouts/landing/LandingTabsSection'
import { LandingTemplateSectionNav } from '../components/layouts/landing/LandingTemplateSectionNav'
import { LandingTimelineSection } from '../components/layouts/landing/LandingTimelineSection'
import { HideableInteriorBreadcrumbs } from '../components/layouts/HideableInteriorBreadcrumbs'
import { InteriorSectionNavProvider } from '../components/layouts/InteriorSectionNav'
import {
  landingCtaBand,
  landingFaq,
  landingFeatureCards,
  landingMetrics,
  landingPartners,
  landingSpotlightSections,
  landingTabs,
  landingTemplateHero,
  landingTimeline,
} from '../data/landingPageTemplateContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LandingPageTemplateDemoPage() {
  const revealRef = useSectionReveal()

  useEffect(() => {
    document.title = 'Landing page Layout | Page layouts | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="lpl-page" ref={revealRef}>
        <InteriorSectionNavProvider>
          <HideableInteriorBreadcrumbs className="kc-breadcrumb-bar ft-breadcrumb-bar">
            <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
              <ol className="kc-breadcrumb-list">
                <li>
                  <Link to="/" className="kc-breadcrumb-link">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="kc-breadcrumb-sep">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <Link to="/resources/page-layouts" className="kc-breadcrumb-link">
                    Page layouts
                  </Link>
                </li>
                <li aria-hidden="true" className="kc-breadcrumb-sep">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <span className="kc-breadcrumb-current">Landing page Layout</span>
                </li>
              </ol>
            </nav>
          </HideableInteriorBreadcrumbs>

          <section
            id="overview"
            className="ft-hero ft-hero--with-section-nav"
            aria-labelledby="lpl-hero-heading"
            tabIndex={-1}
          >
            <div className="ft-hero__glow ft-hero__glow--one" aria-hidden />
            <div className="ft-hero__glow ft-hero__glow--two" aria-hidden />
            <div className="ft-hero__streak" aria-hidden />

            <div className="ft-container ft-hero__inner">
              <h1 id="lpl-hero-heading" className="ft-hero__title">
                {landingTemplateHero.title}{' '}
                <span className="ft-hero__title-accent">{landingTemplateHero.titleAccent}</span>
              </h1>
              <p className="ft-hero__lede">{landingTemplateHero.lede}</p>
              <div className="ft-hero__actions">
                <FusionButton href={landingTemplateHero.primaryCta.href} variation="solid">
                  {landingTemplateHero.primaryCta.label}
                  <ArrowRight />
                </FusionButton>
                <FusionButton to={landingTemplateHero.secondaryCta.href} variation="ghost" className="ft-btn-secondary">
                  {landingTemplateHero.secondaryCta.label}
                </FusionButton>
              </div>
            </div>
          </section>

          <LandingTemplateSectionNav />
        </InteriorSectionNavProvider>

        <LandingCardGridSection
          id="cards"
          title={landingFeatureCards.title}
          lede={landingFeatureCards.lede}
          layouts={landingFeatureCards.layouts}
          cards={[...landingFeatureCards.cards]}
        />

        <LandingSplitSection
          id="spotlight"
          title={landingSpotlightSections.title}
          lede={landingSpotlightSections.lede}
          primary={landingSpotlightSections.primary}
          reverse={landingSpotlightSections.reverse}
        />

        <LandingStatsSection
          id="metrics"
          title={landingMetrics.title}
          lede={landingMetrics.lede}
          stats={[...landingMetrics.stats]}
        />

        <LandingTabsSection
          id="compare"
          title={landingTabs.title}
          lede={landingTabs.lede}
          tabs={[...landingTabs.tabs]}
        />

        <LandingAccordionSection
          id="faq"
          title={landingFaq.title}
          lede={landingFaq.lede}
          intro={landingFaq.intro}
          bullets={[...landingFaq.bullets]}
          items={[...landingFaq.items]}
        />

        <LandingTimelineSection
          id="timeline"
          title={landingTimeline.title}
          lede={landingTimeline.lede}
          quarters={[...landingTimeline.quarters]}
        />

        <LandingLogoStripSection
          id="partners"
          title={landingPartners.title}
          lede={landingPartners.lede}
          logos={[...landingPartners.logos]}
        />

        <LandingCtaBandSection
          id="get-started"
          title={landingCtaBand.title}
          body={landingCtaBand.body}
          primaryCta={landingCtaBand.primaryCta}
          primaryHref={landingCtaBand.primaryHref}
          secondaryCta={landingCtaBand.secondaryCta}
          secondaryHref={landingCtaBand.secondaryHref}
        />
      </main>

      <SiteFooter />
    </>
  )
}
