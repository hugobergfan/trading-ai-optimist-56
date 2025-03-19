
import React from 'react';
import PerformanceCard from './PerformanceCard';
import Button from './Button';

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-24 right-0 w-72 h-72 bg-trading-blue/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-12 left-0 w-96 h-96 bg-trading-blue/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h5 className="inline-block px-3 py-1 text-xs font-medium bg-trading-light-blue text-trading-blue rounded-full mb-4 animate-fade-in">
            Powered by Advanced AI
          </h5>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Trade Smarter with AI-Driven Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Our advanced trading bot leverages artificial intelligence to predict market movements with remarkable accuracy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <PerformanceCard 
            title="Stocks Performance" 
            percentage={244} 
            style={{ animationDelay: '0.3s' }}
          />
          <PerformanceCard 
            title="Penny Stocks Performance" 
            percentage={533} 
            style={{ animationDelay: '0.4s' }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <Button size="lg">
            Start Trading Now
          </Button>
          <Button variant="outline" size="lg">
            Learn How It Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
