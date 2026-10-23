import type { FC } from 'react'
import { layoutSteps, type Project } from '../data/projectTree'
import { useReveal } from '../hooks/useReveal'
import { ProjectEntry } from './ProjectEntry'
import { SubEntry } from './SubEntry'

interface ProjectItemProps {
  project: Project
}

/** One branch off the trunk: the curve with its date, the project, and the rows of pictures below it. */
export const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  const [ref, visible] = useReveal<HTMLLIElement>()

  return (
    <li ref={ref} className={visible ? 'project is-visible' : 'project'}>
      <div className="branch">
        <svg viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 C 0 60, 100 50, 100 120" />
        </svg>
        {project.date && <time className="branch-date">{project.date}</time>}
        <span className="commit" aria-hidden="true" />
      </div>
      <ProjectEntry project={project} />
      {layoutSteps(project.root).map((step) => (
        <SubEntry key={step.shots[0].id} step={step} />
      ))}
    </li>
  )
}
