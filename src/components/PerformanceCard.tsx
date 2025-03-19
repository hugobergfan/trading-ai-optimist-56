
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface PerformanceCardProps {
  title: string;
  percentage: number;
  period?: string;
  className?: string;
}

const PerformanceCard = ({ 
  title, 
  percentage, 
  period = "1 year", 
  className 
}: PerformanceCardProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const steps = 60; // Total steps in animation
    const stepDuration = duration / steps;
    const increment = percentage / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep += 1;
      setCount(Math.min(percentage, currentStep * increment));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div 
      className={cn(
        "glass-card p-6 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-md animate-fade-up",
        className
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>
      <div className="flex items-baseline">
        <span className="text-4xl md:text-5xl font-bold text-trading-blue">
          {Math.round(count)}
        </span>
        <span className="text-xl md:text-2xl font-semibold ml-1">%</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Returns over {period}
      </p>
    </div>
  );
};

export default PerformanceCard;
