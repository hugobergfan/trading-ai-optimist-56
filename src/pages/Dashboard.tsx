import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign,
  BarChart,
  Info,
  Filter
} from 'lucide-react';
import { toast } from "sonner";
import PerformanceCard from '@/components/PerformanceCard';
import TickerSearch from '@/components/TickerSearch';
import TickerPrediction from '@/components/TickerPrediction';
import CompanyPerformanceChart from '@/components/CompanyPerformanceChart';
import StockChart from '@/components/StockChart';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import sharePredictionsApi, { 
  MarketBarometer, 
  Ticker, 
  TickerPrediction as TickerPredictionType 
} from '@/services/sharePredictionsApi';
import { useQuery } from '@tanstack/react-query';
import AiInsights from '@/components/AiInsights';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { isAuthenticated, logout, userName, apiKey } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const [showPennyStocks, setShowPennyStocks] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [newApiKey, setNewApiKey] = useState<string>('');
  
  const { 
    data: marketData, 
    isLoading: isLoadingMarket, 
    isError: isErrorMarket, 
    refetch: refetchMarket 
  } = useQuery({
    queryKey: ['marketBarometer'],
    queryFn: async () => {
      try {
        console.log('Fetching market data with API key:', apiKey);
        const response = await sharePredictionsApi.getMarketBarometer({
          ordering: '-latest_market_date',
          limit: 1
        });
        
        return response.results[0];
      } catch (err) {
        console.error('Failed to fetch market data:', err);
        throw err;
      }
    },
    retry: 1,
    enabled: isAuthenticated
  });
  
  const { 
    data: tickers, 
    isLoading: isLoadingTickers, 
    isError: isErrorTickers, 
    refetch: refetchTickers 
  } = useQuery({
    queryKey: ['tickers', searchQuery],
    queryFn: async () => {
      try {
        return await sharePredictionsApi.getTickers(searchQuery);
      } catch (err) {
        console.error('Failed to fetch tickers:', err);
        throw err;
      }
    },
    enabled: isAuthenticated && activeTab === 'tickers'
  });
  
  const {
    data: tickerPredictions,
    isLoading: isLoadingPredictions,
    isError: isErrorPredictions,
    refetch: refetchPredictions
  } = useQuery({
    queryKey: ['tickerPredictions', selectedTicker?.ticker],
    queryFn: async () => {
      if (!selectedTicker) return null;
      try {
        const response = await sharePredictionsApi.getTickerPredictions({
          ticker: selectedTicker.ticker,
          ordering: '-latest_market_date',
          limit: 10
        });
        return response.results;
      } catch (err) {
        console.error('Failed to fetch ticker predictions:', err);
        throw err;
      }
    },
    enabled: !!selectedTicker && isAuthenticated
  });
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSelectTicker = (ticker: Ticker) => {
    setSelectedTicker(ticker);
    toast.success(`Loading prediction data for ${ticker.ticker}`);
    setActiveTab('ticker-detail');
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    refetchTickers();
  };

  const handleRefreshData = () => {
    refetchMarket();
    refetchTickers();
    if (selectedTicker) {
      refetchPredictions();
    }
    
    toast.success("Refreshing all data");
  };

  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  const handleUpdateApiKey = () => {
    if (newApiKey.trim()) {
      sharePredictionsApi.login(newApiKey.trim())
        .then(success => {
          if (success) {
            toast.success("API key updated successfully");
            setIsApiKeyModalOpen(false);
            handleRefreshData();
          } else {
            toast.error("Invalid API key");
          }
        })
        .catch(() => {
          toast.error("Error updating API key");
        });
    }
  };

  const isMarketPositive = marketData && marketData.market_v_weighted_avg_pred > 0.5;
  const isTop500Positive = marketData && marketData.top_500_v_weighted_avg_pred > 0.5;
  const isPennyStocksPositive = marketData && marketData.penny_stocks_v_weighted_avg_pred > 0.5;

  const marketTrendData = [
    { name: 'Jan', market: 40, top500: 45, penny: 30 },
    { name: 'Feb', market: 45, top500: 50, penny: 35 },
    { name: 'Mar', market: 55, top500: 60, penny: 40 },
    { name: 'Apr', market: 60, top500: 65, penny: 45 },
    { name: 'May', market: 65, top500: 70, penny: 55 },
    { name: 'Jun', market: 70, top500: 75, penny: 60 },
    { name: 'Jul', market: marketData ? Math.round(marketData.market_v_weighted_avg_pred * 100) : 65, 
             top500: marketData ? Math.round(marketData.top_500_v_weighted_avg_pred * 100) : 70, 
             penny: marketData ? Math.round(marketData.penny_stocks_v_weighted_avg_pred * 100) : 55 },
  ];

  return (
    <DashboardLayout 
      onRefresh={handleRefreshData} 
      onSearch={handleSearch}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 sm:w-[500px]">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="tickers">Tickers</TabsTrigger>
          <TabsTrigger value="ticker-detail">Predictions</TabsTrigger>
          <TabsTrigger value="documentation">API Docs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Market Barometer</h2>
            {marketData && (
              <div className="text-sm text-gray-500">
                <p>Latest market date: {marketData.latest_market_date}</p>
                <p>Prediction valid until: {marketData.prediction_valid_until}</p>
              </div>
            )}
          </div>
          
          {isLoadingMarket ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : isErrorMarket ? (
            <Card className="p-6 bg-red-50 border-red-200">
              <CardTitle className="text-red-600 mb-2">Error Loading Market Data</CardTitle>
              <CardDescription>
                The API might be unavailable or you may need to update your API key.
              </CardDescription>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={handleRefreshData}
              >
                Try Again
              </Button>
            </Card>
          ) : marketData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PerformanceCard 
                  title="Overall Market" 
                  percentage={Math.round(marketData.market_v_weighted_avg_pred * 100)}
                  period="Price Increase Likelihood"
                  icon={isMarketPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                />
                <PerformanceCard 
                  title="Top 500 Companies" 
                  percentage={Math.round(marketData.top_500_v_weighted_avg_pred * 100)}
                  period="Price Increase Likelihood"
                  icon={isTop500Positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                />
                <PerformanceCard 
                  title="Penny Stocks" 
                  percentage={Math.round(marketData.penny_stocks_v_weighted_avg_pred * 100)}
                  period="Price Increase Likelihood"
                  icon={isPennyStocksPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                />
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Market Trend Analysis</CardTitle>
                  <CardDescription>
                    Showing prediction trends across different market segments over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ChartContainer
                      config={{
                        market: { 
                          label: "Overall Market",
                          color: "#8B5CF6" 
                        },
                        top500: { 
                          label: "Top 500",
                          color: "#0EA5E9" 
                        },
                        penny: { 
                          label: "Penny Stocks",
                          color: "#F97316" 
                        },
                      }}
                    >
                      <LineChart data={marketTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="market" 
                          name="market" 
                          stroke="var(--color-market, #8B5CF6)" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="top500" 
                          name="top500" 
                          stroke="var(--color-top500, #0EA5E9)" 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="penny" 
                          name="penny" 
                          stroke="var(--color-penny, #F97316)" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Market Prediction Insights</CardTitle>
                  <CardDescription>
                    Predictions are generated daily (around 6:00 am EST) on trading days and are valid for 10 market days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Understanding the Predictions</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        The percentage values represent the likelihood of price increase. A value above 50% forecasts a price increase relative to the reference price, while below 50% indicates a likely decrease.
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <TrendingUp className="text-green-600 mr-2 h-5 w-5" />
                        <span>Values &gt; 50%: Bullish prediction</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingDown className="text-red-600 mr-2 h-5 w-5" />
                        <span>Values &lt; 50%: Bearish prediction</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Important Dates</h3>
                      <div className="flex items-start mb-2">
                        <Calendar className="text-blue-600 mr-2 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="font-medium">Latest Market Date: {marketData.latest_market_date}</p>
                          <p className="text-sm text-gray-600">The most recent market day used for generating predictions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="text-purple-600 mr-2 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="font-medium">Valid Until: {marketData.prediction_valid_until}</p>
                          <p className="text-sm text-gray-600">The expiration date of the prediction validity</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <AiInsights marketData={marketData} />
            </>
          ) : (
            <p className="text-center py-10 text-gray-500">No market data available</p>
          )}
        </TabsContent>
        
        <TabsContent value="tickers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Available Tickers</CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPennyStocks(!showPennyStocks)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showPennyStocks ? "Show All Stocks" : "Show Penny Stocks"}
                  </Button>
                </div>
              </div>
              <CardDescription>
                Browse and search from our comprehensive list of supported stock tickers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingTickers ? (
                <div className="p-6 flex justify-center">
                  <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              ) : isErrorTickers ? (
                <div className="p-6 text-center text-red-500">
                  Failed to load tickers. Please try again.
                </div>
              ) : tickers && tickers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickers.map((ticker) => (
                        <TableRow key={ticker.ticker}>
                          <TableCell className="font-medium">{ticker.ticker}</TableCell>
                          <TableCell>{ticker.name}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              onClick={() => handleSelectTicker(ticker)}
                            >
                              View Predictions
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No tickers found. Please try a different search term.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-gray-500">
                {tickers ? `Showing ${tickers.length} tickers` : "No tickers to display"}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ticker-detail" className="space-y-6">
          {!selectedTicker ? (
            <Card>
              <CardHeader>
                <CardTitle>Ticker Predictions</CardTitle>
                <CardDescription>
                  Select a ticker from the Tickers tab to view detailed predictions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <BarChart className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Ticker Selected</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                  Go to the Tickers tab to search and select a stock ticker to view detailed prediction data.
                </p>
                <Button
                  onClick={() => setActiveTab('tickers')}
                >
                  Browse Tickers
                </Button>
              </CardContent>
            </Card>
          ) : isLoadingPredictions ? (
            <Card>
              <CardHeader>
                <CardTitle>Loading Predictions for {selectedTicker.ticker}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-12">
                <div className="flex space-x-2 animate-pulse">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ) : isErrorPredictions ? (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle>Error Loading Predictions</CardTitle>
                <CardDescription>
                  Could not load prediction data for {selectedTicker.ticker}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">The API might be unavailable or you may need to update your API key.</p>
                <Button 
                  variant="outline" 
                  onClick={() => refetchPredictions()}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : tickerPredictions && tickerPredictions.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTicker.ticker}</h2>
                  <p className="text-gray-500">{selectedTicker.name}</p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab('tickers')}>
                  Back to Tickers
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Prediction</CardTitle>
                    <CardDescription>
                      For {tickerPredictions[0].latest_market_date}, valid until {tickerPredictions[0].prediction_valid_until}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Price Increase Likelihood</p>
                          <p className={`text-2xl font-bold ${tickerPredictions[0].price_increase_likelihood > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatPercentage(tickerPredictions[0].price_increase_likelihood)}
                          </p>
                        </div>
                        <div className={`p-3 rounded-full ${tickerPredictions[0].price_increase_likelihood > 0.5 ? 'bg-green-100' : 'bg-red-100'}`}>
                          {tickerPredictions[0].price_increase_likelihood > 0.5 ? (
                            <TrendingUp className="h-6 w-6 text-green-600" />
                          ) : (
                            <TrendingDown className="h-6 w-6 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Reference Price</p>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            <p className="text-xl font-bold">{tickerPredictions[0].reference_price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">5-Day Volatility</p>
                          <p className="text-xl font-bold">{formatPercentage(tickerPredictions[0].last_5_days_volatility)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Prediction Explanation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-gray-600">
                      This prediction indicates a {tickerPredictions[0].price_increase_likelihood > 0.5 ? 'positive' : 'negative'} outlook for {selectedTicker.ticker} stock price movement.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">What does this mean?</p>
                          <p className="text-sm text-gray-600">
                            A prediction value of {formatPercentage(tickerPredictions[0].price_increase_likelihood)} means there is a {formatPercentage(tickerPredictions[0].price_increase_likelihood)} probability that the stock price will {tickerPredictions[0].price_increase_likelihood > 0.5 ? 'increase' : 'decrease'} from the reference price of ${tickerPredictions[0].reference_price.toFixed(2)}.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Prediction Timeframe</p>
                          <p className="text-sm text-gray-600">
                            This prediction is valid from {tickerPredictions[0].latest_market_date} until {tickerPredictions[0].prediction_valid_until}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {tickerPredictions.length > 1 && (
                <CompanyPerformanceChart predictions={tickerPredictions} />
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Historical Predictions</CardTitle>
                  <CardDescription>
                    Track how predictions for {selectedTicker.ticker} have changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Market Date</TableHead>
                          <TableHead>Valid Until</TableHead>
                          <TableHead>Likelihood</TableHead>
                          <TableHead>Reference Price</TableHead>
                          <TableHead>Volatility</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tickerPredictions.map((prediction, index) => (
                          <TableRow key={index}>
                            <TableCell>{prediction.latest_market_date}</TableCell>
                            <TableCell>{prediction.prediction_valid_until}</TableCell>
                            <TableCell className={prediction.price_increase_likelihood > 0.5 ? 'text-green-600' : 'text-red-600'}>
                              {formatPercentage(prediction.price_increase_likelihood)}
                            </TableCell>
                            <TableCell>${prediction.reference_price.toFixed(2)}</TableCell>
                            <TableCell>{formatPercentage(prediction.last_5_days_volatility)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              <AiInsights ticker={selectedTicker.ticker} tickerData={tickerPredictions[0]} />
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Predictions Available</CardTitle>
                <CardDescription>
                  We couldn't find any predictions for {selectedTicker.ticker}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  This could be because the ticker is newly added or there is no recent prediction data available.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => refetchPredictions()}
                >
                  Check Again
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Learn how to use the Share Predictions API for your own applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Authentication</h3>
                <p className="text-sm text-gray-600 mb-4">
                  All API requests require authentication using an API key. Include the following header in all your requests:
                </p>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mb-2">
                  Authorization: Api-Key YOUR_API_KEY
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Available Endpoints</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-1">Tickers</h4>
                    <p className="text-sm text-gray-600 mb-2">Get a list of all available stock tickers</p>
                    <div className="bg-gray-100 p-2 rounded-md font-mono text-xs mb-2">
                      GET https://www.sharepredictions.com/api/tickers/
                    </div>
                    <p className="text-xs text-gray-500">Optional query parameters: search, limit, offset</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-1">Market Barometer</h4>
                    <p className="text-sm text-gray-600 mb-2">Get aggregated market predictions</p>
                    <div className="bg-gray-100 p-2 rounded-md font-mono text-xs mb-2">
                      GET https://www.sharepredictions.com/api/market-barometer/
                    </div>
                    <p className="text-xs text-gray-500">Optional query parameters: latest_market_date, prediction_sent_on, ordering, limit, offset</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-1">Ticker Predictions</h4>
                    <p className="text-sm text-gray-600 mb-2">Get predictions for specific tickers</p>
                    <div className="bg-gray-100 p-2 rounded-md font-mono text-xs mb-2">
                      GET https://www.sharepredictions.com/api/ticker-predictions/
                    </div>
                    <p className="text-xs text-gray-500">Optional query parameters: ticker, latest_market_date, prediction_sent_on, ordering, limit, offset</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Code Examples</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Python Example</h4>
                    <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-x-auto">
{`import requests

url = 'https://www.sharepredictions.com/api/tickers/'
headers = {
    'Authorization': 'Api-Key YOUR_API_KEY'
}
params = {
    'search': 'AAPL'  # Optional
}
response = requests.get(url, headers=headers, params=params)
print(response.json())`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">JavaScript Example</h4>
                    <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-x-auto">
{`async function fetchPredictions() {
  const response = await fetch('https://www.sharepredictions.com/api/ticker-predictions/?ticker=AAPL', {
    headers: {
      'Authorization': 'Api-Key YOUR_API_KEY'
    }
  });
  
  const data = await response.json();
  console.log(data);
}

fetchPredictions();`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" style={{ display: isApiKeyModalOpen ? 'flex' : 'none' }}>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Update API Key</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your Share Predictions API key. You can find this in your account profile at <a href="https://www.sharepredictions.com/users/profile/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">sharepredictions.com</a>.
            </p>
            <Input
              type="text"
              placeholder="API Key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsApiKeyModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateApiKey}>
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
