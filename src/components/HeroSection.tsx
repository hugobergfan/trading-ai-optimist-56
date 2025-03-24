
import React from 'react';
import Button from './Button';
import PerformanceCard from './PerformanceCard';

const HeroSection = () => {
  return (
    <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm relative z-10">
      <div className="container mx-auto max-w-4xl bg-slate-800/70 p-8 rounded-xl border border-slate-600/50 shadow-xl">
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{
          animationDelay: "0.5s"
        }}>
          <Button className="transition-all duration-300 hover:scale-105">Start Trading</Button>
          <Button variant="outline" className="transition-all duration-300 hover:scale-105">Try Free Demo</Button>
          <button className="px-6 py-2 rounded-lg border border-gray-300 font-medium text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="animate-fade-up" style={{
            animationDelay: '0.3s'
          }}>
            <PerformanceCard title="Stock Market Returns" percentage={244} />
          </div>
          <div className="animate-fade-up" style={{
            animationDelay: '0.6s'
          }}>
            <PerformanceCard title="Penny Stocks Returns" percentage={533} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
