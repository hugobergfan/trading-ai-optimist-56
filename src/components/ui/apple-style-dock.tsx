
import { useState } from 'react';
import { AppleStyleDock as Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';
import { BarChart, Home, BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function AppleStyleDock() {
  const [mouseX, setMouseX] = useState(Infinity);
  const navigate = useNavigate();
  
  const handleIconClick = (name: string, path: string) => {
    toast.success(`${name} clicked! Navigating to ${name} section.`);
    navigate(path);
  };
  
  return (
    <div className="border-t bg-white bg-opacity-80 backdrop-blur-md w-full dark:bg-black dark:bg-opacity-80 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-40 flex justify-center">
      <Dock>
        <DockItem onClick={() => handleIconClick('Home', '/')}>
          <DockIcon>
            <Home className="h-6 w-6 text-blue-600" />
          </DockIcon>
          <DockLabel>Home</DockLabel>
        </DockItem>
        
        <DockItem onClick={() => handleIconClick('Dashboard', '/dashboard')}>
          <DockIcon>
            <BarChart className="h-6 w-6 text-green-600" />
          </DockIcon>
          <DockLabel>Dashboard</DockLabel>
        </DockItem>
        
        <DockItem onClick={() => handleIconClick('Docs', '/api-docs')}>
          <DockIcon>
            <BookOpen className="h-6 w-6 text-amber-600" />
          </DockIcon>
          <DockLabel>Docs</DockLabel>
        </DockItem>
        
        <DockItem onClick={() => handleIconClick('About', '/about')}>
          <DockIcon>
            <Users className="h-6 w-6 text-purple-600" />
          </DockIcon>
          <DockLabel>About</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
}
