import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import {
  AboutHybridCloudHero,
  AboutHybridCloudStickyNav,
} from '../components/about-hybrid-cloud/AboutHybridCloudChrome'
import { FusionButton } from '../components/FusionButton'
import { ChevronRight } from '../components/icons/Chevron'
import { InteriorSectionNavProvider } from '../components/layouts/InteriorSectionNav'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const imageBase = `${import.meta.env.BASE_URL}images/sections/benefits/`

const supportRoles = [
  {
    id: 'hosting-coordinator',
    shortLabel: 'HC',
    title: 'Hosting Coordinator',
    focus: 'Relationship with the CMS Business Owner',
    icon: 'people',
    responsibilities: [
      'Maintains ownership of the customer relationship',
      'Possesses a high-level understanding of Hybrid Cloud',
      'Understands CMS culture, risk, regulation, and customer-team context, including roadmaps and business cycles',
      'Manages the relationship with customers throughout their end-to-end journey',
    ],
  },
  {
    id: 'technical-advisor',
    shortLabel: 'TA',
    title: 'Technical Advisor',
    focus: 'Guides customers to the appropriate product and service offerings so they can achieve their goals',
    icon: 'headset',
    responsibilities: [
      'Serves as the technical point of contact for customers',
      'Coordinates between application teams and back-end support teams',
      'Provides broad technical knowledge of Hybrid Cloud',
      'Provides deep technical knowledge of hosting offerings',
      'Operates as a technical thought partner to customers',
      'Advises customers on technical optimization',
    ],
  },
  {
    id: 'financial-analyst',
    shortLabel: 'FA',
    title: 'Financial Analyst',
    focus: 'Budget, funding, and optimization activities',
    icon: 'chart',
    responsibilities: [
      'Provides understanding of and leads financial planning and funding activities',
      'Leads cost estimation, ongoing FinOps, and budgeting activities',
      'Aids CORs and customers through funding collection and approval',
      'Advises customers on cost-optimization opportunities',
    ],
  },
] as const

function RoleIcon({ type }: { type: string }) {
  if (type === 'headset') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 14v-2a8 8 0 0116 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 14h3v6H5a1 1 0 01-1-1v-5zM20 14h-3v6h2a1 1 0 001-1v-5z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (type === 'chart') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3 20h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19v-1a5.5 5.5 0 0111 0v1M16 5.5a3 3 0 010 5.8M16.5 14a5 5 0 014 4.5V19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return <ChevronRight />
}

export default function BenefitsPage() {
  useEffect(() => {
    document.title = 'Benefits | FUSION Sphere'
  }, [])

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <InteriorSectionNavProvider>
        <main id="main-content" tabIndex={-1} className="program-overview cst-page">
          <AboutHybridCloudHero
            currentLabel="Benefits"
            title="Hybrid Cloud Customer Support Team Overview"
            description="The CMS Hybrid Cloud support team aims to provide a streamlined customer journey across all hosting offerings. We are committed to taking a customer-centric approach, streamlining all touchpoints where possible, and being a core resource for Hybrid Cloud customers throughout their customer journey."
            backgroundImage={`${imageBase}customer-support-hero.png`}
            showActions={false}
          />
          <AboutHybridCloudStickyNav activeSectionId="benefits" />

          <section className="cst-team" aria-labelledby="cst-team-heading">
            <div className="cst-container">
              <h2 id="cst-team-heading" className="cst-section-title">
                Customer Support Team
              </h2>

              <div className="cst-team-map">
                <img
                  src={`${imageBase}customer-support-team.png`}
                  alt="Team members stacking their hands together"
                  className="cst-team-map__image"
                  loading="lazy"
                  decoding="async"
                />
                {supportRoles.map((role) => (
                  <article key={role.id} className={`cst-role-card cst-role-card--${role.id}`}>
                    <span className="cst-role-card__icon">
                      <RoleIcon type={role.icon} />
                    </span>
                    <h3>{role.title} ({role.shortLabel})</h3>
                    <p>
                      <strong>Focus:</strong> {role.focus}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="cst-responsibilities" aria-labelledby="cst-responsibilities-heading">
            <div className="cst-container cst-container--narrow">
              <h2 id="cst-responsibilities-heading" className="cst-section-title">
                Our Support Roles &amp; Responsibilities
              </h2>

              <div className="cst-accordion-list">
                {supportRoles.map((role) => (
                  <details key={role.id} className="cst-accordion" open>
                    <summary>
                      <span className="cst-accordion__icon">
                        <RoleIcon type={role.icon} />
                      </span>
                      <span>{role.title}</span>
                      <svg className="cst-accordion__chevron" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div className="cst-accordion__content">
                      <div className="cst-accordion__role">
                        <span>Support Team</span>
                        <strong>{role.title}</strong>
                      </div>
                      <div className="cst-accordion__responsibilities">
                        <span>Responsibilities</span>
                        <ul>
                          {role.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                ))}
              </div>

              <p className="cst-updated">
                <span aria-hidden>▣</span> Last updated: October 24, 2024
              </p>

              <a className="cst-feedback" href="/about/contact-us">
                <span className="cst-feedback__icon" aria-hidden>●</span>
                <span>
                  We want to continuously enhance your customer experience. Please use the CMS Hybrid Cloud
                  Customer Experience portal to share any feedback.
                </span>
                <ArrowIcon />
              </a>
            </div>
          </section>

          <section className="cst-get-started" aria-labelledby="cst-get-started-heading">
            <div className="cst-container">
              <h2 id="cst-get-started-heading">Getting started with CMS Hybrid Cloud</h2>
              <div className="cst-get-started__grid">
                <div>
                  <h3>Ready to get started?</h3>
                  <FusionButton
                    href="/about/contact-us"
                    accent
                    onDark
                    className="cst-get-started__button"
                  >
                    Request to use CMS Hybrid Cloud
                    <ArrowIcon />
                  </FusionButton>
                </div>
                <div>
                  <h3>Want updates?</h3>
                  <p>Visit our news and learning resources for the latest information about CMS Hybrid Cloud.</p>
                </div>
                <div>
                  <h3>Have more questions?</h3>
                  <p>A Hosting Coordinator can help answer questions and guide you through the migration process.</p>
                  <a href="/about/contact-us">Contact the CMS Hybrid Cloud team</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </InteriorSectionNavProvider>

      <SiteFooter />
    </>
  )
}
