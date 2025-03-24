
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
      preview={
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1248&h=765&q=80" 
            alt="TradingAI Dashboard" 
            className="w-full h-auto object-cover"
          />
        </div>
      }
    />
  );
}
