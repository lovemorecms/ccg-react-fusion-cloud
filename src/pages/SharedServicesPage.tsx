import { SkipNav } from '@cmsgov/ds-cms-gov'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FusionButton } from '../components/FusionButton'
import { HideableInteriorBreadcrumbs } from '../components/layouts/HideableInteriorBreadcrumbs'
import { InteriorSectionNavProvider } from '../components/layouts/InteriorSectionNav'
import { SharedServicesStickyNav } from '../components/shared-services/SharedServicesStickyNav'
import { SharedServicesCategoryIcon } from '../components/shared-services/SharedServicesCategoryIcons'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import {
  categoryMatchesQuery,
  getMatchingCategoryIds,
  serviceMatchesQuery,
  sharedServiceCategories,
  sharedServicesHero,
  sharedServicesSectionIds,
  sharedServicesTotalCount,
  type SharedService,
  type SharedServiceCategory,
} from '../data/sharedServicesContent'

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span className={`ss-acc__chevron-wrap${open ? ' ss-acc__chevron-wrap--open' : ''}`} aria-hidden>
      <svg
        className={`ss-acc__chevron${open ? ' ss-acc__chevron--open' : ''}`}
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function CategoryIcon({ categoryId }: { categoryId: string }) {
  return (
    <span className="ss-acc__icon" aria-hidden>
      <SharedServicesCategoryIcon id={categoryId} />
    </span>
  )
}

function ServiceCard({
  service,
  categoryId,
}: {
  service: SharedService
  categoryId: string
}) {
  return (
    <article className="ss-service-card" aria-labelledby={`ss-service-${service.id}`}>
      <div className="ss-service-card__top">
        <span className="ss-service-card__icon" aria-hidden>
          <SharedServicesCategoryIcon id={categoryId} />
        </span>
      </div>
      <h3 id={`ss-service-${service.id}`} className="ss-service-card__title">
        {service.title}
      </h3>
      <p className="ss-service-card__body">{service.description}</p>
      <FusionButton href={service.href ?? '#'} variation="ghost" className="ss-service-card__cta">
        Learn more
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </FusionButton>
    </article>
  )
}

function SharedServicesBreadcrumbs() {
  return (
    <HideableInteriorBreadcrumbs className="kc-breadcrumb-bar ss-breadcrumb-bar">
      <nav aria-label="Breadcrumb" className="kc-breadcrumb-inner">
        <ol className="kc-breadcrumb-list">
          <li>
            <Link to="/" className="kc-breadcrumb-link">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="kc-breadcrumb-sep">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li>
            <Link to="/explore" className="kc-breadcrumb-link">
              Explore
            </Link>
          </li>
          <li aria-hidden="true" className="kc-breadcrumb-sep">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li>
            <span className="kc-breadcrumb-current">Shared Services</span>
          </li>
        </ol>
      </nav>
    </HideableInteriorBreadcrumbs>
  )
}

