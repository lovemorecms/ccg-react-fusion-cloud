export const gcpPageTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'security', label: 'Security & Governance' },
  { id: 'access', label: 'Access & Operations' },
  { id: 'resources', label: 'Resources' },
] as const

export const gcpHero = {
  title: 'Google Cloud Platform',
  lede: 'The foundation for secure and scalable digital services.',
  body: 'CMS uses Google Cloud Platform to deliver reliable, compliant, and mission-critical solutions. Explore the architecture, governance model, and operating principles that support our cloud environment.',
  finds: [
    'Cloud Foundation',
    'Architecture Standards',
    'Governance & Compliance',
    'Operations & Reliability',
  ],
  status: {
    label: 'Platform status',
    title: 'All systems operational',
    detail: 'us-east4 · Last checked 2 min ago',
  },
  stats: [
    { label: 'Active Projects', value: '200+', tone: 'sky' },
    { label: 'Managed VPCs', value: '80+', tone: 'mint' },
    { label: 'FedRAMP Status', value: 'High', tone: 'gold' },
    { label: 'ATO Coverage', value: 'FISMA', tone: 'blue' },
  ],
} as const

export const gcpGlance = [
  'Global infrastructure with high availability',
  'Built-in security and compliance controls',
  'Advanced data and analytics capabilities',
  'Flexible solutions for every workload',
]

export const gcpQuickRequests = [
  'Request a new Virtual Private Cloud',
  'Request additional IP space',
  'Request CMSNet connectivity',
  'Request Virtual Private Cloud Peering',
  'Request Virtual Private Cloud Decommissioning',
]

export const gcpStandardVpc = [
  'Dedicated VPCs for each environment (Dev, Impl, Prod, etc.)',
  'One /25 private subnet',
  'One optional /27 public subnet (not provisioned by default)',
  'Deployment in the us-east4 region',
]

export const gcpSupportCards = [
  {
    title: 'Request a new Virtual Private Cloud',
    desc: 'See Shared Virtual Private Cloud documentation for more information.',
  },
  {
    title: 'Request additional IP space',
    desc: 'Allows users to request additional subnet ranges or IP space for Kubernetes/container workflows.',
  },
  {
    title: 'Request CMSNet connectivity',
    desc: 'Allows users to establish connectivity between their CMS Hybrid Cloud Virtual Private Cloud and CMS Data Center networks.',
  },
  {
    title: 'Request Virtual Private Cloud Peering',
    desc: 'Allows users to establish connectivity between Virtual Private Clouds.',
  },
  {
    title: 'Request Virtual Private Cloud Decommissioning',
    desc: 'Allows users to request removal of unused Virtual Private Cloud environments.',
  },
]

export const gcpFeatures = [
  {
    title: 'N-Tier Architecture & Firewall Rule Separation',
    body: 'Users can implement multi-tier architectures within their VPCs, allowing separation of web, application, data, and additional workload tiers using firewall rules and network controls.',
    doc: null as string | null,
  },
  {
    title: 'Transit Connectivity',
    body: 'CMS Hybrid Cloud leverages Network Connectivity Center (NCC) to provide connectivity to shared services such as Zscaler, Active Directory, and Security Compliance Scanning.',
    doc: 'https://cloud.google.com/network-connectivity/docs/router',
  },
  {
    title: 'Virtual Private Cloud Peering',
    body: 'CMS Hybrid Cloud supports Virtual Private Cloud peering between approved environments. Contact the Customer Support Team if you require assistance with Virtual Private Cloud peering.',
    doc: null,
  },
  {
    title: 'CMSNet Connectivity',
    body: 'CMS Hybrid Cloud supports connectivity between Google Cloud VPCs and CMS Data Center networks. Contact the Customer Support Team for assistance with CMSNet connectivity requests.',
    doc: null,
  },
]

export const gcpBestPractices = [
  {
    title: 'Using Virtual Private Cloud Firewall Rules',
    items: [
      'Create firewall rules that only allow the minimum connectivity needed for applications to operate.',
      'Prefer workload-specific firewall rules over broad CIDR-based access.',
      'Separate workloads into logical application tiers whenever possible.',
    ],
    doc: 'https://cloud.google.com/vpc/docs/firewalls',
  },
  {
    title: 'Using Private Subnets and Connecting to the Internet',
    items: [
      'Verify that only approved resources are accessible from the public internet.',
      'Deploy public load balancers only where required.',
      'Keep workloads in private subnets whenever possible.',
      'Private workloads can access the internet through approved outbound connectivity services.',
    ],
    doc: 'https://cloud.google.com/nat/docs/overview',
  },
  {
    title: 'Starting with the Three-Tier (minimum) Architecture',
    items: [
      'At a minimum, ADOs are required to comply with the CMS defined Three-Tier Architecture by isolating resources that fall into the web tier, app tier, and data tier.',
      'Users may choose to add additional tiers, isolating all components and enabling functional communication only as needed.',
    ],
    doc: null as string | null,
  },
]

export const gcpHostingModel = [
  {
    label: 'Separate Projects',
    desc: 'Each environment lives in its own Google Cloud project with independent billing and access control.',
  },
  {
    label: 'Dedicated VPCs',
    desc: 'Dev, Impl, Prod, and other environments each receive a dedicated Virtual Private Cloud.',
  },
  {
    label: 'Folder Hierarchy',
    desc: 'Centralized folder structure enforces governance policies and organization controls across all projects.',
  },
]

export const gcpVpcConfig = [
  'Workloads deployed into private subnets',
  'Cloud NAT for outbound internet connectivity',
  'External IP usage centrally restricted',
  'Virtual Private Cloud peering is approval-based',
  'IPv4-only networking enforced',
  'Cloud Router for hybrid connectivity',
]

