/** Explore the FUSION ecosystem — orbital diagram + capability cards (CMS.gov DS tokens) */
import type { CSSProperties } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const base = `${import.meta.env.BASE_URL}images/sections/ecosphere/`

type OrbitIcon = {
  id: string
  src: string
  angleDeg: number
}

const orbitIcons: OrbitIcon[] = [
  { id: 'toolkit', src: `${base}fusion-toolkit-icon2.png`, angleDeg: -90 },
  { id: 'multi-cloud', src: `${base}multi-cloud-icon2.png`, angleDeg: -32 },
  { id: 'product-teams', src: `${base}cloud-product-teams-icon2.png`, angleDeg: 52 },
  { id: 'cost', src: `${base}cost-optimization-icon2.png`, angleDeg: 132 },
  { id: 'security', src: `${base}security-networking-icon2.png`, angleDeg: -148 },
]

const capabilityTiles = [
  {
    id: 'toolkit',
    title: 'Fusion Toolkit',
    body:
      'Customer focused decision intelligence, governance, operational coordination, financial visibility, and product transparency across multi cloud environment',
    slot: 'toolkit' as const,
  },
  {
    id: 'multi-cloud',
    title: 'Multi Cloud Env',
    body:
      'Best-of breed public cloud, physical data center, and platform services delivered by AWS, Microsoft, Google, and Oracle CSPs',
    slot: 'multi-cloud' as const,
  },
  {
    id: 'security',
    title: 'Security & Networking',
    body:
      'Zero Trust security and continuous compliance monitoring with simplified networking across every cloud platform',
    slot: 'security' as const,
  },
  {
    id: 'cost',
    title: 'Cost Optimization',
    body:
      'Continuous process of reducing cloud expenses by maximizing resource efficiency and rightsizing without sacrificing performance',
    slot: 'cost' as const,
  },
  {
    id: 'product-teams',
    title: 'Cloud Product Teams',
    body:
      'Cloud engineering, security, finance and governance teams operating under a shared framework tailored specifically to meet CMS requirements',
    slot: 'product-teams' as const,
  },
] as const

export function FusionEcosystem() {
  const headerRef = useScrollReveal<HTMLElement>()
  const orbitRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -28px 0px' })
  const cardsRef = useScrollReveal<HTMLUListElement>({ threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
  const coreSrc = `${base}logo-fusion.png`

  return (
    <section
      id="fusion-ecosystem"
      className="fusion-ecosphere relative isolate overflow-hidden text-white"
      aria-labelledby="fusion-ecosphere-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle 48% at 70% 18%, color-mix(in srgb, var(--color-primary-light) 55%, transparent) 0%, transparent 72%)',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] pb-[var(--fusion-section-pad-block)] pt-[clamp(3.25rem,5vw+1.5rem,6.25rem)] md:px-[var(--fusion-site-padding-x-md)]">
        <header
          ref={headerRef}
          className="fusion-ecosphere__header fusion-reveal mb-10 max-w-[58rem] md:mb-12 lg:mb-14"
        >
          <h2 id="fusion-ecosphere-heading" className="fusion-ecosphere__heading m-0">
            <span className="fusion-ecosphere__heading-muted">Explore the </span>
            <span className="fusion-hero__headline-accent fusion-ecosphere__heading-accent font-bold">FUSION</span>
            <span className="fusion-ecosphere__heading-muted"> ecosystem</span>
          </h2>
          <p className="fusion-ecosphere__lede m-0 mt-3 max-w-[40rem] md:mt-4">
            A constellation of connected tools working in harmony
          </p>
        </header>

        <div className="fusion-ecosphere__scene">
          <div ref={orbitRef} className="fusion-ecosphere__orbit-host fusion-reveal" aria-hidden>
            <div className="fusion-ecosphere__orbit-board">
              <div className="fusion-ecosphere__ring fusion-ecosphere__ring--outer" />
              <div className="fusion-ecosphere__ring fusion-ecosphere__ring--mid" />
              <div className="fusion-ecosphere__core-wrap">
                <img
                  className="fusion-ecosphere__core-img"
                  src={coreSrc}
                  alt=""
                  width={160}
                  height={160}
                  decoding="async"
                />
              </div>
              {orbitIcons.map((node) => (
                <div
                  key={node.id}
                  className="fusion-ecosphere__orbit-node"
                  style={{ '--fusion-orbit-angle': `${node.angleDeg}deg` } as CSSProperties}
                >
                  <img src={node.src} alt="" width={120} height={120} decoding="async" />
                </div>
              ))}
            </div>
          </div>

          <ul ref={cardsRef} className="fusion-ecosphere__cards fusion-reveal-stagger m-0 list-none p-0">
            {capabilityTiles.map((tile) => (
              <li
                key={tile.id}
                className={`fusion-ecosphere__card-slot fusion-ecosphere__card-slot--${tile.slot} fusion-reveal-child min-w-0`}
              >
                <article
                  className="fusion-ecosphere__card h-full rounded-2xl border border-solid p-4 shadow-lg sm:p-5"
                  aria-labelledby={`fusion-ecosphere-tile-${tile.id}`}
                >
                  <h3 id={`fusion-ecosphere-tile-${tile.id}`} className="fusion-ecosphere__card-title m-0 text-center">
                    {tile.title}
                  </h3>
                  <p className="fusion-ecosphere__card-body m-0 mt-2 text-center sm:mt-3">{tile.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
