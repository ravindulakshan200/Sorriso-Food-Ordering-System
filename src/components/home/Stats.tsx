"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing out quint
        const easeProgress = 1 - Math.pow(1 - progress, 5);
        setCount(Math.floor(easeProgress * to));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const stats = [
    { value: 12, label: "Years Experience", suffix: "+" },
    { value: 200, label: "Signature Dishes", suffix: "+" },
    { value: 50, label: "Happy Guests", suffix: "k+" }
  ];

  return (
    <section className="py-24 bg-background border-b border-white/5 relative z-10 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 lg:px-12 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center pt-12 md:pt-0 text-center"
            >
              <div className="font-heading text-6xl lg:text-8xl text-accent mb-4 leading-none tracking-tighter">
                <Counter to={stat.value} />
                <span className="text-4xl lg:text-6xl text-accent align-top ml-1">{stat.suffix}</span>
              </div>
              <span className="font-accent tracking-[0.3em] text-xs uppercase text-text-muted font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
