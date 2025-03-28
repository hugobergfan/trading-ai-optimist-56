
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';
import { toast } from 'sonner';
import sharePredictionsApi, { Ticker } from '@/services/sharePredictionsApi';
import { useQuery } from '@tanstack/react-query';
import TickerPrediction from '@/components/TickerPrediction';

const Predictions = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const [showTopPredictions, setShowTopPredictions] = useState<boolean>(true);

  // Fetch top tickers (most favorable predictions)
  const { data: topPredictions, isLoading: isLoadingTop, refetch: refetchTop } = useQuery({
    queryKey: ['topPredictions'],
    queryFn: async () => {
      try {
        // In a real implementation, we would fetch top predictions from API
        // For now we'll simulate with mock data
        return [
          { ticker: 'AAPL', name: 'Apple Inc.', prediction: 0.92, price: 182.63 },
          { ticker: 'MSFT', name: 'Microsoft Corporation', prediction: 0.87, price: 412.65 },
          { ticker: 'NVDA', name: 'NVIDIA Corporation', prediction: 0.85, price: 950.02 },
          { ticker: 'GOOGL', name: 'Alphabet Inc.', prediction: 0.82, price: 177.85 },
          { ticker: 'AMZN', name: 'Amazon.com, Inc.', prediction: 0.79, price: 186.45 },
        ];
      } catch (err) {
        console.error('Failed to fetch top predictions:', err);
        throw err;
      }
    },
    enabled: isAuthenticated
  });

  // Fetch bearish predictions (most unfavorable)
  const { data: bearishPredictions, isLoading: isLoadingBearish, refetch: refetchBearish } = useQuery({
    queryKey: ['bearishPredictions'],
    queryFn: async () => {
      try {
        // In a real implementation, we would fetch bearish predictions from API
        return [
          { ticker: 'GME', name: 'GameStop Corp.', prediction: 0.23, price: 18.43 },
          { ticker: 'AMC', name: 'AMC Entertainment Holdings', prediction: 0.27, price: 3.82 },
          { ticker: 'BBBY', name: 'Bed Bath & Beyond Inc.', prediction: 0.30, price: 0.04 },
          { ticker: 'NKLA', name: 'Nikola Corporation', prediction: 0.32, price: 0.63 },
          { ticker: 'PLTR', name: 'Palantir Technologies Inc.', prediction: 0.35, price: 24.95 },
        ];
      } catch (err) {
        console.error('Failed to fetch bearish predictions:', err);
        throw err;
      }
    },
    enabled: isAuthenticated
  });

  // Fetch search results
  const { data: searchResults, isLoading: isLoadingSearch, refetch: refetchSearch } = useQuery({
    queryKey: ['searchPredictions', searchQuery],
    queryFn: async () => {
      try {
        if (!searchQuery.trim()) return [];
        return await sharePredictionsApi.getTickers(searchQuery);
      } catch (err) {
        console.error('Failed to search tickers:', err);
        throw err;
      }
    },
    enabled: isAuthenticated && searchQuery.length > 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleRefresh = () => {
    refetchTop();
    refetchBearish();
    if (searchQuery) {
      refetchSearch();
    }
    toast.success("Refreshing predictions data");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    refetchSearch();
    toast.success(`Searching for "${searchQuery}"`);
  };

  const handleSelectTicker = (ticker: string, name: string) => {
    setSelectedTicker({ ticker, name });
    toast.success(`Loading prediction data for ${ticker}`);
  };

  return (
    <DashboardLayout
      onRefresh={handleRefresh}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Market Predictions</h1>
          <Button 
            variant="outline" 
            onClick={() => setShowTopPredictions(!showTopPredictions)}
          >
            {showTopPredictions ? (
              <>
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                Show Bearish Predictions
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                Show Bullish Predictions
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="top-predictions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="top-predictions">Top Predictions</TabsTrigger>
            <TabsTrigger value="ticker-search">Ticker Search</TabsTrigger>
            {selectedTicker && (
              <TabsTrigger value="ticker-detail">{selectedTicker.ticker} Details</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="top-predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {showTopPredictions ? (
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                      Top Bullish Predictions
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                      Top Bearish Predictions
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  {showTopPredictions 
                    ? "Stocks with the highest likelihood of price increases" 
                    : "Stocks with the highest likelihood of price decreases"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingTop || isLoadingBearish ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead className="text-right">Prediction</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(showTopPredictions ? topPredictions : bearishPredictions)?.map((item) => (
                        <TableRow key={item.ticker}>
                          <TableCell className="font-medium">{item.ticker}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">
                            <span className={showTopPredictions ? "text-green-600" : "text-red-600"}>
                              {(item.prediction * 100).toFixed(0)}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              onClick={() => handleSelectTicker(item.ticker, item.name)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <p className="text-sm text-gray-500">Updated daily at market close</p>
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  Refresh Data
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-blue-500" />
                  Prediction Methodology
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our predictions are generated using advanced machine learning models trained on historical market data,
                  technical indicators, and sentiment analysis. The prediction percentage represents the likelihood of a 
                  price increase over the next 5-10 trading days.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-medium">85-100%:</span> Very strong bullish signal</li>
                  <li><span className="font-medium">70-85%:</span> Strong bullish signal</li>
                  <li><span className="font-medium">60-70%:</span> Moderate bullish signal</li>
                  <li><span className="font-medium">40-60%:</span> Neutral outlook</li>
                  <li><span className="font-medium">30-40%:</span> Moderate bearish signal</li>
                  <li><span className="font-medium">15-30%:</span> Strong bearish signal</li>
                  <li><span className="font-medium">0-15%:</span> Very strong bearish signal</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticker-search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search for Ticker Predictions</CardTitle>
                <CardDescription>
                  Enter a stock symbol or company name to view its prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <Input 
                    placeholder="Enter ticker or company name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </div>

                {isLoadingSearch ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : searchResults && searchResults.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((ticker) => (
                        <TableRow key={ticker.ticker}>
                          <TableCell className="font-medium">{ticker.ticker}</TableCell>
                          <TableCell>{ticker.name}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              onClick={() => handleSelectTicker(ticker.ticker, ticker.name)}
                            >
                              View Prediction
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : searchQuery ? (
                  <div className="text-center py-8 text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Enter a ticker symbol or company name to search
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticker-detail" className="space-y-6">
            {selectedTicker && (
              <TickerPrediction ticker={selectedTicker} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
