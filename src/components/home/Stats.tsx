"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, Truck, UtensilsCrossed } from "lucide-react";

const STATS = [
  { icon: UtensilsCrossed, value: "16+", label: "Menu Items", color: "text-amber-400" },
  { icon: Star, value: "4.8★", label: "Customer Rating", color: "text-yellow-400" },
  { icon: ShoppingBag, value: "500+", label: "Orders Served", color: "text-green-400" },
  { icon: Truck, value: "Fast", label: "Delivery Available", color: "text-blue-400" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-background relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-accent/20 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className={`font-heading text-4xl font-light mb-1 ${color}`}>{value}</p>
              <p className="font-accent text-[10px] tracking-widest uppercase text-text-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
