import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { TwoColumnPageLayout } from '../components/layouts/TwoColumnPageLayout'
import { getPlatformBySlug } from '../data/platformPages'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

function PlatformBreadcrumbs({ platformTitle }: { platformTitle: string }) {
  return (
    <nav aria-label="Breadcrumb" className="ddoc-breadcrumb-inner">
      <ol className="ddoc-breadcrumb-list">
        <li>
          <Link to="/" className="ddoc-breadcrumb-link">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="ddoc-breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </li>
        <li>
          <Link to="/explore" className="ddoc-breadcrumb-link">
            Explore
          </Link>
        </li>
        <li aria-hidden="true" className="ddoc-breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </li>
        <li>
          <span className="ddoc-breadcrumb-current">{platformTitle}</span>
        </li>
      </ol>
    </nav>
  )
}

export default function PlatformInteriorPage() {
  const { platformSlug } = useParams<{ platformSlug: string }>()
  const platform = platformSlug ? getPlatformBySlug(platformSlug) : undefined
  const [activeSectionId, setActiveSectionId] = useState('overview')

  useEffect(() => {
    if (platform) {
      document.title = `${platform.title} | Explore | FUSION Sphere`
      setActiveSectionId(platform.sections[0]?.id ?? 'overview')
    }
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [platform])

  const navItems = useMemo(() => {
    if (!platform) return []
    return platform.sections.map((section) => ({
      id: section.id,
      label: section.label,
      active: section.id === activeSectionId,
      onClick: () => setActiveSectionId(section.id),
    }))
  }, [platform, activeSectionId])

  if (!platform) {
    return <Navigate to="/explore" replace />
  }

  const activeSection =
    platform.sections.find((s) => s.id === activeSectionId) ?? platform.sections[0]

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <TwoColumnPageLayout
          breadcrumbs={<PlatformBreadcrumbs platformTitle={platform.title} />}
          pageTitle={platform.title}
          pageSubtext={platform.pageSubtext}
          navLabel={`${platform.title} navigation`}
          navItems={navItems}
          contentTitle={activeSection.contentTitle}
        >
          {activeSection.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="ddoc-article__p">
              {paragraph}
            </p>
          ))}
        </TwoColumnPageLayout>
      </main>

      <SiteFooter />
    </>
  )
}
