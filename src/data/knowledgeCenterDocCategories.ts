/**
 * Fusion Info Center parent categories.
 * Category cards open the 3-column layout with that category expanded.
 */
export const fusionInfoCenterArticlePath = '/learn/knowledge-center/devops/maven-integration'

export type DocCategoryTopic = { label: string; to?: string }

export type DocCategory = {
  id: string
  title: string
  href: string
  itemCount: number
  description?: string
  topics?: DocCategoryTopic[]
}

export type FusionInfoCenterNavLink = {
  label: string
  to?: string
  active?: boolean
}

export type FusionInfoCenterNavGroup = {
  id: string
  title: string
  to: string
  defaultOpen: boolean
  links: FusionInfoCenterNavLink[]
}

export function fusionInfoCenterCategoryPath(id: string) {
  return `/learn/knowledge-center/${id}`
}

/** DevOps child topics — Maven integration links to the detail article route. */
const devOpsTopics: DocCategoryTopic[] = [
  { label: 'Introduction to AWS Service Catalog' },
  { label: 'DevOps Services for MAG' },
  { label: 'Maven Integration for DevOps', to: fusionInfoCenterArticlePath },
  { label: 'CI/CD' },
  { label: 'Distributed Load Testing (DLTA)' },
  { label: 'JFrog Platform' },
  { label: 'Selenium Box' },
  { label: 'Snyk' },
  { label: 'SonarQube' },
  { label: 'Testing as a Service (TaaS)' },
]

export const knowledgeCenterDocCategories: DocCategory[] = [
  {
    id: 'cms-hybrid-cloud',
    title: 'CMS Hybrid Cloud',
    href: fusionInfoCenterCategoryPath('cms-hybrid-cloud'),
    itemCount: 48,
    description: 'Architecture, landing zones, and platform fundamentals',
  },
  {
    id: 'cloud-governance',
    title: 'Cloud Governance',
    href: fusionInfoCenterCategoryPath('cloud-governance'),
    itemCount: 36,
    description: 'Policies, guardrails, and account standards',
  },
  {
    id: 'quickstarts',
    title: 'Quickstarts',
    href: fusionInfoCenterCategoryPath('quickstarts'),
    itemCount: 22,
    description: 'Fast-start guides to stand up a workload',
  },
  {
    id: 'computing',
    title: 'Computing',
    href: fusionInfoCenterCategoryPath('computing'),
    itemCount: 31,
    description: 'Virtual machines, instances, and compute options',
  },
  {
    id: 'containers',
    title: 'Containers',
    href: fusionInfoCenterCategoryPath('containers'),
    itemCount: 27,
    description: 'Kubernetes, registries, and container runtimes',
  },
  {
    id: 'devops',
    title: 'DevOps',
    href: fusionInfoCenterCategoryPath('devops'),
    itemCount: 10,
    description: 'CI/CD, pipelines, and developer tooling',
    topics: devOpsTopics,
  },
  {
    id: 'incident-management',
    title: 'Incident Management',
    href: fusionInfoCenterCategoryPath('incident-management'),
    itemCount: 14,
    description: 'Response playbooks and escalation paths',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    href: fusionInfoCenterCategoryPath('monitoring'),
    itemCount: 25,
    description: 'Logs, metrics, alerts, and observability',
  },
  {
    id: 'networking',
    title: 'Networking',
    href: fusionInfoCenterCategoryPath('networking'),
    itemCount: 33,
    description: 'VPC, connectivity, and traffic controls',
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    href: fusionInfoCenterCategoryPath('security-compliance'),
    itemCount: 52,
    description: 'Controls, ATO, and approved security tools',
  },
  {
    id: 'site-reliability',
    title: 'Site reliability',
    href: fusionInfoCenterCategoryPath('site-reliability'),
    itemCount: 18,
    description: 'SLOs, runbooks, and operational health',
  },
  {
    id: 'storage',
    title: 'Storage',
    href: fusionInfoCenterCategoryPath('storage'),
    itemCount: 16,
    description: 'Object, block, and file storage patterns',
  },
  {
    id: 'user-access',
    title: 'User Access',
    href: fusionInfoCenterCategoryPath('user-access'),
    itemCount: 21,
    description: 'Identity, EUA, and role-based access',
  },
  {
    id: 'platforms',
    title: 'Platforms',
    href: fusionInfoCenterCategoryPath('platforms'),
    itemCount: 29,
    description: 'AWS, Azure, GCP, and Oracle guidance',
  },
]

export function getFusionInfoCenterCategory(id: string) {
  return knowledgeCenterDocCategories.find((category) => category.id === id)
}

export function fusionInfoCenterNavGroups(
  openId?: string,
  activeTopicTo?: string,
): FusionInfoCenterNavGroup[] {
  return knowledgeCenterDocCategories.map((category) => ({
    id: category.id,
    title: category.title,
    to: fusionInfoCenterCategoryPath(category.id),
    defaultOpen: category.id === openId,
    links: (category.topics ?? []).map((topic) => ({
      label: topic.label,
      to: topic.to,
      active: Boolean(topic.to && topic.to === activeTopicTo),
    })),
  }))
}
