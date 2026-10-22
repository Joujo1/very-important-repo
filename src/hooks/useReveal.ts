import { useEffect, useRef, useState } from 'react'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * True once the element's top scrolls above the trigger line (75% down the screen),
 * false again when it drops back below it. Elements that left through the top stay visible.
 * With reduced motion everything is visible from the start.
 */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(reduceMotion)

  useEffect(() => {
    const element = ref.current
    if (!element || reduceMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
        else if (entry.boundingClientRect.top > 0) setVisible(false)
      },
      { rootMargin: '0px 0px -25% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, visible] as const
}
