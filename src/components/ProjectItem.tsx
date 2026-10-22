import type { FC } from 'react'
import type { Project, SubStep } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { ProjectEntry } from './ProjectEntry'
import { SubEntry } from './SubEntry'

interface ProjectItemProps {
  project: Project
}

// Where a step's picture is centred, in percent of the picture column:
// single pictures alternate a bit left and right, a pair stays centred
const centerX = (step: SubStep, index: number) => ('image' in step ? (index % 2 === 0 ? 42 : 58) : 50)

/** One branch off the trunk: the curve with its date, the project, and its sub-projects below it. */
export const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  const [ref, visible] = useReveal<HTMLLIElement>()
  const children = project.children ?? []

  return (
    <li ref={ref} className={visible ? 'project is-visible' : 'project'}>
      <div className="branch">
        <svg viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 C 0 60, 100 50, 100 120" />
        </svg>
        <time className="branch-date">{project.date}</time>
        <span className="commit" aria-hidden="true" />
      </div>
      <ProjectEntry project={project} />
      {children.map((step, index) => (
        <SubEntry
          key={index}
          step={step}
          fromX={index === 0 ? 50 : centerX(children[index - 1], index - 1)}
          x={centerX(step, index)}
        />
      ))}
    </li>
  )
}
