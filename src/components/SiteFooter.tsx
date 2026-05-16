/** CMS-style site footer (three columns). No chat widget or roadmap CTA. */
const brandBase = `${import.meta.env.BASE_URL}images/footer/`

const cmsHhsWebsites: { label: string; href: string }[] = [
  { label: 'CMS.gov', href: 'https://www.cms.gov/' },
  { label: 'Medicare.gov', href: 'https://www.medicare.gov/' },
  { label: 'MyMedicare.gov', href: 'https://www.mymedicare.gov/' },
  { label: 'Medicaid.gov', href: 'https://www.medicaid.gov/' },
  { label: 'Healthcare.gov', href: 'https://www.healthcare.gov/' },
  { label: 'HHS.gov', href: 'https://www.hhs.gov/' },
  { label: 'Data.CMS.gov', href: 'https://data.cms.gov/' },
  { label: 'CMS Projects on GitHub', href: 'https://github.com/CMSgov/' },
]

const additionalResources: { label: string; href: string }[] = [
  { label: 'CMS Design System', href: 'https://design.cms.gov/' },
  { label: 'Freedom of Information Act', href: 'https://www.cms.gov/center/freedom-of-information-act-center' },
  { label: 'Inspector General', href: 'https://oig.hhs.gov/' },
  { label: 'No Fear Act', href: 'https://www.cms.gov/about-cms/agency-information/about-policy/no-fear-act' },
  { label: 'Plain Writing', href: 'https://www.cms.gov/about-cms/agency-information/plain-writing' },
  { label: 'USA.gov', href: 'https://www.usa.gov/' },
]

export function SiteFooter() {
  return (
    <footer id="site-footer" className="fusion-site-footer" aria-label="Site footer">
      <div className="fusion-site-footer__inner">
        <div className="fusion-site-footer__brand">
          <div className="fusion-site-footer__brand-logos">
            <img
              className="fusion-site-footer__brand-logo fusion-site-footer__brand-logo--hhs"
              src={`${brandBase}hhs-lockup.svg`}
              alt="U.S. Department of Health and Human Services"
              width={72}
              height={72}
              decoding="async"
            />
            <img
              className="fusion-site-footer__brand-logo fusion-site-footer__brand-logo--cms"
              src={`${brandBase}cms-lockup.svg`}
              alt="Centers for Medicare & Medicaid Services"
              width={200}
              height={72}
              decoding="async"
            />
          </div>
          <p className="fusion-site-footer__brand-body">
            A federal government website managed by the Centers for Medicare &amp; Medicaid Services
            <br />
            <span className="fusion-site-footer__brand-address">
              7500 Security Boulevard, Baltimore, MD 21244
            </span>
          </p>
        </div>

        <nav className="fusion-site-footer__nav" aria-labelledby="fusion-site-footer-heading-cms">
          <h3 id="fusion-site-footer-heading-cms" className="fusion-site-footer__heading">
            CMS &amp; HHS Websites
          </h3>
          <ul className="fusion-site-footer__list">
            {cmsHhsWebsites.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="fusion-site-footer__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="fusion-site-footer__nav" aria-labelledby="fusion-site-footer-heading-resources">
          <h3 id="fusion-site-footer-heading-resources" className="fusion-site-footer__heading">
            Additional resources
          </h3>
          <ul className="fusion-site-footer__list">
            {additionalResources.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="fusion-site-footer__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
