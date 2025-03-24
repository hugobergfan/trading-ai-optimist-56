
"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground direction="top-right" className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{
          opacity: 0.0,
          y: 40
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut"
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          AI-Powered Trading Bot for <span className="text-trading-blue">Maximum Returns</span>
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          Our advanced AI algorithm analyzes market patterns to execute profitable trades automatically.
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
