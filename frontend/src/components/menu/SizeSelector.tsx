"use client";

import { motion } from "framer-motion";
import { ItemSize } from "@/types";

interface SizeSelectorProps {
  selectedSize: ItemSize;
  onSelect: (size: ItemSize) => void;
  mediumPrice: number;
  largePrice: number;
  formatPrice: (n: number) => string;
}

export default function SizeSelector({
  selectedSize,
  onSelect,
  mediumPrice,
  largePrice,
  formatPrice,
}: SizeSelectorProps) {
  const sizes: { label: ItemSize; price: number; abbr: string }[] = [
    { label: "Medium", price: mediumPrice, abbr: "M" },
    { label: "Large", price: largePrice, abbr: "L" },
  ];

  return (
    <div className="flex gap-2 w-full">
      {sizes.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onSelect(s.label)}
          className={`relative flex-1 flex flex-col items-center py-2 rounded-xl border text-xs transition-all duration-200 overflow-hidden ${
            selectedSize === s.label
              ? "border-accent bg-accent/10 text-accent"
              : "border-white/10 text-text-muted hover:border-white/30 hover:text-white"
          }`}
        >
          {selectedSize === s.label && (
            <motion.div
              layoutId="size-bg"
              className="absolute inset-0 bg-accent/10 rounded-xl"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="font-accent font-bold tracking-widest text-[10px] uppercase z-10">
            {s.abbr} · {s.label}
          </span>
          <span className="font-heading text-sm font-medium z-10 mt-0.5">
            {formatPrice(s.price)}
          </span>
        </button>
      ))}
    </div>
  );
}
