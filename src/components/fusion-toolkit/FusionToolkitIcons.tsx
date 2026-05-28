type IconProps = { className?: string }

export function ToolkitIconBaseCamp({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M4 22V10l10-6 10 6v12H4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 4v18M4 10h20" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export function ToolkitIconHelix({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M8 20c6-8 6-12 12-12M8 8c6 8 6 12 12 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2.25" fill="currentColor" />
      <circle cx="20" cy="20" r="2.25" fill="currentColor" />
    </svg>
  )
}

export function ToolkitIconLens({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="14" cy="14" r="3" fill="currentColor" />
      <path d="M20 8l4-4M8 20l-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function ToolkitIconMatch({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="7" cy="14" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="21" cy="7" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="21" cy="21" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9.8 12.6 18.2 8.4M9.8 15.4l8.4 4.2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

const iconById = {
  basecamp: ToolkitIconBaseCamp,
  helix: ToolkitIconHelix,
  lens: ToolkitIconLens,
  match: ToolkitIconMatch,
} as const

export function FusionToolkitProductIcon({ id, className }: { id: keyof typeof iconById; className?: string }) {
  const Icon = iconById[id]
  return <Icon className={className} />
}
