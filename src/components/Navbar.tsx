
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Button from './Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-trading-blue">
              TradingAI
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="navigation-link active">
              Home
            </a>
            <a href="/about" className="navigation-link">
              About
            </a>
            <a href="/pricing" className="navigation-link">
              Pricing
            </a>
          </div>
          
          <div className="hidden md:block">
            <Button>
              Get Started
            </Button>
          </div>
          
          <button className="md:hidden text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
