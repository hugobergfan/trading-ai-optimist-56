
import React, { useEffect } from 'react';
import { AppleStyleDock } from '@/components/ui/apple-style-dock';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Finox AI - AI-Powered Trading Bot';
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About Finox AI</h1>
          
          <div className="space-y-10">
            <section className="prose prose-lg max-w-none">
              <p className="text-xl text-center text-muted-foreground mb-12">
                Revolutionizing trading with AI-powered predictions and automated execution, 
                so you can grow your investments without lifting a finger.
              </p>
            </section>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-trading-blue">AI-Powered Prediction Engine</CardTitle>
                <CardDescription>Our advanced machine learning algorithms analyze market patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  Finox AI utilizes state-of-the-art machine learning models trained on historical market data, economic 
                  indicators, and real-time news feeds to predict market movements with remarkable accuracy. Our AI constantly 
                  learns and adapts to changing market conditions, identifying profitable opportunities that human traders might miss.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-trading-blue">Hands-Off Automated Trading</CardTitle>
                <CardDescription>Let our AI handle the entire trading process</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  Once our AI identifies a trading opportunity, it automatically executes trades on your behalf according to your 
                  predefined risk preferences. No need to monitor charts, set stop-losses, or worry about executing trades at the 
                  right moment. Our secure trading engine handles everything while you focus on what matters most to you.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-trading-blue">Risk Management & Optimization</CardTitle>
                <CardDescription>Smart allocation and advanced risk controls</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  Finox AI doesn't just make trades - it implements sophisticated risk management strategies to protect your capital. 
                  Our system dynamically adjusts position sizes, sets appropriate stop-losses, and diversifies across different 
                  markets to maximize returns while minimizing exposure to market volatility.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xl font-medium">
              Experience the future of investing today with Finox AI - where cutting-edge technology meets financial expertise.
            </p>
          </div>
        </div>
      </main>
      <AppleStyleDock />
    </div>
  );
};

export default AboutUs;
