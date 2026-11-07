import { Outside, Projects } from './components/Closing'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TopoBackground } from './components/TopoBackground'
import { Work } from './components/Work'
import { profile } from './content/site'
import styles from './App.module.css'

const year = new Date().getFullYear()

export default function App() {
  return (
    <div className={styles.shell}>
      <TopoBackground />
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <Header />
      <div id="top" className={styles.page}>
        <main id="main" tabIndex={-1}>
          <Hero />
          <Work />
          <Experience />
          <Projects />
          <Outside />
          <Contact />
        </main>
        <footer className={styles.footer}>
          <p>
            © {year} {profile.name}
          </p>
          <p>Made in Sydney</p>
        </footer>
      </div>
    </div>
  )
}
