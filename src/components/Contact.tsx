import { useEffect, useRef, useState } from 'react'
import { contact, contactCopy, contactGreeting, profile } from '../content/site'
import { BrandIcon, type Brand } from './BrandIcon'
import { ContourMark } from './ContourMark'
import { Link } from './Link'
import styles from './Contact.module.css'

type ContactLink = { label: string; href: string; brand?: Brand }

// How the conversation plays out, once, when it scrolls into view. Each step shows
// everything from the steps before it. All text is in the page from the start, and
// hidden only visually until it arrives, so screen readers never wait for it.
const steps = [
  { name: 'typing-1', after: 100 },
  { name: 'greeting', after: 450 },
  { name: 'typing-2', after: 150 },
  { name: 'message', after: 550 },
  { name: 'replies', after: 250 },
] as const

const lastStep = steps.length

export function Contact() {
  const links = [
    contact.email && { label: 'Email', href: `mailto:${contact.email}` },
    { label: 'LinkedIn', href: contact.linkedin, brand: 'linkedin' },
    { label: 'GitHub', href: contact.github, brand: 'github' },
    contact.cvUrl && { label: 'Download CV', href: contact.cvUrl },
  ].filter((link): link is ContactLink => Boolean(link))

  const thread = useRef<HTMLDivElement>(null)
  // 0 = nothing yet; lastStep = the whole conversation is showing.
  const [step, setStep] = useState(0)

  useEffect(() => {
    const element = thread.current
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // Show everything straight away if there's no way (or no wish) to animate.
    if (!element || reduced || !('IntersectionObserver' in window)) {
      setStep(lastStep)
      return
    }

    const timers: number[] = []
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        let at = 0
        steps.forEach((s, i) => {
          at += s.after
          timers.push(window.setTimeout(() => setStep(i + 1), at))
        })
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const shown = (name: (typeof steps)[number]['name']) =>
    step >= steps.findIndex((s) => s.name === name) + 1
  const typing = step === 1 || step === 3

  return (
    <section id="contact" aria-labelledby="contact-heading" className={`card ${styles.contact}`}>
      <ContourMark className={styles.cornerMark} />
      <h2 id="contact-heading" className={styles.title}>
        Let’s talk.
      </h2>

      {/* Styled like a Messages thread. */}
      {/* Tabbing into the thread skips straight to the end, so no link is ever invisible. */}
      <div ref={thread} className={styles.window} onFocus={() => setStep(lastStep)}>
        <div className={styles.incoming}>
          <img className={styles.avatar} src={profile.photo} alt="" width={30} height={30} />
          <div className={styles.bubbles}>
            <p className={styles.bubble} data-shown={shown('greeting')}>
              {contactGreeting}
            </p>
            <p className={styles.bubble} data-shown={shown('message')}>
              {contactCopy}
            </p>
            <p className={styles.typing} data-shown={typing} aria-hidden="true">
              <span />
              <span />
              <span />
            </p>
          </div>
        </div>

        <ul className={styles.replies} aria-label="Reply with" data-shown={shown('replies')}>
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={styles.reply}>
                {link.brand && <BrandIcon brand={link.brand} />}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
