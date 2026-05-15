import { useCallback, useEffect, useRef, useState } from 'react'
import { FusionButton } from './FusionButton'

type SiteSearchPanelProps = {
  open: boolean
  onClose: () => void
}

type Phase = 'closed' | 'entering' | 'open' | 'exiting'

function derivePhase(open: boolean, prev: Phase): Phase {
  if (open && (prev === 'closed' || prev === 'exiting')) return 'entering'
  if (!open && (prev === 'open' || prev === 'entering')) return 'exiting'
  return prev
}

export function SiteSearchPanel({ open, onClose }: SiteSearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [phase, setPhase] = useState<Phase>(open ? 'open' : 'closed')

  const derived = derivePhase(open, phase)
  if (derived !== phase) {
    setPhase(derived)
  }

  useEffect(() => {
    if (phase === 'entering') {
      inputRef.current?.focus()
    }
  }, [phase])

  const onAnimEnd = useCallback(() => {
    setPhase((p) => {
      if (p === 'entering') return 'open'
      if (p === 'exiting') return 'closed'
      return p
    })
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (phase === 'closed') return null

  const animClass = phase === 'entering' ? 'fusion-search-enter' : phase === 'exiting' ? 'fusion-search-exit' : ''

  return (
    <div
      id="site-search-region"
      className={`border-t border-neutral-200/60 bg-white/95 px-4 py-4 shadow-inner sm:px-8 md:px-12 ${animClass}`}
      onAnimationEnd={onAnimEnd}
    >
      <form
        role="search"
        className="mx-auto flex max-w-[100rem] flex-col gap-3 sm:flex-row sm:items-center"
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
          className="fusion-site-search__input min-h-11 w-full flex-1 rounded-lg border-2 border-neutral-300 bg-white px-4 py-2 font-sans text-base text-neutral-900 outline-none ring-[color:var(--fusion-blue)] transition-shadow placeholder:text-neutral-500 focus-visible:border-[color:var(--fusion-blue)] focus-visible:ring-2"
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
