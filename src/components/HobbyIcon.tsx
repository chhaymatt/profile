import type { ReactNode } from 'react'
import styles from './HobbyIcon.module.css'

// Hand-drawn in the same style as the contour lines: rounded ink strokes with one
// accent-coloured detail. Inline SVG, so they use the colour tokens and switch in dark mode.

const icons: Record<string, ReactNode> = {
  // A winding trail up to a finish flag.
  running: (
    <>
      <path d="M5 40c7 0 8-9 15-9s7-9 14-9" />
      <path d="M36 22V6" />
      <path className={styles.accent} d="M36 6h9l-3 4 3 4h-9z" />
      <circle className={styles.dot} cx="5" cy="40" r="1.5" />
    </>
  ),
  // A climbing hold with its bolt, and a smaller hold above.
  bouldering: (
    <>
      <path
        className={styles.accent}
        d="M7 31c0-8.5 6.5-15 15-15 6.5 0 11.5 4.5 11.5 10.5C33.5 34 27 39 19.5 39 12 39 7 36 7 31z"
      />
      <circle cx="20.5" cy="28" r="3" />
      <path d="M34 9.5c0-2.5 2-4.5 4.5-4.5S43 7 43 9.5 41 14 38.5 14 34 12 34 9.5z" />
    </>
  ),
  // A dumbbell.
  gym: (
    <>
      <path d="M15 24h18" />
      <rect className={styles.accent} x="9" y="14" width="6" height="20" rx="2.5" />
      <rect className={styles.accent} x="33" y="14" width="6" height="20" rx="2.5" />
      <path d="M5 19v10M43 19v10" />
    </>
  ),
  // A paddle and a ball.
  pickleball: (
    <>
      <g transform="rotate(-30 17 22)">
        <rect x="6" y="3" width="22" height="24" rx="8" />
        <rect x="14" y="27" width="6" height="13" rx="2.5" />
        <path d="M14 31h6" />
      </g>
      <circle className={styles.accent} cx="38" cy="37" r="7" />
      <circle className={styles.hole} cx="35.5" cy="35.5" r="1.1" />
      <circle className={styles.hole} cx="40.5" cy="35.5" r="1.1" />
      <circle className={styles.hole} cx="38" cy="39.8" r="1.1" />
    </>
  ),
}

export function HobbyIcon({ id }: { id: string }) {
  const icon = icons[id]
  if (!icon) return null
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {icon}
    </svg>
  )
}
