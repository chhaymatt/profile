import { generateContours } from '../lib/contours'
import styles from './ContourMark.module.css'

// A small patch of contour rings that sits in a card's corner, echoing the photo halo.
const mark = generateContours({
  seed: 31,
  step: 11,
  peaks: [{ x: 60, y: 60, rings: 5 }],
})

export function ContourMark({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.mark, className].filter(Boolean).join(' ')}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      {mark.paths.map((d, i) => (
        <path key={d} d={d} className={i === mark.paths.length - 1 ? styles.index : undefined} />
      ))}
      <circle cx={mark.summit.x} cy={mark.summit.y} r="3.5" className={styles.summit} />
    </svg>
  )
}
