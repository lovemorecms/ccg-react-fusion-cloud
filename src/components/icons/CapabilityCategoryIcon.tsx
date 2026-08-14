import type { ReactNode } from 'react'
import type { Category } from '../../data/hybridCloudServicesGuide'

/** Same Lucide-style stroke icons used across Fusion Info Center and homepage cards. */
function IconStroke({ d, children }: { d?: string; children?: ReactNode }) {
  return (
    <svg
      className="explore-capability-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      {d ? <path d={d} strokeLinecap="round" strokeLinejoin="round" /> : children}
    </svg>
  )
}

export function CapabilityCategoryIcon({ category }: { category: Category }) {
  switch (category) {
    case 'AI & ML':
      return (
        <IconStroke>
          <path
            d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14zM5 16l.6 1.8L7.4 18.4 5.6 19 5 20.8l-.6-1.8L2.6 18.4 4.4 17.8 5 16z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconStroke>
      )
    case 'Compute':
      return <IconStroke d="M4 6h16v10H4zM8 20h8M12 16v4" />
    case 'Containers':
      return <IconStroke d="M4 8h7v7H4zM13 8h7v7h-7zM8 4h8v4H8z" />
    case 'Storage':
      return (
        <IconStroke>
          <path
            d="M22 12H2M5.45 5.11 2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 16h.01M10 16h.01" strokeLinecap="round" />
        </IconStroke>
      )
    case 'Databases':
      return <IconStroke d="M4 7a8 3 0 0016 0A8 3 0 004 7zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
    case 'Networking':
      return (
        <IconStroke>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a14.5 14.5 0 000 18M12 3a14.5 14.5 0 010 18M3 12h18" strokeLinecap="round" />
        </IconStroke>
      )
    case 'Security':
      return <IconStroke d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4zM9 12l2 2 4-4" />
    case 'Identity':
      return (
        <IconStroke d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.77-7.77zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      )
    case 'Analytics':
      return <IconStroke d="M4 19V5M4 19h16M8 15v3M12 9v9M16 12v6" />
    case 'DevOps':
      return (
        <IconStroke>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </IconStroke>
      )
    case 'Monitoring':
      return <IconStroke d="M4 19V5M4 19h16M8 15l3-4 3 3 4-6" />
    case 'Migration':
      return (
        <IconStroke>
          <path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" strokeLinecap="round" strokeLinejoin="round" />
        </IconStroke>
      )
    case 'FinOps':
      return (
        <IconStroke>
          <circle cx="12" cy="12" r="9" />
          <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8M12 6v2M12 16v2" strokeLinecap="round" strokeLinejoin="round" />
        </IconStroke>
      )
    case 'Integration':
      return (
        <IconStroke>
          <path
            d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconStroke>
      )
    default:
      return <IconStroke d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v5H4zM13 15h7v5h-7z" />
  }
}
