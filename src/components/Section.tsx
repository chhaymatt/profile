import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  title: string
  lead?: string
  children: ReactNode
}

export function Section({ id, title, lead, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <header className={styles.head}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {lead && <p className={styles.lead}>{lead}</p>}
      </header>
      {children}
    </section>
  )
}
