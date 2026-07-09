import type { ReactNode } from 'react'
import { useInteriorSectionNavPin } from './InteriorSectionNav'

export type HideableInteriorBreadcrumbsProps = {
  children: ReactNode
  className?: string
}

export function HideableInteriorBreadcrumbs({
  children,
  className = 'kc-breadcrumb-bar',
}: HideableInteriorBreadcrumbsProps) {
  const isPinned = useInteriorSectionNavPin()

  return (
    <div
      className={`${className}${isPinned ? ' fusion-interior-breadcrumb-bar--hidden' : ''}`}
      aria-hidden={isPinned}
    >
      {children}
    </div>
  )
}
