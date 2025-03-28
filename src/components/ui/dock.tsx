"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AppleStyleDockProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppleStyleDock({ className, ...props }: AppleStyleDockProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex justify-center",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-16 items-end gap-4 rounded-2xl bg-black/10 px-4 pb-2.5 backdrop-blur dark:bg-white/10">
        <DockItem>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2/2235.png"
            alt="Finder"
            className="h-full w-full"
          />
        </DockItem>
        <DockItem>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968770.png"
            alt="Safari"
            className="h-full w-full"
          />
        </DockItem>
        <DockItem>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2/2235.png"
            alt="Messages"
            className="h-full w-full"
          />
        </DockItem>
        <DockItem>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968770.png"
            alt="Mail"
            className="h-full w-full"
          />
        </DockItem>
        <DockItem>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2/2235.png"
            alt="Maps"
            className="h-full w-full"
          />
        </DockItem>
        <DockItem>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968770.png"
            alt="Photos"
            className="h-full w-full"
          />
        </DockItem>
      </div>
    </div>
  );
}

interface DockItemProps extends React.HTMLAttributes<HTMLDivElement> {}

function DockItem({ className, children, ...props }: DockItemProps) {
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
