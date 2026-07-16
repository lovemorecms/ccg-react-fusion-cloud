export type SharedServiceTag =
  | 'core'
  | 'connectivity'
  | 'advanced'
  | 'internal'
  | 'security'
  | 'operations'
  | 'platform'
  | 'development'
  | 'finops'

export type SharedService = {
  id: string
  title: string
  description: string
  tag: SharedServiceTag
  href?: string
}

export type SharedServiceCategory = {
  id: string
  label: string
  description: string
  services: SharedService[]
}

export const sharedServicesPath = '/explore/shared-services'

export const sharedServiceTagLabels: Record<SharedServiceTag, string> = {
  core: 'Core',
  connectivity: 'Connectivity',
  advanced: 'Advanced',
  internal: 'Internal',
  security: 'Security',
  operations: 'Operations',
  platform: 'Platform',
  development: 'Development',
  finops: 'FinOps',
}

export const sharedServicesHero = {
  title: 'Shared Services',
  description:
    'Discover the building blocks of CMS Cloud Fusion. Browse managed services across networking, compute, storage, security, and more, available across the hybrid cloud ecosystem.',
  searchPlaceholder: 'Search services, capabilities, or keywords...',
}

function service(
  id: string,
  title: string,
  description: string,
  tag: SharedServiceTag,
  href?: string,
): SharedService {
  return { id, title, description, tag, href }
}

