"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-24 bg-secondary relative z-10 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Image Split */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
        >
          {/* Gold Frame Accent behind image */}
          <div className="absolute top-8 left-8 bottom-[-2rem] right-[-2rem] border border-accent mix-blend-screen opacity-50 z-0"></div>
          
          <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden z-10 shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop" 
              alt="Restaurant Interior"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
        
        {/* Right Text Split */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 relative pl-6 lg:pl-12"
        >
          {/* Vertical Gold Line Divider */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-accent to-transparent opacity-50 hidden lg:block" />

          <span className="font-accent text-accent tracking-[0.3em] text-xs uppercase mb-6 block">Our Story</span>
          <h2 className="font-heading text-5xl lg:text-7xl font-light text-white mb-8 leading-tight">
            Our Story
          </h2>
          
          <div className="space-y-6 font-body text-text-muted text-lg font-light leading-relaxed mb-12">
            <p>
              Born in 2024 with a simple belief — that great food brings people together. Sorriso Food was founded in Battaramulla with a passion for crafting unforgettable Sri Lankan and International fusion dishes. Every plate we serve carries the love and dedication of our kitchen team. Your belly knows best — and we make sure it knows happiness.
            </p>
          </div>
          
          <Link href="/about" className="group inline-flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform"/>
            </div>
            <span className="font-accent tracking-[0.2em] uppercase text-sm font-medium text-white group-hover:text-accent transition-colors">Discover More</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
