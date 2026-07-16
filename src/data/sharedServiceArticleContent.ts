import type { PlatformArticlePage } from './platformArticleContent'
import { sharedServicesPath } from './sharedServicesContent'

export type SharedServiceArticlePage = PlatformArticlePage & {
  categoryId: string
  categoryLabel: string
  status?: 'Required' | 'Optional'
  availableIn: string[]
}

const SERVICE_HERO_IMAGE = 'images/sections/azure-commercial-hero.png'
const SERVICE_HERO_ALT =
  'Isometric cloud security illustration with glowing cubes and a locked shield'

export function sharedServiceArticlePath(categoryId: string, serviceId: string): string {
  return `${sharedServicesPath}/${categoryId}/${serviceId}`
}

export const ipAddressManagementArticle: SharedServiceArticlePage = {
  slug: 'ip-address-management',
  categoryId: 'network',
  categoryLabel: 'Network',
  status: 'Required',
  availableIn: ['AWS Commercial', 'AWS GovCloud'],
  title: 'IP Address Management',
  heroSummary:
    'Managed IP addressing and allocation for CMS Hybrid Cloud. The CMS DIN team provides centralized control so applications receive unique, conflict-free addresses across approved environments.',
  heroImageSrc: SERVICE_HERO_IMAGE,
  heroImageAlt: SERVICE_HERO_ALT,
  metadata: {
    updated: 'January 13, 2026',
    owner: 'CMS DIN Team',
    cloud: 'Network',
    readingTime: '4 min',
  },
  sectionIds: ['about', 'benefits', 'associated-cost', 'availability', 'getting-started'],
  lastUpdated: 'January 13, 2026',
  sections: [
    {
      id: 'about',
      navLabel: 'About',
      heading: 'About',
      type: 'prose',
      paragraphs: [
        'IP Address Management is a required shared service for CMS Hybrid Cloud. It ensures every hosted workload receives a unique IP address that fits CMS network standards and avoids conflicts across accounts, VPCs, and hybrid connections.',
        'The CMS DIN team manages IP addressing for CMS Hybrid Cloud customers. Teams request allocation through established intake channels; DIN assigns addresses, tracks inventory, and coordinates changes as environments grow or migrate.',
      ],
    },
    {
      id: 'benefits',
      navLabel: 'Benefits',
      heading: 'Benefits',
      type: 'leads',
      items: [
        {
          label: 'Centralized Management',
          body: 'BTDiamond acts as the system of record for IP inventory, so allocations stay consistent across CMS Hybrid Cloud environments.',
        },
        {
          label: 'Avoids Conflicts',
          body: 'Coordinated assignment prevents overlapping ranges that can break routing, peering, or hybrid connectivity.',
        },
        {
          label: 'Operational Efficiency',
          body: 'Standard request and allocation workflows reduce ad-hoc spreadsheet tracking and accelerate onboarding.',
        },
        {
          label: 'Scalability',
          body: 'IP plans can grow with your application footprint while remaining aligned to CMS network architecture.',
        },
      ],
    },
    {
      id: 'associated-cost',
      navLabel: 'Associated Cost',
      heading: 'Associated Cost',
      type: 'prose',
      paragraphs: [
        'There is no additional charge for IP Address Management. The service is included as part of CMS Hybrid Cloud shared services.',
      ],
    },
    {
      id: 'availability',
      navLabel: 'Availability',
      heading: 'Availability',
      type: 'table',
      table: {
        headers: ['Detail', 'Value'],
        rowHeaderColumn: true,
        rows: [
          ['Category', 'Network'],
          ['Status', 'Required'],
          ['Available in', 'AWS Commercial, AWS GovCloud'],
        ],
      },
    },
    {
      id: 'getting-started',
      navLabel: 'Getting Started',
      heading: 'Getting Started',
      type: 'prose',
      paragraphs: [
        'If you are onboarding a new application or expanding an existing environment, request IP Address Management as part of your CMS Hybrid Cloud hosting plan. Your Customer Support Team or Hosting Coordinator can help confirm requirements and submit the allocation request to CMS DIN.',
      ],
      links: [
        { label: 'Back to Shared Services', href: sharedServicesPath },
        { label: 'Network services', href: `${sharedServicesPath}#network` },
        { label: 'Get started with CMS Hybrid Cloud', href: '/explore#getting-started' },
      ],
    },
  ],
}

const sharedServiceArticles: SharedServiceArticlePage[] = [ipAddressManagementArticle]

export function getSharedServiceArticle(
  categoryId: string,
  serviceSlug: string,
): SharedServiceArticlePage | undefined {
  return sharedServiceArticles.find(
    (article) => article.categoryId === categoryId && article.slug === serviceSlug,
  )
}
