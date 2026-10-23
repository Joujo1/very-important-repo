import type { FC } from 'react'
import type { Project } from '../data/projectTree'

interface ProjectEntryProps {
  project: Project
}

/** The project's row: its picture on the branch, the title and description in a box across the trunk. */
export const ProjectEntry: FC<ProjectEntryProps> = ({ project }) => (
  <article className="entry entry-main">
    <div className="entry-picture">
      <img src={project.root.image} alt={project.title ?? project.folder} loading="lazy" />
    </div>
    {(project.title || project.description) && (
      <div className="entry-side entry-box">
        {project.title && <h2>{project.title}</h2>}
        {project.description && <p>{project.description}</p>}
      </div>
    )}
  </article>
)