export const sharedServiceCategories: SharedServiceCategory[] = [
  {
    id: 'network',
    label: 'Network',
    description: 'IP management, DNS, connectivity, and secure remote access solutions.',
    services: [
      service(
        'ip-address-management',
        'IP Address Management',
        'Managed IP addressing and allocation support.',
        'core',
        `${sharedServicesPath}/network/ip-address-management`,
      ),
      service(
        'domain-naming-service-dns',
        'Domain Naming Service (DNS)',
        'Internal and external DNS management.',
        'core',
      ),
      service(
        'wide-area-network-activation',
        'Wide Area Network Activation',
        'WAN connectivity activation and coordination.',
        'connectivity',
      ),
      service(
        'network-peering',
        'Network Peering',
        'Private network connectivity between approved environments.',
        'advanced',
      ),
      service('cmsnet', 'CMSNet', 'CMS network connectivity for authorized systems and users.', 'internal'),
      service(
        'secure-internet-inbound',
        'Secure Internet Inbound',
        'Controlled inbound internet connectivity for hosted services.',
        'security',
      ),
      service(
        'secure-internet-outbound',
        'Secure Internet Outbound',
        'Controlled outbound internet access for cloud workloads.',
        'security',
      ),
    ],
  },
  {
    id: 'storage',
    label: 'Storage',
    description: 'Backup, restore, and enterprise data protection services.',
    services: [
      service(
        'data-backup-and-restore',
        'Data Backup and Restore',
        'Managed backup and restore support for enterprise data.',
        'core',
      ),
    ],
  },
  {
    id: 'user-access',
    label: 'User Access',
    description: 'Identity, access, and enterprise user connectivity services.',
    services: [
      service(
        'infrastructure-access-management',
        'Infrastructure Access Management',
        'Access management support for approved infrastructure environments.',
        'security',
      ),
    ],
  },
  {
    id: 'compute',
    label: 'Compute',
    description: 'Operating system maintenance, images, and compute support services.',
    services: [
      service('patching', 'Patching', 'Patch planning and support for approved infrastructure.', 'operations'),
      service('gold-images', 'Gold Images', 'Standardized baseline images for cloud workloads.', 'core'),
    ],
  },
  {
    id: 'security-compliance',
    label: 'Security & Compliance',
    description: 'Accreditation, vulnerability management, and security operations.',
    services: [
      service(
        'compliance-scanning',
        'Compliance Scanning',
        'Scanning support for compliance posture and control validation.',
        'security',
      ),
      service(
        'product-accreditation',
        'Product Accreditation',
        'Accreditation support for products and hosted services.',
        'security',
      ),
      service(
        'security-alerting-and-notification',
        'Security Alerting and Notification',
        'Security event alerting and stakeholder notifications.',
        'security',
      ),
      service(
        'vulnerability-scanning',
        'Vulnerability Scanning',
        'Routine scanning and remediation support.',
        'security',
      ),
      service(
        'forensic-analysis',
        'Forensic Analysis',
        'Investigation and forensic analysis support for security events.',
        'advanced',
      ),
      service(
        'security-incident-management',
        'Security Incident Management',
        'Security incident coordination, tracking, and response support.',
        'operations',
      ),
      service(
        'posture-management',
        'Posture Management',
        'Security posture visibility and improvement guidance.',
        'advanced',
      ),
      service(
        'security-operations-center',
        'Security Operations Center',
        'Security operations monitoring and response coordination.',
        'operations',
      ),
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    description: 'Platform utilities and shared enterprise integration services.',
    services: [
      service('smtp', 'SMTP', 'Email relay support for approved applications and services.', 'platform'),
      service(
        'electronic-file-transfer',
        'Electronic File Transfer',
        'Secure file transfer support for enterprise integrations.',
        'platform',
      ),
    ],
  },
  {
    id: 'development-support',
    label: 'Development Support',
    description: 'Code repositories, testing, and quality assurance services.',
    services: [
      service(
        'code-repository-services',
        'Code Repository Services',
        'Managed Git and source control.',
        'development',
      ),
      service(
        'functional-testing',
        'Functional Testing',
        'Functional testing support for application teams.',
        'development',
      ),
      service('load-testing', 'Load Testing', 'Performance and load testing support.', 'development'),
      service(
        'static-code-analysis',
        'Static Code Analysis',
        'Static analysis support for code quality and security.',
        'security',
      ),
    ],
  },
  {
    id: 'operations-maintenance',
    label: 'Operations & Maintenance',
    description: 'ITSM, monitoring, incident management, and operational support.',
    services: [
      service(
        'change-management',
        'Change Management',
        'Controlled change planning and execution.',
        'operations',
      ),
      service(
        'incident-handling',
        'Incident Handling',
        'Incident response, triage, and resolution coordination.',
        'operations',
      ),
      service(
        'enterprise-operations-center',
        'Enterprise Operations Center',
        'Centralized enterprise operations monitoring and support.',
        'operations',
      ),
      service(
        'root-cause-analysis',
        'Root Cause Analysis',
        'Root cause analysis for recurring or major incidents.',
        'advanced',
      ),
      service(
        'cms-it-service-desk',
        'CMS IT Service Desk',
        'Service desk intake and support coordination.',
        'core',
      ),
      service('logging', 'Logging', 'Centralized logging support for applications and infrastructure.', 'core'),
      service(
        'infrastructure-monitoring-alerting',
        'Infrastructure Monitoring & Alerting',
        'Infrastructure monitoring and alerting support.',
        'operations',
      ),
      service(
        'application-performance-monitoring',
        'Application Performance Monitoring',
        'Application performance visibility and monitoring support.',
        'operations',
      ),
    ],
  },
  {
    id: 'finops',
    label: 'Financial Operations (FinOps)',
    description: 'Funding education, cost transparency, and optimization consulting.',
    services: [
      service(
        'contract-funding-education-support',
        'Contract & Funding Education & Support',
        'Education and support for contracts, funding, and cloud cost planning.',
        'finops',
      ),
      service(
        'cost-utilization-transparency-reporting',
        'Cost and Utilization Transparency & Reporting',
        'Reporting support for cloud cost and utilization visibility.',
        'finops',
      ),
      service(
        'cost-optimization-consulting',
        'Cost Optimization Consulting',
        'Consulting to identify and act on cost optimization opportunities.',
        'finops',
      ),
    ],
  },
  {
    id: 'solutions-engineering',
    label: 'Solutions Engineering',
    description: 'Architecture consulting and onboarding assistance.',
    services: [
      service(
        'architecture-consulting',
        'Architecture Consulting',
        'Architecture advisory support for cloud solutions.',
        'advanced',
      ),
      service(
        'onboarding-assistance',
        'Onboarding Assistance',
        'Hands-on assistance for teams onboarding to shared services.',
        'core',
      ),
    ],
  },
]

export const sharedServicesSectionIds = sharedServiceCategories.map((category) => category.id)

export const sharedServicesNavItems = sharedServiceCategories.map((category) => ({
  id: category.id,
  label: category.label,
}))

export const sharedServicesTotalCount = sharedServiceCategories.reduce(
  (sum, category) => sum + category.services.length,
  0,
)

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase()
}

export function serviceMatchesQuery(service: SharedService, query: string): boolean {
  const normalized = normalizeSearchText(query)
  if (!normalized) return true
  return (
    service.title.toLowerCase().includes(normalized) ||
    service.description.toLowerCase().includes(normalized) ||
    sharedServiceTagLabels[service.tag].toLowerCase().includes(normalized)
  )
}

export function categoryMatchesQuery(category: SharedServiceCategory, query: string): boolean {
  const normalized = normalizeSearchText(query)
  if (!normalized) return true
  if (category.label.toLowerCase().includes(normalized)) return true
  if (category.description.toLowerCase().includes(normalized)) return true
  return category.services.some((item) => serviceMatchesQuery(item, normalized))
}

export function getMatchingCategoryIds(query: string): string[] {
  const normalized = normalizeSearchText(query)
  if (!normalized) return []
  return sharedServiceCategories
    .filter((category) => categoryMatchesQuery(category, normalized))
    .map((category) => category.id)
}
