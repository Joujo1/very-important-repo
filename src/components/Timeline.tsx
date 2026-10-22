import { useEffect, useRef, type FC } from 'react'
import type { Project } from '../data/projects'
import { ProjectItem } from './ProjectItem'

interface TimelineProps {
  projects: readonly Project[]
}

/** The trunk, which fills up as you scroll, with one branch per project. */
export const Timeline: FC<TimelineProps> = ({ projects }) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const timeline = ref.current
    if (!timeline) return
    let frame = 0

    // Written as a CSS variable instead of state so scrolling never re-renders React
    const updateTrunk = () => {
      const rect = timeline.getBoundingClientRect()
      const progress = (window.innerHeight * 0.65 - rect.top) / rect.height
      timeline.style.setProperty('--progress', String(Math.min(Math.max(progress, 0), 1)))
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateTrunk)
    }

    updateTrunk()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateTrunk)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateTrunk)
    }
  }, [])

  return (
    <main className="timeline" ref={ref}>
      <div className="trunk" aria-hidden="true">
        <div className="trunk-fill" />
      </div>
      <ol className="projects">
        {projects.map((project) => (
          <ProjectItem key={project.title} project={project} />
        ))}
      </ol>
    </main>
  )
}
