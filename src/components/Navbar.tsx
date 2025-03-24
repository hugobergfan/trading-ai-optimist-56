
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center animate-fade-in">
            <Link to="/" className="text-xl font-bold text-trading-blue transition-all duration-300 hover:scale-105">
              Finox AI
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Link to="/about" className="navigation-link font-medium">
              About Us
            </Link>
            <Link to="/why-us" className="navigation-link font-medium">
              Why Us
            </Link>
            <Link to="/pricing" className="navigation-link font-medium">
              Pricing
            </Link>
            <Link to="/docs" className="navigation-link font-medium">
              Docs
            </Link>
          </div>
          
          {/* Search bar in the middle */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full transition-all duration-300 hover:shadow-md">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 w-full transition-all duration-300 focus:border-trading-blue"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Login/Signup buttons on the right */}
          <div className="hidden md:flex space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="ghost" className="text-foreground transition-all duration-300 hover:scale-105" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="bg-trading-blue hover:bg-trading-dark-blue transition-all duration-300 hover:scale-105" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
          
          <button className="md:hidden text-foreground animate-fade-in transition-all duration-300 hover:scale-105">
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
