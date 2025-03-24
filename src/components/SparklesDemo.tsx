
import React from "react";
import { Sparkles } from "@/components/ui/sparkles";

function SparklesDemo() {
  return (
    <div className="flex flex-col space-y-10 p-10 h-full">
      <h1 className="text-center text-4xl font-bold">Sparkles Effects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden h-[300px] border">
          <Sparkles
            id="tsparticles1"
            className="h-full"
            background="#000000"
            particleColor="#ffffff"
            minSize={0.5}
            maxSize={1.5}
            speed={1}
            particleDensity={800}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">Deep Space</h2>
            </div>
          </Sparkles>
        </div>
        
        <div className="rounded-lg overflow-hidden h-[300px] border">
          <Sparkles
            id="tsparticles2"
            className="h-full"
            background="#0a2463"
            particleColor="#3e92cc"
            minSize={1}
            maxSize={3}
            speed={2}
            particleDensity={600}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">Ocean Depths</h2>
            </div>
          </Sparkles>
        </div>
        
        <div className="rounded-lg overflow-hidden h-[300px] border">
          <Sparkles
            id="tsparticles3"
            className="h-full"
            background="#541388"
            particleColor="#ff6b6b"
            minSize={1}
            maxSize={4}
            speed={1.5}
            particleDensity={400}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">Cosmic Dream</h2>
            </div>
          </Sparkles>
        </div>
        
        <div className="rounded-lg overflow-hidden h-[300px] border">
          <Sparkles
            id="tsparticles4"
            className="h-full"
            background="#2b9348"
            particleColor="#ffe66d"
            minSize={2}
            maxSize={5}
            speed={0.5}
            particleDensity={100}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">Firefly Forest</h2>
            </div>
          </Sparkles>
        </div>
      </div>
    </div>
  );
}

export { SparklesDemo };
