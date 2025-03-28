
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw, Search, BarChart, Info, Home, TrendingUp, LayoutDashboard, Menu, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Banner } from '@/components/ui/banner';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onRefresh,
  onSearch,
  searchQuery = '',
  setSearchQuery = () => {}
}) => {
  const {
    isAuthenticated,
    logout,
    userName
  } = useAuth();
  const navigate = useNavigate();
  
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      toast.success("Refreshing data");
    }
  };
  
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar variant="floating">
          <SidebarHeader className="flex flex-col items-center justify-center p-4">
            <h1 className="text-xl font-bold">SharePredictions</h1>
            <p className="text-xs text-muted-foreground">Market Analysis Dashboard</p>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Home">
                      <a href="/" onClick={e => {
                      e.preventDefault();
                      navigate('/');
                    }}>
                        <Home />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" isActive={window.location.pathname === '/dashboard'}>
                      <a href="/dashboard" onClick={e => {
                      e.preventDefault();
                      navigate('/dashboard');
                    }}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Stocks" isActive={window.location.pathname === '/stocks'}>
                      <a href="/stocks" onClick={e => {
                      e.preventDefault();
                      navigate('/stocks');
                    }}>
                        <TrendingUp />
                        <span>Stock Data</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Predictions" isActive={window.location.pathname === '/predictions'}>
                      <a href="/predictions" onClick={e => {
                      e.preventDefault();
                      navigate('/predictions');
                    }}>
                        <BarChart />
                        <span>Predictions</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            {userName && <div className="text-xs text-muted-foreground mb-2">
                Logged in as: {userName}
              </div>}
            <Button onClick={logout} variant="outline" size="sm" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <Banner id="welcome-banner" message="🔮 Welcome to Share Predictions Dashboard! Get real-time market insights powered by AI." variant="rainbow" height="2.5rem" />
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-2xl font-bold text-gray-900">Market Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative max-w-xs">
                  <Input type="text" placeholder="Search tickers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="pr-10" />
                  <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full" onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>;
};

export default DashboardLayout;
