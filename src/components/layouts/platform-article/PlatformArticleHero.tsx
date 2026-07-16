import type { ReactNode } from 'react'
import type { PlatformArticleMetadata } from '../../../data/platformArticleContent'

export type PlatformArticleHeroProps = {
  title: string
  summary: string
  metadata: Pick<PlatformArticleMetadata, 'updated' | 'readingTime'>
  imageSrc: string
  imageAlt?: string
  titleId?: string
  badge?: string
}

function MetaIcon({ children }: { children: ReactNode }) {
  return <span className="pa-hero__meta-icon">{children}</span>
}

export function PlatformArticleHero({
  title,
  summary,
  metadata,
  imageSrc,
  imageAlt = '',
  titleId = 'pa-hero-title',
  badge,
}: PlatformArticleHeroProps) {
  const imageUrl = `${import.meta.env.BASE_URL}${imageSrc.replace(/^\//, '')}`

  return (
    <section
      id="overview"
      className="init-hero init-hero--with-section-nav pa-hero"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <div className="init-hero__scrim pa-hero__scrim" aria-hidden />
      <div className="init-hero__orb init-hero__orb--1" aria-hidden />
      <div className="init-hero__orb init-hero__orb--2" aria-hidden />
      <div className="init-hero__orb init-hero__orb--3" aria-hidden />

      <div className="init-hero__inner pa-hero__inner">
        <div className="init-hero__text pa-hero__text">
          <div className="pa-hero__title-row">
            <h1 id={titleId} className="init-hero__heading pa-hero__title">
              {title}
            </h1>
            {badge ? <span className="pa-hero__badge">{badge}</span> : null}
          </div>
          <p className="init-hero__description pa-hero__summary">{summary}</p>

          <dl className="pa-hero__meta">
            <div className="pa-hero__meta-item">
              <MetaIcon>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M2 6.5h12M5 1.5v2M11 1.5v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </MetaIcon>
              <div>
                <dt>Updated</dt>
                <dd>{metadata.updated}</dd>
              </div>
            </div>
            <div className="pa-hero__meta-item">
              <MetaIcon>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </MetaIcon>
              <div>
                <dt>Reading time</dt>
                <dd>{metadata.readingTime}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="pa-hero__visual" aria-hidden={imageAlt ? undefined : true}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="pa-hero__visual-img"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
