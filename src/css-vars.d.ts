import 'react'

declare module 'react' {
  interface CSSProperties {
    /** Centre of the picture the timeline carries on from, as a fraction (0 to 1) of its row */
    '--x'?: string
  }
}
