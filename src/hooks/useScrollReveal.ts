import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the given ref's element.
 * When the element enters the viewport, it receives the `data-revealed="true"` attribute.
 * Pair with CSS: `[data-revealed] { ... }` for the enter animation.
 *
 * Respects `prefers-reduced-motion: reduce` — skips observation and reveals immediately.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const ref = useRef<T>(null)
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('figma-capture')
    ) {
      el.setAttribute('data-revealed', 'true')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.setAttribute('data-revealed', 'true')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.removeAttribute('data-revealed')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
