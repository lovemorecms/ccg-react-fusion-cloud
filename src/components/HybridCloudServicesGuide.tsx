import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react'
import { Badge } from '@cmsgov/ds-cms-gov'
import { Link } from 'react-router-dom'
import {
  SERVICES, CATEGORIES, MATRIX, COMPARISON,
  JOURNEY_PHASES, MATURITY_LABELS, PROVIDER_META,
  type Service, type Provider, type Category,
} from '../data/hybridCloudServicesGuide'
import { CapabilityCategoryIcon } from './icons/CapabilityCategoryIcon'
import { fusionToolkitPath } from '../data/fusionToolkitContent'
import { platformInteriorPath } from '../data/platformPages'

type Tab = 'overview' | 'catalog' | 'comparison' | 'journey'
type BadgeVariation = 'info' | 'success' | 'warn' | 'alert'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview',   label: 'Quick Reference' },
  { id: 'catalog',    label: 'Service Catalog' },
  { id: 'comparison', label: 'Cross-CSP Compare' },
  { id: 'journey',    label: 'Customer Journey' },
]

function providerBadgeProps(provider: Provider): { variation?: BadgeVariation; className?: string } {
  if (provider === 'aws') return { className: 'explore-badge--aws' }
  if (provider === 'azure') return { variation: 'info' }
  if (provider === 'gcp') return { variation: 'success' }
  return { variation: 'warn' }
}

function ProviderBadge({ provider, size = 'sm' }: { provider: Provider; size?: 'xs' | 'sm' | 'md' }) {
  return (
    <Badge
      {...providerBadgeProps(provider)}
      size={size === 'md' ? 'big' : undefined}
      hideScreenReaderText
    >
      {provider.toUpperCase()}
    </Badge>
  )
}

function MaturityBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const m = MATURITY_LABELS[level]
  const variation: BadgeVariation =
    level === 1 ? 'alert' : level <= 3 ? 'warn' : level === 4 ? 'success' : 'info'
  return (
    <Badge variation={variation}>
      L{level} · {m.label}
    </Badge>
  )
}

const ACCENT = '#dfb01c'
const ACCENT_SOFT = 'color-mix(in srgb, var(--fusion-yellow) 12%, transparent)'

const FUSION_COLORS: Record<string, string> = {
  Match: '#6eb6ff', Helix: '#8eb4ff', BaseCamp: '#b6bde0',
  Lens: '#dfb01c', 'Cloud.CMS.gov': '#dfb01c',
}

const TOOLKIT_CARDS = [
  {
    title: 'Match',
    description: 'CSP recommendation engine — maps workloads to the best cloud provider',
    icon: `${import.meta.env.BASE_URL}images/explore/toolkit/match-transparent.png`,
    color: FUSION_COLORS.Match,
    href: `${fusionToolkitPath}#match`,
  },
  {
    title: 'Helix',
    description: 'Governance & compliance platform — security, policies, landing zones',
    icon: `${import.meta.env.BASE_URL}images/explore/toolkit/helix-transparent.png`,
    color: FUSION_COLORS.Helix,
    href: `${fusionToolkitPath}#helix`,
  },
  {
    title: 'BaseCamp',
    description: 'Application portfolio registry — ownership, lifecycle, and integrations',
    icon: `${import.meta.env.BASE_URL}images/explore/toolkit/basecamp-transparent.png`,
    color: FUSION_COLORS.BaseCamp,
    href: `${fusionToolkitPath}#basecamp`,
  },
  {
    title: 'Lens',
    description: 'Multi-cloud FinOps — cost visibility, optimization, and reporting',
    icon: `${import.meta.env.BASE_URL}images/explore/toolkit/lens-transparent.png`,
    color: FUSION_COLORS.Lens,
    href: `${fusionToolkitPath}#lens`,
  },
  {
    title: 'Cloud.CMS.gov',
    description: 'Customer support hub — docs, training, onboarding, and self-service',
    icon: `${import.meta.env.BASE_URL}images/explore/toolkit/ccg-transparent.png`,
    color: FUSION_COLORS['Cloud.CMS.gov'],
    href: 'https://cloud.cms.gov',
    external: true,
  },
] as const

