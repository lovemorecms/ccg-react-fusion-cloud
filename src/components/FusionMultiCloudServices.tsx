/** Multi-Cloud Services — full-bleed background art + right-aligned copy */
import { FusionButton } from './FusionButton'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function FusionMultiCloudServices() {
  const contentRef = useScrollReveal<HTMLDivElement>({ threshold: 0.12 })
  /** Background from `public/images/sections/new-bg-cloud.png` (respects Vite `base`). */
  const multiCloudBgUrl = `${import.meta.env.BASE_URL}images/sections/new-bg-cloud.png`

  return (
    <section
      id="multi-cloud-services"
      className="fusion-multi-cloud relative isolate overflow-hidden text-white"
      aria-labelledby="fusion-multi-cloud-heading"
      style={{ backgroundImage: `url(${multiCloudBgUrl})` }}
    >
      <div className="relative z-[1] mx-auto flex min-h-[min(22rem,58vh)] max-w-[var(--fusion-site-max-width)] items-center px-[var(--fusion-site-padding-x)] py-[var(--fusion-section-pad-block)] md:px-[var(--fusion-site-padding-x-md)] lg:min-h-[min(38rem,62vh)] xl:min-h-[min(42rem,64vh)]">
        <div ref={contentRef} className="fusion-multi-cloud__copy fusion-reveal">
          <h2
            id="fusion-multi-cloud-heading"
            className="fusion-multi-cloud__heading m-0"
          >
            Multi-Cloud Services
          </h2>

          <div className="fusion-multi-cloud__prose flex flex-col gap-3.5 sm:gap-4">
            <p className="m-0">
              Fusion provides a true multi-cloud service that leverages the
              best features of each Cloud Service Provider to deliver value to
              CMS cloud customers across public cloud, on-prem data centers,
              and platform services.
            </p>
            <p className="m-0">
              Besides best-of-breed cloud platforms and services, we offer a
              unified governance system that enforces rules, ensures standards
              are met, and keeps costs under control across a multi-cloud setup,
              secured by a Zero-Trust, TIC 3.0-approved security system that
              covers all cloud platforms.
            </p>
            <p className="m-0">
              Fusion also offers right-sized workload placement, competitive
              pricing, and unified financial visibility, which drive measurable
              savings.
            </p>
          </div>

          <FusionButton
            to="/about/program-overview"
            accent
            className="fusion-multi-cloud__cta"
          >
            Learn more
          </FusionButton>
        </div>
      </div>
    </section>
  )
}
