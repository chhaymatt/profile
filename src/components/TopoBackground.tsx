import { generateContours } from '../lib/contours'
import styles from './TopoBackground.module.css'

const TILE = 960

// One seamless tile of terrain, repeated behind the whole page. Peaks are spread so
// their rings rarely cross, and the tile wraps so there are no visible seams.
const tile = generateContours({
  seed: 7_2026,
  step: 24,
  wrap: { width: TILE, height: TILE },
  peaks: [
    { x: 160, y: 200, rings: 7 },
    { x: 620, y: 120, rings: 5 },
    { x: 820, y: 560, rings: 7 },
    { x: 330, y: 700, rings: 6 },
  ],
})

export function TopoBackground() {
  return (
    <svg className={styles.backdrop} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="topo" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          {tile.paths.map((d, i) => (
            <path
              key={d}
              d={d}
              className={Math.floor(i / 9) % 3 === 2 ? styles.index : styles.line}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo)" />
    </svg>
  )
}
