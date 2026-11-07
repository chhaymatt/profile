import type { CSSProperties } from 'react'
import { generateContours } from '../lib/contours'
import styles from './ContourMap.module.css'

// Computed once at module load: the map never changes between renders.
const map = generateContours({
  seed: 20_14,
  step: 22,
  peaks: [
    { x: 300, y: 250, rings: 11 },
    { x: 540, y: 70, rings: 3 },
    { x: 70, y: 440, rings: 3 },
  ],
})

export function ContourMap({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.map, className].filter(Boolean).join(' ')}
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {map.paths.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={i % 4 === 3 ? styles.index : styles.line}
          style={{ '--i': i } as CSSProperties}
        />
      ))}
    </svg>
  )
}
