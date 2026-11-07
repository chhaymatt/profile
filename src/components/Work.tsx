import { work } from '../content/site'
import { Section } from './Section'
import { TagList } from './Tag'
import { WorkArt } from './WorkArt'
import styles from './Work.module.css'

export function Work() {
  return (
    <Section id="work" title="A few things I’ve worked on.">
      <ul className={styles.grid}>
        {work.map((item) => (
          <li key={item.id}>
            <article aria-labelledby={`${item.id}-title`} className={`card ${styles.item}`}>
              <WorkArt id={item.id} />
              <p className={styles.industry}>{item.industry}</p>
              <h3 id={`${item.id}-title`} className={styles.title}>
                {item.title}
              </h3>
              <p className={styles.summary}>{item.summary}</p>
              <TagList items={item.tags} label={`Technologies used: ${item.title}`} />
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
