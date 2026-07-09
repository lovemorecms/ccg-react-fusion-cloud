import { useEffect, useRef } from 'react'

const REVEAL_SELECTOR = '.fusion-section-reveal'

/**
 * Observes `.fusion-section-reveal` sections inside a page root and sets
 * `data-revealed="true"` when they enter the viewport (once by default).
 * Respects prefers-reduced-motion and Figma capture mode.
 */
export function useSectionReveal(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {},
) {
  const rootRef = useRef<HTMLElement | null>(null)
  const { threshold = 0.12, rootMargin = '0px 0px -8% 0px', once = true } = options

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
    if (sections.length === 0) return

    const reduceMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('figma-capture')

    if (reduceMotion) {
      sections.forEach((el) => el.setAttribute('data-revealed', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.setAttribute('data-revealed', 'true')
          if (once) observer.unobserve(el)
        })
      },
      { threshold, rootMargin },
    )

    sections.forEach((el) => {
      if (el.getAttribute('data-revealed') === 'true') return
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return rootRef
}

/** Brief settle pulse after sticky-nav jump-scroll lands on a section. */
export function triggerSectionSettle(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (!el) return

  const motionTarget =
    el.closest<HTMLElement>('.fusion-section-reveal') ??
    (el.classList.contains('fusion-section-reveal') ? el : el)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    motionTarget.setAttribute('data-revealed', 'true')
    return
  }

  motionTarget.setAttribute('data-revealed', 'true')
  motionTarget.classList.remove('fusion-section-settle')
  // Force reflow so the animation can restart
  void motionTarget.offsetWidth
  motionTarget.classList.add('fusion-section-settle')

  window.setTimeout(() => {
    motionTarget.classList.remove('fusion-section-settle')
  }, 700)
}
