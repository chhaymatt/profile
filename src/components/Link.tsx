import type { AnchorHTMLAttributes } from 'react'

const isExternal = (href: string) => /^https?:\/\//.test(href)

/**
 * A link that opens other websites in a new tab, and says so to screen readers.
 * Links within the page, mailto: links and downloads behave normally.
 */
export function Link({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (!isExternal(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}
