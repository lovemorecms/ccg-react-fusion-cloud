import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/** Figma html-to-design capture: reveal all scroll-hidden sections before snapshot. */
function initFigmaCaptureMode() {
  const isCapture =
    window.location.hash.includes('figmacapture') ||
    new URLSearchParams(window.location.search).has('figma-capture')
  if (!isCapture) return

  document.documentElement.classList.add('figma-capture')

  const revealAll = () => {
    document.querySelectorAll('.fusion-reveal, .fusion-reveal-stagger').forEach((el) => {
      el.setAttribute('data-revealed', 'true')
    })
  }

  revealAll()
  requestAnimationFrame(revealAll)
  window.setTimeout(revealAll, 800)
  window.setTimeout(revealAll, 2000)

  // Scroll full page so IntersectionObserver fires for below-fold content
  window.setTimeout(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' })
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      revealAll()
    }, 400)
  }, 1200)
}

initFigmaCaptureMode()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
