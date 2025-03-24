
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  showBackground?: boolean;
}

export function Sparkles({
  id,
  className,
  children,
  backgroundColor = "transparent",
  particleColor = "#FFC700",
  particleDensity = 600,
  speed = 1,
  minSize = 1,
  maxSize = 2,
  showBackground = false,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particlesInitialized, setParticlesInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || particlesInitialized) {
      return;
    }

    const initParticles = async () => {
      try {
        const tsParticles = (await import("@tsparticles/slim")).tsParticles;
        const initParticles = (await import("@tsparticles/slim")).initParticles;

        await initParticles();

        await tsParticles.load({
          id,
          options: {
            background: {
              color: {
                value: backgroundColor,
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 0,
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: particleColor,
              },
              links: {
                color: particleColor,
                distance: 80,
                enable: true,
                opacity: 0.5,
                width: 0.5,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: speed,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: particleDensity,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: minSize, max: maxSize },
              },
            },
            detectRetina: true,
          },
        });

        setParticlesInitialized(true);
      } catch (error) {
        console.error("Failed to initialize particles:", error);
      }
    };

    initParticles();

    return () => {
      const tsParticles = window.tsParticles;
      if (tsParticles) {
        tsParticles.destroy(id);
      }
    };
  }, [backgroundColor, id, maxSize, minSize, particleColor, particleDensity, particlesInitialized, speed]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        id={id}
        className="absolute inset-0 z-10"
        style={{ visibility: showBackground ? "visible" : "hidden" }}
      />
      <div className="relative z-20 flex items-center justify-center">{children}</div>
    </div>
  );
}
