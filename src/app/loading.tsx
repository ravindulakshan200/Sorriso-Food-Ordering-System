"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background z-[99999] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t border-r border-accent rounded-full opacity-70"
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-b border-l border-white/30 rounded-full"
        />
        {/* Core Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 bg-accent rounded-full shadow-[0_0_15px_rgba(201,168,76,1)]"
        />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-8 font-accent tracking-[0.3em] text-[10px] text-text-muted uppercase"
      >
        Preparing your experience...
      </motion.p>
    </div>
  );
}
