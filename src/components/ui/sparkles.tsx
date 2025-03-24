
import * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile" 
import { Engine } from "@tsparticles/engine"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

interface SparklesProps {
  id?: string
  className?: string
  particleColor?: string
  backgroundColor?: string
  minSize?: number
  maxSize?: number
  particleCount?: number
  particleSpeed?: number
  disableAnimation?: boolean
  className2?: string
}

export function Sparkles({
  id = "tsparticles",
  className,
  particleColor,
  backgroundColor = "transparent",
  minSize = 0.6,
  maxSize = 2,
  particleCount = 30,
  particleSpeed = 2,
  disableAnimation = false,
  className2,
  ...props
}: SparklesProps) {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [init, setInit] = useState(false)

  const particlesInit = useCallback(async (engine: Engine) => {
    await initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    })
    setInit(true)
  }, [])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 -z-10", className)}
      {...props}
    >
      {init && (
        <Particles
          id={id}
          className={cn("h-full w-full", className2)}
          options={{
            background: {
              color: {
                value: backgroundColor,
              },
            },
            fullScreen: {
              enable: false,
              zIndex: -1,
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: particleColor || (theme === "dark" ? "#ffffff" : "#0A84FF"),
              },
              move: {
                enable: !disableAnimation,
                direction: "none",
                speed: {
                  min: particleSpeed / 2,
                  max: particleSpeed,
                },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: particleCount,
              },
              opacity: {
                value: 0.7,
              },
              size: {
                value: {
                  min: minSize,
                  max: maxSize,
                },
              },
            },
            detectRetina: true,
          }}
          init={particlesInit}
        />
      )}
    </div>
  )
}
