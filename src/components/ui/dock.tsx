
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AppleStyleDockProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppleStyleDock({ className, ...props }: AppleStyleDockProps) {
  return (
    <div
      className={cn(
        "mb-4 flex h-16 items-end gap-4 rounded-2xl bg-black/10 px-4 pb-2.5 backdrop-blur dark:bg-white/10",
        className
      )}
      {...props}
    />
  );
}

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Dock({ className, children, ...props }: DockProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-end gap-4 rounded-2xl bg-black/10 px-4 pb-2.5 backdrop-blur dark:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface DockItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DockItem({ className, children, ...props }: DockItemProps) {
  return (
    <div
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 ease-in-out hover:h-12 hover:w-12 hover:-translate-y-2 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface DockIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DockIcon({ className, children, ...props }: DockIconProps) {
  return (
    <button
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface DockLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DockLabel({ className, children, ...props }: DockLabelProps) {
  return (
    <div 
      className={cn(
        "absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Export all components as named exports
export { 
  AppleStyleDock as Dock,
  DockItem,
  DockIcon,
  DockLabel
};
