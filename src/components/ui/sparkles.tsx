"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleColor,
  particleDensity,
  speed,
  particleSize,
  ...props
}: {
  id: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  particleSize?: number;
  [key: string]: any;
}) => {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: background || "#0d47a1",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: particleColor || "#ffffff",
      },
      move: {
        enable: true,
        direction: "none",
        outModes: {
          default: "out",
        },
        random: false,
        speed: speed || 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: particleDensity || 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: minSize || 1, max: maxSize || 3 },
      },
    },
  };

  return (
    <div className={cn("h-full w-full", className)}>
      {init && (
        <Particles
          id={id}
          className={cn("h-full w-full")}
          options={particlesOptions}
        />
      )}
    </div>
  );
};

export const Sparkles = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  particleSize?: number;
}) => {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <SparklesCore
        id="tsparticles"
        className="absolute inset-0 h-full w-full"
        {...props}
      />
      {children}
    </div>
  );
};

export const Torch = ({ size = 300, className, ...rest }: { size?: number; className?: string; children?: React.ReactNode }) => {
  const { elapsed } = useTime();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...rest}
    >
      <motion.div
        className="absolute pointer-events-none overflow-hidden"
        style={{
          left: position.x ? position.x - size / 2 : 0,
          top: position.y ? position.y - size / 2 : 0,
          width: size,
          height: size,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 0%, transparent 60%)",
          filter: "blur(8px)",
        }}
      />

      {rest.children}
    </motion.div>
  );
};

function useTime() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const onFrame = () => {
      setElapsed((Date.now() - startTime) / 1000);
      animationFrame = requestAnimationFrame(onFrame);
    };

    startTime = Date.now();
    animationFrame = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  return { elapsed };
}
