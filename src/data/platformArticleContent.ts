export type PlatformArticleMetadata = {
  updated: string
  owner: string
  cloud: string
  readingTime: string
}

export type PlatformArticleLeadItem = {
  label: string
  body: string
}

export type PlatformArticleTable = {
  intro?: string
  caption?: string
  headers: string[]
  /** Each row is a list of cell values matching `headers` length */
  rows: string[][]
  /** When true, first cell in each row renders as a row header (`th`) */
  rowHeaderColumn?: boolean
}

export type PlatformArticleSection =
  | {
      id: string
      navLabel: string
      heading: string
      type: 'leads'
      items: PlatformArticleLeadItem[]
    }
  | {
      id: string
      navLabel: string
      heading: string
      type: 'table'
      table: PlatformArticleTable
    }
  | {
      id: string
      navLabel: string
      heading: string
      type: 'prose'
      paragraphs: string[]
      bullets?: string[]
      links?: { label: string; href: string }[]
    }

export type PlatformArticlePage = {
  slug: string
  title: string
  heroSummary: string
  heroImageSrc: string
  heroImageAlt?: string
  metadata: PlatformArticleMetadata
  sectionIds: string[]
  sections: PlatformArticleSection[]
  lastUpdated: string
}

const PLATFORM_HERO_IMAGE = 'images/sections/azure-commercial-hero.png'
const PLATFORM_HERO_ALT =
  'Isometric cloud security illustration with glowing cubes and a locked shield'

const STANDARD_SECTION_IDS = [
  'what-why-how-when',
  'approved-services',
  'operational-shared-services',
  'getting-started',
] as const

type PlatformArticleConfig = {
  slug: string
  title: string
  heroSummary: string
  metadata: PlatformArticleMetadata
  leads: PlatformArticleLeadItem[]
  approvedServices: PlatformArticleTable
  operationalServices: PlatformArticleTable
  gettingStarted: {
    paragraphs: string[]
    links?: { label: string; href: string }[]
  }
}

function buildPlatformArticle(config: PlatformArticleConfig): PlatformArticlePage {
  return {
    slug: config.slug,
    title: config.title,
    heroSummary: config.heroSummary,
    heroImageSrc: PLATFORM_HERO_IMAGE,
    heroImageAlt: PLATFORM_HERO_ALT,
    metadata: config.metadata,
    sectionIds: [...STANDARD_SECTION_IDS],
    lastUpdated: config.metadata.updated,
    sections: [
      {
        id: 'what-why-how-when',
        navLabel: 'What, Why, How, and When',
        heading: 'What, Why, How, and When',
        type: 'leads',
        items: config.leads,
      },
      {
        id: 'approved-services',
        navLabel: 'Approved Services',
        heading: 'Approved Services',
        type: 'table',
        table: config.approvedServices,
      },
      {
        id: 'operational-shared-services',
        navLabel: 'Operational Shared Services',
        heading: 'Operational Shared Services',
        type: 'table',
        table: config.operationalServices,
      },
      {
        id: 'getting-started',
        navLabel: 'Getting Started',
        heading: 'Getting Started',
        type: 'prose',
        paragraphs: config.gettingStarted.paragraphs,
        links: config.gettingStarted.links,
      },
    ],
  }
}

const gettingStartedLinks = [
  { label: 'Contact the Customer Support Team', href: '/explore#getting-started' },
  { label: 'Get started with CMS Hybrid Cloud', href: '/explore#getting-started' },
]

