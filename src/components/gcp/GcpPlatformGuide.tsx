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
  gold: 'var(--fusion-yellow)',
  amber: 'var(--fusion-yellow)',
  green: '#34A853',
  red: '#C74634',
  border: 'color-mix(in srgb, #ffffff 7%, transparent)',
  borderMid: 'color-mix(in srgb, #ffffff 13%, transparent)',
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'security', label: 'Security & Compliance' },
  { id: 'cost', label: 'Cost Management' },
  { id: 'access', label: 'Operations' },
  { id: 'resources', label: 'Resources' },
]

const SIDEBAR_LINKS: Record<string, { id: string; label: string }[]> = {
  overview: [
    { id: 'ov-intro', label: 'Introduction' },
    { id: 'ov-hosting', label: 'Approved Hosting Options' },
    { id: 'ov-standard', label: 'GKE Standard' },
    { id: 'ov-fisma', label: 'FISMA & Boundaries' },
    { id: 'ov-support', label: 'Support Model' },
    { id: 'ov-features', label: 'Platform Features' },
    { id: 'ov-attachments', label: 'Attachments & Decommissioning' },
    { id: 'ov-best-practices', label: 'Best Practices' },
  ],
  architecture: [
    { id: 'arch-hosting', label: 'Hosting Topology' },
    { id: 'arch-connectivity', label: 'Connectivity' },
    { id: 'arch-iam', label: 'Identity & Access' },
    { id: 'arch-gold', label: 'Google Gold Image' },
    { id: 'arch-waf', label: 'Well-Architected Framework' },
  ],
  security: [
    { id: 'sec-iam', label: 'IAM & Security' },
    { id: 'sec-scc-merged', label: 'Security Command Center' },
    { id: 'sec-logging', label: 'Logging & Splunk' },
    { id: 'sec-policy-merged', label: 'Policy & Constraints' },
  ],
  cost: [
    { id: 'acc-cost', label: 'FinOps & Billing' },
  ],
  access: [
    { id: 'acc-identity-merged', label: 'Identity & Console Access' },
    { id: 'acc-pam-merged', label: 'Privileged Access Management' },
    { id: 'acc-service', label: 'Service Accounts' },
    { id: 'acc-monitoring', label: 'Monitoring & Alerting' },
    { id: 'acc-backup', label: 'Backup & Recovery' },
  ],
  resources: [
    { id: 'res-support', label: 'Getting Support' },
    { id: 'res-reference', label: 'Documentation & Reference' },
    { id: 'res-terraform', label: 'Terraform & Infrastructure' },
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

function _CheckIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="7" fill="rgba(52,168,83,0.2)" stroke="#34A853" strokeWidth="1.5" />
      <path d="M4.5 8l2.5 2.5 4-4" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function PhotoBreak({ height = 180, caption }: {
  src?: string; alt?: string; height?: number; caption?: string; overlay?: string
}) {
  return (
    <div style={{
      position: 'relative',
      height,
      overflow: 'hidden',
      margin: '32px 0',
      borderRadius: 10,
      background: 'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)',
      border: '1px solid var(--color-border-bright)',
    }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.35, background: 'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--fusion-deep-sea-500) 45%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--fusion-yellow) 18%, transparent) 0%, transparent 50%)' }} />
      {caption && (
        <div style={{ position: 'absolute', bottom: 24, left: 32, right: 32 }}>
          <p style={{ fontSize: '1rem', fontStyle: 'italic', color: C.textPrimary, margin: 0, lineHeight: 1.6, maxWidth: 680 }}>"{caption}"</p>
        </div>
      )}
    </div>
  )
}

function _SectionWrap({ id, bg, children }: { id: string; bg: string; children: ReactNode }) {
  return <div id={`section-bg-${id}`} style={{ background: bg, padding: '56px 0' }}>{children}</div>
}

function _Inner({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>{children}</div>
}

// ─── Content helpers ──────────────────────────────────────────────────────────

function H2({ children }: { children: ReactNode }) {
  return <h2 className="explore-section-heading gcp-guide__h2">{children}</h2>
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="gcp-guide__h3">{children}</h3>
}

function H4({ children }: { children: ReactNode }) {
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

// ─── Sub-section content ──────────────────────────────────────────────────────

function OvIntro() {
  return (
    <div>
      <p className="gcp-guide__lede">Google Cloud Platform (GCP) is CMS's strategic cloud provider for scalable, compliant, and mission-critical workloads. It provides a suite of managed services — from compute and storage to AI and data analytics — all operated within a FedRAMP High-authorized boundary.</p>
      <Callout text="GCP offers a secure, scalable foundation for modernizing healthcare technology. CMS teams benefit from pre-approved hosting options, shared security controls, and centrally managed infrastructure." />
      <Divider />
      <H2>Why Consider Google Cloud?</H2>
      <Body>Google Cloud Platform provides a modern alternative to traditional on-premises and co-location hosting. Teams that move to GCP benefit from elastic infrastructure that scales with demand, built-in security controls aligned to FISMA and FedRAMP requirements, and access to managed services that reduce operational overhead.</Body>
      <Body>Rather than managing physical hardware or operating system patches, teams can focus on building and delivering software. Google's global network and managed database, caching, and compute offerings provide high availability and performance without requiring deep infrastructure expertise.</Body>
      <Divider />
      <H2>Virtual Private Cloud (VPC) Overview</H2>
      <Body>A Virtual Private Cloud (VPC) is a logically isolated network within Google Cloud. CMS workloads operate within Shared VPCs, which allow multiple projects to share a single centrally managed network. This model reduces duplication, improves traffic control, and allows security teams to apply consistent firewall and routing policies across all hosted applications.</Body>
      <Body>Each application team receives a project connected to the Shared VPC. Network access is controlled through firewall rules, Private Google Access, and VPC Service Controls. Direct internet egress is not permitted; all traffic routes through centrally managed gateways.</Body>
      <Bullet items={[
        'Shared VPC: a single network shared across multiple service projects',
        'VPC Service Controls: protect sensitive data by defining service perimeters',
        'Private Google Access: allows resources without external IPs to reach Google APIs',
        'Cloud NAT: provides outbound internet access without exposing internal IPs',
      ]} />
    </div>
  )
}

function OvHosting() {
  return (
    <div>
      <H2>Approved Hosting Options</H2>
      <Body>CMS has approved four primary hosting models within Google Cloud. Each model is suited to different workload types and operational requirements. Selecting the right model depends on your application's containerization maturity, compliance requirements, and team expertise.</Body>
      <Divider />
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: C.mainBg }}>
              {['Hosting Option', 'Description', 'Best For', 'Complexity'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.textPrimary, borderBottom: `1px solid ${C.borderMid}`, borderRight: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { option: 'Cloud Run', desc: 'Fully managed serverless compute for containerized applications. No cluster management required.', best: 'Stateless microservices, APIs, event-driven workloads', complexity: 'Low' },
              { option: 'GKE Standard', desc: 'Managed Kubernetes with team-controlled node pools. Supports complex workloads with fine-grained scheduling.', best: 'Containerized applications requiring specific resource control', complexity: 'Medium' },
              { option: 'GKE Enterprise', desc: 'Enterprise-grade Kubernetes with multi-cluster management, policy enforcement, and advanced observability.', best: 'Large-scale, multi-team, or regulated containerized environments', complexity: 'High' },
              { option: 'Distributed Cloud', desc: 'Google-managed hardware deployed on-premises or at edge locations. Supports hybrid and air-gapped environments.', best: 'Workloads that must remain on-premises or at an edge location', complexity: 'High' },
            ].map((row, i) => (
              <tr key={row.option} style={{ background: i % 2 === 0 ? C.cardBg : C.mainBg }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: C.textPrimary, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{row.option}</td>
                <td style={{ padding: '12px 14px', color: C.textSecondary, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.6 }}>{row.desc}</td>
                <td style={{ padding: '12px 14px', color: C.textSecondary, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.6 }}>{row.best}</td>
                <td style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
                  <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600, background: row.complexity === 'Low' ? 'rgba(52,168,83,0.15)' : row.complexity === 'Medium' ? 'rgba(223,176,28,0.15)' : 'rgba(199,70,52,0.15)', color: row.complexity === 'Low' ? C.green : row.complexity === 'Medium' ? C.gold : C.red }}>{row.complexity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout text="Not sure which hosting model is right for your workload? Contact your Hosting Coordinator or submit a request through the CMS Hybrid Cloud support portal to discuss your requirements." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function OvStandard() {
  return (
    <div>
      <H2>GKE Standard</H2>
      <Body>Google Kubernetes Engine (GKE) Standard provides a managed Kubernetes control plane with team-managed node pools. It gives application teams direct control over node configuration, autoscaling policies, and workload scheduling while Google handles control plane availability and upgrades.</Body>
      <Divider />
      <H3>When to Use GKE Standard</H3>
      <Bullet items={[
        'Your application is containerized and requires persistent workloads',
        'You need specific machine types or GPU/TPU node configurations',
        'You require advanced scheduling controls (node affinity, taints, tolerations)',
        'Your team has Kubernetes operational experience',
        'Your workload is stateful and requires persistent volumes',
      ]} />
      <Divider />
      <H3>Key Capabilities</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { title: 'Managed Control Plane', desc: 'Google manages the Kubernetes API server, etcd, and scheduler — reducing operational burden for the application team.' },
          { title: 'Node Autoscaling', desc: 'Cluster Autoscaler automatically adds or removes nodes based on pending pod requests and resource utilization.' },
          { title: 'Workload Identity', desc: 'Securely connect Kubernetes service accounts to Google Cloud IAM service accounts without managing credentials.' },
          { title: 'Binary Authorization', desc: 'Enforce policy-based deployment controls to ensure only verified container images are deployed to the cluster.' },
          { title: 'Release Channels', desc: 'Choose between Rapid, Regular, and Stable release channels to control when your cluster receives Kubernetes updates.' },
          { title: 'Private Cluster', desc: 'Nodes have no external IP addresses; all traffic routes through the Shared Virtual Private Cloud network internally.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Networking Model</H3>
      <Body>GKE Standard clusters within CMS are deployed as private clusters connected to the Shared Virtual Private Cloud. Pods receive IP addresses from an alias IP range within the Shared VPC subnet. Services are exposed internally using internal TCP/UDP load balancers or through Istio/Anthos Service Mesh for service-to-service communication.</Body>
      <Body>External traffic is routed through a centrally managed external HTTPS load balancer with Cloud Armor WAF rules applied at the perimeter.</Body>
    </div>
  )
}

function OvFisma() {
  return (
    <div>
      <H2>FISMA Boundaries & Compliance</H2>
      <Body>CMS Google Cloud environments are organized into FISMA boundaries that determine the sensitivity level of data and systems hosted within each project. FISMA boundaries align to NIST SP 800-37 and support CMS's Authority to Operate (ATO) process.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {[
          { level: 'Low', color: C.green, bg: 'rgba(52,168,83,0.08)', border: 'rgba(52,168,83,0.3)', desc: 'Appropriate for publicly available information with no privacy implications. Limited impact if confidentiality, integrity, or availability is compromised. Typical for public-facing websites, marketing content, or non-sensitive reference data.', examples: ['Public documentation sites', 'Non-sensitive reference data', 'Marketing and informational content'] },
          { level: 'Moderate', color: C.gold, bg: 'rgba(223,176,28,0.08)', border: 'rgba(223,176,28,0.3)', desc: 'Used for systems that handle PII, PHI, or other controlled but not classified information. Most CMS healthcare applications operate at the Moderate level. Requires enhanced logging, access controls, and security monitoring.', examples: ['Healthcare applications handling PHI', 'Internal administrative systems', 'Beneficiary-facing portals'] },
          { level: 'High — East Region', color: C.red, bg: 'rgba(199,70,52,0.08)', border: 'rgba(199,70,52,0.3)', desc: 'Reserved for systems where a compromise would have severe or catastrophic adverse effects on operations, assets, or individuals. High-impact systems require the most rigorous controls and continuous monitoring. CMS High systems are restricted to the us-east4 (Northern Virginia) Google Cloud region.', examples: ['Systems with direct financial payment processing', 'Infrastructure supporting critical agency operations', 'Systems with sensitive law enforcement or national security data'] },
        ].map(({ level, color, bg, border, desc, examples }) => (
          <div key={level} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, background: color, color: level === 'Moderate' ? 'var(--fusion-deep-sea-800)' : '#fff' }}>FISMA {level}</span>
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
      <H3>Considerations When Selecting a FISMA Level</H3>
      <Bullet items={[
        'The data sensitivity classification drives the boundary selection — systems handling PHI or PII generally require at minimum a Moderate boundary',
        'High boundaries require additional approval steps and may have longer provisioning timelines',
        'Interconnections between boundaries require documented data flows and security agreements',
        'All FISMA boundaries within CMS Google Cloud are covered under the CMS Cloud ATO program, reducing the burden on individual system owners',
      ]} />
    </div>
  )
}

function OvSupport() {
  return (
    <div>
      <H2>Support Model</H2>
      <Body>CMS Multi-Cloud provides a layered support model for Google Cloud environments. Support is delivered through a combination of centralized shared services, a dedicated Hosting Coordinator program, and a self-service knowledge base.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { tier: 'Tier 1 — Self-Service', desc: 'Teams first consult the Cloud.CMS.gov knowledge base, runbooks, and this documentation site. Most common tasks such as access requests, project onboarding, and standard configuration changes are documented end-to-end.' },
          { tier: 'Tier 2 — Hosting Coordinator', desc: 'Each CMS system is assigned a Hosting Coordinator who assists with project onboarding, architecture review, compliance questions, and escalations. Hosting Coordinators serve as the primary point of contact between the CMS system team and the Cloud Operations team.' },
          { tier: 'Tier 3 — Cloud Operations', desc: 'The CMS Cloud Operations team handles platform-level incidents, infrastructure outages, network issues, and security events. Issues are escalated from the Hosting Coordinator or submitted directly through the support portal for urgent incidents.' },
          { tier: 'Tier 4 — Google Support', desc: 'CMS Hybrid Cloud holds a Premium Support agreement with Google. For issues that require Google engineering involvement — such as service degradations, product bugs, or complex networking problems — tickets are escalated to Google on behalf of CMS teams.' },
        ].map(({ tier, desc }) => (
          <Card key={tier} title={tier}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="Contact the Cloud Support Team for assistance with Google Cloud environments, requests, or access issues." />
      <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.875rem', fontWeight: 700, padding: '9px 20px', borderRadius: 999, textDecoration: 'none' }}>
        Get Support <ExternalIcon />
      </a>
    </div>
  )
}

function OvFeatures() {
  return (
    <div>
      <H2>Platform Features</H2>
      <Body>CMS Google Cloud Platform provides a broad set of managed services and shared capabilities available to all hosted workloads. These features reduce the engineering effort required to build secure, observable, and compliant applications.</Body>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Shared Virtual Private Cloud', desc: 'Centrally managed network fabric. Projects connect to a Shared VPC, eliminating per-project network management and ensuring consistent routing and firewall policies.' },
          { title: 'Cloud Armor WAF', desc: 'Google-managed Web Application Firewall with OWASP Top 10 protection, DDoS mitigation, and custom rule support applied at the load balancer perimeter.' },
          { title: 'Cloud Identity & IAM', desc: 'Federated identity via CMS SSO (EUA). All identities are provisioned through Cloud Identity and managed with IAM policies and Privileged Access Manager for just-in-time elevation.' },
          { title: 'Security Command Center', desc: 'Centralized security posture management. Misconfigurations, threats, and vulnerabilities across all projects are surfaced in a single view with automated findings and remediation guidance.' },
          { title: 'Splunk Integration', desc: 'All Google Cloud audit logs and platform logs are forwarded to CMS Splunk for centralized analysis, alerting, and long-term retention by the security operations team.' },
          { title: 'Cloud KMS', desc: 'Customer-managed encryption keys for data at rest and in transit. KMS integrates with Cloud Storage, BigQuery, Cloud SQL, and other services for key lifecycle management.' },
          { title: 'Organization Policy', desc: 'Centrally enforced guardrails limit what projects can configure. Policies restrict allowed regions, service account key creation, public IP assignment, and other high-risk operations.' },
          { title: 'Terraform Foundations', desc: 'Infrastructure is provisioned through CMS-managed Terraform modules that embed security defaults, naming conventions, and compliance controls from the first line of code.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function OvAttachments() {
  return (
    <div>
      <H2>Attachments & Decommissioning</H2>
      <Body>This section covers the documentation artifacts associated with CMS Google Cloud environments and the process for decommissioning hosted workloads.</Body>
      <Divider />
      <H3>Available Attachments</H3>
      <Body>The following artifacts are maintained for each provisioned environment and are available through the CMS Hosting Coordinator upon request:</Body>
      <Bullet items={[
        'System Security Plan (SSP) addenda covering Google Cloud-specific controls',
        'Network Architecture Diagram for the assigned Shared VPC and project topology',
        'Inheritance documentation mapping CMS Cloud inherited controls to system control sets',
        'Data Flow Diagrams for regulated data traversing the Google Cloud environment',
        'Interconnection Security Agreements (ISAs) for connections to external systems or on-premises environments',
      ]} />
      <Divider />
      <H3>Decommissioning a Google Cloud Workload</H3>
      <Body>Decommissioning a workload hosted in CMS Google Cloud requires coordination with the Hosting Coordinator and the Cloud Operations team. The following steps outline the standard decommissioning process:</Body>
      <NumList items={[
        'Submit a decommissioning request through the support portal at least 30 days before the planned shutdown date',
        'Confirm data retention requirements and export or archive regulated data per the applicable records management policy',
        'Remove all IAM bindings and service account keys associated with the project',
        'Disable or delete any scheduled jobs, pub/sub subscriptions, and event-driven triggers',
        'Shut down and delete all compute resources, databases, and storage buckets',
        'Notify the Cloud Operations team to remove project-level monitoring, alerting, and log export configurations',
        'Submit final network depeering and firewall rule removal request to the network operations team',
        'Confirm decommissioning is complete with the Hosting Coordinator and close out the ATO record',
      ]} />
      <Callout text="Data must be retained or properly disposed of before project deletion. Verify all data handling steps with your Information System Security Officer (ISSO) prior to initiating decommissioning." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function OvBestPractices() {
  return (
    <div>
      <H2>Best Practices</H2>
      <Body>The following best practices apply to all workloads hosted on CMS Google Cloud Platform. They reflect lessons learned from operating at scale in a regulated environment and are aligned to CMS policy, Google's Well-Architected Framework, and NIST guidance.</Body>
      <Divider />
      {[
        {
          category: 'Security & Identity',
          items: [
            'Use Workload Identity Federation instead of service account keys for workload-to-service authentication',
            'Apply least-privilege IAM roles — avoid basic roles (Owner, Editor, Viewer) in production',
            'Enable Privileged Access Manager (PAM) for all administrative roles in production environments',
            'Rotate secrets stored in Secret Manager on a defined schedule; never hardcode credentials in code or configuration',
          ],
        },
        {
          category: 'Networking',
          items: [
            'Deploy all workloads into the Shared Virtual Private Cloud — do not create standalone VPCs without Cloud Operations approval',
            'Use Private Google Access to reach Google APIs from resources without external IP addresses',
            'Apply VPC Service Controls around sensitive data services to prevent data exfiltration',
            'Use internal load balancers for service-to-service traffic; reserve external load balancers for perimeter ingress only',
          ],
        },
        {
          category: 'Reliability & Operations',
          items: [
            'Tag all resources with required labels: environment, owner, cost-center, and data-classification',
            'Define and test disaster recovery procedures before deploying to production',
            'Use Cloud Monitoring dashboards and budget alerts to detect anomalies early',
            'Automate infrastructure provisioning with Terraform; avoid manual console-based changes in production',
          ],
        },
        {
          category: 'Cost Management',
          items: [
            'Set budget alerts at 80% and 100% of monthly spend for every project',
            'Review committed use discount recommendations quarterly and act on opportunities for predictable workloads',
            'Delete or rightsize idle or underutilized resources; use the FinOps Hub recommendations as a starting point',
            'Export billing data to BigQuery and build Looker Studio dashboards for trend analysis across teams',
          ],
        },
      ].map(({ category, items }) => (
        <div key={category} style={{ marginBottom: 24 }}>
          <H3>{category}</H3>
          <Bullet items={items} />
        </div>
      ))}
    </div>
  )
}

// ─── Architecture sub-sections ────────────────────────────────────────────────

function ArchIntro() {
  return (
    <div>
      <H2>Architecture Overview</H2>
      <Body>The CMS Google Cloud architecture is built on a hub-and-spoke network model with a centrally managed Shared Virtual Private Cloud (VPC). Application teams connect to the shared network through service projects, inheriting network controls, security policies, and observability tooling managed by the Cloud Operations team.</Body>
      <PhotoBreak caption="A secure, layered architecture that puts compliance and reliability first." />
      <H3>Design Principles</H3>
      <Bullet items={[
        'Security by default — all projects inherit baseline controls from the organization policy and Shared VPC',
        'Least privilege — identity and network access is scoped to the minimum required for the task',
        'Immutable infrastructure — production environments are provisioned through code; manual changes are restricted',
        'Defense in depth — multiple layers of control (network, identity, data, application) protect workloads',
        'Observability first — logging, monitoring, and tracing are enabled at the platform level before workloads are deployed',
      ]} />
    </div>
  )
}

function ArchHosting() {
  return (
    <div>
      <H2>Hosting Topology</H2>
      <Body>The CMS Google Cloud hosting topology uses a landing zone model. A shared host project owns the Shared VPC and manages subnets, firewall rules, and routing. Application projects are attached to the Shared VPC as service projects. This model allows the network team to enforce consistent policies while giving application teams autonomy over their compute, storage, and application services.</Body>

      {/* ── Topology diagram ── */}
      <div style={{ margin: '28px 0 8px', background: 'rgba(4,11,46,0.7)', border: `1px solid ${C.border}`, borderRadius: 12, padding: '32px 24px', overflowX: 'auto' }}>
        <svg viewBox="0 0 820 340" width="100%" style={{ minWidth: 640, display: 'block' }} aria-label="CMS Google Cloud hosting topology diagram" role="img">
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#4a5588" />
            </marker>
            <marker id="arrBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6eb6ff" />
            </marker>
            <marker id="arrGold" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#dfb01c" />
            </marker>
          </defs>

          {/* ── On-premises ── */}
          <rect x="10" y="110" width="130" height="120" rx="8" fill="#040b2e" stroke="#4a5588" strokeWidth="1.5" />
          <text x="75" y="135" textAnchor="middle" fill="#e7e9f5" fontSize="9" fontFamily="Lexend, Public Sans, sans-serif" letterSpacing="0.08em" fontWeight="600">ON-PREMISES</text>
          <rect x="26" y="145" width="98" height="28" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="75" y="163" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif" fontWeight="500">CMS Data Center</text>
          <rect x="26" y="183" width="98" height="28" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="75" y="201" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif" fontWeight="500">CMSNet / EDC</text>

          {/* On-prem → NCC arrow + label */}
          <line x1="140" y1="170" x2="196" y2="170" stroke="#4a5588" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr)" />
          <text x="168" y="159" textAnchor="middle" fill="#e7e9f5" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif">Interconnect</text>
          <text x="168" y="170" textAnchor="middle" fill="#e7e9f5" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif">/ VPN</text>

          {/* ── NCC Hub ── */}
          <rect x="200" y="96" width="138" height="148" rx="8" fill="#040b2e" stroke="#6eb6ff" strokeWidth="1.5" />
          <text x="269" y="118" textAnchor="middle" fill="#6eb6ff" fontSize="9" fontFamily="Lexend, Public Sans, sans-serif" letterSpacing="0.08em" fontWeight="700">CONNECTIVITY</text>
          <rect x="216" y="128" width="106" height="30" rx="5" fill="#040b2e" stroke="#6eb6ff" strokeWidth="1" strokeOpacity="0.5" />
          <text x="269" y="147" textAnchor="middle" fill="#6eb6ff" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif" fontWeight="600">NCC Hub</text>
          <rect x="216" y="167" width="106" height="26" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="269" y="184" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Cloud Router</text>
          <rect x="216" y="200" width="106" height="26" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="269" y="217" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Cloud NAT</text>

          {/* NCC → Shared VPC arrow */}
          <line x1="338" y1="170" x2="390" y2="170" stroke="#6eb6ff" strokeWidth="1.5" markerEnd="url(#arrBlue)" />
          <text x="364" y="162" textAnchor="middle" fill="#6eb6ff" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif">VPC Peering</text>

          {/* ── Shared VPC (host project) ── */}
          <rect x="394" y="60" width="158" height="220" rx="8" fill="#040b2e" stroke="#dfb01c" strokeWidth="1.5" />
          <text x="473" y="83" textAnchor="middle" fill="#dfb01c" fontSize="9" fontFamily="Lexend, Public Sans, sans-serif" letterSpacing="0.08em" fontWeight="700">HOST PROJECT</text>
          <rect x="410" y="93" width="126" height="30" rx="5" fill="#040b2e" stroke="#dfb01c" strokeWidth="1" strokeOpacity="0.6" />
          <text x="473" y="112" textAnchor="middle" fill="#dfb01c" fontSize="10.5" fontFamily="Lexend, Public Sans, sans-serif" fontWeight="700">Shared VPC</text>
          <rect x="410" y="133" width="126" height="26" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="473" y="150" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Subnets (us-east4)</text>
          <rect x="410" y="167" width="126" height="26" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="473" y="184" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Firewall Rules</text>
          <rect x="410" y="201" width="126" height="26" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="473" y="218" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Org Policies</text>
          <rect x="410" y="235" width="126" height="26" rx="5" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="473" y="252" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Cloud Router</text>

          {/* Shared VPC → Service projects arrow */}
          <line x1="552" y1="170" x2="604" y2="170" stroke="#6eb6ff" strokeWidth="1.5" markerEnd="url(#arrBlue)" />
          <text x="578" y="162" textAnchor="middle" fill="#6eb6ff" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif">Service</text>
          <text x="578" y="173" textAnchor="middle" fill="#6eb6ff" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif">Projects</text>

          {/* ── Service projects column ── */}
          {/* Prod */}
          <rect x="608" y="50" width="130" height="60" rx="7" fill="#040b2e" stroke="#34A853" strokeWidth="1.5" />
          <text x="673" y="70" textAnchor="middle" fill="#34A853" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif" letterSpacing="0.06em" fontWeight="700">PRODUCTION</text>
          <text x="673" y="88" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">App Project(s)</text>
          <line x1="608" y1="80" x2="552" y2="150" stroke="#34A853" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />

          {/* Non-prod */}
          <rect x="608" y="140" width="130" height="60" rx="7" fill="#040b2e" stroke="#6eb6ff" strokeWidth="1.5" />
          <text x="673" y="160" textAnchor="middle" fill="#6eb6ff" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif" letterSpacing="0.06em" fontWeight="700">NON-PRODUCTION</text>
          <text x="673" y="178" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Dev / Impl</text>

          {/* Sandbox */}
          <rect x="608" y="230" width="130" height="60" rx="7" fill="#040b2e" stroke="#b6bde0" strokeWidth="1.5" strokeDasharray="5,3" />
          <text x="673" y="250" textAnchor="middle" fill="#e7e9f5" fontSize="8.5" fontFamily="Lexend, Public Sans, sans-serif" letterSpacing="0.06em" fontWeight="700">SANDBOX</text>
          <text x="673" y="268" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif">Experimental</text>
          <line x1="608" y1="260" x2="552" y2="190" stroke="#b6bde0" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4,3" />

          {/* ── Org node at top ── */}
          <rect x="280" y="10" width="260" height="32" rx="6" fill="#040b2e" stroke="#4a5588" strokeWidth="1" />
          <text x="410" y="30" textAnchor="middle" fill="#e7e9f5" fontSize="10" fontFamily="Lexend, Public Sans, sans-serif" fontWeight="600" letterSpacing="0.04em">CMS Organization Node  ·  Org-level Policies</text>
          <line x1="410" y1="42" x2="410" y2="59" stroke="#4a5588" strokeWidth="1" strokeDasharray="3,2" />

          {/* ── Google APIs callout ── */}
          <rect x="608" y="305" width="130" height="30" rx="6" fill="#040b2e" stroke="#4a5588" strokeWidth="1" strokeDasharray="4,3" />
          <text x="673" y="324" textAnchor="middle" fill="#e7e9f5" fontSize="9.5" fontFamily="Lexend, Public Sans, sans-serif">Private Google Access</text>
          <line x1="673" y1="305" x2="673" y2="290" stroke="#4a5588" strokeWidth="1" strokeDasharray="3,2" />

          {/* Legend */}
          <g transform="translate(10, 308)">
            <rect x="0" y="0" width="8" height="8" rx="1" fill="none" stroke="#dfb01c" strokeWidth="1.5" />
            <text x="13" y="8" fill="#e7e9f5" fontSize="9" fontFamily="Lexend, Public Sans, sans-serif">Host Project</text>
            <rect x="90" y="0" width="8" height="8" rx="1" fill="none" stroke="#6eb6ff" strokeWidth="1.5" />
            <text x="103" y="8" fill="#e7e9f5" fontSize="9" fontFamily="Lexend, Public Sans, sans-serif">Connectivity Layer</text>
            <line x1="210" y1="4" x2="228" y2="4" stroke="#4a5588" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="233" y="8" fill="#e7e9f5" fontSize="9" fontFamily="Lexend, Public Sans, sans-serif">Peering / Policy boundary</text>
          </g>
        </svg>
      </div>
      <p style={{ fontSize: '0.78rem', color: C.textMuted, margin: '8px 0 28px', textAlign: 'center' }}>CMS Google Cloud landing zone — traffic and resource hierarchy</p>

      <Divider />
      <H3>Organizational Hierarchy</H3>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Organization node</strong> — the root of the CMS Google Cloud resource hierarchy. Organization-level policies apply to all folders and projects beneath it.</>,
        <><strong style={{ color: C.textPrimary }}>Environment folders</strong> — separate folders for Production, Non-Production (Dev/Test), and Sandbox environments enforce policy boundaries and access controls between environments.</>,
        <><strong style={{ color: C.textPrimary }}>Host project</strong> — owns the Shared VPC and manages network resources. The Cloud Operations team manages the host project; application teams have no direct access to it.</>,
        <><strong style={{ color: C.textPrimary }}>Service projects</strong> — application team projects connected to the Shared VPC. Teams manage compute, storage, and application services within their service project using IAM-governed access.</>,
      ]} />
      <Divider />
      <H3>Region Strategy</H3>
      <Body>All CMS Google Cloud workloads are deployed in the <strong style={{ color: C.textPrimary }}>us-east4 (Northern Virginia)</strong> region by default. Organization policies restrict resource creation to approved US regions. FISMA High systems are additionally restricted to us-east4 to meet data residency requirements.</Body>
      <Callout text="Deploying to unapproved regions is blocked by organization policy. Contact Cloud Operations if your workload has specific region requirements for latency, DR, or compliance purposes." />
    </div>
  )
}

function ArchConnectivity() {
  return (
    <div>
      <H2>Connectivity</H2>
      <Body>CMS Google Cloud connects to the CMS Enterprise Data Center (EDC) and on-premises systems through dedicated interconnects and VPN tunnels managed by the network operations team. All connectivity options are centrally managed and must be requested through the support portal.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Dedicated Interconnect', desc: 'Physical, private connections between CMS data centers and Google\'s Points of Presence. Provides the highest bandwidth and lowest latency for large-scale hybrid workloads. Used for production data replication, backup, and high-throughput integrations.' },
          { title: 'Partner Interconnect', desc: 'Connectivity through a Google-approved network partner. Used when CMS locations cannot connect directly to a Google POP. Supports the same traffic isolation and SLA as Dedicated Interconnect for most use cases.' },
          { title: 'Cloud VPN', desc: 'Encrypted IPSec tunnels for lower-bandwidth or temporary connectivity needs. Used for development environment connectivity and non-production integrations with on-premises systems.' },
          { title: 'Private Google Access', desc: 'Enables resources in the Shared VPC to reach Google APIs (Cloud Storage, BigQuery, Pub/Sub, etc.) over Google\'s internal network without requiring external IP addresses or internet traversal.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Egress Traffic Control</H3>
      <Body>Direct internet egress from project resources is not permitted. All outbound internet traffic is routed through centrally managed Cloud NAT gateways and web proxies operated by the network team. This ensures consistent logging, filtering, and compliance with CMS internet traffic policies.</Body>
    </div>
  )
}

function ArchIam() {
  return (
    <div>
      <H2>Identity & Access Architecture</H2>
      <Body>CMS Google Cloud uses Cloud Identity as its identity provider, federated to the CMS Enterprise User Administration (EUA) system via SAML 2.0. All human identities access Google Cloud using their CMS-issued Cloud Identity account. Service accounts represent automated workloads and machine identities.</Body>
      <Divider />
      <H3>Identity Provisioning Flow</H3>
      <NumList items={[
        'A CMS employee or contractor receives a CMS EUA account as part of standard onboarding',
        'The EUA account is synchronized to Cloud Identity, creating a Google Cloud identity with the domain suffix @gcp.cloud.cms.gov',
        'The user is placed into the appropriate Cloud Identity group based on their role and the systems they support',
        'IAM bindings are assigned to the group; the user inherits the permissions by virtue of group membership',
        'For privileged access, the user requests an elevation through Privileged Access Manager (PAM) with a business justification',
      ]} />
      <Divider />
      <H3>IAM Structure</H3>
      <Bullet items={[
        'Roles are bound to groups, not individual identities — managing group membership drives access changes',
        'Predefined roles are preferred over custom roles wherever sufficient; basic roles (Owner, Editor, Viewer) are prohibited in production',
        'Organization-level role bindings are restricted to Cloud Operations staff; application teams receive project-level or resource-level bindings',
        'Service account impersonation is tracked and controlled through IAM conditions and PAM entitlements',
      ]} />
    </div>
  )
}

function ArchGold() {
  return (
    <div>
      <H2>Google Gold Image</H2>
      <Body>The Google Gold Image is a CMS-hardened virtual machine image built on top of official Google-provided base images. It incorporates CMS security baselines, required agents, and configuration standards. All Compute Engine workloads within CMS Google Cloud must use the Gold Image or a derivative approved by the security team.</Body>
      <Divider />
      <H3>What the Gold Image Includes</H3>
      <Bullet items={[
        'CIS benchmark hardening applied to the operating system (RHEL and Debian variants)',
        'CMS-required endpoint agents pre-installed and configured (Logging agent, Monitoring agent, Security agent)',
        'OS patch management configuration aligned to CMS patch SLAs',
        'Disabled unnecessary services, ports, and user accounts per CMS hardening standards',
        'FIPS 140-2 compliant cryptographic modules enabled',
        'Audit logging pre-configured to forward to Cloud Logging and Splunk',
      ]} />
      <Divider />
      <H3>Image Lifecycle</H3>
      <Body>Gold Images are updated on a monthly cadence to incorporate OS security patches, agent updates, and CMS policy changes. Application teams receive notification of new Gold Image versions through the CMS Hybrid Cloud newsletter. Teams are required to roll out new Gold Images within the patch SLA window defined by their FISMA level.</Body>
      <Card title="Custom Image Requirements">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>If your workload requires a customized image, submit a request to the Cloud Operations team for review. Custom images must inherit from the Gold Image base and pass a security scan before they are approved for use in production environments.</p>
      </Card>
    </div>
  )
}

function ArchWaf() {
  return (
    <div>
      <H2>Well-Architected Framework</H2>
      <Body>The CMS Google Cloud Well-Architected Framework (WAF) defines the principles, standards, and shared responsibilities that govern how workloads are designed, deployed, and operated. It is aligned to Google Cloud's Architecture Framework and adapted for CMS compliance requirements.</Body>
      <Divider />
      <H3>Framework Pillars</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { pillar: 'Operational Excellence', desc: 'Automate operational tasks, define runbooks, and continuously improve processes. Measure and monitor SLOs. Use infrastructure as code for all provisioning.' },
          { pillar: 'Security & Compliance', desc: 'Apply defense-in-depth at every layer. Enforce least privilege, enable continuous monitoring, and align to FISMA, FedRAMP, and CMS ATO requirements.' },
          { pillar: 'Reliability', desc: 'Design for failure. Implement multi-zone deployments, define recovery time and point objectives, and test DR procedures regularly.' },
          { pillar: 'Performance Efficiency', desc: 'Match resource types to workload requirements. Use managed services to offload undifferentiated heavy lifting. Benchmark and load-test before production launches.' },
          { pillar: 'Cost Optimization', desc: 'Tag all resources for cost attribution. Set budget alerts. Rightsize compute and storage. Evaluate committed use discounts for predictable workloads.' },
          { pillar: 'Sustainability', desc: 'Optimize resource utilization to reduce energy consumption. Prefer serverless and managed services that share infrastructure efficiently.' },
        ].map(({ pillar, desc }) => (
          <Card key={pillar} title={pillar} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Non-Transferable Shared Responsibility Elements</H3>
      <Body>The following elements of the WAF represent CMS responsibilities that cannot be delegated to Google or to a third-party managed service. System owners and Hosting Coordinators are accountable for these items:</Body>
      <Bullet items={[
        'Data classification and handling policies for regulated data stored in Google Cloud',
        'Application-level access controls — IAM governs platform access; the application must enforce its own authorization',
        'Incident response procedures and runbooks for application-layer security events',
        'Business continuity plans and recovery objectives documented in the SSP',
        'Acceptance of residual risk and ATO decision for the system boundary',
        'Coordination of penetration testing activities with the Cloud Operations security team',
      ]} />
    </div>
  )
}

// ─── Security sub-sections ────────────────────────────────────────────────────

function SecIam() {
  return (
    <div>
      <H2>IAM & Security Controls</H2>
      <Body>Identity and Access Management (IAM) is the foundation of Google Cloud security at CMS. Every action taken in Google Cloud is authenticated via Cloud Identity and authorized by IAM policies. The CMS security model enforces least privilege, group-based access, and time-bounded elevation for sensitive roles.</Body>
      <Divider />
      <H3>Core IAM Principles at CMS</H3>
      <Bullet items={[
        'Roles are assigned to groups, not individuals — access follows group membership',
        'Basic roles (Owner, Editor, Viewer) are prohibited in production environments',
        'All privileged actions are logged to Cloud Audit Logs and forwarded to Splunk',
        'Service accounts are scoped to minimum required permissions per workload',
        'IAM conditions restrict access by time, resource, and request attributes where applicable',
      ]} />
      <Divider />
      <H3>Access Review Cadence</H3>
      <Body>IAM bindings are reviewed on a quarterly basis as part of the CMS access recertification process. Hosting Coordinators initiate reviews for their assigned projects. Stale bindings — roles held by identities who no longer need access — must be removed within 30 days of identification.</Body>
      <Card title="Separation of Duties">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>Separation of duties is enforced by assigning the <Mono>iam.securityAdmin</Mono> role (ability to modify IAM policies) only through PAM with approval required. This prevents a single identity from granting themselves elevated access without a second party approving the request.</p>
      </Card>
      <Divider />
      <H3>Recommended Role Assignments</H3>
      <Table
        heads={['Role', 'Scope', 'Notes']}
        rows={[
          [<Mono>roles/viewer</Mono>, 'Project', 'Safe for all team members; read-only access to all non-sensitive resources'],
          [<Mono>roles/logging.viewer</Mono>, 'Project', 'Required for developers and operators debugging application issues'],
          [<Mono>roles/run.developer</Mono>, 'Project', 'Deploys to Cloud Run; does not grant access to other services'],
          [<Mono>roles/container.developer</Mono>, 'Project', 'Deploys to GKE; pair with Workload Identity for service account access'],
          [<Mono>roles/iam.securityAdmin</Mono>, 'Project', 'Must be gated behind PAM with approval — never standing in production'],
          [<Mono>roles/editor</Mono>, 'Project', 'Prohibited in production — too broad; use predefined roles instead'],
        ]}
      />
    </div>
  )
}

function _SecScc() {
  return (
    <div>
      <H2>Security Command Center</H2>
      <Body>Security Command Center (SCC) is Google Cloud's integrated security and risk management platform. CMS uses SCC Premium to gain visibility into misconfigurations, vulnerabilities, and active threats across all Google Cloud projects within the CMS organization.</Body>
      <Divider />
      <H3>What SCC Provides</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { title: 'Security Health Analytics', desc: 'Continuously scans project configurations against CIS benchmarks and Google security best practices. Surfaces findings such as open firewall rules, public storage buckets, and overprivileged service accounts.' },
          { title: 'Event Threat Detection', desc: 'Analyzes Cloud Logging streams in real time to detect suspicious activity including brute-force attempts, cryptomining, data exfiltration indicators, and credential abuse.' },
          { title: 'Container Threat Detection', desc: 'Monitors GKE clusters for runtime threats including reverse shells, unexpected binaries, and malicious container images running in production pods.' },
          { title: 'Web Security Scanner', desc: 'Automatically crawls and tests web applications deployed in GCP for common vulnerabilities including XSS, mixed content, and outdated libraries.' },
          { title: 'VM Threat Detection', desc: 'Scans Compute Engine VMs for memory-resident malware and rootkits using Google\'s threat intelligence and behavioral analysis.' },
          { title: 'Findings & Notifications', desc: 'All SCC findings are forwarded to Pub/Sub and ingested by the CMS SIEM (Splunk) for correlation, alerting, and case management by the security operations team.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="SCC Premium is enabled at the CMS organization level. All findings are reviewed by the CMS Security Operations Center (SOC). Critical and high-severity findings require acknowledgment or remediation within defined SLA windows." accent={C.red} bg="rgba(199,70,52,0.07)" />
    </div>
  )
}

function _SecSccResidency() {
  return (
    <div>
      <H2>SCC with Data Residency</H2>
      <Body>Security Command Center with Data Residency ensures that SCC findings, assets, and security data are stored and processed exclusively within specified Google Cloud regions. For CMS workloads with strict data residency requirements, this configuration restricts SCC's data handling to the US region.</Body>
      <Divider />
      <H3>Activation Methods</H3>
      <Table
        heads={['Method', 'Scope', 'When to Use']}
        rows={[
          ['Organization-level activation', 'All projects under the CMS organization node', 'Preferred for CMS — enforces consistent residency across all environments'],
          ['Folder-level activation', 'All projects within a specific folder', 'Use when only a subset of environments require residency controls'],
          ['Project-level activation', 'A single Google Cloud project', 'Use for isolated pilots or proof-of-concept environments'],
        ]}
      />
      <Divider />
      <H3>Data Residency Constraint</H3>
      <Body>When SCC Data Residency is enabled, an organization policy constraint restricts the storage locations available to SCC. The following policy is applied at the CMS organization level:</Body>
      <Code>{`# Organization policy for SCC data residency
resource "google_org_policy_policy" "scc_data_residency" {
  name   = "organizations/ORG_ID/policies/gcp.resourceLocations"
  parent = "organizations/ORG_ID"

  spec {
    rules {
      values {
        allowed_values = [
          "in:us-locations",
        ]
      }
    }
  }
}`}</Code>
      <Divider />
      <H3>Enable SCC with Data Residency — Terraform</H3>
      <Code>{`resource "google_scc_organization_settings" "cms_scc" {
  organization = "ORG_ID"

  enable_asset_discovery = true

  # Data residency: restrict processing to US locations
  asset_discovery_config {
    project_ids    = []
    inclusion_mode = "ALL"
  }
}`}</Code>
      <Divider />
      <H3>Enable SCC — gcloud CLI</H3>
      <Code>{`# Enable SCC Premium at the organization level
gcloud scc settings update \\
  --organization=ORG_ID \\
  --enable-asset-discovery

# Verify SCC is enabled
gcloud scc settings describe \\
  --organization=ORG_ID`}</Code>
      <Callout text="SCC Data Residency configuration requires Organization Policy Administrator permissions. Submit a request to Cloud Operations to apply residency constraints at the organization level." />
    </div>
  )
}

function SecLogging() {
  return (
    <div>
      <H2>Logging & Splunk Architecture</H2>
      <Body>CMS Google Cloud forwards all platform logs to Splunk, the agency's centralized Security Information and Event Management (SIEM) platform. The logging pipeline ensures that security events, audit records, and operational logs are available for analysis, alerting, and long-term retention by the CMS Security Operations Center.</Body>
      <Divider />
      <H3>End-to-End Log Flow</H3>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Log generation</strong> — Google Cloud services (Compute Engine, GKE, Cloud Run, IAM, etc.) generate audit logs, data access logs, and platform logs automatically.</>,
        <><strong style={{ color: C.textPrimary }}>Log Router</strong> — Cloud Logging's Log Router intercepts logs matching configured sink filters and routes them to the appropriate destination.</>,
        <><strong style={{ color: C.textPrimary }}>Aggregated export sink</strong> — an organization-level log sink exports all matching logs to a Pub/Sub topic managed by Cloud Operations.</>,
        <><strong style={{ color: C.textPrimary }}>Pub/Sub delivery</strong> — Pub/Sub delivers log messages at scale with at-least-once delivery guarantees to the downstream processing pipeline.</>,
        <><strong style={{ color: C.textPrimary }}>Dataflow pipeline</strong> — a Dataflow job enriches, filters, and reformats log records before forwarding them to Splunk's HTTP Event Collector (HEC).</>,
        <><strong style={{ color: C.textPrimary }}>Splunk ingestion</strong> — logs arrive in Splunk where the SOC applies detection rules, creates alerts, and performs threat hunting across the full CMS cloud estate.</>,
      ]} />
      <Divider />
      <H3>Log Sources</H3>
      <Table
        heads={['Log Source', 'Log Type', 'Content']}
        rows={[
          ['Cloud Audit Logs — Admin Activity', 'Audit', 'API calls that modify configuration: IAM changes, resource creation/deletion, org policy changes'],
          ['Cloud Audit Logs — Data Access', 'Audit', 'Read operations on data (BigQuery, Cloud Storage, Cloud SQL) — must be explicitly enabled'],
          ['Cloud Audit Logs — System Event', 'Audit', 'Google-initiated configuration changes such as live migration events'],
          ['VPC Flow Logs', 'Network', 'Per-flow network traffic records for Shared VPC subnets — source/destination IP, port, bytes, action'],
          ['Cloud DNS Logs', 'Network', 'DNS query and response logs for resources using Cloud DNS'],
          ['Cloud Armor Logs', 'WAF', 'HTTP request logs with WAF rule evaluation results, blocked requests, and threat scores'],
          ['GKE Audit Logs', 'Kubernetes', 'Kubernetes API server audit events — pod creation, secret access, RBAC changes'],
          ['Cloud Run Request Logs', 'Application', 'HTTP request logs for Cloud Run services including latency, status codes, and caller identity'],
          ['Security Command Center Findings', 'Security', 'Misconfigurations, threats, and vulnerability findings forwarded from SCC to Splunk via Pub/Sub'],
        ]}
      />
      <Divider />
      <H3>Log Retention</H3>
      <Body>Google Cloud Logging retains logs for a default period of 30 days. The aggregated log export to Splunk provides long-term retention per the CMS records management schedule. Additionally, logs exported to Cloud Storage in the logging archive bucket are retained for 7 years to meet audit and compliance requirements.</Body>
      <Callout text="Data Access audit logs for regulated services (BigQuery, Cloud SQL, Secret Manager) must be explicitly enabled. Contact your Hosting Coordinator to verify that Data Access logs are enabled for your project's regulated services." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function _SecPolicy() {
  return (
    <div>
      <H2>Policy Management</H2>
      <Body>CMS Google Cloud uses a combination of Organization Policy Service constraints, Security Command Center findings, and Infrastructure as Code guardrails to enforce consistent security and operational standards across all projects and environments.</Body>
      <Divider />
      <H3>Policy Layers</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {[
          { layer: 'Organization Policy', desc: 'Hard constraints applied at the organization or folder level. Prevents specific configurations from being created regardless of IAM permissions. Examples: restricting allowed regions, prohibiting external IP addresses on VMs, preventing service account key creation.' },
          { layer: 'Terraform Module Standards', desc: 'CMS-managed Terraform modules embed security defaults. Teams using the modules inherit compliant configurations without needing to manually apply security settings.' },
          { layer: 'Security Command Center', desc: 'Continuous assessment of live configurations against policy baselines. Findings are surfaced to the project team and Hosting Coordinator for remediation within SLA windows.' },
          { layer: 'IAM Conditions', desc: 'Attribute-based access control applied to IAM bindings. Restricts role usage by time, resource name, request origin, and other conditions to narrow the blast radius of broad roles.' },
        ].map(({ layer, desc }) => (
          <Card key={layer} title={layer} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function _SecOrgPolicy() {
  return (
    <div>
      <H2>Organization Policy Constraints</H2>
      <Body>Google Cloud Organization Policy Service lets CMS administrators define constraints on how resources in the organization can be configured. Unlike IAM (which controls who can take an action), Organization Policy controls what configurations are allowed — regardless of who is making the request.</Body>
      <Divider />
      <H3>Key Constraints Applied at CMS</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { constraint: 'Restrict Resource Locations', id: 'gcp.resourceLocations', desc: 'Limits where resources can be created. CMS restricts to US regions to maintain data residency compliance.' },
          { constraint: 'Disable Service Account Key Creation', id: 'iam.disableServiceAccountKeyCreation', desc: 'Prevents teams from creating long-lived service account keys. Workload Identity Federation is the approved alternative.' },
          { constraint: 'Restrict VM External IPs', id: 'compute.vmExternalIpAccess', desc: 'Prevents Compute Engine instances from being assigned external IP addresses. All external access routes through load balancers.' },
          { constraint: 'Require OS Login', id: 'compute.requireOsLogin', desc: 'Enforces OS Login for SSH access to Compute Engine VMs. Ties SSH key management to Cloud Identity and IAM.' },
          { constraint: 'Restrict Cloud Storage Public Access', id: 'storage.publicAccessPrevention', desc: 'Prevents Cloud Storage buckets from being made publicly accessible — blocks allUsers and allAuthenticatedUsers ACLs.' },
          { constraint: 'Restrict Allowed APIs', id: 'gcp.restrictServiceUsage', desc: 'Restricts which Google Cloud APIs can be enabled within CMS projects to limit the available attack surface.' },
        ].map(({ constraint, id, desc }) => (
          <div key={id} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>{constraint}</div>
            <div style={{ marginBottom: 8 }}><Mono>{id}</Mono></div>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Benefits of Organization Policy</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Preventive Control', desc: 'Blocks non-compliant configurations before they are created. Unlike detective controls that find issues after the fact, org policy prevents them at the API layer.' },
          { title: 'Scalable Enforcement', desc: 'A policy set at the organization or folder level automatically applies to every project created beneath it — including new projects provisioned in the future.' },
          { title: 'Audit Trail', desc: 'Changes to Organization Policy are captured in Admin Activity audit logs, providing a full record of who changed what policy and when.' },
          { title: 'IAM-Independent', desc: 'Organization Policy constraints operate separately from IAM. Even an Owner-role identity cannot create a resource that violates an active constraint.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Policy Location Matrix</H3>
      <Table
        heads={['Policy', 'Applied At', 'Can Be Overridden At']}
        rows={[
          ['Resource Location Restriction', 'Organization', 'Not overridable — enforced globally'],
          ['Disable Service Account Key Creation', 'Organization', 'Folder (with Cloud Operations approval)'],
          ['Restrict VM External IPs', 'Organization', 'Project (for approved perimeter projects only)'],
          ['Require OS Login', 'Organization', 'Not overridable'],
          ['Storage Public Access Prevention', 'Organization', 'Not overridable'],
          ['Restrict Allowed APIs', 'Folder (Prod)', 'Project (must request API allowlist addition)'],
        ]}
      />
      <Divider />
      <H3>Worked Examples</H3>
      <Body>The following examples illustrate how Organization Policy constraints interact with common infrastructure requests:</Body>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Requesting a new region</strong> — if your workload needs to run in us-west1 for latency reasons, submit a request to Cloud Operations. The team will evaluate the residency impact and, if approved, add us-west1 to the allowed locations list at your project's folder level.</>,
        <><strong style={{ color: C.textPrimary }}>Service account keys for CI/CD</strong> — if your CI/CD pipeline requires a service account key, first evaluate Workload Identity Federation for GitHub Actions or GitLab. If WIF is not feasible, submit a request for a key exemption with a documented justification. Keys are issued with 90-day expiry and must be rotated before expiry.</>,
        <><strong style={{ color: C.textPrimary }}>Public Cloud Storage bucket</strong> — public buckets are blocked by the <Mono>storage.publicAccessPrevention</Mono> constraint. To serve public static content, use a Cloud CDN + external HTTPS load balancer configuration that reads from a private bucket. Submit an architecture review request for approval before provisioning.</>,
      ]} />
    </div>
  )
}

// ─── Access sub-sections ──────────────────────────────────────────────────────

function _AccConsole() {
  return (
    <div>
      <H2>Login to the GCP Console</H2>
      <Body>This runbook covers logging in to the CMS Google Cloud Console using your CMS-issued Cloud Identity account. All access to the Google Cloud Console requires authentication via CMS Single Sign-On (SSO).</Body>
      <Divider />
      <Card title="Prerequisites">
        <Bullet items={[
          'You have an active CMS EUA account',
          <>Your Cloud Identity account has been provisioned — your email will use the format <Mono>username@gcp.cloud.cms.gov</Mono></>,
          'You have completed the CMS Google Cloud onboarding process with your Hosting Coordinator',
          'You are accessing the Console from a CMS-managed device or an approved device enrolled in CMS MDM',
        ]} />
      </Card>
      <Divider />
      <H3>Login Steps</H3>
      <NumList items={[
        <>Navigate to <Mono>console.cloud.google.com</Mono> in your browser.</>,
        <>When prompted to sign in, enter your CMS Cloud Identity email: <Mono>username@gcp.cloud.cms.gov</Mono>. Do not use your standard CMS EUA email address.</>,
        'You will be redirected to the CMS Single Sign-On portal. Enter your CMS EUA credentials.',
        'Complete any required multi-factor authentication (MFA) step — typically a PIV card or CMS Authenticator push notification.',
        'After successful authentication, you will be redirected back to the Google Cloud Console.',
        'Verify that the correct CMS organization is shown in the organization selector at the top of the console. You should see the CMS organization, not a personal Google Cloud organization.',
      ]} />
      <Divider />
      <H3>Common Issues</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card title="Issue 1: 'You Need Permission' or 403 Error">
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 12 }}>If you see a permissions error after logging in, your Cloud Identity account has been provisioned but your IAM role has not yet been assigned to the project you are attempting to access.</p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>Resolution</p>
          <NumList items={[
            'Contact your Hosting Coordinator and provide the project ID you need access to',
            'Your Hosting Coordinator will submit an access request on your behalf',
            'Once the IAM binding is applied, retry accessing the project — no further action is needed on your end',
          ]} />
        </Card>
        <Card title="Issue 2: Console Opens Using Your Personal Google Account">
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 12 }}>If you have previously signed in to Google Cloud using a personal Google account, your browser may automatically switch back to that account after your CMS session expires.</p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>Resolution</p>
          <NumList items={[
            'Select your profile icon in the upper-right corner of the Google Cloud Console',
            <>Switch to your CMS Google account (<Mono>abcd@gcp.cloud.cms.gov</Mono>). If your session has expired, sign in again using your CMS credentials.</>,
            'Refresh the Google Cloud Console',
          ]} />
        </Card>
        <Card title="Issue 3: Your CMS Session Has Expired">
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 12 }}>After a period of inactivity, your CMS Google Cloud session may expire. You may see sign-in prompts, missing projects, or the Console switching to another Google account.</p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>Resolution</p>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>Sign back in using your CMS Google account and complete the CMS Single Sign-On (SSO) process. Once authentication is complete, refresh the Google Cloud Console if necessary.</p>
        </Card>
      </div>
      <Divider />
      <Card title="Verify You Are Logged In">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>Before you begin any work, verify the following:</p>
        <Bullet items={[
          <>You are signed in with your CMS Google account (<Mono>abcd@gcp.cloud.cms.gov</Mono>)</>,
          'The correct CMS organization is selected',
          'The projects you expect to access are visible',
        ]} />
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>If all three are true, you are successfully logged in and ready to begin working in the CMS Google Cloud environment.</p>
      </Card>
    </div>
  )
}

function _AccIdentity() {
  return (
    <div>
      <H2>Identity Management Runbook</H2>
      <Body>This runbook covers the end-to-end lifecycle of identities in CMS Google Cloud — from how identities are created and provisioned, to troubleshooting access issues, managing service account keys, and deactivating identities when they are no longer needed.</Body>
      <Divider />
      <H3>1. How Identity Works in CMS Google Cloud</H3>
      <Body>CMS Google Cloud uses Cloud Identity as its identity provider, federated to the CMS Enterprise User Administration (EUA) system via SAML 2.0. When a user authenticates to Google Cloud, they are redirected to the CMS SSO portal, where their EUA credentials are validated. Upon successful authentication, CMS SSO issues a SAML assertion to Cloud Identity, which creates a session for the user.</Body>
      <Body>Human identities use the domain <Mono>@gcp.cloud.cms.gov</Mono>. This domain is separate from the standard CMS EUA domain and from personal Google accounts. All human access to production Google Cloud resources must use this CMS Cloud Identity account.</Body>
      <Divider />
      <H3>2. Troubleshooting Access Issues</H3>
      <Bullet items={[
        <><strong style={{ color: C.textPrimary }}>Account not found</strong> — your Cloud Identity account may not have been provisioned yet. Contact your Hosting Coordinator to initiate provisioning.</>,
        <><strong style={{ color: C.textPrimary }}>MFA challenge failing</strong> — ensure your PIV card reader drivers are up to date, or contact the CMS IT help desk to reset your Authenticator enrollment.</>,
        <><strong style={{ color: C.textPrimary }}>Group membership missing</strong> — IAM access is group-based. If you have the correct Cloud Identity account but cannot access a project, your account may not be in the correct access group. Ask your Hosting Coordinator to verify group membership.</>,
        <><strong style={{ color: C.textPrimary }}>Session expiration</strong> — CMS SSO sessions expire after 8 hours of inactivity. Re-authenticate through the CMS SSO portal and refresh the Console.</>,
      ]} />
      <Divider />
      <H3>3. Creating New Identities</H3>
      <Body>New identities are created by the Cloud Operations team upon request. To request a new Cloud Identity account:</Body>
      <NumList items={[
        'Ensure the new user has an active CMS EUA account — this is a prerequisite',
        'Submit an identity provisioning request through the CMS Hybrid Cloud support portal',
        'Include the user\'s full name, EUA username, role, and the projects they will need access to',
        'Cloud Operations will provision the Cloud Identity account and place the user in the appropriate access group within 2 business days',
        'The new user will receive an email with instructions for completing first-time login',
      ]} />
      <Divider />
      <H3>4. First-Time Login</H3>
      <Body>When logging in for the first time, the user will be prompted to complete the CMS MFA enrollment process. This involves registering a PIV card or enrolling a mobile device with the CMS Authenticator application. After completing enrollment, the user will be able to log in using their standard CMS SSO credentials plus the registered MFA factor.</Body>
      <Divider />
      <H3>5. Service Account Keys</H3>
      <Body>Service account keys are long-lived credentials and represent a significant security risk if not managed carefully. The CMS Google Cloud organization policy restricts service account key creation by default. Workload Identity Federation is the approved alternative for most use cases.</Body>
      <Card title="When Service Account Keys Are Permitted">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>Service account key exceptions may be granted for:</p>
        <Bullet items={[
          'Legacy applications that cannot be updated to use Workload Identity Federation',
          'On-premises systems that must authenticate to Google Cloud APIs',
          'Third-party tools that do not support Workload Identity Federation',
        ]} />
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>Keys issued under an exception must be rotated every 90 days, stored in Secret Manager, and never committed to source control.</p>
      </Card>
      <Divider />
      <H3>6. Deactivating an Identity</H3>
      <Body>When a user leaves CMS or no longer requires Google Cloud access, their Cloud Identity account must be deactivated promptly. Deactivation should occur within 1 business day of the effective date of departure or role change.</Body>
      <NumList items={[
        'Submit a deactivation request through the CMS Hybrid Cloud support portal, including the user\'s Cloud Identity email and effective date',
        'Cloud Operations suspends the account in Cloud Identity, immediately revoking all active sessions',
        'Group memberships are removed, revoking all IAM access inherited through groups',
        'Any direct IAM bindings on projects or resources are removed',
        'Active PAM grants held by the identity are revoked',
        'The account record is retained in Cloud Identity for audit purposes per the records retention schedule',
      ]} />
      <Divider />
      <H3>7. Deletion vs. Deactivation</H3>
      <Body>Suspended (deactivated) accounts are retained in Cloud Identity for audit purposes. Permanent deletion is performed only after the retention period has elapsed and has been approved by the ISSO. If a user returns to CMS, a suspended account can be reactivated without going through the full provisioning process.</Body>
    </div>
  )
}

function _AccPam() {
  return (
    <div>
      <H2>Privileged Access Management</H2>
      <Body>Privileged Access Manager (PAM) is Google Cloud's service for just-in-time access. A user requests an administrative role, receives it for a set period, and PAM automatically revokes it when the time expires — shrinking the standing privilege attack surface.</Body>
      <Divider />
      <Card title="The Risk of Standing Access">
        <p style={{ fontSize: '0.9375rem', color: C.textSecondary, lineHeight: 1.8, marginBottom: 10 }}>In Google Cloud, administrative roles are usually handed out as permanent IAM bindings. Once attached, a role stays with the identity until someone removes it — in use or not. Each identity carrying standing admin rights adds to the attack surface.</p>
        <p style={{ fontSize: '0.9375rem', color: C.textSecondary, lineHeight: 1.8, margin: 0 }}>Granting access only at the moment it is needed shrinks that exposure and leaves a clean audit record of who elevated, when, and why.</p>
      </Card>
      <Divider />
      <H3>How PAM Works</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <Card title="Entitlement">
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>Set up ahead of time by an administrator. Pins down the roles on offer, who may request them, the resources they apply to, how long a grant can last, and whether an approver must sign off.</p>
        </Card>
        <Card title="Grant">
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>The request a user raises against an entitlement. While active the roles are in force; once it expires PAM pulls them back and writes the event to the audit logs.</p>
        </Card>
      </div>
      <H4>Access Workflow</H4>
      <NumList items={[
        'An administrator builds the entitlement — a one-off task, done per kind of access',
        'Whoever needs the access requests a grant and provides a reason',
        'Where the entitlement requires it, an approver signs off or turns the request down',
        'PAM applies the roles for the time requested, immediately or once approval lands',
        'When the time expires, PAM removes the roles — everything is recorded in the audit logs',
      ]} />
      <Divider />
      <H3>The Three-Tier Access Model</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {[
          { tier: 'Tier 1 — Standing', detail: 'Permanent IAM binding. Always available; no request needed.', scope: 'Read-only and diagnostic roles.' },
          { tier: 'Tier 2 — Just-in-Time, Auto-Approved', detail: 'Granted on request with a justification; no second party required. Time-bound and revoked automatically.', scope: 'Lower-risk administrative roles where access is frequent and time-sensitive, and the audit record is sufficient control.' },
          { tier: 'Tier 3 — Just-in-Time, Approval Required', detail: 'Granted only after a second party approves the request. Time-bound and revoked automatically.', scope: 'High-risk roles: identity and access management, organisation and billing, security configuration, and production data administration.' },
        ].map(({ tier, detail, scope }) => (
          <div key={tier} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', border: `1px solid ${C.border}`, borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ background: C.mainBg, padding: '14px 16px', borderRight: `1px solid ${C.border}` }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: C.textPrimary }}>{tier}</div>
            </div>
            <div style={{ padding: '14px 16px', background: C.cardBg }}>
              <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 4px' }}>{detail}</p>
              <p style={{ fontSize: '0.8125rem', color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{scope}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Terraform Examples</H3>
      <Code>{`# Tier 1: Standing read-only access — plain IAM, not PAM
resource "google_project_iam_member" "sre_compute_viewer" {
  project = "PROJECT_ID"
  role    = "roles/compute.viewer"
  member  = "group:sre-team@gcp.cloud.cms.gov"
}

# Tier 2: JIT, auto-approved (no approval_workflow block)
resource "google_privileged_access_manager_entitlement" "sre_compute_admin" {
  entitlement_id       = "tier2-sre-compute-admin"
  location             = "global"
  parent               = "projects/PROJECT_ID"
  max_request_duration = "28800s" # 8 hours

  eligible_users {
    principals = ["group:sre-team@gcp.cloud.cms.gov"]
  }

  requester_justification_config { unstructured {} }

  privileged_access {
    gcp_iam_access {
      resource_type = "cloudresourcemanager.googleapis.com/Project"
      resource      = "//cloudresourcemanager.googleapis.com/projects/PROJECT_ID"
      role_bindings { role = "roles/compute.instanceAdmin.v1" }
    }
  }
}

# Tier 3: JIT, approval required
resource "google_privileged_access_manager_entitlement" "iam_admin" {
  entitlement_id       = "tier3-iam-admin"
  location             = "global"
  parent               = "projects/PROJECT_ID"
  max_request_duration = "3600s" # 1 hour

  eligible_users {
    principals = ["group:identity-admins@gcp.cloud.cms.gov"]
  }

  requester_justification_config { unstructured {} }

  privileged_access {
    gcp_iam_access {
      resource_type = "cloudresourcemanager.googleapis.com/Project"
      resource      = "//cloudresourcemanager.googleapis.com/projects/PROJECT_ID"
      role_bindings { role = "roles/iam.securityAdmin" }
    }
  }

  approval_workflow {
    manual_approvals {
      require_approver_justification = true
      steps {
        approvals_needed = 1
        approvers {
          principals = ["group:security-approvers@gcp.cloud.cms.gov"]
        }
      }
    }
  }
}`}</Code>
    </div>
  )
}

function _AccPamRunbook() {
  return (
    <div>
      <H2>Requesting Temporary Access Using PAM</H2>
      <Body>This runbook explains how to request temporary elevated access to Google Cloud resources using Privileged Access Manager (PAM). Temporary access should be requested only when additional permissions — such as IAM-related changes — are required to perform an approved task. Once the approved duration expires, elevated permissions are automatically removed.</Body>
      <Divider />
      <Card title="Prerequisites">
        <Bullet items={[
          'You have access to the CMS Google Cloud Console',
          <>You are signed in using your CMS Google account (<Mono>abcd@gcp.cloud.cms.gov</Mono>)</>,
          'You know which project or resource you need temporary access to',
          'You have a business justification for requesting elevated access',
        ]} />
      </Card>
      <Divider />
      <H3>Requesting Temporary Access</H3>
      <NumList items={[
        'Sign in to the Google Cloud Console',
        'Navigate to the project or resource where elevated access is required',
        'Search for Privileged Access Manager (PAM) in the search bar at the top of the Console',
        'Locate the available entitlement that provides the level of access you need',
        'Select Request Grant on the entitlement that matches the access you need',
        'Enter the required business justification — include a ticket number if available',
        'Select the requested access duration, if applicable',
        'Submit the request',
      ]} />
      <Divider />
      <H3>Verifying Your Access</H3>
      <Body>After your request has been approved:</Body>
      <NumList items={[
        'Navigate to the Grants tab in PAM',
        'Verify the status of your newly requested grant is showing as Active',
        'Confirm that you can perform the task requiring elevated permissions',
      ]} />
      <Divider />
      <Callout text="PAM access is temporary. Once the approved access period expires, elevated permissions are automatically removed. If additional time is required, submit a new access request through PAM." accent={C.gold} bg="rgba(223,176,28,0.07)" />
      <Divider />
      <Card title="Need Additional Help?">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.8, marginBottom: 12 }}>If your request is denied, remains pending longer than expected, or you are unsure which entitlement to request, contact the Cloud Support team for assistance.</p>
        <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.875rem', fontWeight: 700, padding: '8px 18px', borderRadius: 999, textDecoration: 'none' }}>
          Get Support <ExternalIcon />
        </a>
      </Card>
    </div>
  )
}

function AccService() {
  return (
    <div>
      <H2>Service Accounts</H2>
      <Body>Service accounts are non-human identities used by applications, automation, and workloads to authenticate to Google Cloud APIs. At CMS, service accounts are managed under a strict least-privilege model. Workload Identity Federation is the preferred authentication mechanism; service account keys are restricted by organization policy.</Body>
      <Divider />
      <H3>Service Account Best Practices</H3>
      <Bullet items={[
        'Create one service account per workload — do not share service accounts across applications',
        'Assign only the permissions the workload actually uses; review quarterly and prune unused roles',
        'Use Workload Identity Federation for workloads running on GKE, Cloud Run, or external CI/CD systems',
        'If a service account key is required, store it in Secret Manager and rotate every 90 days',
        'Never embed service account keys in source code, container images, or environment variable files committed to version control',
        'Disable or delete service accounts that are no longer in use',
      ]} />
      <Divider />
      <H3>Workload Identity Federation</H3>
      <Body>Workload Identity Federation allows external workloads (GitHub Actions, GitLab CI, on-premises systems) to authenticate to Google Cloud without a service account key. The external workload presents a credential from its identity provider (GitHub OIDC, for example), and Google Cloud exchanges it for a short-lived access token bound to the appropriate service account.</Body>
      <Code>{`# Workload Identity Pool for GitHub Actions
resource "google_iam_workload_identity_pool" "github_pool" {
  workload_identity_pool_id = "github-actions-pool"
  display_name              = "GitHub Actions Pool"
}

resource "google_iam_workload_identity_pool_provider" "github_provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub Provider"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
  }

  attribute_condition = "attribute.repository == 'cms-enterprise/your-repo'"
}`}</Code>
    </div>
  )
}

function AccMonitoring() {
  return (
    <div>
      <H2>Monitoring & Alerting</H2>
      <Body>CMS Multi-Cloud provides a suite of shared observability services that support dashboards, alerting, centralized log analysis, tracing, and application diagnostics across all Google Cloud environments.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Cloud Monitoring', desc: 'Dashboards, uptime checks, and alerting policies keep your environment observable and resilient. Set budget and performance alerts to notify your team before issues escalate. Pre-built integrations with GKE, Cloud Run, Cloud SQL, and other managed services provide instant visibility.' },
          { title: 'Cloud Logging', desc: 'Centralized log ingestion and analysis for all GCP services. Logs are forwarded to Splunk for security and operations teams to search, alert on, and investigate activity. Log-based metrics allow you to create alerts directly from log patterns.' },
          { title: 'Cloud Trace', desc: 'Distributed tracing for applications running on GCP. Helps identify latency bottlenecks across microservices and Cloud Run workloads. Trace data is automatically collected from instrumented applications and correlated with logs and metrics.' },
          { title: 'Error Reporting', desc: 'Automatically aggregates and surfaces application errors in real time. Groups similar errors, tracks error frequency trends, and links to the associated log entries for faster investigation and resolution.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Recommended Alerting Policies</H3>
      <Table
        heads={['Alert', 'Condition', 'Severity']}
        rows={[
          ['CPU Utilization > 85%', 'Sustained for 5 minutes on any instance or node pool', 'Warning'],
          ['Memory Utilization > 90%', 'Sustained for 3 minutes', 'Critical'],
          ['Error Rate > 5%', '5xx responses exceeding 5% of total requests for 2 minutes', 'Critical'],
          ['Log Volume Spike', 'Log ingestion rate 3× above 7-day average for 10 minutes', 'Warning'],
          ['Budget > 80% of Monthly Limit', 'Cumulative spend exceeds 80% of the monthly budget', 'Warning'],
          ['Uptime Check Failure', 'Uptime check fails from 2 or more regions simultaneously', 'Critical'],
        ]}
      />
      <Callout text="Use Cloud Monitoring dashboards and Cloud Logging to review system health, uptime, and audit events. Logs are also forwarded to Splunk for centralized analysis by the CMS SOC." />
    </div>
  )
}

function AccCost() {
  return (
    <div>
      <H2>FinOps & Billing</H2>
      <Body>CMS Multi-Cloud provides FinOps and cost management tooling to improve visibility, accountability, and control over Google Cloud spend across all project environments.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Billing Export to BigQuery', desc: 'Project-level billing data is exported to BigQuery for detailed cost analysis, trend reporting, and cross-environment comparisons. Billing exports include resource-level cost breakdowns with label-based attribution.' },
          { title: 'Looker Studio Dashboards', desc: 'Pre-built and custom dashboards provide visual cost breakdowns by project, service, team, and time period. FinOps dashboards are available to all project teams and Hosting Coordinators.' },
          { title: 'FinOps Hub', desc: 'Centralized FinOps Hub surfaces cost optimization recommendations, committed use discount opportunities, and spend anomalies across the GCP estate. Recommendations are reviewed monthly by the FinOps team.' },
          { title: 'Budget Alerts', desc: 'Budget alerts notify your team when spend approaches defined thresholds. Alerts are sent at 50%, 80%, and 100% of the monthly budget by default. Contact your Hosting Coordinator to adjust thresholds.' },
          { title: 'Committed Use Discounts', desc: 'Committed use discounts on eligible compute and database services reduce costs for predictable workloads. CUD opportunities are flagged in the FinOps Hub and require Cloud Operations approval to commit.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <H3>Cost Attribution Requirements</H3>
      <Body>All Google Cloud resources must be tagged with the following labels for cost attribution and chargeback purposes:</Body>
      <Table
        heads={['Label Key', 'Required Values', 'Example']}
        rows={[
          ['environment', 'production, non-production, sandbox', 'production'],
          ['owner', 'Team or system owner identifier', 'team-platform-engineering'],
          ['cost-center', 'CMS cost center code', 'cc-123456'],
          ['data-classification', 'public, internal, restricted, sensitive', 'restricted'],
          ['application', 'Application or system name', 'beneficiary-portal'],
        ]}
      />
      <Callout text="Resources without required cost labels will be flagged by the FinOps Hub and may be subject to remediation. Ensure all new resources include the required labels from the first deployment." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function AccBackup() {
  return (
    <div>
      <H2>Backup & Recovery</H2>
      <Body>Google Cloud Backup and DR is available as a shared service within CMS Hybrid Cloud, supporting backup, disaster recovery, and ransomware recovery planning across cloud and hybrid environments.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Backup', desc: 'Centrally managed backup policies protect Compute Engine VMs, databases, and file systems. Backup jobs are scheduled, monitored, and retained according to defined policies. Backup coverage is required for all production FISMA Moderate and High systems.' },
          { title: 'Disaster Recovery', desc: 'DR workflows allow workloads to fail over to alternate regions or environments. Recovery point and time objectives are defined per workload based on compliance and operational requirements. DR tests are required annually for production systems.' },
          { title: 'Ransomware Recovery', desc: 'Immutable backup storage and air-gapped recovery points protect against ransomware. Recovery procedures allow restoration to a known-good state. Immutable backups cannot be modified or deleted by any identity during the retention lock period.' },
          { title: 'Hybrid Coverage', desc: 'Backup and DR extends coverage to on-premises and hybrid workloads, providing a unified recovery posture across the full CMS Hybrid Cloud environment. On-premises agents connect to the managed backup vault over Cloud Interconnect.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title} accent={C.cmsBlue}>
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
      <Callout text="To configure backup policies or initiate a DR planning engagement, contact your Hosting Coordinator or submit a request through the CMS Hybrid Cloud support portal." />
    </div>
  )
}

// ─── Merged content components ───────────────────────────────────────────────

function SecSccMerged() {
  return (
    <div>
      <H2>Security Command Center</H2>
      <Body>Security Command Center (SCC) is Google Cloud's integrated security and risk management platform. CMS uses SCC Premium to gain visibility into misconfigurations, vulnerabilities, and active threats across all Google Cloud projects within the CMS organization.</Body>
      <Divider />
      <H3>What SCC Provides</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { title: 'Security Health Analytics', desc: 'Continuously scans project configurations against CIS benchmarks and Google security best practices. Surfaces findings such as open firewall rules, public storage buckets, and overprivileged service accounts.' },
          { title: 'Event Threat Detection', desc: 'Analyzes Cloud Logging streams in real time to detect suspicious activity including brute-force attempts, cryptomining, data exfiltration indicators, and credential abuse.' },
          { title: 'Container Threat Detection', desc: 'Monitors GKE clusters for runtime threats including reverse shells, unexpected binaries, and malicious container images running in production pods.' },
          { title: 'Web Security Scanner', desc: 'Automatically crawls and tests web applications deployed in GCP for common vulnerabilities including XSS, mixed content, and outdated libraries.' },
          { title: 'VM Threat Detection', desc: "Scans Compute Engine VMs for memory-resident malware and rootkits using Google's threat intelligence and behavioral analysis." },
          { title: 'Findings & Notifications', desc: 'All SCC findings are forwarded to Pub/Sub and ingested by the CMS SIEM (Splunk) for correlation, alerting, and case management by the security operations team.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="SCC Premium is enabled at the CMS organization level. Critical and high-severity findings require acknowledgment or remediation within defined SLA windows." accent={C.red} bg="rgba(199,70,52,0.07)" />
      <Divider />
      <H3>SCC with Data Residency</H3>
      <Body>For workloads with strict data residency requirements, SCC can be configured to store and process findings exclusively within US regions. The following organization policy restricts SCC data handling to approved locations:</Body>
      <Code>{`resource "google_org_policy_policy" "scc_data_residency" {
  name   = "organizations/ORG_ID/policies/gcp.resourceLocations"
  parent = "organizations/ORG_ID"

  spec {
    rules {
      values {
        allowed_values = ["in:us-locations"]
      }
    }
  }
}`}</Code>
      <H4>Enable SCC — gcloud CLI</H4>
      <Code>{`# Enable SCC Premium at the organization level
gcloud scc settings update \\
  --organization=ORG_ID \\
  --enable-asset-discovery

# Verify SCC is enabled
gcloud scc settings describe \\
  --organization=ORG_ID`}</Code>
      <Callout text="SCC Data Residency configuration requires Organization Policy Administrator permissions. Submit a request to Cloud Operations to apply residency constraints at the organization level." />
    </div>
  )
}

function SecPolicyMerged() {
  return (
    <div>
      <H2>Policy & Constraints</H2>
      <Body>CMS Google Cloud uses Organization Policy Service constraints alongside Security Command Center findings and Infrastructure as Code guardrails to enforce consistent security and operational standards across all projects.</Body>
      <Divider />
      <H3>Policy Layers</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { layer: 'Organization Policy', desc: 'Hard constraints applied at the organization or folder level. Prevents specific configurations regardless of IAM permissions — restricted regions, external IPs, service account key creation.' },
          { layer: 'Terraform Module Standards', desc: 'CMS-managed Terraform modules embed security defaults. Teams using the modules inherit compliant configurations without manually applying security settings.' },
          { layer: 'Security Command Center', desc: 'Continuous assessment of live configurations against policy baselines. Findings are surfaced to the project team and Hosting Coordinator for remediation within SLA windows.' },
          { layer: 'IAM Conditions', desc: 'Attribute-based access control applied to IAM bindings. Restricts role usage by time, resource name, and request origin to narrow the blast radius of broad roles.' },
        ].map(({ layer, desc }) => (
          <Card key={layer} title={layer} accent={C.cmsBlue}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Key Organization Policy Constraints</H3>
      <Table
        heads={['Constraint', 'ID', 'Applied At']}
        rows={[
          ['Restrict Resource Locations', 'gcp.resourceLocations', 'Organization'],
          ['Disable Service Account Key Creation', 'iam.disableServiceAccountKeyCreation', 'Organization'],
          ['Restrict VM External IPs', 'compute.vmExternalIpAccess', 'Organization'],
          ['Require OS Login', 'compute.requireOsLogin', 'Organization'],
          ['Restrict Cloud Storage Public Access', 'storage.publicAccessPrevention', 'Organization'],
          ['Restrict Allowed APIs', 'gcp.restrictServiceUsage', 'Folder (Prod)'],
        ]}
      />
      <Divider />
      <H3>Worked Examples</H3>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Requesting a new region</strong> — submit a request to Cloud Operations. The team evaluates residency impact and, if approved, adds the region to the allowed locations list at your project's folder level.</>,
        <><strong style={{ color: C.textPrimary }}>Service account keys for CI/CD</strong> — evaluate Workload Identity Federation first. If not feasible, submit a key exemption request with documented justification. Keys are issued with 90-day expiry and must be rotated before expiry.</>,
        <><strong style={{ color: C.textPrimary }}>Public Cloud Storage bucket</strong> — blocked by <Mono>storage.publicAccessPrevention</Mono>. Use Cloud CDN + external HTTPS load balancer reading from a private bucket. Submit an architecture review request before provisioning.</>,
      ]} />
    </div>
  )
}

function AccIdentityMerged() {
  return (
    <div>
      <H2>Identity & Console Access</H2>
      <Body>CMS Google Cloud uses Cloud Identity federated to CMS Enterprise User Administration (EUA) via SAML 2.0. All access to the Google Cloud Console requires authentication through CMS Single Sign-On. This page covers how identity works, how to log in, and the full identity lifecycle.</Body>
      <Divider />
      <H3>Logging In to the GCP Console</H3>
      <Card title="Prerequisites">
        <Bullet items={[
          'You have an active CMS EUA account',
          <>Your Cloud Identity account has been provisioned — your email will use the format <Mono>username@gcp.cloud.cms.gov</Mono></>,
          'You have completed onboarding with your Hosting Coordinator',
          'You are on a CMS-managed or MDM-enrolled device',
        ]} />
      </Card>
      <div style={{ marginTop: 16 }}>
        <H4>Login Steps</H4>
        <NumList items={[
          <>Navigate to <Mono>console.cloud.google.com</Mono> in your browser.</>,
          <>Enter your CMS Cloud Identity email: <Mono>username@gcp.cloud.cms.gov</Mono>. Do not use your standard CMS EUA email.</>,
          'You will be redirected to the CMS SSO portal. Enter your EUA credentials.',
          'Complete MFA — PIV card or CMS Authenticator push notification.',
          'Verify the correct CMS organization is shown in the organization selector.',
        ]} />
      </div>
      <Divider />
      <H3>Common Login Issues</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: '"You Need Permission" or 403 Error', fix: 'Your IAM role has not been assigned. Contact your Hosting Coordinator with the project ID you need access to.' },
          { title: 'Console opens using your personal Google account', fix: 'Select your profile icon in the upper-right corner and switch to your CMS Google account. Complete SSO if your session has expired.' },
          { title: 'Your CMS session has expired', fix: 'Sign back in using your CMS Google account and complete the SSO process. Refresh the Console after authentication.' },
        ].map(({ title, fix }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{fix}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>How Identity Works</H3>
      <Body>Human identities use the domain <Mono>@gcp.cloud.cms.gov</Mono>. When you authenticate, you are redirected to the CMS SSO portal. Upon successful authentication, SSO issues a SAML assertion to Cloud Identity, which creates a session for the user. Roles are assigned to groups — not individuals — so access follows group membership.</Body>
      <Divider />
      <H3>Identity Lifecycle</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { phase: 'Provisioning', desc: 'Submit a request through the support portal including the user\'s full name, EUA username, role, and required projects. Cloud Operations provisions the account within 2 business days.' },
          { phase: 'First-time Login', desc: 'New users complete MFA enrollment — registering a PIV card or enrolling a mobile device with the CMS Authenticator application.' },
          { phase: 'Access Reviews', desc: 'IAM bindings are reviewed quarterly. Stale bindings must be removed within 30 days of identification.' },
          { phase: 'Deactivation', desc: 'Submit a deactivation request the same day a user departs or changes roles. Cloud Operations suspends the account, removes group memberships, and revokes active PAM grants.' },
        ].map(({ phase, desc }) => (
          <Card key={phase} title={phase}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AccPamMerged() {
  return (
    <div>
      <H2>Privileged Access Management</H2>
      <Body>Privileged Access Manager (PAM) is Google Cloud's service for just-in-time access. A user requests an administrative role, receives it for a set period, and PAM automatically revokes it when the time expires — shrinking the standing privilege attack surface.</Body>
      <Divider />
      <H3>The Three-Tier Access Model</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {[
          { tier: 'Tier 1 — Standing', detail: 'Permanent IAM binding. Always available; no request needed.', scope: 'Read-only and diagnostic roles only.' },
          { tier: 'Tier 2 — Just-in-Time, Auto-Approved', detail: 'Granted on request with a justification; no second party required. Time-bound and automatically revoked.', scope: 'Lower-risk administrative roles where the audit record is sufficient control.' },
          { tier: 'Tier 3 — Just-in-Time, Approval Required', detail: 'Granted only after a second party approves. Time-bound and automatically revoked.', scope: 'High-risk roles: IAM admin, org/billing admin, security configuration, production data.' },
        ].map(({ tier, detail, scope }) => (
          <div key={tier} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', border: `1px solid ${C.border}`, borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ background: C.mainBg, padding: '14px 16px', borderRight: `1px solid ${C.border}` }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: C.textPrimary }}>{tier}</div>
            </div>
            <div style={{ padding: '14px 16px', background: C.cardBg }}>
              <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 4px' }}>{detail}</p>
              <p style={{ fontSize: '0.8125rem', color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{scope}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Requesting Temporary Access — Runbook</H3>
      <Card title="Prerequisites">
        <Bullet items={[
          'You are signed in using your CMS Google account',
          'You know which project or resource you need temporary access to',
          'You have a business justification — include a ticket number if available',
        ]} />
      </Card>
      <div style={{ marginTop: 16 }}>
        <H4>Steps</H4>
        <NumList items={[
          'Sign in to the Google Cloud Console.',
          'Navigate to the project where elevated access is required.',
          'Search for Privileged Access Manager (PAM) in the search bar.',
          'Locate the entitlement that matches the access you need.',
          'Select Request Grant and enter your business justification.',
          'Select the requested access duration and submit.',
          'Navigate to the Grants tab and verify your grant status shows Active.',
        ]} />
      </div>
      <Callout text="PAM access is temporary. Once the approved period expires, elevated permissions are automatically removed. Submit a new request if additional time is required." accent={C.gold} bg="rgba(223,176,28,0.07)" />
      <Divider />
      <H3>Terraform Examples</H3>
      <Code>{`# Tier 2: JIT, auto-approved (no approval_workflow)
resource "google_privileged_access_manager_entitlement" "sre_compute_admin" {
  entitlement_id       = "tier2-sre-compute-admin"
  location             = "global"
  parent               = "projects/PROJECT_ID"
  max_request_duration = "28800s" # 8 hours

  eligible_users {
    principals = ["group:sre-team@gcp.cloud.cms.gov"]
  }

  requester_justification_config { unstructured {} }

  privileged_access {
    gcp_iam_access {
      resource_type = "cloudresourcemanager.googleapis.com/Project"
      resource      = "//cloudresourcemanager.googleapis.com/projects/PROJECT_ID"
      role_bindings { role = "roles/compute.instanceAdmin.v1" }
    }
  }
}

# Tier 3: JIT, approval required
resource "google_privileged_access_manager_entitlement" "iam_admin" {
  entitlement_id       = "tier3-iam-admin"
  location             = "global"
  parent               = "projects/PROJECT_ID"
  max_request_duration = "3600s" # 1 hour

  eligible_users {
    principals = ["group:identity-admins@gcp.cloud.cms.gov"]
  }

  requester_justification_config { unstructured {} }

  privileged_access {
    gcp_iam_access {
      resource_type = "cloudresourcemanager.googleapis.com/Project"
      resource      = "//cloudresourcemanager.googleapis.com/projects/PROJECT_ID"
      role_bindings { role = "roles/iam.securityAdmin" }
    }
  }

  approval_workflow {
    manual_approvals {
      require_approver_justification = true
      steps {
        approvals_needed = 1
        approvers {
          principals = ["group:security-approvers@gcp.cloud.cms.gov"]
        }
      }
    }
  }
}`}</Code>
    </div>
  )
}

function ResReference() {
  return (
    <div>
      <H2>Documentation & Reference</H2>
      <Body>Curated links to Google Cloud product documentation, CMS internal resources, and external reference material for teams working in the CMS Google Cloud environment.</Body>
      <Divider />
      <H3>Google Cloud</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { label: 'Google Cloud Documentation', desc: 'Official product docs, quickstarts, tutorials, and API references', href: 'https://cloud.google.com/docs' },
          { label: 'Google Cloud Console', desc: 'Web-based interface for managing Google Cloud resources', href: 'https://console.cloud.google.com' },
          { label: 'Cloud Architecture Center', desc: 'Reference architectures, design patterns, and best practices', href: 'https://cloud.google.com/architecture' },
          { label: 'Well-Architected Framework', desc: "Google's framework for reliable, secure, efficient cloud workloads", href: 'https://cloud.google.com/architecture/framework' },
          { label: 'Google Cloud Status Dashboard', desc: 'Real-time status of all Google Cloud services and regions', href: 'https://status.cloud.google.com' },
          { label: 'Google Cloud Pricing Calculator', desc: 'Estimate costs for Google Cloud services before provisioning', href: 'https://cloud.google.com/products/calculator' },
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
      <H3>CMS Internal</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { label: 'Cloud.CMS.gov Knowledge Base', desc: 'CMS-specific runbooks, configuration guidance, and platform standards', href: '#' },
          { label: 'CMS IT Service Management (ITSM)', desc: 'CMS internal service desk for IT and infrastructure requests', href: '#' },
          { label: 'CMS Enterprise User Administration (EUA)', desc: 'Manage CMS user accounts and role assignments', href: '#' },
          { label: 'CMS Cloud ATO Program', desc: 'ATO process, inherited controls, and shared responsibility documentation', href: '#' },
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
          { label: 'FedRAMP Marketplace', desc: 'Verify authorization status of Google Cloud services', href: 'https://marketplace.fedramp.gov' },
          { label: 'NIST SP 800-53 Rev 5', desc: 'Security and privacy controls for federal information systems', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
          { label: 'NIST SP 800-37 Rev 2', desc: 'Risk Management Framework guidance', href: 'https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final' },
          { label: 'Cloud Identity Help Center', desc: 'Google support documentation for Cloud Identity and account management', href: 'https://support.google.com/cloudidentity' },
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

// ─── Resources sub-sections ──────────────────────────────────────────────────

function ResSupport() {
  return (
    <div>
      <H2>Getting Support</H2>
      <Body>The CMS Hybrid Cloud support portal is your first stop for all Google Cloud requests, issues, and questions. The Cloud Operations team responds to submissions within defined SLA windows based on severity.</Body>
      <div style={{ marginBottom: 24 }}>
        <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.9375rem', fontWeight: 700, padding: '10px 24px', borderRadius: 999, textDecoration: 'none' }}>
          Open the Support Portal <ExternalIcon />
        </a>
      </div>
      <Divider />
      <H3>What to Include in Your Request</H3>
      <Bullet items={[
        'Your project ID and the affected resource or service',
        'A clear description of the issue or request, including any error messages',
        'Steps to reproduce the problem if it is an incident',
        'Your FISMA impact level and environment (production, non-production, sandbox)',
        'Any relevant ticket numbers from ITSM or change management systems',
      ]} />
      <Divider />
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
      <Divider />
      <H3>Hosting Coordinator</H3>
      <Body>Each CMS system team is assigned a Hosting Coordinator who serves as your primary point of contact with Cloud Operations. For non-urgent requests and planning questions, engage your Hosting Coordinator first before submitting a support ticket.</Body>
    </div>
  )
}

function _ResDocs() {
  return (
    <div>
      <H2>Documentation & Reference</H2>
      <Body>The following documentation resources cover Google Cloud products, APIs, and CMS-specific configuration guidance.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { title: 'Google Cloud Documentation', desc: 'Official product documentation, quickstarts, tutorials, and API references for all Google Cloud services.', href: 'https://cloud.google.com/docs', tag: 'Google' },
          { title: 'Google Cloud Console', desc: 'The web-based interface for managing Google Cloud resources, viewing logs, and configuring services.', href: 'https://console.cloud.google.com', tag: 'Google' },
          { title: 'Cloud Architecture Center', desc: "Google's reference architectures, design patterns, and best practices for building on Google Cloud.", href: 'https://cloud.google.com/architecture', tag: 'Google' },
          { title: 'Google Cloud Well-Architected Framework', desc: "Google's framework for designing and operating reliable, secure, efficient, and cost-effective cloud workloads.", href: 'https://cloud.google.com/architecture/framework', tag: 'Google' },
          { title: 'Cloud.CMS.gov Knowledge Base', desc: 'CMS Hybrid Cloud internal knowledge base covering CMS-specific configuration, runbooks, and platform standards.', href: '#', tag: 'CMS' },
        ].map(({ title, desc, href, tag }) => (
          <Card key={title}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.textPrimary }}>{title}</div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: tag === 'CMS' ? 'rgba(110,182,255,0.15)' : 'rgba(255,255,255,0.06)', color: tag === 'CMS' ? C.azure : C.textMuted, flexShrink: 0 }}>{tag}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 10px' }}>{desc}</p>
            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.azure, textDecoration: 'none' }}>
              Open <ExternalIcon />
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ResTerraform() {
  return (
    <div>
      <H2>Terraform & Infrastructure</H2>
      <Body>CMS Multi-Cloud provides managed Terraform modules that embed security defaults, naming conventions, and compliance controls. All production infrastructure must be provisioned through code — manual console changes in production are restricted by policy.</Body>
      <Divider />
      <H3>Getting Started with Terraform at CMS</H3>
      <NumList items={[
        'Request access to the CMS Terraform module registry through the support portal',
        'Clone the CMS-provided project scaffold, which pre-wires the required backend, provider, and variable structure',
        'Select the appropriate modules for your workload (VPC peering, GKE cluster, Cloud Run service, Cloud SQL, etc.)',
        'Run the modules in a sandbox environment first to validate configuration before promoting to non-production and production',
        'Submit infrastructure changes through the standard change management process for production deployments',
      ]} />
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { title: 'Terraform Registry', desc: 'Browse CMS-managed modules for Google Cloud resources including networking, compute, storage, and security services.', href: '#' },
          { title: 'Google Cloud Terraform Provider', desc: 'Official Terraform provider documentation for all Google Cloud resources.', href: 'https://registry.terraform.io/providers/hashicorp/google/latest/docs' },
          { title: 'Terraform Best Practices Guide', desc: 'CMS internal guidance on state management, module versioning, workspace conventions, and CI/CD integration for Terraform.', href: '#' },
        ].map(({ title, desc, href }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 8px' }}>{desc}</p>
            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.azure, textDecoration: 'none' }}>Open <ExternalIcon /></a>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ResAto() {
  return (
    <div>
      <H2>Compliance & ATO</H2>
      <Body>CMS Google Cloud operates under the CMS Cloud Authority to Operate (ATO) program. System teams benefit from a large set of inherited controls, significantly reducing the documentation and assessment burden compared to traditional on-premises ATOs.</Body>
      <Divider />
      <H3>Key Compliance Resources</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'CMS Cloud ATO Program', desc: 'Overview of the CMS Cloud ATO process, inherited controls, shared responsibility model, and how to initiate an ATO for a new system on Google Cloud.', href: '#' },
          { title: 'FedRAMP Marketplace', desc: 'Verify the authorization status of Google Cloud services available under the CMS FedRAMP High authorization boundary.', href: 'https://marketplace.fedramp.gov' },
          { title: 'NIST SP 800-53 Rev 5', desc: 'The control catalog underlying FISMA and FedRAMP requirements. Use the NIST catalog to understand control intent and supplemental guidance.', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
          { title: 'NIST SP 800-37 Rev 2', desc: 'Risk Management Framework guidance covering categorization, selection, implementation, assessment, authorization, and monitoring.', href: 'https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final' },
        ].map(({ title, desc, href }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 8px' }}>{desc}</p>
            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.azure, textDecoration: 'none' }}>Open <ExternalIcon /></a>
          </Card>
        ))}
      </div>
      <Callout text="Contact your ISSO and Hosting Coordinator before beginning a new ATO engagement for a system hosted on Google Cloud. Many controls are already inherited and documented — your assessment scope may be smaller than expected." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function _ResLinks() {
  return (
    <div>
      <H2>Helpful Links</H2>
      <Body>Quick reference links for tools, status pages, and external resources used by CMS Google Cloud teams.</Body>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'Google Cloud Status Dashboard', desc: 'Real-time status of all Google Cloud services and regions', href: 'https://status.cloud.google.com' },
          { label: 'CMS IT Service Management (ITSM)', desc: 'CMS internal service desk for IT and infrastructure requests', href: '#' },
          { label: 'CMS Hybrid Cloud Support Portal', desc: 'Submit Google Cloud requests, incidents, and access requests', href: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22' },
          { label: 'Cloud Identity Help Center', desc: 'Google support documentation for Cloud Identity and account management', href: 'https://support.google.com/cloudidentity' },
          { label: 'FedRAMP Authorization Portal', desc: 'Official FedRAMP program site with marketplace and documentation', href: 'https://www.fedramp.gov' },
          { label: 'NIST Cybersecurity Resources', desc: 'NIST publications including SP 800-53, SP 800-37, and the CSF', href: 'https://csrc.nist.gov' },
          { label: 'Google Cloud Pricing Calculator', desc: 'Estimate costs for Google Cloud services before provisioning', href: 'https://cloud.google.com/products/calculator' },
          { label: 'CMS Enterprise User Administration (EUA)', desc: 'Manage CMS user accounts and role assignments', href: '#' },
        ].map(({ label, desc, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.cmsBlue}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: C.azure, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.8125rem', color: C.textSecondary, lineHeight: 1.5 }}>{desc}</div>
            </div>
            <ExternalIcon />
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Sub-section registry ─────────────────────────────────────────────────────

const SUB_CONTENT: Record<string, () => ReactNode> = {
  'ov-intro': () => <OvIntro />,
  'ov-hosting': () => <OvHosting />,
  'ov-standard': () => <OvStandard />,
  'ov-fisma': () => <OvFisma />,
  'ov-support': () => <OvSupport />,
  'ov-features': () => <OvFeatures />,
  'ov-attachments': () => <OvAttachments />,
  'ov-best-practices': () => <OvBestPractices />,
  'arch-intro': () => <ArchIntro />,
  'arch-hosting': () => <ArchHosting />,
  'arch-connectivity': () => <ArchConnectivity />,
  'arch-iam': () => <ArchIam />,
  'arch-gold': () => <ArchGold />,
  'arch-waf': () => <ArchWaf />,
  'sec-iam': () => <SecIam />,
  'sec-scc-merged': () => <SecSccMerged />,
  'sec-logging': () => <SecLogging />,
  'sec-policy-merged': () => <SecPolicyMerged />,
  'acc-identity-merged': () => <AccIdentityMerged />,
  'acc-pam-merged': () => <AccPamMerged />,
  'acc-service': () => <AccService />,
  'acc-monitoring': () => <AccMonitoring />,
  'acc-cost': () => <AccCost />,
  'acc-backup': () => <AccBackup />,
  'res-support': () => <ResSupport />,
  'res-reference': () => <ResReference />,
  'res-terraform': () => <ResTerraform />,
  'res-ato': () => <ResAto />,
}

// ─── Section landing panels ───────────────────────────────────────────────────

const OV_CARD_META: Record<string, { icon: ReactNode; desc: string; accent: string }> = {
  'ov-intro': {
    accent: C.cmsBlue,
    desc: 'Why Google Cloud, VPC fundamentals, and how GCP fits the CMS multi-cloud strategy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7.5 3 4 6.5 4 11c0 2.4 1 4.6 2.6 6.1L4 21h16l-2.6-3.9C19 15.6 20 13.4 20 11c0-4.5-3.5-8-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="11" r="2.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  'ov-hosting': {
    accent: '#34A853',
    desc: 'Cloud Run, GKE Standard, GKE Enterprise, and Distributed Cloud options approved for CMS workloads.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>
        <circle cx="7.5" cy="16.5" r="1" fill="currentColor"/>
        <line x1="12" y1="7.5" x2="17" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="12" y1="16.5" x2="17" y2="16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  'ov-standard': {
    accent: C.cmsBlue,
    desc: 'Default VPC setup — one /25 private subnet, optional /27 public subnet, deployed in us-east4.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <polygon points="12,8 16,10.5 16,15.5 12,18 8,15.5 8,10.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
  },
  'ov-fisma': {
    accent: C.gold,
    desc: 'Approved FISMA Low, Moderate, and High boundaries and platform compliance considerations.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  'ov-support': {
    accent: C.red,
    desc: 'How to request new VPCs, IP space, peering, CMSNet connectivity, and decommissioning.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="17" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  'ov-features': {
    accent: '#6eb6ff',
    desc: 'N-tier architecture, transit connectivity, CMSNet integration, and advanced platform capabilities.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
      </svg>
    ),
  },
  'ov-attachments': {
    accent: C.textMuted,
    desc: 'Network attachment procedures and the VPC decommissioning request process.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  'ov-best-practices': {
    accent: '#34A853',
    desc: 'Firewall rules, private subnet design, three-tier architecture, and operational guidance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
}

function _OverviewLanding({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div>
      <h2 className="explore-section-heading gcp-guide__h2">Overview</h2>
      <p style={{ fontSize: '0.9375rem', color: C.textSecondary, lineHeight: 1.8, margin: '0 0 28px' }}>
        Google Cloud Platform (GCP) is CMS's strategic cloud provider for scalable, compliant, and mission-critical workloads. This section covers approved hosting options, FISMA compliance boundaries, support models, and platform best practices.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {(SIDEBAR_LINKS.overview ?? []).map(({ id, label }) => {
          const meta = OV_CARD_META[id]
          const accent = meta?.accent ?? C.cmsBlue
          return (
            <button key={id} onClick={() => onNav(id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '20px 20px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s', fontFamily: 'inherit' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = accent; (e.currentTarget as HTMLButtonElement).style.background = C.hoverBg }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; (e.currentTarget as HTMLButtonElement).style.background = C.cardBg }}
            >
              {/* Icon badge */}
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: accent }}>
                {meta?.icon}
              </div>
              {/* Text */}
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

function _SectionLanding({ tabId, title, description, onNav }: { tabId: string; title: string; description: string; onNav: (id: string) => void }) {
  return (
    <div>
      <h2 className="explore-section-heading gcp-guide__h2">{title}</h2>
      <p style={{ fontSize: '0.9375rem', color: C.textSecondary, lineHeight: 1.8, margin: '0 0 32px' }}>{description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {(SIDEBAR_LINKS[tabId] ?? []).map(({ id, label }) => (
          <button key={id} onClick={() => onNav(id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s', fontFamily: 'inherit' }}
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
      <h2 className="explore-section-heading gcp-guide__h2">Resources</h2>
      <p style={{ fontSize: '0.9375rem', color: C.textSecondary, lineHeight: 1.8, margin: '0 0 28px' }}>
        Helpful links, documentation, and support resources for CMS Google Cloud teams.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { title: 'CMS Hybrid Cloud Support', desc: 'Submit requests, report issues, and get help from the Cloud Operations team.', href: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22', linkText: 'Open Support Portal' },
          { title: 'Google Cloud Documentation', desc: "Official product documentation, tutorials, and API references for Google Cloud services.", href: 'https://cloud.google.com/docs', linkText: 'View Documentation' },
          { title: 'CMS Cloud ATO Program', desc: 'Authority to Operate resources, inherited controls documentation, and security authorization guidance for CMS cloud systems.', href: '#', linkText: 'Learn More' },
          { title: 'Terraform Modules', desc: 'CMS-managed Terraform modules for provisioning compliant Google Cloud infrastructure with security defaults built in.', href: '#', linkText: 'Browse Modules' },
          { title: 'Cloud Architecture Center', desc: "Google's reference architectures, patterns, and best practices for building scalable and secure cloud solutions.", href: 'https://cloud.google.com/architecture', linkText: 'Explore Architectures' },
          { title: 'FedRAMP Marketplace', desc: 'Review the authorized Google Cloud services available under the CMS FedRAMP High authorization boundary.', href: 'https://marketplace.fedramp.gov', linkText: 'View Marketplace' },
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
            { label: 'Google Cloud Status Dashboard', href: 'https://status.cloud.google.com' },
            { label: 'CMS IT Service Management (ITSM)', href: '#' },
            { label: 'NIST SP 800-53 Control Catalog', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
            { label: 'FedRAMP Authorization Documentation', href: 'https://www.fedramp.gov' },
            { label: 'Cloud Identity Help Center', href: 'https://support.google.com/cloudidentity' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.azure}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'}
            >
              {label} <ExternalIcon />
            </a>
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 12px' }}>Contact the Cloud Support Team for assistance with Google Cloud environments, requests, or access issues.</p>
          <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.875rem', fontWeight: 700, padding: '9px 20px', borderRadius: 999, textDecoration: 'none' }}>
            Get started with Google Cloud <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

void [
  _CheckIcon,
  _SectionWrap,
  _Inner,
  _SecScc,
  _SecSccResidency,
  _SecPolicy,
  _SecOrgPolicy,
  _AccConsole,
  _AccIdentity,
  _AccPam,
  _AccPamRunbook,
  _ResDocs,
  _ResLinks,
  _OverviewLanding,
  _SectionLanding,
]

export function GcpPlatformGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSub, setActiveSub] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const switchTab = (id: string) => {
    setActiveTab(id)
    // For non-overview tabs, default to the first sub-section so sidebar is populated
    const firstSub = (SIDEBAR_LINKS[id] ?? [])[0]?.id ?? null
    setActiveSub(id === 'overview' ? null : firstSub)
    window.scrollTo({ top: 0 })
  }

  const switchSub = (id: string | null) => {
    setActiveSub(id)
    // Scroll content area to top on sub-section change
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0 })
  }

  const sidebarLinks = SIDEBAR_LINKS[activeTab] ?? []
  const activeSubLabel = sidebarLinks.find(l => l.id === activeSub)?.label ?? ''
  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label ?? ''

  // Prev / next within the sidebar
  const currentIdx = sidebarLinks.findIndex(l => l.id === activeSub)
  const prevLink = currentIdx > 0 ? sidebarLinks[currentIdx - 1] : null
  const nextLink = currentIdx >= 0 && currentIdx < sidebarLinks.length - 1 ? sidebarLinks[currentIdx + 1] : null

  const renderContent = () => {
    if (activeSub && SUB_CONTENT[activeSub]) return SUB_CONTENT[activeSub]()
    if (activeTab === 'resources') return <ResourcesPanel />
    // Overview has no sidebar — render its intro directly
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
                <span className="kc-breadcrumb-current" aria-current="page">Google Cloud Platform</span>
              </li>
            </ol>
          </nav>
        </div>
        <section className="gcp-hero" aria-labelledby="gcp-hero-heading">
          <div className="gcp-page__shell gcp-hero__inner">
            <h1 id="gcp-hero-heading" className="fusion-hero__headline explore-hero__headline gcp-hero__title">
              <span className="block font-semibold leading-[1.2] tracking-tight">
                Google Cloud Platform
              </span>
            </h1>
            <div className="gcp-hero__layout">
              <div className="gcp-hero__copy">
                <p className="gcp-hero__lede">The foundation for secure and scalable digital services.</p>
                <p className="fusion-hero__body explore-hero__body gcp-hero__body">
                  CMS uses Google Cloud Platform to deliver reliable, compliant, and mission-critical solutions. Explore the architecture, governance model, and operating principles that support our cloud environment.
                </p>
                <div>
                  <div className="gcp-hero__finds-label">What you&rsquo;ll find</div>
                  <ul className="gcp-hero__finds">
                    {['Cloud Foundation', 'Architecture Standards', 'Governance & Compliance', 'Operations & Reliability'].map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="gcp-hero__panel">
                <div className="gcp-status">
                  <p className="gcp-status__kicker">Platform status</p>
                  <p className="gcp-status__title">
                    <span className="gcp-status__dot" aria-hidden />
                    All systems operational
                  </p>
                  <p className="gcp-status__detail">us-east4 · Last checked 2 min ago</p>
                </div>
                <div className="gcp-hero__stats">
                  {[
                    { label: 'Active Projects', value: '200+', tone: 'sky' },
                    { label: 'Managed VPCs', value: '80+', tone: 'mint' },
                    { label: 'FedRAMP Status', value: 'High', tone: 'gold' },
                    { label: 'ATO Coverage', value: 'FISMA', tone: 'blue' },
                  ].map(({ label, value, tone }) => (
                    <div key={label} className={`gcp-stat gcp-stat--${tone}`}>
                      <p className="gcp-stat__value">{value}</p>
                      <p className="gcp-stat__label">{label}</p>
                    </div>
                  ))}
                </div>
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
                aria-controls="gcp-guide-content"
                onClick={() => switchTab(tab.id)}
                className={`explore-tabs__tab${activeTab === tab.id ? ' explore-tabs__tab--active' : ''}`}
              >
                {tab.id === 'overview' ? <HomeTabIcon active={activeTab === 'overview'} /> : null}
                {tab.label}
              </button>
            ))}
          </div>
          <FusionButton href="/#pathways" accent onDark size="small" className="gcp-tabs-cta">
            Get started with Google Cloud
            <ChevronRight />
          </FusionButton>
        </div>
      </nav>

      {/* ── Body: sidebar only when sub-section is active ── */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--fusion-nav-sticky-height, 5rem) - 53px)' }}>

        {/* ── Left sidebar — persistent on all tabs except Overview ── */}
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
          {/* Section heading — clicking returns to landing */}
          <button onClick={() => switchSub(null)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 20px 14px', textAlign: 'left', fontFamily: 'inherit' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: !activeSub ? C.azure : C.textMuted, transition: 'color 0.12s' }}>{activeTabLabel}</span>
            {!activeSub && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />}
          </button>

          {/* Sub-section links */}
          {sidebarLinks.map(({ id, label }) => {
            const isActive = activeSub === id
            return (
              <button key={id} onClick={() => switchSub(id)}
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

          {/* Divider + support link */}
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

        {/* ── Main content ── */}
        <div id="gcp-guide-content" ref={contentRef} style={{ flex: 1, background: C.mainBg, minWidth: 0 }}>

          {/* ── Section photo banner — shown on all non-Overview pages ── */}
          {activeTab !== 'overview' && (() => {
            const banners: Record<string, { label: string; sub: string }> = {
              architecture: {
                label: 'Architecture',
                sub: 'Cloud infrastructure · Networking · Identity',
              },
              security: {
                label: 'Security & Compliance',
                sub: 'IAM · SCC · Policy · Logging',
              },
              cost: {
                label: 'Cost Management',
                sub: 'FinOps · Billing · Optimization',
              },
              access: {
                label: 'Operations',
                sub: 'Console · PAM · Monitoring · Backup',
              },
              resources: {
                label: 'Resources',
                sub: 'Documentation · Reference · Support',
              },
            }
            const b = banners[activeTab]
            if (!b) return null
            return (
              <div style={{
                position: 'relative',
                height: 180,
                overflow: 'hidden',
                flexShrink: 0,
                background: 'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)',
                borderBottom: `1px solid ${C.border}`,
              }}>
                <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.35, background: 'radial-gradient(ellipse at 18% 40%, color-mix(in srgb, var(--fusion-deep-sea-500) 50%, transparent) 0%, transparent 58%), radial-gradient(ellipse at 82% 20%, color-mix(in srgb, var(--fusion-yellow) 18%, transparent) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 0%, ${C.mainBg} 100%)` }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 36px' }}>
                  <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: '1.5rem', fontWeight: 600, color: C.textPrimary, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 6 }}>{b.label}</div>
                  <div style={{ fontSize: '0.8125rem', color: C.textMuted, letterSpacing: '0.04em', fontWeight: 500 }}>{b.sub}</div>
                </div>
              </div>
            )
          })()}

          {/* Content area — wider on landing, constrained on sub-section */}
          <div style={{ padding: activeSub ? '28px 48px 64px' : '24px 48px 72px', maxWidth: activeSub ? 860 : 1100 }}>

            {/* Content breadcrumb — non-overview pages */}
            {activeTab !== 'overview' && (
              <nav aria-label="Breadcrumb" className="gcp-crumb gcp-crumb--inline">
                <ol className="kc-breadcrumb-list">
                  <li>
                    <button type="button" className="kc-breadcrumb-link" onClick={() => switchTab('overview')}>
                      Google Cloud Platform
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

            {/* Prev / Next navigation — only shown within sub-sections */}
            {activeSub && (prevLink || nextLink) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
                {prevLink ? (
                  <button onClick={() => switchSub(prevLink.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3, background: C.cardBg, border: `1px solid ${C.border}`, cursor: 'pointer', padding: '12px 20px', borderRadius: 8, fontFamily: 'inherit', transition: 'border-color 0.15s', maxWidth: '45%' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.cmsBlue}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}
                  >
                    <span style={{ fontSize: '0.7rem', color: C.textMuted, letterSpacing: '0.04em' }}>← Previous</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: C.azure, textAlign: 'left' }}>{prevLink.label}</span>
                  </button>
                ) : <div />}
                {nextLink ? (
                  <button onClick={() => switchSub(nextLink.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, background: C.cardBg, border: `1px solid ${C.border}`, cursor: 'pointer', padding: '12px 20px', borderRadius: 8, fontFamily: 'inherit', transition: 'border-color 0.15s', maxWidth: '45%' }}
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
