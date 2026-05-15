import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { SiteHeader } from '../components/SiteHeader'

const JENKINSFILE_SAMPLE = `pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'mvn clean install'
      }
    }

    stage('Test') {
      steps {
        sh 'mvn test'
      }
    }

    stage('Deploy') {
      steps {
        sh 'mvn deploy'
      }
    }
  }
}`

const topNavSections = [
  'CMS Hybrid Cloud Architecture',
  'Cloud Governance',
  'Containers',
  'Computing',
]

const devOpsSubLinks: { label: string; to?: string; active?: boolean }[] = [
  { label: 'Introduction to AWS Service Catalog' },
  { label: 'DevOps Services for MAG' },
  { label: 'Maven Integration for DevOps', to: '/learn/knowledge-center/devops/maven-integration', active: true },
  { label: 'CI/CD' },
  { label: 'Distributed Load Testing (DLTA)' },
  { label: 'JFrog Platform' },
  { label: 'Selenium Box' },
  { label: 'Snyk' },
  { label: 'SonarQube' },
  { label: 'Testing as a Service (TaaS)' },
]

const bottomNavSections = [
  'Incident Management',
  'Monitoring',
  'Networking',
  'Security & Compliance',
  'Site reliability',
  'Storage',
  'User Access',
  'Platform',
]

const onThisPage = [
  { id: 'jenkinsfile', label: 'Jenkinsfile' },
  { id: 'key-features', label: 'Key features' },
  { id: 'detailed-cycle', label: 'Detailed Cycle' },
  { id: 'jfrog', label: 'JFrog' },
  { id: 'related-content', label: 'Related content' },
]

