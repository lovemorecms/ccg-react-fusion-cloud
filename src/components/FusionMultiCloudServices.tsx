/** Multi-Cloud Services — Figma 370:41247 (wide left art + copy; no “card” frame) */

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** Matches `public/images/sections/multi-cloud-apps.png` (orbit hotspots in file pixel space). */
const MULTI_CLOUD_ART_INTRINSIC = { w: 1926, h: 817 } as const

type MultiCloudVendorHotspot = {
  id: string
  label: string
  href: string
  external?: boolean
  /** Center x in PNG pixels */
  cx: number
  /** Center y in PNG pixels */
  cy: number
  /** Hit radius in PNG pixels */
  r: number
}

/**
 * Centers are tuned to the current export; nudge cx/cy/r here if the asset is re-exported.
 * `href` values are easy to swap for product routes.
 */
const MULTI_CLOUD_VENDOR_HOTSPOTS: MultiCloudVendorHotspot[] = [
  { id: 'aws', label: 'Amazon Web Services', href: 'https://aws.amazon.com/', external: true, cx: 610, cy: 206, r: 52 },
  { id: 'oracle', label: 'Oracle Cloud', href: 'https://www.oracle.com/cloud/', external: true, cx: 330, cy: 395, r: 48 },
  { id: 'google', label: 'Google Cloud', href: 'https://cloud.google.com/', external: true, cx: 355, cy: 618, r: 48 },
  { id: 'azure', label: 'Microsoft Azure', href: 'https://azure.microsoft.com/', external: true, cx: 855, cy: 380, r: 50 },
  {
    id: 'platform',
    label: 'Platform and data center services',
    href: '#multi-cloud-services',
    cx: 830,
    cy: 580,
    r: 48,
  },
]

const primaryCtaGradient =
  'linear-gradient(90deg, rgb(255, 184, 28) 0%, rgb(255, 186, 44) 8.33%, rgb(255, 189, 55) 16.67%, rgb(255, 191, 65) 25%, rgb(255, 194, 74) 33.33%, rgb(255, 196, 82) 41.67%, rgb(255, 199, 89) 50%, rgb(255, 201, 97) 58.33%, rgb(255, 204, 103) 66.67%, rgb(255, 206, 110) 75%, rgb(255, 208, 116) 83.33%, rgb(255, 211, 122) 91.67%, rgb(255, 213, 128) 100%)'

const MULTI_CLOUD_DUST: { left: number; top: number; opacity: number }[] = [
  { left: 6, top: 18, opacity: 0.45 },
  { left: 11, top: 42, opacity: 0.3 },
  { left: 18, top: 12, opacity: 0.38 },
  { left: 22, top: 58, opacity: 0.28 },
  { left: 28, top: 33, opacity: 0.4 },
  { left: 34, top: 72, opacity: 0.22 },
  { left: 38, top: 48, opacity: 0.35 },
  { left: 44, top: 22, opacity: 0.32 },
  { left: 48, top: 65, opacity: 0.26 },
  { left: 52, top: 38, opacity: 0.3 },
  { left: 15, top: 78, opacity: 0.2 },
  { left: 26, top: 88, opacity: 0.18 },
  { left: 40, top: 8, opacity: 0.25 },
  { left: 8, top: 52, opacity: 0.22 },
  { left: 32, top: 15, opacity: 0.28 },
  { left: 20, top: 62, opacity: 0.24 },
  { left: 5, top: 35, opacity: 0.2 },
  { left: 42, top: 52, opacity: 0.26 },
  { left: 36, top: 82, opacity: 0.18 },
  { left: 14, top: 8, opacity: 0.22 },
  { left: 30, top: 92, opacity: 0.16 },
  { left: 24, top: 28, opacity: 0.3 },
  { left: 46, top: 18, opacity: 0.2 },
  { left: 12, top: 68, opacity: 0.24 },
]

/** Tailwind `lg` breakpoint (must match `tailwindcss` default screens.lg). */
const TAILWIND_LG_MQ = '(min-width: 1024px)'

/**
 * `object-position` for this art must stay in sync with the <img> class list
 * (`object-left` / `lg:object-[10%_50%]`). We do not rely on `getComputedStyle`
 * alone: an empty read (before styles apply) used to default to 50%/50% and
 * shifted every hotspot far off the icons.
 */
function getMultiCloudObjectAlign(): { fx: number; fy: number } {
  if (typeof window === 'undefined') return { fx: 0, fy: 0.5 }
  return window.matchMedia(TAILWIND_LG_MQ).matches ? { fx: 0.1, fy: 0.5 } : { fx: 0, fy: 0.5 }
}

/** Maps a point in image pixel space to % positions inside the box that uses `object-fit: cover`. */
function bitmapCenterToLayoutPercent(
  iw: number,
  ih: number,
  cw: number,
  ch: number,
  fx: number,
  fy: number,
  bx: number,
  by: number,
  r: number
): { leftPct: number; topPct: number; widthPct: number } {
  const s = Math.max(cw / iw, ch / ih)
  const rw = iw * s
  const rh = ih * s
  const offX = (cw - rw) * fx
  const offY = (ch - rh) * fy
  const cx = offX + bx * s
  const cy = offY + by * s
  const diam = 2 * r * s
  return {
    leftPct: (cx / cw) * 100,
    topPct: (cy / ch) * 100,
    widthPct: (diam / cw) * 100,
  }
}