export const azureCommercialArticle = buildPlatformArticle({
  slug: 'azure-commercial',
  title: 'Azure Commercial Enablement',
  heroSummary:
    'A secure, scalable cloud hosting option within the CMS multi-cloud ecosystem for applications migrating from government-specific Azure environments to Azure Commercial.',
  metadata: {
    updated: 'June 1, 2025',
    owner: 'Cloud Enablement Team',
    cloud: 'Azure Commercial',
    readingTime: '6 min',
  },
  leads: [
    {
      label: 'What it is',
      body: 'Azure Commercial Enablement is the CMS Hybrid Cloud program path for hosting applications on Microsoft Azure Commercial. It provides a standardized onboarding model, approved service catalog, and shared operational services aligned to CMS security and compliance expectations.',
    },
    {
      label: 'Why it matters',
      body: 'Teams migrating from Azure Government environments benefit from broader service availability, simplified vendor support, and reduced friction between commercial and government cloud boundaries—while inheriting CMS guardrails for logging, monitoring, identity, and cost management.',
    },
    {
      label: 'How it works',
      body: 'Hosting coordinators work with the Customer Service Team (CST) to complete intake, architecture review, and sandbox validation. Approved services are provisioned through CMS-managed landing zones with tagging, policy, and monitoring applied by default.',
    },
    {
      label: 'When it is available',
      body: 'Azure Commercial onboarding is available for new workloads and migration candidates following program prioritization. Production cutover dates are coordinated with CST, security assessors, and application owners based on readiness milestones.',
    },
  ],
  approvedServices: {
    intro:
      'The following Azure Commercial services are approved for CMS Hybrid Cloud workloads. Teams should request exceptions through the architecture review process before provisioning non-listed services.',
    caption: 'Approved Azure Commercial services by category',
    headers: ['Category', 'Approved services'],
    rows: [
      ['Compute', 'Virtual Machines, VM Scale Sets, Azure Kubernetes Service (AKS), Azure Batch'],
      ['Containers', 'Azure Container Instances, Azure Container Apps, Azure Container Registry'],
      ['End-user computing', 'Azure Virtual Desktop, Windows 365 (where approved by mission owner)'],
      ['Serverless', 'Azure Functions, Logic Apps, Event Grid'],
      ['Automation', 'Automation Accounts, Update Management, Desired State Configuration'],
      ['Storage', 'Blob Storage, Azure Files, Azure NetApp Files, managed disks'],
      ['Networking', 'Virtual Network, Azure Firewall, Application Gateway, Private Link, ExpressRoute'],
      ['Data protection', 'Azure Backup, Azure Site Recovery, Key Vault'],
    ],
  },
  operationalServices: {
    intro:
      'CMS Hybrid Cloud provides shared operational services across Azure Commercial subscriptions. These services reduce duplicate tooling and align teams to common observability, policy, and security patterns.',
    caption: 'Operational shared services available on Azure Commercial',
    headers: ['Category', 'Shared services'],
    rows: [
      ['Monitoring & logging', 'Azure Monitor, Log Analytics, Application Insights, Azure Workbooks'],
      ['Security & compliance', 'Microsoft Defender for Cloud, Azure Policy, Microsoft Sentinel (where enabled)'],
      ['Identity & access', 'Microsoft Entra ID integration, Privileged Identity Management patterns, RBAC baselines'],
      ['Cost management', 'Cost Management + Billing, tagging enforcement, FinOps reporting dashboards'],
      ['Backup & recovery', 'Centralized backup policies, recovery vault standards, retention baselines'],
      ['Automation & DevOps', 'Azure DevOps integration, pipeline templates, infrastructure-as-code guardrails'],
      ['Networking', 'Hub-spoke connectivity, DNS standards, firewall rule review workflows'],
      ['Support', 'CST engagement, office hours, escalation paths, incident coordination'],
    ],
  },
  gettingStarted: {
    paragraphs: [
      'Review prerequisites including EUA access, funding vehicle approval, and application classification before submitting a hosting request. Document integration points, data sensitivity, and operational requirements in the intake form.',
      'Coordinate with your Customer Service Team to schedule discovery, sandbox provisioning, and security assessment milestones. Use approved landing zone patterns and shared services rather than building isolated operational stacks.',
      'When your workload is ready for production, complete the cutover checklist with your CST and security partners. Ongoing changes to approved services or architecture should follow the standard architecture review process.',
    ],
    links: gettingStartedLinks,
  },
})

