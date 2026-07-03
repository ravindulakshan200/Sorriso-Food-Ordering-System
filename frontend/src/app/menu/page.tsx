"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, UtensilsCrossed } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/contexts/ToastProvider";
import { MenuItem } from "@/types";
import MenuCard from "@/components/menu/MenuCard";
import { MENU_ITEMS, CATEGORIES } from "@/lib/seed-data";

const CATEGORY_COUNTS: Record<string, number> = {};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .eq("is_available", true)
          .order("category", { ascending: true });

        if (error || !data || data.length === 0) {
          setMenuItems(MENU_ITEMS as MenuItem[]);
        } else {
          // Only show the two real categories
          const filtered = data.filter((i: MenuItem) =>
            i.category === "Rice (Basmathi)" || i.category === "Bite"
          );
          setMenuItems(filtered.length > 0 ? (filtered as MenuItem[]) : (MENU_ITEMS as MenuItem[]));
        }
      } catch {
        toast("Network error — showing cached menu.", "error");
        setMenuItems(MENU_ITEMS as MenuItem[]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build category item counts
  menuItems.forEach((item) => {
    CATEGORY_COUNTS[item.category] = (CATEGORY_COUNTS[item.category] ?? 0) + 1;
  });

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, menuItems]);

  const groupedByCategory = useMemo(() => {
    if (activeCategory !== "All") {
      return { [activeCategory]: filteredItems };
    }
    return filteredItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredItems, activeCategory]);

  const categoryOrder = ["Rice (Basmathi)", "Bite"];
  const sortedCategories = Object.keys(groupedByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div className="min-h-screen bg-background relative z-10 pb-32">
      {/* Hero Banner */}
      <div className="relative h-[42vh] w-full flex items-center justify-center -mt-24 mb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        <div className="relative z-10 text-center mt-24 px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-accent text-accent tracking-[0.4em] text-xs uppercase mb-3 block"
          >
            Sorriso Food
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-light text-white tracking-wide"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 text-text-muted font-body text-sm max-w-md mx-auto"
          >
            {menuItems.length} dishes crafted for every craving
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        {/* Sticky Filter Bar */}
        <div className="sticky top-[72px] z-50 bg-background/95 backdrop-blur-xl border-b border-white/5 pb-4 mb-12 pt-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full pb-1 no-scrollbar snap-x">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.label === "All"
                    ? menuItems.length
                    : (CATEGORY_COUNTS[cat.label] ?? 0);
                return (
                  <button
                    key={cat.label}
                    id={`cat-${cat.label.replace(/[^a-z0-9]/gi, "-")}`}
                    onClick={() => setActiveCategory(cat.label)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full font-accent text-[10px] tracking-[0.1em] uppercase whitespace-nowrap snap-start transition-all duration-200 border ${
                      activeCategory === cat.label
                        ? "bg-accent text-background border-accent font-bold shadow-[0_0_12px_rgba(201,168,76,0.4)]"
                        : "text-text-muted border-white/15 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                    {count > 0 && (
                      <span
                        className={`text-[9px] rounded-full px-1.5 py-0.5 font-bold ${
                          activeCategory === cat.label
                            ? "bg-background/20 text-background"
                            : "bg-white/10 text-text-muted"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                  isSearchFocused ? "text-accent" : "text-text-muted"
                }`}
              />
              <input
                id="menu-search"
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-card border border-white/8 focus:border-accent/50 rounded-full pl-11 pr-4 py-2.5 text-white font-body text-sm focus:outline-none placeholder:text-text-muted/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 text-accent">
            <Loader2 className="w-12 h-12 mb-4 animate-spin opacity-80" />
            <p className="font-accent tracking-[0.2em] text-xs uppercase text-text-muted">
              Loading Menu...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-text-muted"
          >
            <UtensilsCrossed className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-body text-lg">No dishes found.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-4 text-accent hover:text-accent-hover font-accent text-xs tracking-widest uppercase underline underline-offset-4"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {sortedCategories.map((catLabel) => {
              const catItems = groupedByCategory[catLabel];
              const catMeta = CATEGORIES.find((c) => c.label === catLabel);
              return (
                <section key={catLabel} id={`section-${catLabel.replace(/[^a-z0-9]/gi, "-")}`}>
                  {/* Section header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{catMeta?.emoji ?? "🍴"}</span>
                      <h2 className="font-heading text-3xl md:text-4xl text-white font-light tracking-wide">
                        {catLabel}
                      </h2>
                    </div>
                    <div className="flex-grow h-px bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="font-accent text-[10px] text-text-muted tracking-widest uppercase shrink-0">
                      {catItems.length} {catItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {/* Grid */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {catItems.map((item, idx) => (
                        <MenuCard key={item.id} item={item} index={idx} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

