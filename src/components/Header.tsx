import { useEffect, useState } from 'react'
import { contact, profile } from '../content/site'
import styles from './Header.module.css'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#outside', label: 'Outside work' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  // Only matters on phones: on wider screens the links are always shown.
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // The section currently in the middle of the screen, so its nav link can light up.
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`)
        }
      },
      // A thin band across the middle of the screen: whichever section crosses it is current.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const close = () => setOpen(false)

  return (
    <div className={styles.bar} data-open={open || undefined}>
      <header className={styles.header}>
        <a href="#top" className={styles.name} onClick={close}>
          {profile.name}
        </a>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.icon} aria-hidden="true" />
        </button>
        <nav id="main-nav" aria-label="Main" className={styles.menu}>
          <ul className={styles.nav}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  aria-current={current === link.href ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {contact.cvUrl && (
              <li>
                <a href={contact.cvUrl} download className={`button button-primary ${styles.cv}`}>
                  CV
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}
