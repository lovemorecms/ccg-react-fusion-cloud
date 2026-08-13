import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import {
  AboutHybridCloudHero,
  AboutHybridCloudStickyNav,
} from '../components/about-hybrid-cloud/AboutHybridCloudChrome'
import { InteriorSectionNavProvider } from '../components/layouts/InteriorSectionNav'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import type { AboutHybridCloudSectionId } from '../data/aboutHybridCloudContent'

const aboutHeroBackground = `${import.meta.env.BASE_URL}images/sections/benefits/customer-support-hero.png`

type AboutHybridCloudSectionPageProps = {
  sectionId: Exclude<AboutHybridCloudSectionId, 'about'>
  title: string
  description: string
}

export default function AboutHybridCloudSectionPage({
  sectionId,
  title,
  description,
}: AboutHybridCloudSectionPageProps) {
  useEffect(() => {
    document.title = `${title} | FUSION Sphere`
  }, [title])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <InteriorSectionNavProvider>
        <main
          id="main-content"
          tabIndex={-1}
          className="program-overview about-hybrid-cloud-page cst-page"
        >
          <AboutHybridCloudHero
            currentLabel={title}
            title={title}
            description={description}
            backgroundImage={aboutHeroBackground}
            showActions={false}
          />
          <AboutHybridCloudStickyNav activeSectionId={sectionId} />

          <div className="kc-content">
            <section className="kc-section about-hybrid-cloud-section" aria-labelledby={`${sectionId}-heading`}>
              <h2 id={`${sectionId}-heading`} className="kc-section-heading po-section-heading">
                {title}
              </h2>
              <p className="kc-section-subtitle po-section-lede">{description}</p>
            </section>
          </div>
        </main>
      </InteriorSectionNavProvider>

      <SiteFooter />
    </>
  )
}
