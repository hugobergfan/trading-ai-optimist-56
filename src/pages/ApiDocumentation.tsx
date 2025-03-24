
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Copy, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const ApiDocumentation = () => {
  const { toast } = useToast();
  const { isAuthenticated, apiKey } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste the code in your project",
    });
  };

  const CodeBlock = ({ language, children }: { language: string; children: string }) => (
    <div className="relative my-4 rounded-md overflow-hidden">
      <div className="absolute right-2 top-2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/30"
          onClick={() => handleCopyCode(children)}
        >
          <Copy className="h-4 w-4 text-white" />
        </Button>
      </div>
      <pre className="p-4 bg-gray-900 text-white overflow-x-auto text-sm">
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">API Documentation</h1>
          <p className="text-gray-500">Learn how to use our financial data API</p>
        </div>
        {!isAuthenticated && (
          <Link to="/login">
            <Button>Sign in to access API</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Contents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {[
                  { id: "overview", name: "Overview" },
                  { id: "authentication", name: "Authentication" },
                  { id: "general", name: "General Information" },
                  { id: "endpoints", name: "Endpoints" },
                  { id: "tickers", name: "Tickers" },
                  { id: "quotes", name: "Market Quotes" },
                  { id: "history", name: "Stock History" },
                  { id: "news", name: "Market News" },
                  { id: "profile", name: "Company Profile" },
                  { id: "financials", name: "Financial Data" },
                  { id: "technical", name: "Technical Indicators" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {item.name}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Overview Section */}
          <section id="overview">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Financial Data API</CardTitle>
                <CardDescription>
                  Access comprehensive financial market data through our REST API endpoints.
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  This documentation provides details on available endpoints, request formats, and sample implementations.
                  Our API offers real-time and historical market data, company information, technical indicators, and more.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-blue-700 font-medium">Available Data</h3>
                  <ul className="list-disc pl-5 text-blue-700 mt-2">
                    <li>Real-time and snapshot market quotes</li>
                    <li>Historical stock data</li>
                    <li>Company profiles and financial information</li>
                    <li>Technical indicators (SMA, RSI, MACD, ADX)</li>
                    <li>Market news and calendar events</li>
                    <li>Options data and unusual activity</li>
                    <li>Insider trading information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Authentication Section */}
          <section id="authentication">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Authentication</CardTitle>
                <CardDescription>
                  All API requests require authentication via API key
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  You need a RapidAPI subscription to use these financial data endpoints. The API key should be included in the request headers for all API calls.
                </p>
                
                <h3>Required Headers</h3>
                <div className="bg-gray-100 p-4 rounded-md text-sm">
                  <p><strong>X-RapidAPI-Key:</strong> Your API Key</p>
                  <p><strong>X-RapidAPI-Host:</strong> yahoo-finance15.p.rapidapi.com</p>
                </div>
                
                {isAuthenticated && apiKey && (
                  <div className="mt-4">
                    <h3>Your API Key</h3>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 p-2 rounded text-sm flex-1 overflow-x-auto">
                        {apiKey}
                      </code>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyCode(apiKey)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
                
                <h3>Example Request with Authentication</h3>
                <CodeBlock language="javascript">
{`const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'API:623eb939cmsh8363d70549687p1af7fajsn89125984c7a',
    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
  }
};

fetch('https://yahoo-finance15.p.rapidapi.com/v1/market/quotes?symbols=AAPL,MSFT', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`}
                </CodeBlock>
              </CardContent>
            </Card>
          </section>

          {/* General Information Section */}
          <section id="general">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">General Information</CardTitle>
                <CardDescription>
                  Important details about the API and its usage
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Note</div>
                    <div>
                      <strong>Rate Limits:</strong> The API has rate limits depending on your subscription plan. Please check your RapidAPI dashboard for details.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Note</div>
                    <div>
                      <strong>Data Delay:</strong> Market data may have delays depending on the endpoint. Free plans typically have 15-minute delayed data.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Note</div>
                    <div>
                      <strong>Market Hours:</strong> Real-time data is available during market hours. Outside market hours, the latest available data is returned.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">Important</div>
                    <div>
                      <strong>Disclaimer:</strong> The data provided is for informational purposes only and should not be used as the sole basis for investment decisions.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Endpoints Section */}
          <section id="endpoints">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Available Endpoints</CardTitle>
                <CardDescription>
                  Overview of all available API endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="market">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="market">Market Data</TabsTrigger>
                    <TabsTrigger value="stocks">Stocks</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="market" className="space-y-4">
                    <ul className="space-y-2">
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/market/tickers</code>
                        <p className="text-sm text-gray-600 mt-1">List all available market tickers</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/search</code>
                        <p className="text-sm text-gray-600 mt-1">Search for tickers by name or symbol</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/market/quotes</code>
                        <p className="text-sm text-gray-600 mt-1">Get real-time quotes for multiple tickers</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/market/screener</code>
                        <p className="text-sm text-gray-600 mt-1">Screen markets based on criteria</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v2/market/news</code>
                        <p className="text-sm text-gray-600 mt-1">Get latest market news</p>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="stocks" className="space-y-4">
                    <ul className="space-y-2">
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/stock/profile</code>
                        <p className="text-sm text-gray-600 mt-1">Get company profile and basic information</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/stock/history</code>
                        <p className="text-sm text-gray-600 mt-1">Get historical stock price data</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/stock/financial-data</code>
                        <p className="text-sm text-gray-600 mt-1">Get financial data for a company</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/stock/earnings</code>
                        <p className="text-sm text-gray-600 mt-1">Get earnings data for a company</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/stock/balance-sheet</code>
                        <p className="text-sm text-gray-600 mt-1">Get balance sheet data</p>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="calendar" className="space-y-4">
                    <ul className="space-y-2">
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET calendar/earnings</code>
                        <p className="text-sm text-gray-600 mt-1">Get upcoming earnings releases</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET calendar/dividends</code>
                        <p className="text-sm text-gray-600 mt-1">Get upcoming dividend events</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET calendar/economic_events</code>
                        <p className="text-sm text-gray-600 mt-1">Get upcoming economic events</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET calendar/ipo</code>
                        <p className="text-sm text-gray-600 mt-1">Get upcoming IPO events</p>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-4">
                    <ul className="space-y-2">
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/indicators/sma</code>
                        <p className="text-sm text-gray-600 mt-1">Simple Moving Average indicator</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/indicators/rsi</code>
                        <p className="text-sm text-gray-600 mt-1">Relative Strength Index indicator</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/indicators/macd</code>
                        <p className="text-sm text-gray-600 mt-1">Moving Average Convergence Divergence</p>
                      </li>
                      <li className="p-2 hover:bg-gray-50 rounded-md">
                        <code className="font-mono bg-gray-100 p-1 rounded">GET v1/indicators/adx</code>
                        <p className="text-sm text-gray-600 mt-1">Average Directional Index</p>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Tickers Section */}
          <section id="tickers">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tickers Endpoint</CardTitle>
                <CardDescription>
                  Get information about available stock tickers
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  The tickers endpoint provides a list of supported stock tickers. 
                  This endpoint helps users determine if a specific ticker is supported
                  and get basic information about available stocks.
                </p>
                
                <h3>Request</h3>
                <div className="bg-gray-100 p-4 rounded-md text-sm">
                  <p><strong>GET</strong> https://yahoo-finance15.p.rapidapi.com/v1/market/tickers</p>
                </div>
                
                <h3>Parameters</h3>
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left bg-gray-50">Parameter</th>
                      <th className="border p-2 text-left bg-gray-50">Type</th>
                      <th className="border p-2 text-left bg-gray-50">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">limit</td>
                      <td className="border p-2">number (optional)</td>
                      <td className="border p-2">Number of results to return (default: 20)</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3>Response</h3>
                <CodeBlock language="json">
{`{
  "status": "success",
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "exchange": "NASDAQ",
      "type": "stock"
    },
    {
      "symbol": "MSFT",
      "name": "Microsoft Corporation",
      "exchange": "NASDAQ",
      "type": "stock"
    }
    // More tickers...
  ]
}`}
                </CodeBlock>
                
                <h3>Code Example</h3>
                <CodeBlock language="javascript">
{`import { financialApi } from '@/services/financialApi';

// Get market tickers
const fetchTickers = async () => {
  const response = await financialApi.getTickers(20);
  
  if (response.status === 'success' && response.data) {
    console.log('Tickers:', response.data);
  } else {
    console.error('Failed to fetch tickers:', response.error);
  }
};

fetchTickers();`}
                </CodeBlock>
                
                <h3>Search Tickers</h3>
                <p>
                  You can also search for specific tickers by using the search endpoint:
                </p>
                
                <div className="bg-gray-100 p-4 rounded-md text-sm">
                  <p><strong>GET</strong> https://yahoo-finance15.p.rapidapi.com/v1/search</p>
                </div>
                
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left bg-gray-50">Parameter</th>
                      <th className="border p-2 text-left bg-gray-50">Type</th>
                      <th className="border p-2 text-left bg-gray-50">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">query</td>
                      <td className="border p-2">string (required)</td>
                      <td className="border p-2">Search query (e.g., "AAPL" or "Apple")</td>
                    </tr>
                  </tbody>
                </table>
                
                <CodeBlock language="javascript">
{`// Search for tickers
const searchTickers = async (query) => {
  const response = await financialApi.searchTickers(query);
  
  if (response.status === 'success' && response.data) {
    console.log('Search results:', response.data);
  } else {
    console.error('Failed to search tickers:', response.error);
  }
};

searchTickers('Apple');`}
                </CodeBlock>
              </CardContent>
            </Card>
          </section>

          {/* Quotes Section */}
          <section id="quotes">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Market Quotes Endpoint</CardTitle>
                <CardDescription>
                  Get real-time and snapshot market quotes
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  The market quotes endpoint provides real-time or snapshot quotes for specified stocks.
                  This includes current price, change, volume, and other key metrics.
                </p>
                
                <h3>Request</h3>
                <div className="bg-gray-100 p-4 rounded-md text-sm">
                  <p><strong>GET</strong> https://yahoo-finance15.p.rapidapi.com/v1/market/quotes</p>
                </div>
                
                <h3>Parameters</h3>
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left bg-gray-50">Parameter</th>
                      <th className="border p-2 text-left bg-gray-50">Type</th>
                      <th className="border p-2 text-left bg-gray-50">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">symbols</td>
                      <td className="border p-2">string (required)</td>
                      <td className="border p-2">Comma-separated list of ticker symbols (e.g., "AAPL,MSFT,GOOGL")</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3>Response</h3>
                <CodeBlock language="json">
{`{
  "status": "success",
  "data": {
    "AAPL": {
      "symbol": "AAPL",
      "regularMarketPrice": 182.63,
      "regularMarketChange": 1.25,
      "regularMarketChangePercent": 0.69,
      "regularMarketVolume": 42567890,
      "regularMarketOpen": 181.38,
      "regularMarketDayHigh": 183.21,
      "regularMarketDayLow": 180.97,
      "regularMarketPreviousClose": 181.38,
      "marketCap": 2854320000000
    },
    "MSFT": {
      "symbol": "MSFT",
      "regularMarketPrice": 415.32,
      "regularMarketChange": 3.43,
      "regularMarketChangePercent": 0.83,
      "regularMarketVolume": 18764321,
      "regularMarketOpen": 411.89,
      "regularMarketDayHigh": 416.78,
      "regularMarketDayLow": 410.56,
      "regularMarketPreviousClose": 411.89,
      "marketCap": 3076540000000
    }
  }
}`}
                </CodeBlock>
                
                <h3>Code Example</h3>
                <CodeBlock language="javascript">
{`import { financialApi } from '@/services/financialApi';

// Get real-time quotes
const fetchQuotes = async () => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL'];
  const response = await financialApi.getRealTimeQuotes(symbols);
  
  if (response.status === 'success' && response.data) {
    console.log('Quotes:', response.data);
    
    // Access individual quote data
    const appleQuote = response.data.AAPL;
    console.log('Apple price:', appleQuote.regularMarketPrice);
    console.log('Apple change %:', appleQuote.regularMarketChangePercent);
  } else {
    console.error('Failed to fetch quotes:', response.error);
  }
};

fetchQuotes();`}
                </CodeBlock>
              </CardContent>
            </Card>
          </section>

          {/* Stock History Section */}
          <section id="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Stock History Endpoint</CardTitle>
                <CardDescription>
                  Get historical stock price data
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  The stock history endpoint provides historical price data for a specified stock,
                  including open, high, low, close prices and volume.
                </p>
                
                <h3>Request</h3>
                <div className="bg-gray-100 p-4 rounded-md text-sm">
                  <p><strong>GET</strong> https://yahoo-finance15.p.rapidapi.com/v1/stock/history</p>
                </div>
                
                <h3>Parameters</h3>
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left bg-gray-50">Parameter</th>
                      <th className="border p-2 text-left bg-gray-50">Type</th>
                      <th className="border p-2 text-left bg-gray-50">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">symbol</td>
                      <td className="border p-2">string (required)</td>
                      <td className="border p-2">Ticker symbol (e.g., "AAPL")</td>
                    </tr>
                    <tr>
                      <td className="border p-2">interval</td>
                      <td className="border p-2">string (optional)</td>
                      <td className="border p-2">Data interval (e.g., "1d", "1wk", "1mo") - default: "1d"</td>
                    </tr>
                    <tr>
                      <td className="border p-2">period</td>
                      <td className="border p-2">string (optional)</td>
                      <td className="border p-2">Time period (e.g., "1mo", "3mo", "6mo", "1y", "5y") - default: "1mo"</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3>Response</h3>
                <CodeBlock language="json">
{`{
  "status": "success",
  "data": [
    {
      "date": "2024-03-01",
      "open": 181.35,
      "high": 183.27,
      "low": 180.12,
      "close": 182.63,
      "volume": 45678920,
      "adjClose": 182.63
    },
    {
      "date": "2024-03-04",
      "open": 182.83,
      "high": 184.57,
      "low": 182.15,
      "close": 184.38,
      "volume": 42156789,
      "adjClose": 184.38
    }
    // More historical data...
  ]
}`}
                </CodeBlock>
                
                <h3>Code Example</h3>
                <CodeBlock language="javascript">
{`import { financialApi } from '@/services/financialApi';

// Get stock history
const fetchStockHistory = async () => {
  const symbol = 'AAPL';
  const interval = '1d';  // daily data
  const period = '1mo';   // last month
  
  const response = await financialApi.getStockHistory(symbol, interval, period);
  
  if (response.status === 'success' && response.data) {
    console.log('Historical data:', response.data);
    
    // Process data for charts
    const dates = response.data.map(item => item.date);
    const prices = response.data.map(item => item.close);
    
    // Now you can use this data with chart libraries like recharts
  } else {
    console.error('Failed to fetch historical data:', response.error);
  }
};

fetchStockHistory();`}
                </CodeBlock>
              </CardContent>
            </Card>
          </section>

          {/* More Endpoint Sections... */}
          {/* You can add more sections for other endpoints following the same pattern */}
          
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link to="/dashboard">
                Explore Dashboard <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
