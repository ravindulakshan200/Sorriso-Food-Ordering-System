"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartProvider";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/contexts/ToastProvider";
import { FEATURED_ITEMS } from "@/lib/seed-data";

export default function FeaturedDishes() {
  const { addToCart, items } = useCart();
  const { toast } = useToast();

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="font-accent text-accent tracking-[0.35em] text-xs uppercase mb-3 block">
              Crowd Favourites
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-light leading-tight">
              Must-Try <span className="text-accent">Dishes</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 font-accent text-xs tracking-[0.2em] uppercase text-text-muted hover:text-accent transition-colors"
            >
              Full Menu
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ITEMS.map((item, i) => {
            const cartItemId = `${item.id}-Medium`;
            const inCart = items.find(x => x.cartItemId === cartItemId);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 flex flex-col transition-all duration-300 hover:shadow-[0_8px_40px_rgba(201,168,76,0.12)]"
              >
                {/* Category chip */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="font-accent text-[8px] tracking-widest uppercase bg-background/80 backdrop-blur-md border border-white/10 text-text-muted px-2.5 py-1 rounded-full">
                    {item.category === "Rice (Basmathi)" ? "🍚 Rice" : "🌶️ Bite"}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-5">
                  <h3 className="font-heading text-lg text-white font-medium leading-tight mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="font-body text-text-muted text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price + Add */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-accent text-[9px] tracking-widest text-text-muted uppercase block">
                        from
                      </span>
                      <span className="font-heading text-lg text-accent">
                        {formatPrice(item.price_medium ?? item.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(item, "Medium");
                        toast(`${item.name} (Medium) added!`, "success");
                      }}
                      className={`flex items-center gap-2 rounded-xl border py-2 px-3 font-accent text-[10px] tracking-widest uppercase transition-all ${
                        inCart
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-white/10 text-text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      {inCart ? <ShoppingBag className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {inCart ? "In Cart" : "Add"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/menu"
            className="group flex items-center gap-3 border border-white/10 hover:border-accent text-text-muted hover:text-accent px-8 py-3.5 font-accent text-xs tracking-[0.2em] uppercase transition-all duration-300"
          >
            See All {16} Dishes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

