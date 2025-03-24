import { Hero } from "@/components/ui/hero";
import { Brain } from "lucide-react";

export function HeroDemo() {
  return (
    <Hero
      pill={{
        text: "AI-Powered Trading",
        href: "/features",
        icon: <Brain className="h-4 w-4" />,
        variant: "default",
        size: "md",
      }}
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
