
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PerformanceCard from '@/components/PerformanceCard';
import { SparklesDemo } from '@/components/SparklesDemo';
import sharePredictionsApi, { MarketBarometer } from '@/services/sharePredictionsApi';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [apiConnected, setApiConnected] = useState(false);
  
  // Market Barometer data fetch
  const { 
    data: marketData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['marketBarometer'],
    queryFn: async () => {
      try {
        // For now we're using a dummy API key method since we're simplifying auth
        // In a real app, this would use proper authentication
        localStorage.setItem('sharePredictions_apiKey', 'waHdJ6pK9yiFdMnyGNBCfWGENw_ur-9AUkVPg-hLN0w');
        
        const response = await sharePredictionsApi.getMarketBarometer({
          ordering: '-latest_market_date',
          limit: 1
        });
        
        setApiConnected(true);
        return response.results[0];
      } catch (err) {
        console.error('Failed to fetch market data:', err);
        setApiConnected(false);
        throw err;
      }
    },
    retry: 1,
    enabled: isAuthenticated
  });
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleRefreshData = () => {
    refetch();
    toast({
      title: "Refreshing data",
      description: "Fetching the latest market predictions",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
            {userName && (
              <p className="text-sm text-gray-600">Welcome, {userName}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {apiConnected ? (
              <span className="text-sm text-green-600 flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                API Connected
              </span>
            ) : (
              <span className="text-sm text-red-600 flex items-center">
                <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                API Disconnected
              </span>
            )}
            <Button onClick={handleRefreshData} variant="outline" size="sm" className="mr-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={logout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Content */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Market Barometer</h2>
            {marketData && (
              <div className="text-sm text-gray-500">
                <p>Latest market date: {marketData.latest_market_date}</p>
                <p>Valid until: {marketData.prediction_valid_until}</p>
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : isError ? (
            <Card className="p-6 bg-red-50 border-red-200">
              <CardTitle className="text-red-600 mb-2">Error Loading Market Data</CardTitle>
              <CardDescription>
                {error instanceof Error ? error.message : "Failed to load market data. Please try again."}
              </CardDescription>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={handleRefreshData}
              >
                Try Again
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PerformanceCard 
                title="Overall Market" 
                percentage={marketData ? Math.round(marketData.market_v_weighted_avg_pred * 100) : 78}
                period="Until Tomorrow"
              />
              <PerformanceCard 
                title="Top 500 Companies" 
                percentage={marketData ? Math.round(marketData.top_500_v_weighted_avg_pred * 100) : 83}
                period="Until Tomorrow"
              />
              <PerformanceCard 
                title="Penny Stocks" 
                percentage={marketData ? Math.round(marketData.penny_stocks_v_weighted_avg_pred * 100) : 62}
                period="Until Tomorrow"
              />
            </div>
          )}
        </section>

        {/* Demo Section */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Sparkles Demo</CardTitle>
              <CardDescription>
                Interactive particle effects demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SparklesDemo />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
