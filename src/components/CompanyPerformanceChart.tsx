
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TickerPrediction } from '@/services/sharePredictionsApi';

interface CompanyPerformanceChartProps {
  predictions: TickerPrediction[];
}

const CompanyPerformanceChart = ({ predictions }: CompanyPerformanceChartProps) => {
  const chartData = predictions.map(pred => ({
    date: pred.latest_market_date,
    likelihood: Math.round(pred.price_increase_likelihood * 100),
    price: pred.reference_price,
    volatility: Math.round(pred.last_5_days_volatility * 100)
  }));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Historical Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="likelihood" 
                stroke="#8884d8" 
                name="Increase Likelihood (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="price" 
                stroke="#82ca9d" 
                name="Reference Price ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyPerformanceChart;
