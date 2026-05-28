export type FusionToolkitProduct = {
  id: string
  name: string
  tagline: string
  cardDescription: string
  detailDescription: string
  features: string[]
  imageReverse?: boolean
  sectionVariant?: 'light' | 'blue' | 'gloss'
}

export const fusionToolkitHero = {
  title: 'Fusion Toolkit',
  lede:
    'Four powerful products, one unified ecosystem. Build, orchestrate, observe, and optimize with elegance.',
  primaryCta: { label: 'Explore the Toolkit', href: '#toolkit-grid' },
  secondaryCta: { label: 'View Documentation', href: '/learn/knowledge-center' },
}

export const fusionToolkitGridIntro = {
  title: 'The complete toolkit',
  description:
    'Each product in the Fusion Toolkit is designed to excel independently, yet together they create an unparalleled development experience.',
}

export const fusionToolkitProducts: FusionToolkitProduct[] = [
  {
    id: 'basecamp',
    name: 'BaseCamp',
    tagline: 'Your foundation for innovation',
    cardDescription:
      'A comprehensive platform for managing cloud infrastructure, deployment pipelines, and development environments. BaseCamp provides the solid foundation your teams need to build with confidence.',
    detailDescription:
      'A comprehensive platform for managing cloud infrastructure, deployment pipelines, and development environments. BaseCamp provides the solid foundation your teams need to build with confidence.',
    features: [
      'Unified infrastructure management',
      'Automated deployment pipelines',
      'Real-time monitoring and alerts',
      'Collaborative workspace',
    ],
    sectionVariant: 'light',
  },
  {
    id: 'helix',
    name: 'Helix',
    tagline: 'Orchestrate complexity with elegance',
    cardDescription:
      'Advanced workflow automation and integration platform that connects your tools, teams, and processes. Helix transforms complex operations into elegant, automated flows.',
    detailDescription:
      'Advanced workflow automation and integration platform that connects your tools, teams, and processes. Helix transforms complex operations into elegant, automated flows.',
    features: [
      'Visual workflow designer',
      'Pre-built integrations',
      'Event-driven automation',
      'Advanced analytics',
    ],
    imageReverse: true,
    sectionVariant: 'blue',
  },
  {
    id: 'lens',
    name: 'Lens',
    tagline: 'See everything, understand instantly',
    cardDescription:
      'Powerful observability and analytics platform that provides deep insights into your systems. Lens gives you crystal-clear visibility across your entire infrastructure.',
    detailDescription:
      'Powerful observability and analytics platform that provides deep insights into your systems. Lens gives you crystal-clear visibility across your entire infrastructure.',
    features: [
      'Unified dashboards',
      'AI-powered anomaly detection',
      'Custom metrics and logs',
      'Performance optimization',
    ],
    sectionVariant: 'gloss',
  },
  {
    id: 'match',
    name: 'Match',
    tagline: 'Connect the right resources, right now',
    cardDescription:
      'Intelligent resource allocation and optimization platform. Match uses advanced algorithms to pair workloads with optimal infrastructure, maximizing efficiency and reducing costs.',
    detailDescription:
      'Intelligent resource allocation and optimization platform. Match uses advanced algorithms to pair workloads with optimal infrastructure, maximizing efficiency and reducing costs.',
    features: [
      'Intelligent workload matching',
      'Cost and capacity optimization',
      'Policy-driven placement',
      'FinOps-aligned recommendations',
    ],
    imageReverse: true,
    sectionVariant: 'blue',
  },
]

export const fusionToolkitPath = '/explore/fusion-toolkit'

export const fusionToolkitNavLinks = fusionToolkitProducts.map((product) => ({
  label: product.name,
  href: `${fusionToolkitPath}#${product.id}`,
}))
