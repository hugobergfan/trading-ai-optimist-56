
import { cn } from "@/lib/utils"

interface GlowProps {
  className?: string
  variant?: "default" | "centered" | "above" | "below"
}

export function Glow({ className, variant = "default" }: GlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-70",
        {
          "bg-[radial-gradient(circle_800px_at_50%_400px,var(--blue-400),transparent_80%)]":
            variant === "above",
          "bg-[radial-gradient(circle_800px_at_50%_100%,var(--blue-400),transparent_80%)]":
            variant === "below",
          "bg-[radial-gradient(circle_800px_at_50%_50%,var(--blue-400),transparent_80%)]":
            variant === "centered",
          "bg-[radial-gradient(ellipse_50%_50%_at_50%_-20%,var(--blue-400),transparent_100%)]":
            variant === "default",
        },
        className
      )}
    />
  )
}
