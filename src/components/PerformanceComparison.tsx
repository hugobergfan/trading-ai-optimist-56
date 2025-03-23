
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Stocks', 'Finox AI': 27.8, 'S&P 500': 9.5, 'Average Investor': 4.2 },
  { name: 'Forex', 'Finox AI': 18.9, 'Market Index': 2.3, 'Average Investor': -1.8 },
  { name: 'Crypto', 'Finox AI': 34.2, 'Market Index': 16.7, 'Average Investor': 8.9 },
];

const config = {
  'Finox AI': { color: '#3b82f6' },
  'S&P 500': { color: '#6b7280' },  
  'Market Index': { color: '#6b7280' },
  'Average Investor': { color: '#d1d5db' },
};

const PerformanceComparison = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Performance Comparison</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          See how Finox AI compares to traditional investment approaches
        </p>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="h-[400px]">
              <ChartContainer config={config}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Finox AI" fill="#3b82f6" name="Finox AI" />
                  <Bar dataKey="S&P 500" fill="#6b7280" name="Market Index" />
                  <Bar dataKey="Average Investor" fill="#d1d5db" name="Average Investor" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12 bg-secondary/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Case Study: Portfolio Growth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Starting Investment: $10,000</h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Traditional approach: $10,940 after 1 year</li>
                <li>Finox AI approach: $12,780 after 1 year</li>
                <li><span className="text-trading-blue font-medium">+$1,840 additional profit</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Risk Management Benefits:</h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>78% lower drawdown than manual trading</li>
                <li>Automatic diversification across markets</li>
                <li>24/7 monitoring and protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default PerformanceComparison;
