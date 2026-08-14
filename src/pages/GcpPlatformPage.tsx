import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import {
  gcpBestPractices,
  gcpCmsDocs,
  gcpConnectivity,
  gcpFeatures,
  gcpFirewallTags,
  gcpGlance,
  gcpGoldImages,
  gcpGoogleDocs,
  gcpHero,
  gcpHostingModel,
  gcpIamItems,
  gcpNonTransferable,
  gcpOpsCards,
  gcpPageTabs,
  gcpQuickRequests,
  gcpReusable,
  gcpSecurityCards,
  gcpStandardVpc,
  gcpSupportCards,
  gcpVpcConfig,
} from '../data/gcpPlatformPage'

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M10 6.5V10H2V2h3.5V1H2C1.448 1 1 1.448 1 2v8c0 .552.448 1 1 1h8c.552 0 1-.448 1-1V6.5h-1zM7 1v1h2.293L4.146 7.146l.708.708L10 2.707V5h1V1H7z" />
    </svg>
  )
}

function CheckMark() {
  return <span className="gcp-check" aria-hidden />
}

export default function GcpPlatformPage() {
  const [activeTab, setActiveTab] = useState<(typeof gcpPageTabs)[number]['id']>('overview')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    document.title = 'Google Cloud Platform | Explore | CCG Modernization'
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id as (typeof gcpPageTabs)[number]['id'])
          }
        }
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: (typeof gcpPageTabs)[number]['id']) => {
    setActiveTab(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="explore-2 gcp-page">
        <div className="gcp-page__shell">
        <nav aria-label="Breadcrumb" className="gcp-breadcrumb">
          <ol className="kc-breadcrumb-list">
            <li>
              <Link to="/" className="kc-breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="kc-breadcrumb-sep">
              /
            </li>
            <li>
              <Link to="/explore" className="kc-breadcrumb-link">
                Explore
              </Link>
            </li>
            <li aria-hidden="true" className="kc-breadcrumb-sep">
              /
            </li>
            <li>
              <span className="kc-breadcrumb-current">Google Cloud Platform</span>
            </li>
          </ol>
        </nav>

        <section className="explore-hero gcp-hero rounded-2xl" aria-labelledby="gcp-hero-heading">
          <div className="explore-hero__content gcp-hero__copy">
            <h1 id="gcp-hero-heading" className="fusion-hero__headline explore-hero__headline">
              <span className="block font-semibold leading-[1.12] tracking-wide">{gcpHero.title}</span>
            </h1>
            <p className="gcp-hero__lede">{gcpHero.lede}</p>
            <p className="explore-hero__body gcp-hero__body">{gcpHero.body}</p>
            <p className="gcp-hero__finds-label">What you&rsquo;ll find</p>
            <ul className="gcp-hero__finds">
              {gcpHero.finds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="gcp-hero__panel" aria-label="Platform highlights">
            <div className="gcp-status">
              <p className="gcp-status__kicker">{gcpHero.status.label}</p>
              <p className="gcp-status__title">
                <span className="gcp-status__dot" aria-hidden />
                {gcpHero.status.title}
              </p>
              <p className="gcp-status__detail">{gcpHero.status.detail}</p>
            </div>
            <div className="gcp-hero__stats">
              {gcpHero.stats.map((stat) => (
                <div key={stat.label} className={`gcp-stat gcp-stat--${stat.tone}`}>
                  <p className="gcp-stat__value">{stat.value}</p>
                  <p className="gcp-stat__label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </div>

        <div className="gcp-tabs-bar">
          <div className="gcp-page__shell gcp-tabs-bar__inner">
            <nav className="explore-tabs gcp-tabs" aria-label="Google Cloud Platform sections">
              {gcpPageTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`explore-tabs__tab${activeTab === tab.id ? ' explore-tabs__tab--active' : ''}`}
                  aria-current={activeTab === tab.id ? 'true' : undefined}
                  onClick={() => scrollTo(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <FusionButton href="/#pathways" accent onDark className="gcp-tabs-cta">
              Get started with Google Cloud &gt;
            </FusionButton>
          </div>
        </div>

        <div className="gcp-page__shell">

        <section
          id="overview"
          className="gcp-section"
          ref={(el) => {
            sectionRefs.current.overview = el
          }}
          aria-labelledby="gcp-overview-heading"
        >
          <div className="gcp-split">
            <div>
              <h2 id="gcp-overview-heading" className="explore-section-heading">
                Overview
              </h2>
              <h3 className="gcp-subhead">Introduction to CMS Hybrid Cloud Virtual Private Cloud</h3>
              <p className="gcp-copy">
                CMS Hybrid Cloud is built on Google Cloud Platform. One of the key features of Google Cloud is the ability to provide Virtual Private Clouds. This page highlights some of the main features of the current CMS Hybrid Cloud Virtual Private Cloud Architecture.
              </p>
              <p className="gcp-copy">
                For more detailed information regarding Google Cloud and VPCs, please refer to Google Cloud&rsquo;s Virtual Private Cloud documentation.
              </p>
              <p className="gcp-meta">Official documentation</p>
              <a
                className="gcp-ext"
                href="https://cloud.google.com/vpc/docs/overview"
                target="_blank"
                rel="noreferrer"
              >
                cloud.google.com/vpc/docs/overview <ExternalIcon />
              </a>
            </div>
            <aside className="gcp-aside">
              <div className="gcp-card">
                <h3 className="gcp-aside__title">At a glance</h3>
                <ul className="gcp-check-list">
                  {gcpGlance.map((item) => (
                    <li key={item}>
                      <CheckMark />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="gcp-card">
                <h3 className="gcp-aside__title">Quick requests</h3>
                <ul className="gcp-link-list">
                  {gcpQuickRequests.map((item) => (
                    <li key={item}>
                      <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="gcp-callout">
            <p>
              Unlike AWS Virtual Private Clouds, Google Cloud Virtual Private Clouds are{' '}
              <strong>global resources</strong> — subnets are regional, but the Virtual Private Cloud itself spans all Google Cloud regions, enabling consistent private connectivity across your entire environment without additional peering.
            </p>
          </div>

          <h3 className="gcp-subhead">CMS Hybrid Cloud: Standard Virtual Private Cloud Configuration</h3>
          <p className="gcp-copy">
            By default, all CMS Hybrid Cloud Google Cloud Virtual Private Clouds are provisioned using a standard Virtual Private Cloud configuration. This configuration currently includes the following:
          </p>
          <div className="gcp-card gcp-card--inset">
            <h4 className="gcp-card__title">Standard Virtual Private Cloud</h4>
            <ul className="gcp-check-list">
              {gcpStandardVpc.map((item) => (
                <li key={item}>
                  <CheckMark />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="gcp-note">
            Additional subnet requirements, public subnets, or custom IP sizing can be requested through the CMS Hybrid Cloud support process.
          </p>

          <h3 className="gcp-subhead">Virtual Private Cloud Support Requests</h3>
          <p className="gcp-copy">CMS Hybrid Cloud offers users a variety of support services around VPCs. Users can submit requests for:</p>
          <div className="gcp-card-grid">
            {gcpSupportCards.map((card) => (
              <div key={card.title} className="gcp-card">
                <h4 className="gcp-card__title">{card.title}</h4>
                <p className="gcp-copy gcp-copy--tight">{card.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="gcp-subhead">Additional Virtual Private Cloud Features</h3>
          <p className="gcp-copy">
            Users who onboard onto CMS Hybrid Cloud now have access to the following features and capabilities enabled by the CMS Hybrid Cloud Virtual Private Cloud Architecture.
          </p>
          {gcpFeatures.map((feat) => (
            <div key={feat.title} className="gcp-feature">
              <h4 className="gcp-feature__title">{feat.title}</h4>
              <p className="gcp-copy">{feat.body}</p>
              {feat.doc ? (
                <a className="gcp-ext" href={feat.doc} target="_blank" rel="noreferrer">
                  Official documentation <ExternalIcon />
                </a>
              ) : null}
            </div>
          ))}

          <h3 className="gcp-subhead">Additional Virtual Private Cloud Standardization</h3>
          <p className="gcp-copy">This allows for the following advantages:</p>
          <ul className="gcp-check-list gcp-check-list--block">
            <li>
              <CheckMark />
              <span>
                <strong>Cost management</strong> — Allows CMS to track and manage costs responsibly for each environment.
              </span>
            </li>
            <li>
              <CheckMark />
              <span>
                <strong>Security and access control</strong> — Allows CMS to properly conduct access control for each environment.
              </span>
            </li>
          </ul>
          <p className="gcp-copy">Projects and Virtual Private Cloud resources follow standardized naming conventions. These suffixes represent the environment:</p>
          <div className="gcp-chips">
            {['sandbox', 'dev', 'test', 'impl', 'prod'].map((env) => (
              <span key={env} className="gcp-chip">
                {env}
              </span>
            ))}
          </div>
          <p className="gcp-example">
            Example: <code>project-dev</code> indicates a development environment.
          </p>

          <h3 className="gcp-subhead">Virtual Private Cloud Best Practices for CMS Hybrid Cloud Users</h3>
          {gcpBestPractices.map((bp) => (
            <div key={bp.title} className="gcp-card gcp-card--inset">
              <h4 className="gcp-card__title">{bp.title}</h4>
              <ul className="gcp-dot-list">
                {bp.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {bp.doc ? (
                <a className="gcp-ext" href={bp.doc} target="_blank" rel="noreferrer">
                  Official documentation <ExternalIcon />
                </a>
              ) : null}
            </div>
          ))}
        </section>

        <section
          id="architecture"
          className="gcp-section gcp-section--alt"
          ref={(el) => {
            sectionRefs.current.architecture = el
          }}
          aria-labelledby="gcp-architecture-heading"
        >
          <h2 id="gcp-architecture-heading" className="explore-section-heading">
            Architecture
          </h2>
          <p className="gcp-copy gcp-copy--lede">
            The CMS Hybrid Cloud Google Cloud architecture provides standardized networking, centralized governance, managed security services, and identity management controls across all CMS Google Cloud environments.
          </p>

          <h3 className="gcp-subhead">Hosting Model</h3>
          <p className="gcp-copy">Production and non-production environments are logically separated for clear governance and cost accountability.</p>
          <div className="gcp-card-grid gcp-card-grid--3">
            {gcpHostingModel.map((card) => (
              <div key={card.label} className="gcp-card">
                <h4 className="gcp-card__title">{card.label}</h4>
                <p className="gcp-copy gcp-copy--tight">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="gcp-callout">
            <p>
              CMS Hybrid Cloud uses a <strong>private-first networking model</strong> — workloads run in private subnets by default, external IP addresses are centrally restricted, and all outbound internet access flows through approved connectivity services.
            </p>
          </div>

          <div className="gcp-card-grid">
            <div className="gcp-card">
              <h4 className="gcp-card__title">Virtual Private Cloud Configuration</h4>
              <p className="gcp-copy gcp-copy--tight">Private-first networking with centralized controls for connectivity, routing, and security.</p>
              <ul className="gcp-dot-list">
                {gcpVpcConfig.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="gcp-card">
              <h4 className="gcp-card__title">Firewall &amp; Security Controls</h4>
              <p className="gcp-copy gcp-copy--tight">Centralized governance and security controls maintain compliance and consistency across environments.</p>
              <div className="gcp-chips">
                {gcpFirewallTags.map((tag) => (
                  <span key={tag} className="gcp-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="gcp-card">
              <h4 className="gcp-card__title">Identity &amp; Access Management</h4>
              <p className="gcp-copy gcp-copy--tight">Access to Google Cloud resources is centrally governed using enterprise identity services and group-based access controls.</p>
              <ul className="gcp-dot-list">
                {gcpIamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="gcp-card">
              <h4 className="gcp-card__title">Gold Images</h4>
              <p className="gcp-copy gcp-copy--tight">CMS Hybrid Cloud provides centrally managed and approved VM images for supported workloads.</p>
              {gcpGoldImages.map((item) => (
                <p key={item.label} className="gcp-copy gcp-copy--tight">
                  <strong>{item.label}.</strong> {item.desc}
                </p>
              ))}
            </div>
          </div>

          <div className="gcp-card gcp-flow">
            <h3 className="gcp-subhead">Hybrid Connectivity Flow</h3>
            <ol className="gcp-flow__list">
              {gcpConnectivity.map((node, i) =>
                'arrow' in node ? (
                  <li key={`arrow-${i}`} className="gcp-flow__arrow" aria-hidden>
                    {node.arrow}
                  </li>
                ) : (
                  <li key={node.label} className="gcp-flow__node">
                    <strong>{node.label}</strong>
                    <span>{node.sub}</span>
                  </li>
                ),
              )}
            </ol>
          </div>

          <h3 className="gcp-subhead">Well-Architected Framework Review</h3>
          <p className="gcp-copy">
            This document evaluates how the Google Cloud Well-Architected Review can leverage the existing AWS Well-Architected Framework Review process and be adapted for CMS&rsquo;s Google Cloud Platform workloads. It identifies which elements are transferable, which are not, and which require further assessment.
          </p>
          <div className="gcp-card-grid">
            <div className="gcp-card">
              <h4 className="gcp-card__title">Reusable Components</h4>
              <p className="gcp-note">Transferable from the existing AWS WAFR process without requiring new tools or stakeholder relationships.</p>
              <ul className="gcp-dot-list">
                {gcpReusable.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}.</strong> {item.desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="gcp-card">
              <h4 className="gcp-card__title">Non-Transferable Elements</h4>
              <p className="gcp-note">AWS WAFR elements with no direct Google Cloud equivalent — addressed via manual procedures or new artifacts.</p>
              {gcpNonTransferable.map((item) => (
                <div key={item.item} className="gcp-gap">
                  <p className="gcp-gap__item">{item.item}</p>
                  <p className="gcp-chip">{item.gap}</p>
                  <p className="gcp-copy gcp-copy--tight">{item.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="security"
          className="gcp-section"
          ref={(el) => {
            sectionRefs.current.security = el
          }}
          aria-labelledby="gcp-security-heading"
        >
          <h2 id="gcp-security-heading" className="explore-section-heading">
            Security &amp; Governance
          </h2>
          <p className="gcp-copy gcp-copy--lede">
            We implement robust governance, security controls, and monitoring to protect CMS data and ensure compliance with federal requirements.
          </p>
          <div className="gcp-split">
            <div className="gcp-stack">
              {gcpSecurityCards.map((card) => (
                <div key={card.title} className="gcp-card">
                  <h3 className="gcp-card__title">{card.title}</h3>
                  <p className="gcp-copy gcp-copy--tight">{card.desc}</p>
                </div>
              ))}
            </div>
            <aside className="gcp-aside">
              <div className="gcp-card">
                <h3 className="gcp-aside__title">Security highlights</h3>
                <ul className="gcp-check-list">
                  {['Organization policies and guardrails', 'Centralized threat detection and monitoring', 'Least-privilege access with IAM', 'Comprehensive logging and auditing'].map(
                    (item) => (
                      <li key={item}>
                        <CheckMark />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="access"
          className="gcp-section gcp-section--alt"
          ref={(el) => {
            sectionRefs.current.access = el
          }}
          aria-labelledby="gcp-access-heading"
        >
          <h2 id="gcp-access-heading" className="explore-section-heading">
            Access &amp; Operations
          </h2>
          <p className="gcp-copy gcp-copy--lede">
            Learn how to access the Google Cloud environment, manage identities, and perform common operational tasks.
          </p>
          <div className="gcp-callout gcp-callout--accent">
            <p>
              All access to CMS Hybrid Cloud Google Cloud environments requires <strong>federated authentication</strong> through CMS credentials. Privileged access is time-limited, fully logged, and managed through a PAM workflow to minimize standing privilege.
            </p>
          </div>
          <div className="gcp-split">
            <div className="gcp-card-grid">
              {gcpOpsCards.map((card) => (
                <div key={card.title} className="gcp-card">
                  <h3 className="gcp-card__title">{card.title}</h3>
                  <p className="gcp-copy gcp-copy--tight">{card.desc}</p>
                </div>
              ))}
            </div>
            <aside className="gcp-aside">
              <div className="gcp-card">
                <h3 className="gcp-aside__title">Common tasks</h3>
                <ul className="gcp-link-list">
                  {['Request temporary access', 'Manage user identities and roles', 'Monitor systems and review logs', 'Submit a support ticket', 'Review billing and cost reports'].map(
                    (item) => (
                      <li key={item}>
                        <a href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22" target="_blank" rel="noreferrer">
                          {item}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="resources"
          className="gcp-section"
          ref={(el) => {
            sectionRefs.current.resources = el
          }}
          aria-labelledby="gcp-resources-heading"
        >
          <h2 id="gcp-resources-heading" className="explore-section-heading">
            Resources
          </h2>
          <p className="gcp-copy gcp-copy--lede">
            Reference materials, documentation, and external links to support your work in Google Cloud.
          </p>
          <div className="gcp-split">
            <div className="gcp-stack">
              <div className="gcp-card">
                <h3 className="gcp-card__title">Google Cloud Documentation</h3>
                <ul className="gcp-doc-grid">
                  {gcpGoogleDocs.map((doc) => (
                    <li key={doc.label}>
                      <a className="gcp-ext" href={doc.url} target="_blank" rel="noreferrer">
                        {doc.label} <ExternalIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="gcp-card">
                <h3 className="gcp-card__title">CMS Internal Resources</h3>
                <ul className="gcp-doc-grid">
                  {gcpCmsDocs.map((doc) => (
                    <li key={doc.label}>
                      {doc.url.startsWith('http') ? (
                        <a className="gcp-ext" href={doc.url} target="_blank" rel="noreferrer">
                          {doc.label} <ExternalIcon />
                        </a>
                      ) : (
                        <Link className="gcp-ext" to={doc.url}>
                          {doc.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="gcp-aside">
              <div className="gcp-card gcp-card--help">
                <h3 className="gcp-aside__title">Need help?</h3>
                <p className="gcp-copy gcp-copy--tight">
                  Contact the Customer Support Team for assistance with Google Cloud environments, requests, or access issues.
                </p>
                <FusionButton
                  href="https://jiraent.cms.gov/plugins/servlet/desk/portal/22"
                  accent
                  onDark
                >
                  Get Support
                </FusionButton>
              </div>
            </aside>
          </div>
        </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
