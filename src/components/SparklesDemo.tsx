
import React from 'react';
import { Sparkles } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

export function SparklesDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Curved element at the top */}
      <div className="absolute top-0 left-0 w-full h-[200px] overflow-hidden z-0">
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[200%] aspect-[3/1] bg-white dark:bg-zinc-900 rounded-[100%] border-b border-zinc-200 dark:border-zinc-800 shadow-sm"></div>
      </div>
      
      {/* Gradient background */}
      <div className="relative z-10 pt-28 pb-12 px-4 w-full max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-trading-blue to-trading-dark-blue">
          Experience the Most Advanced Trading Technology
        </h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10">
          Our platform uses state-of-the-art algorithms to analyze market trends and execute trades with precision.
        </p>
        
        {/* Decorative element */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl 
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(10,132,255,0.15),transparent_70%)]">
          <Sparkles
            className="h-full w-full"
            color="#0A84FF"
            size={2}
            speed={0.8}
            opacity={0.6}
            density={300}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass-card p-8 rounded-xl max-w-md backdrop-blur-sm bg-white/30 dark:bg-black/30 shadow-lg border border-white/30 dark:border-white/10">
              <div className="font-semibold text-xl mb-2">94.7%</div>
              <div className="text-foreground/70 text-sm">Success rate across all market conditions</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-trading-blue/10 to-transparent z-0"></div>
    </div>
  );
}
