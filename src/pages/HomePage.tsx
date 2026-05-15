import { SkipNav } from '@cmsgov/ds-cms-gov'
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
      </main>
    </>
  )
}
