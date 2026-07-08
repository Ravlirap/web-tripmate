import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  ListChecks,
  BookOpen,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  TrendingUp,
  Eye,
  LayoutDashboard,
  Compass,
  Settings,
  Shield
} from "lucide-react";

const organizerTrips = [
  {
    id: 1,
    title: "Bali Adventure - 4D3N",
    destination: "Bali",
    price: 2500000,
    date: "15-18 Agustus 2026",
    status: "active" as const,
    image: "/trip-bali.png",
    bookings: [
      { id: "bk101", travelerName: "Budi Santoso", status: "confirmed" as const, price: 2500000, participants: 2 },
      { id: "bk105", travelerName: "Citra Lestari", status: "pending" as const, price: 2500000, participants: 1 },
      { id: "bk109", travelerName: "Andi Prasetya", status: "confirmed" as const, price: 2500000, participants: 1 },
    ],
  },
  {
    id: 3,
    title: "Bromo Sunrise Tour - 3D2N",
    destination: "Jawa Timur",
    price: 1500000,
    date: "20-22 Agustus 2026",
    status: "active" as const,
    image: "/trip-bromo.png",
    bookings: [
      { id: "bk102", travelerName: "Dewi Anggraini", status: "pending" as const, price: 1500000, participants: 1 },
      { id: "bk106", travelerName: "Eko Prasetyo", status: "confirmed" as const, price: 1500000, participants: 3 },
    ],
  },
  {
    id: 5,
    title: "Yogyakarta Cultural Tour - 3D2N",
    destination: "Yogyakarta",
    price: 1200000,
    date: "25-27 Agustus 2026",
    status: "active" as const,
    image: "/trip-yogyakarta.png",
    bookings: [
      { id: "bk104", travelerName: "Gita Permata", status: "confirmed" as const, price: 1200000, participants: 2 },
      { id: "bk108", travelerName: "Hadi Wijaya", status: "cancelled" as const, price: 1200000, participants: 1 },
    ],
  },
];

const BOOKING_STATUS = {
  confirmed: {
    label: "Dikonfirmasi",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: CheckCircle2,
  },
  pending: {
    label: "Menunggu",
    bg: "bg-amber-50 text-amber-700 border-amber-100",
    icon: Clock,
  },
  cancelled: {
    label: "Dibatalkan",
    bg: "bg-red-50 text-red-600 border-red-100",
    icon: XCircle,
  },
};

