
import React from "react";
import { cn } from "@/lib/utils";

export interface SparklesProps {
  id: string;
  className?: string;
  particleColor?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleDensity?: number;
  children?: React.ReactNode;
}

export function Sparkles({
  id,
  className,
  particleColor = "#fff",
  background = "#000",
  minSize = 0.5,
  maxSize = 1.5,
  speed = 1,
  particleDensity = 100,
  children,
}: SparklesProps) {
  return (
    <div className={cn("relative", className)} style={{ backgroundColor: background }}>
      <div
        id={id}
        className="absolute inset-0 w-full h-full"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
