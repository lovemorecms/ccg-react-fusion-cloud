import { useCallback, useId, useState } from 'react'

const W = 1262.667
const H = 660

/** Decorative “star streak” positions from Figma (node 370:41048), normalized to hero % */
const STAR_STREAKS: { left: number; top: number; opacity: number }[] = [
  { left: 692.13, top: 159.59, opacity: 0.4 },
  { left: 1164.18, top: 653.2, opacity: 0.78 },
  { left: 962.86, top: 406.01, opacity: 0.5 },
  { left: 210.89, top: 389.54, opacity: 0.59 },
  { left: 832.58, top: 427, opacity: 0.51 },
  { left: 655, top: 611.13, opacity: 0.57 },
  { left: 1089.32, top: 387.96, opacity: 0.47 },
  { left: 518.07, top: 546.2, opacity: 0.48 },
  { left: 1254.39, top: 231.58, opacity: 0.5 },
  { left: 435.71, top: 113.66, opacity: 0.41 },
  { left: 299.52, top: 600.26, opacity: 0.49 },
  { left: 596.61, top: 228.36, opacity: 0.5 },
  { left: 555.56, top: 360.79, opacity: 0.59 },
  { left: 988.36, top: 139.4, opacity: 0.53 },
  { left: 204.42, top: 527.82, opacity: 0.5 },
  { left: 728.21, top: 213.72, opacity: 0.64 },
  { left: 1114.26, top: 64.59, opacity: 0.48 },
  { left: 559.48, top: 187.13, opacity: 0.51 },
  { left: 396.33, top: 344.26, opacity: 0.34 },
  { left: 965.79, top: 518.93, opacity: 0.48 },
  { left: 264.51, top: 93.54, opacity: 0.93 },
  { left: 643.77, top: 504.65, opacity: 0.54 },
  { left: 44.93, top: 616.35, opacity: 0.49 },
  { left: 900.49, top: 8.03, opacity: 0.5 },
  { left: 133.89, top: 312.43, opacity: 0.87 },
  { left: 1242.94, top: 615.63, opacity: 0.66 },
  { left: 987.34, top: 270.32, opacity: 0.41 },
  { left: 338.47, top: 430.18, opacity: 0.5 },
  { left: 1135.88, top: 327.53, opacity: 0.61 },
  { left: 809.94, top: 111.98, opacity: 0.72 },
]

const primaryCtaGradient =
  'linear-gradient(90deg, rgb(255, 184, 28) 0%, rgb(255, 186, 44) 8.33%, rgb(255, 189, 55) 16.67%, rgb(255, 191, 65) 25%, rgb(255, 194, 74) 33.33%, rgb(255, 196, 82) 41.67%, rgb(255, 199, 89) 50%, rgb(255, 201, 97) 58.33%, rgb(255, 204, 103) 66.67%, rgb(255, 206, 110) 75%, rgb(255, 208, 116) 83.33%, rgb(255, 211, 122) 91.67%, rgb(255, 213, 128) 100%)'

const headlineGoldGradient =
  'linear-gradient(90deg, rgb(255, 184, 28) 0%, rgb(255, 188, 52) 7.14%, rgb(255, 192, 69) 14.29%, rgb(255, 197, 83) 21.43%, rgb(255, 201, 96) 28.57%, rgb(255, 205, 107) 35.71%, rgb(255, 209, 118) 42.86%, rgb(255, 213, 128) 50%, rgb(255, 209, 118) 57.14%, rgb(255, 205, 107) 64.29%, rgb(255, 201, 96) 71.43%, rgb(255, 197, 83) 78.57%, rgb(255, 192, 69) 85.71%, rgb(255, 188, 52) 92.86%, rgb(255, 184, 28) 100%)'

