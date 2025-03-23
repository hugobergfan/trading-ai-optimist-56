
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-trading-blue mb-4">Finox AI</h3>
            <p className="text-muted-foreground mb-4">
              Revolutionizing trading with AI-powered algorithms and advanced analytics.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-trading-blue">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" className="text-muted-foreground hover:text-trading-blue">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-trading-blue">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-trading-blue">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-trading-blue">Home</a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-trading-blue">About Us</a>
              </li>
              <li>
                <a href="/why-us" className="text-muted-foreground hover:text-trading-blue">Why Choose Us</a>
              </li>
              <li>
                <a href="/pricing" className="text-muted-foreground hover:text-trading-blue">Pricing</a>
              </li>
              <li>
                <a href="/docs" className="text-muted-foreground hover:text-trading-blue">Documentation</a>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-muted-foreground hover:text-trading-blue">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-trading-blue">Terms of Service</a>
              </li>
              <li>
                <a href="/risk-disclaimer" className="text-muted-foreground hover:text-trading-blue">Risk Disclaimer</a>
              </li>
              <li>
                <a href="/compliance" className="text-muted-foreground hover:text-trading-blue">Compliance</a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and trading insights.
            </p>
            <div className="flex space-x-2 mb-6">
              <Input
                type="email"
                placeholder="Your email"
                className="max-w-[220px]"
              />
              <Button size="sm" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <span>support@finoxai.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} />
                <span>+1 (888) 555-1234</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span>123 Trading St, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Finox AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <span className="block md:inline">AI-Powered Trading Solutions </span>
            <span className="hidden md:inline mx-2">|</span> 
            <span className="block md:inline">Financial Innovation</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
