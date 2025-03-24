
const API_BASE_URL = 'https://www.sharepredictions.com/api';

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
      // Test the API key by making a simple request
      const response = await fetch(`${API_BASE_URL}/tickers/?limit=1`, {
        headers: {
          'Authorization': `Api-Key ${apiKey}`,
        },
      });
      
      if (response.ok) {
        // Store the API key in local storage
        localStorage.setItem('sharePredictions_apiKey', apiKey);
        return true;
      }
      return false;
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
      const params = searchQuery ? `?ticker=${encodeURIComponent(searchQuery)}` : '';
      const response = await fetch(`${API_BASE_URL}/tickers/${params}`, {
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tickers: ${response.statusText}`);
      }
      
      return await response.json();
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
      const queryParams = new URLSearchParams();
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await fetch(`${API_BASE_URL}/market-barometer/${queryString}`, {
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch market barometer: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching market barometer:', error);
      throw error;
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
      const response = await fetch(`${API_BASE_URL}/ticker-predictions/${queryString}`, {
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ticker predictions: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticker predictions:', error);
      throw error;
    }
  },
};

export default sharePredictionsApi;
