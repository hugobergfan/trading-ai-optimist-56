
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, RefreshCw } from 'lucide-react';
import alpacaApi from '@/services/alpacaApi';
import { format } from 'date-fns';
import { toast } from 'sonner';

const timeframeOptions = [
  { value: '1D', label: '1 Day' },
  { value: '1H', label: '1 Hour' },
  { value: '15Min', label: '15 Minutes' },
  { value: '5Min', label: '5 Minutes' },
  { value: '1Min', label: '1 Minute' },
];

const feedOptions = [
  { value: 'iex', label: 'IEX (Free)' },
  { value: 'sip', label: 'SIP (Premium)' },
  { value: 'delayed_sip', label: '15min Delayed SIP' },
];

const AlpacaStockData = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [feed, setFeed] = useState<'iex' | 'sip' | 'delayed_sip'>('iex');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stockData, setStockData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    if (!symbol) {
      toast.error('Please enter a stock symbol');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Calculate start date (7 days ago)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const response = await alpacaApi.getHistoricalBars({
        symbols: symbol.toUpperCase(),
        timeframe,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        feed,
      });

      if (!response || !response.bars || !response.bars[symbol.toUpperCase()]) {
        setError('No data available for this symbol');
        setStockData(null);
      } else {
        const bars = response.bars[symbol.toUpperCase()];
        
        // Format data for chart
        const formattedData = bars.map(bar => ({
          timestamp: new Date(bar.t),
          open: bar.o,
          high: bar.h,
          low: bar.l,
          close: bar.c,
          volume: bar.v,
          // Format date based on timeframe
          label: timeframe.includes('Min') ? 
            format(new Date(bar.t), 'HH:mm') : 
            timeframe === '1H' ? 
              format(new Date(bar.t), 'MM/dd HH:mm') : 
              format(new Date(bar.t), 'MM/dd/yyyy')
        }));
        
        setStockData(formattedData);
      }
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alpaca Stock Data</CardTitle>
        <CardDescription>
          View historical stock data from Alpaca API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <Label htmlFor="symbol">Stock Symbol</Label>
            <div className="flex mt-1">
              <Input
                id="symbol"
                placeholder="Enter symbol (e.g., AAPL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="flex-1"
              />
              <Button 
                className="ml-2" 
                onClick={fetchStockData}
                disabled={isLoading}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger id="timeframe" className="mt-1">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="feed">Data Feed</Label>
            <Select value={feed} onValueChange={(value: any) => setFeed(value)}>
              <SelectTrigger id="feed" className="mt-1">
                <SelectValue placeholder="Select data feed" />
              </SelectTrigger>
              <SelectContent>
                {feedOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {stockData && stockData.length > 0 ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stockData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="label" 
                  tickFormatter={(value) => value}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                />
                <Tooltip 
                  formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone"
                  dataKey="close"
                  name="Close Price"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone"
                  dataKey="open"
                  name="Open Price"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : !isLoading && !error ? (
          <div className="text-center py-10 text-gray-500">
            <p>Enter a stock symbol and click search to load data</p>
          </div>
        ) : null}
        
        {isLoading && (
          <div className="flex justify-center items-center h-[400px]">
            <div className="flex flex-col items-center">
              <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mb-4" />
              <p>Loading stock data...</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Data provided by Alpaca Markets API
      </CardFooter>
    </Card>
  );
};

export default AlpacaStockData;
