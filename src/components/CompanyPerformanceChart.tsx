
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TickerPrediction } from '@/services/sharePredictionsApi';

interface CompanyPerformanceChartProps {
  predictions: TickerPrediction[];
}

const CompanyPerformanceChart = ({ predictions }: CompanyPerformanceChartProps) => {
  if (!predictions || predictions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Predictions</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No historical data available</p>
        </CardContent>
      </Card>
    );
  }

  // Sort predictions by date
  const sortedData = [...predictions].sort((a, b) => 
    new Date(a.latest_market_date).getTime() - new Date(b.latest_market_date).getTime()
  );

  // Process the data for the chart
  const chartData = sortedData.map(item => ({
    date: item.latest_market_date,
    likelihood: Math.round(item.price_increase_likelihood * 100),
    price: item.reference_price,
    volatility: Math.round(item.last_5_days_volatility * 100),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Predictions for {predictions[0].ticker}</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis 
              dataKey="date" 
              tickMargin={10}
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              label={{ value: 'Likelihood', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tickFormatter={(value) => `$${value}`}
              domain={['auto', 'auto']}
              label={{ value: 'Price', angle: 90, position: 'insideRight' }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'likelihood' || name === 'volatility') return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)];
                if (name === 'price') return [`$${value}`, 'Reference Price'];
                return [value, name];
              }}
            />
            <Legend />
            <ReferenceLine y={50} yAxisId="left" stroke="#666" strokeDasharray="3 3" label="Neutral" />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="likelihood" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }}
              name="Likelihood"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="price" 
              stroke="#82ca9d" 
              name="Price"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="volatility" 
              stroke="#ffc658" 
              strokeDasharray="5 5"
              name="Volatility"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CompanyPerformanceChart;
