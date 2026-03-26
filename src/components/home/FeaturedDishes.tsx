"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";
import { MenuItem } from "@/types";
import { useToast } from "@/components/providers/ToastProvider";

const FEATURED: MenuItem[] = [
  {
    id: "dish-1",
    name: "Truffle Lobster Risotto",
    description: "Creamy arborio rice, fresh Maine lobster, shaved black truffle, aged parmesan.",
    price: 6500,
    category: "Mains",
    image_url: "https://images.unsplash.com/photo-1626203004838-8e658e38ee05?q=80&w=800&auto=format&fit=crop",
    is_available: true,
    is_featured: true,
  },
  {
    id: "dish-2",
    name: "Wagyu Beef Wellington",
    description: "Premium A5 Wagyu wrapped in mushroom duxelles and crisp puff pastry.",
    price: 12500,
    category: "Mains",
    image_url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop",
    is_available: true,
    is_featured: true,
  },
  {
    id: "dish-3",
    name: "Saffron Spiced Seabass",
    description: "Pan-seared Chilean seabass with saffron beurre blanc and asparagus.",
    price: 4800,
    category: "Mains",
    image_url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    is_available: true,
    is_featured: true,
  },
  {
    id: "dish-4",
    name: "Gold Leaf Chocolate Tart",
    description: "Valrhona dark chocolate ganache, hazelnut praline, 24k edible gold.",
    price: 2500,
    category: "Desserts",
    image_url: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop",
    is_available: true,
    is_featured: true,
  },
];

export default function FeaturedDishes() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    toast(`${item.name} added to cart`, "success");
  };

  return (
    <section className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 lg:px-12 mb-16 flex justify-between items-end border-b border-white/10 pb-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="font-accent text-accent tracking-[0.3em] text-xs uppercase mb-4 block">Seasonal Menu</span>
          <h2 className="font-heading text-5xl md:text-6xl text-white font-light">Featured Creations</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:block"
        >
          <a href="/menu" className="font-accent text-sm tracking-[0.2em] font-medium text-text-muted hover:text-accent uppercase transition-colors flex flex-col items-center group">
            <span className="mb-2">View Full Menu</span>
            <div className="w-8 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full relative px-6 md:px-12 container mx-auto">
        <div className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide no-scrollbar scroll-smooth">
          {FEATURED.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="snap-start snap-always shrink-0 w-[300px] md:w-[380px] bg-card rounded-2xl overflow-hidden glass hover:glass-hover group flex flex-col h-[520px]"
            >
              <div className="relative h-[250px] w-full overflow-hidden shrink-0">
                <Image 
                  src={item.image_url} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-white/10 font-heading text-xl text-accent px-4 py-1 rounded-full">
                  {formatPrice(item.price)}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow relative">
                <h3 className="font-heading text-2xl font-medium text-white mb-3 tracking-wide">{item.name}</h3>
                <p className="font-body text-text-muted font-light leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>
                <button 
                  onClick={() => handleAdd(item)}
                  className="mt-auto flex items-center justify-between w-full border border-white/10 group-hover:border-accent text-text-muted group-hover:text-accent bg-background/50 py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  <span className="font-accent text-xs tracking-[0.2em] uppercase">Add to Order</span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {/* Spacing element at end so last card isn't flush */}
          <div className="snap-start shrink-0 w-1 md:w-8" />
        </div>
      </div>
    </section>
  );
}
