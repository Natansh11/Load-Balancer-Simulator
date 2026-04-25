import React from 'react';
import { Cloud, Server, Moon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-8 flex flex-col md:flex-row items-center justify-between border-b border-slate-800/50 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Cloud className="text-neon-purple w-10 h-10" strokeWidth={1.5} />
          <Server className="text-neon-cyan w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase flex items-center gap-2">
            <span className="text-neon-purple">AI</span> Load Balancer
          </h1>
          <p className="text-slate-400 text-xs mt-0.5 font-medium uppercase tracking-widest">
            Data Driven Simulator
          </p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button className="text-white bg-slate-800/50 px-6 py-2 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
          Dashboard
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          Analytics
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          About
        </button>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <button className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-colors">
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
