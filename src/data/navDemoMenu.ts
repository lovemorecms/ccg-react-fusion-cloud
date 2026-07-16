export type NavLink = { label: string; href: string }

export type NavColumn = { title: string; links: NavLink[] }

export type NavCategoryPanel =
  | { type: 'list'; links: NavLink[] }
  | { type: 'columns'; columns: NavColumn[] }
  | { type: 'cards'; links: NavLink[] }
  | { type: 'empty' }

export type NavCategory = {
  id: string
  label: string
  href?: string
  panel: NavCategoryPanel
}

export type NavMenuItem = {
  id: string
  label: string
  href: string
  categories: NavCategory[]
}

const link = (label: string): NavLink => ({ label, href: '#' })
const list = (...labels: string[]): NavLink[] => labels.map(link)
const column = (title: string, ...labels: string[]): NavColumn => ({
  title,
  links: list(...labels),
})

export const navDemoMenuItems: NavMenuItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about/program-overview',
    categories: [
      {
        id: 'about-hybrid-cloud',
        label: 'About Hybrid Cloud',
        panel: {
          type: 'list',
          links: list(
            'Why CMS Hybrid Cloud?',
            'Benefits of CMS Hybrid Cloud',
            'CMS Hybrid Cloud FAQ',
            'Hybrid Cloud Customer Support Team Overview',
            'Finding Your Customer Service Team Members',
          ),
        },
      },
      {
        id: 'platforms',
        label: 'Platforms',
        panel: { type: 'list', links: list('Platform Options') },
      },
      {
        id: 'services',
        label: 'Services',
        panel: { type: 'list', links: list('Services on CMS Hybrid Cloud') },
      },
      {
        id: 'security-responsibility',
        label: 'Security responsibility',
        panel: {
          type: 'list',
          links: list('Security benefits', 'Compliance as a service'),
        },
      },
      {
        id: 'governance',
        label: 'Governance',
        panel: {
          type: 'list',
          links: list(
            'Cost management',
            'Splunk Log Policy',
            'CloudWatch Log Retention Policy',
            'Snapshots Retention Policy',
            'Snapshots Retention Governance Framework',
          ),
        },
      },
      {
        id: 'support-channels',
        label: 'Support channels',
        panel: { type: 'list', links: list('CMS Hybrid Cloud Support Benefits') },
      },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    href: '/explore',
    categories: [
      {
        id: 'platforms',
        label: 'Platforms',
        panel: {
          type: 'list',
          links: list(
            'AWS Commercial',
            'AWS Outposts',
            'Azure Commercial',
            'Azure VDI Pilot',
            'Google Cloud (GCP)',
            'Oracle Cloud@Customer',
            'Amazon Connect',
          ),
        },
      },
      {
        id: 'fusion-toolkit',
        label: 'FUSION Toolkit',
        panel: {
          type: 'cards',
          links: list(
            'FUSION | MATCH',
            'FUSION | HELIX',
            'FUSION | BASECAMP',
            'FUSION | [New Product]',
          ),
        },
      },
      {
        id: 'network',
        label: 'Network',
        panel: {
          type: 'list',
          links: list(
            'IP Address Management',
            'Domain Naming Service (DNS)',
            'Wide Area Network Activation',
            'Network Peering',
            'CMSNet',
            'Secure Internet Inbound',
            'Secure Internet Outbound',
          ),
        },
      },
      {
        id: 'compute-storage',
        label: 'Compute & Storage',
        panel: { type: 'list', links: list('Patching', 'Gold Images', 'Data Backup and Restore') },
      },
      {
        id: 'user-access-platform',
        label: 'User Access & Platform',
        panel: {
          type: 'list',
          links: list('Infrastructure Access Management', 'SMTP', 'Electronic File Transfer'),
        },
      },
      {
        id: 'security-compliance',
        label: 'Security & Compliance',
        panel: {
          type: 'list',
          links: list(
            'Compliance Scanning',
            'Product Accreditation',
            'Security Alerting and Notification',
            'Vulnerability Scanning',
            'Forensic Analysis',
            'Security Incident Management',
            'Posture Management',
            'Security Operations Center',
          ),
        },
      },
      {
        id: 'development-support',
        label: 'Development Support',
        panel: {
          type: 'list',
          links: list(
            'Code Repository Services',
            'Functional Testing',
            'Load Testing',
            'Static Code Analysis',
          ),
        },
      },
      {
        id: 'operations-maintenance',
        label: 'Operations & Maintenance',
        panel: {
          type: 'list',
          links: list(
            'Change Management',
            'Incident Handling',
            'Enterprise Operations Center',
            'Root Cause Analysis',
            'CMS IT Service Desk',
            'Logging',
            'Infrastructure Monitoring & Alerting',
            'Application Performance Monitoring',
          ),
        },
      },
      {
        id: 'finops',
        label: 'Financial Operations (FinOps)',
        panel: {
          type: 'list',
          links: list(
            'Contract & Funding Education & Support',
            'Cost and Utilization Transparency & Reporting',
            'Cost Optimization Consulting',
          ),
        },
      },
      {
        id: 'solutions-engineering',
        label: 'Solutions Engineering',
        panel: {
          type: 'list',
          links: list('Architecture Consulting', 'Onboarding Assistance'),
        },
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    href: '/learn/knowledge-center',
    categories: [
      {
        id: 'knowledge-center',
        label: 'Documentation',
        panel: {
          type: 'columns',
          columns: [
            column(
              'ARCHITECTURE & INFRASTRUCTURE',
              'CMS Hybrid Cloud Architecture',
              'Cloud Governance',
              'Containers',
              'Storage',
              'User Access',
              'Platform',
            ),
            column(
              'COMPUTING & DEVOPS',
              'Gold Image',
              'Patching',
              'EC2 Instances',
              'DevOps',
              'Distributed Load Testing (DLTA)',
              'JFrog Platform',
              'Selenium Box',
              'Snyk',
              'SonarQube',
              'Testing as a Service (TaaS)',
            ),
            column(
              'MONITORING',
              'CMS Hybrid Cloud Observability',
              'CMS Enterprise Situational Awareness',
              'Introduction to Continuous Diagnostics and Mitigation',
              'Best practices for logging application development',
              'Datadog',
              'New Relic',
              'Site Reliability Engineering (SRE)',
              'SLO/SLI',
              'Software Asset Management',
              'Splunk ITSI',
              'Splunk',
            ),
            column(
              'NETWORKING & SECURITY',
              'CMSNet/WAN',
              'IPv6 Migration',
              'VPC',
              'Zscaler',
              'Security & Compliance Overview',
              'Compliance',
              'Adaptive Capabilities Testing (ACT)',
              'AWS Commercial account compliance',
              'AWS Security Hub',
              'AWS Backup',
              'Azure Backup',
              'Cloud Protection Manager (CPM)',
              'Introduction to DNS Requests',
              'Encryption',
              'Firewall',
              'Tenable Security Center',
              'Trend Micro Deep Security',
              'Zero Trust',
              'Site reliability',
              'Incident Management',
            ),
          ],
        },
      },
      {
        id: 'training-enablement',
        label: 'Training & Enablement',
        href: '/learn/training-enablement',
        panel: {
          type: 'columns',
          columns: [
            column(
              'CLOUD PLATFORM',
              'AWS Training',
              'Google Cloud Platform Training',
              'Microsoft Azure Training',
              'CloudTamer Training',
              'Datadog Training',
              'Snyk training',
              'Splunk training',
            ),
            column('AGILE TOOLS', 'Confluence Training', 'Jira Training'),
            column(
              'HYBRID CLOUD HOSTING SERVICES SELF-PACED LEARNING',
              'CMS Hybrid Cloud Ecosystem',
              'CMS Hybrid Cloud Computer Based Learning',
              'CMS CACHE IaaS Fundamentals',
            ),
            column('HYBRID CLOUD PROGRAM SESSIONS', 'Fireside Chats'),
          ],
        },
      },
      {
        id: 'customer-roadmap',
        label: 'Customer Roadmap',
        panel: {
          type: 'columns',
          columns: [
            column(
              'FINANCIAL OPERATIONS',
              'Financial Management',
              'Cost Optimization',
              'Working Together',
              'FinOps Engineering',
              'Tools & Resources',
              'Support',
            ),
            column(
              'COST TOOLS',
              'Cost Management Center',
              'How contracting works on CMS Hybrid Cloud',
              'Repricing and funding for CY2',
              'Introduction to Cost Estimation Tool (CET)',
              'Getting started with Cost Estimation Tool (CET)',
              'Using Cost Estimate Templates',
              'Cost Estimation Tool (CET) Workflow Enhancement Guide',
              'VIEW',
              'Estimate at Completion (EAC) 2.0 Dashboard',
              'EAC 2.0 access request',
              'Introduction to AWS Compute Optimizer',
              'Introduction to Amazon EC2 Reserved Instances',
              'Cloud cost saving with AWS Savings Plans',
              'Analyzing AWS cloud costs with Cost Explorer',
              'Understanding AWS Budgets and alerts',
              'AWS Cost Optimization Checklist',
              'CMS Hybrid Cloud cost allocation tags',
              'Azure Cost Optimization Checklist',
            ),
            column(
              'CLOUD CONSUMPTION',
              'Cloud Consumption Playbook: Improving consumption effectiveness',
              'Best practices for effective Cloud Consumption',
              'Compute service area',
              'Storage service area',
              'Database service area',
              'Other service area',
              'Unlocking the value of cloud at CMS',
              'Provisioning guidelines',
              'Utilization guidelines',
              'Savings plans guidelines',
              'Next gen services guidelines',
              'Cloud Consumption Consultations',
            ),
          ],
        },
      },
    ],
  },
  {
    id: 'get-started',
    label: 'Get Started',
    href: '/#pathways',
    categories: [
      {
        id: 'new-onboarding',
        label: 'New Onboarding',
        panel: {
          type: 'list',
          links: list(
            'Onboarding Stages',
            'Onboarding Process Key Activities and Supporting Team',
          ),
        },
      },
      {
        id: 'migrate',
        label: 'Migrate',
        panel: {
          type: 'list',
          links: list(
            'Accessing CMS Enterprise Confluence',
            'Application production prerequisites',
            'CMS Hybrid Cloud GitHub repository list',
            'Decommissioning your application',
            'Managing CMS Hybrid Cloud GitHub repositories',
            'Sandbox acceptable use policy',
            'Using CMS starter apps',
            'AWS Base',
          ),
        },
      },
      {
        id: 'onboarding-faq',
        label: 'Onboarding FAQ',
        panel: { type: 'empty' },
      },
    ],
  },
]
