'use client';

import React, { useMemo, type JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}
export function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);
  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);
  return <MotionComponent initial={{
    backgroundPosition: '100% center'
  }} animate={{
    backgroundPosition: '0% center'
  }} transition={{
    repeat: Infinity,
    duration,
    ease: 'linear'
  }} style={{
    '--spread': `${dynamicSpread}px`,
    backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`
  } as React.CSSProperties} className="">
      {children}
    </MotionComponent>;
}