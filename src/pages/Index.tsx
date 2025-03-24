
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import KeyFeatures from '@/components/KeyFeatures';
import Testimonials from '@/components/Testimonials';
import PerformanceComparison from '@/components/PerformanceComparison';
import FAQ from '@/components/FAQ';
import DisclaimerAndContact from '@/components/DisclaimerAndContact';
import Footer from '@/components/Footer';
import { AppleStyleDock } from '@/components/ui/apple-style-dock';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import SparklesDemo from '@/components/SparklesDemo';

const Index = () => {
  useEffect(() => {
    document.title = 'TradingAI - AI-Powered Trading Bot';
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <main className="animate-fade-in">
        <HeroSection />
        <HowItWorks />
        <KeyFeatures />
        <Testimonials />
        <PerformanceComparison />
        <SparklesDemo /> {/* Add the SparklesDemo component */}
        <FAQ />
        <DisclaimerAndContact />
        
        {/* Back to top button */}
        <div className="fixed bottom-8 right-8 z-40 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <Button 
            size="icon" 
            onClick={scrollToTop}
            className="rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </main>
      <Footer />
      <AppleStyleDock />
    </div>
  );
};

export default Index;
