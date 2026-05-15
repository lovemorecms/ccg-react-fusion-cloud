import { Button, type ButtonProps } from '@cmsgov/ds-cms-gov'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export type FusionButtonProps = ButtonProps & {
  /** Internal SPA route (uses React Router navigation). */
  to?: string
  /**
   * CMS.gov accent CTA: yellow fill (`--color-accent-primary`) with primary blue text.
   * On the child theme, `isAlternate` is a blue button — use `accent` for yellow CTAs.
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
  ...props
}: FusionButtonProps) {
  const navigate = useNavigate()
  const classes = [
    'fusion-ds-button',
    accent ? 'fusion-btn--accent' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = (e: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (to) {
      e.preventDefault()
      navigate(to)
    }
    onClick?.(e)
  }

  const buttonProps = {
    ...props,
    className: classes,
    isAlternate: accent ? false : isAlternate,
    variation: props.variation ?? 'solid',
  }

  if (to) {
    return <Button href={to} onClick={handleClick} {...buttonProps} />
  }

  return <Button href={href} onClick={onClick} {...buttonProps} />
}
