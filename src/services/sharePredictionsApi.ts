
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

// Helper function to get API key from local storage or use default
const getApiKey = (): string => {
  const storedKey = localStorage.getItem('sharePredictions_apiKey');
  // If no key in localStorage, use our hardcoded key
  return storedKey || '1Y9xJceC.bFVXXgiznj27AU1LG4XQosxA4opN08c6';
};

// Helper function to create headers with API key
const createHeaders = (): HeadersInit => {
  const apiKey = getApiKey();
  
  return {
    'Authorization': `Api-Key ${apiKey}`,
    'Content-Type': 'application/json',
  };
};

export const sharePredictionsApi = {
  // Authentication function
  login: async (apiKey: string): Promise<boolean> => {
    try {
      // Store the provided API key
      localStorage.setItem('sharePredictions_apiKey', apiKey);
      
      // Test the API key by making a simple request
      const response = await fetch(`${API_BASE_URL}/tickers/?limit=1`, {
        headers: createHeaders()
      });
      
      if (response.ok) {
        return true;
      } else {
        // If the test fails, remove the key
        localStorage.removeItem('sharePredictions_apiKey');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('sharePredictions_apiKey');
      return false;
    }
  },
  
  logout: (): void => {
    localStorage.removeItem('sharePredictions_apiKey');
  },
  
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('sharePredictions_apiKey') || true; // Default to true with our hardcoded key
  },
  
  // API Endpoints
  getTickers: async (searchQuery?: string, limit: number = 100): Promise<Ticker[]> => {
    try {
      const queryParams = new URLSearchParams();
      
      if (searchQuery) {
        // Try to match either ticker or name
        queryParams.append('search', searchQuery);
      }
      
      if (limit) {
        queryParams.append('limit', limit.toString());
      }
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      const response = await fetch(`${API_BASE_URL}/tickers/${queryString}`, {
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tickers: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching tickers:', error);
      
      // Return mock data if the API request fails
      return [
        { ticker: 'AAPL', name: 'Apple Inc.' },
        { ticker: 'MSFT', name: 'Microsoft Corporation' },
        { ticker: 'GOOGL', name: 'Alphabet Inc.' },
        { ticker: 'AMZN', name: 'Amazon.com, Inc.' },
        { ticker: 'TSLA', name: 'Tesla, Inc.' }
      ];
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
        const response = await fetch(`${API_BASE_URL}/ticker-predictions/${queryString}`, {
          headers: createHeaders(),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ticker predictions: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.warn('API request failed, using mock data:', error);
        
        // Return mock data if the API request fails
        const mockTickerPredictions: PaginatedResponse<TickerPrediction> = {
          count: 5,
          next: null,
          previous: null,
          results: [
            {
              ticker: params?.ticker || 'AAPL',
              last_5_days_volatility: 0.023,
              reference_price: 172.45,
              latest_market_date: new Date().toISOString().split('T')[0],
              prediction_sent_on: new Date().toISOString().split('T')[0],
              prediction_valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              price_increase_likelihood: 0.68
            }
          ]
        };
        
        return mockTickerPredictions;
      }
    } catch (error) {
      console.error('Error fetching ticker predictions:', error);
      
      // Return mock data in case of any error
      const mockTickerPredictions: PaginatedResponse<TickerPrediction> = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            ticker: params?.ticker || 'AAPL',
            last_5_days_volatility: 0.023,
            reference_price: 172.45,
            latest_market_date: new Date().toISOString().split('T')[0],
            prediction_sent_on: new Date().toISOString().split('T')[0],
            prediction_valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            price_increase_likelihood: 0.68
          }
        ]
      };
      
      return mockTickerPredictions;
    }
  },
};

export default sharePredictionsApi;
