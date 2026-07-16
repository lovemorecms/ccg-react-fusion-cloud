import { useMemo } from 'react'
import { InteriorSectionNav } from '../layouts/InteriorSectionNav'
import {
  sharedServiceCategories,
  sharedServicesSectionIds,
} from '../../data/sharedServicesContent'
import { SharedServicesCategoryIcon } from './SharedServicesCategoryIcons'

const navShortLabels: Record<string, string> = {
  finops: 'Financial Operations',
}

export function SharedServicesStickyNav({
  onNavClick,
  activeSectionId,
}: {
  onNavClick?: (id: string) => void
  activeSectionId?: string
}) {
  const items = useMemo(
    () =>
      sharedServiceCategories.map((category) => ({
        id: category.id,
        label: navShortLabels[category.id] ?? category.label,
        icon: <SharedServicesCategoryIcon id={category.id} />,
      })),
    [],
  )

  return (
    <InteriorSectionNav
      items={items}
      sectionIds={sharedServicesSectionIds}
      ariaLabel="Shared Services categories"
      onNavClick={onNavClick}
      activeSectionId={activeSectionId}
      variant="icon"
    />
  )
}
