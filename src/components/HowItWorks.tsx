
import React from 'react';
import { ChartBar, Brain, CircleDollarSign } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 flex items-center justify-center bg-trading-light-blue rounded-full mb-4">
              <ChartBar className="w-7 h-7 text-trading-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
            <p className="text-muted-foreground">Our system gathers real-time market data, economic indicators, and news from around the world.</p>
            <div className="absolute -right-4 top-1/2 hidden md:block">
              <ArrowShape />
            </div>
          </div>
          
          <div className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 flex items-center justify-center bg-trading-light-blue rounded-full mb-4">
              <Brain className="w-7 h-7 text-trading-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">Advanced machine learning models analyze patterns and generate predictions with high accuracy.</p>
            <div className="absolute -right-4 top-1/2 hidden md:block">
              <ArrowShape />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 flex items-center justify-center bg-trading-light-blue rounded-full mb-4">
              <CircleDollarSign className="w-7 h-7 text-trading-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trade Execution</h3>
            <p className="text-muted-foreground">Trades are executed automatically according to your risk profile with no manual intervention needed.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple arrow shape component
const ArrowShape = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default HowItWorks;
