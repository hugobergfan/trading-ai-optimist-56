
import { useEffect, useState } from "react"

type ScreenSize = {
  width: number
  height: number
  lessThan: (size: "sm" | "md" | "lg" | "xl" | "2xl") => boolean
  greaterThan: (size: "sm" | "md" | "lg" | "xl" | "2xl") => boolean
}

const getBreakpointValue = (breakpoint: string): number => {
  const breakpoints = {
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536
  }
  return breakpoints[breakpoint as keyof typeof breakpoints] || 0
}

export function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<{width: number, height: number}>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    ...size,
    lessThan: (breakpoint) => size.width < getBreakpointValue(breakpoint),
    greaterThan: (breakpoint) => size.width > getBreakpointValue(breakpoint),
  }
}
