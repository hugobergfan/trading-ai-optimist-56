
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  children?: React.ReactNode;
  showBackground?: boolean;
};

export const Sparkles = React.memo(({
  id,
  className,
  background,
  minSize = 0.6,
  maxSize = 1.4,
  speed = 3,
  particleColor = "#ffffff",
  particleDensity = 100,
  children,
  showBackground = false,
}: SparklesProps) => {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // container loaded
  }, []);

  const options: ISourceOptions = useMemo(() => {
    return {
      background: {
        color: {
          value: background || "transparent",
        },
      },
      fullScreen: {
        enable: false,
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
          resize: {
            enable: true,
            delay: 0,
            factor: 1
          }
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
    };
  }, [background, minSize, maxSize, speed, particleColor, particleDensity]);

  if (!init) return <div className={className}>{children}</div>;

  return (
    <div className={className} style={{ position: 'relative' }}>
      <Particles
        id={id || "tsparticles"}
        className="h-full w-full absolute top-0 left-0"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      {children && (
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
});

Sparkles.displayName = "Sparkles";
