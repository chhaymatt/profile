import type { ReactNode } from 'react'
import type { SkillIconName } from '../content/site'
import styles from './SkillIcon.module.css'

// Small icons for each skills group, in the same rounded ink-and-accent style as the
// hobby icons, on a 24px grid.

const icons: Record<SkillIconName, ReactNode> = {
  code: (
    <>
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
      <path className={styles.accent} d="M13.5 4.5l-3 15" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.8 4.4 4.4 0 0 0 7 18.5z" />
      <path className={styles.accent} d="M12 16v-5M9.8 13.2 12 11l2.2 2.2" />
    </>
  ),
  testing: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
      <path className={styles.accent} d="M7.8 10.6l2 2 3.4-3.6" />
    </>
  ),
  design: (
    <>
      <path d="M4 20l1-4.5L15.5 5l3.5 3.5L8.5 19z" />
      <path className={styles.accent} d="M13.5 7l3.5 3.5" />
    </>
  ),
}

export function SkillIcon({ name }: { name: SkillIconName }) {
  return (
    <span className={styles.frame}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {icons[name]}
      </svg>
    </span>
  )
}
