import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { AzurePlatformGuide } from '../components/azure/AzurePlatformGuide'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export default function AzurePlatformPage() {
  useEffect(() => {
    document.title = 'Azure Commercial | Explore | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="explore-2 gcp-page">
        <AzurePlatformGuide />
      </main>
      <SiteFooter />
    </>
  )
}
