
const API_BASE_URL = 'https://www.sharepredictions.com/api';

// Mock data for when the API is unavailable
const MOCK_MARKET_BAROMETER = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      latest_market_date: new Date().toISOString().split('T')[0],
      prediction_sent_on: new Date().toISOString().split('T')[0],
      prediction_valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      market_v_weighted_avg_pred: 0.78,
      penny_stocks_v_weighted_avg_pred: 0.62,
      top_500_v_weighted_avg_pred: 0.83
    }
  ]
};

export interface Ticker {
  ticker: string;
  name: string;
}

export interface MarketBarometer {
  latest_market_date: string;
  prediction_sent_on: string;
  prediction_valid_until: string;
  market_v_weighted_avg_pred: number;
  penny_stocks_v_weighted_avg_pred: number;
  top_500_v_weighted_avg_pred: number;
}

export interface TickerPrediction {
  ticker: string;
  last_5_days_volatility: number;
  reference_price: number;
  latest_market_date: string;
  prediction_sent_on: string;
  prediction_valid_until: string;
  price_increase_likelihood: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Helper function to get API key from local storage
const getApiKey = (): string | null => {
  return localStorage.getItem('sharePredictions_apiKey');
};

// Helper function to create headers with API key
const createHeaders = (): HeadersInit => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key not found. Please log in.');
  }
  
  return {
    'Authorization': `Api-Key ${apiKey}`,
    'Content-Type': 'application/json',
  };
};

export const sharePredictionsApi = {
  // Authentication function
  login: async (apiKey: string): Promise<boolean> => {
    try {
      // For the demo, we'll just simulate a successful login
      localStorage.setItem('sharePredictions_apiKey', apiKey);
      // Wait a bit to simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  logout: (): void => {
    localStorage.removeItem('sharePredictions_apiKey');
  },
  
  isLoggedIn: (): boolean => {
    return !!getApiKey();
  },
  
  // API Endpoints
  getTickers: async (searchQuery?: string): Promise<Ticker[]> => {
    try {
      // In a real app, we would fetch from the API
      // For demo purposes, we'll return some mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const mockTickers: Ticker[] = [
        { ticker: 'AAPL', name: 'Apple Inc.' },
        { ticker: 'MSFT', name: 'Microsoft Corporation' },
        { ticker: 'GOOGL', name: 'Alphabet Inc.' },
        { ticker: 'AMZN', name: 'Amazon.com, Inc.' },
        { ticker: 'TSLA', name: 'Tesla, Inc.' }
      ];
      
      if (searchQuery) {
        return mockTickers.filter(t => 
          t.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
          t.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      return mockTickers;
    } catch (error) {
      console.error('Error fetching tickers:', error);
      throw error;
    }
  },
  
  getMarketBarometer: async (params?: {
    latest_market_date?: string;
    prediction_sent_on?: string;
    ordering?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<MarketBarometer>> => {
    try {
      // First try to fetch data from the API
      const queryParams = new URLSearchParams();
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      try {
        // Attempt to fetch from the real API
        const response = await fetch(`${API_BASE_URL}/market-barometer/${queryString}`, {
          headers: createHeaders(),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch market barometer: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.warn('API request failed, using mock data:', error);
        // Fall back to mock data if the API request fails
        return MOCK_MARKET_BAROMETER;
      }
    } catch (error) {
      console.error('Error fetching market barometer:', error);
      // Always return mock data in case of any error
      return MOCK_MARKET_BAROMETER;
    }
  },
  
  getTickerPredictions: async (params?: {
    ticker?: string;
    latest_market_date?: string;
    prediction_sent_on?: string;
    ordering?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<TickerPrediction>> => {
    try {
      // For the demo, we'll return mock data
      await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay
      
      const mockTickerPredictions: PaginatedResponse<TickerPrediction> = {
        count: 5,
        next: null,
        previous: null,
        results: [
          {
            ticker: 'AAPL',
            last_5_days_volatility: 0.023,
            reference_price: 172.45,
            latest_market_date: new Date().toISOString().split('T')[0],
            prediction_sent_on: new Date().toISOString().split('T')[0],
            prediction_valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            price_increase_likelihood: 0.68
          },
          {
            ticker: 'MSFT',
            last_5_days_volatility: 0.018,
            reference_price: 412.32,
            latest_market_date: new Date().toISOString().split('T')[0],
            prediction_sent_on: new Date().toISOString().split('T')[0],
            prediction_valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            price_increase_likelihood: 0.75
          }
        ]
      };
      
      if (params?.ticker) {
        mockTickerPredictions.results = mockTickerPredictions.results.filter(p => 
          p.ticker.toLowerCase() === params.ticker.toLowerCase()
        );
        mockTickerPredictions.count = mockTickerPredictions.results.length;
      }
      
      return mockTickerPredictions;
    } catch (error) {
      console.error('Error fetching ticker predictions:', error);
      throw error;
    }
  },
};

export default sharePredictionsApi;
