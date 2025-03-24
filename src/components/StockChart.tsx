
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { HistoricalData } from '@/services/financialApi';

interface StockChartProps {
  data: HistoricalData[];
  symbol: string;
  isLoading?: boolean;
}

const StockChart = ({ data, symbol, isLoading = false }: StockChartProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Price History</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse h-64 w-full bg-gray-200 rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Price History</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No historical data available</p>
        </CardContent>
      </Card>
    );
  }

  // Process the data
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    close: item.close,
    volume: item.volume,
  }));

  // Find min and max for better visualization
  const prices = chartData.map(item => item.close);
  const minPrice = Math.min(...prices) * 0.98; // 2% buffer
  const maxPrice = Math.max(...prices) * 1.02; // 2% buffer

  // Determine if trend is up or down
  const startPrice = chartData[0]?.close;
  const endPrice = chartData[chartData.length - 1]?.close;
  const isPositive = endPrice >= startPrice;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{symbol} Stock Price History</span>
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            ${endPrice?.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer 
          config={{
            stock: {
              theme: {
                light: isPositive ? "rgba(34, 197, 94, 0.6)" : "rgba(239, 68, 68, 0.6)",
                dark: isPositive ? "rgba(34, 197, 94, 0.6)" : "rgba(239, 68, 68, 0.6)",
              },
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "#22c55e" : "#ef4444"} 
                    stopOpacity={0.8}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "#22c55e" : "#ef4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tickMargin={10}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis 
                domain={[minPrice, maxPrice]} 
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                width={60}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="close" 
                name="Price" 
                stroke={isPositive ? "#16a34a" : "#dc2626"} 
                fillOpacity={1}
                fill="url(#colorStock)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StockChart;
