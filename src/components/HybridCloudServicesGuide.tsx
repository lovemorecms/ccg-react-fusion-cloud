import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react'
import {
  SERVICES, CATEGORIES, CATEGORY_ICONS, MATRIX, COMPARISON,
  JOURNEY_PHASES, MATURITY_LABELS, PROVIDER_META,
  type Service, type Provider, type Category,
} from '../data/hybridCloudServicesGuide'

// ── Tiny helpers ─────────────────────────────────────────────────────────────

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ')

type Tab = 'overview' | 'catalog' | 'comparison' | 'journey'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview',   label: 'Quick Reference',   icon: '⚡' },
  { id: 'catalog',    label: 'Service Catalog',    icon: '🗂️' },
  { id: 'comparison', label: 'Cross-CSP Compare',  icon: '↔️' },
  { id: 'journey',    label: 'Customer Journey',   icon: '🗺️' },
]

// ── Provider badge ────────────────────────────────────────────────────────────

function ProviderBadge({ provider, size = 'sm' }: { provider: Provider; size?: 'xs' | 'sm' | 'md' }) {
  const m = PROVIDER_META[provider]
  const pad = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  return (
    <span
      className={cx('rounded font-semibold tracking-wide inline-flex items-center gap-1', pad)}
      style={{ color: m.color, background: m.bg, border: `1px solid ${m.color}22` }}
    >
      {provider.toUpperCase()}
    </span>
  )
}

// ── Maturity badge ────────────────────────────────────────────────────────────

function MaturityBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const m = MATURITY_LABELS[level]
  return (
    <span
      className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
      style={{ color: m.color, background: `${m.color}18`, border: `1px solid ${m.color}33` }}
    >
      L{level} · {m.label}
    </span>
  )
}

// ── Fusion alignment row ──────────────────────────────────────────────────────

const ACCENT = '#dfb01c'
const ACCENT_SOFT = 'color-mix(in srgb, var(--fusion-yellow) 12%, transparent)'

const FUSION_COLORS: Record<string, string> = {
  Match: '#6eb6ff', Helix: '#8eb4ff', BaseCamp: '#b6bde0',
  Lens: '#dfb01c', CCG: '#dfb01c',
}

function textOnFill(hex: string) {
  const light = new Set(['#dfb01c', '#6eb6ff', '#b6bde0', '#e7e9f5', '#b3a006', '#8eb4ff'])
  return light.has(hex.toLowerCase()) ? '#040b2e' : '#ffffff'
}

