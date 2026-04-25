import React from 'react';
import { motion } from 'framer-motion';
import { Play, Square, RotateCcw, Settings, Clock } from 'lucide-react';
import clsx from 'clsx';

const ControlPanel = ({ 
  isRunning, setIsRunning, 
  algorithm, setAlgorithm, 
  serverCount, setServerCount, 
  hour,
  reset 
}) => {
  return (
    <div className="glass-card p-4 flex flex-col w-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
        <h2 className="text-lg font-bold flex items-center gap-2 text-white">
          <Settings className="w-5 h-5 text-neon-purple" />
          Control Panel
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_#10b981]"></span>
          <span className="text-neon-green text-xs font-semibold">System Running</span>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
        
        {/* Buttons & Algorithm */}
        <div className="flex items-center gap-6 w-full lg:w-auto border-r-0 lg:border-r border-slate-800 pr-0 lg:pr-6">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRunning(!isRunning)}
              className={clsx(
                "py-2 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                isRunning ? "bg-gradient-to-r from-neon-purple to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
              )}
            >
              {isRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isRunning ? 'STOP' : 'START'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="py-2 px-6 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              RESET
            </motion.button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Algorithm</label>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700/50 relative overflow-hidden">
              <motion.div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-800 rounded-md border border-neon-purple/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                animate={{ left: algorithm === 'random' ? '4px' : 'calc(50% + 0px)' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setAlgorithm('random')}
                className={clsx(
                  "px-4 py-1.5 text-xs font-semibold z-10 transition-colors",
                  algorithm === 'random' ? "text-white" : "text-slate-500 hover:text-slate-300"
                )}
              >
                Random
              </button>
              <button
                onClick={() => setAlgorithm('round-robin')}
                className={clsx(
                  "px-4 py-1.5 text-xs font-semibold z-10 transition-colors",
                  algorithm === 'round-robin' ? "text-white" : "text-slate-500 hover:text-slate-300"
                )}
              >
                Round Robin
              </button>
            </div>
          </div>
        </div>

        {/* Server Count Slider */}
        <div className="flex-1 flex flex-col gap-1 w-full border-r-0 lg:border-r border-slate-800 pr-0 lg:pr-6">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1"><Settings className="w-3 h-3" /> Server Count</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 border border-slate-700 px-3 py-1 rounded text-white text-sm font-bold w-12 text-center">
              {serverCount}
            </div>
            <input
              type="range"
              min="2"
              max="8"
              value={serverCount}
              onChange={(e) => setServerCount(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neon-purple disabled:opacity-50"
            />
            <span className="text-slate-500 text-xs">10</span>
          </div>
        </div>

        {/* Simulation Time */}
        <div className="flex-1 flex flex-col gap-1 w-full pl-0 lg:pl-2">
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
            <Clock className="w-3 h-3" /> Simulation Time
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-white leading-tight">
              {hour.toString().padStart(2, '0')}:00 AM
            </span>
            <span className="text-xs text-slate-400 mb-2">Hour: {hour} / 23</span>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neon-purple shadow-[0_0_10px_rgba(139,92,246,0.8)] rounded-full transition-all duration-300" 
                style={{ width: `${(hour / 23) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ControlPanel;
