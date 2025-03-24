
import * as React from "react"
import { cn } from "@/lib/utils"

interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Mockup({ className, children, ...props }: MockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-background",
        "shadow-lg",
        className
      )}
      {...props}
    >
      <div className="border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
          </div>
          <div className="ml-4 flex-1">
            <div className="h-3 w-3/5 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </div>
      <div className="p-0">{children}</div>
    </div>
  )
}
