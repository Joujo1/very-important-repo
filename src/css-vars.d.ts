import 'react'

declare module 'react' {
  interface CSSProperties {
    /** Horizontal centre of a sub-project's picture, as a percentage of the picture column */
    '--x'?: string
  }
}
