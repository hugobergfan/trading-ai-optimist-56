
import { HeroWithMockup } from "@/components/ui/hero-with-mockup"

export function HeroDemo() {
  return (
    <HeroWithMockup
      title="Build AI-powered trading solutions"
      description="Create sophisticated trading algorithms with our intuitive platform. No ML expertise required."
      primaryCta={{
        text: "Start Building",
        href: "/signup",
      }}
      secondaryCta={{
        text: "View on GitHub",
        href: "https://github.com/tradingai-platform",
      }}
      mockupImage={{
        alt: "AI Trading Platform Dashboard",
        width: 1248,
        height: 765,
        src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1248&h=765"
      }}
    />
  )
}