const quickLinks = [
  { label: 'Maven Documentation', href: '#' },
  { label: 'JFrog Artifactory', href: '#' },
  { label: 'Jenkins Pipeline', href: '#' },
  { label: 'DevOps Best Practices', href: '#' },
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
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="var(--fusion-blue)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="var(--fusion-blue)" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3H3v10h10V10M11 2h3v3M8 8l6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

export default function MavenIntegrationDevOpsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [devOpsNavOpen, setDevOpsNavOpen] = useState(true)

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <div className="ddoc-breadcrumb-bar">
          <nav aria-label="Breadcrumb" className="ddoc-breadcrumb-inner">
            <ol className="ddoc-breadcrumb-list">
              <li>
                <Link to="/" className="ddoc-breadcrumb-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="ddoc-breadcrumb-sep">
                <ChevronRight />
              </li>
              <li>
                <Link to="/learn/knowledge-center" className="ddoc-breadcrumb-link">
                  Knowledge Center
                </Link>
              </li>
              <li aria-hidden="true" className="ddoc-breadcrumb-sep">
                <ChevronRight />
              </li>
              <li>
                <Link to="/learn/knowledge-center/devops" className="ddoc-breadcrumb-link">
                  DevOps
                </Link>
              </li>
              <li aria-hidden="true" className="ddoc-breadcrumb-sep">
                <ChevronRight />
              </li>
              <li>
                <span className="ddoc-breadcrumb-current">Maven Integration for DevOps</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="ddoc-shell">
          <button
            type="button"
            className="ddoc-mobile-nav-toggle"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            Documentation menu
            <ChevronRight className={mobileNavOpen ? 'ddoc-mobile-nav-toggle__chev--open' : undefined} />
          </button>

          <div className={`ddoc-layout ${mobileNavOpen ? 'ddoc-layout--nav-open' : ''}`}>
            <aside className="ddoc-sidebar" aria-label="Documentation sections">
              <div className="ddoc-sidebar__card">
                <nav className="ddoc-side-nav">
                  {topNavSections.map((label) => (
                    <button key={label} type="button" className="ddoc-side-nav__row">
                      <span className="ddoc-side-nav__label">{label}</span>
                      <ChevronRight className="ddoc-side-nav__chev" />
                    </button>
                  ))}

                  <div className="ddoc-side-nav__group">
                    <button
                      type="button"
                      className="ddoc-side-nav__group-header"
                      aria-expanded={devOpsNavOpen}
                      aria-controls="ddoc-devops-submenu"
                      id="ddoc-devops-nav-toggle"
                      onClick={() => setDevOpsNavOpen((o) => !o)}
                    >
                      <span className="ddoc-side-nav__group-title">DevOps</span>
                      <ChevronRight
                        className={`ddoc-side-nav__chev${devOpsNavOpen ? ' ddoc-side-nav__chev--open' : ''}`}
                      />
                    </button>
                    <ul
                      id="ddoc-devops-submenu"
                      className="ddoc-side-nav__sub"
                      hidden={!devOpsNavOpen}
                      aria-labelledby="ddoc-devops-nav-toggle"
                    >
                      {devOpsSubLinks.map((item) => (
                        <li key={item.label}>
                          {item.to ? (
                            <Link
                              to={item.to}
                              className={
                                item.active ? 'ddoc-side-nav__sublink ddoc-side-nav__sublink--active' : 'ddoc-side-nav__sublink'
                              }
                              aria-current={item.active ? 'page' : undefined}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <a href="#" className="ddoc-side-nav__sublink">
                              {item.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {bottomNavSections.map((label) => (
                    <button key={label} type="button" className="ddoc-side-nav__row">
                      <span className="ddoc-side-nav__label">{label}</span>
                      <ChevronRight className="ddoc-side-nav__chev" />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="ddoc-article">
              <h1 className="ddoc-article__title">Maven Integration for DevOps</h1>
              <p className="ddoc-article__intro">
                The Maven plugin designed to streamline the integration of Maven builds with CMS Hybrid Cloud. Maven is a
                powerful build automation tool used primarily for Java projects. It provides developers with a clean and
                efficient way to manage project builds, dependencies, and documentation.
              </p>

              <h2 id="jenkinsfile" className="ddoc-article__h2">
                Jenkinsfile
              </h2>
              <p className="ddoc-article__p">Here is a sample Jenkinsfile for this integration</p>
              <pre className="ddoc-code-block" tabIndex={0}>
                <code>{JENKINSFILE_SAMPLE}</code>
              </pre>
              <p className="ddoc-article__p">
                This Jenkinsfile describes a simple CI/CD pipeline that runs a build, tests, and deployment using Maven.
                The pipeline is triggered on push to your repository and can be run automatically. In a production
                environment, it is important to configure your pipeline to align with your team&apos;s workflow and
                testing requirements. The sample shown above is a basic starting point to help you incorporate Maven
                builds and deploy to desired destinations. Additionally, you may want to add deployment steps for
                various targets and distribution points under the test and production workflows.
              </p>

              <h2 id="key-features" className="ddoc-article__h2">
                Key features
              </h2>
              <ul className="ddoc-bullet-list">
                <li>
                  <strong>Automated Integration:</strong> This plugin runs automated tasks with each build, alerting
                  developers if a problem is found.
                </li>
                <li>
                  <strong>Enhanced Logging:</strong> Detailed logging can be enabled so you can be made aware of the
                  critical information for troubleshooting builds.
                </li>
                <li>
                  <strong>Build Tool Selection:</strong> Choose from a variety of tools in Maven or the command-line
                  interface including building tools.
                </li>
                <li>
                  <strong>JFrog Integration:</strong> Support for JFrog Artifactory to store and manage your build
                  artifacts.
                </li>
              </ul>

              <h2 id="detailed-cycle" className="ddoc-article__h2">
                Detailed Cycle
              </h2>
              <p className="ddoc-article__p">When you use the integration between your pipeline as outlined in</p>
              <ol className="ddoc-steps">
                <li>
                  <span className="ddoc-steps__badge" aria-hidden>
                    1
                  </span>
                  <span>
                    Code the <a href="#">Maven/Wrapper/Install.md</a> in the root of your project.
                  </span>
                </li>
                <li>
                  <span className="ddoc-steps__badge" aria-hidden>
                    2
                  </span>
                  <span>Log into the console to verify that your code all runs correct and is not</span>
                </li>
                <li>
                  <span className="ddoc-steps__badge" aria-hidden>
                    3
                  </span>
                  <span>You build and run one or more tests to check that code is functioning correctly</span>
                </li>
                <li>
                  <span className="ddoc-steps__badge" aria-hidden>
                    4
                  </span>
                  <span>
                    Check the directory or package tree should be root or build targets or if there is, then rebuild
                    new, &quot;cleanse deploy&quot;.
                  </span>
                </li>
                <li>
                  <span className="ddoc-steps__badge" aria-hidden>
                    5
                  </span>
                  <span>
                    Continue with running various code tests and build checks of the <a href="#">Maven/Wrapper/Target</a>{' '}
                    and you will be getting some output on what to test. You also have full access to logging, which
                    should help you understand the critical information and help troubleshoot build.
                  </span>
                </li>
              </ol>

              <h2 id="jfrog" className="ddoc-article__h2">
                JFrog
              </h2>
              <p className="ddoc-article__p">
                In addition to managing your pipeline via Maven, you have to use JFrog to manage your builds. This is
                documented on <a href="#">JFrog</a>.
              </p>
              <ul className="ddoc-bullet-list ddoc-bullet-list--compact">
                <li>
                  JFrog will link this <a href="#">JFROG_CLI</a> for you.
                </li>
                <li>Copy the link and the REST ID for the JFrog setup, etc. &quot;Set new ID&quot;</li>
                <li>
                  For information about where Build files are going, Run <a href="#">Maven/Commands/Pipeline</a>.
                </li>
              </ul>

              <h2 id="related-content" className="ddoc-article__h2">
                Related content
              </h2>
              <ul className="ddoc-related-inline">
                <li>
                  <a href="#" className="ddoc-related-inline__link">
                    <DocIcon />
                    Using Jenkins for CI/CD Pipelines
                  </a>
                </li>
                <li>
                  <a href="#" className="ddoc-related-inline__link">
                    <DocIcon />
                    Adding Jenkins as Java Platform
                  </a>
                </li>
              </ul>

              <div className="ddoc-feedback">
                <p className="ddoc-feedback__text">
                  <strong>Was this documentation helpful?</strong> Let us know and contribute (comments, suggestions,
                  or corrections) to help us improve our documentation.
                </p>
                <div className="ddoc-feedback__actions">
                  <FusionButton type="button" accent size="small">
                    Yes
                  </FusionButton>
                  <FusionButton type="button" variation="ghost" size="small">
                    No
                  </FusionButton>
                  <a href="#" className="ddoc-feedback__link">
                    Submit Feedback
                    <ChevronRight />
                  </a>
                </div>
              </div>
            </article>

            <aside className="ddoc-rail" aria-label="Page tools">
              <div className="ddoc-rail__card">
                <h3 className="ddoc-rail__title">On this page</h3>
                <nav aria-label="On this page">
                  <ul className="ddoc-toc">
                    {onThisPage.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="ddoc-toc__link">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="ddoc-rail__card">
                <h3 className="ddoc-rail__title">Quick links</h3>
                <ul className="ddoc-quick">
                  {quickLinks.map((q) => (
                    <li key={q.label}>
                      <a href={q.href} className="ddoc-quick__link">
                        <ExternalLinkIcon className="ddoc-quick__icon" />
                        {q.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ddoc-rail__cta">
                <h3 className="ddoc-rail__cta-title">Need assistance?</h3>
                <p className="ddoc-rail__cta-text">Our support team is here to help you with any questions.</p>
                <FusionButton href="#" accent onDark className="ddoc-rail__cta-btn">
                  Contact Support
                </FusionButton>
              </div>
            </aside>
          </div>
        </div>

        <section className="ddoc-footer-cta" aria-label="Get started">
          <div className="ddoc-footer-cta__inner">
            <div className="ddoc-footer-cta__col">
              <h3 className="ddoc-footer-cta__heading">Ready to get started?</h3>
              <p className="ddoc-footer-cta__p">
                Get started with our comprehensive guides and tutorials to begin building on CMS Hybrid Cloud.
              </p>
              <FusionButton href="#" accent onDark>
                Request Access
              </FusionButton>
            </div>
            <div className="ddoc-footer-cta__col">
              <h3 className="ddoc-footer-cta__heading">Want assistance?</h3>
              <p className="ddoc-footer-cta__p">
                Our team is ready to support you through your cloud journey with expert guidance and resources.
              </p>
              <a href="#" className="ddoc-footer-cta__textlink">
                Contact Support
                <ChevronRight />
              </a>
            </div>
            <div className="ddoc-footer-cta__col">
              <h3 className="ddoc-footer-cta__heading">Have more questions?</h3>
              <p className="ddoc-footer-cta__p">
                Browse our knowledge base and community forums for answers to common questions.
              </p>
              <a href="#" className="ddoc-footer-cta__textlink">
                Visit Help Center
                <ChevronRight />
              </a>
            </div>
          </div>
        </section>

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
