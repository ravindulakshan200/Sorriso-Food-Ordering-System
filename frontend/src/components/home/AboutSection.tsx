"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

const INFO = [
  { icon: MapPin, text: "7th Lane, Wickramasinghepura Rd, Battaramulla" },
  { icon: Phone, text: "0777 222 069 / 0767 074 385" },
  { icon: Clock, text: "Mon–Sat: 10 AM – 10 PM · Sun: 11 AM – 9 PM" },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-secondary border-y border-white/5 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full lg:w-5/12 relative"
        >
          <div className="absolute inset-0 translate-x-4 translate-y-4 border border-accent/30 rounded-2xl pointer-events-none z-0" />
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
              alt="Sorriso Kitchen"
              fill
              className="object-cover"
            />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 shadow-xl">
              <p className="font-heading text-2xl text-accent font-light">2024</p>
              <p className="font-accent text-[10px] tracking-widest uppercase text-text-muted mt-0.5">Est. Battaramulla</p>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full lg:w-7/12"
        >
          <span className="font-accent text-accent tracking-[0.35em] text-xs uppercase mb-4 block">
            Our Story
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light leading-tight mb-8">
            Born from Passion,<br />
            <span className="text-accent">Served with Love</span>
          </h2>

          <div className="space-y-5 font-body text-text-muted leading-relaxed mb-10">
            <p>
              Sorriso started with a simple idea — that incredible food doesn&apos;t need to be complicated. Founded in Battaramulla in 2024, we set out to bring Sri Lankan and international fusion flavours together under one roof.
            </p>
            <p>
              Every grain of rice is wok-tossed to order. Every bite is seasoned with the love of our kitchen team. Whether you&apos;re here for our famous Crispy Chicken Fried Rice or the fiery Hot Butter Cuttle Fish — your belly will know it made the right choice.
            </p>
          </div>

          {/* Contact info */}
          <div className="space-y-3 mb-10">
            {INFO.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 text-text-muted font-body text-sm">
                <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-background px-7 py-3.5 font-accent text-xs tracking-[0.2em] uppercase font-bold transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
          >
            Browse Our Menu
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
