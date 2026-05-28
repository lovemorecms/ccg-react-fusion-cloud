import { fusionToolkitNavLinks } from './fusionToolkitContent'
import { platformNavLinks } from './platformPages'

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
  panel: NavCategoryPanel
}

export type NavMenuItem = {
  id: string
  label: string
  href: string
  categories: NavCategory[]
}

const link = (label: string, href = '#'): NavLink => ({ label, href })
const list = (...labels: string[]): NavLink[] => labels.map((label) => link(label))
const column = (title: string, ...labels: string[]): NavColumn => ({
  title,
  links: list(...labels),
})

const alpha = new Intl.Collator('en', { sensitivity: 'base', numeric: true })

function sortLinks(links: NavLink[]): NavLink[] {
  return [...links].sort((a, b) => alpha.compare(a.label, b.label))
}

function sortPanel(panel: NavCategoryPanel): NavCategoryPanel {
  if (panel.type === 'empty') {
    return panel
  }

  if (panel.type === 'list' || panel.type === 'cards') {
    return { ...panel, links: sortLinks(panel.links) }
  }

  return {
    ...panel,
    columns: [...panel.columns]
      .map((col) => ({ ...col, links: sortLinks(col.links) }))
      .sort((a, b) => alpha.compare(a.title, b.title)),
  }
}

function sortMenuItems(items: NavMenuItem[]): NavMenuItem[] {
  return items.map((item) => ({
    ...item,
    categories: [...item.categories]
      .map((category) => ({ ...category, panel: sortPanel(category.panel) }))
      .sort((a, b) => alpha.compare(a.label, b.label)),
  }))
}

export const navNewCcgMenuItems: NavMenuItem[] = sortMenuItems([
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
          links: [
            link('Program Overview', '/about/program-overview'),
            link('Benefits', '/about/program-overview'),
            link('Success Stories', '/about/program-overview'),
            link('Contact Us', '/about/program-overview'),
          ],
        },
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
          links: platformNavLinks,
        },
      },
      {
        id: 'fusion-toolkit',
        label: 'Fusion Toolkit',
        panel: {
          type: 'list',
          links: fusionToolkitNavLinks,
        },
      },
      {
        id: 'shared-services',
        label: 'Shared Services',
        panel: {
          type: 'list',
          links: list(
            'Compute',
            'Development Support',
            'Financial Operations (FinOps)',
            'Network',
            'Operations & Maintenance',
            'Platform',
            'Security & Compliance',
            'Storage',
            'Solutions Engineering',
            'User Access',
          ),
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
        label: 'Knowledge Center',
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
])
