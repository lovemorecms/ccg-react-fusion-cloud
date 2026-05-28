import { SkipNav } from '@cmsgov/ds-cms-gov'
import { Link, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const titles: Record<string, string> = {
  '2-column': '2-Column Template',
  '3-column': '3 Column Layout',
  landing: 'Landing page Layout',
}

export default function PageLayoutTemplatePage() {
  const { slug } = useParams<{ slug: string }>()
  const title = (slug && titles[slug]) || 'Page layout'

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
                <Link to="/resources/page-layouts" className="kc-breadcrumb-link">
                  Page layouts
                </Link>
              </li>
              <li aria-hidden="true" className="kc-breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="kc-breadcrumb-current">{title}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="kc-content">
          <section className="kc-section">
            <h1 className="kc-section-heading">{title}</h1>
            <p className="kc-section-subtitle">
              Template preview coming soon. Return to the layout library to choose another structure.
            </p>
            <p>
              <Link to="/resources/page-layouts" className="kc-breadcrumb-link">
                Back to page layouts
              </Link>
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
