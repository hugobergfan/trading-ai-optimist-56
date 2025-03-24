
import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'left' | 'right';
  blurIntensity?: number;
}

export function ProgressiveBlur({
  className,
  direction = 'left',
  blurIntensity = 1,
  ...props
}: ProgressiveBlurProps) {
  const gradientDirection = direction === 'left' ? 'to left' : 'to right';
  
  return (
    <div
      className={cn("absolute", className)}
      style={{
        background: `linear-gradient(${gradientDirection}, transparent, rgba(255, 255, 255, ${blurIntensity}))`
      }}
      {...props}
    />
  );
}
