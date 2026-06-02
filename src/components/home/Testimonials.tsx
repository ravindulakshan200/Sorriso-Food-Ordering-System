"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Amaya P.",
    location: "Battaramulla",
    text: "The Crispy Chicken Fried Rice is absolutely unreal. Perfectly seasoned, generous portion — will definitely order again!",
    stars: 5,
  },
  {
    name: "Kasun R.",
    location: "Nugegoda",
    text: "Hot Butter Cuttle Fish is my go-to. Crispy, buttery, spicy — everything you want in a bite. Fast delivery too!",
    stars: 5,
  },
  {
    name: "Dilrukshi M.",
    location: "Colombo 5",
    text: "Tried the Mix Meat Sea Food Fried Rice — absolutely packed with flavour. The large portion is great value.",
    stars: 5,
  },
  {
    name: "Thilak N.",
    location: "Rajagiriya",
    text: "Ordered through PickMe and the food arrived hot. The Pork Deviled was spicy and tasty — perfect Sri Lankan flavour.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-secondary border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-accent text-accent tracking-[0.35em] text-xs uppercase mb-3 block">
            What Our Customers Say
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light">
            Loved by <span className="text-accent">Foodies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass border border-white/5 rounded-2xl p-6 flex flex-col hover:border-accent/20 transition-colors"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
              </div>
              <p className="font-body text-text-muted text-sm leading-relaxed flex-grow mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="font-accent text-xs tracking-widest text-white uppercase">{review.name}</p>
                <p className="font-body text-[11px] text-text-muted mt-0.5">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
