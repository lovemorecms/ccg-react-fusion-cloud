import { SkipNav } from '@cmsgov/ds-cms-gov'
import { FusionAcademy } from '../components/FusionAcademy'
import { FusionEcosystem } from '../components/FusionEcosystem'
import { FusionFeaturedResources } from '../components/FusionFeaturedResources'
import { FusionHero } from '../components/FusionHero'
import { FusionMultiCloudServices } from '../components/FusionMultiCloudServices'
import { FusionPathwaysHelp } from '../components/FusionPathwaysHelp'
import { FusionQuickAccess } from '../components/FusionQuickAccess'
import { SiteHeader } from '../components/SiteHeader'

export default function HomePage() {
  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <FusionHero />
        <FusionQuickAccess />
        <FusionPathwaysHelp />
        <FusionMultiCloudServices />
        <FusionFeaturedResources />
        <FusionAcademy />
        <FusionEcosystem />
      </main>
    </>
  )
}
