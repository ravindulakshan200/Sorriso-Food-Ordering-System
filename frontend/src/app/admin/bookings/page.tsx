"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  CalendarDays,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock3,
  Mail,
  Phone,
  Users,
  CalendarCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type BookingStatus = "pending" | "confirmed" | "cancelled";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string;
  status: BookingStatus;
  created_at: string;
}

const STATUS_STYLES: Record<BookingStatus, { badge: string; icon: React.ElementType }> = {
  confirmed: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", icon: CheckCircle },
  pending:   { badge: "bg-amber-500/15 text-amber-400 border-amber-500/25",        icon: Clock3 },
  cancelled: { badge: "bg-red-500/15 text-red-400 border-red-500/25",              icon: XCircle },
};

function StatusBadge({ status }: { status: BookingStatus }) {
  const { badge, icon: Icon } = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${badge}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    if (err) setError(err.message);
    else setBookings(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    setUpdating(id);
    const supabase = createClient();
    const { error: err } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (err) {
      setError(err.message);
    } else {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
    setUpdating(null);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-400" />
            Bookings
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {loading ? "Loading…" : `${bookings.length} reservation${bookings.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={fetchBookings}
          disabled={loading}
          className="self-start flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-800/50">
                {["Guest", "Contact", "Date & Time", "Party", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-widest px-5 py-3.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <CalendarCheck className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                    <p className="text-zinc-500 text-sm">No bookings found</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking, idx) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    className="hover:bg-zinc-800/40 transition-colors"
                  >
                    {/* Guest */}
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{booking.name}</p>
                      <p className="text-zinc-600 font-mono text-[10px] mt-0.5">#{booking.id.slice(0, 8)}</p>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4 space-y-1">
                      <p className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <Mail className="w-3 h-3 text-zinc-600" />
                        {booking.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <Phone className="w-3 h-3 text-zinc-600" />
                        {booking.phone}
                      </p>
                    </td>

                    {/* Date & Time */}
                    <td className="px-5 py-4">
                      <p className="text-white text-sm">
                        {format(new Date(booking.date), "MMM d, yyyy")}
                      </p>
                      <p className="text-zinc-500 text-xs mt-0.5">{booking.time}</p>
                    </td>

                    {/* Party size */}
                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 text-zinc-300 text-sm">
                        <Users className="w-3.5 h-3.5 text-zinc-600" />
                        {booking.guests}
                      </p>
                      {booking.special_requests && (
                        <p
                          className="text-[10px] text-zinc-600 mt-1 truncate max-w-[120px]"
                          title={booking.special_requests}
                        >
                          {booking.special_requests}
                        </p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={booking.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          id={`confirm-booking-${booking.id}`}
                          onClick={() => updateStatus(booking.id, "confirmed")}
                          disabled={booking.status === "confirmed" || updating === booking.id}
                          title="Confirm booking"
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Confirm
                        </button>
                        <button
                          id={`cancel-booking-${booking.id}`}
                          onClick={() => updateStatus(booking.id, "cancelled")}
                          disabled={booking.status === "cancelled" || updating === booking.id}
                          title="Cancel booking"
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
