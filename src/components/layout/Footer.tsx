"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, Clock } from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 2.8 12 3 12c.5.5 1.5.5 2 .5-1.5-1-2.5-3-2.5-5 1.5 2.5 5 4 9 4-1-6 8-8 8-2 0 0 1.5-1 2-1-.5 2-2 3-2 3s1.5-1 2-1z"/></svg>
);
import { useToast } from "../providers/ToastProvider";
import { useState } from "react";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast("Subscribed to the newsletter successfully!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-secondary border-t border-white/5 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <h1 className="font-heading text-4xl font-light tracking-widest text-white uppercase">
                SORRISO<span className="text-accent">.</span>
              </h1>
            </Link>
            <p className="text-text-muted font-body mb-8 leading-relaxed">
              Your Belly Knows Best
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all hover:bg-white/5">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/SorrisoFood" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all hover:bg-white/5">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all hover:bg-white/5">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-accent text-xs tracking-[0.2em] font-medium text-white uppercase mb-8">Quick Links</h4>
            <ul className="flex flex-col gap-4 font-body text-text-muted">
              <li><Link href="/menu" className="hover:text-accent transition-colors">Our Menu</Link></li>
              <li><Link href="/reservations" className="hover:text-accent transition-colors">Reservations</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-accent text-xs tracking-[0.2em] font-medium text-white uppercase mb-8">Visit Us</h4>
            <ul className="flex flex-col gap-5 font-body text-text-muted">
              <li className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>7th Lane, Wickramasinghepura Rd, Battaramulla</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>0777 222 069 / 0767 074 385</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>anushadilruksh88@gmail.com</span>
              </li>
              <li className="flex gap-4 items-center">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <span>Mon – Sat: 10:00 AM – 10:00 PM<br/>Sun: 11:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-accent text-xs tracking-[0.2em] font-medium text-white uppercase mb-8">Newsletter</h4>
            <p className="text-text-muted font-body mb-6 leading-relaxed">
              Subscribe to receive updates on seasonal menus and special events.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="w-full bg-background border border-white/10 rounded-none px-4 py-4 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/50"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-6 bg-accent hover:bg-accent-hover text-background transition-colors flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(201,168,76,0.3)]"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Sorriso Food. All rights reserved.
          </p>
          <div className="flex gap-6 font-body text-text-muted text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
