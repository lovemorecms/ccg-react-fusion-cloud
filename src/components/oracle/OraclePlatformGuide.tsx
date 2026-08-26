import { useState, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../FusionButton'

const C = {
  deepBg: 'var(--fusion-deep-sea-900)',
  mainBg: 'var(--fusion-deep-sea-900)',
  cardBg: 'color-mix(in srgb, var(--fusion-deep-sea-900) 62%, var(--fusion-deep-sea-800))',
  hoverBg: 'color-mix(in srgb, var(--fusion-deep-sea-800) 86%, var(--fusion-deep-sea-500))',
  sidebarBg: 'var(--fusion-deep-sea-900)',
  textPrimary: '#ffffff',
  textSecondary: 'color-mix(in srgb, var(--fusion-deep-sea-100) 62%, var(--fusion-deep-sea-50))',
  textMuted: 'var(--fusion-deep-sea-100)',
  cmsBlue: '#6eb6ff',
  azure: '#6eb6ff',
  gold: '#dfb01c',
  amber: '#dfb01c',
  green: '#34A853',
  red: '#C74634',
  oracleRed: '#C74634',
  border: 'color-mix(in srgb, #ffffff 7%, transparent)',
  borderMid: 'color-mix(in srgb, #ffffff 13%, transparent)',
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'security', label: 'Security & Compliance' },
  { id: 'operations', label: 'Operations' },
  { id: 'resources', label: 'Resources' },
]

const SIDEBAR_LINKS: Record<string, { id: string; label: string }[]> = {
  services: [
    { id: 'svc-database', label: 'Database Services' },
    { id: 'svc-middleware', label: 'Middleware' },
    { id: 'svc-enterprise', label: 'Enterprise Applications' },
    { id: 'svc-infrastructure', label: 'Infrastructure' },
    { id: 'svc-analytics', label: 'Analytics & AI' },
  ],
  architecture: [
    { id: 'arch-oci', label: 'OCI Architecture' },
    { id: 'arch-exacc', label: 'ExaCC' },
    { id: 'arch-networking', label: 'Networking & VCN' },
    { id: 'arch-hybrid', label: 'Hybrid Connectivity' },
  ],
  security: [
    { id: 'sec-fedramp', label: 'FedRAMP & FISMA' },
    { id: 'sec-iam', label: 'Identity & Access' },
    { id: 'sec-governance', label: 'Security & Governance' },
  ],
  operations: [
    { id: 'ops-shared', label: 'Shared Services Overview' },
    { id: 'ops-monitoring', label: 'Monitoring & Observability' },
    { id: 'ops-logging', label: 'Logging' },
    { id: 'ops-backup', label: 'Backup & Disaster Recovery' },
    { id: 'ops-automation', label: 'Automation' },
  ],
  resources: [
    { id: 'res-getting-started', label: 'Getting Started' },
    { id: 'res-support', label: 'Getting Support' },
    { id: 'res-reference', label: 'Documentation & Reference' },
    { id: 'res-ato', label: 'Compliance & ATO' },
  ],
}

// ─── Shared small components ─────────────────────────────────────────────────

function HomeTabIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="11"
      height="11"
      viewBox="0 0 13 13"
      fill="none"
      className="gcp-tabs__home"
      style={{ opacity: active ? 1 : 0.55 }}
    >
      <path
        d="M1 5.5L6.5 1 12 5.5V12H8.5V8.5H4.5V12H1V5.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity="0.25"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ display: 'inline', marginLeft: 3 }}>
      <path d="M10 6.5V10H2V2h3.5V1H2C1.448 1 1 1.448 1 2v8c0 .552.448 1 1 1h8c.552 0 1-.448 1-1V6.5h-1zM7 1v1h2.293L4.146 7.146l.708.708L10 2.707V5h1V1H7z" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ display: 'inline', flexShrink: 0 }}>
      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Callout({ text, accent = '#6eb6ff', bg = 'color-mix(in srgb, #6eb6ff 7%, transparent)' }: { text: string; accent?: string; bg?: string }) {
  return (
    <div style={{ borderLeft: `4px solid ${accent}`, background: bg, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '22px 28px', margin: '28px 0' }}>
      <p style={{ fontSize: '1rem', fontWeight: 500, color: C.textPrimary, margin: 0, lineHeight: 1.7 }}>{text}</p>
    </div>
  )
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="explore-section-heading gcp-guide__h2">{children}</h2>
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="gcp-guide__h3">{children}</h3>
}

function _H4({ children }: { children: ReactNode }) {
  return <h4 className="gcp-guide__h4">{children}</h4>
}

function Body({ children, mb = 20 }: { children: ReactNode; mb?: number }) {
  return <p className="gcp-guide__body-copy" style={{ marginBottom: mb }}>{children}</p>
}

function Divider() {
  return <div style={{ height: 1, background: C.border, margin: '28px 0' }} />
}

function Card({ title, children, accent }: { title?: string; children: ReactNode; accent?: string }) {
  return (
    <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderLeft: accent ? `3px solid ${accent}` : undefined, borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
      {title && (
        <div style={{ padding: '12px 18px', borderBottom: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.textPrimary }}>{title}</div>
        </div>
      )}
      <div style={{ padding: '16px 18px' }}>{children}</div>
    </div>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre style={{ background: 'var(--fusion-deep-sea-1000)', color: 'var(--fusion-deep-sea-100)', margin: '16px 0', padding: '16px 20px', fontSize: '0.8rem', fontFamily: 'var(--font-family-mono, var(--font-family-body))', lineHeight: 1.7, overflowX: 'auto', borderRadius: 6, border: `1px solid ${C.border}` }}>
      {children}
    </pre>
  )
}

function Mono({ children }: { children: ReactNode }) {
  return <code style={{ fontFamily: 'var(--font-family-mono, var(--font-family-body))', background: 'color-mix(in srgb, #6eb6ff 12%, transparent)', color: C.azure, padding: '1px 6px', borderRadius: 3, fontSize: '0.85em' }}>{children}</code>
}

