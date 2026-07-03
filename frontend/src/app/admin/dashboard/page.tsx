"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  CalendarDays,
  TrendingUp,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  todayBookings: number;
  totalRevenue: number;
}

const STAT_CARDS = (stats: Stats) => [
  {
    id: "total-orders",
    label: "Total Orders",
    value: stats.totalOrders.toString(),
    icon: ShoppingBag,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "pending-orders",
    label: "Pending Orders",
    value: stats.pendingOrders.toString(),
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "todays-bookings",
    label: "Today's Bookings",
    value: stats.todayBookings.toString(),
    icon: CalendarDays,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "total-revenue",
    label: "Total Revenue",
    value: `LKR ${stats.totalRevenue.toLocaleString()}`,
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];

    try {
      const [ordersRes, pendingRes, bookingsRes, revenueRes] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("payment_status", "pending"),
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("date", today),
        supabase.from("orders").select("total"),
      ]);

      const revenue = (revenueRes.data ?? []).reduce(
        (sum: number, o: { total: number }) => sum + (o.total ?? 0),
        0
      );

      setStats({
        totalOrders: ordersRes.count ?? 0,
        pendingOrders: pendingRes.count ?? 0,
        todayBookings: bookingsRes.count ?? 0,
        totalRevenue: revenue,
      });
    } catch {
      setError("Failed to load dashboard stats. Check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
          aria-label="Refresh stats"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-zinc-800/60 border border-zinc-800 animate-pulse"
            />
          ))}
        </div>
      ) : stats ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {STAT_CARDS(stats).map(({ id, label, value, icon: Icon, color, bg }) => (
            <motion.div
              key={id}
              id={id}
              variants={card}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-medium tracking-wide uppercase">
                  {label}
                </p>
                <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : null}

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/admin/orders",   label: "View all orders",   desc: "Manage & filter order records" },
            { href: "/admin/bookings", label: "Manage bookings",   desc: "Confirm or cancel reservations" },
            { href: "/admin/menu",     label: "Update menu",       desc: "Add, edit or toggle dishes" },
          ].map(({ href, label, desc }) => (
            <a
              key={href}
              href={href}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 group transition-all"
            >
              <p className="text-white font-medium text-sm group-hover:text-amber-400 transition-colors">
                {label}
              </p>
              <p className="text-zinc-500 text-xs mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