export const awsCommercialArticle = buildPlatformArticle({
  slug: 'aws-commercial',
  title: 'AWS Commercial Enablement',
  heroSummary:
    'Migrate workloads from AWS GovCloud to AWS Commercial with controls aligned to FISMA High and CMS hybrid-cloud strategy.',
  metadata: {
    updated: 'June 1, 2025',
    owner: 'Cloud Enablement Team',
    cloud: 'AWS Commercial',
    readingTime: '6 min',
  },
  leads: [
    {
      label: 'What it is',
      body: 'AWS Commercial Enablement is the CMS Hybrid Cloud path for hosting applications on standard AWS Commercial regions. It consolidates workloads currently in AWS GovCloud where appropriate and aligns commercial controls with FISMA High expectations through compensating controls and shared guardrails.',
    },
    {
      label: 'Why it matters',
      body: 'This initiative simplifies operations and reduces cost by eliminating GovCloud-to-Commercial transit, broadening service availability, and aligning CMS to a hybrid-cloud strategy. AWS provides control gap analysis; CMS implements and validates compensating controls where commercial baselines differ from HIGH.',
    },
    {
      label: 'How it works',
      body: 'Teams work with CST on intake, landing-zone provisioning, and migration planning. Workloads are onboarded through CMS-managed accounts with centralized logging, security tooling, tagging, and network patterns applied by default.',
    },
    {
      label: 'When it is available',
      body: 'AWS Commercial onboarding follows program prioritization for GovCloud migration candidates and net-new workloads. Applications remain in GovCloud only when exceptional security or compliance needs require an alternative path.',
    },
  ],
  approvedServices: {
    intro:
      'The following AWS Commercial services are approved for CMS Hybrid Cloud workloads. Request exceptions through architecture review before provisioning services outside this catalog.',
    caption: 'Approved AWS Commercial services by category',
    headers: ['Category', 'Approved services'],
    rows: [
      ['Compute', 'EC2, Auto Scaling, Elastic Beanstalk, AWS Batch, AWS Lambda'],
      ['Containers', 'Amazon ECS, Amazon EKS, AWS Fargate, Amazon ECR'],
      ['Storage', 'Amazon S3, EBS, EFS, FSx, Storage Gateway'],
      ['Databases', 'Amazon RDS, Aurora, DynamoDB, ElastiCache, Amazon Redshift'],
      ['Networking', 'VPC, Transit Gateway, Direct Connect, Route 53, ALB/NLB, AWS WAF'],
      ['Security', 'IAM, KMS, Secrets Manager, AWS Shield, AWS Config'],
      ['Integration', 'Amazon SQS, SNS, EventBridge, Step Functions, API Gateway'],
      ['Management', 'CloudWatch, CloudTrail, Systems Manager, AWS Organizations'],
    ],
  },
  operationalServices: {
    intro:
      'Shared operational services on AWS Commercial reduce duplicated tooling and align teams to CMS observability, security, and cost-management standards.',
    caption: 'Operational shared services available on AWS Commercial',
    headers: ['Category', 'Shared services'],
    rows: [
      ['Monitoring & logging', 'CloudWatch, CloudTrail, centralized log aggregation, operational dashboards'],
      ['Security & compliance', 'GuardDuty, Security Hub, Config rules, vulnerability scanning baselines'],
      ['Identity & access', 'IAM role standards, SSO integration, least-privilege baselines'],
      ['Cost management', 'Cost Explorer, tagging enforcement, FinOps reporting, budget alerts'],
      ['Backup & recovery', 'AWS Backup policies, cross-region recovery patterns, retention standards'],
      ['Automation & DevOps', 'CI/CD templates, infrastructure-as-code guardrails, pipeline integrations'],
      ['Networking', 'Hub-spoke VPC design, DNS standards, firewall review workflows'],
      ['Support', 'CST engagement, office hours, escalation paths, incident coordination'],
    ],
  },
  gettingStarted: {
    paragraphs: [
      'Confirm EUA access, funding approval, and workload classification before submitting a hosting request. Document data flows, integrations, and GovCloud migration dependencies in the intake package.',
      'Partner with CST to schedule discovery, sandbox validation, and security assessment. Use CMS landing-zone patterns and shared services instead of building isolated operational stacks.',
      'Complete the production cutover checklist with CST and security assessors. Architecture changes or non-catalog services require standard architecture review approval.',
    ],
    links: gettingStartedLinks,
  },
})

