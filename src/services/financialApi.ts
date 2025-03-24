
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
}

const API_HOST = 'yahoo-finance15.p.rapidapi.com';
const API_KEY = '1Y9xJceC.bFVXXgiznj27AU1LG4XQosxA4opN08c6';

// Helper function to create headers
const createHeaders = () => {
  return {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  };
};

// Helper function to handle API requests
const fetchFromApi = async <T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
  try {
    const url = new URL(`https://${API_HOST}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    console.log(`Fetching from: ${url.toString()}`);
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: createHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return { status: 'success', data: data as T };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      status: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export interface Ticker {
  symbol: string;
  name: string;
  exchange: string;
  type?: string;
}

export interface Quote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketVolume: number;
  regularMarketOpen: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketPreviousClose: number;
  marketCap?: number;
}

export interface NewsItem {
  title: string;
  link: string;
  publisher: string;
  publishedOn: string;
  thumbnail?: string;
  summary?: string;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjClose?: number;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  website: string;
  marketCap: number;
  employees: number;
  country: string;
  city: string;
  address: string;
  phone: string;
}

export interface FinancialData {
  totalRevenue: number;
  grossProfit: number;
  netIncome: number;
  ebitda: number;
  totalCash: number;
  totalDebt: number;
  returnOnAssets: number;
  returnOnEquity: number;
  operatingMargin: number;
  profitMargin: number;
}

export const financialApi = {
  // Get market tickers
  getTickers: async (limit = 20): Promise<ApiResponse<Ticker[]>> => {
    return fetchFromApi<Ticker[]>('/v1/market/tickers', { limit: limit.toString() });
  },
  
  // Search for tickers
  searchTickers: async (query: string): Promise<ApiResponse<Ticker[]>> => {
    return fetchFromApi<Ticker[]>('/v1/search', { query });
  },
  
  // Get real-time quotes
  getRealTimeQuotes: async (symbols: string[]): Promise<ApiResponse<Record<string, Quote>>> => {
    return fetchFromApi<Record<string, Quote>>('/v1/market/quotes', { 
      symbols: symbols.join(',') 
    });
  },
  
  // Get stock history
  getStockHistory: async (symbol: string, interval = '1d', period = '1mo'): Promise<ApiResponse<HistoricalData[]>> => {
    return fetchFromApi<HistoricalData[]>('/v1/stock/history', {
      symbol,
      interval,
      period
    });
  },
  
  // Get market news
  getMarketNews: async (limit = 10): Promise<ApiResponse<NewsItem[]>> => {
    return fetchFromApi<NewsItem[]>('/v2/market/news', { limit: limit.toString() });
  },
  
  // Get stock profile
  getStockProfile: async (symbol: string): Promise<ApiResponse<CompanyProfile>> => {
    return fetchFromApi<CompanyProfile>('/v1/stock/profile', { symbol });
  },
  
  // Get stock financial data
  getFinancialData: async (symbol: string): Promise<ApiResponse<FinancialData>> => {
    return fetchFromApi<FinancialData>('/v1/stock/financial-data', { symbol });
  },
  
  // Get stock earnings
  getStockEarnings: async (symbol: string): Promise<ApiResponse<any>> => {
    return fetchFromApi<any>('/v1/stock/earnings', { symbol });
  },
  
  // Get stock technical indicators
  getSMA: async (symbol: string, interval = '1d', period = '14'): Promise<ApiResponse<any>> => {
    return fetchFromApi<any>('/v1/indicators/sma', {
      symbol,
      interval,
      period
    });
  },
  
  getRSI: async (symbol: string, interval = '1d', period = '14'): Promise<ApiResponse<any>> => {
    return fetchFromApi<any>('/v1/indicators/rsi', {
      symbol,
      interval,
      period
    });
  },
  
  // Get market screener data
  getMarketScreener: async (screener: string): Promise<ApiResponse<any>> => {
    return fetchFromApi<any>('/v1/market/screener', { screener });
  },
};

export default financialApi;
