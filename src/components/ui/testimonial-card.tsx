
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle?: string;
  avatar?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
  return (
    <div className="flex w-[clamp(280px,28vw,400px)] shrink-0 flex-col gap-4 rounded-xl border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{text}</p>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {author.avatar ? (
              <AvatarImage src={author.avatar} alt={author.name} />
            ) : (
              <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{author.name}</span>
            {author.handle && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:underline"
              >
                {author.handle}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