function FusionMultiCloudArtMedia() {
  const mediaRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [layout, setLayout] = useState<
    { spot: MultiCloudVendorHotspot; leftPct: number; topPct: number; widthPct: number }[] | null
  >(null)

  const recompute = useCallback(() => {
    const media = mediaRef.current
    const img = imgRef.current
    if (!media || !img) return

    const cw = media.offsetWidth
    const ch = media.offsetHeight
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    if (cw < 2 || ch < 2 || iw < 2 || ih < 2) return

    const { fx, fy } = getMultiCloudObjectAlign()

    const next = MULTI_CLOUD_VENDOR_HOTSPOTS.map((spot) => {
      const { leftPct, topPct, widthPct } = bitmapCenterToLayoutPercent(
        iw,
        ih,
        cw,
        ch,
        fx,
        fy,
        spot.cx,
        spot.cy,
        spot.r
      )
      return { spot, leftPct, topPct, widthPct }
    })
    setLayout(next)
  }, [])

  useLayoutEffect(() => {
    recompute()
    const media = mediaRef.current
    const img = imgRef.current
    const ro = new ResizeObserver(() => {
      recompute()
    })
    if (media) ro.observe(media)
    img?.addEventListener('load', recompute)

    const mql = window.matchMedia(TAILWIND_LG_MQ)
    const onBreakpoint = () => {
      recompute()
    }
    mql.addEventListener('change', onBreakpoint)

    return () => {
      ro.disconnect()
      img?.removeEventListener('load', recompute)
      mql.removeEventListener('change', onBreakpoint)
    }
  }, [recompute])

  return (
    <div
      ref={mediaRef}
      className="fusion-multi-cloud__media relative h-full min-h-[15rem] w-full origin-[14%_50%] sm:min-h-[18rem] lg:absolute lg:inset-0 lg:h-full lg:min-h-0 lg:min-w-0 lg:origin-[12%_50%] lg:scale-[1.2] xl:scale-[1.26] xl:origin-[10%_50%]"
    >
      <img
        ref={imgRef}
        src="/images/sections/multi-cloud-apps.png"
        alt="Illustration of Fusion multi-cloud orbit connecting major cloud providers and platform services around a central core."
        className="pointer-events-none block h-full w-full object-cover object-left lg:absolute lg:inset-0 lg:object-[10%_50%]"
        width={MULTI_CLOUD_ART_INTRINSIC.w}
        height={MULTI_CLOUD_ART_INTRINSIC.h}
        loading="lazy"
        decoding="async"
      />
      <nav
        className="fusion-multi-cloud__icon-map pointer-events-none absolute inset-0 z-[2]"
        aria-hidden={layout == null ? true : undefined}
      >
        {layout?.map(({ spot, leftPct, topPct, widthPct }) => (
          <a
            key={spot.id}
            href={spot.href}
            className="fusion-multi-cloud__vendor-link pointer-events-auto absolute rounded-full"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              width: `${widthPct}%`,
              aspectRatio: '1',
              transform: 'translate(-50%, -50%)',
            }}
            aria-label={spot.external ? `${spot.label} (opens in a new tab)` : spot.label}
            {...(spot.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          />
        ))}
      </nav>
    </div>
  )
}

export function FusionMultiCloudServices() {
  const contentRef = useScrollReveal<HTMLDivElement>({ threshold: 0.12 })

  return (
    <section
      id="multi-cloud-services"
      className="fusion-multi-cloud relative isolate overflow-hidden text-white"
      aria-labelledby="fusion-multi-cloud-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.45]"
        aria-hidden
      >
        {MULTI_CLOUD_DUST.map((d, i) => (
          <div
            key={i}
            className="absolute size-0.5 rounded-full bg-sky-200"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              opacity: d.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto max-w-[var(--fusion-site-max-width)] px-[var(--fusion-site-padding-x)] py-[var(--fusion-section-pad-block)] md:px-[var(--fusion-site-padding-x-md)]">
        {/* Figma ~50/50: art column matches frame export (orbit-heavy left); copy column matches heading stack */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          <div className="fusion-multi-cloud__art relative min-h-[15rem] w-full justify-self-stretch overflow-hidden sm:min-h-[18rem] lg:min-h-[min(38rem,62vh)] xl:min-h-[min(42rem,64vh)]">
            {/* Hotspot % positions are derived from the same object-fit: cover math as the <img> (SVG could not match object-position). */}
            <FusionMultiCloudArtMedia />
          </div>

          <div ref={contentRef} className="fusion-reveal min-w-0 justify-self-stretch">
            <h2
              id="fusion-multi-cloud-heading"
              className="fusion-multi-cloud__heading m-0"
            >
              Multi-Cloud Services
            </h2>

            <div className="fusion-multi-cloud__prose mt-5 flex flex-col gap-3.5 sm:gap-4 lg:mt-6">
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

            <a
              href="#multi-cloud-services"
              className="fusion-multi-cloud__cta mt-7 inline-flex h-12 w-fit min-w-[10.5rem] shrink-0 items-center justify-center rounded-[10px] px-6 font-sans text-sm font-semibold shadow-[0_0_28px_rgba(255,184,28,0.35)] sm:mt-8 sm:text-base"
              style={{ backgroundImage: primaryCtaGradient }}
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
