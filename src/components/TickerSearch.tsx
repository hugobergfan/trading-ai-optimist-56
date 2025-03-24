
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticker } from '@/services/sharePredictionsApi';
import sharePredictionsApi from '@/services/sharePredictionsApi';
import { useToast } from '@/hooks/use-toast';

interface TickerSearchProps {
  onSelectTicker: (ticker: Ticker) => void;
}

const TickerSearch = ({ onSelectTicker }: TickerSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await sharePredictionsApi.getTickers(searchQuery);
      setTickers(results);
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
        });
      }
    } catch (err) {
      console.error('Error searching tickers:', err);
      setError('Failed to search tickers. Please try again.');
      toast({
        title: "Search Error",
        description: "Failed to search tickers. Using demo data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-load some popular tickers on mount
    const loadInitialTickers = async () => {
      setIsLoading(true);
      try {
        const results = await sharePredictionsApi.getTickers();
        setTickers(results.slice(0, 5)); // Just show first 5 for simplicity
      } catch (err) {
        console.error('Error loading initial tickers:', err);
        setError('Failed to load initial tickers');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTickers();
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Search Tickers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by ticker or company name (e.g., AAPL, Apple)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tickers.map((ticker) => (
            <div 
              key={ticker.ticker}
              className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectTicker(ticker)}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">{ticker.ticker}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTicker(ticker);
                  }}
                >
                  View
                </Button>
              </div>
              <p className="text-sm text-gray-600 truncate">{ticker.name}</p>
            </div>
          ))}
          {tickers.length === 0 && !isLoading && (
            <p className="text-gray-500 col-span-2 text-center py-4">
              {searchQuery ? 'No tickers found matching your search' : 'Popular tickers will appear here'}
            </p>
          )}
          {isLoading && (
            <div className="col-span-2 py-4">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TickerSearch;
