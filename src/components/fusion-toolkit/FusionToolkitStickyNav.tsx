import { useCallback, useEffect, useRef, useState } from 'react'
import { FusionButton } from '../FusionButton'
import { fusionToolkitProducts } from '../../data/fusionToolkitContent'

export const fusionToolkitSectionIds = [
  'overview',
  'toolkit-grid',
  ...fusionToolkitProducts.map((p) => p.id),
]

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'toolkit-grid', label: 'Toolkit' },
  ...fusionToolkitProducts.map((p) => ({ id: p.id, label: p.name })),
]

function getScrollSpyOffset(): number {
  const siteHeader = document.querySelector<HTMLElement>('.fusion-site-nav')?.closest('.sticky')
  const stickyShell = document.querySelector<HTMLElement>('.ft-sticky-nav__shell')
  const stickyVisible = document.querySelector('.ft-sticky-nav--visible')

  let offset = siteHeader?.getBoundingClientRect().bottom ?? 88

  if (stickyVisible && stickyShell) {
    offset = stickyShell.getBoundingClientRect().bottom + 8
  }

  return offset
}

function pickActiveSection(sectionIds: string[]): string {
  const offset = getScrollSpyOffset()
  const scrollBottom = window.scrollY + window.innerHeight
  const docBottom = document.documentElement.scrollHeight

  if (scrollBottom >= docBottom - 64) {
    return sectionIds[sectionIds.length - 1] ?? 'overview'
  }

  let current = sectionIds[0] ?? 'overview'

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= offset) {
      current = id
    }
  }

  return current
}

export function FusionToolkitStickyNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState('overview')
  const activeIdRef = useRef(activeId)
  const rafRef = useRef<number | null>(null)

  const updateActiveSection = useCallback(() => {
    const next = pickActiveSection(fusionToolkitSectionIds)
    if (next !== activeIdRef.current) {
      activeIdRef.current = next
      setActiveId(next)
    }
  }, [])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      updateActiveSection()
    })
  }, [updateActiveSection])

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  useEffect(() => {
    const hero = document.getElementById('overview')
    if (!hero) return

    try {
      const showObserver = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting)
        },
        { threshold: 0, rootMargin: '-1px 0px 0px 0px' },
      )
      showObserver.observe(hero)
      return () => showObserver.disconnect()
    } catch {
      setVisible(false)
      return undefined
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

  useEffect(() => {
    if (!visible) return
    const link = document.querySelector<HTMLElement>(
      `.ft-sticky-nav__link[href="#${activeId}"]`,
    )
    link?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeId, visible])

  const handleNavClick = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    activeIdRef.current = id
    setActiveId(id)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className={`ft-sticky-nav${visible ? ' ft-sticky-nav--visible' : ''}`}
      aria-hidden={!visible}
    >
      <div className="ft-sticky-nav__wrap">
        <div className="ft-sticky-nav__shell">
          <nav className="ft-sticky-nav__nav" aria-label="Fusion Toolkit sections">
            <ul className="ft-sticky-nav__list">
              {navItems.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id} className="ft-sticky-nav__item">
                    <a
                      href={`#${item.id}`}
                      className={`ft-sticky-nav__link${isActive ? ' ft-sticky-nav__link--active' : ''}`}
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
          </nav>
          <FusionButton
            href="/learn/knowledge-center"
            variation="solid"
            className="ft-sticky-nav__cta shrink-0"
          >
            Get started with Fusion Toolkit
          </FusionButton>
        </div>
      </div>
    </div>
  )
}