const ORACLE_COLOR = '#C74634'

const PLATFORM_CARDS: {
  title: string
  description: string
  color: string
  provider?: Provider
  href: string
}[] = [
  {
    title: 'AWS Commercial',
    description: 'Full AWS service catalog, cost-optimized workloads, broad innovation.',
    color: PROVIDER_META.aws.color,
    provider: 'aws',
    href: platformInteriorPath('aws-commercial'),
  },
  {
    title: 'Azure Commercial',
    description: 'Identity, M365, PaaS, AI/ML services, and developer tools.',
    color: PROVIDER_META.azure.color,
    provider: 'azure',
    href: platformInteriorPath('azure-commercial'),
  },
  {
    title: 'Google Cloud Platform',
    description: 'BigQuery analytics, AI/ML, data engineering, and Kubernetes workloads.',
    color: PROVIDER_META.gcp.color,
    provider: 'gcp',
    href: platformInteriorPath('google-cloud-platform'),
  },
  {
    title: 'Oracle',
    description: 'High-performance databases, enterprise apps, and intensive compute.',
    color: ORACLE_COLOR,
    href: platformInteriorPath('oracle-cloud-infrastructure'),
  },
]

function FusionTag({ tool }: { tool: string }) {
  return <Badge hideScreenReaderText>{tool}</Badge>
}

// ── Service card ──────────────────────────────────────────────────────────────

function ServiceCard({ svc, onClick }: { svc: Service; onClick: () => void }) {
  const pm = PROVIDER_META[svc.provider]
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-xl p-4 transition-all duration-200 group"
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        outline: 'none',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = `${pm.color}44`
        ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-card-hover)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
        ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-card)'
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5">{svc.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-sm" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {svc.name}
            </span>
            <ProviderBadge provider={svc.provider} size="xs" />
          </div>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
            {svc.definition}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge hideScreenReaderText>{svc.category}</Badge>
            <MaturityBadge level={svc.maturityLevel} />
          </div>
        </div>
      </div>
    </button>
  )
}

// ── Service detail panel ──────────────────────────────────────────────────────

