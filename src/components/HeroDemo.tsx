
import React from 'react';
import { TextShimmer } from '@/components/ui/text-shimmer';
import LoginButton from '@/components/LoginButton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function HeroDemo() {
  const handleResearchClick = () => {
    toast.success("Thank you for your interest! Downloading our latest research paper.");
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-5">
      <div className="relative z-10 container max-w-screen-xl mx-auto text-center">
        <TextShimmer 
          as="h1"
          className="text-4xl md:text-7xl font-extralight tracking-wider mb-6 [--base-color:theme(colors.blue.700)] [--base-gradient-color:theme(colors.blue.400)]"
        >
          Research-Backed Trading
        </TextShimmer>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-extralight tracking-wide">
          Leverage years of market research and analysis powered by our innovative AI technology.
          Our team has been researching market patterns for optimal trading strategies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="font-extralight" onClick={handleResearchClick}>
            Download Research Paper
          </Button>
          <LoginButton />
        </div>
      </div>
    </section>
  );
}
