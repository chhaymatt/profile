import { contact, profile } from '../content/site'
import { ContourMap } from './ContourMap'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.portrait}>
        <ContourMap className={styles.halo} />
        <img
          className={styles.photo}
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={1230}
          height={1278}
          fetchPriority="high"
        />
        <span className={`pill ${styles.badge}`}>
          {profile.role} · {profile.location}
        </span>
      </div>

      <h1 id="hero-heading" className={styles.greeting}>
        {profile.greeting}{' '}
        <span className={styles.wave} aria-hidden="true">
          👋
        </span>
      </h1>
      <p className={styles.headline}>{profile.headline}</p>
      <p className={styles.intro}>{profile.intro}</p>

      <div className={styles.actions}>
        <a href="#work" className="button button-primary">
          See my work
        </a>
        <a
          href={contact.email ? `mailto:${contact.email}` : '#contact'}
          className="button button-secondary"
        >
          Say hello
        </a>
      </div>
    </section>
  )
}
