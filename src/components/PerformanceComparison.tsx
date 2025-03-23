
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', FinoxAI: 4000, SandP500: 2400 },
  { name: 'Feb', FinoxAI: 3000, SandP500: 1398 },
  { name: 'Mar', FinoxAI: 5000, SandP500: 3800 },
  { name: 'Apr', FinoxAI: 2780, SandP500: 3908 },
  { name: 'May', FinoxAI: 7890, SandP500: 4800 },
  { name: 'Jun', FinoxAI: 6390, SandP500: 3800 },
  { name: 'Jul', FinoxAI: 8490, SandP500: 4300 },
];

// Custom tooltip component with proper types
const CustomTooltip = ({ active, payload, label }: { 
  active?: boolean; 
  payload?: any[]; 
  label?: string; 
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-lg border border-gray-100">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-trading-blue">
          {`Finox AI: ${payload[0].value}`}
        </p>
        <p className="text-gray-500">
          {`S&P 500: ${payload[1].value}`}
        </p>
      </div>
    );
  }

  return null;
};

const PerformanceComparison = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Performance Comparison</h2>
        <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
          See how Finox AI consistently outperforms traditional market benchmarks with our advanced algorithmic trading strategies.
        </p>
        
        <div className="h-80 md:h-96 w-full mt-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="FinoxAI" 
                stroke="#0A84FF" 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="SandP500" 
                stroke="#888888" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Case Study: Portfolio Growth</h3>
            <p className="mb-4">
              A $10,000 investment in Finox AI's algorithm in January would have grown to $17,450 by July, 
              compared to just $12,680 with an S&P 500 index fund during the same period.
            </p>
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Finox AI Return</p>
                <p className="text-xl font-bold text-trading-blue">+74.5%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">S&P 500 Return</p>
                <p className="text-xl font-bold text-gray-700">+26.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceComparison;
