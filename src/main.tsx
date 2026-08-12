import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeProvider'
import { applyColorMode, getPreferredColorMode } from './theme/theme'

/** Avoid a light flash before React hydrates the saved theme. */
applyColorMode(getPreferredColorMode())

const REVEAL_SELECTOR =
  '.fusion-reveal, .fusion-reveal-stagger, .fusion-section-reveal'

function isCaptureMode() {
  const params = new URLSearchParams(window.location.search)
  const hash = window.location.hash.toLowerCase()
  return (
    params.has('screenshot') ||
    params.has('capture') ||
    params.has('figma-capture') ||
    hash.includes('screenshot') ||
    hash.includes('figmacapture')
  )
}

/**
 * Screenshot / Figma capture: settle all scroll-reveal sections so full-page
 * captures are not blank. Use `?screenshot` (or `?figma-capture` / `#screenshot`).
 */
function initScreenshotCaptureMode() {
  if (!isCaptureMode()) return

  document.documentElement.classList.add('figma-capture')

  const revealAll = () => {
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      el.setAttribute('data-revealed', 'true')
    })
  }

  revealAll()
  requestAnimationFrame(revealAll)
  window.setTimeout(revealAll, 400)
  window.setTimeout(revealAll, 1200)
  window.setTimeout(revealAll, 2500)

  const observer = new MutationObserver(() => revealAll())
  observer.observe(document.documentElement, { childList: true, subtree: true })

  window.addEventListener('beforeprint', revealAll)
}

initScreenshotCaptureMode()

/** Print / Save as PDF: settle reveals even without ?screenshot. */
window.addEventListener('beforeprint', () => {
  document
    .querySelectorAll('.fusion-reveal, .fusion-reveal-stagger, .fusion-section-reveal')
    .forEach((el) => el.setAttribute('data-revealed', 'true'))
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