function CategoryAccordion({
  category,
  isOpen,
  visibleServices,
  onToggle,
}: {
  category: SharedServiceCategory
  isOpen: boolean
  visibleServices: SharedService[]
  onToggle: () => void
}) {
  const panelId = `ss-panel-${category.id}`
  const buttonId = `ss-button-${category.id}`

  return (
    <section
      id={category.id}
      className={`ss-acc${isOpen ? ' ss-acc--open' : ''}`}
      aria-labelledby={buttonId}
      tabIndex={-1}
    >
      <h2 className="ss-acc__heading">
        <button
          type="button"
          id={buttonId}
          className="ss-acc__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <CategoryIcon categoryId={category.id} />
          <span className="ss-acc__copy">
            <span className="ss-acc__title-row">
              <span className="ss-acc__title">{category.label}</span>
              <span className="ss-acc__count">{category.services.length} services</span>
            </span>
            <span className="ss-acc__description">{category.description}</span>
          </span>
          <ChevronIcon open={isOpen} />
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="ss-acc__panel"
        hidden={!isOpen}
      >
        <div className="ss-service-grid">
          {visibleServices.map((service) => (
            <ServiceCard key={service.id} service={service} categoryId={category.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SharedServicesPage() {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [manualOpenIds, setManualOpenIds] = useState<Set<string>>(() => new Set())
  const [categoryOrder, setCategoryOrder] = useState<string[]>(() => [...sharedServicesSectionIds])
  const [activeCategoryId, setActiveCategoryId] = useState(sharedServicesSectionIds[0] ?? '')
  const pendingScrollId = useRef<string | null>(null)

  const categoriesById = useMemo(
    () => new Map(sharedServiceCategories.map((category) => [category.id, category])),
    [],
  )

  const orderedCategories = useMemo(
    () =>
      categoryOrder
        .map((id) => categoriesById.get(id))
        .filter((category): category is SharedServiceCategory => Boolean(category)),
    [categoriesById, categoryOrder],
  )

  const normalizedQuery = searchQuery.trim()
  const isSearching = normalizedQuery.length > 0

  const openIds = useMemo(() => {
    if (isSearching) {
      return new Set(getMatchingCategoryIds(normalizedQuery))
    }
    return manualOpenIds
  }, [isSearching, manualOpenIds, normalizedQuery])

  const navActiveId = useMemo(() => {
    if (openIds.has(activeCategoryId)) return activeCategoryId
    const firstOpen = categoryOrder.find((id) => openIds.has(id))
    return firstOpen ?? activeCategoryId
  }, [activeCategoryId, categoryOrder, openIds])

  useEffect(() => {
    if (!isSearching) return
    const matching = getMatchingCategoryIds(normalizedQuery)
    if (matching.length === 0) return
    if (!matching.includes(activeCategoryId)) {
      setActiveCategoryId(matching[0])
    }
  }, [activeCategoryId, isSearching, normalizedQuery])

  const visibleCategories = useMemo(() => {
    if (!isSearching) return orderedCategories
    return orderedCategories.filter((category) => categoryMatchesQuery(category, normalizedQuery))
  }, [isSearching, normalizedQuery, orderedCategories])

  useEffect(() => {
    document.title = 'Shared Services | Explore | FUSION Sphere'
    return () => {
      document.title = 'FUSION Sphere'
    }
  }, [])

  useEffect(() => {
    const hashId = location.hash.replace(/^#/, '')
    if (!hashId || !categoriesById.has(hashId)) return

    pendingScrollId.current = hashId
    setSearchQuery('')
    setCategoryOrder([hashId, ...sharedServicesSectionIds.filter((item) => item !== hashId)])
    setManualOpenIds(new Set([hashId]))
    setActiveCategoryId(hashId)
  }, [categoriesById, location.hash])

  useLayoutEffect(() => {
    const id = pendingScrollId.current
    if (!id) return
    pendingScrollId.current = null

    const target = document.getElementById(id)
    if (!target) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [categoryOrder, openIds])

  function handleNavSelect(id: string) {
    pendingScrollId.current = id
    setSearchQuery('')
    setCategoryOrder([id, ...categoryOrder.filter((item) => item !== id)])
    setManualOpenIds(new Set([id]))
    setActiveCategoryId(id)
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value)
    if (!value.trim()) {
      setManualOpenIds(new Set())
      setCategoryOrder([...sharedServicesSectionIds])
      setActiveCategoryId(sharedServicesSectionIds[0] ?? '')
    }
  }

  function toggleCategory(id: string) {
    if (isSearching) return
    setManualOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        if (activeCategoryId === id) {
          const remaining = categoryOrder.find((item) => item !== id && next.has(item))
          setActiveCategoryId(remaining ?? id)
        }
      } else {
        next.add(id)
        setActiveCategoryId(id)
      }
      return next
    })
  }

  function getVisibleServices(category: SharedServiceCategory) {
    if (!isSearching) return category.services
    return category.services.filter((service) => serviceMatchesQuery(service, normalizedQuery))
  }

  return (
    <>
      <SkipNav href="#main-content">Skip to main content</SkipNav>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="ss-page">
        <InteriorSectionNavProvider>
          <SharedServicesBreadcrumbs />

          <section className="kc-hero ss-hero ss-hero--with-section-nav" aria-labelledby="ss-hero-heading">
            <div className="kc-hero__inner">
              <h1 id="ss-hero-heading" className="kc-hero__heading">
                {sharedServicesHero.title}
              </h1>
              <p className="kc-hero__description">{sharedServicesHero.description}</p>

              <div className="kc-hero__search">
                <div className="kc-hero__search-field">
                  <svg
                    className="kc-hero__search-icon"
                    width="20"
                    height="20"
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
                    type="search"
                    value={searchQuery}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    placeholder={sharedServicesHero.searchPlaceholder}
                    className="kc-hero__search-input"
                    aria-label="Search shared services"
                  />
                  {searchQuery ? (
                    <FusionButton
                      type="button"
                      variation="ghost"
                      size="small"
                      onClick={() => handleSearchChange('')}
                    >
                      Clear
                    </FusionButton>
                  ) : null}
                </div>
              </div>

              <div className="kc-hero__stats">
                <div className="kc-hero__stat">
                  <span className="kc-hero__stat-number">{sharedServicesTotalCount}</span>
                  <span className="kc-hero__stat-label">Services</span>
                </div>
                <div className="kc-hero__stat">
                  <span className="kc-hero__stat-number">{sharedServiceCategories.length}</span>
                  <span className="kc-hero__stat-label">Categories</span>
                </div>
              </div>
            </div>
          </section>

          <SharedServicesStickyNav onNavClick={handleNavSelect} activeSectionId={navActiveId} />
        </InteriorSectionNavProvider>

        <div className="ss-content">
          <div className="ss-content__glow ss-content__glow--one" aria-hidden />
          <div className="ss-content__glow ss-content__glow--two" aria-hidden />
          <section className="ss-section" aria-labelledby="ss-categories-heading">
            <div className="ss-container">
              <header className="ss-section__header">
                <h2 id="ss-categories-heading" className="ss-section__title">
                  Explore by category
                </h2>
                {isSearching ? (
                  <p className="ss-section__meta">
                    {visibleCategories.length === 0
                      ? `No services match “${searchQuery}”.`
                      : `Showing ${visibleCategories.length} categor${visibleCategories.length === 1 ? 'y' : 'ies'} matching “${searchQuery}”.`}
                  </p>
                ) : (
                  <p className="ss-section__meta">
                    Expand a category to browse available services across CMS Cloud Fusion.
                  </p>
                )}
              </header>

              <div className="ss-acc-list">
                {visibleCategories.map((category) => {
                  const visibleServices = getVisibleServices(category)
                  if (isSearching && visibleServices.length === 0) return null

                  return (
                    <CategoryAccordion
                      key={category.id}
                      category={category}
                      isOpen={openIds.has(category.id)}
                      visibleServices={visibleServices}
                      onToggle={() => toggleCategory(category.id)}
                    />
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
