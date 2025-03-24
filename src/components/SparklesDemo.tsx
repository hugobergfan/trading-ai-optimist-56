
import React from 'react';
import { Sparkles } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";
import { TrendingUp, BarChart4, LineChart, PieChart, ArrowUpRight, Brain, ChartBar } from 'lucide-react';

export function SparklesDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Curved element at the top with enhanced design */}
      <div className="absolute top-0 left-0 w-full h-[200px] overflow-hidden z-0">
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[200%] aspect-[3/1] bg-white dark:bg-zinc-900 rounded-[100%] border-b border-zinc-200 dark:border-zinc-800"></div>
      </div>
      
      {/* Animated floating elements in background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] animate-pulse-slow">
          <BarChart4 className="w-14 h-14 text-trading-blue" />
        </div>
        <div className="absolute top-[20%] right-[15%] animate-pulse-slow" style={{animationDelay: "1.2s"}}>
          <LineChart className="w-10 h-10 text-trading-blue" />
        </div>
        <div className="absolute bottom-[25%] left-[25%] animate-pulse-slow" style={{animationDelay: "0.7s"}}>
          <PieChart className="w-12 h-12 text-trading-blue" />
        </div>
        <div className="absolute bottom-[30%] right-[10%] animate-pulse-slow" style={{animationDelay: "0.3s"}}>
          <Brain className="w-16 h-16 text-trading-blue" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 pt-28 pb-12 px-4 w-full max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full bg-trading-light-blue flex items-center justify-center animate-pulse">
            <TrendingUp className="h-6 w-6 text-trading-blue" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-trading-blue via-blue-600 to-trading-dark-blue animate-fade-in">
          AI-Powered Trading Algorithms
        </h2>
        
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
          Our proprietary neural networks analyze market patterns, macroeconomic indicators, and real-time data to execute high-frequency trades with unmatched precision.
        </p>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fade-in" style={{animationDelay: "0.3s"}}>
          <div className="glass-card p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:shadow-lg transition-all duration-300">
            <div className="font-bold text-xl text-trading-blue">94.7%</div>
            <div className="text-foreground/70 text-sm">Success Rate</div>
          </div>
          <div className="glass-card p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:shadow-lg transition-all duration-300">
            <div className="font-bold text-xl text-trading-blue">0.73ms</div>
            <div className="text-foreground/70 text-sm">Trade Execution</div>
          </div>
          <div className="glass-card p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:shadow-lg transition-all duration-300">
            <div className="font-bold text-xl text-trading-blue">$1.2B</div>
            <div className="text-foreground/70 text-sm">Daily Volume</div>
          </div>
        </div>
        
        {/* Visualization container with particles */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl animate-fade-in" style={{animationDelay: "0.4s"}}>
          {/* Advanced visualization background with gradient */}
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(10,132,255,0.3),transparent_70%)]"></div>
          
          {/* Glowing lines visualization */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTAsMTMyLDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          
          {/* Particles effect */}
          <Sparkles
            className="h-full w-full"
            color="#0A84FF"
            size={2}
            speed={0.8}
            opacity={0.6}
            density={300}
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="glass-card p-6 rounded-xl max-w-md backdrop-blur-sm bg-white/30 dark:bg-black/30 shadow-lg border border-white/30 dark:border-white/10 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Market Performance</h3>
                <span className="text-green-500 flex items-center text-sm font-medium">
                  +32.8% <ArrowUpRight className="ml-1 w-3 h-3" />
                </span>
              </div>
              
              {/* Simulated trading chart */}
              <div className="h-16 w-full relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 20">
                  <path 
                    d="M0,10 L5,8 L10,12 L15,10 L20,13 L25,11 L30,14 L35,12 L40,15 L45,13 L50,16 L55,14 L60,17 L65,15 L70,18 L75,16 L80,19 L85,17 L90,20 L95,18 L100,20" 
                    fill="none" 
                    stroke="rgba(10,132,255,0.8)" 
                    strokeWidth="0.5"
                  />
                  <path 
                    d="M0,10 L5,8 L10,12 L15,10 L20,13 L25,11 L30,14 L35,12 L40,15 L45,13 L50,16 L55,14 L60,17 L65,15 L70,18 L75,16 L80,19 L85,17 L90,20 L95,18 L100,20 L100,20 L0,20 Z" 
                    fill="url(#gradient)" 
                    fillOpacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div className="mt-4 flex justify-between text-xs text-foreground/60">
                <span>24h Analysis</span>
                <span className="flex items-center">
                  <ChartBar className="mr-1 w-3 h-3" /> Neural Network Prediction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient effect */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-trading-blue/10 to-transparent z-0"></div>
    </div>
  );
}
