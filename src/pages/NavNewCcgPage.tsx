import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export default function NavNewCcgPage() {
  useEffect(() => {
    document.title = 'Nav New CCG | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="nav-new-ccg-page" />
      <SiteFooter />
    </>
  )
}
