import type { FC } from 'react'
import { shotX, type Step } from '../data/projectTree'

interface SubEntryProps {
  step: Step
}

/** A vertical curve in a 100x100 box, from x `from` at the top to x `to` at height `end`. */
const curve = (from: number, to: number, end: number) =>
  `M${from} 0 C${from} ${end * 0.6}, ${to} ${end * 0.4}, ${to} ${end}`

/**
 * One row below the picture above: a curve to each picture, then two pictures side by side
 * (the second a bit lower) or one centred. Their description boxes sit across the trunk in the same order.
 */
export const SubEntry: FC<SubEntryProps> = ({ step }) => {
  const { shots, fromX, parent } = step
  const isPair = shots.length === 2
  const continueX = parent === -1 ? 50 : shotX(shots.length, parent)

  return (
    <article className={isPair ? 'entry entry-sub is-pair' : 'entry entry-sub'} style={{ '--x': String(continueX / 100) }}>
      <div className="entry-picture">
        <svg className="sub-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {shots.map((shot, index) => (
            // In a pair the first picture starts halfway down the drawing, the lower one at the bottom
            <path key={shot.id} d={curve(fromX, shotX(shots.length, index), isPair && index === 0 ? 50 : 100)} />
          ))}
        </svg>
        <div className="sub-pictures">
          {shots.map((shot, index) => (
            <div key={shot.id} className={index === parent ? 'sub-picture has-children' : 'sub-picture'}>
              <img src={shot.image} alt={shot.description ?? `Picture ${shot.id}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {shots.some((shot) => shot.description) && (
        <div className="entry-side sub-boxes">
          {shots.map((shot) => (
            <div key={shot.id} className={shot.description ? 'entry-box' : 'entry-box is-empty'}>
              {shot.description && <p>{shot.description}</p>}
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
