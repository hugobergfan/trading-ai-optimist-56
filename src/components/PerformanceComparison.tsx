import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PerformanceCard from './PerformanceCard';
const data = [{
  name: 'Jan',
  ai: 400,
  market: 240
}, {
  name: 'Feb',
  ai: 430,
  market: 250
}, {
  name: 'Mar',
  ai: 450,
  market: 260
}, {
  name: 'Apr',
  ai: 470,
  market: 280
}, {
  name: 'May',
  ai: 540,
  market: 290
}, {
  name: 'Jun',
  ai: 580,
  market: 300
}, {
  name: 'Jul',
  ai: 650,
  market: 310
}, {
  name: 'Aug',
  ai: 700,
  market: 340
}, {
  name: 'Sep',
  ai: 750,
  market: 350
}, {
  name: 'Oct',
  ai: 790,
  market: 360
}, {
  name: 'Nov',
  ai: 820,
  market: 370
}, {
  name: 'Dec',
  ai: 900,
  market: 390
}];
const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm text-trading-blue">{`Finox AI: ${payload[0].value}%`}</p>
        <p className="text-sm text-gray-500">{`Market: ${payload[1].value}%`}</p>
      </div>;
  }
  return null;
};
const PerformanceComparison = () => {
  return <section className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in" style={{
    animationDelay: '0.4s'
  }}>
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in" style={{
        animationDelay: '0.5s'
      }}>
          <h2 className="mb-4 font-extralight text-5xl">Performance Comparison</h2>
          <p className="max-w-2xl mx-auto text-2xl font-extralight text-slate-950">
            See how our AI trading bot outperforms traditional market strategies consistently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="animate-fade-up" style={{
          animationDelay: '0.3s'
        }}>
            <PerformanceCard title="Annual ROI" percentage={148} />
          </div>
          <div className="animate-fade-up" style={{
          animationDelay: '0.5s'
        }}>
            <PerformanceCard title="Average Monthly" percentage={12} period="month" />
          </div>
          <div className="animate-fade-up" style={{
          animationDelay: '0.7s'
        }}>
            <PerformanceCard title="Win Rate" percentage={94} period="trades" />
          </div>
        </div>
        
        <div className="mt-12 rounded-xl shadow-sm border p-4 bg-white animate-fade-in" style={{
        animationDelay: '0.8s'
      }}>
          <h3 className="text-xl mb-4 text-center font-extralight">Annual Performance</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="ai" stroke="#0A84FF" strokeWidth={2} dot={{
                r: 3
              }} activeDot={{
                r: 6
              }} name="Finox AI" />
                <Line type="monotone" dataKey="market" stroke="#82ca9d" strokeWidth={2} dot={{
                r: 3
              }} activeDot={{
                r: 6
              }} name="Market" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>;
};
export default PerformanceComparison;