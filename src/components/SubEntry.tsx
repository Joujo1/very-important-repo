import type { FC } from 'react'
import type { SubStep } from '../data/projects'
import { ProjectImage } from './ProjectImage'

interface SubEntryProps {
  step: SubStep
  /** Centre of the picture above, in percent of the picture column: where the line starts */
  fromX: number
  /** Centre of this step's picture, in percent of the picture column */
  x: number
}

// Centres of the two pictures in a pair; matches the 48% columns and 4% gap in styles.css
const PAIR_LEFT_X = 24
const PAIR_RIGHT_X = 76

/**
 * One step below the picture above: a short curve, then one smaller picture, or two side by
 * side with the second set a bit lower. Their description boxes sit across the trunk in the same order.
 */
export const SubEntry: FC<SubEntryProps> = ({ step, fromX, x }) => {
  const projects = 'image' in step ? [step] : step
  const isPair = projects.length === 2

  return (
    <article className={isPair ? 'entry entry-sub is-pair' : 'entry entry-sub'} style={{ '--x': `${x}%` }}>
      <div className="entry-picture">
        <svg className="sub-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {isPair ? (
            <>
              {/* the first picture starts halfway down the drawing, the lower one at the bottom */}
              <path d={`M${fromX} 0 C${fromX} 30, ${PAIR_LEFT_X} 20, ${PAIR_LEFT_X} 50`} />
              <path d={`M${fromX} 0 C${fromX} 45, ${PAIR_RIGHT_X} 40, ${PAIR_RIGHT_X} 100`} />
            </>
          ) : (
            <path d={`M${fromX} 0 C${fromX} 50, ${x} 50, ${x} 100`} />
          )}
        </svg>
        <div className="sub-pictures">
          {projects.map((project) => (
            <ProjectImage key={project.image} src={project.image} alt={project.description} />
          ))}
        </div>
      </div>
      <div className="entry-side sub-boxes">
        {projects.map((project) => (
          <div key={project.image} className="entry-box">
            <p>{project.description}</p>
            {project.link && <a href={project.link}>See the project</a>}
          </div>
        ))}
      </div>
    </article>
  )
}
