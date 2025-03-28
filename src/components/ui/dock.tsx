
// Fix for the dock.tsx file

import * as React from "react";
import { useMotionValue, motion, MotionValue, SpringOptions } from "framer-motion";

// Define types for the Dock context
interface DockContextType {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  magnification: number;
  distance: number;
}

interface DockProviderProps {
  children: React.ReactNode;
  value?: {
    mouseX: MotionValue<number>;
    spring: SpringOptions;
    magnification: number;
    distance: number;
  };
}

// Create the Dock context
const DockContext = React.createContext<DockContextType | null>(null);

// Custom hook to use the Dock context
export const useDock = () => {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error("useDock must be used within a DockProvider");
  }
  return context;
};

// DockProvider component
export const DockProvider = ({ children, value }: DockProviderProps) => {
  // Default values
  const mouseX = value?.mouseX || useMotionValue(0);
  const spring = value?.spring || { stiffness: 200, damping: 15 };
  const magnification = value?.magnification || 1.3;
  const distance = value?.distance || 100;

  return (
    <DockContext.Provider
      value={{
        mouseX,
        spring,
        magnification,
        distance,
      }}
    >
      {children}
    </DockContext.Provider>
  );
};

// Dock component
export const Dock = ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  return <DockProvider>{children}</DockProvider>;
};

// DockCard component
export const DockCard = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div>) => {
  return (
    <motion.div
      style={{ height: "auto", width: 50, overflow: "hidden" }}
      className="dock-card"
      {...props}
    >
      {children}
    </motion.div>
  );
};

// DockIcon component
export const DockIcon = ({
  icon,
  size = 40,
  onClick,
  ...props
}: {
  icon: React.ReactNode;
  size?: number;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { mouseX, spring, magnification, distance } = useDock();
  const ref = React.useRef<HTMLDivElement>(null);
  const [hover, setHover] = React.useState(false);

  // Calculate the distance from the mouse to the center of the icon
  const iconCenter = useMotionValue(0);

  React.useEffect(() => {
    const updateIconCenter = () => {
      if (ref.current) {
        const { left, width } = ref.current.getBoundingClientRect();
        iconCenter.set(left + width / 2);
      }
    };
    updateIconCenter();
    window.addEventListener("resize", updateIconCenter);
    return () => window.removeEventListener("resize", updateIconCenter);
  }, [iconCenter]);

  // Calculate the size of the icon based on the mouse position
  const iconSize = React.useMemo(() => {
    return mouseX.get() === 0
      ? size
      : distance / Math.abs(mouseX.get() - iconCenter.get()) < magnification
      ? size * (distance / Math.abs(mouseX.get() - iconCenter.get()))
      : size * magnification;
  }, [distance, iconCenter, magnification, mouseX, size]);

  // Update the size when the mouse moves
  const onMouseMove = () => {
    if (iconCenter.get() !== 0) {
      const currentSize =
        distance / Math.abs(mouseX.get() - iconCenter.get()) < magnification
          ? size * (distance / Math.abs(mouseX.get() - iconCenter.get()))
          : size * magnification;
      if (currentSize > size) {
        setHover(true);
      } else {
        setHover(false);
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      animate={{ width: hover ? iconSize : size, height: hover ? iconSize : size }}
      transition={{ type: "spring", ...spring }}
      className="cursor-pointer rounded-lg flex items-center justify-center"
      {...props}
    >
      {icon}
    </motion.div>
  );
};

// DockIconContainer component
export const DockIconContainer = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { mouseX } = useDock();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
  };

  return (
    <div
      ref={ref}
      className="flex items-center gap-2 h-16 px-2 rounded-md backdrop-blur-md"
      style={{
        background: "rgba(229, 231, 235, 0.7)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

// DockTooltip component
export const DockTooltip = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md backdrop-blur-md"
      style={{ background: "rgba(229, 231, 235, 0.7)" }}
      {...props}
    >
      {children}
    </div>
  );
};

// Just making sure everything has the right types
export type DockType = typeof Dock;
export type DockIconType = typeof DockIcon;
export type DockCardType = typeof DockCard;
export type DockIconContainerType = typeof DockIconContainer;
export type DockTooltipType = typeof DockTooltip;
