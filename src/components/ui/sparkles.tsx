
import React, { useRef, useEffect, useState, FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { tsParticles } from '@tsparticles/slim';
import { useMotionValue, motion, useSpring } from 'framer-motion';
import type { Container, Engine } from '@tsparticles/engine';
import type { ISourceOptions } from '@tsparticles/engine';

interface SparklesProps {
  id?: string;
  className?: string;
  particleColor?: string;
  particleSize?: number;
  particleCount?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleDensity?: number;
  showCursor?: boolean;
  showBackground?: boolean;
  backgroundColor?: string;
  children?: ReactNode;
  particlesOptions?: ISourceOptions;
}

export const Sparkles: FC<SparklesProps> = ({
  id = 'tsparticles',
  className,
  particleColor = '#ffffff',
  particleSize = 2,
  particleCount = 40,
  minSize = 0.1,
  maxSize = 2,
  speed = 2,
  particleDensity = 100,
  showCursor = true,
  showBackground = false,
  backgroundColor = 'transparent',
  children,
  particlesOptions,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<Container | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springOptions = { stiffness: 500, damping: 50 };
  const followX = useSpring(mouseX, springOptions);
  const followY = useSpring(mouseY, springOptions);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useEffect(() => {
    const loadParticles = async () => {
      const engine = await tsParticles.load(id, {
        particles: {
          number: {
            value: particleCount,
            density: {
              enable: true,
              area: particleDensity,
            },
          },
          color: {
            value: particleColor,
          },
          size: {
            value: { min: minSize, max: maxSize },
          },
          move: {
            enable: true,
            speed: speed,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
          },
        },
        background: {
          color: {
            value: backgroundColor,
          },
        },
        detectRetina: true,
        ...particlesOptions,
      });
      
      setContainer(engine);
    };
    
    loadParticles();
    
    return () => {
      if (container) {
        container.destroy();
      }
    };
  }, [particleColor, particleSize, particleCount, id, particleDensity, speed, minSize, maxSize, backgroundColor, particlesOptions]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-hidden", className)}
      onMouseMove={showCursor ? handleMouseMove : undefined}
      style={{ background: showBackground ? backgroundColor : 'transparent' }}
    >
      <div id={id} className="absolute top-0 left-0 w-full h-full" />
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
      
      {showCursor && (
        <motion.div 
          className="pointer-events-none absolute h-4 w-4 rounded-full bg-white mix-blend-difference"
          style={{
            x: followX,
            y: followY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </div>
  );
};
