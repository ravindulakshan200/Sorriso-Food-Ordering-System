"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";
import Input from "@/components/common/Input";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const deliveryFee = orderType === "delivery" ? 250 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate PayHere integration
    // Normally you'd submit order to Supabase as 'pending', generate hash via API, and post form to PayHere.
    // Here we'll just clear cart and redirect to success.
    clearCart();
    
    // Pass mock order number via query string
    const orderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    router.push(`/checkout/success?order=${orderNum}`);
  };

  if (items.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center -mt-24 min-h-screen">
        <div className="text-center">
          <h2 className="font-heading text-4xl text-white mb-4">Your Cart is Empty</h2>
          <p className="text-text-muted mb-8">Add items to your taste before checking out.</p>
          <button 
            onClick={() => router.push("/menu")}
            className="bg-accent hover:bg-accent-hover text-background px-8 py-4 font-accent text-sm tracking-[0.2em] uppercase font-bold transition-all"
          >
            Explore Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-12 pb-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* Left: Order Summary */}
        <div className="w-full lg:w-5/12 order-2 lg:order-1">
          <div className="sticky top-32 glass border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="font-heading text-3xl text-white font-light tracking-wide border-b border-white/10 pb-6 mb-6">
              Order Summary
            </h3>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="font-heading text-lg text-white font-medium">{item.name}</h5>
                      <span className="font-body text-accent">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <span className="text-text-muted text-sm font-body">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex justify-between text-text-muted font-body">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(cartTotal)}</span>
              </div>
              <AnimatePresence>
                {orderType === "delivery" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-text-muted font-body"
                  >
                    <span>Delivery Fee</span>
                    <span className="text-white">{formatPrice(deliveryFee)}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-between items-center text-xl font-heading text-white font-medium pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-accent text-3xl">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Checkout Form */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2">
          <h2 className="font-heading text-5xl text-white font-light tracking-wide mb-10">Checkout</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Toggle */}
            <div className="relative flex w-full max-w-sm bg-card rounded-full p-1 mb-12 border border-white/5">
              <div 
                className={`flex-1 text-center py-3 font-accent text-sm tracking-[0.1em] uppercase z-10 cursor-pointer transition-colors ${
                  orderType === "delivery" ? "text-background font-bold" : "text-text-muted hover:text-white"
                }`}
                onClick={() => setOrderType("delivery")}
              >
                Delivery
              </div>
              <div 
                className={`flex-1 text-center py-3 font-accent text-sm tracking-[0.1em] uppercase z-10 cursor-pointer transition-colors ${
                  orderType === "pickup" ? "text-background font-bold" : "text-text-muted hover:text-white"
                }`}
                onClick={() => setOrderType("pickup")}
              >
                Pickup
              </div>
              <motion.div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-full z-0 pointer-events-none"
                animate={{
                  left: orderType === "delivery" ? "4px" : "calc(50%)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>

            {/* Inputs */}
            <div className="space-y-2">
              <h4 className="font-accent text-accent text-xs tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-2">Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Input 
                  label="First Name" 
                  value={formData.firstName} 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                  required 
                />
                <Input 
                  label="Last Name" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Input 
                  label="Phone Number" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  required 
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>

              <AnimatePresence>
                {orderType === "delivery" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <h4 className="font-accent text-accent text-xs tracking-[0.2em] uppercase mt-8 mb-6 border-b border-white/10 pb-2">Delivery Address</h4>
                    <Input 
                      label="Street Address" 
                      value={formData.address} 
                      onChange={(e) => setFormData({...formData, address: e.target.value})} 
                      required={orderType === "delivery"} 
                    />
                    <Input 
                      label="City / Suburb" 
                      value={formData.city} 
                      onChange={(e) => setFormData({...formData, city: e.target.value})} 
                      required={orderType === "delivery"} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit"
              className="mt-12 w-full bg-accent hover:bg-accent-hover text-background py-5 font-accent text-sm tracking-[0.2em] uppercase font-bold border-none transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] flex justify-center items-center gap-2"
            >
              Pay via PayHere
            </button>
            <p className="text-center font-body text-xs text-text-muted mt-4">
              Secure payments powered by PayHere Sri Lanka.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
