"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex-grow bg-background flex flex-col items-center justify-center -mt-24 min-h-screen relative z-10 px-6">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        <h1 className="font-heading text-[150px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-50 select-none">
          404
        </h1>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mt-6">
          <span className="font-accent text-accent tracking-[0.4em] text-sm uppercase block mb-2">
            Page Not Found
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light tracking-wide mb-8">
            The Table Is Empty
          </h2>
        </div>
        
        <p className="font-body text-text-muted text-lg max-w-md mx-auto mb-10 mt-16 leading-relaxed">
          The culinary journey you are looking for seems to have moved or does not exist. Allow us to redirect you.
        </p>

        <Link 
          href="/"
          className="group relative inline-flex items-center gap-4 bg-transparent border border-accent px-10 py-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          <span className="relative z-10 font-accent text-xs tracking-[0.2em] font-bold text-accent group-hover:text-background uppercase transition-colors duration-500 delay-100">
            Return Home
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
