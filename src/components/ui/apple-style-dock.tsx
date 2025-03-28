import { useState } from 'react';
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';
import { BarChart, Home, BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';
export function AppleStyleDock() {
  const [mouseX, setMouseX] = useState(Infinity);
  const handleIconClick = (name: string) => {
    toast.success(`${name} clicked! This would navigate to the ${name} section.`);
  };
  return <div className="border-t bg-white bg-opacity-80 backdrop-blur-md w-full dark:bg-black dark:bg-opacity-80 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-40">
      
    </div>;
}