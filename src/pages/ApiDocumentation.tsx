
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ApiDocumentation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Share Predictions API Documentation</h1>
        
        {/* Authentication Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You need a paid subscription to use the stock predictions API endpoints. Include the ApiKey in the request headers:</p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
              Authorization: Api-Key YOUR_API_KEY
            </pre>
          </CardContent>
        </Card>

        {/* General Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>New predictions are generated each market day at approximately 6:00 am EST</li>
              <li>No predictions are generated on market holidays</li>
              <li>Predictions above 50% suggest an expected price increase</li>
              <li>Predictions below 50% suggest an expected price decrease</li>
            </ul>
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold">Key Dates</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>latest_market_date:</strong> Most recent concluded market day</li>
              <li><strong>prediction_sent_on:</strong> Publication date of the prediction</li>
              <li><strong>prediction_valid_until:</strong> Validity period end date</li>
            </ul>
          </CardContent>
        </Card>

        {/* Tickers Endpoint */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tickers Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Get information about available stock tickers (over 5000 companies).</p>
            <div className="bg-gray-800 text-white p-4 rounded-md">
              <p className="font-mono">GET /api/tickers/</p>
            </div>
            <h3 className="font-semibold mt-4">Parameters:</h3>
            <ul className="list-disc pl-6">
              <li><code>ticker</code> (optional): Filter by ticker symbol or company name</li>
            </ul>
            <h3 className="font-semibold mt-4">Example Response:</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
{`[
  {
    "ticker": "AAPL",
    "name": "Apple Inc."
  },
  {
    "ticker": "AAL",
    "name": "American Airlines Group Inc."
  }
]`}
            </pre>
          </CardContent>
        </Card>

        {/* Market Barometer Endpoint */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Market Barometer Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Get daily predictions for overall market direction.</p>
            <div className="bg-gray-800 text-white p-4 rounded-md">
              <p className="font-mono">GET /api/market-barometer/</p>
            </div>
            <h3 className="font-semibold mt-4">Parameters:</h3>
            <ul className="list-disc pl-6">
              <li><code>latest_market_date</code> (optional): Filter by market date</li>
              <li><code>prediction_sent_on</code> (optional): Filter by sent date</li>
              <li><code>ordering</code> (optional): Sort results</li>
              <li><code>limit</code> (optional): Results per page</li>
              <li><code>offset</code> (optional): Pagination offset</li>
            </ul>
            <h3 className="font-semibold mt-4">Example Response:</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
{`{
  "latest_market_date": "2024-03-25",
  "prediction_sent_on": "2024-03-26",
  "prediction_valid_until": "2024-04-08",
  "market_v_weighted_avg_pred": 0.65,
  "penny_stocks_v_weighted_avg_pred": 0.55,
  "top_500_v_weighted_avg_pred": 0.72
}`}
            </pre>
          </CardContent>
        </Card>

        {/* Ticker Predictions Endpoint */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ticker Predictions Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Get price increase likelihood for specific stocks.</p>
            <div className="bg-gray-800 text-white p-4 rounded-md">
              <p className="font-mono">GET /api/ticker-predictions/</p>
            </div>
            <h3 className="font-semibold mt-4">Parameters:</h3>
            <ul className="list-disc pl-6">
              <li><code>ticker</code> (optional): Filter by ticker symbol</li>
              <li><code>latest_market_date</code> (optional): Filter by market date</li>
              <li><code>prediction_sent_on</code> (optional): Filter by sent date</li>
              <li><code>ordering</code> (optional): Sort results</li>
              <li><code>limit</code> (optional): Results per page</li>
              <li><code>offset</code> (optional): Pagination offset</li>
            </ul>
            <h3 className="font-semibold mt-4">Example Response:</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
{`{
  "ticker": "AAPL",
  "last_5_days_volatility": 0.023,
  "reference_price": 172.45,
  "latest_market_date": "2024-03-25",
  "prediction_sent_on": "2024-03-26",
  "prediction_valid_until": "2024-04-08",
  "price_increase_likelihood": 0.68
}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiDocumentation;
