"use client";

import { motion } from "framer-motion";
import Image from "next/image";
const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function Gallery() {
  const photos = [
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop", // Steak
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", // Wine toast
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop", // Restaurant interior dark
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop", // Chef plating
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop", // Pasta dish
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop", // Fusion platter
  ];

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, 
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6 }
    })
  };

  return (
    <section className="py-24 bg-background border-t border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12 mb-12 flex flex-col items-center">
        <span className="font-accent text-accent tracking-[0.3em] text-xs uppercase mb-4 block">Follow Our Journey</span>
        <h2 className="font-heading text-4xl md:text-5xl text-white font-light tracking-wide flex items-center gap-4">
          <Instagram className="w-8 h-8 text-white/50" />
          @SorrisoFood
        </h2>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-[400px] lg:h-[350px]">
          {photos.map((url, i) => (
            <motion.div
              key={i}
              className="relative w-full h-full overflow-hidden group border border-white/5"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
            >
              <Image 
                src={url} 
                alt={`Instagram gallery photo ${i+1}`}
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
