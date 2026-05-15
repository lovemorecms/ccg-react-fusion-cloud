import { UsaBanner } from '@cmsgov/ds-cms-gov'
import { useCallback, useEffect, useState } from 'react'
import { FusionSiteNav } from './FusionSiteNav'
import { SiteSearchPanel } from './SiteSearchPanel'

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const onSearchToggle = useCallback(() => {
    setSearchOpen((open) => !open)
    setActiveMenu(null)
  }, [])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [])

  const onMenuToggle = useCallback((id: string) => {
    setActiveMenu((current) => (current === id ? null : id))
    setSearchOpen(false)
  }, [])

  const onMenuClose = useCallback(() => {
    setActiveMenu(null)
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
        className={`sticky top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled
            ? 'border-b border-neutral-200/80 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-md backdrop-saturate-150'
            : 'border-b border-neutral-200/50 bg-white/80 shadow-[0_10px_15px_rgba(0,0,0,0.06),0_4px_6px_rgba(0,0,0,0.05)]'
        }`}
      >
        <FusionSiteNav
          searchOpen={searchOpen}
          onSearchToggle={onSearchToggle}
          activeMenu={activeMenu}
          onMenuToggle={onMenuToggle}
          onMenuClose={onMenuClose}
        />
        <SiteSearchPanel open={searchOpen} onClose={closeSearch} />
      </div>
    </>
  )
}
