
import { AuthorCard } from "@/components/ui/author-card";

export function AuthorCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AuthorCard
        backgroundImage="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
        author={{
          name: "Alex Morgan",
          avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=75",
          readTime: "3 min read"
        }}
        content={{
          title: "AI Trading Strategies",
          description: "How our machine learning algorithms identify market opportunities faster than human traders."
        }}
      />
      <AuthorCard
        backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
        author={{
          name: "Jordan Chen",
          avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=75",
          readTime: "5 min read"
        }}
        content={{
          title: "Risk Management",
          description: "Advanced techniques our AI uses to protect your investments during market volatility."
        }}
      />
      <AuthorCard
        backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
        author={{
          name: "Taylor Kim",
          avatar: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=75",
          readTime: "4 min read"
        }}
        content={{
          title: "Performance Analysis",
          description: "How our dashboard helps you track and understand your trading portfolio performance."
        }}
      />
    </div>
  );
}
