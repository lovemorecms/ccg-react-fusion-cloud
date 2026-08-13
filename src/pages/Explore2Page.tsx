import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { HybridCloudServicesGuide } from '../components/HybridCloudServicesGuide'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export default function Explore2Page() {
  useEffect(() => {
    document.title = 'Explore | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <main id="main-content" className="explore-2" tabIndex={-1}>
        <HybridCloudServicesGuide />
      </main>
      <SiteFooter />
    </>
  )
}
