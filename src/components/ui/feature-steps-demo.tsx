
import { FeatureSteps } from "@/components/ui/feature-steps"

const features = [
  { 
    step: 'Step 1', 
    title: 'Connect Your Account',
    content: 'Link your trading account through our secure API integration. We support major exchanges and brokers with read-only API keys to ensure your funds remain secure.', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: 'Step 2',
    title: 'Set Your Strategy',
    content: 'Choose from proven strategies or customize your own. Define risk tolerance, target assets, and trading frequency while our AI adapts to market conditions.',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 3',
    title: 'AI Takes Control',
    content: 'Let our advanced algorithms work for you. The AI continually learns and improves while you monitor performance through our dashboard.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop'
  },
]

export function FeatureStepsDemo() {
  return (
    <FeatureSteps 
      features={features}
      title="How It Works"
      autoPlayInterval={5000}
    />
  )
}
