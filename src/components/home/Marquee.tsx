"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const words = ["SORRISO FOOD", "TASTE OF THE HEAVEN", "YOUR BELLY KNOWS BEST", "SINCE 2024", "BATTARAMULLA"];
  const repeatedWords = [...words, ...words, ...words, ...words, ...words];

  return (
    <div className="w-full bg-accent text-background py-4 overflow-hidden flex border-y border-accent-hover relative z-20">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {repeatedWords.map((word, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="font-accent text-sm font-bold tracking-[0.3em] uppercase">{word}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-background/50 inline-block" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
