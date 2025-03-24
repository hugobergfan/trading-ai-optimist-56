
import * as React from "react"
import { cn } from "@/lib/utils"

interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "above" | "below"
}

export function Glow({
  className,
  variant = "below",
  ...props
}: GlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 opacity-80", // Increased opacity from 60 to 80
        variant === "above" && "top-[-200px] lg:top-[-300px]",
        variant === "below" && "top-[100px] lg:top-[200px]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "h-[40vh] w-[90vw] max-w-3xl",
          "rounded-full",
          variant === "above" && "bg-trading-blue/50 blur-[100px]", // Increased opacity from 30 to 50
          variant === "below" && "bg-trading-blue/20 blur-[120px]"  // Increased opacity from 10 to 20
        )}
      />
    </div>
  )
}
