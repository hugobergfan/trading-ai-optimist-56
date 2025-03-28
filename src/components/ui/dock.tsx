
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the props for the dock items
type DockItemProps = {
  children: React.ReactNode;
  key?: string | number;
  label?: string;
  onClick?: () => void;
  className?: string;
  labelClassName?: string;
};

// Define props for the dock container
type DockProps = {
  children: React.ReactNode;
  magnification?: number;
  distance?: number;
  className?: string;
  position?: "bottom" | "left" | "right" | "top";
};

// Animation variants for the dock
const variants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1 },
};

// DockContext for sharing state between components
interface DockContextValue {
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
  magnification: number;
  distance: number;
  position: "bottom" | "left" | "right" | "top";
}

const DockContext = React.createContext<DockContextValue>({
  activeItem: null,
  setActiveItem: () => {},
  magnification: 1.5,
  distance: 100,
  position: "bottom",
});

// Hook to use the dock context
export const useDockContext = () => React.useContext(DockContext);

// Dock Item component
export const DockItem: React.FC<DockItemProps> = ({
  children,
  key,
  label,
  onClick,
  className,
  labelClassName,
}) => {
  const { activeItem, setActiveItem, magnification, position } = useDockContext();
  const [isHovered, setIsHovered] = React.useState(false);
  const id = React.useId();

  // Animation for the dock item
  const baseScale = 1;
  const scale = isHovered ? magnification : baseScale;

  return (
    <div
      className={cn(
        "group relative flex-shrink-0 cursor-pointer transition-all duration-200",
        position === "bottom" || position === "top" ? "mx-1" : "my-1",
        className
      )}
      onMouseEnter={() => {
        setIsHovered(true);
        setActiveItem(id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveItem(null);
      }}
      onClick={onClick}
    >
      <motion.div
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex h-12 w-12 items-center justify-center"
      >
        {children}
      </motion.div>
      
      {label && (
        <DockLabel 
          label={label} 
          isHovered={isHovered} 
          position={position} 
          className={labelClassName} 
        />
      )}
    </div>
  );
};

// Dock Label component
export const DockLabel = ({
  label,
  isHovered,
  position = "bottom",
  className,
}: {
  label: string;
  isHovered: boolean;
  position?: "bottom" | "left" | "right" | "top";
  className?: string;
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-1 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full mt-1 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-1 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-1 top-1/2 -translate-y-1/2";
      default:
        return "top-full mt-1 left-1/2 -translate-x-1/2";
    }
  };

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          className={cn(
            "absolute whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white z-10",
            getPositionStyles(),
            className
          )}
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Dock component
export const Dock: React.FC<DockProps> = ({
  children,
  magnification = 1.5,
  distance = 100,
  className,
  position = "bottom",
}) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  // Determine dock positioning classes
  const positionClasses = {
    bottom: "flex-row bottom-4",
    top: "flex-row top-4",
    left: "flex-col left-4",
    right: "flex-col right-4",
  };

  return (
    <DockContext.Provider
      value={{ activeItem, setActiveItem, magnification, distance, position }}
    >
      <div
        className={cn(
          "fixed flex justify-center items-center z-50",
          positionClasses[position],
          "backdrop-blur-lg bg-black/20 rounded-xl p-2",
          className
        )}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
};
