import React from 'react';
import { ShieldCheck, AlertTriangle, Gauge } from 'lucide-react';

const SystemStatus = ({ servers, isRunning }) => {
  const maxLoad = Math.max(...servers.map(s => s.load));
  const worstServer = servers.find(s => s.load === maxLoad);
  
  // Fake efficiency calculation for visual purposes
  const efficiency = isRunning ? (100 - (maxLoad / 400) * 20).toFixed(1) : '100.0';

  const isStable = maxLoad < 250;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* System Status */}
      <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden group">
        <div className="flex items-center gap-2 mb-4">
          {isStable ? (
            <ShieldCheck className="w-5 h-5 text-neon-green" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-neon-orange" />
          )}
          <span className="text-white font-bold">System Status</span>
        </div>
        
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-colors duration-500 ${
          isStable ? 'bg-neon-green/10 border-neon-green/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-neon-orange/10 border-neon-orange/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
        }`}>
          <span className={`text-2xl font-extrabold tracking-widest ${isStable ? 'text-neon-green' : 'text-neon-orange'}`}>
            {isStable ? 'STABLE' : 'WARNING'}
          </span>
          <span className={`text-xs mt-1 font-semibold ${isStable ? 'text-emerald-400' : 'text-orange-400'}`}>
            {isStable ? 'All servers operational' : 'High load detected'}
          </span>
        </div>
      </div>

      {/* Worst Performing Server */}
      <div className="glass-card p-6 flex flex-col justify-between">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Worst Performing Server</span>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-extrabold text-neon-yellow tracking-tight">
              SRV-{worstServer ? worstServer.id.split('-')[1] || worstServer.id : 'N/A'}
            </div>
            <div className="text-slate-400 text-xs mt-1">
              Load: {worstServer ? Math.floor(worstServer.load) : 0} ({worstServer ? Math.floor((worstServer.load / 400) * 100) : 0}%)
            </div>
          </div>
          <div className="flex items-end gap-1 h-10">
            {/* Fake mini bar chart */}
            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
              <div 
                key={i} 
                className="w-2 bg-neon-yellow rounded-t-sm opacity-80" 
                style={{ height: `${h}%`, boxShadow: '0 0 5px rgba(234,179,8,0.5)' }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency */}
      <div className="glass-card p-6 flex flex-col justify-between relative">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Efficiency</span>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold text-neon-green tracking-tight">
              {efficiency}%
            </div>
            <div className="text-neon-green text-xs font-semibold mt-1">
              Good Distribution
            </div>
          </div>
          <div className="relative w-16 h-16">
            {/* Fake Gauge */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="40" fill="transparent" 
                stroke="#10b981" strokeWidth="8" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * (parseFloat(efficiency) / 100))} 
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(16,185,129,0.8))' }}
              />
            </svg>
            <Gauge className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default SystemStatus;
