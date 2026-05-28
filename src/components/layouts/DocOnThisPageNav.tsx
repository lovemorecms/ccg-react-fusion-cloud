import { useEffect, useState } from 'react'

export type DocTocItem = {
  id: string
  label: string
  /** Primary = bold blue links; secondary = regular weight (sub-topics) */
  level?: 'primary' | 'secondary'
}

type DocOnThisPageNavProps = {
  items: DocTocItem[]
}

function useActiveTocSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && ids.includes(hash)) setActiveId(hash)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) {
      return () => window.removeEventListener('hashchange', syncFromHash)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        const topmost = visible[0]?.target
        if (topmost?.id) setActiveId(topmost.id)
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.1, 0.5, 1] },
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncFromHash)
    }
  }, [ids])

  return { activeId, setActiveId }
}

export function DocOnThisPageNav({ items }: DocOnThisPageNavProps) {
  const ids = items.map((item) => item.id)
  const { activeId, setActiveId } = useActiveTocSection(ids)

  return (
    <nav className="ddoc-toc-nav" aria-label="On this page">
      <ul className="ddoc-toc">
        {items.map((item) => {
          const isActive = activeId === item.id
          const level = item.level ?? 'primary'

          return (
            <li
              key={item.id}
              className={[
                'ddoc-toc__item',
                level === 'secondary' ? 'ddoc-toc__item--secondary' : 'ddoc-toc__item--primary',
                isActive && 'ddoc-toc__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <a
                href={`#${item.id}`}
                className={isActive ? 'ddoc-toc__link ddoc-toc__link--active' : 'ddoc-toc__link'}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
