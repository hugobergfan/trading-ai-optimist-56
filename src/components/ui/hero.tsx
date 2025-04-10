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
  className
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
    ghost: "hover:bg-accent text-foreground"
  };
  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "px-4 py-1.5"
  };
  const BadgeContent = () => <>
      {icon}
      <span>{text}</span>
      {endIcon}
    </>;
  if (href) {
    return;
  }
  return <div className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      <BadgeContent />
    </div>;
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
  secondaryAction
}: HeroContentProps) {
  return <div className="flex flex-col space-y-4 w-full">
      <motion.h1 initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      ease
    }} className="text-4xl tracking-tight sm:text-6xl lg:text-7xl w-full font-extralight xl:text-8xl">
        {title}{" "}
        {titleHighlight && <span className="text-primary">{titleHighlight}</span>}
      </motion.h1>
      <motion.p initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1,
      duration: 0.8,
      ease
    }} className="max-w-[60rem] leading-normal sm:leading-8 font-extralight text-slate-950 sm:text-3xl">
        {description}
      </motion.p>
      <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2,
      duration: 0.8,
      ease
    }}>
        {primaryAction && <Link to={primaryAction.href} className={cn(buttonVariants({
        size: "lg"
      }), "gap-2 w-full sm:w-auto justify-center")}>
            {primaryAction.icon}
            {primaryAction.text}
          </Link>}
        {secondaryAction && <Link to={secondaryAction.href} className={cn(buttonVariants({
        variant: "outline",
        size: "lg"
      }), "gap-2 w-full sm:w-auto justify-center")}>
            {secondaryAction.icon}
            {secondaryAction.text}
          </Link>}
      </motion.div>
    </div>;
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
const Hero = ({
  pill,
  content,
  preview
}: HeroProps) => {
  return <div className="container relative overflow-hidden max-w-7xl">
      <Glow variant="above" />
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row items-center py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 w-full lg:w-3/5">
          {pill && <HeroBadge {...pill} />}
          <HeroContent {...content} />
        </div>
        {preview && <div className="w-full lg:w-2/5 mt-12 lg:mt-0">
            {preview}
          </div>}
      </div>
    </div>;
};
export { Hero };