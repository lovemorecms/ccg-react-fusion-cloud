import { useTheme } from '../theme/ThemeProvider'

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3v1.6M12 19.4V21M4.93 4.93l1.13 1.13M17.94 17.94l1.13 1.13M3 12h1.6M19.4 12H21M4.93 19.07l1.13-1.13M17.94 6.06l1.13-1.13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Sun / moon color-mode toggle in the primary nav. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggleColorMode } = useTheme()

  return (
    <button
      type="button"
      className={`fusion-theme-toggle ${className}`.trim()}
      onClick={toggleColorMode}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="fusion-theme-toggle__track">
        <span className="fusion-theme-toggle__thumb" />
        <span className="fusion-theme-toggle__icon fusion-theme-toggle__icon--sun">
          <SunIcon />
        </span>
        <span className="fusion-theme-toggle__icon fusion-theme-toggle__icon--moon">
          <MoonIcon />
        </span>
      </span>
      <span className="sr-only">{isDark ? 'Dark mode on' : 'Light mode on'}</span>
    </button>
  )
}
