import { useCallback, useEffect, useRef, useState } from 'react'
import { FusionButton } from './FusionButton'

type SiteSearchPanelProps = {
  open: boolean
  onClose: () => void
}

type Phase = 'closed' | 'entering' | 'open' | 'exiting'

const EXIT_MS = 280
const ENTER_MS = 380

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function SiteSearchPanel({ open, onClose }: SiteSearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [phase, setPhase] = useState<Phase>(open ? 'open' : 'closed')

  useEffect(() => {
    if (open) {
      setPhase((current) => (current === 'closed' || current === 'exiting' ? 'entering' : current))
      return
    }

    setPhase((current) =>
      current === 'open' || current === 'entering' ? 'exiting' : current,
    )
  }, [open])

  useEffect(() => {
    if (phase === 'entering') {
      if (prefersReducedMotion()) {
        setPhase('open')
        return
      }
      const id = window.setTimeout(() => {
        setPhase((current) => (current === 'entering' ? 'open' : current))
      }, ENTER_MS)
      return () => window.clearTimeout(id)
    }

    if (phase === 'exiting') {
      if (prefersReducedMotion()) {
        setPhase('closed')
        return
      }
      const id = window.setTimeout(() => {
        setPhase((current) => (current === 'exiting' ? 'closed' : current))
      }, EXIT_MS)
      return () => window.clearTimeout(id)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'entering' || phase === 'open') {
      inputRef.current?.focus()
    }
  }, [phase])

  useEffect(() => {
    if (!open && phase === 'closed') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, phase, onClose])

  const onAnimEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    setPhase((current) => {
      if (current === 'entering') return 'open'
      if (current === 'exiting') return 'closed'
      return current
    })
  }, [])

  if (phase === 'closed') return null

  const animClass =
    phase === 'entering' ? 'fusion-search-enter' : phase === 'exiting' ? 'fusion-search-exit' : ''

  return (
    <div
      id="site-search-region"
      className={`fusion-site-search px-4 py-4 sm:px-8 md:px-12 ${animClass}`}
      onAnimationEnd={onAnimEnd}
    >
      <form
        role="search"
        className="mx-auto flex max-w-[var(--fusion-site-max-width)] flex-col gap-3 sm:flex-row sm:items-center"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label htmlFor="site-search-input" className="sr-only">
          Search site
        </label>
        <input
          ref={inputRef}
          id="site-search-input"
          type="search"
          name="q"
          placeholder="Search cloud topics, guidance, and services…"
          className="fusion-site-search__input min-h-11 w-full flex-1 rounded-lg border-2 px-4 py-2 font-sans text-base outline-none transition-shadow"
          autoComplete="off"
          tabIndex={phase === 'exiting' ? -1 : 0}
        />
        <div className="fusion-site-search__actions">
          <FusionButton type="submit" accent tabIndex={phase === 'exiting' ? -1 : 0}>
            Search
          </FusionButton>
          <FusionButton
            type="button"
            variation="ghost"
            aria-label="Close search"
            onClick={onClose}
            tabIndex={phase === 'exiting' ? -1 : 0}
          >
            Close
          </FusionButton>
        </div>
      </form>
    </div>
  )
}
