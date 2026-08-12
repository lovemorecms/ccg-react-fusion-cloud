/** Site color mode. Dark uses CMS.gov Deepsea 800 (`--color-primary-darkest` / `--color-background-inverse`). */
export type ColorMode = 'light' | 'dark'

/** Only written when the visitor toggles theme — first visit defaults to dark. */
export const THEME_STORAGE_KEY = 'fusion-color-mode-v2'

export function getPreferredColorMode(): ColorMode {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return 'dark'
}

/**
 * Apply CMS-aware theme attributes on `<html>` / `<body>`.
 * Dark mode uses `data-theme="dark"` and CMS Deepsea 800 tokens
 * (`--color-primary-darkest` / `--color-background-inverse`).
 * Avoid putting `.ds-base--inverse` on `<body>` — it forces inherited
 * inverse text onto light panels (e.g. mega menus) and breaks contrast.
 */
export function applyColorMode(mode: ColorMode) {
  const root = document.documentElement
  const body = document.body

  root.dataset.theme = mode
  root.style.colorScheme = mode

  if (mode === 'dark') {
    root.classList.add('fusion-theme-dark')
    body?.classList.add('fusion-theme-dark')
  } else {
    root.classList.remove('fusion-theme-dark')
    body?.classList.remove('fusion-theme-dark')
  }

  root.classList.remove('ds-base--inverse')
  body?.classList.remove('ds-base--inverse')
}

export function persistColorMode(mode: ColorMode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    /* ignore */
  }
}