type HeroSlide = {
  line1: string
  line2: string
  body: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    line1: 'Your Central Access Point for',
    line2: 'CMS Multi-Cloud Services',
    body: 'FUSION connects you to the right tools, guidance, and support for delivering mission outcomes.',
  },
  {
    line1: 'Run Sensitive Workloads on',
    line2: 'AWS GovCloud & CMS Patterns',
    body: 'Dummy copy: align landing zones, IAM guardrails, and FedRAMP-ready baselines before you ship your first workload to Amazon Web Services.',
  },
  {
    line1: 'Integrate Enterprise Identity with',
    line2: 'Microsoft Azure & Hybrid Cloud',
    body: 'Dummy copy: bridge on-prem AD, Entra ID, and cloud landing zones so teams can deploy CMS-compliant apps without re-architecting every release.',
  },
  {
    line1: 'Analyze & Scale on',
    line2: 'Google Cloud & Data Platforms',
    body: 'Dummy copy: park curated datasets in BigQuery, wire up Cloud Run services, and keep egress costs predictable while you iterate on analytics use cases.',
  },
  {
    line1: 'Orchestrate Hybrid &',
    line2: 'FinOps Across Every Cloud',
    body: 'Dummy copy: tag spend by mission, compare reserved capacity across AWS, Azure, and GCP, and give finance a single pane for chargeback and forecasts.',
  },
]

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={9}
      height={16}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 15L1 8L8 1"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={9}
      height={16}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 1L8 8L1 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Homepage hero (Figma: [FUSION Sphere demo](https://www.figma.com/design/iIRcUVjJYimuo9mcpgWBpe/FUSION-Sphere-Demo--CMS-?node-id=370-41045)).
 * Carousel cycles dummy cloud-themed slides until real content is wired.
 */
export function FusionHero() {
  const [slideIndex, setSlideIndex] = useState(0)
  const carouselId = useId()
  const labelId = `${carouselId}-label`
  const liveId = `${carouselId}-live`

  const n = HERO_SLIDES.length
  const slide = HERO_SLIDES[slideIndex]!

  const goPrev = useCallback(() => {
    setSlideIndex((i) => (i - 1 + n) % n)
  }, [n])

  const goNext = useCallback(() => {
    setSlideIndex((i) => (i + 1) % n)
  }, [n])

  const onCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    },
    [goPrev, goNext],
  )

  return (
    <section
      className="fusion-hero relative isolate w-full overflow-x-clip bg-[#000d26] pb-1"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        Featured cloud topics. Use previous and next buttons, or slide
        indicators, to change slides. Arrow keys work when the carousel
        controls are focused.
      </p>

      <img
        src="/images/hero/hero-background.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover object-[100%_30%] sm:object-[100%_28%] md:object-[100%_30%] lg:object-[100%_32%]"
        decoding="async"
        fetchPriority="high"
      />

      {/* Left scrim — width tracks a readable copy column, not a % of the whole hero */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-[min(100%,24rem)] bg-gradient-to-r from-[#000d26]/95 via-[#000d26]/45 to-transparent sm:max-w-[min(100%,28rem)] md:max-w-[min(100%,32rem)] lg:max-w-[min(100%,36rem)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(0, 94, 162, 0.1) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(180deg, rgba(0, 94, 162, 0.1) 0%, rgba(0, 0, 0, 0) 40%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden
      >
        {STAR_STREAKS.map((s, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${(s.left / W) * 100}%`,
              top: `${(s.top / H) * 100}%`,
              opacity: s.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1904px] px-4 pb-24 pt-8 sm:px-8 sm:pb-28 sm:pt-9 md:px-12 md:pb-28 md:pt-10 lg:px-16 lg:pb-32">
        <div className="grid grid-cols-12 gap-y-4 lg:gap-x-10">
          <div className="col-span-12 w-full sm:col-span-10 md:col-span-8 lg:col-span-6 xl:col-span-5">
            <div className="pointer-events-auto w-full max-w-[40rem]">
              <div
                key={slideIndex}
                className="fusion-hero-slide-enter"
                aria-live="polite"
                aria-atomic="true"
                id={liveId}
              >
                <h1
                  id="fusion-hero-heading"
                  className="fusion-hero__headline space-y-1 sm:space-y-1.5"
                >
                  <span className="block text-3xl font-semibold leading-[1.12] tracking-wide text-white sm:text-4xl md:text-4xl lg:text-5xl">
                    {slide.line1}
                  </span>
                  <span
                    className="block bg-clip-text text-3xl font-semibold leading-[1.12] tracking-tight text-transparent drop-shadow-[0_0_16px_rgba(255,184,28,0.38)] sm:text-4xl md:text-4xl lg:text-5xl"
                    style={{ backgroundImage: headlineGoldGradient }}
                  >
                    {slide.line2}
                  </span>
                </h1>

                <p className="mt-4 max-w-prose font-sans text-base font-semibold leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
                  {slide.body}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-3">
                <a
                  href="#get-started"
                  className="fusion-hero__link-primary inline-flex h-12 w-full shrink-0 items-center justify-center rounded-[10px] px-5 font-sans text-sm font-semibold shadow-[0_0_28px_rgba(255,184,28,0.35)] sm:w-auto sm:min-w-[11rem] sm:px-6 sm:text-base"
                  style={{ backgroundImage: primaryCtaGradient }}
                >
                  Start your journey
                </a>
                <a
                  href="#explore-cloud"
                  className="fusion-hero__link-secondary inline-flex h-12 w-full shrink-0 items-center justify-center rounded-[10px] border-2 border-white/30 bg-white/10 px-5 font-sans text-sm font-semibold sm:w-auto sm:min-w-[11rem] sm:px-6 sm:text-base"
                >
                  Explore cloud options
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel: full-bleed hero, bottom center (not tied to left copy column) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] flex justify-center px-4 pb-20 pt-2 sm:pb-24 md:pb-[5.5rem]">
        <div
          className="pointer-events-auto flex items-center justify-center gap-3 rounded-full border border-white/25 bg-[#000d26]/65 px-4 py-2 shadow-lg backdrop-blur-md sm:gap-4 sm:px-5 sm:py-2.5"
          role="group"
          aria-label="Carousel controls"
          tabIndex={0}
          onKeyDown={onCarouselKeyDown}
        >
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white transition-[background-color,transform] duration-200 ease-out hover:bg-white/20 hover:scale-110 active:scale-95 sm:size-11"
            aria-label="Previous slide"
            onClick={goPrev}
          >
            <ChevronLeft className="shrink-0" />
          </button>
          <div
            className="flex items-center justify-center gap-2.5 sm:gap-3"
            aria-label="Slides"
          >
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-current={i === slideIndex ? 'true' : undefined}
                aria-label={
                  i === slideIndex
                    ? `Slide ${i + 1} of ${n}, current`
                    : `Go to slide ${i + 1} of ${n}`
                }
                onClick={() => setSlideIndex(i)}
                className={`transition-all duration-300 ease-out ${
                  i === slideIndex
                    ? 'h-2.5 min-w-10 rounded-full bg-[#ffb81c] sm:h-3 sm:min-w-12'
                    : 'size-2.5 shrink-0 rounded-full bg-white/30 hover:bg-white/50 sm:size-3'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white transition-[background-color,transform] duration-200 ease-out hover:bg-white/20 hover:scale-110 active:scale-95 sm:size-11"
            aria-label="Next slide"
            onClick={goNext}
          >
            <ChevronRight className="shrink-0" />
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-16 bg-gradient-to-t from-[#f4f6f8] from-15% via-[#f4f6f8]/35 to-transparent to-100%"
        aria-hidden
      />
    </section>
  )
}
