import { FusionButton } from '../FusionButton'
import { InteriorSectionNav } from '../layouts/InteriorSectionNav'
import { fusionToolkitNavLinks } from '../../data/fusionToolkitContent'

function sectionIdFromNavHref(href: string): string {
  const hash = href.split('#')[1]
  return hash ?? 'overview'
}

export const fusionToolkitSectionIds = fusionToolkitNavLinks.map((link) =>
  sectionIdFromNavHref(link.href),
)

const navItems = fusionToolkitNavLinks.map((link) => ({
  id: sectionIdFromNavHref(link.href),
  label: link.label,
}))

export function FusionToolkitStickyNav() {
  return (
    <InteriorSectionNav
      items={navItems}
      sectionIds={fusionToolkitSectionIds}
      ariaLabel="Fusion Toolkit sections"
      cta={
        <FusionButton href="/learn/knowledge-center" variation="solid">
          Get started with Fusion Toolkit
        </FusionButton>
      }
    />
  )
}
