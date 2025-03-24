
import React from 'react';
import { cn } from "@/lib/utils";

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  gap?: number;
}

export function InfiniteSlider({
  children,
  className,
  duration = 25,
  gap = 40,
  ...props
}: InfiniteSliderProps) {
  return (
    <div
      className={cn("flex w-full overflow-hidden", className)}
      {...props}
    >
      <div 
        className="flex animate-slider-left"
        style={{
          animationDuration: `${duration}s`,
          gap: `${gap}px`
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