function Bullet({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: '0 0 16px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: C.textSecondary, lineHeight: 1.7 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.cmsBlue, marginTop: 8, flexShrink: 0 }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function NumList({ items }: { items: ReactNode[] }) {
  return (
    <ol style={{ margin: '0 0 16px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, fontSize: '0.9rem', color: C.textSecondary, lineHeight: 1.7 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.mainBg, border: `1px solid ${C.borderMid}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: C.textSecondary, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

function Table({ heads, rows }: { heads: string[]; rows: (ReactNode[])[] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: C.mainBg }}>
            {heads.map(h => (
              <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 400, color: C.textPrimary, borderBottom: `1px solid ${C.borderMid}`, borderRight: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? C.cardBg : C.mainBg }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '10px 14px', color: C.textSecondary, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, verticalAlign: 'top', lineHeight: 1.6 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Overview sub-sections ────────────────────────────────────────────────────

function OvIntro() {
  return (
    <div>
      <H2>Oracle Cloud Infrastructure Enablement</H2>
      <Body>Oracle Cloud Infrastructure (OCI) is Oracle's enterprise-grade cloud platform designed to host, run, and manage applications and workloads at scale. OCI provides high-performance compute, advanced networking capabilities, and robust security controls while maintaining cost efficiency.</Body>
      <Body>Oracle Exadata Cloud@Customer (ExaCC) delivers high-performance Oracle managed database services inside your data center while keeping a cloud operating model with elastic scaling through an automated database infrastructure. In short: OCI runs in Oracle's cloud. ExaCC runs in your local data center facility.</Body>
      <Callout text="OCI and ExaCC give CMS teams a FedRAMP High-authorized path to enterprise Oracle workloads — whether in Oracle's cloud, on-premises, or as a hybrid deployment." accent={C.oracleRed} bg="rgba(199,70,52,0.07)" />
      <Divider />
      <H3>OCI vs. ExaCC at a Glance</H3>
      <Table
        heads={['Aspect', 'OCI', 'ExaCC']}
        rows={[
          ['Where it runs', "Oracle's public cloud regions", 'Your CMS data center facility'],
          ['Primary use case', 'Full cloud workload portfolio', 'Oracle-managed database services on-premises'],
          ['Data location', 'Oracle cloud region (US)', 'CMS physical data center'],
          ['Scaling model', 'Elastic, on-demand via cloud APIs', 'Automated database infrastructure scaling'],
          ['New capabilities', 'First to receive new OCI services', 'Based on deployment readiness schedule'],
          ['Best for', 'Broadest Oracle service catalog', 'Data residency, compliance, or on-prem control needs'],
        ]}
      />
      <Divider />
      <OvWhy />
      <Divider />
      <OvHow />
      <Divider />
      <OvAvailability />
    </div>
  )
}

function OvWhy() {
  return (
    <div>
      <H2>Why Consider Oracle Cloud?</H2>
      <Body>Oracle Cloud Infrastructure offers a unique combination of enterprise-proven database technology, FedRAMP High compliance, and flexible deployment options that make it especially well-suited for CMS workloads with existing Oracle investments.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {[
          { title: 'Built for security', desc: 'FedRAMP High certified platforms to support regulated and mission-critical workloads. Oracle Cloud has achieved FedRAMP High authorization, providing the highest tier of compliance coverage for federal healthcare systems.' },
          { title: 'Strong database and AI foundation', desc: 'Especially valuable for workloads already using Oracle Database, Exadata, or Oracle AI Database services. Teams can modernize without large-scale rewrites or data migrations to unfamiliar platforms.' },
          { title: 'Ready for performance', desc: 'Optimized for Oracle technologies and enterprise-scale demands. OCI compute and storage are engineered from the ground up to deliver the performance Oracle Database workloads require.' },
          { title: 'Easier modernization', desc: 'Move forward without large-scale rewrites. OCI supports lift-and-shift of existing Oracle workloads, enabling teams to modernize incrementally while maintaining continuity of operations.' },
          { title: 'More deployment choice', desc: 'Use public cloud, on-premises (ExaCC), or a hybrid approach. No other cloud provider offers the same breadth of deployment options for Oracle workloads, giving CMS teams flexibility to match architecture to requirements.' },
          { title: 'Clearer cost planning', desc: 'Gain pricing transparency and make better use of existing Oracle investments. Oracle License Included and BYOL options allow teams to leverage existing agreements, often reducing total cost of ownership.' },
        ].map(({ title, desc }) => (
          <div key={title} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.oracleRed}`, borderRadius: 8, padding: '18px 20px' }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>{title}</div>
            <p style={{ fontSize: '0.9rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
      <Callout text="Oracle Cloud is not a replacement for all CMS cloud workloads — it is the right choice for teams with existing Oracle database dependencies, regulated data that benefits from ExaCC's on-premises model, or workloads that require Oracle-native performance at scale." accent={C.oracleRed} bg="rgba(199,70,52,0.07)" />
    </div>
  )
}

function OvHow() {
  return (
    <div>
      <H2>How It Works</H2>
      <Body>CMS Cloud Fusion provides Oracle Cloud Infrastructure and ExaCC as approved hosting options through the CMS Multi-Cloud program. The two options are complementary and can be used independently or together as part of a hybrid approach.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            label: 'OCI',
            title: 'Oracle Cloud Infrastructure',
            color: C.oracleRed,
            desc: 'Deploy workloads in Oracle cloud regions and consume services like any major cloud platform. OCI offers the widest range of Oracle cloud services and faster access to new capabilities, including compute, storage, networking, database, and AI services — all within a FedRAMP High-authorized boundary.',
          },
          {
            label: 'ExaCC',
            title: 'Exadata Cloud@Customer',
            color: C.gold,
            desc: 'Use Oracle-managed database services installed in your environment. ExaCC delivers Oracle Exadata hardware and software into the CMS physical data center, operated by Oracle as a managed service. This provides all the benefits of Oracle Cloud database services while keeping data and processing within CMS-controlled facilities.',
          },
          {
            label: 'Hybrid',
            title: 'Connected by Design',
            color: C.azure,
            desc: 'Secure, high-speed networking supports hybrid-cloud operations across environments. OCI FastConnect and private peering allow seamless integration between on-premises ExaCC deployments and cloud-hosted OCI workloads, enabling a consistent operating model across both environments.',
          },
        ].map(({ label, title, color, desc }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: `${color}18`, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '18px 8px', gap: 4 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color, textTransform: 'uppercase', textAlign: 'center' }}>{label}</span>
            </div>
            <div style={{ background: C.cardBg, padding: '16px 20px' }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.textPrimary, marginBottom: 6 }}>{title}</div>
              <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <H3>Decision Framework</H3>
      <Body>To determine the right hosting approach, teams should be prepared to discuss business drivers, workload type, availability and recovery requirements, compliance considerations, authentication needs, private connectivity requirements, expected growth, and desired operational capabilities such as centralized logging, monitoring dashboards, and alerting.</Body>
      <Bullet items={[
        'OCI offers the widest range of Oracle cloud services and faster access to new capabilities',
        'ExaCC offers Oracle-managed database services delivered inside the CMS physical data center for added control, compliance, or data residency needs',
        'A hybrid approach can give you the best of both models',
      ]} />
      <Callout text="Work with the OIT Customer Support Team to help determine the best fit for your hosting needs. These discussions help identify the right approved services and ensure the needed shared services are included from day one." accent={C.oracleRed} bg="rgba(199,70,52,0.07)" />
    </div>
  )
}

function OvAvailability() {
  return (
    <div>
      <H2>Availability</H2>
      <Body>Service availability depends on the environment. OCI typically offers the broadest catalog and gets new capabilities first. ExaCC delivers Oracle managed database services in the customer data center, with availability based on deployment readiness.</Body>
      <Callout text="For the latest rollout details, confirm current service availability with the program team before beginning architecture planning for a new system." accent={C.gold} bg="rgba(223,176,28,0.07)" />
      <Divider />
      <H3>Availability by Deployment Model</H3>
      <Table
        heads={['Capability', 'OCI', 'ExaCC']}
        rows={[
          ['Oracle Database', '✓ Available', '✓ Available'],
          ['Autonomous Database', '✓ Available', 'Based on readiness'],
          ['Exadata', '✓ Available', '✓ Available'],
          ['Oracle AI Database services', '✓ Available', 'Based on readiness'],
          ['Data Guard', '✓ Available', '✓ Available'],
          ['Real Application Clusters (RAC)', '✓ Available', '✓ Available'],
          ['Oracle WebLogic', '✓ Available', 'Limited'],
          ['Compute & Storage', '✓ Full catalog', 'Not applicable'],
          ['OCI Networking (VCN)', '✓ Available', 'Via FastConnect'],
          ['New Oracle services', 'First availability', 'Schedule-dependent'],
        ]}
      />
      <Divider />
      <H3>FedRAMP Coverage</H3>
      <Body>OCI Government Cloud maintains FedRAMP High authorization, covering the services available in Oracle's US government cloud regions. Before deploying a new service, verify its FedRAMP authorization status through the FedRAMP Marketplace and confirm it falls within the CMS-approved service boundary.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'FedRAMP Authorization', value: 'High', color: C.red },
          { label: 'Data Residency', value: 'US Only', color: C.azure },
          { label: 'FISMA Coverage', value: 'High / Mod / Low', color: C.gold },
          { label: 'ATO Support', value: 'CMS Cloud ATO', color: C.green },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: '1.0625rem', fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Services sub-sections ────────────────────────────────────────────────────

function SvcDatabase() {
  return (
    <div>
      <H2>Database Services</H2>
      <Body>Oracle Cloud Infrastructure provides the most comprehensive portfolio of Oracle database services available anywhere. CMS teams with existing Oracle Database workloads can migrate to OCI with minimal changes while gaining cloud-scale elasticity, managed patching, and built-in high availability.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Oracle Database', desc: 'Enterprise Oracle Database deployments on OCI, supporting all Oracle Database editions. Suitable for existing OLTP and OLAP workloads with full Oracle compatibility. Available as VM, BM, or Exadata shapes.' },
          { title: 'Autonomous Database', desc: 'Self-driving, self-securing, self-repairing database that automates provisioning, patching, and tuning. Available in Autonomous Transaction Processing (ATP) and Autonomous Data Warehouse (ADW) configurations.' },
          { title: 'Exadata', desc: 'Oracle Exadata Cloud Service delivers the extreme performance and scalability of Exadata in the cloud. Purpose-built for the most demanding Oracle Database workloads with intelligent storage, smart scanning, and in-memory processing.' },
          { title: 'Exadata Cloud@Customer (ExaCC)', desc: 'Brings Oracle Exadata into your CMS data center. Operated by Oracle as a managed service, ExaCC delivers full Exadata capability on-premises with the same cloud APIs and elastic scaling. Ideal for workloads with strict data residency requirements.' },
          { title: 'Oracle AI Database', desc: 'AI-enabled database services for vector search, machine learning model training and inference, and AI-assisted query optimization. Supports enterprise AI workloads built on Oracle data foundations.' },
          { title: 'Data Guard', desc: 'Oracle Data Guard provides automated standby database management for disaster recovery and high availability. Supports synchronous and asynchronous replication across OCI regions or between OCI and ExaCC.' },
          { title: 'Real Application Clusters (RAC)', desc: 'Oracle RAC enables multiple database instances to access a single database, providing horizontal scalability and fault tolerance. Available on Exadata shapes in OCI and on ExaCC.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.oracleRed}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="Selecting the right Oracle database service depends on your workload pattern, performance requirements, and data residency needs. Contact the OIT Customer Support Team for a workload assessment before provisioning." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function SvcMiddleware() {
  return (
    <div>
      <H2>Middleware</H2>
      <Body>Oracle Cloud Infrastructure supports Oracle WebLogic Server and the broader Oracle middleware portfolio, enabling CMS teams to modernize Java EE applications without abandoning proven Oracle middleware investments.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Oracle WebLogic Server', desc: 'The leading Java EE application server, available on OCI as a marketplace image or through Oracle WebLogic Server for OCI — a fully managed, cloud-native deployment model. Supports clustering, high availability, and integration with Oracle Database services.' },
          { title: 'Oracle SOA Suite', desc: 'Service-Oriented Architecture platform for integrating enterprise applications and services. Available on OCI for teams running complex integration patterns across Oracle and non-Oracle systems.' },
          { title: 'Oracle Service Bus', desc: 'Enterprise Service Bus for mediation, transformation, and routing of service interactions. Complements SOA Suite for lightweight integration scenarios.' },
          { title: 'Oracle API Gateway', desc: 'OCI-native API management service that provides rate limiting, authentication, request transformation, and observability for APIs exposed by WebLogic and other backend services.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Modernization Path</H3>
      <Body>Teams running on-premises WebLogic or SOA Suite can follow a lift-and-shift path to OCI as a first step, then incrementally modernize toward containerized deployments on Oracle Kubernetes Engine (OKE) or Oracle Cloud Native Services. This approach reduces initial risk while opening a path to cloud-native architecture over time.</Body>
      <Callout text="Oracle offers migration tools and professional services to assist with WebLogic lift-and-shift to OCI. Work with your Hosting Coordinator to initiate a migration assessment." />
    </div>
  )
}

function SvcEnterprise() {
  return (
    <div>
      <H2>Enterprise Applications</H2>
      <Body>Oracle's suite of enterprise applications runs natively on OCI, providing CMS and its contractors with access to Oracle's full business application portfolio in a FedRAMP High authorized environment.</Body>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'E-Business Suite', desc: 'Oracle EBS is one of the most widely deployed enterprise resource planning suites. OCI provides optimized infrastructure for EBS deployments, including pre-configured machine shapes, storage, and networking aligned to Oracle sizing guidance.' },
          { title: 'PeopleSoft', desc: "Oracle PeopleSoft applications for HR, Finance, and Student Administration. OCI PeopleSoft deployments benefit from Oracle's reference architectures and the PeopleSoft Cloud Manager automation tool for lifecycle management." },
          { title: 'Siebel CRM', desc: "Oracle Siebel CRM on OCI for customer relationship management workloads. Siebel's demanding performance and data volume requirements are well-matched to OCI Exadata and high-memory compute shapes." },
          { title: 'JD Edwards', desc: 'Oracle JD Edwards EnterpriseOne ERP on OCI for manufacturing, distribution, and financial management workloads. Available with Oracle Database and WebLogic on optimized OCI shapes.' },
          { title: 'Fusion Applications', desc: "Oracle Fusion Cloud Applications — including Oracle Cloud ERP, HCM, and SCM — run natively as SaaS on Oracle's public cloud. Fusion Applications inherit OCI's FedRAMP authorization and integrate with on-premises Oracle systems via integration services." },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="Enterprise application deployments require detailed sizing, licensing review, and architecture sign-off. Engage the OIT Customer Support Team early in the planning process." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function SvcInfrastructure() {
  return (
    <div>
      <H2>Infrastructure</H2>
      <Body>OCI provides a full spectrum of infrastructure services — compute, storage, networking, and hybrid cloud — to support the breadth of CMS workloads beyond database and application tiers.</Body>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Compute', desc: 'Flexible VM and bare metal compute instances with a range of CPU and memory configurations. OCI compute uses hardware-assisted virtualization and dedicated physical hosts for high-performance workloads.' },
          { title: 'Storage', desc: 'Block volumes, object storage, and file storage services with configurable performance tiers. OCI object storage is S3-compatible and supports lifecycle policies, versioning, and cross-region replication.' },
          { title: 'Networking (VCN)', desc: 'Virtual Cloud Networks provide logically isolated networking environments with subnets, route tables, security lists, and network security groups. See the Architecture section for full VCN topology details.' },
          { title: 'Oracle Kubernetes Engine (OKE)', desc: 'Managed Kubernetes service for containerized workloads. OKE integrates with OCI IAM, OCI Vault, and the OCI Container Registry for a fully managed container platform.' },
          { title: 'VMware Solution', desc: "Oracle Cloud VMware Solution (OCVS) allows teams to run VMware workloads on dedicated OCI bare metal hosts. Supports lift-and-shift of VMware-based systems without re-platforming." },
          { title: 'Hybrid Cloud Services', desc: 'OCI Dedicated Region and Roving Edge Infrastructure extend OCI services to dedicated on-premises environments, complementing ExaCC for organizations that need full OCI capabilities in their own data center.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SvcAnalytics() {
  return (
    <div>
      <H2>Analytics & AI</H2>
      <Body>Oracle Cloud Infrastructure provides a growing portfolio of analytics and artificial intelligence services, with particular strength in AI-assisted database operations and enterprise data platforms built on Oracle's data foundation.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Oracle Analytics Cloud', desc: 'Self-service analytics and business intelligence platform with AI-powered insights, natural language queries, and automated data preparation. Integrates natively with Oracle Database and Autonomous Database as data sources.' },
          { title: 'Oracle Analytics Server', desc: 'On-premises Oracle Analytics platform deployable on OCI or ExaCC, providing enterprise BI, reporting, and dashboards for organizations that need on-premises control over their analytics infrastructure.' },
          { title: 'AI-Enabled Database Services', desc: 'Oracle Database AI Vector Search, in-database machine learning (Oracle Machine Learning), and AI-assisted SQL query optimization are embedded directly in Oracle Database. No separate AI infrastructure required for many common use cases.' },
          { title: 'OCI Data Science', desc: 'Managed platform for building, training, and deploying machine learning models at scale. Supports popular open-source frameworks (TensorFlow, PyTorch, scikit-learn) alongside Oracle AutoML capabilities.' },
          { title: 'OCI Data Integration', desc: 'Serverless, cloud-native ETL and data integration service for building data pipelines between Oracle and non-Oracle data sources. Supports Oracle Database, Autonomous Database, object storage, and third-party data sources.' },
          { title: 'Enterprise Data Platforms', desc: 'OCI supports full enterprise data platform architectures combining Oracle Exadata (operational data), Autonomous Data Warehouse (analytics), and OCI Object Storage (data lake) into a unified lakehouse architecture.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="AI-enabled database services embedded in Oracle Database are available without additional licensing under most Oracle cloud service tiers. Confirm which AI capabilities are included in your contracted Oracle cloud service before building AI-dependent workloads." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

// ─── Architecture sub-sections ───────────────────────────────────────────────

function ArchOci() {
  return (
    <div>
      <H2>OCI Architecture</H2>
      <Body>OCI's architecture is organized around a global network of regions, each containing multiple availability domains and fault domains. CMS workloads are deployed in US Government Cloud regions, which operate within Oracle's FedRAMP High authorized boundary and are physically isolated from commercial OCI regions.</Body>
      <H3>Core Architectural Concepts</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Regions', desc: 'Geographic areas containing one or more availability domains. CMS uses US Government Cloud regions to satisfy FedRAMP and data residency requirements.' },
          { title: 'Availability Domains (ADs)', desc: 'Independent data centers within a region. ADs are isolated from each other but connected by low-latency, high-bandwidth networking, enabling multi-AD HA architectures.' },
          { title: 'Fault Domains', desc: 'Groups of hardware within an AD that are isolated from each other. Distributing instances across fault domains protects against hardware failures within an AD.' },
          { title: 'Tenancy', desc: "A secure, isolated partition of OCI resources assigned to CMS. All OCI resources belong to a compartment within the tenancy, enabling hierarchical access control and cost attribution." },
          { title: 'Compartments', desc: 'Logical containers for organizing OCI resources. Compartments nest hierarchically, enabling policy inheritance and fine-grained IAM controls per team, environment, or workload.' },
          { title: 'Virtual Cloud Network (VCN)', desc: 'Private, isolated network within OCI. Each VCN contains subnets, route tables, security lists, and gateways. See the Networking section for full topology details.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.oracleRed}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Resource Hierarchy</H3>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Tenancy</strong> — the root container for all CMS OCI resources. Organization-level policies applied at the tenancy level cascade to all compartments.</>,
        <><strong style={{ color: C.textPrimary }}>Top-level compartments</strong> — separate compartments for Production, Non-Production, and Sandbox environments enforce policy and access boundaries between environments.</>,
        <><strong style={{ color: C.textPrimary }}>Workload compartments</strong> — individual application teams operate within nested compartments, receiving scoped IAM policies and resource quotas.</>,
        <><strong style={{ color: C.textPrimary }}>Resources</strong> — compute instances, databases, VCNs, and other OCI services live within compartments and inherit the policies of their parent compartment.</>,
      ]} />
    </div>
  )
}

function ArchExacc() {
  return (
    <div>
      <H2>Exadata Cloud@Customer (ExaCC)</H2>
      <Body>Oracle Exadata Cloud@Customer deploys Oracle-managed Exadata hardware and software into the CMS physical data center. Oracle is responsible for hardware installation, software lifecycle management, patching, monitoring, and repair. CMS retains ownership of the data and controls access through OCI IAM policies applied remotely.</Body>
      <Divider />
      <H3>How ExaCC Works</H3>
      <NumList items={[
        'Oracle ships Exadata hardware racks to the CMS data center facility',
        'Oracle engineers install and configure the hardware, connecting it to CMS data center power and network',
        'The ExaCC control plane connects to Oracle Cloud over a secure, dedicated network link for management and automation',
        'CMS teams interact with ExaCC using the same OCI Console and APIs used for cloud services — no new management tooling required',
        'Database provisioning, scaling, patching, and backup are performed through OCI APIs and are automated by Oracle',
        'Data remains in the CMS data center at all times — it never traverses to Oracle Cloud regions',
      ]} />
      <Divider />
      <H3>ExaCC vs. OCI Database Comparison</H3>
      <Table
        heads={['Feature', 'ExaCC', 'OCI Database']}
        rows={[
          ['Data location', 'CMS data center', 'OCI US Government region'],
          ['Hardware', 'Oracle Exadata (on-prem)', 'Oracle-managed cloud infrastructure'],
          ['Management model', 'Oracle-managed, OCI control plane', 'Oracle-managed, OCI control plane'],
          ['Data residency', 'CMS physical facility', 'OCI US region (FedRAMP)'],
          ['Latency to on-prem systems', 'Sub-millisecond (local network)', 'FastConnect-dependent'],
          ['Service availability', 'Oracle Exadata service catalog', 'Full OCI database catalog'],
          ['Ideal use case', 'Residency, compliance, on-prem integration', 'Broadest Oracle service catalog'],
        ]}
      />
      <Callout text="ExaCC is the right choice when your workload has regulatory or contractual requirements that mandate data remain within CMS-controlled physical facilities. Work with your ISSO to determine if ExaCC is required for your system." accent={C.oracleRed} bg="rgba(199,70,52,0.07)" />
    </div>
  )
}

function ArchNetworking() {
  return (
    <div>
      <H2>Networking & Virtual Cloud Network</H2>
      <Body>Oracle Cloud Infrastructure networking is built around the Virtual Cloud Network (VCN) — a private, isolated software-defined network within OCI. CMS workloads operate within centrally managed VCNs that enforce consistent routing, security, and access control policies across all hosted applications.</Body>
      <Divider />
      <H3>VCN Components</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Subnets', desc: 'Subdivisions of the VCN CIDR block. Subnets can be public (with internet gateway access) or private (accessible only within the VCN or via private connectivity). CMS workload subnets are private by default.' },
          { title: 'Security Lists & Network Security Groups', desc: 'Security lists are stateful firewall rules applied to all resources in a subnet. Network security groups (NSGs) provide more granular, resource-level rules and are the preferred mechanism for production environments.' },
          { title: 'Route Tables', desc: 'Control the path that traffic takes when leaving a subnet. Route rules direct traffic to gateways, DRGs, local peering gateways, and other VCN resources.' },
          { title: 'Dynamic Routing Gateway (DRG)', desc: 'The central hub for private connectivity. The DRG connects the VCN to on-premises networks via FastConnect or Site-to-Site VPN, and enables VCN-to-VCN routing in hub-and-spoke architectures.' },
          { title: 'Service Gateway', desc: "Allows resources in private subnets to reach OCI services (Object Storage, Autonomous Database APIs, etc.) without traversing the public internet. No public IP is required for service-to-service communication within OCI." },
          { title: 'NAT Gateway', desc: 'Provides outbound internet access for private subnet resources without assigning public IP addresses. Inbound connections from the internet are blocked by the NAT gateway.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Egress Policy</H3>
      <Body>Direct internet egress from workload subnets is not permitted without review. All outbound internet traffic routes through centrally managed NAT gateways and web proxies. This ensures consistent logging, filtering, and compliance with CMS internet traffic policies.</Body>
    </div>
  )
}

function ArchHybrid() {
  return (
    <div>
      <H2>Hybrid Connectivity</H2>
      <Body>CMS OCI environments connect to the CMS Enterprise Data Center (EDC) and ExaCC deployments through OCI FastConnect and Site-to-Site VPN, managed by the network operations team. All private connectivity is centrally managed and must be requested through the support portal.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'OCI FastConnect', desc: 'Dedicated, private connectivity between CMS data centers and OCI. FastConnect provides consistent network performance with predictable latency, higher throughput, and lower cost per GB compared to internet-based connectivity. Used for production data replication, ExaCC management, and high-throughput integrations.' },
          { title: 'Site-to-Site VPN', desc: 'Encrypted IPSec tunnels for lower-bandwidth or temporary connectivity needs. Used for development environment connectivity and non-production integrations with on-premises systems when dedicated FastConnect is not warranted.' },
          { title: 'ExaCC Control Plane Link', desc: 'A dedicated, Oracle-managed private network connection between the ExaCC hardware in the CMS data center and the OCI control plane. Required for ExaCC management, patching, and automation. Managed by Oracle — CMS does not configure this link.' },
          { title: 'VCN Peering', desc: 'Local and remote VCN peering connects VCNs within and across OCI regions. Remote peering through the DRG enables hub-and-spoke architectures and cross-region connectivity for DR and multi-region deployments.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.azure}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Hub-and-Spoke Network Model</H3>
      <Body>CMS OCI environments use a hub-and-spoke network topology. A central hub VCN hosts shared networking services (DRG, firewall inspection, NAT gateways, and FastConnect attachments). Spoke VCNs contain application workloads and connect to the hub through local peering gateways, inheriting centralized routing and security policies.</Body>
      <Callout text="All FastConnect and VPN connectivity requests must be submitted through the OIT Customer Support Team. Do not configure private connectivity independently — changes to DRG and route table configurations affect all workloads sharing the hub VCN." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

// ─── Security sub-sections ────────────────────────────────────────────────────

function SecFedramp() {
  return (
    <div>
      <H2>FedRAMP & FISMA Compliance</H2>
      <Body>Oracle Cloud Infrastructure Government Cloud maintains FedRAMP High authorization, covering Oracle's US Government cloud regions. CMS workloads hosted on OCI operate within this authorized boundary and benefit from Oracle's inherited security controls under the shared responsibility model.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {[
          { level: 'FISMA Low', color: C.green, bg: 'rgba(52,168,83,0.08)', border: 'rgba(52,168,83,0.3)', desc: 'Appropriate for publicly available information with no privacy implications. Limited impact if confidentiality, integrity, or availability is compromised.', examples: ['Public documentation and reference data', 'Non-sensitive analytics workloads', 'Development and sandbox environments'] },
          { level: 'FISMA Moderate', color: C.gold, bg: 'rgba(255,179,26,0.08)', border: 'rgba(255,179,26,0.3)', desc: 'Used for systems that handle PII, PHI, or other controlled but not classified information. Most CMS healthcare applications operate at the Moderate level.', examples: ['Healthcare applications handling PHI', 'Beneficiary-facing portals and systems', 'Administrative systems with PII'] },
          { level: 'FISMA High', color: C.red, bg: 'rgba(234,67,53,0.08)', border: 'rgba(234,67,53,0.3)', desc: 'Reserved for systems where a compromise would have severe or catastrophic adverse effects. High-impact systems require the most rigorous controls and continuous monitoring.', examples: ['Financial payment processing systems', 'Infrastructure supporting critical agency operations', 'Systems with sensitive national security data'] },
        ].map(({ level, color, bg, border, desc, examples }) => (
          <div key={level} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, background: color, color: level === 'FISMA Moderate' ? 'var(--fusion-deep-sea-900)' : '#fff' }}>{level}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: C.textSecondary, lineHeight: 1.75, margin: '0 0 12px' }}>{desc}</p>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.textPrimary, marginBottom: 6 }}>Examples</div>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {examples.map(e => (
                <li key={e} style={{ display: 'flex', gap: 8, fontSize: '0.8125rem', color: C.textSecondary }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, marginTop: 7, flexShrink: 0 }} />{e}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Shared Responsibility Model</H3>
      <Body>Under the OCI shared responsibility model, Oracle is responsible for the security of the cloud infrastructure (physical data centers, hardware, networking, and the hypervisor layer). CMS is responsible for security in the cloud — identity and access management, data encryption, network security group configuration, workload hardening, and application-layer security.</Body>
      <Callout text="Before beginning an ATO engagement for an OCI-hosted system, contact your ISSO and Hosting Coordinator. Many platform-level controls are already inherited from Oracle's FedRAMP authorization package, reducing your documentation burden." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function SecIam() {
  return (
    <div>
      <H2>Identity & Access Management</H2>
      <Body>OCI Identity and Access Management (IAM) controls who can access OCI resources and what actions they can take. CMS OCI environments use OCI IAM with federation to CMS identity providers, enabling CMS employees and contractors to authenticate using their existing credentials.</Body>
      <Divider />
      <H3>Core IAM Concepts</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Users & Groups', desc: 'Users are individual identities. Groups aggregate users for policy assignment. IAM policies grant permissions to groups, not individual users — managing group membership drives access changes.' },
          { title: 'Policies', desc: 'OCI IAM policies define who can do what on which resources. Policies use a structured Allow verb: allow group <X> to <verb> <resource-type> in <compartment>.' },
          { title: 'Dynamic Groups', desc: 'Dynamic groups allow compute instances, functions, and other OCI resources to be treated as principals for IAM policy purposes, enabling resource-to-service authentication without credentials.' },
          { title: 'Identity Federation', desc: 'OCI IAM federates with SAML 2.0 identity providers, enabling CMS employees to authenticate using existing CMS credentials. Federated users map to OCI groups through identity provider group mappings.' },
          { title: 'Compartment Policies', desc: 'Policies can be scoped to specific compartments, allowing application teams to self-manage resources within their compartment boundary without affecting other workloads.' },
          { title: 'Tenancy Admin Restrictions', desc: 'Tenancy administrator permissions are held exclusively by the platform operations team. Application teams receive compartment-scoped policies appropriate to their role.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Recommended Policy Patterns</H3>
      <Code>{`# Allow a group to manage compute in a specific compartment
Allow group AppTeam-Admins to manage instance-family in compartment prod/app-workloads

# Allow developers to inspect resources (read-only)
Allow group AppTeam-Developers to inspect all-resources in compartment prod/app-workloads

# Allow a dynamic group (compute instances) to read secrets
Allow dynamic-group AppInstanceDG to read secret-family in compartment prod/app-workloads

# Allow database administrators scoped DB management
Allow group DBA-Team to manage database-family in compartment prod/databases`}</Code>
      <Callout text="Basic roles equivalent to Owner or Editor are not available in OCI — all policies must be explicitly defined. This is a security advantage: there is no overly broad built-in role to accidentally assign." />
    </div>
  )
}

function SecGovernance() {
  return (
    <div>
      <H2>Security & Governance</H2>
      <Body>OCI provides a layered security and governance model combining IAM policies, security zones, Cloud Guard (security posture management), and audit logging to protect CMS workloads and maintain continuous compliance visibility.</Body>
      <Divider />
      <H3>Security Layers</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { layer: 'OCI Cloud Guard', desc: 'Oracle Cloud Guard is OCI\'s security posture management service. It continuously monitors compartments for security misconfigurations, insecure activity, and suspicious behavior. Cloud Guard detectors cover resource configuration, activity, and threat detection. Findings are surfaced as problems and can trigger automated responder actions.' },
          { layer: 'Security Zones', desc: 'Security Zones enforce preventive security controls on compartments containing sensitive resources. Resources in a security zone cannot be configured in ways that violate the security zone policies — for example, block volumes in a security zone cannot be set to publicly accessible.' },
          { layer: 'OCI Vault (Key Management)', desc: 'OCI Vault stores and manages encryption keys for data at rest and in transit. Vault integrates with Oracle Database, Object Storage, Block Volumes, and other OCI services for customer-managed key lifecycle management. Keys never leave the vault in plaintext.' },
          { layer: 'OCI Audit', desc: 'All API calls to OCI services are recorded in the OCI Audit service, which provides a full record of who did what and when. Audit logs are forwarded to CMS Splunk for centralized analysis, alerting, and long-term retention.' },
          { layer: 'Vulnerability Scanning', desc: "OCI Vulnerability Scanning Service automatically scans compute instances and container images for known vulnerabilities. Findings are surfaced in the OCI Console and can be integrated with Cloud Guard for automated response." },
          { layer: 'OCI Bastion', desc: 'OCI Bastion provides short-lived, audited SSH sessions to private compute instances without requiring a public IP address or open SSH port. All bastion session activity is logged to OCI Audit and forwarded to Splunk.' },
        ].map(({ layer, desc }) => (
          <Card key={layer} title={layer} accent={C.oracleRed}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Compliance Controls</H3>
      <Body>OCI Governance includes Compliance Documents (pre-built policy documents aligned to CIS benchmarks, NIST, and FedRAMP) and the OCI Organizations service, which applies consistent governance policies across multiple tenancies from a central governance tenancy.</Body>
      <Callout text="Cloud Guard is enabled at the tenancy level and monitored by the platform operations team. Teams are responsible for remediating Cloud Guard problems identified within their compartments within the SLA windows defined by FISMA level." accent={C.red} bg="rgba(234,67,53,0.07)" />
    </div>
  )
}

// ─── Operations sub-sections ─────────────────────────────────────────────────

function OpsShared() {
  return (
    <div>
      <H2>Operational Shared Services</H2>
      <Body>CMS Cloud Fusion provides a set of operational shared services for all OCI and ExaCC environments. These services are centrally managed and available to all hosted workloads without per-team provisioning.</Body>
      <Callout text="These discussions help identify the right approved services and ensure the needed shared services are included from day one. Work with the OIT Customer Support Team to confirm which shared services are available for your workload before beginning onboarding." accent={C.oracleRed} bg="rgba(199,70,52,0.07)" />
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Identity & Access Management', desc: 'Centralized access and governance via OCI IAM with federation to CMS identity providers. Group-based access policies, dynamic groups for workload identity, and compartment-scoped policy management.' },
          { title: 'Networking', desc: 'Virtual Cloud Networks (VCNs), FastConnect for private connectivity to on-premises, and hybrid-cloud connectivity via Dynamic Routing Gateway. Hub-and-spoke topology with centralized security policy.' },
          { title: 'Security & Governance', desc: 'Compliance controls and secure access integration via OCI Cloud Guard, Security Zones, OCI Bastion, and OCI Vault. Continuous security posture monitoring across all compartments.' },
          { title: 'Observability', desc: 'Monitoring, dashboards, and performance visibility via OCI Monitoring, OCI Application Performance Monitoring, and pre-built dashboards for compute, database, and network resources.' },
          { title: 'Logging', desc: 'Centralized log collection for operations and audit support via OCI Logging, unified log aggregation, and forwarding to CMS Splunk for SIEM analysis.' },
          { title: 'Alerting', desc: 'Proactive notifications for faster response via OCI Alarms. Alert rules trigger on metric thresholds, log patterns, and Cloud Guard findings. Notifications are delivered to operations teams via email, PagerDuty, or Slack integrations.' },
          { title: 'Security Monitoring', desc: 'Visibility into security events and threats via OCI Cloud Guard, OCI Vulnerability Scanning, and OCI Audit log forwarding to Splunk for SOC analysis and threat hunting.' },
          { title: 'Backup & Disaster Recovery', desc: 'Data protection and resiliency support via Oracle Database RMAN backup to OCI Object Storage, Oracle Recovery Manager, and cross-region replication for DR. ExaCC includes automated Exadata backups.' },
          { title: 'Automation', desc: 'Streamlined provisioning and operational workflows via OCI Resource Manager (Terraform-compatible), OCI DevOps pipelines, and centrally managed runbook automation for common operational tasks.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function OpsMonitoring() {
  return (
    <div>
      <H2>Monitoring & Observability</H2>
      <Body>CMS OCI environments provide a suite of shared observability services including metrics, dashboards, distributed tracing, and application performance monitoring across all OCI and ExaCC workloads.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'OCI Monitoring', desc: 'Collects metrics from OCI services and custom application instrumentation. Supports flexible alarm rules, metric queries, and dashboard widgets. Pre-built namespace metrics cover compute, database, networking, storage, and Kubernetes.' },
          { title: 'OCI Application Performance Monitoring (APM)', desc: 'Distributed tracing, real user monitoring, and synthetic monitoring for applications deployed on OCI. APM traces span across microservices and correlates with OCI metrics and logs for end-to-end visibility.' },
          { title: 'OCI Alarms', desc: 'Configurable alarm rules trigger on metric thresholds and send notifications to OCI Notifications topics. Topics route alerts to email, PagerDuty, Slack, or custom HTTPS endpoints for operations team alerting.' },
          { title: 'OCI Logging Analytics', desc: 'Machine learning-powered log analytics for detecting anomalies, building visual dashboards, and correlating log patterns across OCI services. Complements Splunk for exploratory log analysis.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.azure}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Recommended Alarm Policies</H3>
      <Table
        heads={['Alarm', 'Condition', 'Severity']}
        rows={[
          ['Compute CPU > 85%', 'Sustained 5 minutes on any instance', 'Warning'],
          ['Compute Memory > 90%', 'Sustained 3 minutes', 'Critical'],
          ['Database Latency Spike', 'Average query latency 3× 7-day baseline for 10 minutes', 'Warning'],
          ['Storage Utilization > 85%', 'Block volume or file storage exceeds 85%', 'Warning'],
          ['Network Errors', 'Dropped packets or retransmit rate above threshold', 'Critical'],
          ['FastConnect Down', 'FastConnect circuit state changes to DOWN', 'Critical'],
        ]}
      />
      <Callout text="Use OCI Monitoring dashboards to review system health and uptime. Audit logs and Cloud Guard findings are forwarded to Splunk for centralized analysis by the CMS SOC." />
    </div>
  )
}

function OpsLogging() {
  return (
    <div>
      <H2>Logging</H2>
      <Body>CMS OCI environments forward all platform logs to Splunk, the agency's centralized Security Information and Event Management (SIEM) platform. The logging pipeline ensures that security events, audit records, and operational logs are available for analysis, alerting, and long-term retention by the CMS Security Operations Center.</Body>
      <Divider />
      <H3>Log Flow</H3>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Log generation</strong> — OCI services (Compute, Database, Networking, IAM, etc.) generate audit logs, service logs, and custom application logs automatically.</>,
        <><strong style={{ color: C.textPrimary }}>OCI Logging</strong> — centralized log collection aggregates logs from all enabled log sources across compartments into the OCI Logging service.</>,
        <><strong style={{ color: C.textPrimary }}>Service Connector Hub</strong> — OCI Service Connector Hub reads from OCI Logging and delivers log records at scale to the downstream processing pipeline.</>,
        <><strong style={{ color: C.textPrimary }}>OCI Streaming</strong> — log records flow through OCI Streaming (Kafka-compatible) for buffering and fan-out delivery.</>,
        <><strong style={{ color: C.textPrimary }}>Splunk ingestion</strong> — logs arrive in Splunk where the SOC applies detection rules, creates alerts, and performs threat hunting across the full CMS cloud estate.</>,
      ]} />
      <Divider />
      <H3>Log Sources</H3>
      <Table
        heads={['Log Source', 'Log Type', 'Content']}
        rows={[
          ['OCI Audit', 'Audit', 'All OCI API calls — resource creation, IAM changes, policy modifications, and administrative actions'],
          ['VCN Flow Logs', 'Network', 'Per-flow network traffic records — source/destination IP, port, protocol, bytes, and accept/reject action'],
          ['Load Balancer Access Logs', 'Application', 'HTTP request logs with status codes, latency, client IP, and backend response details'],
          ['Object Storage Access Logs', 'Data Access', 'Read and write operations on Object Storage buckets'],
          ['Database Audit Logs', 'Database', 'Oracle Database audit trail including SQL executed, user activity, and privilege use'],
          ['OCI Bastion Session Logs', 'Access', 'SSH session activity for all bastion-proxied connections'],
          ['Cloud Guard Findings', 'Security', 'Security posture findings forwarded from Cloud Guard to Splunk via Service Connector Hub'],
          ['Custom Application Logs', 'Application', 'Application-generated logs shipped via OCI Logging Agent from compute instances or containers'],
        ]}
      />
      <Divider />
      <H3>Log Retention</H3>
      <Body>OCI Logging retains logs for up to 60 days by default. The aggregated log export to Splunk provides long-term retention per the CMS records management schedule. Logs archived to OCI Object Storage are retained for 7 years to meet audit and compliance requirements.</Body>
      <Callout text="Database audit logs for Oracle Database instances must be explicitly configured and enabled. Contact your Hosting Coordinator to verify that database audit logging is enabled and forwarding correctly for your provisioned databases." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function OpsBackup() {
  return (
    <div>
      <H2>Backup & Disaster Recovery</H2>
      <Body>CMS OCI and ExaCC environments include integrated backup and disaster recovery capabilities as part of the operational shared services. Protection of production databases and compute workloads is required for all FISMA Moderate and High systems.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Oracle Database Backup', desc: 'Oracle Database RMAN (Recovery Manager) performs automated backups of all Oracle Database and Exadata instances to OCI Object Storage or ExaCC-local backup storage. Backups include full, incremental, and archive log backups on configurable schedules. Encryption at rest is enforced for all backup objects.' },
          { title: 'Autonomous Database Backup', desc: 'Automatic daily backups with 60-day retention are included with Autonomous Database at no additional cost. Point-in-time recovery within the retention window is available through the OCI Console.' },
          { title: 'Block Volume Backups', desc: 'OCI block volume backup service creates crash-consistent snapshots of attached block volumes. Policy-based backup schedules support hourly, daily, weekly, and monthly retention tiers. Cross-region backup copy is available for DR purposes.' },
          { title: 'Cross-Region DR', desc: 'OCI Full Stack Disaster Recovery (Full Stack DR) orchestrates DR failover for multi-tier applications across OCI regions. Full Stack DR manages the sequencing of compute, database, and load balancer resource failover with configurable RTO/RPO objectives.' },
          { title: 'ExaCC Backup', desc: 'ExaCC includes automated database backups to local Exadata storage and optional export to OCI Object Storage via FastConnect. Oracle manages the backup infrastructure and schedule as part of the ExaCC managed service.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.green}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Recovery Objectives by FISMA Level</H3>
      <Table
        heads={['FISMA Level', 'Recovery Time Objective (RTO)', 'Recovery Point Objective (RPO)']}
        rows={[
          ['Low', '72 hours', '24 hours'],
          ['Moderate', '24 hours', '4 hours'],
          ['High', '4 hours', '1 hour'],
        ]}
      />
      <Callout text="To configure backup policies, define DR plans, or initiate a disaster recovery planning engagement, contact your Hosting Coordinator or submit a request through the OIT Customer Support Team." />
    </div>
  )
}

function OpsAutomation() {
  return (
    <div>
      <H2>Automation</H2>
      <Body>CMS OCI environments support infrastructure-as-code and workflow automation through OCI Resource Manager (Terraform), OCI DevOps, and centrally managed runbook automation. All production infrastructure must be provisioned through code — manual console-based changes in production are restricted by policy.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'OCI Resource Manager', desc: 'OCI-native Terraform automation service. Resource Manager stores Terraform configurations as stacks, runs plan and apply operations in managed jobs, and stores Terraform state in OCI-managed backend storage. No local Terraform installation required.' },
          { title: 'OCI DevOps', desc: 'End-to-end DevOps platform for build, test, and deployment pipelines on OCI. Supports container image builds, deployment to OKE clusters and compute instances, and blue-green and canary deployment strategies.' },
          { title: 'OCI Functions', desc: 'Serverless function execution for automation tasks, event-driven workflows, and operational runbooks. Functions integrate with OCI Events, OCI Notifications, and Cloud Guard responders for automated remediation.' },
          { title: 'OCI Events', desc: 'Event-based triggers that fire on OCI resource state changes. Events drive automated responses — for example, automatically tagging new resources, triggering compliance checks, or invoking Functions on security findings.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Getting Started with OCI Resource Manager</H3>
      <NumList items={[
        'Request access to the CMS OCI module registry through the OIT Customer Support Team',
        'Clone the CMS-provided Terraform project scaffold, which pre-wires the required OCI provider, backend, and variable structure',
        'Select appropriate modules for your workload (VCN, Database, Compute, OKE cluster, etc.)',
        'Deploy first to a sandbox compartment to validate configuration before promoting to non-production and production',
        'Submit infrastructure changes through the standard change management process for production deployments',
      ]} />
      <Code>{`# Example OCI provider configuration for Resource Manager
terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = ">= 5.0"
    }
  }
}

provider "oci" {
  region = var.region
  # Auth is handled by Resource Manager instance principal — no key required
}

# Example compartment data source
data "oci_identity_compartment" "workload" {
  id = var.compartment_id
}`}</Code>
    </div>
  )
}

// ─── Resources sub-sections ──────────────────────────────────────────────────

function ResGettingStarted() {
  return (
    <div>
      <H2>Getting Started</H2>
      <Body>To determine the right hosting approach, teams should be prepared to discuss business drivers, workload type, availability and recovery requirements, compliance considerations, authentication needs, private connectivity requirements, expected growth, and desired operational capabilities such as centralized logging, monitoring dashboards, and alerting.</Body>
      <Body>These discussions help identify the right approved services and ensure the needed shared services are included from day one.</Body>
      <Divider />
      <H3>Choosing Between OCI and ExaCC</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { option: 'OCI', color: C.oracleRed, desc: 'OCI offers the widest range of Oracle cloud services and faster access to new capabilities. Choose OCI when your workload can tolerate cloud-hosted data, needs the broadest Oracle service catalog, or benefits from elastic on-demand compute and storage.' },
          { option: 'ExaCC', color: C.gold, desc: 'ExaCC offers Oracle-managed database services delivered inside the CMS physical data center for added control, compliance, or data residency needs. Choose ExaCC when your system has regulatory or contractual requirements that mandate data remain within CMS-controlled physical facilities.' },
          { option: 'Hybrid', color: C.azure, desc: 'A hybrid approach can give you the best of both models. Run application tiers on OCI while keeping sensitive databases on ExaCC, connected via FastConnect for low-latency, private integration.' },
        ].map(({ option, color, desc }) => (
          <div key={option} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: `${color}18`, borderRight: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color, textTransform: 'uppercase' }}>{option}</span>
            </div>
            <div style={{ background: C.cardBg, padding: '14px 18px' }}>
              <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Onboarding Checklist</H3>
      <NumList items={[
        'Engage the OIT Customer Support Team for a workload intake discussion',
        'Document business drivers, workload type, and data classification',
        'Identify availability, recovery, and compliance requirements with your ISSO',
        'Determine authentication needs (CMS SSO, service accounts, federated access)',
        'Confirm private connectivity requirements to on-premises or other CMS environments',
        'Review the approved Oracle Cloud services list and confirm the services you need are available',
        'Confirm which operational shared services (logging, monitoring, backup) need to be enabled from day one',
        'Submit an onboarding request through the OIT Customer Support Team portal',
      ]} />
    </div>
  )
}

function ResSupport() {
  return (
    <div>
      <H2>Getting Support</H2>
      <Body>The OIT Customer Support Team is your primary contact for Oracle Cloud Infrastructure and ExaCC hosting requests, issues, and questions. Work with the support team early in your project to ensure the right services are in scope from day one.</Body>
      <div style={{ marginBottom: 24 }}>
        <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.9375rem', fontWeight: 700, padding: '10px 24px', borderRadius: 999, textDecoration: 'none' }}>
          Contact OIT Customer Support <ExternalIcon />
        </a>
      </div>
      <Divider />
      <H3>What to Include in Your Request</H3>
      <Bullet items={[
        'Your system name and a brief description of the workload',
        'Target deployment model: OCI, ExaCC, or hybrid',
        'FISMA impact level and environment (production, non-production, sandbox)',
        'Data classification and any relevant regulatory constraints',
        'Desired Oracle Cloud services and operational shared services needed',
        'Estimated timeline and any hard dependencies',
      ]} />
      <Divider />
      <H3>Support Tiers</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { tier: 'Tier 1 — Self-Service', desc: 'Teams first consult the Cloud.CMS.gov knowledge base, runbooks, and this documentation site. Most common tasks such as access requests, compartment onboarding, and standard configuration questions are documented end-to-end.' },
          { tier: 'Tier 2 — OIT Customer Support', desc: 'The OIT Customer Support Team handles intake discussions, workload assessments, onboarding requests, and ongoing operational questions. Submit requests through the support portal or contact your assigned Hosting Coordinator.' },
          { tier: 'Tier 3 — Platform Operations', desc: 'The platform operations team handles platform-level incidents, infrastructure outages, network issues, and security events. Issues are escalated from the OIT Customer Support Team or submitted directly through the portal for urgent incidents.' },
          { tier: 'Tier 4 — Oracle Support', desc: 'CMS holds an Oracle support agreement. For issues requiring Oracle engineering involvement — such as database bugs, ExaCC hardware issues, or OCI service degradations — tickets are escalated to Oracle on behalf of CMS teams.' },
        ].map(({ tier, desc }) => (
          <Card key={tier} title={tier}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Support Response SLAs</H3>
      <Table
        heads={['Severity', 'Description', 'Initial Response']}
        rows={[
          ['Critical (P1)', 'Production system down, data loss risk, or active security incident', '1 hour'],
          ['High (P2)', 'Major feature unavailable or significant performance degradation in production', '4 hours'],
          ['Medium (P3)', 'Non-production issue or workaround available', '1 business day'],
          ['Low (P4)', 'General questions, documentation requests, feature requests', '3 business days'],
        ]}
      />
    </div>
  )
}

function ResReference() {
  return (
    <div>
      <H2>Documentation & Reference</H2>
      <Body>Curated links to Oracle Cloud product documentation, CMS internal resources, and external reference material for teams working in the CMS Oracle Cloud environment.</Body>
      <Divider />
      <H3>Oracle Cloud</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { label: 'OCI Documentation', desc: 'Official product docs, quickstarts, tutorials, and API references for all Oracle Cloud services', href: 'https://docs.oracle.com/en-us/iaas/Content/home.htm' },
          { label: 'OCI Console', desc: 'Web-based interface for managing Oracle Cloud resources', href: 'https://cloud.oracle.com' },
          { label: 'Oracle Architecture Center', desc: 'Reference architectures, design patterns, and best practices for Oracle Cloud', href: 'https://docs.oracle.com/solutions/' },
          { label: 'Oracle Cloud Status', desc: 'Real-time status of all Oracle Cloud services and regions', href: 'https://ocistatus.oraclecloud.com' },
        ].map(({ label, desc, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px', background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.oracleRed}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: C.azure, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.8rem', color: C.textSecondary, lineHeight: 1.5 }}>{desc}</div>
            </div>
            <ExternalIcon />
          </a>
        ))}
      </div>
      <H3>CMS Internal</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { label: 'Cloud.CMS.gov Knowledge Base', desc: 'CMS-specific runbooks, configuration guidance, and platform standards', href: '#' },
          { label: 'OIT Customer Support Team Portal', desc: 'Submit onboarding requests, incidents, and Oracle Cloud access requests', href: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22' },
          { label: 'CMS Cloud ATO Program', desc: 'ATO process, inherited controls, and shared responsibility documentation', href: '#' },
          { label: 'CMS Enterprise User Administration (EUA)', desc: 'Manage CMS user accounts and role assignments', href: '#' },
        ].map(({ label, desc, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px', background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.cmsBlue}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: C.azure, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.8rem', color: C.textSecondary, lineHeight: 1.5 }}>{desc}</div>
            </div>
            <ExternalIcon />
          </a>
        ))}
      </div>
      <H3>Compliance & Standards</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'FedRAMP Marketplace', desc: 'Verify authorization status of Oracle Cloud services', href: 'https://marketplace.fedramp.gov' },
          { label: 'NIST SP 800-53 Rev 5', desc: 'Security and privacy controls for federal information systems', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
          { label: 'NIST SP 800-37 Rev 2', desc: 'Risk Management Framework guidance', href: 'https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final' },
          { label: 'Oracle Cloud Compliance', desc: "Oracle's compliance certifications and authorization documentation", href: 'https://www.oracle.com/cloud/compliance/' },
        ].map(({ label, desc, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px', background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.cmsBlue}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: C.azure, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.8rem', color: C.textSecondary, lineHeight: 1.5 }}>{desc}</div>
            </div>
            <ExternalIcon />
          </a>
        ))}
      </div>
    </div>
  )
}

function ResAto() {
  return (
    <div>
      <H2>Compliance & ATO</H2>
      <Body>CMS Oracle Cloud environments operate under the CMS Cloud Authority to Operate (ATO) program. OCI Government Cloud's FedRAMP High authorization means system teams inherit a substantial set of platform-level controls, significantly reducing the documentation and assessment burden compared to traditional on-premises ATOs.</Body>
      <Divider />
      <H3>Key Compliance Resources</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'CMS Cloud ATO Program', desc: 'Overview of the CMS Cloud ATO process, inherited controls, shared responsibility model, and how to initiate an ATO for a new system on Oracle Cloud.', href: '#' },
          { title: 'FedRAMP Marketplace', desc: 'Verify the authorization status of Oracle Cloud services available under the CMS FedRAMP High authorization boundary.', href: 'https://marketplace.fedramp.gov' },
          { title: 'Oracle Cloud Compliance Documents', desc: "Oracle's FedRAMP authorization package, NIST compliance mappings, and audit artifacts available through the Oracle Cloud compliance portal.", href: 'https://www.oracle.com/cloud/compliance/' },
          { title: 'NIST SP 800-53 Rev 5', desc: 'The control catalog underlying FISMA and FedRAMP requirements. Use the NIST catalog to understand control intent and supplemental guidance.', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
        ].map(({ title, desc, href }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 8px' }}>{desc}</p>
            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.azure, textDecoration: 'none' }}>Open <ExternalIcon /></a>
          </Card>
        ))}
      </div>
      <Callout text="Contact your ISSO and the OIT Customer Support Team before beginning a new ATO engagement for a system hosted on Oracle Cloud. Many controls are already inherited and documented — your assessment scope may be smaller than expected." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

// ─── Sub-section registry ─────────────────────────────────────────────────────

const SUB_CONTENT: Record<string, () => ReactNode> = {
  'ov-intro': () => <OvIntro />,
  'ov-why': () => <OvWhy />,
  'ov-how': () => <OvHow />,
  'ov-availability': () => <OvAvailability />,
  'svc-database': () => <SvcDatabase />,
  'svc-middleware': () => <SvcMiddleware />,
  'svc-enterprise': () => <SvcEnterprise />,
  'svc-infrastructure': () => <SvcInfrastructure />,
  'svc-analytics': () => <SvcAnalytics />,
  'arch-oci': () => <ArchOci />,
  'arch-exacc': () => <ArchExacc />,
  'arch-networking': () => <ArchNetworking />,
  'arch-hybrid': () => <ArchHybrid />,
  'sec-fedramp': () => <SecFedramp />,
  'sec-iam': () => <SecIam />,
  'sec-governance': () => <SecGovernance />,
  'ops-shared': () => <OpsShared />,
  'ops-monitoring': () => <OpsMonitoring />,
  'ops-logging': () => <OpsLogging />,
  'ops-backup': () => <OpsBackup />,
  'ops-automation': () => <OpsAutomation />,
  'res-getting-started': () => <ResGettingStarted />,
  'res-support': () => <ResSupport />,
  'res-reference': () => <ResReference />,
  'res-ato': () => <ResAto />,
}

// ─── Overview card metadata ───────────────────────────────────────────────────

const OV_CARD_META: Record<string, { icon: ReactNode; desc: string; accent: string }> = {
  'ov-intro': {
    accent: C.oracleRed,
    desc: 'What OCI and ExaCC are, how they compare, and where they fit in the CMS multi-cloud strategy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
  },
  'ov-why': {
    accent: C.gold,
    desc: 'Six reasons Oracle Cloud is the right choice for Oracle-based CMS workloads.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  'ov-how': {
    accent: C.azure,
    desc: 'OCI, ExaCC, and hybrid deployment models — how each works and when to use it.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="14" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
        <circle cx="7.5" cy="16.5" r="1" fill="currentColor" />
        <line x1="12" y1="7.5" x2="17" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="12" y1="16.5" x2="17" y2="16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  'ov-availability': {
    accent: C.green,
    desc: 'Service availability by deployment model and FedRAMP coverage status.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
}

function OverviewLanding({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: C.textPrimary, margin: '0 0 8px' }}>Overview</h2>
      <p style={{ fontSize: '0.9375rem', color: C.textSecondary, lineHeight: 1.8, margin: '0 0 28px' }}>
        Oracle Cloud Infrastructure (OCI) and Exadata Cloud@Customer (ExaCC) are CMS's approved Oracle cloud hosting options. This section covers what OCI and ExaCC are, why to consider them, how they work, and current service availability.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {(SIDEBAR_LINKS.overview ?? []).map(({ id, label }) => {
          const meta = OV_CARD_META[id]
          const accent = meta?.accent ?? C.oracleRed
          return (
            <button key={id} onClick={() => onNav(id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '20px 20px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s', fontFamily: 'inherit' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = accent; (e.currentTarget as HTMLButtonElement).style.background = C.hoverBg }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; (e.currentTarget as HTMLButtonElement).style.background = C.cardBg }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: accent }}>
                {meta?.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: C.textPrimary, marginBottom: 5 }}>{label}</div>
                {meta?.desc && <div style={{ fontSize: '0.8125rem', color: C.textSecondary, lineHeight: 1.6 }}>{meta.desc}</div>}
              </div>
              <div style={{ color: C.textMuted, flexShrink: 0, marginTop: 2 }}><ChevronRight /></div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SectionLanding({ tabId, title, description, onNav }: { tabId: string; title: string; description: string; onNav: (id: string) => void }) {
  return (
    <div>
      <H2>{title}</H2>
      <Body mb={32}>{description}</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {(SIDEBAR_LINKS[tabId] ?? []).map(({ id, label }) => (
          <button key={id} type="button" onClick={() => onNav(id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s', fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.cmsBlue; (e.currentTarget as HTMLButtonElement).style.background = C.hoverBg }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; (e.currentTarget as HTMLButtonElement).style.background = C.cardBg }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: C.textPrimary }}>{label}</span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  )
}

function ResourcesPanel() {
  return (
    <div>
      <H2>Resources</H2>
      <Body mb={28}>
        Helpful links, documentation, and support resources for CMS Oracle Cloud teams.
      </Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { title: 'OIT Customer Support Team', desc: 'Submit onboarding requests, report issues, and get help from the platform operations team.', href: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22', linkText: 'Open Support Portal' },
          { title: 'OCI Documentation', desc: 'Official Oracle Cloud Infrastructure product documentation, tutorials, and API references.', href: 'https://docs.oracle.com/en-us/iaas/Content/home.htm', linkText: 'View Documentation' },
          { title: 'CMS Cloud ATO Program', desc: 'Authority to Operate resources, inherited controls documentation, and security authorization guidance for CMS cloud systems.', href: '#', linkText: 'Learn More' },
          { title: 'Oracle Architecture Center', desc: 'Reference architectures, design patterns, and best practices for building on Oracle Cloud Infrastructure.', href: 'https://docs.oracle.com/solutions/', linkText: 'Explore Architectures' },
          { title: 'Oracle Cloud Compliance', desc: "Oracle's FedRAMP authorization package and compliance certification documentation for OCI Government Cloud.", href: 'https://www.oracle.com/cloud/compliance/', linkText: 'View Compliance' },
          { title: 'FedRAMP Marketplace', desc: 'Review the authorized Oracle Cloud services available under the CMS FedRAMP High authorization boundary.', href: 'https://marketplace.fedramp.gov', linkText: 'View Marketplace' },
        ].map(({ title, desc, href, linkText }) => (
          <div key={title} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.textPrimary }}>{title}</div>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0, flex: 1 }}>{desc}</p>
            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.azure, textDecoration: 'none' }}>
              {linkText} <ExternalIcon />
            </a>
          </div>
        ))}
      </div>
      <div style={{ background: C.mainBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 24px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: C.cmsBlue, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Helpful Links</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Oracle Cloud Status Dashboard', href: 'https://ocistatus.oraclecloud.com' },
            { label: 'CMS IT Service Management (ITSM)', href: '#' },
            { label: 'NIST SP 800-53 Control Catalog', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
            { label: 'FedRAMP Authorization Documentation', href: 'https://www.fedramp.gov' },
            { label: 'Oracle Cloud Compliance Portal', href: 'https://www.oracle.com/cloud/compliance/' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.azure}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'}
            >
              {label} <ExternalIcon />
            </a>
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 12px' }}>Contact the OIT Customer Support Team for assistance with Oracle Cloud environments, requests, or access issues.</p>
          <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.875rem', fontWeight: 700, padding: '9px 20px', borderRadius: 999, textDecoration: 'none' }}>
            Get started with Oracle Cloud <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const SECTION_DESC: Record<string, string> = {
  overview: 'Oracle Cloud Infrastructure (OCI) and Exadata Cloud@Customer (ExaCC) are CMS approved hosting options for Oracle workloads. Explore what each platform offers, why Oracle Cloud is the right choice for Oracle-heavy systems, and current availability.',
  services: 'Approved Oracle Cloud services across database, middleware, enterprise applications, infrastructure, and analytics categories available to CMS teams.',
  architecture: 'OCI and ExaCC architecture, Virtual Cloud Network topology, hybrid connectivity, and the design principles that underpin CMS Oracle Cloud environments.',
  security: 'FedRAMP High compliance, FISMA boundaries, OCI IAM, Cloud Guard, and governance controls that protect CMS Oracle Cloud workloads.',
  operations: 'Operational shared services including monitoring, observability, logging, backup, and automation for CMS Oracle Cloud and ExaCC environments.',
  resources: 'Helpful links, documentation, and support resources for CMS Oracle Cloud teams.',
}

const SECTION_BANNERS: Record<string, { label: string; sub: string }> = {
  services: {
    label: 'Services',
    sub: 'Database · Middleware · Enterprise Apps · Analytics',
  },
  architecture: {
    label: 'Architecture',
    sub: 'OCI · ExaCC · Networking · Hybrid Connectivity',
  },
  security: {
    label: 'Security & Compliance',
    sub: 'FedRAMP · IAM · Cloud Guard · Governance',
  },
  operations: {
    label: 'Operations',
    sub: 'Monitoring · Logging · Backup · Automation',
  },
  resources: {
    label: 'Resources',
    sub: 'Documentation · Reference · Support',
  },
}

function SectionPhotoBanner({ sectionId }: { sectionId: string }) {
  const b = SECTION_BANNERS[sectionId]
  if (!b) return null
  return (
    <div style={{
      position: 'relative',
      height: 180,
      overflow: 'hidden',
      flexShrink: 0,
      background: 'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)',
      borderBottom: '1px solid var(--color-border-bright)',
    }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.35, background: 'radial-gradient(ellipse at 18% 40%, color-mix(in srgb, var(--fusion-deep-sea-500) 50%, transparent) 0%, transparent 58%), radial-gradient(ellipse at 82% 20%, color-mix(in srgb, var(--fusion-yellow) 18%, transparent) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 0%, ${C.mainBg} 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 36px' }}>
        <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: '1.5rem', fontWeight: 600, color: C.textPrimary, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 6 }}>{b.label}</div>
        <div style={{ fontSize: '0.8125rem', color: C.textMuted, letterSpacing: '0.04em', fontWeight: 500 }}>{b.sub}</div>
      </div>
    </div>
  )
}

function OracleHeroTopology() {
  return (
    <div className="oracle-hero__topology">
      <style>{`
        @keyframes oracleFlowDash { to { stroke-dashoffset: -22; } }
      `}</style>
      <svg
        role="img"
        aria-labelledby="oracle-topo-title"
        aria-describedby="oracle-topo-desc"
        viewBox="0 0 520 380"
        width="520"
        height="380"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <title id="oracle-topo-title">Deployment topology diagram</title>
        <desc id="oracle-topo-desc">
          Two deployment environments connected by FastConnect. At the top, the OCI US Government Region hosts approved cloud services including Compute, Database, Networking, Object Storage, and Identity and Access Management. It carries FedRAMP High and FISMA Authorized certifications. In the middle, a FastConnect private link carries encrypted data between the two environments. At the bottom, the CMS Data Center hosts ExaCC, Oracle-managed Exadata hardware, where data remains on-premises under CMS control.
        </desc>
        <defs>
          <pattern id="oracle-tgrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="oracle-ociGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#C74634" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#C74634" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="oracle-excGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#dfb01c" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#dfb01c" stopOpacity="0" />
          </radialGradient>
          <filter id="oracle-shadow" x="-15%" y="-30%" width="130%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.55)" />
          </filter>
        </defs>
        <rect width="520" height="380" rx="14" fill="#07124d" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <rect width="520" height="380" rx="14" fill="url(#oracle-tgrid)" />
        <ellipse cx="260" cy="108" rx="120" ry="58" fill="url(#oracle-ociGlow)" />
        <rect x="36" y="18" width="448" height="154" rx="12" fill="#07124d" stroke="#C74634" strokeWidth="1.4" />
        <text x="260" y="44" textAnchor="middle" fill="#C74634" fontSize="11" fontWeight="700" letterSpacing="0.14em" fontFamily="inherit">OCI US GOVERNMENT REGION</text>
        {[
          { x: 116, y: 80, label: 'Compute', w: 78 },
          { x: 210, y: 80, label: 'Database', w: 78 },
          { x: 304, y: 80, label: 'Networking', w: 84 },
          { x: 404, y: 80, label: 'Storage', w: 68 },
        ].map(({ x, y, label, w }) => (
          <g key={label} filter="url(#oracle-shadow)" aria-hidden="true">
            <rect x={x - w / 2} y={y - 14} width={w} height={26} rx="7" fill="rgba(199,70,52,0.14)" stroke="rgba(199,70,52,0.5)" strokeWidth="1" />
            <text x={x} y={y + 4.5} textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="inherit" fontWeight="600">{label}</text>
          </g>
        ))}
        {[
          { x: 163, y: 118, label: 'Identity & Access Mgmt', w: 148 },
          { x: 356, y: 118, label: 'Autonomous Database', w: 148 },
        ].map(({ x, y, label, w }) => (
          <g key={label} filter="url(#oracle-shadow)" aria-hidden="true">
            <rect x={x - w / 2} y={y - 14} width={w} height={26} rx="7" fill="rgba(199,70,52,0.09)" stroke="rgba(199,70,52,0.38)" strokeWidth="0.9" />
            <text x={x} y={y + 4.5} textAnchor="middle" fill="#b6bde0" fontSize="9.5" fontFamily="inherit" fontWeight="500">{label}</text>
          </g>
        ))}
        <g aria-hidden="true">
          <rect x="48" y="148" width="112" height="18" rx="5" fill="rgba(52,168,83,0.13)" stroke="rgba(52,168,83,0.55)" strokeWidth="0.8" />
          <circle cx="62" cy="157" r="4" fill="#34A853" />
          <text x="72" y="161" fill="#34A853" fontSize="9.5" fontWeight="700" fontFamily="inherit">FedRAMP High</text>
          <rect x="172" y="148" width="128" height="18" rx="5" fill="rgba(110,182,255,0.1)" stroke="rgba(110,182,255,0.45)" strokeWidth="0.8" />
          <text x="236" y="161" textAnchor="middle" fill="#6eb6ff" fontSize="9.5" fontWeight="700" fontFamily="inherit">FISMA Authorized</text>
          <rect x="312" y="148" width="100" height="18" rx="5" fill="rgba(223,176,28,0.1)" stroke="rgba(223,176,28,0.4)" strokeWidth="0.8" />
          <text x="362" y="161" textAnchor="middle" fill="#dfb01c" fontSize="9.5" fontWeight="700" fontFamily="inherit">Cloud ATO</text>
        </g>
        <line x1="260" y1="172" x2="260" y2="238" stroke="rgba(110,182,255,0.08)" strokeWidth="32" />
        <line x1="260" y1="172" x2="260" y2="238" stroke="rgba(110,182,255,0.13)" strokeWidth="18" />
        <line x1="251" y1="172" x2="251" y2="238" stroke="#6eb6ff" strokeWidth="1.5" strokeDasharray="7 5" strokeOpacity="0.65" style={{ animation: 'oracleFlowDash 1.3s linear infinite' }} />
        <line x1="260" y1="172" x2="260" y2="238" stroke="#6eb6ff" strokeWidth="1.5" strokeDasharray="7 5" strokeOpacity="0.45" style={{ animation: 'oracleFlowDash 1.3s linear infinite 0.45s' }} />
        <line x1="269" y1="172" x2="269" y2="238" stroke="#6eb6ff" strokeWidth="1.5" strokeDasharray="7 5" strokeOpacity="0.65" style={{ animation: 'oracleFlowDash 1.3s linear infinite 0.9s' }} />
        <rect x="196" y="196" width="128" height="22" rx="11" fill="#040b2e" stroke="rgba(110,182,255,0.6)" strokeWidth="1" />
        <text x="260" y="211.5" textAnchor="middle" fill="#6eb6ff" fontSize="10.5" fontWeight="700" fontFamily="inherit" letterSpacing="0.1em">FastConnect</text>
        <text x="288" y="188" fill="rgba(110,182,255,0.5)" fontSize="8" fontStyle="italic" fontFamily="inherit" aria-hidden="true">encrypted</text>
        {[0, 0.5, 1.0].map((delay, i) => (
          <circle key={i} cx="260" cy="172" r="4" fill="#6eb6ff" opacity="0.85" aria-hidden="true">
            <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${delay}s`} calcMode="linear">
              <mpath href="#oracle-fcPath" />
            </animateMotion>
          </circle>
        ))}
        <path id="oracle-fcPath" d="M260,172 L260,238" fill="none" />
        <ellipse cx="260" cy="300" rx="120" ry="52" fill="url(#oracle-excGlow)" />
        <rect x="36" y="238" width="448" height="126" rx="12" fill="#07124d" stroke="#dfb01c" strokeWidth="1.4" />
        <text x="260" y="262" textAnchor="middle" fill="#dfb01c" fontSize="11" fontWeight="700" letterSpacing="0.14em" fontFamily="inherit">CMS DATA CENTER</text>
        <rect x="142" y="272" width="236" height="52" rx="10" fill="rgba(223,176,28,0.1)" stroke="rgba(223,176,28,0.5)" strokeWidth="1.2" />
        <text x="260" y="294" textAnchor="middle" fill="#dfb01c" fontSize="13" fontWeight="800" fontFamily="inherit">ExaCC</text>
        <text x="260" y="311" textAnchor="middle" fill="#b6bde0" fontSize="10" fontFamily="inherit">Oracle-managed Exadata hardware</text>
        <rect x="96" y="336" width="328" height="20" rx="5" fill="rgba(223,176,28,0.07)" stroke="rgba(223,176,28,0.3)" strokeWidth="0.8" />
        <text x="260" y="350" textAnchor="middle" fill="#dfb01c" fontSize="9.5" fontFamily="inherit" fontWeight="600">Data remains on-premises · CMS controlled facility</text>
      </svg>
    </div>
  )
}

void [_H4, OverviewLanding, Mono]

export function OraclePlatformGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSub, setActiveSub] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const switchTab = (id: string) => {
    setActiveTab(id)
    const firstSub = (SIDEBAR_LINKS[id] ?? [])[0]?.id ?? null
    setActiveSub(id === 'overview' ? null : firstSub)
    window.scrollTo({ top: 0 })
  }

  const switchSub = (id: string | null) => {
    setActiveSub(id)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0 })
  }

  const sidebarLinks = SIDEBAR_LINKS[activeTab] ?? []
  const activeSubLabel = sidebarLinks.find(l => l.id === activeSub)?.label ?? ''
  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label ?? ''

  const currentIdx = sidebarLinks.findIndex(l => l.id === activeSub)
  const prevLink = currentIdx > 0 ? sidebarLinks[currentIdx - 1] : null
  const nextLink = currentIdx >= 0 && currentIdx < sidebarLinks.length - 1 ? sidebarLinks[currentIdx + 1] : null

  const renderContent = () => {
    if (activeSub && SUB_CONTENT[activeSub]) return SUB_CONTENT[activeSub]()
    if (activeTab === 'resources') return <ResourcesPanel />
    if (activeTab !== 'overview' && sidebarLinks.length > 0) {
      return <SectionLanding tabId={activeTab} title={activeTabLabel} description={SECTION_DESC[activeTab] ?? ''} onNav={switchSub} />
    }
    return <OvIntro />
  }

  return (
    <div className="gcp-guide">

      {activeTab === 'overview' && (
        <>
        <div className="gcp-crumb-bar">
          <nav className="gcp-crumb gcp-page__shell" aria-label="Breadcrumb">
            <ol className="kc-breadcrumb-list">
              <li>
                <Link to="/" className="kc-breadcrumb-link">Cloud.CMS.gov</Link>
              </li>
              <li className="kc-breadcrumb-sep" aria-hidden="true">›</li>
              <li>
                <Link to="/explore" className="kc-breadcrumb-link">Explore</Link>
              </li>
              <li className="kc-breadcrumb-sep" aria-hidden="true">›</li>
              <li>
                <span className="kc-breadcrumb-current" aria-current="page">Oracle Cloud Infrastructure</span>
              </li>
            </ol>
          </nav>
        </div>
        <section className="gcp-hero" aria-labelledby="oracle-hero-heading">
          <div className="gcp-page__shell gcp-hero__inner">
            <h1 id="oracle-hero-heading" className="fusion-hero__headline explore-hero__headline gcp-hero__title">
              <span className="block font-semibold leading-[1.2] tracking-tight">
                Oracle Cloud Infrastructure
              </span>
            </h1>
            <div className="gcp-hero__layout">
              <div className="gcp-hero__copy">
                <p className="gcp-hero__lede">Enterprise workloads, cloud or on-premises.</p>
                <p className="fusion-hero__body explore-hero__body gcp-hero__body">
                  CMS Cloud Fusion supports OCI and ExaCC as approved hosting options for database workloads, enterprise applications, and hybrid deployments. FedRAMP High authorized and designed for regulated federal environments.
                </p>
                <div>
                  <div className="gcp-hero__finds-label">What you&rsquo;ll find</div>
                  <ul className="gcp-hero__finds">
                    {['OCI & ExaCC Capabilities', 'Approved Cloud Services', 'Architecture & Networking', 'Security & Compliance', 'Operations & Support'].map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="gcp-hero__panel oracle-hero__panel">
                <OracleHeroTopology />
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      <nav className="gcp-tabs-bar" aria-label="Content sections">
        <div className="gcp-tabs-bar__inner gcp-page__shell">
          <div className="explore-tabs gcp-tabs" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="oracle-guide-content"
                onClick={() => switchTab(tab.id)}
                className={`explore-tabs__tab${activeTab === tab.id ? ' explore-tabs__tab--active' : ''}`}
              >
                {tab.id === 'overview' ? <HomeTabIcon active={activeTab === 'overview'} /> : null}
                {tab.label}
              </button>
            ))}
          </div>
          <FusionButton href="/#pathways" accent onDark size="small" className="gcp-tabs-cta">
            Get started with Oracle Cloud
            <ChevronRight />
          </FusionButton>
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--fusion-nav-sticky-height, 5rem) - 53px)' }}>

        <aside role="navigation" aria-label="Section navigation" style={{
          width: activeTab !== 'overview' ? 240 : 0,
          flexShrink: 0,
          background: C.deepBg,
          borderRight: activeTab !== 'overview' ? `1px solid ${C.border}` : 'none',
          position: 'sticky',
          top: 'calc(var(--fusion-nav-sticky-height, 5rem) + 53px)',
          height: 'calc(100vh - var(--fusion-nav-sticky-height, 5rem) - 53px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: activeTab !== 'overview' ? 24 : 0,
          transition: 'width 0.2s ease',
        }}>
          <button type="button" onClick={() => switchSub(null)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 20px 14px', textAlign: 'left', fontFamily: 'inherit' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: !activeSub ? C.azure : C.textMuted, transition: 'color 0.12s' }}>{activeTabLabel}</span>
            {!activeSub && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />}
          </button>

          {sidebarLinks.map(({ id, label }) => {
            const isActive = activeSub === id
            return (
              <button key={id} type="button" onClick={() => switchSub(id)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'block', width: '100%', background: isActive ? 'color-mix(in srgb, #6eb6ff 12%, transparent)' : 'none',
                  border: 'none', cursor: 'pointer', padding: '9px 20px', textAlign: 'left',
                  fontSize: '0.8125rem', color: isActive ? C.azure : C.textSecondary,
                  fontWeight: isActive ? 600 : 400, fontFamily: 'inherit',
                  borderLeft: isActive ? `3px solid ${C.cmsBlue}` : '3px solid transparent',
                  transition: 'color 0.12s, background 0.12s', lineHeight: 1.45,
                }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.color = C.textPrimary; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)' } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.color = C.textSecondary; (e.currentTarget as HTMLButtonElement).style.background = 'none' } }}
              >
                {label}
              </button>
            )
          })}

          {sidebarLinks.length > 0 && (
            <div style={{ margin: '20px 20px 0', paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ fontSize: '0.775rem', color: C.textMuted, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.12s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.azure}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textMuted}
              >
                Get Support <ExternalIcon />
              </a>
            </div>
          )}
        </aside>

        <div id="oracle-guide-content" ref={contentRef} style={{ flex: 1, background: C.mainBg, minWidth: 0 }}>

          {activeTab !== 'overview' && <SectionPhotoBanner sectionId={activeTab} />}

          <div style={{ padding: activeSub ? '28px 48px 64px' : '24px 48px 72px', maxWidth: activeSub ? 860 : 1100 }}>

            {activeTab !== 'overview' && (
              <nav aria-label="Breadcrumb" className="gcp-crumb gcp-crumb--inline">
                <ol className="kc-breadcrumb-list">
                  <li>
                    <button type="button" className="kc-breadcrumb-link" onClick={() => switchTab('overview')}>
                      Oracle Cloud Infrastructure
                    </button>
                  </li>
                  <li className="kc-breadcrumb-sep" aria-hidden="true">›</li>
                  {activeSub ? (
                    <>
                      <li>
                        <button type="button" className="kc-breadcrumb-link" onClick={() => switchSub(null)}>
                          {activeTabLabel}
                        </button>
                      </li>
                      <li className="kc-breadcrumb-sep" aria-hidden="true">›</li>
                      <li>
                        <span className="kc-breadcrumb-current" aria-current="page">{activeSubLabel}</span>
                      </li>
                    </>
                  ) : (
                    <li>
                      <span className="kc-breadcrumb-current" aria-current="page">{activeTabLabel}</span>
                    </li>
                  )}
                </ol>
              </nav>
            )}

            {renderContent()}

            {activeSub && (prevLink || nextLink) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
                {prevLink ? (
                  <button type="button" onClick={() => switchSub(prevLink.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3, background: C.cardBg, border: `1px solid ${C.border}`, cursor: 'pointer', padding: '12px 20px', borderRadius: 8, fontFamily: 'inherit', transition: 'border-color 0.15s', maxWidth: '45%' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.cmsBlue}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}
                  >
                    <span style={{ fontSize: '0.7rem', color: C.textMuted, letterSpacing: '0.04em' }}>← Previous</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: C.azure, textAlign: 'left' }}>{prevLink.label}</span>
                  </button>
                ) : <div />}
                {nextLink ? (
                  <button type="button" onClick={() => switchSub(nextLink.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, background: C.cardBg, border: `1px solid ${C.border}`, cursor: 'pointer', padding: '12px 20px', borderRadius: 8, fontFamily: 'inherit', transition: 'border-color 0.15s', maxWidth: '45%' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.cmsBlue}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}
                  >
                    <span style={{ fontSize: '0.7rem', color: C.textMuted, letterSpacing: '0.04em' }}>Next →</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: C.azure, textAlign: 'right' }}>{nextLink.label}</span>
                  </button>
                ) : <div />}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
