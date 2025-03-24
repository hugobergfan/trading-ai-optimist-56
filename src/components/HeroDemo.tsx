
import { HeroWithMockup } from "@/components/ui/hero-with-mockup"

export function HeroDemo() {
  return (
    <HeroWithMockup
      title="AI-powered trading in minutes, not months"
      description="Create sophisticated trading algorithms with our intuitive TradingAI platform. No ML expertise required."
      primaryCta={{
        text: "Start Trading",
        href: "/signup",
      }}
      secondaryCta={{
        text: "View on GitHub",
        href: "https://github.com/your-trading-platform",
      }}
      mockupImage={{
        alt: "TradingAI Dashboard",
        width: 1248,
        height: 765,
        src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1248&h=765&q=80"
      }}
    />
  )
}
