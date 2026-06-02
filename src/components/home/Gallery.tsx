"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop",
    label: "Fried Rice",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    label: "Chili Pork",
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    label: "Crispy Chicken Rice",
  },
  {
    src: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop",
    label: "Chilli Chicken",
  },
  {
    src: "https://images.unsplash.com/photo-1562802378-063ec186a863?q=80&w=800&auto=format&fit=crop",
    label: "Sea Food Rice",
  },
  {
    src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    label: "Mix Meat Rice",
  },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-accent text-accent tracking-[0.35em] text-xs uppercase mb-3 block">
              Food Gallery
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-light">
              Fresh From<br />
              <span className="text-accent">Our Kitchen</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 font-accent text-xs tracking-[0.2em] uppercase text-text-muted hover:text-accent transition-colors"
          >
            Order Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 || i === 5 ? "md:col-span-1 row-span-1" : ""
              }`}
              style={{ aspectRatio: i === 2 ? "16/9" : "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-accent text-[10px] tracking-widest uppercase text-white">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
