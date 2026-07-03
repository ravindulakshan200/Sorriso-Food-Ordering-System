"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { MenuItem, ItemSize } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartProvider";
import { useToast } from "@/contexts/ToastProvider";
import SizeSelector from "./SizeSelector";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Rice (Basmathi)": "from-amber-500/20 to-orange-600/10 border-amber-500/20",
  Bite: "from-red-500/20 to-rose-600/10 border-red-500/20",
  Starters: "from-emerald-500/20 to-green-600/10 border-emerald-500/20",
  Mains: "from-blue-500/20 to-indigo-600/10 border-blue-500/20",
  Desserts: "from-pink-500/20 to-fuchsia-600/10 border-pink-500/20",
  Drinks: "from-cyan-500/20 to-teal-600/10 border-cyan-500/20",
};

const CATEGORY_BADGE: Record<string, string> = {
  "Rice (Basmathi)": "🍚",
  Bite: "🌶️",
  Starters: "🥗",
  Mains: "🍽️",
  Desserts: "🍮",
  Drinks: "🍹",
};

export default function MenuCard({ item, index }: MenuCardProps) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const defaultSize: ItemSize = "Medium";
  const [selectedSize, setSelectedSize] = useState<ItemSize>(defaultSize);

  // Find if this item+size combo is already in cart
  const cartItemId = item.has_sizes ? `${item.id}-${selectedSize}` : item.id;
  const cartEntry = items.find((i) => i.cartItemId === cartItemId);
  const qty = cartEntry?.quantity ?? 0;

  const currentPrice = item.has_sizes
    ? selectedSize === "Medium"
      ? (item.price_medium ?? item.price)
      : (item.price_large ?? item.price)
    : item.price;

  const handleAdd = () => {
    addToCart(item, item.has_sizes ? selectedSize : undefined);
    toast(`${item.name}${item.has_sizes ? ` (${selectedSize})` : ""} added to cart`, "success");
  };

  const handleIncrease = () => {
    if (cartEntry) {
      updateQuantity(cartItemId, cartEntry.quantity + 1);
    } else {
      handleAdd();
    }
  };

  const handleDecrease = () => {
    if (!cartEntry) return;
    if (cartEntry.quantity <= 1) {
      removeFromCart(cartItemId);
    } else {
      updateQuantity(cartItemId, cartEntry.quantity - 1);
    }
  };

  const gradientClass = CATEGORY_COLORS[item.category] ?? "from-white/5 to-transparent border-white/10";
  const emoji = CATEGORY_BADGE[item.category] ?? "🍴";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 flex flex-col shadow-lg hover:shadow-[0_8px_32px_rgba(201,168,76,0.12)] transition-all duration-400"
    >
      {/* Featured badge */}
      {item.is_featured && (
        <div className="absolute top-3 left-3 z-20 bg-accent text-background font-accent text-[8px] tracking-[0.2em] px-2.5 py-1.5 uppercase font-bold flex items-center gap-1 rounded-sm shadow-lg">
          <Star className="w-2.5 h-2.5 fill-background" />
          Featured
        </div>
      )}

      {/* Category emoji badge */}
      <div className="absolute top-3 right-3 z-20 bg-background/70 backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center text-base shadow border border-white/10">
        {emoji}
      </div>

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-grow p-5 bg-gradient-to-b ${gradientClass} border-t`}>
        {/* Category label */}
        <span className="font-accent text-[9px] tracking-[0.2em] text-text-muted uppercase mb-1.5">
          {item.category}
        </span>

        <h3 className="font-heading text-lg font-medium text-white leading-tight mb-2 line-clamp-2">
          {item.name}
        </h3>

        <p className="font-body text-text-muted text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
          {item.description}
        </p>

        {/* Size selector for sized items */}
        {item.has_sizes && item.price_medium != null && item.price_large != null ? (
          <div className="mb-4">
            <SizeSelector
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
              mediumPrice={item.price_medium}
              largePrice={item.price_large}
              formatPrice={formatPrice}
            />
          </div>
        ) : (
          <div className="mb-4 flex items-center justify-between">
            <span className="font-heading text-xl text-accent">
              {formatPrice(currentPrice)}
            </span>
          </div>
        )}

        {/* Add to cart / quantity controls */}
        {qty === 0 ? (
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-between border border-white/10 hover:border-accent text-text-muted hover:text-accent bg-background/40 hover:bg-accent/5 py-3 px-4 rounded-xl transition-all duration-200 group/btn"
          >
            <span className="font-accent text-[10px] tracking-[0.2em] uppercase font-bold">
              Add to Cart
            </span>
            <div className="w-6 h-6 rounded-full bg-accent/0 group-hover/btn:bg-accent/20 flex items-center justify-center transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </div>
          </button>
        ) : (
          <div className="flex items-center justify-between bg-background/40 border border-accent/30 rounded-xl px-3 py-2">
            <button
              onClick={handleDecrease}
              className="w-7 h-7 rounded-full bg-accent/10 hover:bg-accent/25 flex items-center justify-center text-accent transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5 text-accent" />
              <span className="font-accent font-bold text-sm text-white">{qty}</span>
            </div>
            <button
              onClick={handleIncrease}
              className="w-7 h-7 rounded-full bg-accent/10 hover:bg-accent/25 flex items-center justify-center text-accent transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

