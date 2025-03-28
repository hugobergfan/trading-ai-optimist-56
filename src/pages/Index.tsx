
import React, { useEffect } from 'react';
import { HeroDemo } from '@/components/HeroDemo';
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
import { Header1 } from '@/components/ui/header';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    document.title = 'Finox.ai - Research-Backed Trading Analysis';
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    toast.success("Scrolled to top!");
  };
  
  return (
    <div className="min-h-screen bg-background relative font-extralight">
      {/* Main header */}
      <Header1 />
      
      {/* Add spacing to account for fixed header */}
      <div className="pt-20">
        <main className="animate-fade-in">
          <HeroDemo />
          <HowItWorks />
          <KeyFeatures />
          <Testimonials />
          <PerformanceComparison />
          <FAQ />
          <DisclaimerAndContact />
          
          {/* Back to top button */}
          <div className="fixed bottom-8 right-8 z-40 animate-fade-in" style={{
            animationDelay: '1.5s'
          }}>
            <Button 
              size="icon" 
              className="rounded-full shadow-lg" 
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </main>
        <Footer />
        <AppleStyleDock />
      </div>
    </div>
  );
};

export default Index;
