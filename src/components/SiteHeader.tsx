import { UsaBanner } from '@cmsgov/ds-cms-gov'
import { useCallback, useEffect, useState } from 'react'
import { navNewCcgMenuItems } from '../data/navNewCcgMenu'
import { FusionSiteNavV2 } from './nav-demo/FusionSiteNavV2'
import { SiteSearchPanel } from './SiteSearchPanel'

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const onSearchToggle = useCallback(() => {
    setSearchOpen((open) => !open)
  }, [])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <UsaBanner className="fusion-usa-banner" />
      <div
        className={`fusion-site-header sticky top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled ? 'fusion-site-header--scrolled' : ''
        }`}
      >
        <FusionSiteNavV2
          searchOpen={searchOpen}
          onSearchToggle={onSearchToggle}
          onSearchClose={closeSearch}
          menuItems={navNewCcgMenuItems}
        />
        <SiteSearchPanel open={searchOpen} onClose={closeSearch} />
      </div>
    </>
  )
}
