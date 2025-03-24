
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LogOut, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  RefreshCw 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sharePredictionsApi, MarketBarometer, TickerPrediction, Ticker } from '@/services/sharePredictionsApi';
import { format } from 'date-fns';

// Temporarily importing and renaming since we have build errors with PerformanceCard
const PerformanceCard = ({ title, percentage, period }: { title: string; percentage: number; period: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <div className={`text-4xl font-bold mb-1 ${percentage > 50 ? 'text-green-600' : 'text-red-600'}`}>
          {percentage}%
        </div>
        <p className="text-sm text-gray-500">{period}</p>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [marketBarometer, setMarketBarometer] = useState<MarketBarometer | null>(null);
  const [topPredictions, setTopPredictions] = useState<TickerPrediction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [tickerPrediction, setTickerPrediction] = useState<TickerPrediction | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch market barometer
        const marketData = await sharePredictionsApi.getMarketBarometer({
          limit: 1,
          ordering: '-prediction_sent_on'
        });
        
        if (marketData.results.length > 0) {
          setMarketBarometer(marketData.results[0]);
        }
        
        // Fetch top predictions
        const predictionsData = await sharePredictionsApi.getTickerPredictions({
          limit: 10,
          ordering: '-price_increase_likelihood',
          prediction_sent_on: format(new Date(), 'yyyy-MM-dd')
        });
        
        setTopPredictions(predictionsData.results);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [toast]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const results = await sharePredictionsApi.getTickers(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching tickers:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to search tickers. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleTickerSelect = async (ticker: string) => {
    setSelectedTicker(ticker);
    
    try {
      const predictions = await sharePredictionsApi.getTickerPredictions({
        ticker,
        limit: 1,
        ordering: '-prediction_sent_on'
      });
      
      if (predictions.results.length > 0) {
        setTickerPrediction(predictions.results[0]);
      } else {
        setTickerPrediction(null);
        toast({
          title: 'No Predictions',
          description: `No recent predictions found for ${ticker}.`,
        });
      }
    } catch (error) {
      console.error('Error fetching ticker prediction:', error);
      toast({
        title: 'Error',
        description: `Failed to load prediction for ${ticker}.`,
        variant: 'destructive',
      });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Refresh market barometer
      const marketData = await sharePredictionsApi.getMarketBarometer({
        limit: 1,
        ordering: '-prediction_sent_on'
      });
      
      if (marketData.results.length > 0) {
        setMarketBarometer(marketData.results[0]);
      }
      
      // Refresh top predictions
      const predictionsData = await sharePredictionsApi.getTickerPredictions({
        limit: 10,
        ordering: '-price_increase_likelihood',
        prediction_sent_on: format(new Date(), 'yyyy-MM-dd')
      });
      
      setTopPredictions(predictionsData.results);
      
      // Refresh selected ticker if any
      if (selectedTicker) {
        const tickerData = await sharePredictionsApi.getTickerPredictions({
          ticker: selectedTicker,
          limit: 1,
          ordering: '-prediction_sent_on'
        });
        
        if (tickerData.results.length > 0) {
          setTickerPrediction(tickerData.results[0]);
        }
      }
      
      toast({
        title: 'Refreshed',
        description: 'Dashboard data has been refreshed.',
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast({
        title: 'Refresh Error',
        description: 'Failed to refresh dashboard data.',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
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
          <Button onClick={logout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Refresh Button */}
        <div className="mb-6 flex justify-end">
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        {/* Market Barometer Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Market Barometer</h2>
          {isLoading ? (
            <div className="text-center py-8">Loading market data...</div>
          ) : marketBarometer ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PerformanceCard 
                title="Overall Market" 
                percentage={Math.round(marketBarometer.market_v_weighted_avg_pred * 100)}
                period={`Until ${marketBarometer.prediction_valid_until}`}
              />
              <PerformanceCard 
                title="Top 500 Companies" 
                percentage={Math.round(marketBarometer.top_500_v_weighted_avg_pred * 100)}
                period={`Until ${marketBarometer.prediction_valid_until}`}
              />
              <PerformanceCard 
                title="Penny Stocks" 
                percentage={Math.round(marketBarometer.penny_stocks_v_weighted_avg_pred * 100)}
                period={`Until ${marketBarometer.prediction_valid_until}`}
              />
            </div>
          ) : (
            <div className="text-center py-8">No market barometer data available.</div>
          )}
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Stock Search</CardTitle>
              <CardDescription>
                Search for a stock ticker to view predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ticker or company name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch}>Search</Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticker</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow key={result.ticker}>
                          <TableCell className="font-medium">{result.ticker}</TableCell>
                          <TableCell>{result.name}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTickerSelect(result.ticker)}
                            >
                              View Prediction
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {selectedTicker && tickerPrediction && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{selectedTicker} Prediction</CardTitle>
                    <CardDescription>
                      Last updated on {tickerPrediction.prediction_sent_on}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Reference Price</p>
                        <p className="text-2xl font-bold">${tickerPrediction.reference_price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Price Increase Likelihood</p>
                        <div className="flex items-center">
                          <p className="text-2xl font-bold">
                            {Math.round(tickerPrediction.price_increase_likelihood * 100)}%
                          </p>
                          {tickerPrediction.price_increase_likelihood > 0.5 ? (
                            <TrendingUp className="ml-2 text-green-500" />
                          ) : (
                            <TrendingDown className="ml-2 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">5-Day Volatility</p>
                        <p className="text-xl font-semibold">
                          {(tickerPrediction.last_5_days_volatility * 100).toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Valid Until</p>
                        <p className="text-xl font-semibold">{tickerPrediction.prediction_valid_until}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Top Predictions Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Top Predictions Today
              </CardTitle>
              <CardDescription>
                Stocks with the highest price increase likelihood
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading predictions...</div>
              ) : topPredictions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Reference Price</TableHead>
                      <TableHead>Increase Likelihood</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Volatility</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPredictions.map((prediction) => (
                      <TableRow key={prediction.ticker}>
                        <TableCell className="font-medium">{prediction.ticker}</TableCell>
                        <TableCell>${prediction.reference_price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Math.round(prediction.price_increase_likelihood * 100)}%
                            {prediction.price_increase_likelihood > 0.5 ? (
                              <TrendingUp className="ml-2 text-green-500 h-4 w-4" />
                            ) : (
                              <TrendingDown className="ml-2 text-red-500 h-4 w-4" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{prediction.prediction_valid_until}</TableCell>
                        <TableCell>{(prediction.last_5_days_volatility * 100).toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">No predictions available for today.</div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
