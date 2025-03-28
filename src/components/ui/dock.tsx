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
export const DockProvider = ({
  children,
  value
}: DockProviderProps) => {
  // Default values
  const mouseX = value?.mouseX || useMotionValue(0);
  const spring = value?.spring || {
    stiffness: 200,
    damping: 15
  };
  const magnification = value?.magnification || 1.3;
  const distance = value?.distance || 100;
  return <DockContext.Provider value={{
    mouseX,
    spring,
    magnification,
    distance
  }}>
      {children}
    </DockContext.Provider>;
};

// Dock component
export const Dock: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return <DockProvider>{children}</DockProvider>;
};

// DockItem component
export const DockItem: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return;
};

// DockIcon component
interface DockIconProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
export const DockIcon: React.FC<DockIconProps> = ({
  children,
  onClick
}) => {
  const {
    mouseX,
    spring,
    magnification,
    distance
  } = useDock();
  const ref = React.useRef<HTMLDivElement>(null);
  const [hover, setHover] = React.useState(false);

  // Calculate the distance from the mouse to the center of the icon
  const iconCenter = useMotionValue(0);
  React.useEffect(() => {
    const updateIconCenter = () => {
      if (ref.current) {
        const {
          left,
          width
        } = ref.current.getBoundingClientRect();
        iconCenter.set(left + width / 2);
      }
    };
    updateIconCenter();
    window.addEventListener("resize", updateIconCenter);
    return () => window.removeEventListener("resize", updateIconCenter);
  }, [iconCenter]);

  // Calculate the size of the icon based on the mouse position
  const size = 36; // Default size
  const iconSize = React.useMemo(() => {
    return mouseX.get() === 0 ? size : distance / Math.abs(mouseX.get() - iconCenter.get()) < magnification ? size * (distance / Math.abs(mouseX.get() - iconCenter.get())) : size * magnification;
  }, [distance, iconCenter, magnification, mouseX, size]);

  // Update the size when the mouse moves
  const onMouseMove = () => {
    if (iconCenter.get() !== 0) {
      const currentSize = distance / Math.abs(mouseX.get() - iconCenter.get()) < magnification ? size * (distance / Math.abs(mouseX.get() - iconCenter.get())) : size * magnification;
      if (currentSize > size) {
        setHover(true);
      } else {
        setHover(false);
      }
    }
  };
  return <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={() => setHover(false)} onClick={onClick} animate={{
    width: hover ? iconSize : size,
    height: hover ? iconSize : size
  }} transition={{
    type: "spring",
    ...spring
  }} className="cursor-pointer rounded-lg flex items-center justify-center">
      {children}
    </motion.div>;
};

// DockLabel component
export const DockLabel: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return <div className="absolute -top-8 bg-black bg-opacity-80 text-white px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
      {children}
    </div>;
};