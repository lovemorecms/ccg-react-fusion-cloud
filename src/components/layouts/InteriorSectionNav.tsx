import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { triggerSectionSettle } from '../../hooks/useSectionReveal'

export type InteriorSectionNavItem = {
  id: string
  label: string
}

export type InteriorSectionNavProps = {
  items: InteriorSectionNavItem[]
  sectionIds: string[]
  ariaLabel: string
  cta?: ReactNode
}

type InteriorSectionNavContextValue = {
  isPinned: boolean
  setIsPinned: (pinned: boolean) => void
}

const InteriorSectionNavContext = createContext<InteriorSectionNavContextValue | null>(null)

export function InteriorSectionNavProvider({ children }: { children: ReactNode }) {
  const [isPinned, setIsPinned] = useState(false)
  const value = useMemo(() => ({ isPinned, setIsPinned }), [isPinned])
  return (
    <InteriorSectionNavContext.Provider value={value}>{children}</InteriorSectionNavContext.Provider>
  )
}

export function useInteriorSectionNavPin(): boolean {
  return useContext(InteriorSectionNavContext)?.isPinned ?? false
}

function useInteriorSectionNavContext(): InteriorSectionNavContextValue {
  const ctx = useContext(InteriorSectionNavContext)
  if (!ctx) {
    throw new Error('InteriorSectionNav must be used within InteriorSectionNavProvider')
  }
  return ctx
}

function getSiteHeaderBottom(): number {
  const siteHeader = document.querySelector<HTMLElement>('.fusion-site-nav')?.closest('.sticky')
  return siteHeader?.getBoundingClientRect().bottom ?? 80
}

function getScrollSpyOffset(): number {
  let offset = getSiteHeaderBottom()

  const pinnedShell = document.querySelector<HTMLElement>(
    '.interior-section-nav--pinned .interior-section-nav__shell',
  )
  if (pinnedShell) {
    offset = pinnedShell.getBoundingClientRect().bottom + 8
  }

  return offset
}

function pickActiveSection(sectionIds: string[]): string {
  const offset = getScrollSpyOffset()
  const scrollBottom = window.scrollY + window.innerHeight
  const docBottom = document.documentElement.scrollHeight

  if (scrollBottom >= docBottom - 64) {
    return sectionIds[sectionIds.length - 1] ?? sectionIds[0] ?? ''
  }

  let current = sectionIds[0] ?? ''

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= offset) {
      current = id
    }
  }

  return current
}

type IndicatorStyle = {
  left: number
  width: number
  opacity: number
}

export function InteriorSectionNav({ items, sectionIds, ariaLabel, cta }: InteriorSectionNavProps) {
  const { setIsPinned: setContextPinned } = useInteriorSectionNavContext()
  const [isPinned, setIsPinned] = useState(false)
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  const [spacerHeight, setSpacerHeight] = useState(0)
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0, opacity: 0 })

  const activeIdRef = useRef(activeId)
  const rafRef = useRef<number | null>(null)
  const pendingTargetRef = useRef<string | null>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const pageRootRef = useRef<HTMLElement | null>(null)

  const updateActiveSection = useCallback(() => {
    const pendingTargetId = pendingTargetRef.current
    if (pendingTargetId) {
      const pendingEl = document.getElementById(pendingTargetId)
      if (pendingEl) {
        const offset = getScrollSpyOffset()
        if (pendingEl.getBoundingClientRect().top > offset + 4) {
          return
        }
      }
      pendingTargetRef.current = null
    }

    const next = pickActiveSection(sectionIds)
    if (next && next !== activeIdRef.current) {
      activeIdRef.current = next
      setActiveId(next)
    }
  }, [sectionIds])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      updateActiveSection()
    })
  }, [updateActiveSection])

  const updateIndicator = useCallback(() => {
    const list = listRef.current
    const link = linkRefs.current.get(activeId)
    if (!list || !link) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }))
      return
    }

    const listRect = list.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setIndicator({
      left: linkRect.left - listRect.left,
      width: linkRect.width,
      opacity: 1,
    })
  }, [activeId])

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  useEffect(() => {
    setContextPinned(isPinned)
  }, [isPinned, setContextPinned])

  const updatePinState = useCallback(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const stickTop = getSiteHeaderBottom()
    const shouldPin = sentinel.getBoundingClientRect().top < stickTop
    setIsPinned(shouldPin)
  }, [])

  useEffect(() => {
    pageRootRef.current = document.querySelector<HTMLElement>('#main-content')
    return () => {
      pageRootRef.current?.classList.remove('interior-section-nav--page-pinned')
    }
  }, [])

  useEffect(() => {
    pageRootRef.current?.classList.toggle('interior-section-nav--page-pinned', isPinned)
  }, [isPinned])

  useEffect(() => {
    updatePinState()
    window.addEventListener('scroll', updatePinState, { passive: true })
    window.addEventListener('resize', updatePinState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updatePinState)
      window.removeEventListener('resize', updatePinState)
    }
  }, [updatePinState])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const measure = () => {
      setSpacerHeight(shell.getBoundingClientRect().height)
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(shell)
    window.addEventListener('resize', measure, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [scheduleUpdate, updateActiveSection])

  useLayoutEffect(() => {
    updateIndicator()
  }, [updateIndicator, isPinned, items])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const onScrollOrResize = () => updateIndicator()
    list.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      list.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [updateIndicator])

  useEffect(() => {
    if (!isPinned) return
    const link = linkRefs.current.get(activeId)
    link?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeId, isPinned])

  const handleNavClick = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    pendingTargetRef.current = id
    activeIdRef.current = id
    setActiveId(id)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })

    window.setTimeout(
      () => {
        triggerSectionSettle(id)
      },
      reduceMotion ? 0 : 420,
    )
  }

  return (
    <div className="interior-section-nav-root">
      <div ref={sentinelRef} className="interior-section-nav__sentinel" aria-hidden />
      {isPinned ? (
        <div
          className="interior-section-nav__spacer"
          style={{ height: spacerHeight }}
          aria-hidden
        />
      ) : null}
      <div className={`interior-section-nav${isPinned ? ' interior-section-nav--pinned' : ''}`}>
        <div className="interior-section-nav__wrap">
          <div ref={shellRef} className="interior-section-nav__shell">
            <nav className="interior-section-nav__nav" aria-label={ariaLabel}>
              <div className="interior-section-nav__track">
                <ul ref={listRef} className="interior-section-nav__list">
                  {items.map((item) => {
                    const isActive = activeId === item.id
                    return (
                      <li key={item.id} className="interior-section-nav__item">
                        <a
                          ref={(node) => {
                            if (node) linkRefs.current.set(item.id, node)
                            else linkRefs.current.delete(item.id)
                          }}
                          href={`#${item.id}`}
                          className={`interior-section-nav__link${isActive ? ' interior-section-nav__link--active' : ''}`}
                          aria-current={isActive ? 'true' : undefined}
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(item.id)
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
                <span
                  className="interior-section-nav__indicator"
                  aria-hidden
                  style={{
                    transform: `translateX(${indicator.left}px)`,
                    width: indicator.width,
                    opacity: indicator.opacity,
                  }}
                />
              </div>
            </nav>
            {cta ? <div className="interior-section-nav__cta shrink-0">{cta}</div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
