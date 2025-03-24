import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Ticker, TickerPrediction as TickerPredictionType } from '@/services/sharePredictionsApi';
import sharePredictionsApi from '@/services/sharePredictionsApi';

interface TickerPredictionProps {
  ticker: Ticker | null;
}

const TickerPrediction = ({ ticker }: TickerPredictionProps) => {
  const [predictionHistory, setPredictionHistory] = useState<TickerPredictionType[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tickerPrediction', ticker?.ticker],
    queryFn: async () => {
      if (!ticker) return null;
      try {
        const response = await sharePredictionsApi.getTickerPredictions({
          ticker: ticker.ticker,
          limit: 5,
          ordering: '-latest_market_date'
        });
        setPredictionHistory(response.results.slice(1)); // Store older predictions
        return response.results[0]; // Return latest prediction
      } catch (err) {
        console.error('Failed to fetch ticker prediction:', err);
        throw err;
      }
    },
    enabled: !!ticker,
  });

  if (!ticker) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Ticker Prediction</CardTitle>
          <CardDescription>
            Select a ticker from the search above to view predictions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <p className="text-gray-500">No ticker selected</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Prediction for {ticker.ticker}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle>Error Loading Prediction</CardTitle>
          <CardDescription>
            Could not load prediction for {ticker.ticker}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Using demo data. The API might be unavailable.</p>
        </CardContent>
      </Card>
    );
  }

  // Otherwise, we have data!
  const prediction = data;
  const predictionPercentage = Math.round(prediction.price_increase_likelihood * 100);
  const isBullish = predictionPercentage > 50;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl font-bold">{ticker.ticker}</span>
              <span className="text-sm font-normal text-gray-500">{ticker.name}</span>
            </CardTitle>
            <CardDescription>
              Latest prediction from {prediction.latest_market_date}
            </CardDescription>
          </div>
          <div className={`text-xl font-bold p-2 rounded-full ${isBullish ? 'text-green-600' : 'text-red-600'}`}>
            {isBullish ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Price Increase Likelihood</span>
            <div className="flex items-baseline">
              <span className={`text-3xl font-bold ${isBullish ? 'text-green-600' : 'text-red-600'}`}>
                {predictionPercentage}%
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Reference Price</span>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">${prediction.reference_price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">5-Day Volatility</span>
            <div className="flex items-baseline">
              <span className="text-xl font-semibold">{(prediction.last_5_days_volatility * 100).toFixed(2)}%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Valid Until</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-xl font-semibold">{prediction.prediction_valid_until}</span>
            </div>
          </div>
        </div>

        {predictionHistory.length > 0 && (
          <div className="mt-8">
            <h4 className="text-sm font-semibold mb-3">Historical Predictions</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-right py-2">Likelihood</th>
                    <th className="text-right py-2">Ref. Price</th>
                  </tr>
                </thead>
                <tbody>
                  {predictionHistory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{item.latest_market_date}</td>
                      <td className={`text-right py-2 ${item.price_increase_likelihood > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.round(item.price_increase_likelihood * 100)}%
                      </td>
                      <td className="text-right py-2">${item.reference_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TickerPrediction;