export const awsOutpostsArticle = buildPlatformArticle({
  slug: 'aws-outposts',
  title: 'AWS Outposts Enablement',
  heroSummary:
    'AWS infrastructure delivered on premises for workloads that require low-latency or data residency patterns within CMS-controlled facilities.',
  metadata: {
    updated: 'June 1, 2025',
    owner: 'Cloud Enablement Team',
    cloud: 'AWS Outposts',
    readingTime: '5 min',
  },
  leads: [
    {
      label: 'What it is',
      body: 'AWS Outposts brings AWS compute, storage, and networking services into CMS data center space. It supports migrating managed applications from on-premises IaaS x86 infrastructure to a consistent AWS operational model while meeting locality requirements.',
    },
    {
      label: 'Why it matters',
      body: 'Outposts reduces operational variance between cloud and on-premises estates, enables teams to use familiar AWS APIs and tooling, and supports workloads that cannot move to public regions due to latency, residency, or integration constraints.',
    },
    {
      label: 'How it works',
      body: 'CMS provisions Outposts racks in approved facilities and connects them to the CMS Hybrid Cloud network fabric. Workloads are onboarded through CST with the same tagging, monitoring, and security baselines used in AWS Commercial accounts.',
    },
    {
      label: 'When it is available',
      body: 'Outposts onboarding is available for prioritized migration candidates from managed on-premises infrastructure. Capacity and facility readiness are coordinated with infrastructure and CST teams before workload scheduling.',
    },
  ],
  approvedServices: {
    intro:
      'Approved AWS Outposts services mirror core AWS Commercial capabilities available on the Outposts rack. Request exceptions before provisioning non-listed services.',
    caption: 'Approved AWS Outposts services by category',
    headers: ['Category', 'Approved services'],
    rows: [
      ['Compute', 'EC2 instances supported on Outposts, Auto Scaling (where available)'],
      ['Containers', 'Amazon ECS on Outposts, Amazon EKS on Outposts (where enabled)'],
      ['Storage', 'Amazon EBS on Outposts, Amazon S3 on Outposts, local instance storage'],
      ['Networking', 'VPC, local gateways, Direct Connect integration, Route 53 Resolver'],
      ['Databases', 'Amazon RDS on Outposts (approved engines), ElastiCache on Outposts'],
      ['Management', 'CloudWatch, Systems Manager, CloudTrail integration'],
    ],
  },
  operationalServices: {
    intro:
      'Outposts workloads inherit CMS Hybrid Cloud shared services for observability, security, and operational support across hybrid estates.',
    caption: 'Operational shared services for AWS Outposts',
    headers: ['Category', 'Shared services'],
    rows: [
      ['Monitoring & logging', 'CloudWatch metrics, centralized logging, hybrid dashboards'],
      ['Security & compliance', 'Config rules, vulnerability scanning, patch baselines'],
      ['Identity & access', 'IAM standards, SSO integration, privileged access patterns'],
      ['Facility operations', 'Rack health monitoring, capacity planning, maintenance windows'],
      ['Networking', 'Hybrid connectivity standards, DNS integration, firewall workflows'],
      ['Support', 'CST engagement, AWS Outposts support coordination, incident management'],
    ],
  },
  gettingStarted: {
    paragraphs: [
      'Document residency, latency, and integration requirements that justify Outposts hosting. Include current on-premises footprint and migration constraints in the intake request.',
      'Work with CST and infrastructure teams to validate facility readiness, network connectivity, and rack capacity before sandbox provisioning.',
      'Follow staged onboarding: discovery, pilot workload, security assessment, and production cutover with shared monitoring and backup policies applied.',
    ],
    links: gettingStartedLinks,
  },
})

