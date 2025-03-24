
import React from 'react';
import Button from './Button';
import PerformanceCard from './PerformanceCard';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance animate-fade-in" style={{animationDelay: "0.1s"}}>
            AI-Powered Trading Bot for <span className="text-trading-blue">Maximum Returns</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 text-balance animate-fade-in" style={{animationDelay: "0.3s"}}>
            Our advanced AI algorithm analyzes market patterns to execute profitable trades automatically. 
            Experience the future of trading with proven results.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <Button className="transition-all duration-300 hover:scale-105">Start Trading</Button>
            <Button variant="outline" className="transition-all duration-300 hover:scale-105">Try Free Demo</Button>
            <button className="px-6 py-2 rounded-lg border border-gray-300 font-medium text-foreground/90 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <PerformanceCard 
              title="Stock Market Returns" 
              percentage={244} 
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <PerformanceCard 
              title="Penny Stocks Returns" 
              percentage={533} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
