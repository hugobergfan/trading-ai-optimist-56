
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { GlareCardDemo } from '@/components/ui/glare-card-demo';
import { AuthorCardDemo } from '@/components/ui/author-card-demo';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How TradingAI Works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform analyzes market data in real time to execute trades with precision and efficiency
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border border-border/40 shadow-sm bg-card/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>1. Connect Your Account</CardTitle>
              <CardDescription>Link your trading account through our secure API integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We support major exchanges and brokers with read-only API keys to ensure your funds remain secure
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-border/40 shadow-sm bg-card/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>2. Set Your Strategy</CardTitle>
              <CardDescription>Choose from proven strategies or customize your own</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Define risk tolerance, target assets, and trading frequency while our AI adapts to market conditions
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-border/40 shadow-sm bg-card/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>3. AI Takes Control</CardTitle>
              <CardDescription>Let our advanced algorithms work for you</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The AI continually learns and improves while you monitor performance through our dashboard
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-20 mb-10">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Featured Strategies</h3>
          <div className="flex justify-center items-center">
            <GlareCardDemo />
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Expert Insights</h3>
          <AuthorCardDemo />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
