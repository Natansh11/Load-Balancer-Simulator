import React from 'react';
import Navbar from './components/Navbar';
import ControlPanel from './components/ControlPanel';
import StatsPanel from './components/StatsPanel';
import ServerGrid from './components/ServerGrid';
import RequestFlow from './components/RequestFlow';
import LoadChart from './components/LoadChart';
import ServerDistribution from './components/ServerDistribution';
import SystemStatus from './components/SystemStatus';
import { useSimulation } from './hooks/useSimulation';

function App() {
  const {
    isRunning,
    setIsRunning,
    hour,
    serverCount,
    setServerCount,
    algorithm,
    setAlgorithm,
    totalRequests,
    currentRequests,
    servers,
    activeSpike,
    history,
    reset
  } = useSimulation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background ambient effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-blue/5 blur-[150px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 z-10">
        
        <ControlPanel 
          isRunning={isRunning} 
          setIsRunning={setIsRunning} 
          algorithm={algorithm} 
          setAlgorithm={setAlgorithm} 
          serverCount={serverCount} 
          setServerCount={setServerCount} 
          hour={hour}
          reset={reset} 
        />

        <StatsPanel 
          totalRequests={totalRequests} 
          currentRequests={currentRequests}
          activeSpike={activeSpike} 
          algorithm={algorithm} 
        />

        {/* Real-time Traffic Flow Section */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_8px_#8b5cf6]"></span>
            Real-time Traffic Flow
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 relative min-h-[300px]">
            <div className="flex-1 relative border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden min-h-[200px]">
              <RequestFlow isRunning={isRunning} currentRequests={currentRequests} />
            </div>
            
            <div className="w-full lg:w-3/5">
              <ServerGrid servers={servers} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center gap-2 text-white font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#3b82f6]"></span>
              Traffic Overview (24h)
            </div>
            <LoadChart history={history} currentHour={hour} />
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 text-white font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#06b6d4]"></span>
              Server Load Distribution
            </div>
            <ServerDistribution servers={servers} />
          </div>
        </div>

        <SystemStatus servers={servers} isRunning={isRunning} />

      </main>

      <footer className="w-full py-6 text-center border-t border-slate-800 bg-[#0B0F19]/80 z-10">
        <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto px-4 text-slate-400 text-xs">
          <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center font-bold text-[8px]">i</div>
          <p>
            This simulation demonstrates how randomized and round-robin algorithms are used in real-world cloud systems to distribute traffic efficiently under dynamic conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
