import React from 'react';
import { Share2, Activity, HeartPulse, Server } from 'lucide-react';
import clsx from 'clsx';

const StatsPanel = ({ totalRequests, currentRequests, activeSpike, algorithm }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      
      {/* Total Requests */}
      <div className="glass-card p-4 flex flex-col justify-between border-t-2 border-t-neon-purple border-l-0 border-r-0 border-b-0 hover:bg-slate-800/60 transition-colors group">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-shadow">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Requests</span>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {totalRequests.toLocaleString()}
          </div>
          <div className="text-neon-green text-xs font-semibold mt-1">
            +{(currentRequests || 128)} this hour
          </div>
        </div>
      </div>

      {/* Requests / Sec */}
      <div className="glass-card p-4 flex flex-col justify-between border-t-2 border-t-neon-blue border-l-0 border-r-0 border-b-0 hover:bg-slate-800/60 transition-colors group">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Requests / Sec</span>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {Math.round((currentRequests || 128) / 3600)}
          </div>
          <div className="text-neon-blue text-xs font-semibold mt-1">
            Live Traffic
          </div>
        </div>
      </div>

      {/* Active Spike */}
      <div className={clsx(
        "glass-card p-4 flex flex-col justify-between border-t-2 border-l-0 border-r-0 border-b-0 hover:bg-slate-800/60 transition-colors group",
        activeSpike ? "border-t-neon-pink" : "border-t-neon-green"
      )}>
        <div className="flex items-center gap-3 mb-2">
          <div className={clsx(
            "p-2 rounded-lg transition-shadow",
            activeSpike 
              ? "bg-neon-pink/10 text-neon-pink group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
              : "bg-neon-green/10 text-neon-green group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          )}>
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active Spike</span>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-extrabold text-white tracking-tight capitalize">
            {activeSpike || 'None'}
          </div>
          <div className={clsx(
            "text-xs font-semibold mt-1",
            activeSpike ? "text-neon-pink" : "text-neon-green"
          )}>
            {activeSpike ? "High Traffic Detected" : "Normal Traffic"}
          </div>
        </div>
      </div>

      {/* Algorithm */}
      <div className="glass-card p-4 flex flex-col justify-between border-t-2 border-t-neon-cyan border-l-0 border-r-0 border-b-0 hover:bg-slate-800/60 transition-colors group">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-shadow">
            <Server className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Algorithm</span>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-extrabold text-white tracking-tight capitalize">
            {algorithm.replace('-', ' ')}
          </div>
          <div className="text-neon-cyan text-xs font-semibold mt-1">
            In Use
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsPanel;
