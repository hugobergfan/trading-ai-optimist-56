
import { useState } from 'react';
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';

export function AppleStyleDock() {
  const [mouseX, setMouseX] = useState(Infinity);

  return (
    <div className="border-t bg-white bg-opacity-80 backdrop-blur-md w-full dark:bg-black dark:bg-opacity-80 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-40">
      <div 
        className="mx-auto max-w-screen-lg p-2"
        onMouseMove={(e) => {
          setMouseX(e.clientX);
        }}
        onMouseLeave={(e) => {
          setMouseX(Infinity);
        }}
      >
        <Dock className="justify-center">
          <DockItem>
            <DockIcon className="transform transition-all">
              <img 
                src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=200&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGh8ZW58MHx8MHx8fDA%3D" 
                alt="Reports" 
                className="h-full w-full rounded-lg"
              />
            </DockIcon>
            <DockLabel>Reports</DockLabel>
          </DockItem>
          
          <DockItem>
            <DockIcon className="transform transition-all">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww" 
                alt="Dashboard" 
                className="h-full w-full rounded-lg"
              />
            </DockIcon>
            <DockLabel>Dashboard</DockLabel>
          </DockItem>
          
          <DockItem>
            <DockIcon className="transform transition-all">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
                alt="Trading" 
                className="h-full w-full rounded-lg"
              />
            </DockIcon>
            <DockLabel>Trading</DockLabel>
          </DockItem>
          
          <DockItem>
            <DockIcon className="transform transition-all">
              <img 
                src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=200&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0YXRpc3RpY3N8ZW58MHx8MHx8fDA%3D" 
                alt="Analysis" 
                className="h-full w-full rounded-lg"
              />
            </DockIcon>
            <DockLabel>Analysis</DockLabel>
          </DockItem>
          
          <DockItem>
            <DockIcon className="transform transition-all">
              <img 
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWklMjByb2JvdHxlbnwwfHwwfHx8MA%3D%3D" 
                alt="AI" 
                className="h-full w-full rounded-lg"
              />
            </DockIcon>
            <DockLabel>AI</DockLabel>
          </DockItem>
        </Dock>
      </div>
    </div>
  );
}
