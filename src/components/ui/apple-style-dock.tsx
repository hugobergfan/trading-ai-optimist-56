
import { useState } from 'react';
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';
import { Sparkles } from '@/components/ui/sparkles';
import { ChartBarIcon, HomeIcon, BookOpenIcon, UsersIcon, PresentationChartLineIcon } from 'lucide-react';
import { toast } from 'sonner';

export function AppleStyleDock() {
  const [mouseX, setMouseX] = useState(Infinity);
  
  const handleIconClick = (name: string) => {
    toast.success(`${name} clicked! This would navigate to the ${name} section.`);
  };

  return (
    <div className="border-t bg-white bg-opacity-80 backdrop-blur-md w-full dark:bg-black dark:bg-opacity-80 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-40">
      <Dock mouseX={mouseX} onMouseMove={setMouseX} onMouseLeave={() => setMouseX(Infinity)}>
        <DockItem onClick={() => handleIconClick('Home')}>
          <DockIcon>
            <HomeIcon size={36} />
          </DockIcon>
          <DockLabel>Home</DockLabel>
        </DockItem>
        
        <DockItem onClick={() => handleIconClick('Charts & Analysis')}>
          <DockIcon>
            <PresentationChartLineIcon size={36} />
          </DockIcon>
          <DockLabel>Charts & Analysis</DockLabel>
        </DockItem>
        
        <DockItem onClick={() => handleIconClick('Research')}>
          <DockIcon>
            <BookOpenIcon size={36} />
          </DockIcon>
          <DockLabel>Research</DockLabel>
        </DockItem>
        
        <DockItem onClick={() => handleIconClick('Community')}>
          <DockIcon>
            <UsersIcon size={36} />
          </DockIcon>
          <DockLabel>Community</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
}
