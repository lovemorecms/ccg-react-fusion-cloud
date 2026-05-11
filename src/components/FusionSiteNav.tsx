import { SearchIcon } from './SearchIcon'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#explore', label: 'Explore' },
  { href: '#learn', label: 'Learn' },
  { href: '#get-started', label: 'Get started' },
] as const

const supportGradient =
  'linear-gradient(90deg, rgb(255, 184, 28) 0%, rgb(255, 186, 44) 8.33%, rgb(255, 189, 55) 16.67%, rgb(255, 191, 65) 25%, rgb(255, 194, 74) 33.333%, rgb(255, 196, 82) 41.667%, rgb(255, 199, 89) 50%, rgb(255, 201, 97) 58.333%, rgb(255, 204, 103) 66.667%, rgb(255, 206, 110) 75%, rgb(255, 208, 116) 83.333%, rgb(255, 211, 122) 91.667%, rgb(255, 213, 128) 100%)'

export type FusionSiteNavProps = {
  searchOpen: boolean
  onSearchToggle: () => void
}

export function FusionSiteNav({ searchOpen, onSearchToggle }: FusionSiteNavProps) {
  return (
    <div className="fusion-site-nav">
      <div className="mx-auto flex max-w-[var(--fusion-site-max-width)] flex-wrap items-center justify-between gap-y-4 px-[var(--fusion-site-padding-x)] py-4 md:px-[var(--fusion-site-padding-x-md)]">
        <a href="/" className="fusion-site-nav__logo inline-flex shrink-0 items-center">
          <img
            src="/images/fusion-orbit-logo.png"
            alt="FUSION Sphere"
            width={213}
            height={49}
            className="h-10 w-auto md:h-[49px]"
          />
        </a>

        <nav
          aria-label="Primary"
          className="order-3 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 md:order-none md:w-auto md:flex-1 md:justify-center lg:gap-x-10 xl:gap-x-14"
        >
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="fusion-site-nav__link font-sans text-sm font-bold uppercase tracking-wide md:text-base"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-4 md:ml-0">
          <button
            type="button"
            className={`flex size-10 items-center justify-center rounded-[14px] border-0 p-2 text-[#003a8f] hover:bg-neutral-100 ${
              searchOpen ? 'bg-neutral-100 ring-2 ring-[#003a8f]/30' : 'bg-transparent'
            }`}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            aria-controls={searchOpen ? 'site-search-region' : undefined}
            onClick={onSearchToggle}
          >
            <SearchIcon className="size-6 shrink-0" />
          </button>
          <a
            href="#support"
            className="fusion-site-nav__cta inline-flex h-10 min-w-[10rem] items-center justify-center rounded-[14px] px-4 font-sans text-sm font-semibold hover:brightness-95 sm:min-w-[9.5rem] md:text-base"
            style={{ backgroundImage: supportGradient }}
          >
            Get support
          </a>
        </div>
      </div>
    </div>
  )
}
