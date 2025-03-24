
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Glow } from "@/components/ui/glow";

const ease = [0.16, 1, 0.3, 1];

// Create HeroBadge component since it was imported in the original
const HeroBadge = ({
  href,
  text,
  icon,
  endIcon,
  variant = "default",
  size = "md",
  className,
}: {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const baseClasses = "inline-flex items-center rounded-full gap-2 font-medium";
  
  const variantClasses = {
    default: "bg-primary/10 text-primary hover:bg-primary/20",
    outline: "border border-border hover:bg-accent text-foreground",
    ghost: "hover:bg-accent text-foreground",
  };
  
  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "px-4 py-1.5",
  };
  
  const BadgeContent = () => (
    <>
      {icon}
      <span>{text}</span>
      {endIcon}
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      >
        <BadgeContent />
      </Link>
    );
  }
  
  return (
    <div className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      <BadgeContent />
    </div>
  );
};

interface HeroContentProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
}

function HeroContent({
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
}: HeroContentProps) {
  return (
    <div className="flex flex-col space-y-4">
      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-primary">{titleHighlight}</span>
        )}
      </motion.h1>
      <motion.p
        className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease }}
      >
        {description}
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
      >
        {primaryAction && (
          <Link
            to={primaryAction.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 w-full sm:w-auto justify-center"
            )}
          >
            {primaryAction.icon}
            {primaryAction.text}
          </Link>
        )}
        {secondaryAction && (
          <Link
            to={secondaryAction.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 w-full sm:w-auto justify-center"
            )}
          >
            {secondaryAction.icon}
            {secondaryAction.text}
          </Link>
        )}
      </motion.div>
    </div>
  );
}

interface HeroProps {
  pill?: {
    href?: string;
    text: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
  };
  content: HeroContentProps;
  preview?: React.ReactNode;
}

const Hero = ({ pill, content, preview }: HeroProps) => {
  return (
    <div className="container relative overflow-hidden">
      <Glow variant="above" />
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row items-center py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
          {pill && <HeroBadge {...pill} />}
          <HeroContent {...content} />
        </div>
        {preview && (
          <div className="w-full lg:max-w-xl lg:pl-16 mt-12 lg:mt-0">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
};

export { Hero };