export const gcpFirewallTags = [
  'Organization Policies',
  'Centralized firewall governance',
  'Approved service restrictions',
  'Approved region restrictions',
  'Security Command Center',
  'Wiz security monitoring',
  'Centralized logging',
  'Centralized monitoring',
]

export const gcpIamItems = [
  'Group-based access controls',
  'Organization-level governance',
  'PAM / JIT privileged access workflows',
  'Time-limited privileged access',
  'Admin and read-only role separation',
  'Service account key creation restricted',
]

export const gcpGoldImages = [
  { label: 'Trusted image sources', desc: 'All images sourced from approved, vetted repositories.' },
  { label: 'Centralized patching governance', desc: 'Patch cycles are managed centrally to ensure consistency.' },
  { label: 'OS Config management', desc: 'OS Config enforces configuration baselines across VMs.' },
]

export const gcpConnectivity = [
  { label: 'CMS Data Center', sub: 'On-Premises' },
  { arrow: 'VPN / Interconnect' },
  { label: 'Network Connectivity Center', sub: 'NCC Hub' },
  { arrow: 'Cloud Router' },
  { label: 'Shared Virtual Private Cloud', sub: 'Host Project' },
  { arrow: 'VPC Peering' },
  { label: 'Workload VPCs', sub: 'Dev / Impl / Prod' },
] as const

export const gcpReusable = [
  { label: 'Phase flow', desc: 'Onboarding Review → Discovery Call → Questionnaire → Follow-Up → Final Recommendation, plus Periodic Review.' },
  { label: 'Finding classification', desc: 'The high-risk / medium-risk language used today.' },
  { label: 'Review cadence', desc: 'Annual or quarterly reviews, plus trigger events (go-live, major architectural change).' },
  { label: 'Improvement plan structure', desc: 'Same template and the same risk-versus-complexity-versus-business-impact prioritization.' },
  { label: 'Role pattern', desc: 'A customer team paired with a reviewer, a coordinator, and vendor technical support.' },
]

export const gcpNonTransferable = [
  { item: 'In-console workload object', gap: 'No equivalent', mitigation: 'Maintain a CMS-owned Workload Worksheet (Confluence/SharePoint)' },
  { item: 'Structured questionnaire in console', gap: 'No equivalent', mitigation: 'Build and version-control a CMS Google Cloud WAR Questionnaire' },
  { item: 'Auto-generated risk dashboard', gap: 'No point-in-time view', mitigation: 'Continuous signal via Security Command Center + Active Assist, summarized manually' },
  { item: 'Auto-generated improvement plan', gap: 'No equivalent', mitigation: 'Manual plan structured to match the AWS WAFR template for cross-cloud consistency' },
  { item: 'Published framework lenses', gap: 'Only AI/ML lens published', mitigation: 'Decide whether CMS authors internal lenses for healthcare workloads or accepts the gap' },
  { item: 'Vendor tool training in-console', gap: 'No equivalent', mitigation: 'Discovery call shifts to Architecture Center walkthrough + Active Assist tour' },
]

export const gcpSecurityCards = [
  {
    title: 'Identity and Access Management',
    desc: 'Role-based access control using Google Cloud IAM ensures least-privilege access across all environments. Service accounts and workload identity federation are used for secure machine-to-machine authentication.',
  },
  {
    title: 'Security Command Center',
    desc: 'Centralized visibility into security findings, misconfigurations, and vulnerabilities across all Google Cloud projects under CMS Hybrid Cloud management.',
  },
  {
    title: 'Logging & Audit Trails',
    desc: 'All Google Cloud audit logs are forwarded to Splunk for centralized analysis. Log sinks capture Admin Activity, Data Access, and System Event logs for compliance and forensics.',
  },
  {
    title: 'Policy & Compliance Controls',
    desc: 'Organization policies enforce baseline controls such as restricting external IP addresses, enforcing uniform bucket access, and requiring OS Login for compute instances.',
  },
]

export const gcpOpsCards = [
  { title: 'Console Access', desc: 'Access Google Cloud Console via federated SSO through your CMS credentials. MFA is required for all console logins.' },
  { title: 'Privileged Access Management', desc: 'Request elevated permissions through the PAM workflow. Access is time-limited and fully logged.' },
  { title: 'Service Accounts', desc: 'Machine identities for automated workloads. Managed with key rotation policies and workload identity federation.' },
  { title: 'Monitoring & Alerting', desc: 'Cloud Monitoring dashboards, uptime checks, and alerting policies keep your environment observable and resilient.' },
  { title: 'Cost Management', desc: 'Project-level billing exports, budget alerts, and committed use discounts help teams manage cloud spend responsibly.' },
  { title: 'Support & Ticketing', desc: 'Submit operational requests and incident reports through the CMS Hybrid Cloud support portal.' },
]

export const gcpGoogleDocs = [
  { label: 'Virtual Private Cloud Overview', url: 'https://cloud.google.com/vpc/docs/overview' },
  { label: 'Firewall Rules', url: 'https://cloud.google.com/vpc/docs/firewalls' },
  { label: 'Cloud NAT Overview', url: 'https://cloud.google.com/nat/docs/overview' },
  { label: 'Network Connectivity Center', url: 'https://cloud.google.com/network-connectivity/docs/router' },
  { label: 'IAM Documentation', url: 'https://cloud.google.com/iam/docs' },
  { label: 'Well-Architected Framework', url: 'https://cloud.google.com/architecture/framework' },
]

export const gcpCmsDocs = [
  { label: 'Fusion Info Center', url: '/learn/knowledge-center' },
  { label: 'Support & Help Portal', url: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22' },
  { label: 'Get Started', url: '/#pathways' },
  { label: 'Training & Enablement', url: '/learn/training-enablement' },
]
