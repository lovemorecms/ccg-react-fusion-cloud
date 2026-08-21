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
  architecture: [
    { id: 'az-arch-org', label: 'Resource Organization' },
    { id: 'az-arch-compute', label: 'Compute & Containers' },
    { id: 'az-arch-networking', label: 'Networking' },
    { id: 'az-arch-storage', label: 'Storage & Data Protection' },
  ],
  security: [
    { id: 'az-sec-iam', label: 'Identity & Access Management' },
    { id: 'az-sec-defender', label: 'Defender for Cloud' },
    { id: 'az-sec-policy', label: 'Policy & Governance' },
    { id: 'az-sec-data', label: 'Data Governance & Key Management' },
  ],
  cost: [
    { id: 'az-cost', label: 'Cost Management' },
  ],
  access: [
    { id: 'az-acc-console', label: 'Console & Portal Access' },
    { id: 'az-acc-monitoring', label: 'Monitoring & Alerting' },
    { id: 'az-acc-backup', label: 'Backup & Recovery' },
    { id: 'az-acc-automation', label: 'Automation & Operations' },
  ],
  resources: [
    { id: 'az-res-support', label: 'Getting Support' },
    { id: 'az-res-docs', label: 'Documentation & Reference' },
    { id: 'az-res-iac', label: 'ARM Templates & IaC' },
    { id: 'az-res-compliance', label: 'Compliance & ATO' },
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

// ─── Content helpers ──────────────────────────────────────────────────────────

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

// ─── Section photo banners ────────────────────────────────────────────────────

const SECTION_BANNERS: Record<string, { label: string; sub: string }> = {
  architecture: {
    label: 'Architecture',
    sub: 'Resource Organization · Compute · Networking · Storage',
  },
  security: {
    label: 'Security & Compliance',
    sub: 'Entra ID · Defender for Cloud · Azure Policy · Key Vault',
  },
  cost: {
    label: 'Cost Management',
    sub: 'FinOps · Pricing Models · Budgets · Optimization',
  },
  access: {
    label: 'Operations',
    sub: 'Portal · Monitoring · Backup · Automation',
  },
  resources: {
    label: 'Resources',
    sub: 'Documentation · ARM Templates · Support · Compliance',
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

// ─── Azure content functions ──────────────────────────────────────────────────

// Overview landing (shown on Overview tab with no sidebar)
function OvIntro() {
  return (
    <div>
      <H2>Introduction to Azure Commercial</H2>
      <Body>The CMS Azure Commercial environment is a secure, scalable cloud hosting option designed to support application modernization, cloud-native development, data and analytics initiatives, disaster recovery, hybrid integration, and other enterprise workloads. It provides IaaS, PaaS, and SaaS capabilities so teams can choose the hosting model that best fits their business and technical needs.</Body>
      <Callout text="Migrating to Azure Commercial leads to a 15–20% cost savings across all CMS services before any other discounts are applied." accent={C.gold} bg="rgba(223,176,28,0.07)" />
      <Divider />
      <H3>Why This Decision Matters for CMS</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Innovation and Modernization', desc: 'Azure Commercial enables rapid deployment of new features while supporting advanced analytics, AI projects, and modernization activities.' },
          { title: 'Cost and Operational Efficiency', desc: 'Choosing the appropriate cloud platform avoids unnecessary costs and service limitations. Migrating to Azure Commercial leads to a 15–20% cost savings across all CMS services before any other discounts.' },
          { title: 'Strategic Decision Framework', desc: 'Balancing compliance standards, innovation objectives, and integration needs is key to selecting the optimal cloud solution for CMS modernization.' },
          { title: 'Hybrid and Multicloud Support', desc: 'Enables hybrid and multicloud strategies via Azure Arc, simplifying governance and operations across on-premises and cloud environments.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>What, Why, How, and When</H3>
      {[
        { label: 'What it is', text: "CMS Azure Commercial is Microsoft's enterprise cloud platform for hosting and operating applications, data, and supporting services in a modern, highly available environment. It supports virtual machines, managed web applications, containers, automation, storage, networking, backup, and end-user computing." },
        { label: 'Why it matters', text: 'The environment helps customers modernize faster, improve resiliency, scale on demand, strengthen security, and align costs to actual usage. It provides centralized governance and operational capabilities — monitoring, logging, alerting, identity management, backup, security, and cost management — so workloads can be deployed and managed more consistently.' },
        { label: 'How it works', text: 'The environment is organized through management groups, subscriptions, resource groups, and individual Azure resources. Customers can consume services through IaaS for greater OS control, PaaS for managed application hosting, and SaaS for fully managed software solutions.' },
        { label: 'When it is available', text: 'The Azure Commercial environment is available today for approved customer hosting and modernization initiatives. Specific services, onboarding timelines, and implementation schedules depend on the solution design, compliance requirements, and architecture review outcomes.' },
      ].map(({ label, text }) => (
        <Card key={label} title={label}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{text}</p>
        </Card>
      ))}
      <Divider />
      <H3>Service Model Options</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'IaaS', full: 'Infrastructure as a Service', desc: 'Greater control over operating systems, VMs, and underlying infrastructure. Best for lift-and-shift workloads and custom OS configurations.' },
          { label: 'PaaS', full: 'Platform as a Service', desc: 'Managed application hosting with reduced operational overhead. Best for web apps, APIs, and cloud-native workloads on App Services or AKS.' },
          { label: 'SaaS', full: 'Software as a Service', desc: 'Fully managed software solutions. Best when the business need is met by a managed product with minimal infrastructure responsibility.' },
        ].map(({ label, full, desc }) => (
          <div key={label} style={{ background: C.cardBg, border: `1px solid ${C.borderMid}`, borderTop: `3px solid ${C.cmsBlue}`, borderRadius: 8, padding: '18px 16px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: C.azure, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 500, color: C.textMuted, marginBottom: 10 }}>{full}</div>
            <div style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Azure Commercial vs. Azure Government — Quick Reference</H3>
      <Body>Azure Commercial and Azure Government both achieve FedRAMP High authorization. Azure Commercial provides broader service availability and faster feature rollout, making it the preferred choice for most CMS workloads that do not require isolation to government-only infrastructure.</Body>
      <Table
        heads={['Aspect', 'Azure Commercial', 'Azure Government']}
        rows={[
          ['Feature Rollout', 'Immediate access to new services', 'Delayed or limited availability'],
          ['AI & Analytics', 'Full OpenAI, Fabric, Databricks support', 'Partial or unavailable'],
          ['FedRAMP', 'High', 'High'],
          ['HIPAA / HITECH', '✓', '✓'],
          ['HITRUST', '✓', 'N/A'],
          ['Integration', 'Broad SaaS and multicloud support', 'Restricted cross-cloud collaboration'],
        ]}
      />
    </div>
  )
}

// ─── Architecture ─────────────────────────────────────────────────────────────

function AzArchOrg() {
  return (
    <div>
      <H2>Resource Organization</H2>
      <Body>Azure Commercial is organized through a four-level hierarchy: Management Groups, Subscriptions, Resource Groups, and individual Resources. Every governance policy, RBAC assignment, and billing boundary flows through this structure. Understanding it is the prerequisite for designing any CMS workload.</Body>
      <Divider />
      <H3>Resource Hierarchy</H3>
      {/* SVG hierarchy diagram */}
      <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '28px 24px', marginBottom: 16, overflowX: 'auto' }}>
        <svg viewBox="0 0 760 280" width="100%" style={{ display: 'block', minWidth: 560 }} aria-label="Azure resource hierarchy: Management Groups contain Subscriptions which contain Resource Groups which contain Resources">
          {/* ── level labels ── */}
          {[
            { x: 380, y: 22, label: 'Management Group', sublabel: 'Policy & RBAC scope', fill: 'rgba(110,182,255,0.18)', stroke: '#6eb6ff', textColor: '#ffffff', subColor: '#b6bde0', w: 210, h: 44 },
            { x: 380, y: 98, label: 'Subscription', sublabel: 'Billing & access boundary', fill: 'rgba(40,160,255,0.12)', stroke: '#6eb6ff', textColor: '#ffffff', subColor: '#b6bde0', w: 210, h: 44 },
            { x: 380, y: 174, label: 'Resource Group', sublabel: 'Lifecycle & tag boundary', fill: 'rgba(223,176,28,0.1)', stroke: '#dfb01c', textColor: '#ffffff', subColor: '#b6bde0', w: 210, h: 44 },
            { x: 380, y: 250, label: 'Resources', sublabel: 'VMs · Storage · AKS · etc.', fill: 'rgba(52,168,83,0.1)', stroke: '#34A853', textColor: '#ffffff', subColor: '#b6bde0', w: 210, h: 44 },
          ].map(({ x, y, label, sublabel, fill, stroke, textColor, subColor, w, h }) => (
            <g key={label}>
              <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={7} fill={fill} stroke={stroke} strokeWidth={1.5} />
              <text x={x} y={y - 4} textAnchor="middle" fill={textColor} fontSize={13} fontWeight={700} fontFamily="inherit">{label}</text>
              <text x={x} y={y + 12} textAnchor="middle" fill={subColor} fontSize={10.5} fontFamily="inherit">{sublabel}</text>
            </g>
          ))}
          {/* ── vertical connector lines ── */}
          {[[380, 46, 76], [380, 122, 152], [380, 198, 228]].map(([cx, y1, y2], i) => (
            <g key={i}>
              <line x1={cx} y1={y1} x2={cx} y2={y2 - 6} stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} strokeDasharray="4 3" />
              <polygon points={`${cx - 5},${y2 - 6} ${cx + 5},${y2 - 6} ${cx},${y2}`} fill="rgba(255,255,255,0.2)" />
            </g>
          ))}
          {/* ── left side: "inherits down" annotation ── */}
          <line x1={60} y1={22} x2={60} y2={258} stroke="rgba(110,182,255,0.25)" strokeWidth={1} />
          <line x1={60} y1={22} x2={270} y2={22} stroke="rgba(110,182,255,0.15)" strokeWidth={1} />
          <line x1={60} y1={258} x2={270} y2={258} stroke="rgba(52,168,83,0.15)" strokeWidth={1} />
          <text x={56} y={144} textAnchor="middle" fill="rgba(110,182,255,0.5)" fontSize={11.5} fontFamily="inherit" transform="rotate(-90 56 144)" letterSpacing="0.08em">POLICY INHERITANCE</text>
          {/* ── right side: "billing" annotation — vertical, mirrors left side ── */}
          <line x1={700} y1={98} x2={700} y2={104} stroke="rgba(223,176,28,0.25)" strokeWidth={1} />
          <line x1={700} y1={98} x2={490} y2={98} stroke="rgba(223,176,28,0.12)" strokeWidth={1} />
          <line x1={700} y1={104} x2={490} y2={104} stroke="rgba(223,176,28,0.12)" strokeWidth={1} />
          <text x={704} y={101} textAnchor="middle" fill="rgba(223,176,28,0.55)" fontSize={11.5} fontFamily="inherit" letterSpacing="0.08em" transform="rotate(90 704 101)">BILLING BOUNDARY</text>
        </svg>
      </div>
      <Card title="Management Groups">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>Top-level governance containers that apply Azure Policy and RBAC across multiple subscriptions simultaneously. Policies applied at the management group flow down to all child subscriptions and resource groups. CMS uses management groups to enforce enterprise-wide controls without per-subscription configuration.</p>
        <Bullet items={[
          'Supports up to six levels of nesting; one root management group per Entra ID tenant',
          'Policies applied at management group level inherit automatically to all child scopes',
          'CMS enforces enterprise-wide controls — region restrictions, tagging, encryption — at this layer',
        ]} />
      </Card>
      <Card title="Subscriptions">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>Subscriptions serve two functions: a billing boundary (separate invoices and cost reports per subscription) and an access control boundary (RBAC and Azure Policy are scoped here). CMS aligns subscriptions to deployment environments — Dev, Impl, and Prod — to keep blast radius contained and enable environment-specific policies.</p>
        <Bullet items={[
          'Each subscription generates its own invoice for cost attribution to programs and business units',
          'Environment separation: Dev, Impl, and Prod subscriptions isolate resources and policies',
          'Each subscription has service quotas; review during solution design to avoid hitting limits at scale',
        ]} />
      </Card>
      <Card title="Resource Groups">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>A resource group is the container used to manage and aggregate related resources as a single unit. Every Azure resource must belong to exactly one resource group. Deleting a resource group deletes all resources inside it — use Resource Locks to protect production groups.</p>
        <Bullet items={[
          'Resources in a group can reside in different Azure regions',
          'Common pattern: separate resource groups for web/app tier, data tier, and shared networking',
          'Apply tags at the resource group level to enforce cost attribution across all contained resources',
        ]} />
      </Card>
      <Divider />
      <H3>Regions and Availability Zones</H3>
      <Body>Azure regions are made up of one or more datacenters in close geographic proximity. Availability Zones (AZs) are physically separate datacenters within the same region, each with independent power, cooling, and networking connected through private fiber-optic networks with round-trip latency under 2ms.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <Card title="Azure Regions">
          <Bullet items={[
            'CMS primary regions: East US 2 and Central US',
            'Each region is independent: local failure does not cascade to others',
            'Region selection affects latency, compliance, and available services',
          ]} />
        </Card>
        <Card title="Availability Zones">
          <Bullet items={[
            'Zone-redundant VMs, managed disks, and load balancers survive a datacenter outage',
            'Physically separated: independent power, cooling, networking per zone',
            'Connected via private metro fiber; latency under 2ms between zones',
          ]} />
        </Card>
      </div>
      <H3>CMS Region Pair</H3>
      <Table
        heads={['Primary Region', 'Paired Region', 'Use']}
        rows={[
          [<strong style={{ color: C.azure }}>East US 2</strong>, <strong style={{ color: C.azure }}>Central US</strong>, 'CMS primary pair — production and DR workloads'],
          ['East US', 'West US', 'Alternate pairing for select workloads'],
          ['North Central US', 'South Central US', 'Available for approved use cases'],
        ]}
      />
      <Callout text="Region pairs are separated by at least 300 miles. Microsoft prioritizes recovery of one region in each pair during a broad outage. CMS default pair is East US 2 / Central US." />
      <Divider />
      <H3>Shared Responsibility Model</H3>
      <Body>Security and operational responsibility is split between Microsoft and the customer. The boundary shifts depending on the service model — the more managed the service, the more Microsoft owns. CMS teams must understand what they retain in each tier.</Body>
      <Table
        heads={['Responsibility', 'SaaS', 'PaaS', 'IaaS', 'On-Prem']}
        rows={[
          ['Information and data', 'Customer', 'Customer', 'Customer', 'Customer'],
          ['Accounts and identities', 'Customer', 'Customer', 'Customer', 'Customer'],
          ['Identity & directory infra', 'Shared', 'Shared', 'Customer', 'Customer'],
          ['Applications', 'Microsoft', 'Shared', 'Customer', 'Customer'],
          ['Network controls', 'Microsoft', 'Shared', 'Customer', 'Customer'],
          ['Operating system', 'Microsoft', 'Microsoft', 'Customer', 'Customer'],
          ['Physical hosts', 'Microsoft', 'Microsoft', 'Microsoft', 'Customer'],
        ]}
      />
    </div>
  )
}

function AzArchCompute() {
  return (
    <div>
      <H2>Compute & Container Services</H2>
      <Body>Azure Commercial offers a range of approved compute and container services to match different application hosting patterns, from virtual machines to fully managed container orchestration.</Body>
      <Divider />
      {[
        { title: 'Azure Virtual Machines (VMs)', desc: 'IaaS compute with full control over the operating system, runtime, and configuration. Suitable for lift-and-shift migrations, legacy workloads, and scenarios requiring OS-level customization.' },
        { title: 'Virtual Machine Scale Sets (VMSS)', desc: 'Automatically scale groups of identical VMs based on demand. Supports high availability and load distribution for stateless and stateful workloads.' },
        { title: 'Azure App Services', desc: 'PaaS for hosting web applications, REST APIs, and mobile backends. Managed runtime, built-in scaling, and integrated DevOps pipelines reduce operational overhead.' },
        { title: 'Azure Kubernetes Service (AKS)', desc: 'Managed Kubernetes for container-based application workloads. Supports enterprise-scale microservices architectures with centralized monitoring and governance.' },
        { title: 'Azure Container Instances (ACI)', desc: 'Serverless containers for simple, isolated tasks without requiring full Kubernetes orchestration. Suitable for batch jobs and short-lived workloads.' },
        { title: 'Azure Virtual Desktop (AVD)', desc: 'Cloud-hosted virtual desktops and applications for end users. Provides secure remote access aligned to CMS identity and access controls.' },
        { title: 'Azure Functions', desc: 'Event-driven serverless compute for short-duration, stateless workloads. Scales to zero when idle — pay only for actual execution time.' },
        { title: 'Azure Logic Apps', desc: 'Low-code workflow automation for integrating services, systems, and APIs. Supports 400+ connectors and is suitable for business process automation.' },
        { title: 'Azure Automation Accounts', desc: 'Runbook-based automation for scheduled and event-driven operational tasks including VM start/stop, patch management, and configuration enforcement.' },
      ].map(({ title, desc }) => (
        <Card key={title} title={title}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
        </Card>
      ))}
      <Divider />
      <H3>Selecting the Right Compute Option</H3>
      <Table
        heads={['Service', 'Best For', 'Complexity']}
        rows={[
          ['Azure VMs / VMSS', 'Lift-and-shift, legacy apps, custom OS', 'Medium'],
          ['Azure App Services', 'Web apps, REST APIs, managed PaaS', 'Low'],
          ['AKS', 'Microservices, containerized workloads at scale', 'Medium–High'],
          ['Azure Functions', 'Event-driven, stateless short tasks', 'Low'],
          ['ACI', 'Isolated containers, batch, no orchestration needed', 'Low'],
          ['Azure Virtual Desktop', 'End-user desktop virtualization', 'Medium'],
        ]}
      />
      <Callout text="Not sure which compute option fits your workload? Discuss your requirements with your Hosting Coordinator during architecture review before provisioning resources." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function AzArchNetworking() {
  return (
    <div>
      <H2>Networking Services</H2>
      <Body>Azure networking services provide private connectivity, traffic management, and hybrid integration between CMS Azure environments and on-premises data centers.</Body>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Azure Virtual Networks (VNet)', desc: 'Private network environments in Azure. Workloads run in isolated VNets connected through peering or hybrid connectivity services.' },
          { title: 'Azure Private Endpoints', desc: 'Bring Azure PaaS services (Storage, Key Vault, etc.) onto the private VNet using private IP addresses, eliminating exposure to the public internet.' },
          { title: 'Azure Load Balancer', desc: 'Layer 4 traffic distribution across backend VM pools for high availability and scale.' },
          { title: 'Application Gateway (WAF)', desc: 'Layer 7 load balancer with integrated Web Application Firewall (WAF) for HTTP/HTTPS workloads. Provides OWASP Top 10 protection.' },
          { title: 'Azure Front Door', desc: 'Global HTTP load balancer with WAF, caching, and CDN capabilities for internet-facing applications requiring global reach.' },
          { title: 'Azure DNS', desc: 'Managed DNS hosting for domain resolution within Azure environments. Supports private DNS zones for internal name resolution.' },
          { title: 'VPN Gateway', desc: 'Site-to-site VPN connectivity between Azure VNets and CMS on-premises networks using encrypted IPSec tunnels.' },
          { title: 'ExpressRoute', desc: 'Private, dedicated connectivity between CMS data centers and Azure, bypassing the public internet for improved reliability and security.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Hub-and-Spoke Connectivity Model</H3>
      <Body>CMS Azure environments use a hub-and-spoke topology. A central Hub VNet hosts shared services — Azure Firewall, VPN Gateway, ExpressRoute — and spoke VNets per environment (Dev, Impl, Prod) connect through VNet peering. This model enforces consistent traffic inspection and policy without duplicating shared infrastructure.</Body>
      {/* SVG hub-and-spoke diagram */}
      <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '28px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <svg viewBox="0 0 780 300" width="100%" style={{ display: 'block', minWidth: 600 }} aria-label="Hub-and-spoke network topology: CMS Data Center connects via VPN or ExpressRoute to Hub VNet which peers to Dev, Impl, and Prod spoke VNets, which connect via Private Endpoints to Azure PaaS services">
          {/* ── background subtle grid ── */}
          <defs>
            <pattern id="hubgrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
            <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6eb6ff" opacity="0.7" />
            </marker>
            <marker id="arrowGold" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#dfb01c" opacity="0.7" />
            </marker>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#34A853" opacity="0.7" />
            </marker>
          </defs>
          <rect width="780" height="300" fill="url(#hubgrid)" />

          {/* ── CMS Data Center (left) ── */}
          <rect x={18} y={112} width={118} height={56} rx={7} fill="rgba(223,176,28,0.08)" stroke="#dfb01c" strokeWidth={1.5} />
          <text x={77} y={136} textAnchor="middle" fill="#ffffff" fontSize={12} fontWeight={700} fontFamily="inherit">CMS Data Center</text>
          <text x={77} y={152} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">On-Premises</text>

          {/* ── VPN/ExpressRoute arrow ── */}
          <line x1={136} y1={140} x2={196} y2={140} stroke="#dfb01c" strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#arrowGold)" opacity={0.7} />
          <text x={166} y={133} textAnchor="middle" fill="#b6bde0" fontSize={9} fontFamily="inherit">VPN /</text>
          <text x={166} y={144} textAnchor="middle" fill="#b6bde0" fontSize={9} fontFamily="inherit">ExpressRoute</text>

          {/* ── Hub VNet (center) ── */}
          <rect x={200} y={88} width={160} height={104} rx={9} fill="rgba(110,182,255,0.14)" stroke="#6eb6ff" strokeWidth={2} />
          <text x={280} y={113} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight={700} fontFamily="inherit">Hub VNet</text>
          <text x={280} y={129} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">Azure Firewall</text>
          <text x={280} y={142} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">VPN Gateway</text>
          <text x={280} y={155} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">ExpressRoute GW</text>
          <text x={280} y={181} textAnchor="middle" fill="rgba(110,182,255,0.6)" fontSize={9} fontFamily="inherit" letterSpacing="0.07em">SHARED SERVICES</text>

          {/* ── VNet Peering arrows (hub → spokes) ── */}
          <line x1={360} y1={110} x2={440} y2={68} stroke="#6eb6ff" strokeWidth={1.5} markerEnd="url(#arrowBlue)" opacity={0.7} />
          <line x1={360} y1={140} x2={440} y2={140} stroke="#6eb6ff" strokeWidth={1.5} markerEnd="url(#arrowBlue)" opacity={0.7} />
          <line x1={360} y1={170} x2={440} y2={212} stroke="#6eb6ff" strokeWidth={1.5} markerEnd="url(#arrowBlue)" opacity={0.7} />
          <text x={398} y={96} textAnchor="middle" fill="#b6bde0" fontSize={9} fontFamily="inherit">VNet Peering</text>

          {/* ── Spoke VNets ── */}
          {[
            { y: 44, label: 'Dev Spoke', sub: 'Non-production', stroke: '#b6bde0', fill: 'rgba(255,255,255,0.04)' },
            { y: 116, label: 'Impl Spoke', sub: 'Pre-production', stroke: '#6eb6ff', fill: 'rgba(40,160,255,0.07)' },
            { y: 188, label: 'Prod Spoke', sub: 'Production', stroke: '#34A853', fill: 'rgba(52,168,83,0.09)' },
          ].map(({ y, label, sub, stroke, fill }) => (
            <g key={label}>
              <rect x={444} y={y} width={130} height={48} rx={7} fill={fill} stroke={stroke} strokeWidth={1.5} />
              <text x={509} y={y + 20} textAnchor="middle" fill="#ffffff" fontSize={12} fontWeight={600} fontFamily="inherit">{label}</text>
              <text x={509} y={y + 34} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">{sub}</text>
            </g>
          ))}

          {/* ── Private Endpoint arrows (spokes → PaaS) ── */}
          <line x1={574} y1={68} x2={624} y2={100} stroke="#34A853" strokeWidth={1.5} markerEnd="url(#arrowGreen)" opacity={0.7} />
          <line x1={574} y1={140} x2={624} y2={140} stroke="#34A853" strokeWidth={1.5} markerEnd="url(#arrowGreen)" opacity={0.7} />
          <line x1={574} y1={212} x2={624} y2={180} stroke="#34A853" strokeWidth={1.5} markerEnd="url(#arrowGreen)" opacity={0.7} />
          <text x={598} y={120} textAnchor="middle" fill="#b6bde0" fontSize={9} fontFamily="inherit">Private</text>
          <text x={598} y={131} textAnchor="middle" fill="#b6bde0" fontSize={9} fontFamily="inherit">Endpoints</text>

          {/* ── Azure PaaS (right) ── */}
          <rect x={628} y={88} width={136} height={104} rx={9} fill="rgba(52,168,83,0.08)" stroke="#34A853" strokeWidth={1.5} />
          <text x={696} y={113} textAnchor="middle" fill="#ffffff" fontSize={12} fontWeight={700} fontFamily="inherit">Azure PaaS</text>
          <text x={696} y={129} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">App Services</text>
          <text x={696} y={142} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">AKS</text>
          <text x={696} y={155} textAnchor="middle" fill="#b6bde0" fontSize={10} fontFamily="inherit">Storage / Key Vault</text>
          <text x={696} y={181} textAnchor="middle" fill="rgba(52,168,83,0.6)" fontSize={9} fontFamily="inherit" letterSpacing="0.07em">PRIVATE ONLY</text>

          {/* ── Internet blocked indicator ── */}
          <rect x={628} y={218} width={136} height={32} rx={5} fill="rgba(234,67,53,0.07)" stroke="rgba(234,67,53,0.25)" strokeWidth={1} strokeDasharray="4 3" />
          <text x={696} y={238} textAnchor="middle" fill="rgba(234,67,53,0.6)" fontSize={9.5} fontFamily="inherit" letterSpacing="0.05em">Public Internet Disabled</text>
        </svg>
      </div>
      <Divider />
      <H3>Network Security Groups (NSGs)</H3>
      <Body>NSGs provide stateful packet filtering at the NIC or subnet level. Rules are evaluated in priority order (100–4096); the first matching rule applies. NSGs are the primary east-west traffic control mechanism within a VNet.</Body>
      <Bullet items={[
        'Inbound and outbound rules are evaluated independently, each with its own priority order',
        'Default rules: allow VNet-to-VNet traffic, allow Azure Load Balancer probes, deny all inbound from the internet (priority 65500)',
        'Effective security rules view in the Portal shows the merged, evaluated result per NIC for troubleshooting',
        'NSG flow logs capture allowed and denied flows for analysis in Log Analytics or Storage Account',
      ]} />
      <Divider />
      <H3>Private Endpoints vs. Service Endpoints</H3>
      <Body>Both options bring PaaS services closer to your VNet. Private Endpoints are the recommended approach for new deployments — they provide a private IP inside your VNet and allow the public endpoint to be disabled entirely.</Body>
      <Table
        heads={['', 'Private Endpoints', 'Service Endpoints']}
        rows={[
          ['Traffic path', 'Stays entirely on Microsoft backbone', 'Optimized route but still hits PaaS public IP'],
          ['Private IP in VNet', 'Yes — NIC with private IP injected into subnet', 'No private IP; traffic identified by source VNet'],
          ['Can disable public endpoint', 'Yes — PaaS public access can be fully disabled', 'No — public endpoint remains active'],
          ['Works across VPN / ExpressRoute', 'Yes', 'No — only from the configured subnet'],
        ]}
      />
      <Callout text="Use Private Endpoints for all new PaaS service connections. They provide stronger isolation, support cross-VNet access via peering, and allow the public endpoint to be fully disabled." />
    </div>
  )
}

function AzArchStorage() {
  return (
    <div>
      <H2>Storage & Data Protection</H2>
      <Body>Azure storage services provide durable, scalable, and secure options for a wide range of data types and access patterns. Data protection services ensure recoverability and compliance with availability requirements.</Body>
      <Divider />
      {[
        { title: 'Azure Blob Storage', desc: 'Massively scalable object storage for unstructured data including documents, images, backups, and log archives. Supports hot, cool, and archive access tiers for cost optimization.' },
        { title: 'Azure Files', desc: 'Managed file shares accessible via SMB and NFS protocols. Suitable for shared application data and lift-and-shift of file-server workloads.' },
        { title: 'Azure Managed Disks', desc: 'Block storage volumes for Azure VMs. Available in standard HDD, standard SSD, and premium SSD tiers to match performance and cost requirements.' },
        { title: 'Azure Queue Storage', desc: 'Messaging queue for decoupling application components and enabling asynchronous workflows between services.' },
        { title: 'Azure Table Storage', desc: 'NoSQL key-value store for structured, non-relational data at scale. Suitable for storing large amounts of semi-structured data.' },
        { title: 'Azure Backup', desc: 'Centralized backup management for Azure VMs, SQL databases, Azure Files, and on-premises workloads. Supports configurable retention policies and point-in-time recovery.' },
        { title: 'Geo-Redundant Storage (GRS / GZRS)', desc: 'Replicates data asynchronously to a secondary Azure region hundreds of miles from the primary region. GZRS adds availability zone redundancy within the primary region.' },
      ].map(({ title, desc }) => (
        <Card key={title} title={title}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
        </Card>
      ))}
      <Divider />
      <H3>Storage Redundancy Options</H3>
      <Table
        heads={['Option', 'Copies', 'Failure Protection', 'Use Case']}
        rows={[
          ['LRS (Locally Redundant)', '3 in one datacenter', 'Rack / drive failure', 'Dev/test, low-cost non-critical'],
          ['ZRS (Zone Redundant)', '3 across availability zones', 'Datacenter / zone failure', 'High-availability production'],
          ['GRS (Geo-Redundant)', '6 total — 3 primary, 3 secondary region', 'Regional disaster', 'DR and compliance requirements'],
          ['GZRS (Geo-Zone Redundant)', '6 total — ZRS primary + GRS secondary', 'Zone failure + regional disaster', 'Highest durability requirements'],
        ]}
      />
      <Callout text="CMS production workloads handling regulated data should use ZRS at minimum. For systems with strict disaster recovery requirements, GRS or GZRS is recommended." accent={C.gold} bg="rgba(223,176,28,0.07)" />
      <Divider />
      <H3>Azure Backup Key Capabilities</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { title: 'Centralized management', desc: 'Backup Center provides a single pane of glass for managing backup policies, jobs, and alerts across all subscriptions and resource types.' },
          { title: 'Configurable retention', desc: 'Define retention policies per workload type. Comply with records retention schedules by specifying daily, weekly, monthly, and yearly recovery points.' },
          { title: 'Soft delete protection', desc: 'Deleted backup data is retained for 14 days by default before permanent removal. Prevents accidental or malicious loss of backup data.' },
          { title: 'Cross-region restore', desc: 'Restore VMs and SQL databases to a secondary region for disaster recovery testing and production failover scenarios.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Security ─────────────────────────────────────────────────────────────────

function AzSecIam() {
  return (
    <div>
      <H2>Identity & Access Management</H2>
      <Body>Access to CMS Azure Commercial resources is centrally governed through Microsoft Entra ID and Azure Role-Based Access Control (RBAC), ensuring least-privilege access aligned to CMS enterprise identity standards.</Body>
      <Divider />
      <H3>Core IAM Components</H3>
      {[
        { title: 'Microsoft Entra ID (formerly Azure AD)', desc: 'The identity provider behind every Azure login — portal, CLI, SDK, and automated pipelines. CMS users authenticate with their existing credentials through Entra ID. Supports SSO, MFA, and passwordless authentication.' },
        { title: 'Azure RBAC', desc: 'Azure RBAC assigns granular permissions across resources, resource groups, and subscriptions. Roles follow least-privilege principles: users receive only the permissions required for their role and workload. Roles are assigned to security principals (users, groups, managed identities) at a specific scope.' },
        { title: 'Conditional Access Policies', desc: 'Dynamic controls that gate Azure portal, CLI, and API access based on device compliance, network location, sign-in risk, and MFA satisfaction. All CMS users accessing Azure are required to complete MFA on every sign-in.' },
        { title: 'Privileged Identity Management (PIM)', desc: 'Just-in-time activation of Owner, Contributor, and other high-privilege roles. Users request activation for a limited time window with a justification and optional approval. Reduces standing access exposure and shrinks the attack surface.' },
      ].map(({ title, desc }) => (
        <Card key={title} title={title}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
        </Card>
      ))}
      <Divider />
      <H3>Common Built-In Roles Reference</H3>
      <Table
        heads={['Role', 'What It Allows', 'Typical Scope']}
        rows={[
          [<Mono>Owner</Mono>, 'Full access including ability to delegate access to others', 'Subscription'],
          [<Mono>Contributor</Mono>, 'Create and manage all resource types; cannot grant access', 'Resource Group'],
          [<Mono>Reader</Mono>, 'View all resources; cannot make changes', 'Subscription or RG'],
          [<Mono>User Access Administrator</Mono>, 'Manage user access to resources; cannot manage resources', 'Subscription'],
          [<Mono>Virtual Machine Contributor</Mono>, 'Manage VMs but not the VNet or storage they connect to', 'Resource Group'],
          [<Mono>Storage Blob Data Contributor</Mono>, 'Read, write, and delete Azure Storage blobs and containers', 'Storage Account'],
          [<Mono>Key Vault Secrets User</Mono>, 'Read secret contents from Key Vault', 'Key Vault'],
          [<Mono>Monitoring Reader</Mono>, 'Read all monitoring data — metrics, logs, alert rules', 'Subscription'],
        ]}
      />
      <Callout text="Prefer Entra ID security groups over individual user assignments. Assign roles to groups, then manage membership in Entra ID. This keeps audit trails cleaner and reduces the number of role assignments at scale." />
      <Divider />
      <H3>Managed Identity Token Flow</H3>
      <Body>Managed identities eliminate stored credentials. Azure manages the identity automatically — no secrets to store, rotate, or leak. Prefer managed identities over service principals for workloads running inside Azure.</Body>
      <NumList items={[
        'Enable the managed identity on the Azure resource (VM, App Service, Function, etc.) via the Portal or ARM template.',
        'Azure creates a service principal in Entra ID and registers it with the Instance Metadata Service (IMDS) at 169.254.169.254.',
        'Assign the managed identity an RBAC role on the target resource (e.g., Key Vault Secrets User on a Key Vault).',
        'Application code requests a token from the local IMDS endpoint at runtime.',
        'IMDS forwards the request to Entra ID, which issues a short-lived OAuth2 bearer token.',
        'The application presents the token to the target service (Key Vault, Storage, SQL, etc.).',
        'The target service validates the token with Entra ID and grants access based on the assigned RBAC role.',
      ]} />
      <Divider />
      <H3>RBAC Role Assignment — Azure CLI</H3>
      <Code>{`# Get the object ID of the user or group
az ad user show --id user@cms.hhs.gov --query id -o tsv

# List available built-in roles
az role definition list --query "[].{Name:roleName}" -o table

# Assign a role at resource group scope
az role assignment create \\
  --assignee <object-id> \\
  --role "Contributor" \\
  --scope /subscriptions/<sub-id>/resourceGroups/<rg-name>

# Verify the assignment
az role assignment list --assignee <object-id> --output table`}</Code>
    </div>
  )
}

function AzSecDefender() {
  return (
    <div>
      <H2>Microsoft Defender for Cloud</H2>
      <Body>Microsoft Defender for Cloud provides unified security posture management and threat protection across CMS Azure Commercial workloads. It continuously assesses resources, surfaces prioritized recommendations, and detects active threats in real time.</Body>
      <Divider />
      <H3>Core Capabilities</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Security posture management', desc: 'Continuously assesses Azure resources against security best practices and CMS compliance requirements, surfacing a prioritized Secure Score (0–100%).' },
          { title: 'Threat protection', desc: 'Detects and responds to threats targeting Azure VMs, containers, databases, App Services, and network resources using behavioral analysis and threat intelligence.' },
          { title: 'Vulnerability assessments', desc: 'Integrated scanning for virtual machines and container images — no additional agents required in many cases. Surfaces CVEs with exploitability scoring.' },
          { title: 'Security recommendations', desc: 'Actionable, prioritized remediation guidance. Each recommendation shows the impact on Secure Score and an estimated remediation effort.' },
          { title: 'Regulatory compliance dashboard', desc: 'Pre-mapped controls for FedRAMP, NIST 800-53, CIS, PCI-DSS, and HIPAA. Tracks control status and exports evidence packages for auditors.' },
          { title: 'Governance rules', desc: 'Assign owners and due dates to recommendations. Tracks completion rates and escalates overdue items to reduce mean time to remediation (MTTR).' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Callout text="Defender for Cloud is enabled at the CMS subscription level. All findings are reviewed by the CMS Security Operations Center. Critical and high-severity findings require acknowledgment or remediation within defined SLA windows." accent={C.red} bg="rgba(234,67,53,0.07)" />
      <Divider />
      <H3>Trusted Launch for Virtual Machines</H3>
      <Body>Trusted Launch protects VM boot integrity from firmware through the OS. It is supported on Generation 2 VMs at no additional cost and should be enabled for all CMS production VMs.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Secure Boot', desc: 'Ensures only signed bootloaders and OS kernels can load. Protects against bootkits and rootkits that embed before the OS starts.' },
          { title: 'Virtual TPM (vTPM)', desc: 'Enables measured boot and attestation. Stores encryption keys in a secure, isolated environment and verifies the boot sequence has not been tampered with.' },
          { title: 'Virtualization-based Security (VBS)', desc: 'Uses the hypervisor to create an isolated memory region for sensitive operations. Enables Hypervisor Code Integrity (HVCI) and credential protection.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Compliance Certifications (Inherited)</H3>
      <Body>Microsoft maintains and publicly discloses third-party audit certifications for Azure. CMS inherits these certifications and can reference them in its own compliance packages via the Azure Service Trust Portal.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {['FedRAMP High', 'SOC 1 / SOC 2 / SOC 3', 'ISO 27001', 'HIPAA / HITRUST', 'PCI-DSS', 'NIST 800-53', 'FIPS 140-2', 'DoD IL2 / IL4 / IL5', 'StateRAMP'].map(cert => (
          <div key={cert} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', fontSize: '0.8125rem', color: C.textSecondary, textAlign: 'center' }}>{cert}</div>
        ))}
      </div>
    </div>
  )
}

function AzSecPolicy() {
  return (
    <div>
      <H2>Azure Policy & Governance</H2>
      <Body>Azure Policy enforces organizational standards and enables compliance at scale by evaluating resources against defined rules at the management group and subscription level. Unlike IAM (which controls who can take an action), Azure Policy controls what configurations are allowed — regardless of who is making the request.</Body>
      <Divider />
      <H3>How Azure Policy Works</H3>
      <Card title="Policy Enforcement Modes">
        <Bullet items={[
          <><strong style={{ color: C.textPrimary }}>Deny</strong> — blocks non-compliant resource creation or modification at the API layer before it happens</>,
          <><strong style={{ color: C.textPrimary }}>Audit</strong> — allows the operation but flags the resource as non-compliant for reporting and remediation tracking</>,
          <><strong style={{ color: C.textPrimary }}>DeployIfNotExists / Modify</strong> — automatically remediates configuration drift by deploying required settings or modifying existing resources</>,
          <><strong style={{ color: C.textPrimary }}>Initiatives (Policy Sets)</strong> — group related policies together; CMS uses initiatives to enforce FedRAMP and CMS security baselines in a single assignment</>,
        ]} />
      </Card>
      <Divider />
      <H3>Key Policies Applied at CMS</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Restrict Resource Locations', desc: 'Limits where resources can be created. CMS restricts to approved US regions (East US 2, Central US) to maintain data residency compliance.' },
          { title: 'Enforce Encryption at Rest', desc: 'Requires encryption on storage accounts, managed disks, and SQL databases. Automatically remediates non-compliant resources.' },
          { title: 'Require Private Endpoints for PaaS', desc: 'Prevents PaaS services from being accessed over public internet. Enforces private connectivity for Storage, Key Vault, and SQL.' },
          { title: 'Enforce Required Tags', desc: 'Requires specific tags (Environment, Application, Owner, CostCenter) on all new resources for cost attribution and compliance tracking.' },
          { title: 'Restrict Allowed VM SKUs', desc: 'Limits provisioned VM sizes to approved types. Prevents deployment of expensive GPU or very large SKUs without explicit approval.' },
          { title: 'Enforce TLS 1.2 Minimum', desc: 'Audits and denies resources not enforcing TLS 1.2. Applied to App Service, Storage Accounts, SQL, and API Management.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Resource Locks</H3>
      <Body>Resource Locks safeguard critical assets by preventing accidental deletions or modifications. Locks can be applied at the subscription, resource group, or individual resource level.</Body>
      <Table
        heads={['Lock Type', 'Prevents', 'Use Case']}
        rows={[
          ['CanNotDelete', 'Deletion only; modifications are allowed', 'Protect production databases and storage accounts'],
          ['ReadOnly', 'Both deletion and modification', 'Protect shared network infrastructure, Key Vaults'],
        ]}
      />
      <Callout text="Apply ReadOnly locks to Hub VNet resources and shared services. Apply CanNotDelete locks to production databases and backup vaults. Locks are applied in addition to RBAC, not instead of it." />
      <Divider />
      <H3>Azure Service Trust Portal</H3>
      <Body>The Service Trust Portal provides authoritative compliance documents, audit reports, and certifications. Teams can access FedRAMP packages, ISO certifications, and HIPAA compliance documentation directly from Microsoft to support their Authority to Operate (ATO) packages.</Body>
    </div>
  )
}

function AzSecData() {
  return (
    <div>
      <H2>Data Governance & Key Management</H2>
      <Body>Protecting data across its full lifecycle requires governance of data assets, centralized key and secret management, strong encryption at every layer, and advanced confidential computing for the most sensitive workloads.</Body>
      <Divider />
      <H3>Microsoft Purview</H3>
      <Card>
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>Unified data governance platform for discovering, cataloging, and managing data assets across Azure and on-premises environments. Supports data classification, lineage tracking, and compliance reporting for CMS data stewardship requirements. Purview's sensitivity labeling integrates with Microsoft 365 and can be applied to Azure Storage, SQL, and Synapse data assets.</p>
      </Card>
      <Divider />
      <H3>Azure Key Vault</H3>
      <Body>Key Vault centralizes management of secrets (connection strings, API keys), cryptographic keys, and TLS certificates. Applications retrieve secrets at runtime via the Key Vault REST API rather than storing them in configuration files or environment variables.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { title: 'Access model', desc: 'Use Azure RBAC (recommended) rather than legacy Vault access policies. RBAC enables per-operation permissions and integrates with Entra ID Conditional Access.' },
          { title: 'Soft delete', desc: 'Deleted secrets, keys, and certificates are retained for 7–90 days and can be recovered. Prevents accidental permanent deletion during routine operations.' },
          { title: 'Purge protection', desc: 'Prevents permanent deletion of soft-deleted items for the retention period. Required for customer-managed key (CMK) scenarios.' },
          { title: 'Key Vault references', desc: 'App Service and Azure Functions can reference Key Vault secrets directly in app settings using the @Microsoft.KeyVault() syntax. Secrets are retrieved at runtime with no code changes.' },
          { title: 'Managed identity integration', desc: 'VMs, App Service, and Functions authenticate to Key Vault using their managed identity. No credentials stored in application config.' },
          { title: 'Secret rotation', desc: 'Use Event Grid notifications and Azure Functions to auto-rotate expiring secrets. Key Vault fires an event near the expiry date; the function rotates the credential and updates the vault.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Disk Encryption Options</H3>
      <Table
        heads={['Option', 'How It Works', 'Key Owner']}
        rows={[
          ['Server-Side Encryption (SSE)', 'All managed disks encrypted at rest by default before data is written to storage. Zero configuration required.', 'Microsoft (PMK) or Customer (CMK)'],
          ['Customer-Managed Keys (CMK)', 'Customer stores the key in Azure Key Vault. A DiskEncryptionSet links the key to managed disks. Disk uses Entra ID identity to unwrap the key at access time.', 'Customer (Key Vault)'],
          ['Azure Disk Encryption (ADE)', 'BitLocker (Windows) or DM-Crypt (Linux) runs inside the VM guest OS. Keys stored in Key Vault. Encrypts OS and data disks at the OS layer above SSE.', 'Customer (Key Vault)'],
          ['Double Encryption', 'Layers SSE and ADE together. Satisfies compliance requirements that mandate two independent encryption layers for data at rest.', 'Customer'],
        ]}
      />
      <Callout text="For regulated data (PHI, PII), use Customer-Managed Keys (CMK) with Azure Key Vault. This ensures that CMS retains cryptographic control over sensitive data at rest." accent={C.gold} bg="rgba(223,176,28,0.07)" />
      <Divider />
      <H3>Azure Confidential Computing</H3>
      <Body>Confidential Computing extends encryption to protect data in use — while loaded in memory and actively processed. It uses hardware-based Trusted Execution Environments (TEEs) to isolate computation, preventing even Microsoft operators from reading data in memory.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { title: 'AMD SEV-SNP', desc: 'Full VM memory encryption at the hardware level. Even Microsoft operators with physical datacenter access cannot read the contents of a Confidential VM.' },
          { title: 'Intel TDX', desc: 'Hardware-isolated trust domains for entire confidential VMs. Provides cryptographic isolation between the VM and the hypervisor.' },
          { title: 'Intel SGX', desc: 'Process-level isolation for specific application workloads. Code and data in an enclave are protected even from the host OS and other processes on the same VM.' },
          { title: 'Remote Attestation', desc: 'Cryptographic proof that the execution environment is genuine and unmodified. Used to verify TEE integrity before decrypting data or secrets into the environment.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Cost Management ──────────────────────────────────────────────────────────

function AzCost() {
  return (
    <div>
      <H2>Cost Management</H2>
      <Body>Cloud spending behaves differently from on-premises capital budgets. Azure charges operationally — the meter runs continuously, and without active governance any engineer with Contributor access can deploy expensive resources. The tools and practices below give CMS teams the visibility, controls, and optimization levers to manage spend deliberately.</Body>
      <Divider />
      <H3>Why Cloud Costs Surprise Teams</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'OpEx vs. CapEx shift', desc: 'On-premises is capital expense: buy hardware, depreciate over 3–5 years. Cloud is operational expense: pay only for what you consume, but the meter never stops.' },
          { title: 'Forgotten resources', desc: 'Dev and test VMs left running overnight, oversized production VMs never right-sized after initial provisioning, and unattached managed disks accumulate silently.' },
          { title: 'Egress charges', desc: 'Data leaving Azure is metered. Data ingress is free. Architectures that move large datasets out of Azure or between regions incur transfer costs.' },
          { title: 'Premium service accumulation', desc: 'Individual services look affordable in isolation. A "small" Azure Firewall, DDoS Network Protection, and Premium Key Vault together add up fast at scale.' },
          { title: 'Governance gaps', desc: 'Without Azure Policy and budget controls, any user with Contributor access can deploy expensive GPU VMs, high-redundancy storage, or global CDN resources.' },
          { title: 'Amortized vs. actual costs', desc: 'Reserved Instance and Savings Plan upfront purchases appear as a single charge but should be spread across the commitment period for accurate monthly reporting.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>FinOps Framework</H3>
      <Body>FinOps is a cloud financial management discipline that brings engineering, finance, and business teams together to make data-driven spending decisions. The three-phase framework defines how CMS teams should approach cloud cost management.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { phase: 'Inform', desc: 'Understand what you are spending and why. Tag resources, create cost views by team and workload, and distribute reports to stakeholders.' },
          { phase: 'Optimize', desc: 'Right-size underutilized resources, commit to Reserved Instances or Savings Plans for predictable workloads, and eliminate idle resources.' },
          { phase: 'Operate', desc: 'Continuously govern, forecast, and automate cost controls. Set budgets with Action Group automation, enforce tagging via Azure Policy, and track FinOps KPIs.' },
        ].map(({ phase, desc }) => (
          <div key={phase} style={{ background: C.cardBg, border: `1px solid ${C.borderMid}`, borderTop: `3px solid ${C.cmsBlue}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(110,182,255,0.12)', padding: '10px 16px' }}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.azure }}>{phase}</span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <span style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7 }}>{desc}</span>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <H3>Azure Pricing Models</H3>
      <Body>Choosing the right model for each workload is the single highest-impact cost optimization lever available — before any right-sizing or resource cleanup.</Body>
      <Table
        heads={['Model', 'How It Works', 'Typical Savings']}
        rows={[
          ['Pay-As-You-Go (PAYG)', 'Retail rates billed per second, hour, or GB. No commitment required. Maximum flexibility for unpredictable or short-lived workloads.', 'Baseline'],
          ['Reserved Instances (RI)', 'Commit to a specific VM size and region for 1 or 3 years. Discount applied automatically to matching running VMs. Exchange or refund available.', 'Up to 72%'],
          ['Savings Plans', 'Commit to a $/hr compute spend across VM families, regions, and services. More flexible than RIs; covers VMs, App Service, Functions, AKS, and Container Instances.', 'Up to 65%'],
          ['Spot VMs', 'Bid on unused Azure capacity at deep discounts. Workload can be evicted with 30-second notice. Suitable for fault-tolerant batch jobs and dev workloads.', 'Up to 90%'],
          ['Dev/Test Pricing', 'Discounted rates for non-production subscriptions enrolled in Visual Studio subscriptions. No Windows Server license cost; reduced PaaS rates.', 'Varies'],
          ['Azure Hybrid Benefit', 'Bring existing Windows Server or SQL Server licenses with Software Assurance to Azure. Eliminates the OS/database license component of VM costs.', 'Up to 85% on VMs'],
        ]}
      />
      <Divider />
      <H3>Microsoft Cost Management</H3>
      <Body>Microsoft Cost Management is a native Azure service included at no extra charge. It provides the visibility layer for the Inform phase of FinOps, operating at management group, subscription, or resource group scope.</Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { title: 'Cost analysis views', desc: 'Interactive charts filterable by resource, tag, meter, service, and location. Accumulated view shows running total vs. budget; daily view surfaces cost spikes correlated to deployments.' },
          { title: 'Actual vs. amortized', desc: 'Actual view shows charges as they appear on the invoice. Amortized view spreads upfront RI and Savings Plan purchases evenly across the commitment term.' },
          { title: 'ML-driven forecasting', desc: 'Projects month-end spend based on historical consumption patterns. Compare forecast vs. budget threshold to identify overspend risk weeks before the billing period closes.' },
          { title: 'Power BI and exports', desc: 'Azure Cost Management connector for Power BI enables rich custom dashboards. Scheduled exports push cost data to a storage account for integration with existing BI and reporting tools.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>Configuring Budgets and Alerts</H3>
      <NumList items={[
        'Navigate to Cost Management at the desired scope (management group, subscription, or resource group).',
        'Select Budgets and click Add.',
        'Set the budget amount and period: monthly, quarterly, or annual.',
        'Configure alert thresholds: common practice is 50%, 75%, 90%, and 100% of the budget amount.',
        'Add a second threshold at 100% of forecasted spend to be warned before you overspend, not after.',
        'Under Alert recipients, add email addresses and optionally link an Action Group.',
        'Action Groups can trigger automation — for example, a Logic App to shut down non-production VMs when the budget reaches 90%.',
      ]} />
      <Callout text="Tagging is the foundation of cost accountability. Establish a required tagging policy (Environment, Application, Owner, CostCenter) at the management group level before workloads are deployed. Retroactive tagging of large environments is significantly harder than getting it right from day one." />
      <Divider />
      <H3>Azure Advisor Cost Recommendations</H3>
      <Body>Azure Advisor is a free, built-in recommendation engine that analyzes actual usage telemetry and surfaces prioritized savings opportunities. Each recommendation includes an annualized savings estimate and a one-click remediation path.</Body>
      {[
        { rec: 'Right-size or shut down underutilized VMs', detail: 'Advisor analyzes CPU, memory, and network utilization. VMs averaging under 5% CPU are flagged. Each recommendation shows the specific target SKU and estimated annual savings.' },
        { rec: 'Delete unattached managed disks and orphaned public IPs', detail: 'Managed disks not associated with a running VM and public IPs with no attached resource continue to accrue charges. Advisor identifies them for cleanup.' },
        { rec: 'Purchase Reserved Instances or Savings Plans', detail: 'Based on trailing usage patterns, Advisor recommends specific RI purchases with projected savings. Recommendations are refreshed as usage patterns change.' },
        { rec: 'Resize or delete idle App Service plans and PaaS resources', detail: 'Idle SQL databases, App Service plans with no active apps, and other PaaS resources running at minimal utilization are surfaced with resize or delete options.' },
      ].map(({ rec, detail }) => (
        <Card key={rec} title={rec}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{detail}</p>
        </Card>
      ))}
    </div>
  )
}

// ─── Operations ───────────────────────────────────────────────────────────────

function AzAccConsole() {
  return (
    <div>
      <H2>Console & Portal Access</H2>
      <Body>Access to CMS Azure Commercial environments is through the Azure Portal using federated authentication with your CMS Entra ID credentials. Multiple interfaces are available to manage resources depending on team preference and workflow.</Body>
      <Divider />
      <Card title="Prerequisites">
        <Bullet items={[
          'You have an active CMS Entra ID account provisioned by the Cloud Operations team',
          'You have completed the CMS Azure Commercial onboarding process with your Hosting Coordinator',
          'You are accessing the Portal from a CMS-managed device or an approved device enrolled in CMS MDM',
          'Your Azure RBAC role has been assigned for the subscription or resource group you need to access',
        ]} />
      </Card>
      <Divider />
      <H3>Azure Portal Login Steps</H3>
      <NumList items={[
        <>Navigate to <Mono>portal.azure.com</Mono> in your browser.</>,
        'Enter your CMS Entra ID email address and select Sign In.',
        'Complete multi-factor authentication (MFA) as prompted — typically a PIV card or CMS Authenticator push notification.',
        'You will be directed to the Azure Portal home page scoped to your authorized subscriptions.',
        'Verify the correct CMS directory and subscription are active in the subscription selector.',
        'Select the appropriate subscription or resource group to begin working.',
      ]} />
      <Divider />
      <H3>Azure CLI Access</H3>
      <Body>Azure CLI is the cross-platform command-line tool for managing Azure resources. It is the preferred interface for scripted deployments and is available pre-installed in Azure Cloud Shell.</Body>
      <Code>{`# Authenticate (opens a browser for Entra ID login and MFA)
az login

# List available subscriptions
az account list --output table

# Set active subscription
az account set --subscription "<subscription-id>"

# Confirm current context
az account show

# List resource groups
az group list --output table

# List resources in a group
az resource list --resource-group <rg-name> --output table`}</Code>
      <Divider />
      <H3>Azure PowerShell Access</H3>
      <Code>{`# Install the Az module if not present
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force

# Connect to your CMS Azure tenant
Connect-AzAccount

# Verify context — confirm correct subscription is active
Get-AzContext

# Switch subscription if needed
Set-AzContext -SubscriptionId "<subscription-id>"

# List resource groups
Get-AzResourceGroup | Select-Object ResourceGroupName, Location`}</Code>
      <Divider />
      <H3>Common Issues</H3>
      <Card title="Issue: Permissions Error (403) After Login">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>If you see a permissions error after logging in, your Entra ID account has been provisioned but your RBAC role has not yet been assigned to the subscription or resource group you are trying to access.</p>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>Resolution</p>
        <NumList items={[
          'Contact your Hosting Coordinator and provide the subscription ID and resource group you need access to',
          'Your Hosting Coordinator will submit an RBAC assignment request on your behalf',
          'Once the role assignment is applied, retry accessing the resource — no further action is needed on your end',
        ]} />
      </Card>
      <Card title="Issue: Wrong Directory or Subscription Active">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>If you see subscriptions that do not belong to CMS, your browser may have loaded a personal Microsoft account or a different Entra ID tenant.</p>
        <NumList items={[
          'Select the account icon in the upper-right corner of the Azure Portal',
          'Choose Switch directory and select the CMS Entra ID tenant',
          'Refresh the Portal — you should now see only CMS-authorized subscriptions',
        ]} />
      </Card>
    </div>
  )
}

function AzAccMonitoring() {
  return (
    <div>
      <H2>Monitoring & Alerting</H2>
      <Body>Azure Commercial provides centralized observability through Azure Monitor, Log Analytics, Application Insights, and Azure Alerts, giving teams full visibility into workload health, performance, and security events.</Body>
      <Divider />
      {[
        { title: 'Azure Monitor', desc: 'The foundational observability platform for all Azure resources. Centralizes metrics, logs, and traces into Log Analytics for comprehensive analysis. Provides unified collection, KQL-based querying, custom dashboards, and integration with Microsoft Sentinel for security analytics.' },
        { title: 'Application Insights', desc: 'Deep observability into app performance, user behavior, and failure points. Captures request rates, response times, failure tracking, dependency performance, and user behavior analytics. Live metrics stream enables real-time debugging of production workloads.' },
        { title: 'Azure Alerts', desc: 'Proactive notifications when performance thresholds or errors are detected. Supports metric-based, log-based, and resource health alert rules. Action Groups route alerts to email, SMS, webhook, or ITSM. Integrates with Azure Automation for auto-remediation.' },
        { title: 'Azure Service Health', desc: 'Real-time information on service incidents, planned maintenance, and health advisories affecting CMS subscriptions and regions. Configure Service Health alerts to notify teams before platform events impact workloads.' },
        { title: 'Azure Advisor', desc: 'Free, built-in recommendation engine that surfaces actionable improvements across cost, performance, reliability, security, and operational excellence. Provides personalized recommendations backed by actual resource usage telemetry.' },
      ].map(({ title, desc }) => (
        <Card key={title} title={title}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
        </Card>
      ))}
      <Divider />
      <H3>Log Analytics and KQL</H3>
      <Body>Log Analytics Workspaces centralize log data from all Azure resources, VMs, and connected systems. Queries are written in Kusto Query Language (KQL). The following example surfaces the top 10 callers to an App Service over the last hour:</Body>
      <Code>{`// Top 10 client IPs by request count — last 1 hour
AppRequests
| where TimeGenerated > ago(1h)
| summarize RequestCount = count() by ClientIP
| top 10 by RequestCount desc
| project ClientIP, RequestCount`}</Code>
      <Divider />
      <H3>Shared Platform Services Reference</H3>
      <Table
        heads={['Category', 'Service']}
        rows={[
          ['Observability & Monitoring', 'Azure Monitor'],
          ['Logging & Analytics', 'Log Analytics Workspace'],
          ['Application Performance Monitoring', 'Application Insights'],
          ['Alerting & Notifications', 'Azure Alerts + Action Groups'],
          ['Platform Health & Advisory', 'Azure Service Health + Azure Advisor'],
          ['Security Analytics', 'Microsoft Sentinel'],
        ]}
      />
    </div>
  )
}

function AzAccBackup() {
  return (
    <div>
      <H2>Backup & Recovery</H2>
      <Body>Azure Backup provides centralized backup management and geo-redundant storage options to support disaster recovery requirements and data durability for CMS workloads.</Body>
      <Divider />
      <Card title="Azure Backup">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>Centralized backup service for Azure VMs, SQL databases, Azure Files, and on-premises workloads. Supports configurable retention policies, point-in-time recovery, and centralized backup reporting across subscriptions via Backup Center.</p>
        <Bullet items={[
          'Backup Center provides a single pane of glass for all backup jobs, policies, and alerts across subscriptions',
          'Soft delete protection retains deleted backup data for 14 days before permanent removal',
          'Cross-region restore enables recovery to a secondary region for DR testing and production failover',
          'Enhanced policies support hourly backup frequency and longer retention for compliance requirements',
        ]} />
      </Card>
      <Card title="Geo-Redundant Storage (GRS / GZRS)">
        <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, marginBottom: 10 }}>Replicates data asynchronously to a secondary Azure region hundreds of miles from the primary region. GZRS adds availability zone redundancy within the primary region for scenarios requiring both regional and zonal resilience.</p>
        <Bullet items={[
          'GRS: 6 copies total — 3 in primary region, 3 in paired secondary region (e.g., East US 2 → Central US)',
          'GZRS: zone-redundant primary + geo-redundant secondary — highest durability tier for regulated data',
          'Read-access GRS (RA-GRS) and RA-GZRS allow reads from the secondary region during primary outage',
        ]} />
      </Card>
      <Divider />
      <H3>Backup Policy Design Considerations</H3>
      <Table
        heads={['Resource Type', 'Recommended Backup Frequency', 'Minimum Retention']}
        rows={[
          ['Azure VMs (production)', 'Daily + hourly snapshots', '30 days daily, 12 months monthly'],
          ['Azure SQL Database', 'Full weekly, differential daily, transaction log every 5–12 min', 'Per recovery SLA'],
          ['Azure Files', 'Daily snapshots', '30 days'],
          ['Azure Blob Storage', 'Operational backup (continuous)', 'Per compliance policy'],
        ]}
      />
      <Callout text="Verify backup and restore procedures with your ISSO before production launch. Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) must be documented in the System Security Plan (SSP)." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

function AzAccAutomation() {
  return (
    <div>
      <H2>Automation & Operations</H2>
      <Body>Consistent, repeatable operations in Azure depend on two complementary practices: Infrastructure as Code (IaC) for declarative resource provisioning, and Azure Automation Accounts for ongoing operational runbooks and configuration management.</Body>
      <Divider />
      <H3>Infrastructure as Code</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Consistency', desc: 'The same template deployed to Dev and Prod produces identical resource configurations, eliminating environment drift.' },
          { title: 'Configuration at scale', desc: 'One template can provision hundreds of resources across multiple resource groups in a single operation.' },
          { title: 'Rapid environment provisioning', desc: 'New environments are created by re-running the same template with different parameter files, not by manual portal clicks.' },
          { title: 'Audit and change history', desc: 'Git history tracks every infrastructure change: who changed it, when, and why — combined with ARM deployment history for a full audit trail.' },
        ].map(({ title, desc }) => (
          <Card key={title} title={title}>
            <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Divider />
      <H3>ARM Template Structure</H3>
      <Body>ARM templates are JSON files that declaratively define Azure resources to create or update. Every action in the Azure Portal, CLI, or PowerShell ultimately submits an ARM API call. Using templates directly means one submission orchestrates all resources in dependency order.</Body>
      <Code>{`{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "rgName":     { "type": "string" },
    "rgLocation": { "type": "string" }
  },
  "resources": [
    {
      "type":       "Microsoft.Resources/resourceGroups",
      "apiVersion": "2018-05-01",
      "name":       "[parameters('rgName')]",
      "location":   "[parameters('rgLocation')]"
    }
  ]
}`}</Code>
      <H3>Deploying an ARM Template — Azure CLI</H3>
      <NumList items={[
        <><strong style={{ color: C.textPrimary }}>Authenticate and set active subscription</strong> — see Console & Portal Access for steps.</>,
        <><strong style={{ color: C.textPrimary }}>Validate the template:</strong> <Mono>az deployment sub validate --location eastus2 --template-file main.json --parameters @params.json</Mono></>,
        <><strong style={{ color: C.textPrimary }}>Preview changes with what-if mode:</strong> <Mono>az deployment sub what-if --location eastus2 --template-file main.json --parameters @params.json</Mono></>,
        <><strong style={{ color: C.textPrimary }}>Deploy the template:</strong> <Mono>az deployment sub create --name cms-deploy-01 --location eastus2 --template-file main.json --parameters @params.json</Mono></>,
        <><strong style={{ color: C.textPrimary }}>Monitor deployment status:</strong> <Mono>az deployment sub show --name cms-deploy-01 --query properties.provisioningState</Mono></>,
      ]} />
      <Divider />
      <H3>Azure Automation Accounts</H3>
      <Card title="Runbook-Based Operations">
        <Bullet items={[
          'PowerShell and Python runbooks for automated operational tasks such as VM start/stop schedules and patch management',
          'Scheduled automation for routine maintenance — disk cleanup, log rotation, certificate renewal',
          'Configuration management using Desired State Configuration (DSC) to enforce baseline OS settings across VMs',
          'Integration with Azure Monitor alerts for event-driven automation and auto-remediation workflows',
          'Managed identity support for secure, credential-free resource access without stored credentials in runbook code',
        ]} />
      </Card>
      <Callout text="All production infrastructure changes must be provisioned through code and reviewed via pull request. Manual console-based changes in production subscriptions are restricted and subject to drift detection by Azure Policy." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

// ─── Resources ────────────────────────────────────────────────────────────────

function AzResSupport() {
  return (
    <div>
      <H2>Getting Support</H2>
      <Body>CMS Multi-Cloud provides a layered support model for Azure Commercial environments. Support is delivered through self-service documentation, a dedicated Hosting Coordinator program, and a CMS Cloud Operations team.</Body>
      <Divider />
      {[
        { tier: 'Tier 1 — Self-Service', desc: 'Teams first consult the Cloud.CMS.gov knowledge base, runbooks, and this documentation site. Most common tasks such as access requests, subscription onboarding, and standard configuration changes are documented end-to-end.' },
        { tier: 'Tier 2 — Hosting Coordinator', desc: 'Each CMS system is assigned a Hosting Coordinator who assists with subscription onboarding, architecture review, compliance questions, and escalations. Hosting Coordinators serve as the primary point of contact between the CMS system team and the Cloud Operations team.' },
        { tier: 'Tier 3 — Cloud Operations', desc: 'The CMS Cloud Operations team handles platform-level incidents, infrastructure outages, network issues, and security events. Issues are escalated from the Hosting Coordinator or submitted directly through the support portal for urgent incidents.' },
        { tier: 'Tier 4 — Microsoft Support', desc: 'CMS Multi-Cloud holds a Microsoft Premier Support agreement. For issues that require Microsoft engineering involvement — such as service degradations, product bugs, or complex networking problems — tickets are escalated to Microsoft on behalf of CMS teams.' },
      ].map(({ tier, desc }) => (
        <Card key={tier} title={tier}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{desc}</p>
        </Card>
      ))}
      <Callout text="Contact the Cloud Support Team for assistance with Azure Commercial environments, requests, or access issues." />
      <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.875rem', fontWeight: 700, padding: '9px 20px', borderRadius: 999, textDecoration: 'none' }}>
        Get Support <ExternalIcon />
      </a>
    </div>
  )
}

function AzResDocs() {
  return (
    <div>
      <H2>Documentation & Reference</H2>
      <Body>Official Microsoft documentation, CMS internal resources, and external references to support your work in Azure Commercial.</Body>
      <Divider />
      <H3>Azure Documentation</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Azure Virtual Network Overview', href: 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview' },
          { label: 'Azure Kubernetes Service (AKS)', href: 'https://learn.microsoft.com/en-us/azure/aks/' },
          { label: 'Microsoft Entra ID', href: 'https://learn.microsoft.com/en-us/entra/identity/' },
          { label: 'Azure Policy Overview', href: 'https://learn.microsoft.com/en-us/azure/governance/policy/overview' },
          { label: 'Microsoft Defender for Cloud', href: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/' },
          { label: 'Azure Cost Management', href: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/' },
          { label: 'Azure Key Vault', href: 'https://learn.microsoft.com/en-us/azure/key-vault/' },
          { label: 'Azure Monitor', href: 'https://learn.microsoft.com/en-us/azure/azure-monitor/' },
          { label: 'Azure Backup', href: 'https://learn.microsoft.com/en-us/azure/backup/' },
          { label: 'ARM Template Reference', href: 'https://learn.microsoft.com/en-us/azure/templates/' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: C.azure, textDecoration: 'none', padding: '8px 14px', background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 6, transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.cmsBlue}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border}
          >
            {label} <ExternalIcon />
          </a>
        ))}
      </div>
      <Divider />
      <H3>CMS Internal Resources</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'CMS Cloud Standards', href: '#' },
          { label: 'CMS Multi-Cloud Support Portal', href: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22' },
          { label: 'CMS Hosting Coordinator Contact', href: '#' },
          { label: 'Azure Subscription Request Form', href: '#' },
          { label: 'Onboarding Checklist', href: '#' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ fontSize: '0.875rem', color: C.textPrimary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.12s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.azure}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textPrimary}
          >
            {label} <ExternalIcon />
          </a>
        ))}
      </div>
      <Divider />
      <H3>Compliance & Standards References</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'FedRAMP Authorization Documentation', href: 'https://www.fedramp.gov' },
          { label: 'NIST SP 800-53 Control Catalog', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
          { label: 'Azure Service Trust Portal', href: 'https://servicetrust.microsoft.com' },
          { label: 'FedRAMP Marketplace — Azure Commercial', href: 'https://marketplace.fedramp.gov' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: C.textPrimary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.12s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.azure}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textPrimary}
          >
            {label} <ExternalIcon />
          </a>
        ))}
      </div>
    </div>
  )
}

function AzResIac() {
  return (
    <div>
      <H2>ARM Templates & Infrastructure as Code</H2>
      <Body>CMS teams provision Azure resources using Infrastructure as Code (IaC). ARM templates, Bicep, and Terraform are all supported approaches. All production infrastructure must be provisioned through code reviewed via pull request — manual console changes in production are restricted.</Body>
      <Divider />
      <H3>Supported IaC Approaches</H3>
      <Table
        heads={['Tool', 'Language', 'Best For']}
        rows={[
          ['ARM Templates', 'JSON', 'Native Azure; used for official CMS-managed baseline modules'],
          ['Bicep', 'Bicep DSL (transpiles to ARM)', 'Cleaner syntax than ARM JSON; recommended for new Azure-only projects'],
          ['Terraform', 'HCL', 'Multi-cloud teams or teams already using Terraform for other providers'],
        ]}
      />
      <Divider />
      <H3>ARM Template — Storage Account Example</H3>
      <Code>{`{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountName": { "type": "string" },
    "location":           { "type": "string", "defaultValue": "eastus2" }
  },
  "resources": [
    {
      "type":       "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-01-01",
      "name":       "[parameters('storageAccountName')]",
      "location":   "[parameters('location')]",
      "sku":        { "name": "Standard_ZRS" },
      "kind":       "StorageV2",
      "properties": {
        "minimumTlsVersion":        "TLS1_2",
        "allowBlobPublicAccess":    false,
        "supportsHttpsTrafficOnly": true,
        "encryption": {
          "services": {
            "blob": { "enabled": true },
            "file": { "enabled": true }
          },
          "keySource": "Microsoft.Storage"
        }
      }
    }
  ]
}`}</Code>
      <Divider />
      <H3>Bicep Equivalent</H3>
      <Code>{`param storageAccountName string
param location string = 'eastus2'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name:     storageAccountName
  location: location
  sku:      { name: 'Standard_ZRS' }
  kind:     'StorageV2'
  properties: {
    minimumTlsVersion:        'TLS1_2'
    allowBlobPublicAccess:    false
    supportsHttpsTrafficOnly: true
  }
}`}</Code>
      <Callout text="Always run az deployment sub what-if before applying ARM or Bicep templates to production. Review the planned changes carefully — what-if shows additions, modifications, and deletions before any resources are touched." />
    </div>
  )
}

function AzResCompliance() {
  return (
    <div>
      <H2>Compliance & ATO</H2>
      <Body>CMS Azure Commercial environments operate within the CMS Cloud Authority to Operate (ATO) program. Workloads inherit a significant set of security controls from the Azure platform and CMS shared infrastructure, reducing the documentation burden on individual system teams.</Body>
      <Divider />
      <H3>FISMA Boundaries in Azure</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {[
          { level: 'Low', color: C.green, bg: 'rgba(52,168,83,0.08)', border: 'rgba(52,168,83,0.3)', desc: 'Appropriate for publicly available information with no privacy implications. Limited impact if confidentiality, integrity, or availability is compromised.', examples: ['Public documentation sites', 'Non-sensitive reference data', 'Marketing and informational content'] },
          { level: 'Moderate', color: C.gold, bg: 'rgba(223,176,28,0.08)', border: 'rgba(223,176,28,0.3)', desc: 'Used for systems that handle PII, PHI, or other controlled but not classified information. Most CMS healthcare applications operate at the Moderate level.', examples: ['Healthcare applications handling PHI', 'Internal administrative systems', 'Beneficiary-facing portals'] },
          { level: 'High — East US 2', color: C.red, bg: 'rgba(234,67,53,0.08)', border: 'rgba(234,67,53,0.3)', desc: 'Reserved for systems where a compromise would have severe or catastrophic adverse effects. High-impact systems require the most rigorous controls. CMS High systems are restricted to the East US 2 region.', examples: ['Systems with direct financial payment processing', 'Infrastructure supporting critical agency operations', 'Systems with sensitive national security data'] },
        ].map(({ level, color, bg, border, desc, examples }) => (
          <div key={level} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, background: color, color: level === 'Moderate' ? 'var(--fusion-deep-sea-1000)' : '#fff' }}>FISMA {level}</span>
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
      <H3>CMS Cloud ATO Program</H3>
      <Body>All FISMA boundaries within CMS Azure Commercial are covered under the CMS Cloud ATO program. System owners inherit controls documented in the Azure FedRAMP package and the CMS platform SSP addendum, reducing the total number of controls individual teams must document and test.</Body>
      <Bullet items={[
        'System Security Plan (SSP) addenda covering Azure-specific inherited controls are available through your Hosting Coordinator',
        'Network Architecture Diagrams for provisioned Hub-and-Spoke topology are maintained by Cloud Operations',
        'Inheritance documentation maps CMS Cloud inherited controls to your system control sets',
        'Interconnection Security Agreements (ISAs) are required for connections to external systems or on-premises environments',
      ]} />
      <Callout text="Contact your Hosting Coordinator to obtain ATO artifacts, inherited controls documentation, and guidance on the CMS Cloud ATO process before initiating your system authorization." accent={C.gold} bg="rgba(223,176,28,0.07)" />
    </div>
  )
}

// ─── Sub-section registry ─────────────────────────────────────────────────────

const SUB_CONTENT: Record<string, () => ReactNode> = {
  'az-arch-org': () => <AzArchOrg />,
  'az-arch-compute': () => <AzArchCompute />,
  'az-arch-networking': () => <AzArchNetworking />,
  'az-arch-storage': () => <AzArchStorage />,
  'az-sec-iam': () => <AzSecIam />,
  'az-sec-defender': () => <AzSecDefender />,
  'az-sec-policy': () => <AzSecPolicy />,
  'az-sec-data': () => <AzSecData />,
  'az-cost': () => <AzCost />,
  'az-acc-console': () => <AzAccConsole />,
  'az-acc-monitoring': () => <AzAccMonitoring />,
  'az-acc-backup': () => <AzAccBackup />,
  'az-acc-automation': () => <AzAccAutomation />,
  'az-res-support': () => <AzResSupport />,
  'az-res-docs': () => <AzResDocs />,
  'az-res-iac': () => <AzResIac />,
  'az-res-compliance': () => <AzResCompliance />,
}

// ─── Section landing panels ───────────────────────────────────────────────────

function SectionLanding({ tabId, title, description, onNav }: { tabId: string; title: string; description: string; onNav: (id: string) => void }) {
  return (
    <div>
      <H2>{title}</H2>
      <Body mb={32}>{description}</Body>
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
      <H2>Resources</H2>
      <Body mb={28}>
        Reference materials, documentation, and support resources for CMS Azure Commercial teams.
      </Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { title: 'CMS Multi-Cloud Support', desc: 'Submit requests, report issues, and get help from the Cloud Operations team.', href: 'https://jiraent.cms.gov/plugins/servlet/desk/portal/22', linkText: 'Open Support Portal' },
          { title: 'Azure Documentation', desc: 'Official Microsoft product documentation, tutorials, and API references for Azure services.', href: 'https://learn.microsoft.com/en-us/azure/', linkText: 'View Documentation' },
          { title: 'CMS Cloud ATO Program', desc: 'Authority to Operate resources, inherited controls documentation, and security authorization guidance for CMS cloud systems.', href: '#', linkText: 'Learn More' },
          { title: 'Azure Service Trust Portal', desc: 'FedRAMP packages, ISO certifications, HIPAA compliance documentation, and SOC reports from Microsoft.', href: 'https://servicetrust.microsoft.com', linkText: 'View Trust Portal' },
          { title: 'Azure Architecture Center', desc: "Microsoft's reference architectures, patterns, and best practices for building scalable and secure Azure solutions.", href: 'https://learn.microsoft.com/en-us/azure/architecture/', linkText: 'Explore Architectures' },
          { title: 'FedRAMP Marketplace', desc: 'Review the authorized Azure Commercial services available under the CMS FedRAMP High authorization boundary.', href: 'https://marketplace.fedramp.gov', linkText: 'View Marketplace' },
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
            { label: 'Azure Status Dashboard', href: 'https://azure.status.microsoft' },
            { label: 'CMS IT Service Management (ITSM)', href: '#' },
            { label: 'NIST SP 800-53 Control Catalog', href: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
            { label: 'FedRAMP Authorization Documentation', href: 'https://www.fedramp.gov' },
            { label: 'Microsoft Entra ID Help Center', href: 'https://learn.microsoft.com/en-us/entra/identity/' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.12s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.azure}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'}
            >
              {label} <ExternalIcon />
            </a>
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: '0.875rem', color: C.textSecondary, lineHeight: 1.7, margin: '0 0 12px' }}>Contact the Cloud Support Team for assistance with Azure Commercial environments, requests, or access issues.</p>
          <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${C.cmsBlue}`, color: C.azure, fontSize: '0.875rem', fontWeight: 700, padding: '9px 20px', borderRadius: 999, textDecoration: 'none' }}>
            Get started with Azure <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const SECTION_DESC: Record<string, string> = {
  overview: "Azure Commercial is CMS's enterprise cloud hosting option for application modernization, data analytics, disaster recovery, and hybrid workloads. Explore service models, approved hosting options, and how Azure Commercial compares to Azure Government.",
  architecture: 'Understand the Azure resource hierarchy, approved compute and container services, networking topology, and storage and data protection options for CMS Azure Commercial environments.',
  security: 'Identity and access management, Microsoft Defender for Cloud, Azure Policy governance, and data governance and key management for CMS Azure Commercial workloads.',
  cost: 'FinOps framework, Azure pricing models, Microsoft Cost Management, budget alerts, and Reserved Instance guidance for managing Azure Commercial spend.',
  access: 'Runbooks, portal access procedures, monitoring and alerting, backup and recovery, and automation operations for CMS Azure Commercial environments.',
  resources: 'Helpful links, documentation, and support resources for CMS Azure Commercial teams.',
}

void [_CheckIcon, _H4]

export function AzurePlatformGuide() {
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
                <span className="kc-breadcrumb-current" aria-current="page">Azure Commercial</span>
              </li>
            </ol>
          </nav>
        </div>
        <section className="gcp-hero" aria-labelledby="azure-hero-heading">
          <div className="gcp-page__shell gcp-hero__inner">
            <h1 id="azure-hero-heading" className="fusion-hero__headline explore-hero__headline gcp-hero__title">
              <span className="block font-semibold leading-[1.2] tracking-tight">
                Azure Commercial
              </span>
            </h1>
            <div className="gcp-hero__layout">
              <div className="gcp-hero__copy">
                <p className="gcp-hero__lede">The enterprise cloud for CMS modernization.</p>
                <p className="fusion-hero__body explore-hero__body gcp-hero__body">
                  CMS uses Azure Commercial to deliver reliable, compliant, and mission-critical solutions. Explore the architecture, governance model, and operating principles that support this environment.
                </p>
                <div>
                  <div className="gcp-hero__finds-label">What you&rsquo;ll find</div>
                  <ul className="gcp-hero__finds">
                    {['Resource Organization', 'Identity & Access', 'Defender for Cloud', 'Cost Management'].map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="gcp-hero__panel azure-hero__panel">
                <p className="azure-hero__kicker">Authorization &amp; compliance</p>
                <ul className="azure-hero__badges">
                  {[
                    { label: 'FedRAMP High', tone: 'gold' },
                    { label: 'FISMA Moderate & High', tone: 'sky' },
                    { label: 'HIPAA / HITECH', tone: 'mint' },
                    { label: 'NIST 800-53 Rev 5', tone: 'muted' },
                    { label: 'FIPS 140-2', tone: 'muted' },
                  ].map(({ label, tone }) => (
                    <li key={label} className={`azure-hero__badge azure-hero__badge--${tone}`}>
                      <span className="azure-hero__dot" aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>
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
                aria-controls="azure-guide-content"
                onClick={() => switchTab(tab.id)}
                className={`explore-tabs__tab${activeTab === tab.id ? ' explore-tabs__tab--active' : ''}`}
              >
                {tab.id === 'overview' ? <HomeTabIcon active={activeTab === 'overview'} /> : null}
                {tab.label}
              </button>
            ))}
          </div>
          <FusionButton href="/#pathways" accent onDark size="small" className="gcp-tabs-cta">
            Get started with Azure
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

        <div id="azure-guide-content" ref={contentRef} style={{ flex: 1, background: C.mainBg, minWidth: 0 }}>

          {activeTab !== 'overview' && <SectionPhotoBanner sectionId={activeTab} />}

          <div style={{ padding: activeSub ? '28px 48px 64px' : '24px 48px 72px', maxWidth: activeSub ? 860 : 1100 }}>

            {activeTab !== 'overview' && (
              <nav aria-label="Breadcrumb" className="gcp-crumb gcp-crumb--inline">
                <ol className="kc-breadcrumb-list">
                  <li>
                    <button type="button" className="kc-breadcrumb-link" onClick={() => switchTab('overview')}>
                      Azure Commercial
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
