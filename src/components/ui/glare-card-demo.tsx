
import { GlareCard } from "@/components/ui/glare-card";

export function GlareCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <GlareCard className="flex flex-col items-start justify-start p-6">
        <h3 className="font-bold text-white text-lg mb-2">1. Connect Your Account</h3>
        <p className="font-medium text-neutral-200 mb-4">
          Link your trading account through our secure API integration
        </p>
        <p className="text-sm text-neutral-300 mt-auto">
          We support major exchanges and brokers with read-only API keys to ensure your funds remain secure
        </p>
      </GlareCard>
      
      <GlareCard className="flex flex-col items-start justify-start p-6">
        <h3 className="font-bold text-white text-lg mb-2">2. Set Your Strategy</h3>
        <p className="font-medium text-neutral-200 mb-4">
          Choose from proven strategies or customize your own
        </p>
        <p className="text-sm text-neutral-300 mt-auto">
          Define risk tolerance, target assets, and trading frequency while our AI adapts to market conditions
        </p>
      </GlareCard>
      
      <GlareCard className="flex flex-col items-start justify-start p-6">
        <h3 className="font-bold text-white text-lg mb-2">3. AI Takes Control</h3>
        <p className="font-medium text-neutral-200 mb-4">
          Let our advanced algorithms work for you
        </p>
        <p className="text-sm text-neutral-300 mt-auto">
          The AI continually learns and improves while you monitor performance through our dashboard
        </p>
      </GlareCard>
    </div>
  );
}
