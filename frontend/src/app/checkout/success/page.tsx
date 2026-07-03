"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, PartyPopper } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get("order") || "ORD-UNAVAILABLE";

  useEffect(() => {
    // Trigger confetti burst on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#C9A84C", "#E2C06B", "#ffffff"]
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#C9A84C", "#E2C06B", "#ffffff"]
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-grow bg-background flex items-center justify-center -mt-24 min-h-screen relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="glass border border-accent/20 rounded-3xl p-12 max-w-xl w-full mx-6 text-center space-y-6 shadow-[0_0_50px_rgba(201,168,76,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-hover" />
        
        <div className="w-24 h-24 bg-accent/10 border border-accent rounded-full flex items-center justify-center mx-auto text-accent mb-8 shadow-inner">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <h1 className="font-heading text-4xl text-white tracking-wide">
          Payment Successful!
        </h1>
        
        <p className="font-body text-text-muted text-lg font-light leading-relaxed">
          Your order has been confirmed and is being prepared with utmost care. A receipt has been sent to your email.
        </p>
        
        <div className="bg-secondary p-6 rounded-xl border border-white/5 inline-block mx-auto mb-4">
          <span className="font-accent text-xs tracking-widest text-text-muted uppercase block mb-1">Order Number</span>
          <span className="font-heading text-2xl text-accent tracking-widest">{orderNum}</span>
        </div>

        <div className="pt-8">
          <Link 
            href="/menu"
            className="group inline-flex items-center gap-4 bg-accent hover:bg-accent-hover text-background px-8 py-4 font-accent text-xs tracking-[0.2em] uppercase font-bold transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            <PartyPopper className="w-4 h-4" />
            Order More Delights
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
