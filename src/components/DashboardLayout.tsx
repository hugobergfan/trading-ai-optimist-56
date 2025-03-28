
import React from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Banner } from '@/components/ui/banner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppSidebar from './AppSidebar';
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
  const { isAuthenticated } = useAuth();
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

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <Banner id="welcome-banner" message="🔮 Welcome to Share Predictions Dashboard! Get real-time market insights powered by AI." variant="rainbow" height="2.5rem" />
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
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
      </div>
    </div>
  );
};

export default DashboardLayout;
