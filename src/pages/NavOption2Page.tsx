import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { NavOption2Header } from '../components/nav-demo/NavOption2Header'
import { SiteFooter } from '../components/SiteFooter'

export default function NavOption2Page() {
  useEffect(() => {
    document.title = 'Nav Option 2 | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <NavOption2Header />
      <main id="main-content" tabIndex={-1} className="nav-option-2-page" />
      <SiteFooter />
    </>
  )
}
