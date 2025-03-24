
import React, { useEffect, useRef, useState } from "react";
import { Particles, Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/slim";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const options: ISourceOptions = {
      fullScreen: {
        enable: false,
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: particleColor,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
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
          value: 400,
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
    };

    const initParticles = async () => {
      await Particles.init();
      await Container.create(id, options);
      setInit(true);
    };

    if (!init) {
      initParticles();
    }

    return () => {
      Container.destroy(id);
    };
  }, [id, particleColor, minSize, maxSize, speed, particleDensity, init]);

  return (
    <div className={cn("relative", className)} style={{ backgroundColor: background }}>
      <div
        ref={containerRef}
        id={id}
        className="absolute inset-0 w-full h-full"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
