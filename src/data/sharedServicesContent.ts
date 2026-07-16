export type SharedService = {
  id: string
  title: string
  description: string
  href?: string
}

export type SharedServiceCategory = {
  id: string
  label: string
  description: string
  services: SharedService[]
}

export const sharedServicesPath = '/explore/shared-services'

export const sharedServicesHero = {
  title: 'Shared Services',
  description:
    'Discover the building blocks of CMS Cloud Fusion. Browse managed services across networking, compute, storage, security, and more, available across the hybrid cloud ecosystem.',
  searchPlaceholder: 'Search services, capabilities, or keywords...',
}

function service(id: string, title: string, description: string): SharedService {
  return { id, title, description }
}

export const sharedServiceCategories: SharedServiceCategory[] = [
  {
    id: 'network',
    label: 'Network',
    description: 'IP management, DNS, connectivity, and secure remote access solutions.',
    services: [
      service('ip-address-management', 'IP Address Management', 'Managed IP addressing and allocation support.'),
      service('domain-naming-service-dns', 'Domain Naming Service (DNS)', 'Internal and external DNS management.'),
      service('wide-area-network-activation', 'Wide Area Network Activation', 'WAN connectivity activation and coordination.'),
      service('network-peering', 'Network Peering', 'Private network connectivity between approved environments.'),
      service('cmsnet', 'CMSNet', 'CMS network connectivity for authorized systems and users.'),
      service('secure-internet-inbound', 'Secure Internet Inbound', 'Controlled inbound internet connectivity for hosted services.'),
      service('secure-internet-outbound', 'Secure Internet Outbound', 'Controlled outbound internet access for cloud workloads.'),
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
      ),
    ],
  },
  {
    id: 'compute',
    label: 'Compute',
    description: 'Operating system maintenance, images, and compute support services.',
    services: [
      service('patching', 'Patching', 'Patch planning and support for approved infrastructure.'),
      service('gold-images', 'Gold Images', 'Standardized baseline images for cloud workloads.'),
    ],
  },
  {
    id: 'security-compliance',
    label: 'Security & Compliance',
    description: 'Accreditation, vulnerability management, and security operations.',
    services: [
      service('compliance-scanning', 'Compliance Scanning', 'Scanning support for compliance posture and control validation.'),
      service('product-accreditation', 'Product Accreditation', 'Accreditation support for products and hosted services.'),
      service('security-alerting-and-notification', 'Security Alerting and Notification', 'Security event alerting and stakeholder notifications.'),
      service('vulnerability-scanning', 'Vulnerability Scanning', 'Routine scanning and remediation support.'),
      service('forensic-analysis', 'Forensic Analysis', 'Investigation and forensic analysis support for security events.'),
      service('security-incident-management', 'Security Incident Management', 'Security incident coordination, tracking, and response support.'),
      service('posture-management', 'Posture Management', 'Security posture visibility and improvement guidance.'),
      service('security-operations-center', 'Security Operations Center', 'Security operations monitoring and response coordination.'),
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    description: 'Platform utilities and shared enterprise integration services.',
    services: [
      service('smtp', 'SMTP', 'Email relay support for approved applications and services.'),
      service('electronic-file-transfer', 'Electronic File Transfer', 'Secure file transfer support for enterprise integrations.'),
    ],
  },
  {
    id: 'development-support',
    label: 'Development Support',
    description: 'Code repositories, testing, and quality assurance services.',
    services: [
      service('code-repository-services', 'Code Repository Services', 'Managed Git and source control.'),
      service('functional-testing', 'Functional Testing', 'Functional testing support for application teams.'),
      service('load-testing', 'Load Testing', 'Performance and load testing support.'),
      service('static-code-analysis', 'Static Code Analysis', 'Static analysis support for code quality and security.'),
    ],
  },
  {
    id: 'operations-maintenance',
    label: 'Operations & Maintenance',
    description: 'ITSM, monitoring, incident management, and operational support.',
    services: [
      service('change-management', 'Change Management', 'Controlled change planning and execution.'),
      service('incident-handling', 'Incident Handling', 'Incident response, triage, and resolution coordination.'),
      service('enterprise-operations-center', 'Enterprise Operations Center', 'Centralized enterprise operations monitoring and support.'),
      service('root-cause-analysis', 'Root Cause Analysis', 'Root cause analysis for recurring or major incidents.'),
      service('cms-it-service-desk', 'CMS IT Service Desk', 'Service desk intake and support coordination.'),
      service('logging', 'Logging', 'Centralized logging support for applications and infrastructure.'),
      service('infrastructure-monitoring-alerting', 'Infrastructure Monitoring & Alerting', 'Infrastructure monitoring and alerting support.'),
      service('application-performance-monitoring', 'Application Performance Monitoring', 'Application performance visibility and monitoring support.'),
    ],
  },
  {
    id: 'finops',
    label: 'Financial Operations (FinOps)',
    description: 'Funding education, cost transparency, and optimization consulting.',
    services: [
      service('contract-funding-education-support', 'Contract & Funding Education & Support', 'Education and support for contracts, funding, and cloud cost planning.'),
      service('cost-utilization-transparency-reporting', 'Cost and Utilization Transparency & Reporting', 'Reporting support for cloud cost and utilization visibility.'),
      service('cost-optimization-consulting', 'Cost Optimization Consulting', 'Consulting to identify and act on cost optimization opportunities.'),
    ],
  },
  {
    id: 'solutions-engineering',
    label: 'Solutions Engineering',
    description: 'Architecture consulting and onboarding assistance.',
    services: [
      service('architecture-consulting', 'Architecture Consulting', 'Architecture advisory support for cloud solutions.'),
      service('onboarding-assistance', 'Onboarding Assistance', 'Hands-on assistance for teams onboarding to shared services.'),
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
    service.description.toLowerCase().includes(normalized)
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
