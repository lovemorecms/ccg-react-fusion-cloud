import { SkipNav } from '@cmsgov/ds-cms-gov'
import { Link } from 'react-router-dom'
import { KnowledgeBasePageLayout } from '../components/layouts/KnowledgeBasePageLayout'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const topNavSections = [
  'CMS Hybrid Cloud Architecture',
  'Cloud Governance',
  'Containers',
  'Computing',
]

const devOpsSubLinks = [
  { label: 'Introduction to AWS Service Catalog' },
  { label: 'DevOps Services for MAG' },
  { label: 'Maven Integration for DevOps', to: '/learn/knowledge-center/devops/maven-integration', active: true },
  { label: 'CI/CD' },
  { label: 'Distributed Load Testing (DLTA)' },
  { label: 'JFrog Platform' },
]

const bottomNavSections = [
  'Incident Management',
  'Monitoring',
  'Networking',
  'Security & Compliance',
  'Site reliability',
  'Storage',
]

const onThisPage = [
  { id: 'layout-overview', label: 'Layout overview' },
  { id: 'left-navigation', label: 'Left navigation' },
  { id: 'center-content', label: 'Center content' },
  { id: 'guidance', label: 'Guidance' },
  { id: 'when-to-use', label: 'When to use this template', level: 'secondary' as const },
  { id: 'usability', label: 'Usability guidance', level: 'secondary' as const },
  { id: 'right-rail', label: 'Right rail' },
]

const quickLinks = [
  { label: 'Knowledge Center', href: '/learn/knowledge-center' },
  { label: 'Maven integration example', href: '/learn/knowledge-center/devops/maven-integration' },
  { label: '2-Column template', href: '/resources/page-layouts/2-column' },
  { label: 'Page layouts library', href: '/resources/page-layouts' },
]

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
          <span className="ddoc-breadcrumb-current">3 Column Layout</span>
        </li>
      </ol>
    </nav>
  )
}

export default function ThreeColumnTemplateDemoPage() {
  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <KnowledgeBasePageLayout
          breadcrumbs={<Breadcrumbs />}
          pageTitle="3 Column Layout"
          pageSubtext="Knowledge-base documentation layout: searchable left navigation, center article, and a right rail with on-page links and quick resources."
          articleTitle="3-Column knowledge base template"
          articleIntro="This template mirrors the Knowledge Center article layout used on pages such as Maven Integration for DevOps. Use the page header for the topic; the center column holds the article; side panels support wayfinding."
          topNavSections={topNavSections}
          navGroups={[
            {
              id: 'devops',
              title: 'DevOps',
              defaultOpen: true,
              links: devOpsSubLinks,
            },
          ]}
          bottomNavSections={bottomNavSections}
          onThisPage={onThisPage}
          quickLinks={quickLinks}
        >
          <h2 id="layout-overview" className="ddoc-article__h2">
            Layout overview
          </h2>
          <p className="ddoc-article__p">
            Three columns divide responsibilities: navigation on the left, long-form content in the center, and
            contextual tools on the right. On smaller viewports the left nav collapses behind a toggle, matching the live
            Knowledge Center experience.
          </p>

          <h2 id="left-navigation" className="ddoc-article__h2">
            Left navigation
          </h2>
          <p className="ddoc-article__p">
            The sidebar includes search filtering, a collapse control, top-level section rows, expandable topic groups,
            and additional sections below the group. Try searching for &quot;Maven&quot; or &quot;Security&quot; to see
            the filter in action.
          </p>
          <ul className="ddoc-bullet-list">
            <li>Filter input for large documentation trees</li>
            <li>Collapsible section groups with sub-links</li>
            <li>Sticky positioning aligned with the site header offset</li>
          </ul>

          <h2 id="center-content" className="ddoc-article__h2">
            Center content
          </h2>
          <p className="ddoc-article__p">
            The article panel uses the same typography and spacing as Knowledge Center articles. Section headings include
            anchor IDs so the right-rail table of contents can jump to each block.
          </p>

          <h2 id="guidance" className="ddoc-article__h2">
            Guidance
          </h2>
          <p className="ddoc-article__p">
            Use primary entries in the on-page menu for major sections and secondary entries for supporting topics under a
            section, matching the reference pattern with bold and regular link weights.
          </p>

          <h3 id="when-to-use" className="ddoc-article__h3">
            When to use this template
          </h3>
          <p className="ddoc-article__p">
            Choose this layout for long documentation articles that need left navigation, in-page section jumps, and quick
            links in the right rail.
          </p>

          <h3 id="usability" className="ddoc-article__h3">
            Usability guidance
          </h3>
          <p className="ddoc-article__p">
            Scroll the article to see the active indicator move along the vertical track. Click any on-page link to jump to
            that section immediately.
          </p>

          <h2 id="right-rail" className="ddoc-article__h2">
            Right rail
          </h2>
          <p className="ddoc-article__p">
            The right column provides an on-this-page list, quick links to related resources, and an optional support
            call-to-action. A full-width footer CTA band below the grid matches the knowledge-base article footer pattern.
          </p>
        </KnowledgeBasePageLayout>
      </main>

      <SiteFooter />
    </>
  )
}