export const googleCloudPlatformArticle: PlatformArticlePage = {
  slug: 'google-cloud-platform',
  title: 'Google Cloud Platform (GCP) Enablement',
  heroSummary:
    "Google Cloud Platform (GCP) is Google's cloud for running infrastructure, containers, analytics, AI, and security-focused workloads—with patterns that fit CMS hybrid and multi-cloud strategy.",
  heroImageSrc: PLATFORM_HERO_IMAGE,
  heroImageAlt: PLATFORM_HERO_ALT,
  metadata: {
    updated: 'June 1, 2025',
    owner: 'Cloud Enablement Team',
    cloud: 'Google Cloud Platform',
    readingTime: '6 min',
  },
  sectionIds: ['why-consider-google-cloud', 'approved-hosting-options', 'shared-services', 'getting-started'],
  lastUpdated: 'June 1, 2025',
  sections: [
    {
      id: 'why-consider-google-cloud',
      navLabel: 'Why Consider Google Cloud?',
      heading: 'Why Consider Google Cloud?',
      type: 'leads',
      items: [
        {
          label: 'Multi-cloud resilience',
          body: 'Reduce dependency on a single cloud provider by hosting select workloads on GCP alongside AWS and Azure—improving continuity, portability, and negotiation leverage across the CMS estate.',
        },
        {
          label: 'AI and analytics',
          body: 'Use Vertex AI, BigQuery, and managed data services for analytics, machine learning, and data-driven missions—without standing up duplicate data platforms.',
        },
        {
          label: 'Container leadership',
          body: 'GKE and Cloud Run provide mature paths for containerized applications, from fully managed serverless containers to enterprise Kubernetes clusters.',
        },
        {
          label: 'Hybrid flexibility',
          body: 'Google Distributed Cloud options support workloads that need on-premises or dedicated hosting while preserving cloud-style operations and tooling.',
        },
        {
          label: 'Modernization path',
          body: 'Support lift-and-shift, replatform, and cloud-native development with a consistent operational model aligned to CMS Hybrid Cloud guardrails.',
        },
      ],
    },
    {
      id: 'approved-hosting-options',
      navLabel: 'Approved Hosting Options',
      heading: 'Approved Hosting Options',
      type: 'table',
      table: {
        caption: 'Approved GCP hosting options',
        headers: ['Service', 'Environment', 'Best for', 'Why it stands out'],
        rowHeaderColumn: false,
        rows: [
          [
            'Cloud Run',
            'Serverless (fully managed)',
            'Stateless APIs, event-driven apps, and microservices',
            'No cluster management; auto-scales; pay for active request time',
          ],
          [
            'GKE Standard',
            'Google Kubernetes Engine',
            'Containerized workloads that need Kubernetes control',
            'Managed control plane with CMS landing-zone integration',
          ],
          [
            'GKE Enterprise',
            'Enterprise Kubernetes',
            'Regulated or multi-team clusters with policy needs',
            'Advanced policy, configuration management, and enterprise support',
          ],
          [
            'Google Distributed Cloud Virtual',
            'Hybrid / on-premises',
            'Locality-sensitive workloads with GCP operational consistency',
            'Run Google Cloud services in CMS-controlled data center space',
          ],
          [
            'Google Distributed Cloud Hosted',
            'Dedicated / partner-hosted',
            'High-isolation or dedicated hosting requirements',
            'Physically isolated environment operated with Google',
          ],
        ],
      },
    },
    {
      id: 'shared-services',
      navLabel: 'Shared Services',
      heading: 'Shared Services Available Today',
      type: 'leads',
      items: [
        {
          label: 'Observability',
          body: 'Centralized logging, metrics, and alerting integrated with CMS operational dashboards and incident workflows.',
        },
        {
          label: 'Security and governance',
          body: 'Organization policies, vulnerability management, and identity federation aligned to CMS security standards.',
        },
        {
          label: 'FinOps and cost management',
          body: 'Labeling enforcement, budgets, billing export, and chargeback reporting for accountable cloud spend.',
        },
        {
          label: 'Backup and recovery',
          body: 'Standard backup policies and recovery patterns for GCP-hosted workloads across approved regions.',
        },
        {
          label: 'AI and data services',
          body: 'Curated data and AI services for approved analytics, automation, and mission use cases.',
        },
      ],
    },
    {
      id: 'getting-started',
      navLabel: 'Getting Started',
      heading: 'Getting Started',
      type: 'prose',
      paragraphs: [
        'Discuss your business drivers and workload profile with CST—including data classification, integrations, availability requirements, and whether shared AWS services apply.',
        'Identify whether your workload fits Cloud Run, GKE, or hybrid distributed cloud options before sandbox provisioning and architecture review.',
      ],
      links: gettingStartedLinks,
    },
  ],
}

