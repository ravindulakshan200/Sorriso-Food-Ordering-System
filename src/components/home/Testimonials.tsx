"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    author: "Eleanor Vance",
    role: "Food Critic",
    content: "The most profound culinary experience I've had this decade. Each course was a masterclass in flavor, texture, and presentation. Sorriso Food is not just a restaurant; it's a destination.",
    rating: 5,
  },
  {
    author: "Julian Black",
    role: "Michelin Guide Contributor",
    content: "Sorriso Food redefines luxury dining. The Wagyu Wellington alone is worth crossing continents for. Impeccable service, stunning ambiance, and otherworldly flavors.",
    rating: 5,
  },
  {
    author: "Sophia Chen",
    role: "Lifestyle Magazine Editor",
    content: "From the moment you walk through the doors, you are transported. The attention to detail in everything—from the lighting to the plating—is simply staggering. A rare gem.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-32 bg-card relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        <Quote className="w-16 h-16 text-accent/20 mb-8" />
        <h2 className="font-heading text-4xl md:text-5xl text-white font-light text-center mb-16 tracking-wide">
          Guest Encounters
        </h2>

        <div className="relative w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center p-8 bg-background/50 backdrop-blur-sm border border-white/5 rounded-2xl"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="font-heading text-2xl md:text-3xl text-white font-light leading-relaxed mb-8 italic">
                &quot;{TESTIMONIALS[currentIndex].content}&quot;
              </p>
              <h4 className="font-accent text-sm tracking-[0.2em] font-bold text-accent uppercase mb-1">
                {TESTIMONIALS[currentIndex].author}
              </h4>
              <span className="font-body text-text-muted text-sm font-light">
                {TESTIMONIALS[currentIndex].role}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 flex items-center justify-center">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 flex items-center justify-center">
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent hover:bg-white/5 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-accent" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
