"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const sentence: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.1 },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const headingText = "Taste of the Heaven.";

  return (
    <section className="relative h-screen w-full flex items-center justify-center -mt-24 overflow-hidden">
      {/* Background Image with Parallax & Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2940&auto=format&fit=crop')]"
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-accent text-accent tracking-[0.3em] text-sm uppercase mb-6 block"
        >
          SORRISO FOOD · SINCE 2024
        </motion.span>
        
        <motion.h1 
          className="font-heading text-6xl md:text-7xl lg:text-9xl font-light text-white mb-8 tracking-tight relative cursor-default"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {headingText.split("").map((char, index) => (
            <motion.span key={index} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "anticipate" }}
            className="absolute -bottom-4 left-[10%] right-[10%] h-[2px] bg-accent origin-center"
          />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl font-body text-text-muted text-lg md:text-xl mb-12 font-light"
        >
          Your Belly Knows Best — Experience extraordinary flavors crafted with passion in the heart of Battaramulla.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link 
            href="/menu" 
            className="group flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-background px-8 py-4 font-accent text-sm tracking-[0.2em] uppercase font-medium transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
          >
            Order Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/reservations" 
            className="group flex items-center justify-center gap-3 border border-white hover:border-accent hover:text-accent text-white px-8 py-4 font-accent text-sm tracking-[0.2em] uppercase font-medium bg-black/20 backdrop-blur-sm transition-all"
          >
            Reserve a Table
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50"
      >
        <span className="font-accent text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
