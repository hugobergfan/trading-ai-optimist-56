
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut, 
  RefreshCw, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  ChartBar, 
  DollarSign,
  Calendar
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import PerformanceCard from '@/components/PerformanceCard';
import StockChart from '@/components/StockChart';
import StockNews from '@/components/StockNews';
import financialApi, { 
  Quote, 
  Ticker, 
  NewsItem, 
  HistoricalData,
  CompanyProfile,
  FinancialData
} from '@/services/financialApi';

const StockDashboard = () => {
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string>('AAPL');
  const [timeframe, setTimeframe] = useState<string>('1mo');
  
  // Fetch top tickers
  const { 
    data: tickers, 
    isLoading: isLoadingTickers, 
    isError: isErrorTickers,
    refetch: refetchTickers 
  } = useQuery({
    queryKey: ['tickers'],
    queryFn: async () => {
      const response = await financialApi.getTickers(10);
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      return response.data || [];
    },
  });
  
  // Fetch real-time quotes
  const { 
    data: quotes, 
    isLoading: isLoadingQuotes, 
    isError: isErrorQuotes,
    refetch: refetchQuotes 
  } = useQuery({
    queryKey: ['quotes', tickers],
    queryFn: async () => {
      if (!tickers || tickers.length === 0) return {};
      
      const symbols = tickers.map(ticker => ticker.symbol);
      const response = await financialApi.getRealTimeQuotes(symbols);
      
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      return response.data || {};
    },
    enabled: !!tickers && tickers.length > 0,
  });
  
  // Fetch market news
  const { 
    data: news, 
    isLoading: isLoadingNews, 
    isError: isErrorNews,
    refetch: refetchNews 
  } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await financialApi.getMarketNews(5);
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      return response.data || [];
    },
  });
  
  // Fetch stock history for selected ticker
  const { 
    data: stockHistory, 
    isLoading: isLoadingHistory, 
    isError: isErrorHistory,
    refetch: refetchHistory 
  } = useQuery({
    queryKey: ['stockHistory', selectedTicker, timeframe],
    queryFn: async () => {
      const response = await financialApi.getStockHistory(selectedTicker, '1d', timeframe);
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      return response.data || [];
    },
    enabled: !!selectedTicker,
  });
  
  // Fetch company profile
  const { 
    data: companyProfile, 
    isLoading: isLoadingProfile, 
    isError: isErrorProfile 
  } = useQuery({
    queryKey: ['companyProfile', selectedTicker],
    queryFn: async () => {
      const response = await financialApi.getStockProfile(selectedTicker);
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!selectedTicker,
  });
  
  // Fetch financial data
  const { 
    data: financialData, 
    isLoading: isLoadingFinancials, 
    isError: isErrorFinancials 
  } = useQuery({
    queryKey: ['financialData', selectedTicker],
    queryFn: async () => {
      const response = await financialApi.getFinancialData(selectedTicker);
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!selectedTicker,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await financialApi.searchTickers(searchQuery);
      if (response.status === 'error') {
        throw new Error(response.error);
      }
      
      if (response.data && response.data.length > 0) {
        setSelectedTicker(response.data[0].symbol);
        toast({
          title: "Ticker found",
          description: `Showing data for ${response.data[0].symbol}`,
        });
      } else {
        toast({
          title: "No results found",
          description: "Try a different search term",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleRefreshAll = () => {
    refetchTickers();
    refetchQuotes();
    refetchNews();
    refetchHistory();
    
    toast({
      title: "Refreshing data",
      description: "Fetching the latest market data",
    });
  };

  const handleSelectTicker = (symbol: string) => {
    setSelectedTicker(symbol);
  };

  const formatLargeNumber = (num: number | undefined) => {
    if (num === undefined) return 'N/A';
    
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    }
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  // Get the quote for the selected ticker
  const selectedQuote = quotes ? 
    Object.values(quotes).find(q => q.symbol === selectedTicker) : 
    undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
            {userName && (
              <p className="text-sm text-gray-600">Welcome, {userName}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative max-w-xs">
              <Input
                type="text"
                placeholder="Search ticker (e.g., AAPL)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleRefreshAll} variant="outline" size="sm">
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
        {/* Market Overview Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoadingQuotes ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
              ))
            ) : isErrorQuotes ? (
              <Card className="col-span-3 p-6 bg-red-50 border-red-200">
                <CardTitle className="text-red-600 mb-2">Error Loading Market Data</CardTitle>
                <CardDescription>
                  Could not retrieve market data. Please try again later.
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={handleRefreshAll}
                >
                  Try Again
                </Button>
              </Card>
            ) : quotes && Object.keys(quotes).length > 0 ? (
              <>
                <PerformanceCard 
                  title="S&P 500" 
                  percentage={quotes['SPY']?.regularMarketChangePercent || 0}
                  value={quotes['SPY']?.regularMarketPrice || 0}
                  period="Today"
                />
                <PerformanceCard 
                  title="Nasdaq" 
                  percentage={quotes['QQQ']?.regularMarketChangePercent || 0}
                  value={quotes['QQQ']?.regularMarketPrice || 0}
                  period="Today"
                />
                <PerformanceCard 
                  title="Dow Jones" 
                  percentage={quotes['DIA']?.regularMarketChangePercent || 0}
                  value={quotes['DIA']?.regularMarketPrice || 0}
                  period="Today"
                />
              </>
            ) : (
              <p className="col-span-3 text-center py-8 text-gray-500">No market data available</p>
            )}
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Tickers List */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Top Stocks</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingTickers ? (
                  <div className="space-y-3 p-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-md"></div>
                    ))}
                  </div>
                ) : isErrorTickers ? (
                  <div className="p-4 text-red-500">
                    Failed to load tickers. Please try again.
                  </div>
                ) : tickers && tickers.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {tickers.map((ticker) => {
                      const quote = quotes?.[ticker.symbol];
                      const isPositive = quote?.regularMarketChangePercent && quote.regularMarketChangePercent > 0;
                      
                      return (
                        <div 
                          key={ticker.symbol}
                          className={`p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${selectedTicker === ticker.symbol ? 'bg-blue-50' : ''}`}
                          onClick={() => handleSelectTicker(ticker.symbol)}
                        >
                          <div>
                            <div className="font-medium">{ticker.symbol}</div>
                            <div className="text-xs text-gray-500">{ticker.name}</div>
                          </div>
                          {quote && (
                            <div className="text-right">
                              <div className="font-medium">${quote.regularMarketPrice?.toFixed(2)}</div>
                              <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {isPositive ? '+' : ''}{quote.regularMarketChangePercent?.toFixed(2)}%
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No tickers available
                  </div>
                )}
              </CardContent>
            </Card>
            
            <StockNews news={news || []} isLoading={isLoadingNews} />
          </div>
          
          {/* Right Column - Stock Details */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <Tabs defaultValue="chart" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={timeframe === '1d' ? 'default' : 'outline'} 
                      onClick={() => setTimeframe('1d')}
                    >
                      1D
                    </Button>
                    <Button 
                      size="sm" 
                      variant={timeframe === '1wk' ? 'default' : 'outline'} 
                      onClick={() => setTimeframe('1wk')}
                    >
                      1W
                    </Button>
                    <Button 
                      size="sm" 
                      variant={timeframe === '1mo' ? 'default' : 'outline'} 
                      onClick={() => setTimeframe('1mo')}
                    >
                      1M
                    </Button>
                    <Button 
                      size="sm" 
                      variant={timeframe === '3mo' ? 'default' : 'outline'} 
                      onClick={() => setTimeframe('3mo')}
                    >
                      3M
                    </Button>
                    <Button 
                      size="sm" 
                      variant={timeframe === '1y' ? 'default' : 'outline'} 
                      onClick={() => setTimeframe('1y')}
                    >
                      1Y
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="chart" className="mt-0">
                  {selectedQuote && (
                    <Card className="mb-6">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <span>{selectedQuote.symbol}</span>
                              <span className="text-sm font-normal text-gray-500">
                                {tickers?.find(t => t.symbol === selectedQuote.symbol)?.name}
                              </span>
                            </CardTitle>
                            <CardDescription>
                              Last updated: {new Date().toLocaleString()}
                            </CardDescription>
                          </div>
                          <div className={`text-xl font-bold ${selectedQuote.regularMarketChangePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${selectedQuote.regularMarketPrice.toFixed(2)}
                            <span className="text-sm ml-2">
                              {selectedQuote.regularMarketChangePercent > 0 ? '+' : ''}
                              {selectedQuote.regularMarketChangePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Open</div>
                            <div className="font-medium">${selectedQuote.regularMarketOpen.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">High</div>
                            <div className="font-medium">${selectedQuote.regularMarketDayHigh.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Low</div>
                            <div className="font-medium">${selectedQuote.regularMarketDayLow.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Prev Close</div>
                            <div className="font-medium">${selectedQuote.regularMarketPreviousClose.toFixed(2)}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <StockChart 
                    data={stockHistory || []} 
                    symbol={selectedTicker} 
                    isLoading={isLoadingHistory}
                  />
                </TabsContent>
                
                <TabsContent value="company" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingProfile ? (
                        <div className="space-y-4">
                          <div className="h-8 bg-gray-100 animate-pulse rounded w-1/3"></div>
                          <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
                          <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
                          <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
                        </div>
                      ) : isErrorProfile || !companyProfile ? (
                        <p className="text-red-500">
                          Failed to load company profile. Please try again.
                        </p>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{companyProfile.name}</h3>
                            <p className="text-gray-700">{companyProfile.description}</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Sector</div>
                              <div className="font-medium">{companyProfile.sector}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Industry</div>
                              <div className="font-medium">{companyProfile.industry}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Employees</div>
                              <div className="font-medium">{companyProfile.employees.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Market Cap</div>
                              <div className="font-medium">{formatLargeNumber(companyProfile.marketCap)}</div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="font-medium mb-2">Contact Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-500">Address</div>
                                <div>{companyProfile.address}</div>
                                <div>{companyProfile.city}, {companyProfile.country}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Website</div>
                                <a 
                                  href={companyProfile.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {companyProfile.website}
                                </a>
                                <div className="mt-2">
                                  <div className="text-gray-500">Phone</div>
                                  <div>{companyProfile.phone}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="financials" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingFinancials ? (
                        <div className="space-y-4">
                          {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="h-8 bg-gray-100 animate-pulse rounded"></div>
                          ))}
                        </div>
                      ) : isErrorFinancials || !financialData ? (
                        <p className="text-red-500">
                          Failed to load financial data. Please try again.
                        </p>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Total Revenue</div>
                              <div className="font-medium">{formatLargeNumber(financialData.totalRevenue)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Gross Profit</div>
                              <div className="font-medium">{formatLargeNumber(financialData.grossProfit)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Net Income</div>
                              <div className="font-medium">{formatLargeNumber(financialData.netIncome)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">EBITDA</div>
                              <div className="font-medium">{formatLargeNumber(financialData.ebitda)}</div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Total Cash</div>
                              <div className="font-medium">{formatLargeNumber(financialData.totalCash)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Total Debt</div>
                              <div className="font-medium">{formatLargeNumber(financialData.totalDebt)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Operating Margin</div>
                              <div className="font-medium">{(financialData.operatingMargin * 100).toFixed(2)}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Profit Margin</div>
                              <div className="font-medium">{(financialData.profitMargin * 100).toFixed(2)}%</div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Return on Assets</div>
                              <div className="font-medium">{(financialData.returnOnAssets * 100).toFixed(2)}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Return on Equity</div>
                              <div className="font-medium">{(financialData.returnOnEquity * 100).toFixed(2)}%</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockDashboard;
