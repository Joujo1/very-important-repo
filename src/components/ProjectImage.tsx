import { useState, type FC } from 'react'

interface ProjectImageProps {
  src: string
  alt: string
}

/** The project picture, or a striped placeholder naming the missing file. */
export const ProjectImage: FC<ProjectImageProps> = ({ src, alt }) => {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div className="placeholder">
        <span>
          Add your picture here:<code>public/{src}</code>
        </span>
      </div>
    )
  }

  return (
    <img
      src={import.meta.env.BASE_URL + src}
      alt={alt}
      loading="lazy"
      onError={() => setMissing(true)}
    />
  )
}
