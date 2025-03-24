
import React, { useEffect, useRef, useState } from "react";
import { Container, ISourceOptions, RecursivePartial } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export interface SparklesProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
  particleDensity?: number;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  backgroundColor?: string;
  showBackground?: boolean;
}

export function Sparkles({
  id,
  children,
  className,
  particleDensity = 100,
  particleColor = "#FFF",
  minSize = 1,
  maxSize = 3,
  speed = 1,
  backgroundColor = "#000",
  showBackground = false,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<Container | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const options: ISourceOptions = {
      background: {
        color: {
          value: backgroundColor,
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true as any, // Type fix
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: particleColor,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: particleDensity, // Fixed property name
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
    };

    async function initParticles() {
      try {
        if (containerRef.current) {
          await loadSlim(options, containerRef.current);
          const instance = await loadSlim(options, containerRef.current);
          setContainer(instance);
        }
      } catch (error) {
        console.error("Error initializing particles:", error);
      }
    }

    initParticles();

    return () => {
      if (container) {
        container.destroy();
      }
    };
  }, [
    id,
    particleColor,
    particleDensity,
    minSize,
    maxSize,
    speed,
    backgroundColor,
  ]);

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Background div with opacity if showBackground is true */}
      {showBackground && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor, opacity: 0.9 }}
        />
      )}

      {/* Particles container */}
      <div
        ref={containerRef}
        id={id}
        className="absolute inset-0 z-10"
      />

      {/* Content on top */}
      {children && (
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
