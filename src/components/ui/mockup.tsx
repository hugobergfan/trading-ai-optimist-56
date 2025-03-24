
import { cn } from "@/lib/utils"

interface MockupProps {
  children: React.ReactNode
  className?: string
}

export function Mockup({ children, className }: MockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-background",
        "w-full max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}
