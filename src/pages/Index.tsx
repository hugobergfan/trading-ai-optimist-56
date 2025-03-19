
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  useEffect(() => {
    document.title = 'TradingAI - AI-Powered Trading Bot';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
