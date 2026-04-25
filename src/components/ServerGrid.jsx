import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServerCard from './ServerCard';

const ServerGrid = ({ servers }) => {
  // Find worst performing server
  const maxLoad = Math.max(...servers.map(s => s.load));
  const worstServerId = maxLoad > 120 ? servers.find(s => s.load === maxLoad)?.id : null;

  return (
    <div className="flex-1 w-full relative">
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {servers.map((server) => (
            <ServerCard 
              key={server.id} 
              id={server.id} 
              load={server.load} 
              isWorst={server.id === worstServerId}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ServerGrid;
