import React from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import clsx from 'clsx';

const ServerCard = ({ id, load, isWorst }) => {
  // Determine color based on load
  let statusColor = 'bg-neon-green';
  let textColor = 'text-neon-green';
  let borderColor = 'border-neon-green';
  let shadowGlow = 'shadow-[0_0_15px_rgba(16,185,129,0.4)]';
  
  if (load > 250) {
    statusColor = 'bg-neon-orange';
    textColor = 'text-neon-orange';
    borderColor = 'border-neon-orange';
    shadowGlow = 'shadow-[0_0_20px_rgba(249,115,22,0.6)]';
  } else if (load > 120) {
    statusColor = 'bg-neon-yellow';
    textColor = 'text-neon-yellow';
    borderColor = 'border-neon-yellow';
    shadowGlow = 'shadow-[0_0_15px_rgba(234,179,8,0.5)]';
  }

  // Calculate percentage for progress bar (max visual load around 400)
  const percent = Math.min(100, (load / 400) * 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "bg-slate-900/40 backdrop-blur-sm border-2 rounded-2xl flex flex-col items-center justify-between py-6 px-4 relative transition-all duration-300 w-full min-h-[220px]",
        borderColor,
        shadowGlow,
        isWorst && "ring-2 ring-red-500/50"
      )}
    >
      {/* Background Pulse Effect for high load */}
      {load > 250 && (
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={clsx("absolute inset-0 pointer-events-none rounded-xl", statusColor.replace('bg-', 'bg-').concat('/10'))}
        />
      )}

      {/* Top Icon and Label */}
      <div className="flex flex-col items-center gap-2 z-10 w-full">
        <Server className={clsx("w-8 h-8", textColor)} strokeWidth={1.5} />
        <span className="font-bold text-slate-300 tracking-wider text-sm">SRV-{id.split('-')[1] || id}</span>
      </div>

      {/* Load Count and Percentage */}
      <div className="flex flex-col items-center justify-center flex-1 z-10 my-4">
        <div className="text-3xl font-extrabold text-white tracking-tight">
          {Math.floor(load)}
        </div>
        <div className={clsx("text-xs font-semibold mt-1", textColor)}>
          {Math.floor(percent)}%
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-auto z-10">
        <motion.div
          className={clsx("h-full rounded-full shadow-[0_0_10px_currentColor]", statusColor)}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </motion.div>
  );
};

export default ServerCard;
