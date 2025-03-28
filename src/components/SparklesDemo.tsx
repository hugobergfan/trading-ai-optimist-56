
import React from 'react';
import { Sparkles } from '@/components/ui/sparkles';

const SparklesDemo = () => (
  <div className="flex flex-wrap justify-center gap-10 items-center py-10">
    <Sparkles 
      id="sparkles-1" 
      className="h-40 w-40" 
      background="#000000"
      particleColor="#ffffff"
      minSize={0.5}
      maxSize={1.5}
      speed={1}
      particleDensity={800}
      showBackground={true}
    >
      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
    </Sparkles>
    
    <Sparkles 
      id="sparkles-2" 
      className="h-40 w-40" 
      background="#0a2463"
      particleColor="#3e92cc"
      minSize={1}
      maxSize={3}
      speed={2}
      particleDensity={600}
      showBackground={true}
    >
      <div className="h-20 w-20 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500" />
    </Sparkles>
    
    <Sparkles 
      id="sparkles-3" 
      className="h-40 w-40" 
      background="#541388"
      particleColor="#ff6b6b"
      minSize={1}
      maxSize={4}
      speed={1.5}
      particleDensity={400}
      showBackground={true}
    >
      <div className="h-20 w-20 rotate-45 bg-gradient-to-r from-lime-500 to-green-500" />
    </Sparkles>
  </div>
);

export { SparklesDemo };