export const oracleCloudInfrastructureArticle: PlatformArticlePage = {
  slug: 'oracle-cloud-infrastructure',
  title: 'Oracle Enablement',
  heroSummary:
    'Oracle Cloud Infrastructure (OCI) is Oracle\'s cloud platform for enterprise applications, databases, and middleware—with deployment options across public OCI and Oracle Cloud@Customer in CMS facilities.',
  heroImageSrc: PLATFORM_HERO_IMAGE,
  heroImageAlt: PLATFORM_HERO_ALT,
  metadata: {
    updated: 'June 1, 2024',
    owner: 'Cloud Enablement Team',
    cloud: 'Oracle Cloud Infrastructure',
    readingTime: '7 min',
  },
  sectionIds: [
    'what-it-is',
    'why-customers-choose',
    'how-it-works',
    'availability',
    'approved-services',
    'operational-shared-services',
    'getting-started',
  ],
  lastUpdated: 'June 1, 2024',
  sections: [
    {
      id: 'what-it-is',
      navLabel: 'What it is',
      heading: 'What it is',
      type: 'prose',
      paragraphs: [
        'Oracle Cloud Infrastructure (OCI) is Oracle\'s cloud platform for running enterprise applications, databases, and middleware. CMS uses OCI for Oracle-centric workloads that benefit from native database services, performance-optimized compute, and flexible deployment across public cloud regions and Oracle Cloud@Customer (OCC) in CMS data centers.',
      ],
    },
    {
      id: 'why-customers-choose',
      navLabel: 'Why customers choose it',
      heading: 'Why customers choose it',
      type: 'leads',
      items: [
        {
          label: 'Security and compliance',
          body: 'FedRAMP-authorized infrastructure and CMS guardrails for mission-critical systems and sensitive healthcare data.',
        },
        {
          label: 'Performance for Oracle workloads',
          body: 'Exadata, Autonomous Database, and optimized compute for database-heavy and Oracle application portfolios.',
        },
        {
          label: 'Modernization support',
          body: 'Paths to upgrade legacy Oracle estates while aligning architecture, operations, and documentation to hybrid cloud standards.',
        },
        {
          label: 'Deployment flexibility',
          body: 'Run in OCI public regions or Oracle Cloud@Customer when residency, latency, or integration needs require on-premises hosting.',
        },
        {
          label: 'Predictable cost planning',
          body: 'Consolidation and right-sizing support with FinOps visibility across Oracle-hosted workloads.',
        },
      ],
    },
    {
      id: 'how-it-works',
      navLabel: 'How it works',
      heading: 'How it works',
      type: 'leads',
      items: [
        {
          label: 'OCI public cloud',
          body: 'Workloads deploy in CMS-managed tenancies with standard networking, identity, logging, and monitoring applied by default.',
        },
        {
          label: 'Oracle Cloud@Customer',
          body: 'Select workloads run on OCI-capable infrastructure inside CMS facilities while using the same control plane and APIs as public OCI.',
        },
        {
          label: 'Hybrid networking',
          body: 'FastConnect and CMS network standards connect OCI to AWS, Azure, on-premises systems, and shared operational services.',
        },
      ],
    },
    {
      id: 'availability',
      navLabel: 'Availability',
      heading: 'Availability',
      type: 'prose',
      paragraphs: [
        'OCI services are available for prioritized Oracle workloads following CMS program roadmap milestones. The approved service catalog expands as shared operational integrations are validated. Contact CST for current onboarding windows, tenancy readiness, and Cloud@Customer facility availability.',
      ],
    },
    {
      id: 'approved-services',
      navLabel: 'Approved services',
      heading: 'Approved services',
      type: 'leads',
      items: [
        {
          label: 'Database',
          body: 'Oracle Database Cloud Service, Autonomous Database, Exadata Cloud Service, and MySQL HeatWave (where approved).',
        },
        {
          label: 'Middleware',
          body: 'WebLogic, Oracle Integration Cloud, API Gateway, and related integration services for approved workloads.',
        },
        {
          label: 'Enterprise applications',
          body: 'Oracle ERP, HCM, and other approved SaaS or PaaS offerings based on mission requirements.',
        },
        {
          label: 'Infrastructure',
          body: 'Compute, networking, object and block storage, and Oracle Kubernetes Engine (OKE).',
        },
        {
          label: 'Analytics and AI',
          body: 'OCI AI services, analytics cloud, and data integration tooling for approved analytics and automation use cases.',
        },
      ],
    },
    {
      id: 'operational-shared-services',
      navLabel: 'Operational shared services',
      heading: 'Operational shared services',
      type: 'leads',
      items: [
        {
          label: 'Identity and access management',
          body: 'Federation, IAM policies, and privileged access patterns aligned to CMS standards.',
        },
        {
          label: 'Networking',
          body: 'VCN standards, firewall review workflows, DNS integration, and hybrid connectivity.',
        },
        {
          label: 'Security',
          body: 'Cloud Guard, Vault, Bastion, and vulnerability management baselines.',
        },
        {
          label: 'Observability',
          body: 'OCI Monitoring and Logging integrated with CMS operational dashboards.',
        },
        {
          label: 'Logging',
          body: 'Centralized log forwarding, retention standards, and audit support.',
        },
        {
          label: 'Alerting',
          body: 'Standard alerting integrations with CMS incident and escalation channels.',
        },
        {
          label: 'Security monitoring',
          body: 'SIEM integration and continuous compliance checks across OCI estates.',
        },
        {
          label: 'Backup and disaster recovery',
          body: 'Backup policies, cross-region recovery patterns, and DR runbooks.',
        },
        {
          label: 'Automation',
          body: 'Infrastructure-as-code guardrails, pipeline templates, and operational automation.',
        },
      ],
    },
    {
      id: 'getting-started',
      navLabel: 'Getting started',
      heading: 'Getting started',
      type: 'prose',
      paragraphs: [
        'Engage CST early to document Oracle licensing, database dependencies, and migration constraints. Complete intake with workload classification, integration maps, and residency requirements.',
        'Schedule discovery and sandbox provisioning to validate connectivity, backup, and monitoring before production planning. Contact the OIT Customer Support Team for intake guidance and architecture review scheduling.',
      ],
      bullets: [
        'Confirm EUA access and funding approval before provisioning.',
        'Use CMS-approved landing zone and compartment structures.',
        'Complete security assessment milestones before production cutover.',
      ],
      links: gettingStartedLinks,
    },
  ],
}

