import type { FC } from 'react'
import { Timeline } from './components/Timeline'
import { projects } from './data/projects'

export const App: FC = () => (
  <>
    <header className="hero">
      <div className="hero-inner">
        <h1>Unfortunately, we decided to proceed with another candidate.</h1>
        <p className="hero-sub">I'm happy to announce that I am unemployed.</p>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </header>

    <Timeline projects={projects} />

    <footer className="footer">
      <h2>Good job.</h2>
      <p>
        <a href="mailto:joel.kiener@gmx.ch">you@example.com</a>
      </p>
      <p className="footer-links">
        <a href="https://github.com/Joujo1">GitHub</a>
      </p>
    </footer>
  </>
)
