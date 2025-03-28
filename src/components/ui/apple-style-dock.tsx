
import { useState } from 'react';
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';
import { Sparkles } from '@/components/ui/sparkles';
import { BarChart, Home, BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';

export function AppleStyleDock() {
  const [mouseX, setMouseX] = useState(Infinity);
  
  const handleIconClick = (name: string) => {
    toast.success(`${name} clicked! This would navigate to the ${name} section.`);
  };

  return (
    <div className="border-t bg-white bg-opacity-80 backdrop-blur-md w-full dark:bg-black dark:bg-opacity-80 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-40">
      <Dock>
        <DockItem>
          <DockIcon onClick={() => handleIconClick('Home')}>
            <Home size={36} />
          </DockIcon>
          <DockLabel>Home</DockLabel>
        </DockItem>
        
        <DockItem>
          <DockIcon onClick={() => handleIconClick('Charts & Analysis')}>
            <BarChart size={36} />
          </DockIcon>
          <DockLabel>Charts & Analysis</DockLabel>
        </DockItem>
        
        <DockItem>
          <DockIcon onClick={() => handleIconClick('Research')}>
            <BookOpen size={36} />
          </DockIcon>
          <DockLabel>Research</DockLabel>
        </DockItem>
        
        <DockItem>
          <DockIcon onClick={() => handleIconClick('Community')}>
            <Users size={36} />
          </DockIcon>
          <DockLabel>Community</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
}
