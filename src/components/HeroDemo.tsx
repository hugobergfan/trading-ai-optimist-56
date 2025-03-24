
import { Hero } from "@/components/ui/hero";

export function HeroDemo() {
  return (
    <Hero
      content={{
        title: "AI-powered trading",
        titleHighlight: "in minutes, not months",
        description:
          "Create sophisticated trading algorithms with our intuitive TradingAI platform. No ML expertise required.",
        primaryAction: {
          href: "/signup",
          text: "Start Trading",
        },
        secondaryAction: {
          href: "https://github.com/your-trading-platform",
          text: "View on GitHub",
        },
      }}
    />
  );
}
