type IconProps = { className?: string }

export function SharedServicesCategoryIcon({ id, className }: { id: string; className?: string }) {
  const props: IconProps = { className }

  switch (id) {
    case 'network':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'storage':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <ellipse cx="12" cy="6" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 6v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 11v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'user-access':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'compute':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'security-compliance':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M12 3l7 3v6c0 4.4-3 8.5-7 9-4-.5-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'platform':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M4 8l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4 12l8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'development-support':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'operations-maintenance':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'finops':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M4 18V8l4-2 4 2 4-2 4 2v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 10v8M12 12v6M16 10v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'solutions-engineering':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M9 18h6M10 21h4M12 3a5 5 0 00-3 9.2V14h6v-1.8A5 5 0 0012 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
  }
}