export default function OrganizerDashboardPage() {
  const totalTrips = organizerTrips.length;
  const allBookings = organizerTrips.flatMap((t) =>
    t.bookings.map((b) => ({ ...b, tripTitle: t.title, tripId: t.id, tripImage: t.image, tripDest: t.destination }))
  );
  const totalBookings = allBookings.length;
  const pendingBookings = allBookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = allBookings.filter((b) => b.status === "confirmed").length;
  const totalRevenue = allBookings
    .filter((b) => b.status === "confirmed")
    .reduce((s, b) => s + b.price * b.participants, 0);

  const recentBookings = allBookings.slice(0, 5);

  const stats = [
    {
      label: "Trip Aktif",
      value: totalTrips,
      icon: ListChecks,
      color: "text-primary",
      bg: "bg-primary/5",
      border: "border-primary/10",
    },
    {
      label: "Total Booking",
      value: totalBookings,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Menunggu Konfirmasi",
      value: pendingBookings,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      label: "Estimasi Pendapatan",
      value: `Rp ${(totalRevenue / 1000000).toFixed(1)}jt`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex">
      {/* ─── SIDEBAR (Fixed 260px) ─── */}
      <aside className="w-[260px] bg-admin-sidebar text-zinc-400 flex flex-col flex-shrink-0 sticky top-0 h-screen z-20 border-r border-zinc-800/30">
        {/* Brand */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-zinc-850">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container shadow-md shadow-primary/30">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">TripMate</span>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link href="/organizer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-primary/10 text-white transition-all">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            Dashboard
          </Link>
          <Link href="/organizer/trips" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800/40 hover:text-white transition-all">
            <ListChecks className="h-4 w-4" />
            Kelola Trip
          </Link>
          <Link href="/organizer/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800/40 hover:text-white transition-all">
            <BookOpen className="h-4 w-4" />
            Daftar Booking
          </Link>
          <Link href="/trips" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800/40 hover:text-white transition-all">
            <Compass className="h-4 w-4" />
            Explore Trip Page
          </Link>
        </nav>
        
        {/* Sidebar user area */}
        <div className="p-4 border-t border-zinc-850">
          <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-zinc-800/45">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white text-sm font-bold">
              O
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white leading-none truncate">Organizer Mode</p>
              <span className="text-[10px] text-zinc-500 font-medium">Trip Manager</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-zinc-200/60 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-[#0b1c30]">Dashboard Organizer</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Kelola trip, ketersediaan slot, dan booking masuk</p>
          </div>
          <Button
            className="bg-secondary-container hover:bg-secondary text-white rounded-full px-5 text-sm shadow-md shadow-secondary-container/20 transition-all"
            asChild
          >
            <Link href="/organizer/trips/new">
              <Plus className="mr-1.5 h-4 w-4" />
              Buat Trip Baru
            </Link>
          </Button>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left: My Trips List (Takes 2 Cols on large screens) */}
            <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#0b1c30]">Trip Saya</h2>
                <Button variant="outline" size="sm" className="rounded-full text-primary border-primary hover:bg-primary/5" asChild>
                  <Link href="/organizer/trips">
                    Kelola Semua
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {organizerTrips.map((trip) => {
                  const tripPending = trip.bookings.filter((b) => b.status === "pending").length;
                  return (
                    <div
                      key={trip.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-primary/20 hover:bg-primary/2 transition-all group"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-full sm:w-28 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={trip.image}
                          alt={trip.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#0b1c30] group-hover:text-primary transition-colors line-clamp-1">
                          {trip.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-xs text-zinc-500">
                            <MapPin className="h-3 w-3 text-primary" />
                            {trip.destination}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-zinc-500">
                            <Calendar className="h-3 w-3 text-primary" />
                            {trip.date}
                          </span>
                        </div>
                        {tripPending > 0 && (
                          <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full mt-2">
                            <Clock className="h-3 w-3" />
                            {tripPending} booking perlu konfirmasi
                          </div>
                        )}
                      </div>

                      {/* Price & Actions */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-between flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-150">
                        <p className="text-lg font-bold text-primary">
                          Rp {trip.price.toLocaleString("id-ID")}
                        </p>
                        <div className="flex gap-1.5 mt-2">
                          <button className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-primary transition-colors" title="Lihat">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-blue-50 text-zinc-400 hover:text-blue-600 transition-colors" title="Ubah">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors" title="Hapus">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Recent Bookings List */}
            <div className="xl:col-span-1 bg-white rounded-3xl shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-[#0b1c30]">Booking Terbaru</h2>
                  <Button variant="outline" size="sm" className="rounded-full text-primary border-primary hover:bg-primary/5" asChild>
                    <Link href="/organizer/bookings">
                      Lihat Semua
                    </Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {recentBookings.map((booking) => {
                    const cfg = BOOKING_STATUS[booking.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <div
                        key={booking.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-colors"
                      >
                        {/* Initials Avatar */}
                        <div
                          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: `hsl(${booking.id.charCodeAt(2) * 20}, 60%, 50%)` }}
                        >
                          {booking.travelerName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs text-[#0b1c30] truncate">{booking.travelerName}</p>
                          <p className="text-[10px] text-zinc-400 truncate">{booking.tripTitle}</p>
                        </div>

                        {/* Status & Price */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-xs text-primary">
                            Rp {(booking.price * booking.participants).toLocaleString("id-ID")}
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border mt-1 text-[9px] font-semibold ${cfg.bg}`}>
                            <StatusIcon className="h-2.5 w-2.5" />
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}