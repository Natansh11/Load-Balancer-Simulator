import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#10b981', '#eab308', '#f97316', '#3b82f6', '#8b5cf6'];

const ServerDistribution = ({ servers }) => {
  const totalLoad = servers.reduce((sum, s) => sum + s.load, 0);
  
  const data = servers.map((s, i) => ({
    name: `SRV-${s.id.split('-')[1] || s.id}`,
    value: s.load,
    percentage: totalLoad === 0 ? 0 : (s.load / totalLoad) * 100,
    color: COLORS[i % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg shadow-xl shadow-black/50">
          <p className="text-slate-300 font-bold mb-1">{data.name}</p>
          <p className="text-white text-sm">
            Load: {Math.floor(data.value)} ({data.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 flex flex-col">
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ filter: `drop-shadow(0px 0px 8px ${entry.color}80)` }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-5%]">
          <span className="text-2xl font-extrabold text-white">100%</span>
          <span className="text-xs text-slate-400 font-semibold">Total Load</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
              ></span>
              <span className="text-slate-300 font-semibold">{entry.name}</span>
            </div>
            <div className="flex gap-4 text-slate-400">
              <span>{Math.floor(entry.value)}</span>
              <span className="w-10 text-right">{entry.percentage.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerDistribution;
