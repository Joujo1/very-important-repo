import type { FC } from 'react'
import type { Project } from '../data/projects'
import { ProjectImage } from './ProjectImage'

interface ProjectEntryProps {
  project: Project
}

/** The project's row: its picture on the branch, the description in a box across the trunk. */
export const ProjectEntry: FC<ProjectEntryProps> = ({ project }) => (
  <article className="entry entry-main">
    <div className="entry-picture">
      <ProjectImage src={project.image} alt={`Screenshot of ${project.title}`} />
    </div>
    <div className="entry-side entry-box">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      {project.link && <a href={project.link}>See the project</a>}
    </div>
  </article>
)