function ServicePanel({ svc, onClose }: { svc: Service; onClose: () => void }) {
  const pm = PROVIDER_META[svc.provider]
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="mb-6">
      <h4 className="explore-label-heading" style={{ color: pm.color }}>
        {title}
      </h4>
      {children}
    </div>
  )

  const journeyOrder = ['Discover', 'Plan', 'Build', 'Secure', 'Operate', 'Optimize', 'Support']

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'color-mix(in srgb, var(--fusion-deep-sea-1000) 72%, transparent)' }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={ref}
        className="fixed top-0 right-0 h-full z-50 slide-in overflow-y-auto"
        style={{
          width: 'min(680px, 100vw)',
          background: 'var(--color-surface)',
          borderLeft: `1px solid ${pm.color}33`,
          scrollbarWidth: 'thin',
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-6 pb-4"
          style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{svc.icon}</span>
              <div>
                <h2 className="explore-panel-title">
                  {svc.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <ProviderBadge provider={svc.provider} size="sm" />
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{svc.category}</span>
                  <MaturityBadge level={svc.maturityLevel} />
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-colors"
              style={{ color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)' }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-1">

          {/* Definition */}
          <div className="rounded-xl p-4 mb-6" style={{ background: `${pm.color}10`, border: `1px solid ${pm.color}22` }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{svc.definition}</p>
          </div>

          <Section title="Primary Capabilities">
            <ul className="space-y-1.5">
              {svc.capabilities.map(c => (
                <li key={c} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <span style={{ color: pm.color }} className="shrink-0 mt-0.5">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </Section>

          <div className="grid grid-cols-1 gap-4 mb-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="rounded-xl p-4" style={{ background: 'color-mix(in srgb, var(--fusion-yellow) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--fusion-yellow) 28%, transparent)' }}>
              <h4 className="explore-label-heading flex items-center gap-1.5" style={{ color: 'var(--fusion-yellow)' }}>
                <span>✓</span> When to Use
              </h4>
              <ul className="space-y-1.5">
                {svc.whenToUse.map(w => (
                  <li key={w} className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>• {w}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,77,77,0.06)', border: '1px solid rgba(255,77,77,0.15)' }}>
              <h4 className="explore-label-heading flex items-center gap-1.5" style={{ color: '#FF6B6B' }}>
                <span>✕</span> When NOT to Use
              </h4>
              <ul className="space-y-1.5">
                {svc.whenNotToUse.map(w => (
                  <li key={w} className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>• {w}</li>
                ))}
              </ul>
              {svc.alternative && (
                <p className="text-xs mt-2 font-medium" style={{ color: 'var(--fusion-yellow)' }}>
                  Prefer: {svc.alternative}
                </p>
              )}
            </div>
          </div>

          <Section title="CMS Use Cases">
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: pm.color }}>Primary Example</p>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>{svc.cmsExample}</p>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {svc.useCases.map(u => (
                <li
                  key={u}
                  className="text-xs px-3 py-2 rounded-lg"
                  style={{ color: 'var(--color-text)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}
                >
                  {u}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Cloud Fusion Alignment">
            <div className="space-y-2">
              {svc.fusionAlignment.map(f => (
                <div key={f.tool} className="flex items-start gap-3 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
                  <FusionTag tool={f.tool} />
                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--color-text-muted)' }}>{f.relationship}</p>
                </div>
              ))}
            </div>
          </Section>

          {svc.talkingPoints.length > 0 && (
            <Section title="Customer's FAQs">
              {svc.talkingPoints.map(tp => (
                <div key={tp.q} className="rounded-xl p-4 mb-3" style={{ background: 'color-mix(in srgb, var(--fusion-deep-sea-500) 18%, transparent)', border: '1px solid color-mix(in srgb, var(--fusion-deep-sea-100) 28%, transparent)' }}>
                  <p className="text-xs font-semibold mb-2 flex items-start gap-1.5" style={{ color: 'var(--fusion-yellow)' }}>
                    <span>💬</span> {tp.q}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{tp.a}</p>
                </div>
              ))}
            </Section>
          )}

          <Section title="Customer Journey">
            <div className="flex flex-wrap gap-2">
              {journeyOrder.map(phase => {
                const active = svc.journeyPhases.includes(phase)
                return (
                  <Badge
                    key={phase}
                    variation={active ? 'info' : undefined}
                    hideScreenReaderText
                  >
                    {phase}
                  </Badge>
                )
              })}
            </div>
          </Section>

          <Section title="Target Personas">
            <div className="flex flex-wrap gap-2">
              {svc.personas.map(p => (
                <Badge key={p} hideScreenReaderText>{p}</Badge>
              ))}
            </div>
          </Section>

          {(svc.costNote || svc.securityNote) && (
            <div className="grid gap-3" style={{ gridTemplateColumns: svc.costNote && svc.securityNote ? '1fr 1fr' : '1fr' }}>
              {svc.costNote && (
                <div className="rounded-xl p-3" style={{ background: 'color-mix(in srgb, var(--fusion-yellow) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--fusion-yellow) 28%, transparent)' }}>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'var(--fusion-yellow)', fontFamily: 'var(--font-body)' }}>💰 Cost Note</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>{svc.costNote}</p>
                </div>
              )}
              {svc.securityNote && (
                <div className="rounded-xl p-3" style={{ background: 'rgba(255,77,77,0.06)', border: '1px solid rgba(255,77,77,0.2)' }}>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#FF6B6B', fontFamily: 'var(--font-body)' }}>🔐 Security Note</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>{svc.securityNote}</p>
                </div>
              )}
            </div>
          )}

          {svc.relatedServices.length > 0 && (
            <Section title="Related Services">
              <div className="flex flex-wrap gap-2">
                {svc.relatedServices.map(rid => {
                  const related = SERVICES.find(s => s.id === rid)
                  if (!related) return null
                  return (
                    <span key={rid} className="text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5" style={{ color: 'var(--color-text)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}>
                      <span>{related.icon}</span>
                      <span>{related.name}</span>
                      <ProviderBadge provider={related.provider} size="xs" />
                    </span>
                  )
                })}
              </div>
            </Section>
          )}
        </div>
      </div>
    </>
  )
}

// ── Overview page ─────────────────────────────────────────────────────────────

function OverviewPage({ onSelectCategory }: { onSelectCategory: (cat: Category) => void }) {
  const providers: Provider[] = ['aws', 'azure', 'gcp', 'cms']

  return (
    <div className="fade-in">
      {/* Hero */}
      <div
        className="explore-hero explore-overview-hero rounded-2xl mb-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)',
          border: '1px solid var(--color-border-bright)',
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--fusion-deep-sea-500) 45%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--fusion-yellow) 22%, transparent) 0%, transparent 50%)' }} />
        <div className="explore-hero__content relative z-10">
          <h1 className="fusion-hero__headline explore-hero__headline space-y-1 sm:space-y-1.5">
            <span className="block font-semibold leading-[1.12] tracking-wide">
              CMS Cloud Fusion
            </span>
          </h1>
          <p className="fusion-hero__body explore-hero__body mt-4 max-w-[52rem] font-sans text-base font-semibold leading-relaxed sm:mt-5 sm:text-lg">
            The authoritative reference for all approved cloud services across AWS, Microsoft Azure, Google Cloud Platform, and Fusion Enterprise Shared Services tools. Built for Hosting Coordinators, Technical Advisors, and Application Development Organizations.
          </p>
          <div className="flex flex-wrap gap-2">
            {providers.map(p => {
              const count = SERVICES.filter(s => s.provider === p).length
              return (
                <Badge key={p} size="big" hideScreenReaderText {...providerBadgeProps(p)}>
                  {p.toUpperCase()} · {count} services
                </Badge>
              )
            })}
          </div>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}images/explore/cms-cloud-fusion-logo.png`}
          alt="CMS Cloud Fusion Toolkit"
          className="explore-hero__art"
          decoding="async"
        />
      </div>

      {/* Platforms */}
      <section className="mb-8" id="platforms" aria-labelledby="explore-platforms-heading">
        <h2 id="explore-platforms-heading" className="explore-section-heading">
          Platforms
        </h2>
        <div className="explore-platform-grid">
          {PLATFORM_CARDS.map((card) => {
            const body = (
              <>
                <div className="mb-2">
                  {card.provider ? (
                    <ProviderBadge provider={card.provider} size="xs" />
                  ) : (
                    <Badge variation="warn" hideScreenReaderText>
                      ORACLE
                    </Badge>
                  )}
                </div>
                <span className="font-semibold text-sm" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                  {card.title}
                </span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)', margin: '0.5rem 0 0' }}>
                  {card.description}
                </p>
              </>
            )

            return (
              <Link
                key={card.title}
                to={card.href}
                className="explore-platform-card explore-platform-card--link rounded-xl p-4"
                style={{ border: `1px solid ${card.color}44` }}
              >
                {body}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Fusion Ecosystem */}
      <div className="mb-8">
        <h2 className="explore-section-heading">
          Cloud Fusion Toolkit
        </h2>
        <div className="explore-toolkit-grid">
          {TOOLKIT_CARDS.map((card) => {
            const inner = (
              <>
                <img
                  src={card.icon}
                  alt=""
                  className="explore-toolkit-card__icon"
                  decoding="async"
                />
                <div className="explore-toolkit-card__copy">
                  <h3 className="explore-toolkit-card__title">{card.title}</h3>
                  <p className="explore-toolkit-card__desc">{card.description}</p>
                </div>
              </>
            )
            const className = 'explore-toolkit-card explore-toolkit-card--link rounded-xl'
            const style = { border: `1px solid ${card.color}22` }

            if ('external' in card && card.external) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  className={className}
                  style={style}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              )
            }

            return (
              <Link key={card.title} to={card.href} className={className} style={style}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Reference Matrix */}
      <div>
        <h2 className="explore-section-heading">
          Capability Quick Reference
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--color-surface)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.08em', width: '35%' }}>
                  CAPABILITY
                </th>
                {providers.map(p => {
                  const m = PROVIDER_META[p]
                  return (
                    <th key={p} className="text-center px-3 py-3 font-semibold" style={{ color: m.color, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.08em' }}>
                      {p.toUpperCase()}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat, i) => (
                <tr
                  key={cat}
                  className="cursor-pointer transition-colors"
                  style={{ background: i % 2 === 0 ? 'var(--color-card)' : 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
                  onClick={() => onSelectCategory(cat)}
                  onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--color-card-hover)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? 'var(--color-card)' : 'var(--color-surface)' }}
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <CapabilityCategoryIcon category={cat} />
                      <span className="font-medium" style={{ color: 'var(--color-text)' }}>{cat}</span>
                    </span>
                  </td>
                  {providers.map(p => {
                    const active = MATRIX[cat][p]
                    const m = PROVIDER_META[p]
                    const cnt = SERVICES.filter(s => s.provider === p && s.category === cat).length
                    return (
                      <td key={p} className="text-center px-3 py-3">
                        {active ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-base font-bold" style={{ color: m.color }}>✓</span>
                            {cnt > 0 && <span className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>{cnt} svc</span>}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--color-text-dim)' }}>—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2 text-right" style={{ color: 'var(--color-text-dim)' }}>
          Click any row to explore services in that category →
        </p>
      </div>
    </div>
  )
}

// ── Catalog page ──────────────────────────────────────────────────────────────

function CatalogPage({
  filterCategory,
  onSelectService,
}: {
  filterCategory: Category | null
  onSelectService: (svc: Service) => void
}) {
  const [search, setSearch] = useState('')
  const [provFilter, setProvFilter] = useState<Provider | 'all'>('all')
  const [catFilter, setCatFilter] = useState<Category | 'all'>(filterCategory ?? 'all')
  const [matFilter, setMatFilter] = useState<number | 0>(0)

  useEffect(() => {
    if (filterCategory) setCatFilter(filterCategory)
  }, [filterCategory])

  const providers: (Provider | 'all')[] = ['all', 'aws', 'azure', 'gcp', 'cms']

  const results = useMemo(() => {
    return SERVICES.filter(s => {
      if (provFilter !== 'all' && s.provider !== provFilter) return false
      if (catFilter !== 'all' && s.category !== catFilter) return false
      if (matFilter > 0 && s.maturityLevel < matFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          s.name.toLowerCase().includes(q) ||
          s.definition.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.useCases.some(u => u.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [search, provFilter, catFilter, matFilter])

  return (
    <div className="fade-in">
      {/* Search + filters */}
      <div>
        <input
          type="search"
          placeholder="Search services, capabilities, use cases…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl px-5 py-4 text-sm leading-normal outline-none transition-all"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border-bright)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
            marginBottom: '1.5rem',
          }}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'color-mix(in srgb, var(--fusion-yellow) 55%, transparent)' }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-border-bright)' }}
        />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3" style={{ marginBottom: '1.75rem' }}>
          {/* Provider filter */}
          {providers.map(p => {
            const m = p !== 'all' ? PROVIDER_META[p] : null
            const active = provFilter === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => setProvFilter(p)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold leading-none transition-all"
                style={{
                  background: active ? (m?.bg ?? ACCENT_SOFT) : 'rgba(255,255,255,0.04)',
                  color: active ? (m?.color ?? ACCENT) : 'var(--color-text-muted)',
                  border: `1px solid ${active ? (m?.color ?? ACCENT) + '44' : 'var(--color-border)'}`,
                }}
              >
                {p === 'all' ? 'All Providers' : p.toUpperCase()}
              </button>
            )
          })}
          <div className="hidden h-8 w-px self-center sm:block" style={{ background: 'var(--color-border)', margin: '0 0.25rem' }} />
          {/* Category filter */}
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value as Category | 'all')}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold leading-none cursor-pointer outline-none"
            style={{
              background: catFilter !== 'all' ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
              color: catFilter !== 'all' ? ACCENT : 'var(--color-text-muted)',
              border: `1px solid ${catFilter !== 'all' ? ACCENT + '44' : 'var(--color-border)'}`,
              fontFamily: 'var(--font-body)',
            }}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {/* Maturity filter */}
          <select
            value={matFilter}
            onChange={e => setMatFilter(Number(e.target.value))}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold leading-none cursor-pointer outline-none"
            style={{
              background: matFilter > 0 ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
              color: matFilter > 0 ? ACCENT : 'var(--color-text-muted)',
              border: `1px solid ${matFilter > 0 ? ACCENT + '44' : 'var(--color-border)'}`,
              fontFamily: 'var(--font-body)',
            }}
          >
            <option value={0}>All Maturity Levels</option>
            <option value={5}>L5 · Enterprise Standard</option>
            <option value={4}>L4+ · Production Ready</option>
            <option value={3}>L3+ · Specialized</option>
          </select>
        </div>
      </div>

      <p
        className="text-xs"
        style={{
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          margin: '0 0 1rem',
        }}
      >
        {results.length} service{results.length !== 1 ? 's' : ''} · click any card for full profile
      </p>

      {results.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
          <div className="text-4xl mb-3">🔍</div>
          <p>No services match your filters.</p>
        </div>
      ) : (
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {results.map(svc => (
            <ServiceCard key={svc.id} svc={svc} onClick={() => onSelectService(svc)} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Comparison page ───────────────────────────────────────────────────────────

function ComparisonPage({ onSelectService }: { onSelectService: (svc: Service) => void }) {
  const [selected, setSelected] = useState<string>('')

  const rows = Object.entries(COMPARISON)
  const providers: Provider[] = ['aws', 'azure', 'gcp']

  const findSvc = (name: string) => SERVICES.find(s => s.name === name || s.name.includes(name.split('/')[0]))

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h2 className="explore-section-heading explore-section-heading--lede">
          Cross-CSP Service Equivalents
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Quickly find equivalent services across providers. Click any service to view its full profile.
        </p>
      </div>

      {/* Capability selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelected('')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: selected === '' ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
            color: selected === '' ? ACCENT : 'var(--color-text-muted)',
            border: `1px solid ${selected === '' ? ACCENT + '44' : 'var(--color-border)'}`,
          }}
        >
          All Capabilities
        </button>
        {rows.map(([key, row]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: selected === key ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
              color: selected === key ? ACCENT : 'var(--color-text-muted)',
              border: `1px solid ${selected === key ? ACCENT + '44' : 'var(--color-border)'}`,
            }}
          >
            {row.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--color-surface)' }}>
              <th className="text-left px-5 py-3.5 text-xs font-semibold tracking-widest" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', width: '22%' }}>
                CAPABILITY
              </th>
              {providers.map(p => {
                const m = PROVIDER_META[p]
                return (
                  <th key={p} className="text-left px-5 py-3.5 text-xs font-semibold tracking-widest" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>
                    {m.label.toUpperCase()}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows
              .filter(([key]) => selected === '' || key === selected)
              .map(([key, row], i) => (
                <tr
                  key={key}
                  style={{ background: i % 2 === 0 ? 'var(--color-card)' : 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                      {row.label}
                    </span>
                  </td>
                  {(['aws', 'azure', 'gcp'] as Provider[]).map(p => {
                    const svcName = row[p as 'aws' | 'azure' | 'gcp']
                    const svcObj = findSvc(svcName)
                    return (
                      <td key={p} className="px-5 py-4">
                        {svcObj ? (
                          <button
                            type="button"
                            onClick={() => onSelectService(svcObj)}
                            className="explore-compare-link"
                          >
                            <span className="text-base" aria-hidden="true">{svcObj.icon}</span>
                            <span className="explore-compare-link__name">{svcName}</span>
                          </button>
                        ) : (
                          <span className="explore-compare-name">{svcName}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Fusion Enterprise Shared Services row */}
      <div className="mt-4 rounded-xl p-5" style={{ background: 'color-mix(in srgb, var(--fusion-yellow) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--fusion-yellow) 28%, transparent)' }}>
        <h3 className="explore-label-heading" style={{ color: 'var(--fusion-yellow)' }}>
          CMS ENTERPRISE CROSS-CUTTING SERVICES
        </h3>
        <div className="flex flex-wrap gap-3">
          {SERVICES.filter(s => s.provider === 'cms').map(svc => (
            <button
              key={svc.id}
              onClick={() => onSelectService(svc)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{ background: 'color-mix(in srgb, var(--fusion-yellow) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--fusion-yellow) 32%, transparent)', color: 'var(--color-text)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in srgb, var(--fusion-yellow) 20%, transparent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in srgb, var(--fusion-yellow) 12%, transparent)' }}
            >
              <span>{svc.icon}</span>
              <span>{svc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Journey page ──────────────────────────────────────────────────────────────

function JourneyPage({ onSelectService }: { onSelectService: (svc: Service) => void }) {
  const [activePhase, setActivePhase] = useState<string>('Build')

  const phaseServices = useMemo(() =>
    SERVICES.filter(s => s.journeyPhases.includes(activePhase)),
    [activePhase]
  )

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h2 className="explore-section-heading explore-section-heading--lede">
          Customer Journey Map
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Approved services mapped to each phase of the CMS Cloud Fusion onboarding journey.
        </p>
      </div>

      {/* Phase timeline */}
      <div className="explore-journey relative mb-8">
        <div className="explore-journey__line" aria-hidden="true" />
        <div className="explore-journey__steps">
          {JOURNEY_PHASES.map((p, i) => {
            const active = p.phase === activePhase
            return (
              <button
                key={p.phase}
                type="button"
                className="explore-journey__step"
                aria-pressed={active}
                onClick={() => setActivePhase(p.phase)}
              >
                <span
                  className="explore-journey__num"
                  style={{
                    background: active ? 'var(--fusion-yellow)' : 'var(--color-card)',
                    borderColor: active ? 'var(--fusion-yellow)' : 'var(--color-border)',
                    color: active ? '#040b2e' : 'var(--color-text-muted)',
                    boxShadow: active ? '0 0 20px color-mix(in srgb, var(--fusion-yellow) 45%, transparent)' : 'none',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="explore-journey__label"
                  style={{ color: active ? 'var(--fusion-yellow)' : 'var(--color-text-muted)' }}
                >
                  {p.phase}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active phase detail */}
      {JOURNEY_PHASES.map(p => p.phase === activePhase && (
        <div key={p.phase}>
          <div className="rounded-xl p-4 mb-5" style={{ background: `${p.color}0F`, border: `1px solid ${p.color}33` }}>
            <h3 className="explore-phase-heading" style={{ color: p.color }}>
              {p.phase} Phase
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{p.desc}</p>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {phaseServices.map(svc => (
              <ServiceCard key={svc.id} svc={svc} onClick={() => onSelectService(svc)} />
            ))}
          </div>

          {phaseServices.length === 0 && (
            <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
              <p>No catalog services mapped to this phase yet.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Root app ──────────────────────────────────────────────────────────────────

export function HybridCloudServicesGuide() {
  const [tab, setTab] = useState<Tab>('overview')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [filterCategory, setFilterCategory] = useState<Category | null>(null)

  const handleSelectCategory = (cat: Category) => {
    setFilterCategory(cat)
    setTab('catalog')
  }

  const handleSelectService = (svc: Service) => {
    setSelectedService(svc)
  }

  return (
    <div className="explore-2">
      <div
        className="sticky top-[var(--fusion-nav-sticky-height,5rem)] z-30"
        style={{ background: 'color-mix(in srgb, var(--color-bg) 92%, transparent)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] md:px-[var(--fusion-site-padding-x-md)]">
          <nav className="explore-tabs" aria-label="Services guide sections">
            {TABS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`explore-tabs__tab${tab === t.id ? ' explore-tabs__tab--active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] py-8 md:px-[var(--fusion-site-padding-x-md)]">
        {tab === 'overview' && (
          <OverviewPage onSelectCategory={handleSelectCategory} />
        )}
        {tab === 'catalog' && (
          <CatalogPage
            filterCategory={filterCategory}
            onSelectService={handleSelectService}
          />
        )}
        {tab === 'comparison' && (
          <ComparisonPage onSelectService={handleSelectService} />
        )}
        {tab === 'journey' && (
          <JourneyPage onSelectService={handleSelectService} />
        )}
      </div>

      {selectedService && (
        <ServicePanel
          svc={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}
