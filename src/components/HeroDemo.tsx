
import React from 'react';
import { TextShimmer } from '@/components/ui/text-shimmer';
import LoginButton from '@/components/LoginButton';

export function HeroDemo() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-5">
      <div className="relative z-10 container max-w-screen-xl mx-auto text-center">
        <TextShimmer 
          as="h1"
          className="text-4xl md:text-7xl font-light tracking-wider mb-6 [--base-color:theme(colors.blue.700)] [--base-gradient-color:theme(colors.blue.400)]"
        >
          AI-Powered Trading
        </TextShimmer>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-light tracking-wide">
          Take advantage of market predictions powered by advanced AI technology.
          Get real-time insights and make informed trading decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <LoginButton />
        </div>
      </div>
    </section>
  );
}
