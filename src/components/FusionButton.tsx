import { Button, type ButtonProps } from '@cmsgov/ds-cms-gov'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export type FusionButtonProps = ButtonProps & {
  /** Internal SPA route (uses React Router navigation). */
  to?: string
  /**
   * Accent CTA: primary blue fill with white text (508-safe).
   * Formerly Dandelion yellow; remapped sitewide for contrast on light surfaces.
   */
  accent?: boolean
}

export function FusionButton({
  to,
  href,
  onClick,
  className,
  accent,
  isAlternate,
  onDark,
  ...props
}: FusionButtonProps) {
  const navigate = useNavigate()
  const internalTarget = to ?? (typeof href === 'string' && href.startsWith('/') ? href : undefined)
  const classes = [
    'fusion-ds-button',
    accent ? 'fusion-btn--accent' : '',
    accent && onDark ? 'fusion-btn--accent-on-dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = (e: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (internalTarget) {
      e.preventDefault()
      navigate(internalTarget)
    }
    onClick?.(e)
  }

  const buttonProps = {
    ...props,
    className: classes,
    isAlternate: accent ? false : isAlternate,
    onDark,
    variation: props.variation ?? 'solid',
  }

  if (internalTarget) {
    return <Button href={internalTarget} onClick={handleClick} {...buttonProps} />
  }

  return <Button href={href} onClick={onClick} {...buttonProps} />
}
