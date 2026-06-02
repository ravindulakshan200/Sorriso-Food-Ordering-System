"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "🍚 Basmathi Rice",
  "🌶️ Crispy Bites",
  "🥢 Wok-Tossed",
  "🔥 Deviled Dishes",
  "🍤 Hot Butter Cuttle Fish",
  "🍗 Chilli Chicken",
  "🍛 Nasi Gurang",
  "🥩 Mix Meat Rice",
  "🦑 Sea Food Special",
  "🌿 Vege Options",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="py-5 bg-accent/10 border-y border-accent/20 overflow-hidden relative z-10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        className="flex gap-0 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="font-accent text-[11px] tracking-[0.25em] uppercase text-accent/80 px-6">
              {item}
            </span>
            <span className="text-accent/30 text-xs">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
