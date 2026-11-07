import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import styles from './WorkArt.module.css'

// Gives every shape a path length of 1, so CSS can draw each one in from 0 to 1.
function drawable(scene: ReactNode): ReactNode {
  if (!isValidElement<{ children?: ReactNode }>(scene)) return scene
  return Children.map(scene.props.children, (shape) =>
    isValidElement(shape)
      ? cloneElement(shape as ReactElement<{ pathLength?: number }>, { pathLength: 1 })
      : shape,
  )
}

// A small line-drawn scene for each work card, showing what the project was about.
// Same stroke style as the hobby icons, on a 160×120 grid. `soft` lines are lighter
// details; `accent` lines are accent-coloured highlights.

const scenes: Record<string, ReactNode> = {
  // What people insure: a home, a caravan, a boat and a motorbike.
  'quote-and-purchase': (
    <>
      <path className={styles.soft} d="M4 103h152" />
      <path d="M8 62 30 42l22 20" />
      <path d="M14 57v45h32V57" />
      <path d="M26 102V88h8v14" />
      <rect x="58" y="68" width="46" height="26" rx="8" />
      <rect className={styles.soft} x="66" y="75" width="13" height="8" rx="2" />
      <path d="M104 88h8" />
      <circle className={styles.accent} cx="78" cy="96" r="5" />
      <path className={styles.soft} d="M108 58q6-4 12 0t12 0 12 0 12 0" />
      <path d="M112 44h40l-6 10h-28z" />
      <path d="M131 44V18" />
      <path className={styles.accent} d="M133 21l13 19h-13z" />
      <circle cx="122" cy="93" r="7" />
      <circle cx="148" cy="93" r="7" />
      <path d="M122 93l8-11M148 93l-5-11M126 78l-3-4h-4" />
      <path className={styles.accent} d="M128 82q7-8 17 0l1 4h-18z" />
      <path className={styles.soft} d="M133 92h12" />
    </>
  ),
  // A bank, the clock on a term deposit, a stack of coins and a matched tick.
  reconciliation: (
    <>
      <path d="M14 46 50 28l36 18z" />
      <path d="M16 51h68M14 98h72" />
      <path d="M24 56v36M40 56v36M60 56v36M76 56v36" />
      <circle cx="122" cy="40" r="18" />
      <path className={styles.accent} d="M122 30v10l7 5" />
      <ellipse cx="122" cy="80" rx="18" ry="5" />
      <path d="M104 80v16c0 2.8 8 5 18 5s18-2.2 18-5V80" />
      <path className={styles.soft} d="M104 88c0 2.8 8 5 18 5s18-2.2 18-5" />
      <path className={styles.accent} d="M90 64l5 5 9-10" />
    </>
  ),
  // An open manual, a search, and a support agent's headset.
  'offline-manual': (
    <>
      <path d="M10 40q23-8 46 0v58q-23-8-46 0z" />
      <path d="M56 40q23-8 46 0v58q-23-8-46 0" />
      <path
        className={styles.soft}
        d="M18 54h30M18 64h24M18 74h30M18 84h20M64 54h30M64 64h22M64 74h28"
      />
      <circle className={styles.accent} cx="96" cy="24" r="7" />
      <path className={styles.accent} d="M101 29l6 6" />
      <path d="M112 72a20 20 0 0 1 40 0" />
      <rect x="107" y="70" width="9" height="17" rx="3.5" />
      <rect x="148" y="70" width="9" height="17" rx="3.5" />
      <path d="M152 87q0 12-15 12h-5" />
      <circle className={styles.accent} cx="129" cy="99" r="3" />
    </>
  ),
  // Data-centre racks, and a dashboard of hardware health, power and sustainability.
  'six-week-prototype': (
    <>
      <rect x="8" y="28" width="30" height="74" rx="3" />
      <path className={styles.soft} d="M12 40h22M12 52h22M12 64h22M12 76h22M12 88h22" />
      <rect x="44" y="44" width="30" height="58" rx="3" />
      <path className={styles.soft} d="M48 56h22M48 68h22M48 80h22M48 92h22" />
      <circle className={styles.accent} cx="30" cy="40" r="1.8" />
      <circle className={styles.accent} cx="66" cy="56" r="1.8" />
      <rect x="84" y="18" width="70" height="54" rx="6" />
      <path d="M96 56a14 14 0 0 1 28 0" />
      <path className={styles.accent} d="M110 56l7-8" />
      <path d="M134 60V50M141 60V40M148 60V46" />
      <path d="M96 104c0-12 10-20 22-20 0 12-10 20-22 20zM96 104l12-12" />
      <path className={styles.accent} d="M140 80l-8 12h8l-5 12 12-16h-8l5-8z" />
    </>
  ),
}

export function WorkArt({ id }: { id: string }) {
  const scene = scenes[id]
  if (!scene) return null
  return (
    <svg className={styles.art} viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      {drawable(scene)}
    </svg>
  )
}
