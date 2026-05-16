/**
 * Knowledge Base documentation parent categories.
 * On the Knowledge Base page, categories with `href: '#'` expand inline; `topics` lists real links when present.
 */
export type DocCategoryTopic = { label: string; to?: string }

export type DocCategory = {
  id: string
  title: string
  href: string
  itemCount: number
  /** Optional override for the inline panel H3 (default: “{title} documentation”). */
  expandPanelTitle?: string
  topics?: DocCategoryTopic[]
}

/** DevOps child topics — Maven integration links to the detail article route. */
const devOpsTopics: DocCategoryTopic[] = [
  { label: 'Introduction to AWS Service Catalog' },
  { label: 'DevOps Services for MAG' },
  { label: 'Maven Integration for DevOps', to: '/learn/knowledge-center/devops/maven-integration' },
  { label: 'CI/CD' },
  { label: 'Distributed Load Testing (DLTA)' },
  { label: 'JFrog Platform' },
  { label: 'Selenium Box' },
  { label: 'Snyk' },
  { label: 'SonarQube' },
  { label: 'Testing as a Service (TaaS)' },
]

export const knowledgeCenterDocCategories: DocCategory[] = [
  { id: 'cms-hybrid-cloud', title: 'CMS Hybrid Cloud', href: '#', itemCount: 48 },
  { id: 'cloud-governance', title: 'Cloud Governance', href: '#', itemCount: 36 },
  { id: 'quickstarts', title: 'Quickstarts', href: '#', itemCount: 22 },
  { id: 'computing', title: 'Computing', href: '#', itemCount: 31 },
  { id: 'containers', title: 'Containers', href: '#', itemCount: 27 },
  {
    id: 'devops',
    title: 'DevOps',
    href: '#',
    itemCount: 10,
    topics: devOpsTopics,
  },
  { id: 'incident-management', title: 'Incident Management', href: '#', itemCount: 14 },
  { id: 'monitoring', title: 'Monitoring', href: '#', itemCount: 25 },
  { id: 'networking', title: 'Networking', href: '#', itemCount: 33 },
  { id: 'security-compliance', title: 'Security & Compliance', href: '#', itemCount: 52 },
  { id: 'site-reliability', title: 'Site reliability', href: '#', itemCount: 18 },
  { id: 'storage', title: 'Storage', href: '#', itemCount: 16 },
  { id: 'user-access', title: 'User Access', href: '#', itemCount: 21 },
  { id: 'platforms', title: 'Platforms', href: '#', itemCount: 29 },
]
