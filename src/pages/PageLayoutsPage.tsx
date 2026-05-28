import { SkipNav } from '@cmsgov/ds-cms-gov'
import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const layoutTemplates = [
  {
    id: '2-column',
    title: '2-Column Template',
    badge: '2-col',
    href: '/resources/page-layouts/2-column',
    description: 'Two-column interior layout for content and sidebar patterns.',
  },
  {
    id: '3-column',
    title: '3 Column Layout',
    badge: '3-col',
    href: '/resources/page-layouts/3-column',
    description: 'Three-column grid for dense documentation and resource hubs.',
  },
  {
    id: 'landing',
    title: 'Landing page Layout',
    badge: 'Landing',
    href: '/resources/page-layouts/landing',
    description: 'Hero-led landing layout for program and campaign pages.',
  },
] as const

function CategoryCardChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PageLayoutsPage() {
  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <div className="kc-breadcrumb-bar kc-breadcrumb-bar--initiatives">
          <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
            <ol className="kc-breadcrumb-list">
              <li>
                <Link to="/" className="kc-breadcrumb-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="kc-breadcrumb-current">Page layouts</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="kc-content">
          <section
            className="kc-section kc-section--categories"
            aria-labelledby="page-layouts-heading"
          >
            <h1 id="page-layouts-heading" className="kc-section-heading">
              Page layouts
            </h1>
            <p className="kc-section-subtitle">
              Interior page templates for FUSION Sphere. Select a layout to preview the structure and
              use it as a starting point for new pages.
            </p>
            <div className="kc-category-inline-stack">
              <div className="kc-categories-grid kc-categories-grid--3">
                {layoutTemplates.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="kc-category-link"
                    title={item.description}
                  >
                    <span className="kc-category-link__main">
                      <span className="kc-category-link__text">{item.title}</span>
                      <span className="kc-category-link__count">{item.badge}</span>
                    </span>
                    <CategoryCardChevron />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
