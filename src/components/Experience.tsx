import { contact, credentials, experience, skills } from '../content/site'
import { Section } from './Section'
import { SkillIcon } from './SkillIcon'
import { TagList } from './Tag'
import styles from './Experience.module.css'

export function Experience() {
  return (
    <Section id="experience" title={experience.title} lead={experience.summary}>
      {contact.cvUrl && (
        <p className={styles.cv}>
          <a href={contact.cvUrl} download>
            Download full CV
          </a>
        </p>
      )}

      {/* Laid out like a spec sheet: a label on the left, the details on the right. */}
      <div className={styles.sheets}>
        <section className={`card ${styles.sheet}`} aria-labelledby="skills-heading">
          <h3 id="skills-heading" className={styles.subhead}>
            Skills
          </h3>
          <dl className={styles.rows}>
            {skills.map((group) => (
              <div key={group.label} className={styles.row}>
                <dt className={styles.label}>
                  <SkillIcon name={group.icon} />
                  {group.label}
                </dt>
                <dd className={styles.value}>
                  <TagList items={group.items} label={group.label} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`card ${styles.sheet}`} aria-labelledby="credentials-heading">
          <h3 id="credentials-heading" className={styles.subhead}>
            Certifications and education
          </h3>
          <dl className={styles.rows}>
            {credentials.map((group) => (
              <div key={group.label} className={styles.row}>
                <dt className={styles.label}>{group.label}</dt>
                <dd className={styles.value}>
                  <TagList items={group.items} label={group.label} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Section>
  )
}
