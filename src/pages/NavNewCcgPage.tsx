import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export default function NavNewCcgPage() {
  useEffect(() => {
    document.title = 'Nav New CCG | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
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
