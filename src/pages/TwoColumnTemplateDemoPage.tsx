import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TwoColumnPageLayout } from '../components/layouts/TwoColumnPageLayout'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'getting-started', label: 'Getting started' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'onboarding', label: 'Onboarding steps' },
  { id: 'support', label: 'Support resources' },
] as const

const sectionCopy: Record<
  (typeof navSections)[number]['id'],
  { contentTitle: string; paragraphs: string[] }
> = {
  overview: {
    contentTitle: 'Overview',
    paragraphs: [
      'This template demonstrates a two-column interior page: a persistent left navigation panel and a main content area on the right.',
      'Use the page header for the overall topic (title and subtext). Use the right panel title for the active section or article.',
    ],
  },
  'getting-started': {
    contentTitle: 'Getting started',
    paragraphs: [
      'Start here for initial setup tasks, account provisioning, and links to foundational CMS Hybrid Cloud documentation.',
      'Each item in the left navigation can map to its own route or in-page section, depending on how you structure the site.',
    ],
  },
  requirements: {
    contentTitle: 'Requirements',
    paragraphs: [
      'List prerequisites such as EUA access, approved tools, and environment approvals before teams begin implementation.',
      'Keep requirement lists scannable with short paragraphs and bullet lists in the content body.',
    ],
  },
  onboarding: {
    contentTitle: 'Onboarding steps',
    paragraphs: [
      'Walk users through staged onboarding: discovery, sandbox access, production readiness, and handoff to operations.',
      'Numbered steps work well in this panel when the left nav represents a linear process.',
    ],
  },
  support: {
    contentTitle: 'Support resources',
    paragraphs: [
      'Point readers to office hours, service desk contacts, and internal collaboration spaces.',
      'The layout stays consistent while only the right panel title and body change per navigation item.',
    ],
  },
}

function Breadcrumbs() {
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
          <Link to="/resources/page-layouts" className="ddoc-breadcrumb-link">
            Page layouts
          </Link>
        </li>
        <li aria-hidden="true" className="ddoc-breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </li>
        <li>
          <span className="ddoc-breadcrumb-current">2-Column Template</span>
        </li>
      </ol>
    </nav>
  )
}

export default function TwoColumnTemplateDemoPage() {
  const [activeId, setActiveId] = useState<(typeof navSections)[number]['id']>('overview')

  const navItems = useMemo(
    () =>
      navSections.map((item) => ({
        ...item,
        active: item.id === activeId,
      })),
    [activeId],
  )

  const content = sectionCopy[activeId]

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <TwoColumnPageLayout
          breadcrumbs={<Breadcrumbs />}
          pageTitle="2-Column Template"
          pageSubtext="Interior layout with a left navigation panel and a right content area. The header introduces the page; the right panel title reflects the active section."
          navItems={navItems.map((item) => ({
            ...item,
            onClick: () => setActiveId(item.id),
          }))}
          contentTitle={content.contentTitle}
        >
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="ddoc-article__p">
              {paragraph}
            </p>
          ))}
          <ul className="ddoc-bullet-list">
            <li>Page header: title and supporting subtext (full width)</li>
            <li>Left panel: section navigation</li>
            <li>Right panel: section title plus body content</li>
          </ul>
        </TwoColumnPageLayout>
      </main>

      <SiteFooter />
    </>
  )
}
