import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  fusionInfoCenterArticlePath,
  fusionInfoCenterCategoryPath,
  fusionInfoCenterNavGroups,
} from '../data/knowledgeCenterDocCategories'
import { DocOnThisPageNav } from '../components/layouts/DocOnThisPageNav'
import { FusionButton } from '../components/FusionButton'
import { SiteFooter } from '../components/SiteFooter'
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

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
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

function useDocNavFilter(query: string) {
  const navGroups = useMemo(
    () => fusionInfoCenterNavGroups('devops', fusionInfoCenterArticlePath),
    [],
  )

  return useMemo(() => {
    const q = query.trim().toLowerCase()
    const match = (s: string) => !q || s.toLowerCase().includes(q)
    const groups = navGroups
      .map((group) => ({
        ...group,
        links: group.links.filter((item) => match(item.label)),
      }))
      .filter((group) => !q || match(group.title) || group.links.length > 0)
    return { q, groups, navIsEmpty: groups.length === 0 }
  }, [navGroups, query])
}

export default function MavenIntegrationDevOpsPage() {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ devops: true })
  const [navSearch, setNavSearch] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [copied, setCopied] = useState(false)

  const filteredNav = useDocNavFilter(navSearch)

  useEffect(() => {
    if (navSearch.trim()) {
      setOpenGroups((prev) => {
        const next = { ...prev }
        filteredNav.groups.forEach((group) => {
          next[group.id] = true
        })
        return next
      })
    }
  }, [filteredNav.groups, navSearch])

  useEffect(() => {
    setOpenGroups((prev) => ({ ...prev, devops: true }))
    const hashId = location.hash.replace('#', '')
    const targetId = hashId || 'devops'
    const target = document.getElementById(targetId)
    if (!target) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
    })
  }, [location.hash])

  useEffect(() => {
    document.title = 'Maven Integration for DevOps | Fusion Info Center | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)')
    function onChange() {
      if (mq.matches) setSidebarCollapsed(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" className="explore-2 fic-doc" tabIndex={-1}>
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
                  Fusion Info Center
                </Link>
              </li>
              <li aria-hidden="true" className="ddoc-breadcrumb-sep">
                <ChevronRight />
              </li>
              <li>
                <Link to={fusionInfoCenterCategoryPath('devops')} className="ddoc-breadcrumb-link">
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

          <div
            className={[
              'ddoc-layout',
              mobileNavOpen && 'ddoc-layout--nav-open',
              sidebarCollapsed && 'ddoc-layout--sidebar-collapsed',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <aside className={`ddoc-sidebar${sidebarCollapsed ? ' ddoc-sidebar--collapsed' : ''}`} aria-label="Documentation sections">
              {sidebarCollapsed ? (
                <button
                  type="button"
                  className="ddoc-sidebar__rail-toggle"
                  onClick={() => setSidebarCollapsed(false)}
                  aria-expanded={false}
                  aria-label="Expand documentation navigation"
                  title="Expand documentation navigation"
                >
                  <ChevronRight />
                  <span className="ddoc-sidebar__rail-toggle-text">Nav</span>
                </button>
              ) : (
                <div className="ddoc-sidebar__sticky-stack">
                  <div className="ddoc-sidebar__toolbar">
                    <button
                      type="button"
                      className="ddoc-sidebar__collapse-trigger"
                      onClick={() => setSidebarCollapsed(true)}
                      aria-expanded={!sidebarCollapsed}
                      aria-controls="ddoc-sidebar-panel"
                      aria-label="Collapse documentation navigation"
                      title="Collapse documentation navigation"
                    >
                      <ChevronLeft />
                      <span>Collapse</span>
                    </button>
                  </div>
                  <form className="ddoc-sidebar__search" role="search" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="ddoc-nav-search" className="ddoc-sidebar__search-label">
                      Filter documentation navigation
                    </label>
                    <div className="ddoc-sidebar__search-field">
                      <svg
                        className="ddoc-sidebar__search-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M19 19l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          stroke="#9ca3af"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        id="ddoc-nav-search"
                        type="search"
                        value={navSearch}
                        onChange={(e) => setNavSearch(e.target.value)}
                        placeholder="Search navigation…"
                        className="ddoc-sidebar__search-input"
                        autoComplete="off"
                      />
                    </div>
                  </form>
                  <div id="ddoc-sidebar-panel" className="ddoc-sidebar__card">
                    <nav className="ddoc-side-nav">
                      {filteredNav.navIsEmpty ? (
                        <p className="ddoc-sidebar__empty">No matching sections.</p>
                      ) : (
                        filteredNav.groups.map((group) => {
                          const isOpen = openGroups[group.id] ?? group.defaultOpen
                          const isCurrent = group.id === 'devops'
                          const headerClass = `ddoc-side-nav__group-header${isCurrent ? ' ddoc-side-nav__row--active' : ''}`
                          const chevron = (
                            <ChevronRight
                              className={`ddoc-side-nav__chev${isOpen ? ' ddoc-side-nav__chev--open' : ''}`}
                            />
                          )
                          return (
                            <div key={group.id} id={group.id} className="ddoc-side-nav__group">
                              {isCurrent ? (
                                <button
                                  type="button"
                                  className={headerClass}
                                  aria-expanded={isOpen}
                                  aria-controls={`ddoc-nav-group-${group.id}`}
                                  id={`ddoc-nav-toggle-${group.id}`}
                                  onClick={() =>
                                    setOpenGroups((prev) => ({ ...prev, [group.id]: !isOpen }))
                                  }
                                >
                                  <span className="ddoc-side-nav__group-title">{group.title}</span>
                                  {chevron}
                                </button>
                              ) : (
                                <Link
                                  to={group.to}
                                  className={headerClass}
                                  aria-expanded={isOpen}
                                  aria-controls={`ddoc-nav-group-${group.id}`}
                                  id={`ddoc-nav-toggle-${group.id}`}
                                >
                                  <span className="ddoc-side-nav__group-title">{group.title}</span>
                                  {chevron}
                                </Link>
                              )}
                              <ul
                                id={`ddoc-nav-group-${group.id}`}
                                className="ddoc-side-nav__sub"
                                hidden={!isOpen}
                                aria-labelledby={`ddoc-nav-toggle-${group.id}`}
                              >
                                {group.links.length === 0 ? (
                                  <li className="ddoc-sidebar__sub-empty">
                                    {filteredNav.q ? 'No matching topics.' : 'Links coming soon'}
                                  </li>
                                ) : (
                                  group.links.map((item) => (
                                    <li key={item.label}>
                                      {item.to ? (
                                        <Link
                                          to={item.to}
                                          className={
                                            item.active
                                              ? 'ddoc-side-nav__sublink ddoc-side-nav__sublink--active'
                                              : 'ddoc-side-nav__sublink'
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
                                  ))
                                )}
                              </ul>
                            </div>
                          )
                        })
                      )}
                    </nav>
                  </div>
                </div>
              )}
            </aside>

            <article className="ddoc-article">
              <h1 className="ddoc-article__title">Maven Integration for DevOps</h1>
              <p className="ddoc-article__intro">
                This Maven integration streamlines how teams run Maven builds in CMS Hybrid Cloud. Maven is a powerful
                build automation tool used primarily for Java projects, and this guidance helps teams manage build
                lifecycles, dependencies, and release workflows in a consistent, cloud-ready way.
              </p>

              <h2 id="jenkinsfile" className="ddoc-article__h2">
                Jenkinsfile
              </h2>
              <p className="ddoc-article__p">Here is a sample Jenkinsfile for this integration</p>
              <div className="ddoc-code-wrap">
                <button
                  type="button"
                  className="ddoc-code-copy"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(JENKINSFILE_SAMPLE)
                      setCopied(true)
                      window.setTimeout(() => setCopied(false), 2000)
                    } catch {
                      setCopied(false)
                    }
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <pre className="ddoc-code-block" tabIndex={0}>
                  <code>{JENKINSFILE_SAMPLE}</code>
                </pre>
              </div>
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
                <DocOnThisPageNav items={onThisPage} />
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
                Browse our documentation and community forums for answers to common questions.
              </p>
              <a href="#" className="ddoc-footer-cta__textlink">
                Visit Help Center
                <ChevronRight />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
