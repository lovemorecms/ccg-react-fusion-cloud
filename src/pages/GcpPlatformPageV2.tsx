import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { GcpPlatformGuideV2 } from '../components/gcp-v2/GcpPlatformGuideV2'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export default function GcpPlatformPageV2() {
  useEffect(() => {
    document.title = 'Google Cloud Platform v2 | Explore | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="explore-2 gcp-page gcp-page-v2">
        <GcpPlatformGuideV2 />
      </main>
      <SiteFooter />
    </>
  )
}
