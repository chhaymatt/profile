import { archive, code, contact, hobbies, outside } from '../content/site'
import { Arrow } from './Arrow'
import { HobbyIcon } from './HobbyIcon'
import { Link } from './Link'
import { Section } from './Section'
import { SketchPreview } from './SketchPreview'
import { TagList } from './Tag'
import styles from './Closing.module.css'

export function Outside() {
  return (
    <Section id="outside" title="When I’m not at a keyboard." lead={outside}>
      <ul className={styles.hobbies}>
        {hobbies.map((hobby) => (
          <li key={hobby.id} className={`card ${styles.hobby}`}>
            <span className={styles.icon}>
              <HobbyIcon id={hobby.id} />
            </span>
            <h3 className={styles.cardTitle}>{hobby.label}</h3>
            <p className={styles.cardText}>{hobby.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Projects() {
  return (
    <Section id="projects" title="Things I’ve built on my own." lead={code.lead}>
      <ul className={styles.archive}>
        <li>
          <article aria-labelledby="coming-soon-title" className={`card ${styles.project}`}>
            <div className={styles.frame}>
              <SketchPreview />
              <span className={`pill ${styles.frameBadge}`}>Coming soon</span>
            </div>
            <h3 id="coming-soon-title" className={styles.cardTitle}>
              {code.current ? code.current.label : code.comingSoon.title}
            </h3>
            <p className={`${styles.cardText} ${styles.grow}`}>{code.comingSoon.body}</p>
            {code.current && (
              <p className={styles.projectLinks}>
                <Link href={code.current.href}>
                  Take a look <Arrow />
                </Link>
              </p>
            )}
          </article>
        </li>
        {archive.map((project) => (
          <li key={project.id}>
            <article aria-labelledby={`${project.id}-name`} className={`card ${styles.project}`}>
              <div className={styles.frame}>
                <img
                  className={styles.shot}
                  src={project.image}
                  alt={`Screenshot of ${project.name}`}
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 id={`${project.id}-name`} className={styles.cardTitle}>
                {project.name}
              </h3>
              <p className={`${styles.cardText} ${styles.grow}`}>{project.summary}</p>
              <TagList items={project.stack} label={`Built with: ${project.name}`} />
              <p className={styles.projectLinks}>
                {project.demo ? (
                  <Link href={project.demo}>
                    Live demo<span className="visually-hidden"> of {project.name}</span> <Arrow />
                  </Link>
                ) : (
                  project.note && <span className={styles.projectNote}>{project.note}</span>
                )}
                <Link href={project.repo}>
                  Code<span className="visually-hidden"> for {project.name}</span> <Arrow />
                </Link>
              </p>
            </article>
          </li>
        ))}
      </ul>
      <p className={styles.more}>
        <Link href={contact.github}>
          More on GitHub <Arrow />
        </Link>
      </p>
    </Section>
  )
}
