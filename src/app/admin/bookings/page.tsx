"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Users, Clock, Mail, Phone, CheckCircle, Clock3, XCircle } from "lucide-react";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};

// Mock data acting as Supabase fallback
const MOCK_BOOKINGS: Booking[] = [
  { id: "1", name: "Elena Gilbert", phone: "+94 77 123 4567", email: "elena.g@example.com", date: "2024-06-15", time: "19:00", guests: 2, special_requests: "Window seat preferred", status: "confirmed", created_at: new Date().toISOString() },
  { id: "2", name: "Damon Salvatore", phone: "+94 71 987 6543", email: "damon.s@example.com", date: "2024-06-16", time: "20:30", guests: 4, special_requests: "", status: "pending", created_at: new Date().toISOString() },
  { id: "3", name: "Stefan Salvatore", phone: "+94 75 111 2222", email: "stefan.s@example.com", date: "2024-06-18", time: "18:00", guests: 6, special_requests: "Vegan options needed", status: "cancelled", created_at: new Date().toISOString() },
];

export default function AdminBookings() {
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const StatusIcon = ({ status }: { status: Booking['status'] }) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <Clock3 className="w-4 h-4 text-accent" />;
      case "cancelled": return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background border-t border-white/5 relative z-10 py-16">
      <div className="container mx-auto px-6 lg:px-12 mt-10">
        <h1 className="font-heading text-4xl text-white mb-2">Bookings Matrix</h1>
        <p className="font-body text-text-muted mb-12">Administrative overview of upcoming reservations.</p>

        <div className="bg-card glass border border-white/5 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-text-muted font-accent text-[10px] tracking-widest uppercase">
                <th className="p-6 font-medium">Guest</th>
                <th className="p-6 font-medium">Contact</th>
                <th className="p-6 font-medium">Schedule</th>
                <th className="p-6 font-medium">Details</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm text-white divide-y divide-white/5">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6">
                    <p className="font-medium text-base mb-1">{booking.name}</p>
                    <p className="text-xs text-text-muted flex items-center gap-1">
                      ID: {booking.id}
                    </p>
                  </td>
                  <td className="p-6 space-y-1">
                    <p className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"><Mail className="w-3 h-3" /> {booking.email}</p>
                    <p className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"><Phone className="w-3 h-3" /> {booking.phone}</p>
                  </td>
                  <td className="p-6 space-y-1">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {format(new Date(booking.date), "MMM d, yyyy")}</p>
                    <p className="flex items-center gap-2 text-text-muted"><Clock className="w-4 h-4" /> {booking.time}</p>
                  </td>
                  <td className="p-6">
                    <p className="flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-white/50" /> {booking.guests} Guests</p>
                    {booking.special_requests && (
                      <p className="text-xs text-text-muted bg-white/5 p-2 rounded truncate max-w-[150px]" title={booking.special_requests}>
                        {booking.special_requests}
                      </p>
                    )}
                  </td>
                  <td className="p-6 flex items-center gap-2 mt-4">
                    <StatusIcon status={booking.status} />
                    <span className="capitalize text-xs">{booking.status}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                       <button className="bg-white/5 hover:bg-green-500/20 text-white hover:text-green-500 border border-white/10 p-2 rounded transition-colors" title="Confirm">
                         <CheckCircle className="w-4 h-4" />
                       </button>
                       <button className="bg-white/5 hover:bg-red-500/20 text-white hover:text-red-500 border border-white/10 p-2 rounded transition-colors" title="Cancel">
                         <XCircle className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
