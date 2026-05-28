import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route changes, or to the target element when navigating to a hash. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ block: 'start' })
          if (target instanceof HTMLElement && !target.hasAttribute('tabindex')) {
            target.tabIndex = -1
          }
          if (target instanceof HTMLElement) target.focus({ preventScroll: true })
        }
      })
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
