
import { toast } from "sonner";

// API keys for Alpaca
const API_KEY = "PKIBLQO5YVD68MO2YGE3";
const API_SECRET = "";  // Don't store the secret key here
const BASE_URL = "https://paper-api.alpaca.markets";
const DATA_URL = "https://data.alpaca.markets";

export const alpacaApi = {
  /**
   * Get account information
   */
  getAccount: async (): Promise<Alpaca.Account | null> => {
    try {
      const response = await fetch(`${BASE_URL}/v2/account`, {
        headers: {
          'APCA-API-KEY-ID': API_KEY,
          'APCA-API-SECRET-KEY': API_SECRET
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Alpaca API error:', errorData);
        toast.error('Failed to get account information');
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling Alpaca API:', error);
      toast.error('Error connecting to Alpaca');
      return null;
    }
  },

  /**
   * Get historical bars for specified symbols
   */
  getHistoricalBars: async (request: Alpaca.HistoricalBarsRequest): Promise<Alpaca.HistoricalBarsResponse | null> => {
    try {
      const symbols = Array.isArray(request.symbols) ? request.symbols.join(',') : request.symbols;
      
      let url = `${DATA_URL}/v2/stocks/bars?symbols=${symbols}&timeframe=${request.timeframe}`;
      
      if (request.start) url += `&start=${request.start}`;
      if (request.end) url += `&end=${request.end}`;
      if (request.limit) url += `&limit=${request.limit}`;
      if (request.adjustment) url += `&adjustment=${request.adjustment}`;
      if (request.feed) url += `&feed=${request.feed}`;

      const response = await fetch(url, {
        headers: {
          'APCA-API-KEY-ID': API_KEY,
          'APCA-API-SECRET-KEY': API_SECRET
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Alpaca Data API error:', errorData);
        toast.error('Failed to get historical bars');
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling Alpaca Data API:', error);
      toast.error('Error connecting to Alpaca Data API');
      return null;
    }
  },

  /**
   * Get market news
   */
  getNews: async (request: Alpaca.NewsRequest = {}): Promise<Alpaca.NewsItem[] | null> => {
    try {
      let url = `${DATA_URL}/v1beta1/news`;
      
      const params = new URLSearchParams();
      if (request.symbols) params.append('symbols', request.symbols.join(','));
      if (request.start) params.append('start', request.start);
      if (request.end) params.append('end', request.end);
      if (request.limit) params.append('limit', request.limit.toString());
      if (request.sort) params.append('sort', request.sort);
      
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const response = await fetch(url, {
        headers: {
          'APCA-API-KEY-ID': API_KEY,
          'APCA-API-SECRET-KEY': API_SECRET
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Alpaca News API error:', errorData);
        toast.error('Failed to get market news');
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling Alpaca News API:', error);
      toast.error('Error connecting to Alpaca News API');
      return null;
    }
  },

  /**
   * Connect to the Alpaca news WebSocket stream
   */
  connectToNewsStream: (onMessage: (news: Alpaca.NewsItem) => void): WebSocket | null => {
    try {
      const ws = new WebSocket('wss://stream.data.alpaca.markets/v1beta1/news');
      
      ws.onopen = () => {
        console.log('Connected to Alpaca news stream');
        ws.send(JSON.stringify({
          action: 'auth',
          key: API_KEY,
          secret: API_SECRET
        }));
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        // Handle authentication response
        if (Array.isArray(data) && data[0]?.T === 'success' && data[0]?.msg === 'authenticated') {
          console.log('Authenticated to Alpaca news stream');
          ws.send(JSON.stringify({
            action: 'subscribe',
            news: ['*']  // Subscribe to all news
          }));
          return;
        }
        
        // Handle subscription response
        if (Array.isArray(data) && data[0]?.T === 'subscription') {
          console.log('Subscribed to Alpaca news stream:', data[0]?.news);
          return;
        }
        
        // Handle news data
        if (data?.T === 'n') {
          onMessage(data);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('Error connecting to news stream');
      };
      
      ws.onclose = () => {
        console.log('Disconnected from Alpaca news stream');
      };
      
      return ws;
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      toast.error('Failed to connect to news stream');
      return null;
    }
  }
};

export default alpacaApi;
