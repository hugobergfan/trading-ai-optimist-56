
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ShieldCheck, Clock, BrainCircuit } from 'lucide-react';

const KeyFeatures = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Key Features</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Our platform combines cutting-edge AI with robust trading systems to give you the best trading experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            icon={<BrainCircuit className="w-6 h-6" />}
            title="Real-Time Market Analysis" 
            description="Our AI constantly monitors markets, analyzing patterns that humans might miss, giving you the edge in volatile conditions."
          />
          
          <FeatureCard 
            icon={<Clock className="w-6 h-6" />}
            title="Save Time & Effort" 
            description="No more watching charts all day. Our bot handles the trading while you focus on what matters most to you."
          />
          
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Maximize Returns" 
            description="Our algorithms are optimized to find the most profitable trades while adhering to your risk tolerance."
          />
          
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Advanced Risk Management" 
            description="Sophisticated risk controls ensure your investments are protected from market volatility and unexpected events."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="w-10 h-10 rounded-full bg-trading-light-blue flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default KeyFeatures;
