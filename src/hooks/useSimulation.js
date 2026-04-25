import { useState, useEffect, useRef } from 'react';
import trafficData from '../data/trafficData.json';
import spikeData from '../data/spikeData.json';
import { assignRandom, roundRobin, getRequests } from '../logic/loadBalancer';

export const useSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hour, setHour] = useState(0);
  const [serverCount, setServerCount] = useState(4);
  const [algorithm, setAlgorithm] = useState('random'); // 'random' or 'round-robin'
  const [totalRequests, setTotalRequests] = useState(0);
  
  // Initialize servers
  const initServers = (count) => Array.from({ length: count }, (_, i) => ({ id: `srv-${i + 1}`, load: 0 }));
  const [servers, setServers] = useState(initServers(4));
  
  const [activeSpike, setActiveSpike] = useState(null);
  const [history, setHistory] = useState(Array(24).fill(0));
  const [currentRequests, setCurrentRequests] = useState(0);
  
  const rrIndexRef = useRef(0);
  const speedRef = useRef(1000); // 1 tick = 1 second

  // Handle server count changes
  useEffect(() => {
    setServers(initServers(serverCount));
    rrIndexRef.current = 0;
  }, [serverCount]);

  // Simulation loop
  useEffect(() => {
    if (!isRunning) return;

    const tick = setInterval(() => {
      setHour((prevHour) => {
        const nextHour = (prevHour + 1) % 24;
        return nextHour;
      });
    }, speedRef.current);

    return () => clearInterval(tick);
  }, [isRunning]);

  // Handle Logic per hour tick
  useEffect(() => {
    if (!isRunning) return;

    // 1. Get new requests for this hour
    const incomingRequestsRaw = getRequests(hour, trafficData, spikeData);
    // Since requests in JSON are per hour, let's say per tick we get 1/10th or just scale it down so it fits in UI. 
    // We'll scale down for visualization purposes (e.g. / 10).
    const incomingRequests = Math.floor(incomingRequestsRaw / 10);
    setCurrentRequests(incomingRequests);
    
    // Check spike
    const spike = spikeData.find(s => s.hour === hour);
    setActiveSpike(spike ? spike.event : null);

    setTotalRequests(prev => prev + incomingRequests);

    // Update history for chart
    setHistory(prev => {
      const newHist = [...prev];
      newHist[hour] = incomingRequests;
      return newHist;
    });

    // 2. Distribute requests to servers
    setServers(prevServers => {
      // First decay previous loads (servers processing requests)
      let newServers = prevServers.map(s => ({ ...s, load: Math.max(0, s.load - Math.max(30, Math.floor(s.load * 0.3))) }));

      // Distribute new requests
      for (let i = 0; i < incomingRequests; i++) {
        if (algorithm === 'random') {
          const targetId = assignRandom(newServers);
          const targetServer = newServers.find(s => s.id === targetId);
          if (targetServer) targetServer.load += 1;
        } else if (algorithm === 'round-robin') {
          const { id, nextIndex } = roundRobin(newServers, rrIndexRef.current);
          rrIndexRef.current = nextIndex;
          const targetServer = newServers.find(s => s.id === id);
          if (targetServer) targetServer.load += 1;
        }
      }
      return newServers;
    });

  }, [hour, isRunning, algorithm]);

  const reset = () => {
    setIsRunning(false);
    setHour(0);
    setTotalRequests(0);
    setServers(initServers(serverCount));
    setHistory(Array(24).fill(0));
    setActiveSpike(null);
    setCurrentRequests(0);
    rrIndexRef.current = 0;
  };

  return {
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
  };
};
