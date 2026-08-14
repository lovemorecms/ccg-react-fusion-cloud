import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { KnowledgeBasePageLayout } from '../components/layouts/KnowledgeBasePageLayout'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import {
  fusionInfoCenterArticlePath,
  fusionInfoCenterNavGroups,
  getFusionInfoCenterCategory,
} from '../data/knowledgeCenterDocCategories'

function Breadcrumbs({ categoryTitle }: { categoryTitle: string }) {
  return (
    <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
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
          <Link to="/learn/knowledge-center" className="kc-breadcrumb-link">
            Fusion Info Center
          </Link>
        </li>
        <li aria-hidden="true" className="kc-breadcrumb-sep">
          /
        </li>
        <li>
          <span className="kc-breadcrumb-current">{categoryTitle}</span>
        </li>
      </ol>
    </nav>
  )
}

export default function KnowledgeCenterCategoryPage() {
  const { categoryId = '' } = useParams()
  const category = getFusionInfoCenterCategory(categoryId)
  const navGroups = useMemo(() => fusionInfoCenterNavGroups(categoryId), [categoryId])
  const topics = category?.topics ?? []

  useEffect(() => {
    if (!category) return
    document.title = `${category.title} | Fusion Info Center | CCG Modernization`
    return () => {
      document.title = 'CCG Modernization'
    }
  }, [category])

  if (!category) {
    return <Navigate to="/learn/knowledge-center" replace />
  }

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" className="explore-2 fic-doc" tabIndex={-1}>
        <KnowledgeBasePageLayout
          breadcrumbs={<Breadcrumbs categoryTitle={category.title} />}
          pageTitle={category.title}
          pageSubtext={
            category.description ??
            'Guides and references for this Fusion Info Center category.'
          }
          articleTitle={category.title}
          articleIntro={
            category.description
              ? `${category.description}. Browse the topics in this category, or use the left navigation to open another section.`
              : 'Browse the topics in this category, or use the left navigation to open another section.'
          }
          navGroups={navGroups}
          focusGroupId={category.id}
          onThisPage={[
            { id: 'category-guides', label: 'Guides in this category' },
          ]}
          quickLinks={[
            { label: 'Fusion Info Center', href: '/learn/knowledge-center' },
            { label: 'Maven Integration for DevOps', href: fusionInfoCenterArticlePath },
          ]}
        >
          <h2 id="category-guides" className="ddoc-article__h2">
            Guides in this category
          </h2>
          {topics.length > 0 ? (
            <ul className="ddoc-bullet-list">
              {topics.map((topic) => (
                <li key={topic.label}>
                  {topic.to ? <Link to={topic.to}>{topic.label}</Link> : topic.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="ddoc-article__p">
              Guides for {category.title} are being added to Fusion Info Center. Use the left
              navigation to browse other categories, including DevOps.
            </p>
          )}
        </KnowledgeBasePageLayout>
      </main>
      <SiteFooter />
    </>
  )
}
