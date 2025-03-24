
import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface PixelTrailProps {
  pixelSize?: number
  pixelClassName?: string
  fadeDuration?: number
  maxPixels?: number
  delay?: number
}

export function PixelTrail({
  pixelSize = 20,
  pixelClassName = "",
  fadeDuration = 1000,
  maxPixels = 40,
  delay = 0,
}: PixelTrailProps) {
  const [pixels, setPixels] = useState<Array<{
    id: number
    x: number
    y: number
    timestamp: number
  }>>([])
  const idCounterRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const isActiveRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      lastPositionRef.current = { x: clientX, y: clientY }
      
      if (!isActiveRef.current) return
      
      const now = Date.now()
      
      // Add new pixel
      setPixels(prevPixels => {
        const newPixels = [...prevPixels, {
          id: idCounterRef.current++,
          x: clientX - pixelSize / 2, // Center on cursor
          y: clientY - pixelSize / 2, // Center on cursor
          timestamp: now,
        }]
        
        // Remove old pixels if we exceed max
        if (newPixels.length > maxPixels) {
          return newPixels.slice(newPixels.length - maxPixels)
        }
        return newPixels
      })
    }

    // If there's a fade duration, set up a clean-up timer
    const cleanupInterval = fadeDuration > 0 
      ? setInterval(() => {
          const now = Date.now()
          setPixels(prevPixels => 
            prevPixels.filter(pixel => now - pixel.timestamp < fadeDuration)
          )
        }, 100) // Check every 100ms
      : null
    
    // Set up initial delay
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        isActiveRef.current = true
      }, delay)
    } else {
      isActiveRef.current = true
    }

    document.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (cleanupInterval) clearInterval(cleanupInterval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pixelSize, fadeDuration, maxPixels, delay])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {pixels.map(pixel => (
        <div
          key={pixel.id}
          className={cn(
            "absolute rounded-full transition-opacity",
            pixelClassName
          )}
          style={{
            width: `${pixelSize}px`,
            height: `${pixelSize}px`,
            left: `${pixel.x}px`,
            top: `${pixel.y}px`,
            opacity: fadeDuration > 0 
              ? Math.max(0, 1 - (Date.now() - pixel.timestamp) / fadeDuration) 
              : 1,
          }}
        />
      ))}
    </div>
  )
}
