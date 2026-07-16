import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { HideableInteriorBreadcrumbs } from '../components/layouts/HideableInteriorBreadcrumbs'
import { InteriorSectionNavProvider } from '../components/layouts/InteriorSectionNav'
import { PlatformArticleCtaBand } from '../components/layouts/platform-article/PlatformArticleCtaBand'
import { PlatformArticleHero } from '../components/layouts/platform-article/PlatformArticleHero'
import { PlatformArticleSectionNav } from '../components/layouts/platform-article/PlatformArticleSectionNav'
import { PlatformArticleTableBlock } from '../components/layouts/platform-article/PlatformArticleTable'
import { getSharedServiceArticle } from '../data/sharedServiceArticleContent'
import type { PlatformArticleSection } from '../data/platformArticleContent'
import { sharedServicesPath } from '../data/sharedServicesContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

function SharedServiceArticleBreadcrumbs({
  categoryId,
  categoryLabel,
  title,
}: {
  categoryId: string
  categoryLabel: string
  title: string
}) {
  return (
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
          <Link to="/explore" className="kc-breadcrumb-link">
            Explore
          </Link>
        </li>
        <li aria-hidden="true" className="kc-breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </li>
        <li>
          <Link to={sharedServicesPath} className="kc-breadcrumb-link">
            Shared Services
          </Link>
        </li>
        <li aria-hidden="true" className="kc-breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </li>
        <li>
          <Link to={`${sharedServicesPath}#${categoryId}`} className="kc-breadcrumb-link">
            {categoryLabel}
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
  )
}

function ArticleSection({ section }: { section: PlatformArticleSection }) {
  return (
    <section
      id={section.id}
      className="pa-article__section"
      aria-labelledby={`${section.id}-heading`}
      tabIndex={-1}
    >
      <h2 id={`${section.id}-heading`} className="pa-article__h2">
        {section.heading}
      </h2>

      {section.type === 'leads' ? (
        <div className="pa-article__leads">
          {section.items.map((item) => (
            <p key={item.label} className="pa-article__lead">
              <strong className="pa-article__lead-label">{item.label}:</strong> {item.body}
            </p>
          ))}
        </div>
      ) : null}

      {section.type === 'table' ? <PlatformArticleTableBlock table={section.table} /> : null}

      {section.type === 'prose' ? (
        <div className="pa-article__prose">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="pa-article__p">
              {paragraph}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 ? (
            <ul className="pa-article__list">
              {section.bullets.map((bullet) => (
                <li key={bullet.slice(0, 40)} className="pa-article__list-item">
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
          {section.links && section.links.length > 0 ? (
            <p className="pa-article__p">
              {section.links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? ' · ' : null}
                  <Link to={link.href} className="pa-article__link">
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export default function SharedServiceArticlePage() {
  const { categorySlug = '', serviceSlug = '' } = useParams()
  const article = getSharedServiceArticle(categorySlug, serviceSlug)

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Shared Services | FUSION Sphere`
    }
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [article])

  if (!article) {
    return <Navigate to={sharedServicesPath} replace />
  }

  const navItems = article.sections.map((section) => ({
    id: section.id,
    label: section.navLabel,
  }))

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="pa-page">
        <InteriorSectionNavProvider>
          <HideableInteriorBreadcrumbs className="kc-breadcrumb-bar kc-breadcrumb-bar--initiatives">
            <SharedServiceArticleBreadcrumbs
              categoryId={article.categoryId}
              categoryLabel={article.categoryLabel}
              title={article.title}
            />
          </HideableInteriorBreadcrumbs>

          <PlatformArticleHero
            title={article.title}
            summary={article.heroSummary}
            metadata={{
              updated: article.metadata.updated,
              readingTime: article.metadata.readingTime,
            }}
            badge={article.status}
            imageSrc={article.heroImageSrc}
            imageAlt={article.heroImageAlt}
          />

          <PlatformArticleSectionNav sectionIds={article.sectionIds} items={navItems} />
        </InteriorSectionNavProvider>

        <article className="pa-article" aria-label={article.title}>
          <div className="pa-article__inner">
            {article.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}

            <p className="pa-article__updated">Last updated: {article.lastUpdated}</p>
          </div>
        </article>

        <PlatformArticleCtaBand />
      </main>

      <SiteFooter />
    </>
  )
}