export const oracleAtCustomerArticle = buildPlatformArticle({
  slug: 'oracle-at-customer',
  title: 'Oracle Cloud@Customer Enablement',
  heroSummary:
    "Oracle's hosting solution that brings Oracle Cloud Infrastructure capabilities directly into CMS-controlled data center space.",
  metadata: {
    updated: 'June 1, 2025',
    owner: 'Cloud Enablement Team',
    cloud: 'Oracle Cloud@Customer',
    readingTime: '5 min',
  },
  leads: [
    {
      label: 'What it is',
      body: 'Oracle Cloud@Customer delivers OCI services inside CMS facilities, combining cloud-style operations with on-premises data residency. It supports Oracle workloads that require local processing while maintaining a consistent OCI control plane.',
    },
    {
      label: 'Why it matters',
      body: 'Cloud@Customer addresses residency, latency, and legacy integration needs for Oracle-centric portfolios without sacrificing the operational model teams expect from cloud platforms.',
    },
    {
      label: 'How it works',
      body: 'Oracle installs and operates Cloud@Customer infrastructure in approved CMS data centers. CMS connects the estate to hybrid networking, identity, and monitoring services through CST-guided onboarding.',
    },
    {
      label: 'When it is available',
      body: 'Cloud@Customer onboarding is available for prioritized Oracle workloads following facility readiness and program roadmap milestones. Capacity planning is coordinated with infrastructure and CST teams.',
    },
  ],
  approvedServices: {
    intro:
      'Approved Cloud@Customer services mirror core OCI capabilities delivered in the customer data center. Request exceptions through architecture review.',
    caption: 'Approved Oracle Cloud@Customer services by category',
    headers: ['Category', 'Approved services'],
    rows: [
      ['Compute', 'OCI compute shapes available on Cloud@Customer racks'],
      ['Databases', 'Oracle Database Cloud Service, Autonomous Database on Cloud@Customer'],
      ['Storage', 'Object Storage, Block Volumes (rack-supported services)'],
      ['Networking', 'VCN, load balancing, local connectivity to CMS network fabric'],
      ['Security', 'IAM, Vault, Bastion, Cloud Guard (where enabled)'],
    ],
  },
  operationalServices: {
    intro:
      'Cloud@Customer workloads use CMS Hybrid Cloud shared services for hybrid observability, security, and operational support.',
    caption: 'Operational shared services for Oracle Cloud@Customer',
    headers: ['Category', 'Shared services'],
    rows: [
      ['Monitoring & logging', 'OCI Monitoring and Logging integration, hybrid dashboards'],
      ['Security & compliance', 'Cloud Guard, security zones, patch and vulnerability baselines'],
      ['Facility operations', 'Rack health monitoring, maintenance windows, capacity planning'],
      ['Database operations', 'Backup standards, patching cadence, HA patterns'],
      ['Networking', 'Hybrid connectivity, DNS integration, firewall workflows'],
      ['Support', 'CST engagement, Oracle support coordination, incident management'],
    ],
  },
  gettingStarted: {
    paragraphs: [
      'Document residency, latency, and Oracle licensing requirements that justify Cloud@Customer hosting. Include facility and integration constraints in the intake package.',
      'Work with CST and infrastructure teams to confirm rack readiness, network connectivity, and security assessment scheduling.',
      'Follow staged onboarding: discovery, pilot workload, assessment, and production cutover with shared monitoring and backup policies applied.',
    ],
    links: gettingStartedLinks,
  },
})

const platformArticles: PlatformArticlePage[] = [
  awsCommercialArticle,
  awsOutpostsArticle,
  azureCommercialArticle,
  googleCloudPlatformArticle,
  oracleCloudInfrastructureArticle,
  oracleAtCustomerArticle,
]

export function getPlatformArticleBySlug(slug: string): PlatformArticlePage | undefined {
  return platformArticles.find((page) => page.slug === slug)
}

export const platformArticleSlugs = new Set(platformArticles.map((page) => page.slug))
