import { SkipNav } from '@cmsgov/ds-cms-gov'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { SiteHeader } from '../components/SiteHeader'

const devOpsTopics: { title: string; to?: string }[] = [
  { title: 'Introduction to AWS Service Catalog' },
  { title: 'DevOps Services for MAG' },
  { title: 'Maven Integration for DevOps', to: '/learn/knowledge-center/devops/maven-integration' },
  { title: 'CI/CD' },
  { title: 'Distributed Load Testing (DLTA)' },
  { title: 'JFrog Platform' },
  { title: 'Selenium Box' },
  { title: 'Snyk' },
  { title: 'SonarQube' },
  { title: 'Testing as a Service (TaaS)' },
]

const cmsWebsites = ['CMS.gov', 'MyMedicare.gov', 'Medicare.gov', 'Medicaid.gov', 'CMS.gov', 'HHS.gov']

const additionalResources = [
  'CMS Design System',
  'Inspector General',
  'The Act Act',
  'Plain Writing',
  'USA.gov',
]

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function DevOpsTopicPage() {
  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <div className="ktd-breadcrumb-bar">
          <nav aria-label="Breadcrumb" className="ktd-breadcrumb-inner">
            <ol className="ktd-breadcrumb-list">
              <li>
                <Link to="/" className="ktd-breadcrumb-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="ktd-breadcrumb-sep">
                <ChevronRight />
              </li>
              <li>
                <Link to="/learn/knowledge-center" className="ktd-breadcrumb-link">
                  Knowledge Center
                </Link>
              </li>
              <li aria-hidden="true" className="ktd-breadcrumb-sep">
                <ChevronRight />
              </li>
              <li>
                <span className="ktd-breadcrumb-current">DevOps</span>
              </li>
            </ol>
          </nav>
        </div>

        <section className="ktd-hero ktd-hero--compact">
          <div className="ktd-hero__inner ktd-hero__inner--compact">
            <h1 className="ktd-hero__title">DevOps</h1>
            <p className="ktd-hero__lead">
              DevOps brings together development and operations to improve collaboration through automation and
              continuous delivery. Select a topic below to get started.
            </p>
          </div>
        </section>

        <div className="ktd-body ktd-body--compact">
          <div className="ktd-body__inner">
            <div className="ktd-topics-panel">
              <h2 className="ktd-topics-panel__title">DevOps Topics</h2>
              <ul className="ktd-topics-list">
                {devOpsTopics.map((topic) => (
                  <li key={topic.title}>
                    {topic.to ? (
                      <Link to={topic.to} className="ktd-topic-row">
                        <span className="ktd-topic-row__label">{topic.title}</span>
                        <ChevronRight className="ktd-topic-row__chev" />
                      </Link>
                    ) : (
                      <a href="#" className="ktd-topic-row">
                        <span className="ktd-topic-row__label">{topic.title}</span>
                        <ChevronRight className="ktd-topic-row__chev" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ktd-help-bar">
              <div className="ktd-help-bar__text">
                <h3 className="ktd-help-bar__title">Need help getting started?</h3>
                <p className="ktd-help-bar__desc">
                  Our team is ready to help you with DevOps services on CMS Hybrid Cloud.
                </p>
              </div>
              <FusionButton href="#" accent onDark>
                Contact Support
              </FusionButton>
            </div>
          </div>
        </div>

        <section className="kc-footer-links">
          <div className="kc-footer-links__inner">
            <div className="kc-footer-links__col">
              <h3 className="kc-footer-links__heading">CMS &amp; HHS Websites</h3>
              <ul className="kc-footer-links__list">
                {cmsWebsites.map((site, i) => (
                  <li key={`${site}-${i}`}>
                    <a href="#" className="kc-footer-links__link">
                      {site}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="kc-footer-links__col">
              <h3 className="kc-footer-links__heading">Additional resources</h3>
              <ul className="kc-footer-links__list">
                {additionalResources.map((resource) => (
                  <li key={resource}>
                    <a href="#" className="kc-footer-links__link">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
