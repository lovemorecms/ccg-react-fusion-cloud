import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { NavDemoHeader } from '../components/nav-demo/NavDemoHeader'
import { SiteFooter } from '../components/SiteFooter'

export default function NavDemoPage() {
  useEffect(() => {
    document.title = 'Nav Legacy Demo | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])
  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <NavDemoHeader />
      <main id="main-content" tabIndex={-1} className="nav-demo-page" />
      <SiteFooter />
    </>
  )
}
