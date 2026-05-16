/** Explore the FUSION ecosystem — orbital diagram + capability cards (CMS.gov DS tokens) */
import { useScrollReveal } from '../hooks/useScrollReveal'

const base = `${import.meta.env.BASE_URL}images/sections/ecosphere/`

const orbitIcons = [
  { id: 'toolkit' as const, src: `${base}fusion-toolkit-icon2.png` },
  { id: 'security' as const, src: `${base}security-networking-icon2.png` },
  { id: 'multi-cloud' as const, src: `${base}multi-cloud-icon2.png` },
  { id: 'cost' as const, src: `${base}cost-optimization-icon2.png` },
  { id: 'product-teams' as const, src: `${base}cloud-product-teams-icon2.png` },
] as const

const capabilityTiles = [
  {
    id: 'toolkit',
    title: 'Fusion Toolkit',
    body:
      'Customer focused decision intelligence, governance, operational coordination, financial visibility, and product transparency across multi cloud environment',
    slot: 'toolkit' as const,
  },
  {
    id: 'security',
    title: 'Security & Networking',
    body:
      'Zero Trust security and continuous compliance monitoring with simplified networking across every cloud platform',
    slot: 'security' as const,
  },
  {
    id: 'multi-cloud',
    title: 'Multi Cloud Env',
    body:
      'Best-of breed public cloud, physical data center, and platform services delivered by AWS, Microsoft, Google, and Oracle CSPs',
    slot: 'multi-cloud' as const,
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
  const clusterRef = useScrollReveal<HTMLDivElement>({ threshold: 0.06, rootMargin: '0px 0px -24px 0px' })
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

      <div className="relative z-[1] mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] py-[var(--fusion-section-pad-block)] md:px-[var(--fusion-site-padding-x-md)]">
        <header
          ref={headerRef}
          className="fusion-ecosphere__header fusion-home-section__header fusion-reveal max-w-[58rem]"
        >
          <h2 id="fusion-ecosphere-heading" className="fusion-ecosphere__heading m-0">
            <span className="fusion-ecosphere__heading-muted">Explore the </span>
            <span className="fusion-hero__headline-accent fusion-ecosphere__heading-accent font-bold">FUSION</span>
            <span className="fusion-ecosphere__heading-muted"> ecosystem</span>
          </h2>
          <p className="fusion-ecosphere__lede m-0 max-w-[40rem]">
            A constellation of connected tools working in harmony
          </p>
        </header>

        <div ref={clusterRef} className="fusion-ecosphere__cluster fusion-reveal-stagger">
          <div className="fusion-ecosphere__orbit-host fusion-reveal-child" aria-hidden>
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
                  className={`fusion-ecosphere__orbit-node fusion-ecosphere__orbit-node--${node.id}`}
                >
                  <img src={node.src} alt="" width={120} height={120} decoding="async" />
                </div>
              ))}
            </div>
          </div>

          {capabilityTiles.map((tile) => (
            <article
              key={tile.id}
              className={`fusion-ecosphere__tile fusion-ecosphere__tile--${tile.slot} fusion-reveal-child min-w-0`}
              aria-labelledby={`fusion-ecosphere-tile-${tile.id}`}
            >
              <div className="fusion-ecosphere__card h-full rounded-2xl border border-solid p-4 shadow-lg sm:p-5">
                <h3 id={`fusion-ecosphere-tile-${tile.id}`} className="fusion-ecosphere__card-title m-0 text-center">
                  {tile.title}
                </h3>
                <p className="fusion-ecosphere__card-body m-0 mt-2 text-center sm:mt-3">{tile.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