function FusionTag({ tool }: { tool: string }) {
  const color = FUSION_COLORS[tool] ?? '#b6bde0'
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded"
      style={{ color, background: `${color}18`, border: `1px solid ${color}33` }}
    >
      {tool}
    </span>
  )
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
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.05)' }}>
              {svc.category}
            </span>
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
      <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: pm.color, fontFamily: 'var(--font-body)' }}>
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
                <h2 className="font-bold text-xl leading-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
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
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-1.5" style={{ color: 'var(--fusion-yellow)', fontFamily: 'var(--font-body)' }}>
                <span>✓</span> When to Use
              </h4>
              <ul className="space-y-1.5">
                {svc.whenToUse.map(w => (
                  <li key={w} className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>• {w}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,77,77,0.06)', border: '1px solid rgba(255,77,77,0.15)' }}>
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-1.5" style={{ color: '#FF6B6B', fontFamily: 'var(--font-body)' }}>
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
                const ph = JOURNEY_PHASES.find(p => p.phase === phase)!
                return (
                  <span
                    key={phase}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={active
                      ? { color: ph.color, background: `${ph.color}18`, border: `1px solid ${ph.color}44` }
                      : { color: 'var(--color-text-dim)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)' }
                    }
                  >
                    {phase}
                  </span>
                )
              })}
            </div>
          </Section>

          <Section title="Target Personas">
            <div className="flex flex-wrap gap-2">
              {svc.personas.map(p => (
                <span key={p} className="text-xs px-2.5 py-1 rounded-full" style={{ color: 'var(--color-text)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}>
                  {p}
                </span>
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
      <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--fusion-deep-sea-700) 0%, var(--fusion-deep-sea-800) 55%, var(--fusion-deep-sea-1000) 100%)', border: '1px solid var(--color-border-bright)' }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--fusion-deep-sea-500) 45%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--fusion-yellow) 22%, transparent) 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-2.5 py-1 rounded text-xs font-semibold tracking-widest" style={{ background: ACCENT_SOFT, color: ACCENT, border: '1px solid color-mix(in srgb, var(--fusion-yellow) 35%, transparent)', fontFamily: 'var(--font-body)' }}>
              CMS CLOUD FUSION · CCG
            </div>
            <div className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-muted)' }}>
              Approved Services Catalog
            </div>
          </div>
          <h1 className="font-black text-3xl md:text-4xl mb-3 leading-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            CMS Cloud Fusion<br />
            <span style={{ color: 'var(--fusion-yellow)' }}>Approved Services</span> Guide
          </h1>
          <p className="text-base max-w-2xl leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
            The authoritative reference for all approved cloud services across AWS, Microsoft Azure, Google Cloud Platform, and Fusion Enterprise Shared Services tools. Built for Hosting Coordinators, Technical Advisors, and Application Development Organizations.
          </p>
          <div className="flex flex-wrap gap-3">
            {providers.map(p => {
              const m = PROVIDER_META[p]
              const count = SERVICES.filter(s => s.provider === p).length
              return (
                <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: m.bg, border: `1px solid ${m.color}33` }}>
                  <span className="text-sm font-bold" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>{p.toUpperCase()}</span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{count} services</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Fusion Ecosystem */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          Cloud Fusion Ecosystem
        </h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {Object.entries(FUSION_COLORS).map(([tool, color]) => {
            const descs: Record<string, string> = {
              Match: 'CSP recommendation engine — maps workloads to the best cloud provider',
              Helix: 'Governance & compliance platform — security, policies, landing zones',
              BaseCamp: 'Application portfolio registry — ownership, lifecycle, and integrations',
              Lens: 'Multi-cloud FinOps — cost visibility, optimization, and reporting',
              CCG: 'Customer support hub — docs, training, onboarding, and self-service',
            }
            return (
              <div key={tool} className="rounded-xl p-4" style={{ background: 'var(--color-card)', border: `1px solid ${color}22` }}>
                <div className="flex items-center gap-2 mb-2">
                  <FusionTag tool={tool} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{descs[tool]}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Reference Matrix */}
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
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
                      <span>{CATEGORY_ICONS[cat]}</span>
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
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Search services, capabilities, use cases…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border-bright)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
          }}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'color-mix(in srgb, var(--fusion-yellow) 55%, transparent)' }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-border-bright)' }}
        />
        <div className="flex flex-wrap gap-2">
          {/* Provider filter */}
          {providers.map(p => {
            const m = p !== 'all' ? PROVIDER_META[p] : null
            const active = provFilter === p
            return (
              <button
                key={p}
                onClick={() => setProvFilter(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
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
          <div className="w-px" style={{ background: 'var(--color-border)', margin: '0 4px' }} />
          {/* Category filter */}
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value as Category | 'all')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer outline-none"
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
            className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer outline-none"
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

      <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
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
        <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
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
                    const m = PROVIDER_META[p]
                    const svcObj = findSvc(svcName)
                    return (
                      <td key={p} className="px-5 py-4">
                        {svcObj ? (
                          <button
                            onClick={() => onSelectService(svcObj)}
                            className="flex items-center gap-2 group"
                          >
                            <span className="text-base">{svcObj.icon}</span>
                            <span
                              className="text-sm font-medium underline-offset-2 group-hover:underline"
                              style={{ color: m.color }}
                            >
                              {svcName}
                            </span>
                          </button>
                        ) : (
                          <span className="text-sm font-medium" style={{ color: m.color }}>
                            {svcName}
                          </span>
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
        <h3 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--fusion-yellow)', fontFamily: 'var(--font-body)' }}>
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
        <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          Customer Journey Map
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Approved services mapped to each phase of the CMS Cloud Fusion onboarding journey.
        </p>
      </div>

      {/* Phase timeline */}
      <div className="relative mb-8">
        {/* Connector line */}
        <div className="absolute top-6 left-0 right-0 h-px" style={{ background: 'var(--color-border)' }} />
        <div className="grid gap-2 relative" style={{ gridTemplateColumns: `repeat(${JOURNEY_PHASES.length}, 1fr)` }}>
          {JOURNEY_PHASES.map((p, i) => {
            const active = p.phase === activePhase
            return (
              <button
                key={p.phase}
                onClick={() => setActivePhase(p.phase)}
                className="flex flex-col items-center gap-2 pt-1 pb-3 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold relative z-10 transition-all"
                  style={{
                    background: active ? p.color : 'var(--color-card)',
                    border: `2px solid ${active ? p.color : 'var(--color-border)'}`,
                    color: active ? textOnFill(p.color) : 'var(--color-text-muted)',
                    boxShadow: active ? `0 0 20px ${p.color}44` : 'none',
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-xs font-semibold text-center"
                  style={{ color: active ? p.color : 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}
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
            <h3 className="font-bold text-base mb-1" style={{ color: p.color, fontFamily: 'var(--font-display)' }}>
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
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              Approved Services Guide
            </p>
            <nav className="flex flex-wrap items-center gap-1" aria-label="Services guide sections">
              {TABS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-pressed={tab === t.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: tab === t.id ? 'color-mix(in srgb, var(--fusion-yellow) 16%, transparent)' : 'transparent',
                    color: tab === t.id ? 'var(--fusion-yellow)' : 'var(--color-text-muted)',
                    border: `1px solid ${tab === t.id ? 'color-mix(in srgb, var(--fusion-yellow) 35%, transparent)' : 'transparent'}`,
                  }}
                >
                  <span className="hidden sm:inline">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </nav>
          </div>
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
