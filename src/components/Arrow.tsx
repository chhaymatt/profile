// The ↗ after an external link. Decorative (the link already says it opens a new
// tab), so screen readers skip it; it nudges towards its destination on hover.
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  )
}
