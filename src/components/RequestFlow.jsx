import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This component generates visual particles flowing towards the right
const RequestFlow = ({ isRunning, currentRequests }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isRunning || currentRequests === 0) return;

    // Determine how many particles to spawn per interval based on currentRequests
    const spawnRate = Math.max(80, 1000 / (currentRequests / 5)); // Cap spawn rate
    
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random().toString(36).substr(2, 9),
        top: `${Math.random() * 80 + 10}%`, // Random vertical position (10% to 90%)
        duration: Math.random() * 1.5 + 1.0, // 1.0s to 2.5s
        color: Math.random() > 0.5 ? 'bg-neon-purple shadow-[0_0_10px_#8b5cf6]' : 'bg-neon-blue shadow-[0_0_10px_#3b82f6]',
      };

      setParticles(prev => [...prev.slice(-40), newParticle]); // keep max 40 to avoid lag
    }, spawnRate);

    return () => clearInterval(interval);
  }, [isRunning, currentRequests]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background static connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <path d="M0 50 Q 100 20 200 50 T 400 50" fill="transparent" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5,5" />
        <path d="M0 100 Q 150 150 250 100 T 500 100" fill="transparent" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" />
        <path d="M0 150 Q 100 180 200 150 T 400 150" fill="transparent" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5" />
      </svg>
      
      {/* Fixed glowing nodes to represent sources */}
      <div className="absolute left-[10%] top-[30%] w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_15px_#8b5cf6]"></div>
      <div className="absolute left-[20%] top-[60%] w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_15px_#3b82f6]"></div>
      <div className="absolute left-[30%] top-[40%] w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_15px_#06b6d4]"></div>
      <div className="absolute left-[40%] top-[70%] w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_15px_#8b5cf6]"></div>

      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ left: '-5%', top: p.top, opacity: 0, scale: 0 }}
            animate={{ left: '105%', opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: 'linear' }}
            className={`absolute w-1.5 h-1.5 rounded-full ${p.color}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RequestFlow;
