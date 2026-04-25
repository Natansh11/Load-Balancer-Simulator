import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const LoadChart = ({ history, currentHour }) => {
  // Format data for recharts
  const data = history.map((val, i) => ({
    time: `${i}:00`,
    requests: val,
    isCurrent: i === currentHour
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg shadow-xl shadow-black/50">
          <p className="text-slate-300 text-xs mb-1">{label}</p>
          <p className="text-neon-cyan font-bold text-sm">
            Requests: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={{ stroke: '#334155' }}
              minTickGap={15}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}K` : value}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.4 }} />
            <Bar 
              dataKey="requests" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isCurrent ? "url(#colorCurrent)" : "url(#colorRequests)"} 
                  className="transition-all duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LoadChart;
