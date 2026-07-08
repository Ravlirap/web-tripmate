import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  BookOpen,
  ArrowRight,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Plus,
  Star,
} from "lucide-react";

const travelerBookings = [
  {
    id: "bk101",
    tripId: 1,
    tripTitle: "Bali Adventure - 4D3N",
    destination: "Bali",
    price: 2500000,
    date: "15-18 Agustus 2026",
    status: "confirmed" as const,
    organizer: "Bali Explorer",
    image: "/trip-bali.png",
    participants: 2,
  },
  {
    id: "bk102",
    tripId: 3,
    tripTitle: "Bromo Sunrise Tour - 3D2N",
    destination: "Jawa Timur",
    price: 1500000,
    date: "20-22 Agustus 2026",
    status: "pending" as const,
    organizer: "Mountain Climbers",
    image: "/trip-bromo.png",
    participants: 1,
  },
  {
    id: "bk103",
    tripId: 4,
    tripTitle: "Komodo Island Expedition - 4D3N",
    destination: "Nusa Tenggara Timur",
    price: 4500000,
    date: "10-13 September 2026",
    status: "cancelled" as const,
    organizer: "Island Hoppers",
    image: "/trip-komodo.png",
    participants: 3,
  },
  {
    id: "bk104",
    tripId: 5,
    tripTitle: "Yogyakarta Cultural Tour - 3D2N",
    destination: "Yogyakarta",
    price: 1200000,
    date: "25-27 Agustus 2026",
    status: "confirmed" as const,
    organizer: "Java Heritage",
    image: "/trip-yogyakarta.png",
    participants: 2,
  },
];

const STATUS_CONFIG = {
  confirmed: {
    label: "Dikonfirmasi",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  pending: {
    label: "Menunggu",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
    icon: Clock,
  },
  cancelled: {
    label: "Dibatalkan",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

export default function TravelerDashboardPage() {
  const confirmed = travelerBookings.filter((b) => b.status === "confirmed");
  const pending = travelerBookings.filter((b) => b.status === "pending");
  const cancelled = travelerBookings.filter((b) => b.status === "cancelled");
  const totalSpent = confirmed.reduce((s, b) => s + b.price * b.participants, 0);

  const stats = [
    {
      label: "Trip Dikonfirmasi",
      value: confirmed.length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      label: "Menunggu Konfirmasi",
      value: pending.length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      label: "Trip Dibatalkan",
      value: cancelled.length,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      label: "Total Pengeluaran",
      value: `Rp ${(totalSpent / 1000000).toFixed(1)}jt`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/5",
      border: "border-primary/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* ─── HEADER ─── */}
      <div className="bg-gradient-to-r from-primary to-primary-container text-white px-4 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Selamat datang kembali 👋</p>
              <h1 className="text-3xl font-bold">Dashboard Saya</h1>
            </div>
            <Button
              className="bg-secondary-container hover:bg-secondary text-white rounded-full px-6 shadow-lg shadow-secondary-container/20 transition-all"
              asChild
            >
              <Link href="/trips">
                <Plus className="mr-2 h-4 w-4" />
                Booking Baru
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ─── STATS ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border ${s.border}`}>
                <div className={`inline-flex p-2.5 rounded-xl ${s.bg} mb-3`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs text-zinc-500">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* ─── BOOKINGS ─── */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0b1c30]">Semua Booking</h2>
            <div className="flex gap-2 text-xs">
              <span className="bg-zinc-100 text-zinc-600 px-3 py-1.5 rounded-full font-medium">
                {travelerBookings.length} total
              </span>
            </div>
          </div>

          {travelerBookings.length > 0 ? (
            <div className="space-y-4">
              {travelerBookings.map((booking) => {
                const cfg = STATUS_CONFIG[booking.status];
                const StatusIcon = cfg.icon;
                return (
                  <div
                    key={booking.id}
                    className="flex gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-primary/20 hover:bg-primary/2 transition-all group"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.image}
                        alt={booking.tripTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/trips/${booking.tripId}`}
                        className="font-semibold text-[#0b1c30] hover:text-primary transition-colors line-clamp-1"
                      >
                        {booking.tripTitle}
                      </Link>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <MapPin className="h-3 w-3 text-primary" />
                          {booking.destination}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Calendar className="h-3 w-3 text-primary" />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Users className="h-3 w-3 text-primary" />
                          {booking.participants} peserta
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">by {booking.organizer}</p>
                    </div>

                    {/* Right: price + status */}
                    <div className="flex flex-col items-end justify-between flex-shrink-0">
                      <p className="text-lg font-bold text-primary">
                        Rp {(booking.price * booking.participants).toLocaleString("id-ID")}
                      </p>
                      <div
                        className={`flex items-center gap-1.5 ${cfg.bg} ${cfg.text} ${cfg.border} border rounded-full px-3 py-1`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold">{cfg.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex p-6 bg-zinc-100 rounded-full mb-4">
                <BookOpen className="h-10 w-10 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-700 mb-2">Belum Ada Booking</h3>
              <p className="text-zinc-500 mb-6 text-sm">Ayo mulai petualangan pertamamu!</p>
              <Button asChild>
                <Link href="/trips">
                  Explore Trip Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* ─── QUICK EXPLORE ─── */}
        <div className="mt-6 bg-gradient-to-r from-primary to-primary-container rounded-3xl p-7 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Mau Trip Berikutnya?</h3>
            <p className="text-white/70 text-sm">
              Temukan ratusan trip seru yang menanti petualanganmu
            </p>
          </div>
          <Button
            className="bg-secondary-container hover:bg-secondary text-white rounded-full px-8 py-3 font-semibold shrink-0"
            asChild
          >
            <Link href="/trips">
              Jelajahi Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}