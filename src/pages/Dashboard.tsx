
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
import TickerSearch from '@/components/TickerSearch';
import TickerPrediction from '@/components/TickerPrediction';
import sharePredictionsApi, { MarketBarometer, Ticker } from '@/services/sharePredictionsApi';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { isAuthenticated, logout, userName, apiKey } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [apiConnected, setApiConnected] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  
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
        console.log('Fetching market data with API key:', apiKey);
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

  const handleSelectTicker = (ticker: Ticker) => {
    setSelectedTicker(ticker);
    toast({
      title: "Ticker Selected",
      description: `Loading prediction data for ${ticker.ticker}`,
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
              <span className="text-sm text-orange-600 flex items-center">
                <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
                Using Demo Data
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
        {/* Market Barometer Section */}
        <section className="mb-12">
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
                Using demo data. The API might be unavailable or you may need to update your API key.
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

        {/* Ticker Search and Prediction Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Stock Predictions</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TickerSearch onSelectTicker={handleSelectTicker} />
            </div>
            <div className="lg:col-span-2">
              <TickerPrediction ticker={selectedTicker} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
