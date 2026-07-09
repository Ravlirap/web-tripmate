import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Search,
  ShieldCheck,
  Sailboat,
  Mountain,
  Waves,
  Landmark,
  Compass,
  Star,
  ArrowRight,
  Heart,
  Wallet,
  Headphones,
  ClipboardCheck,
  PlaneTakeoff,
  Quote,
  Users,
  BadgeCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const quickCategories = [
  { label: "Pantai", icon: Waves },
  { label: "Gunung", icon: Mountain },
  { label: "Budaya", icon: Landmark },
  { label: "Bahari", icon: Sailboat },
];

const platformStats = [
  { value: "500+", label: "Open Trip Aktif" },
  { value: "10rb+", label: "Traveler Terdaftar" },
  { value: "150+", label: "Organizer Terverifikasi" },
];

const howItWorks = [
  {
    step: "01",
    icon: Compass,
    title: "Jelajah & Pilih Trip",
    description:
      "Telusuri ratusan open trip berdasarkan destinasi, tanggal, atau budget yang kamu mau.",
  },
  {
    step: "02",
    icon: ClipboardCheck,
    title: "Booking & Konfirmasi",
    description:
      "Isi jumlah peserta, kirim booking, dan tunggu konfirmasi langsung dari organizer.",
  },
  {
    step: "03",
    icon: PlaneTakeoff,
    title: "Berangkat & Bertualang",
    description:
      "Datang di meeting point, temu traveler lain, dan mulai petualanganmu.",
  },
];

const featuredTrips = [
  {
    id: 1,
    title: "Ubud Retreat & Yoga",
    destination: "Bali, Indonesia",
    priceLabel: "Rp 3.5jt",
    duration: "4H 3M",
    image: "/trip-bali.png",
    rating: 4.9,
    reviews: 128,
    tag: "Open Trip",
    tagColor: "bg-primary/90",
    size: "large" as const,
  },
  {
    id: 2,
    title: "Phinisi Adventure",
    destination: "Labuan Bajo",
    priceLabel: "Rp 5.2jt",
    duration: "3H 2M",
    image: "/trip-komodo.png",
    rating: 5.0,
    reviews: 89,
    tag: "Sailing",
    tagColor: "bg-secondary/90",
    size: "small" as const,
  },
  {
    id: 3,
    title: "Deep Blue Dive",
    destination: "Raja Ampat",
    priceLabel: "Rp 12.5jt",
    duration: "7H 6M",
    image: "/trip-raja-ampat.png",
    rating: 4.8,
    reviews: 64,
    tag: "Premium",
    tagColor: "bg-primary/90",
    size: "small" as const,
  },
  {
    id: 4,
    title: "Rinjani Summit",
    destination: "Lombok, NTB",
    priceLabel: "Rp 2.8jt",
    duration: "3H 2M",
    image: "/trip-bromo.png",
    rating: 4.7,
    reviews: 203,
    tag: "Adventure",
    tagColor: "bg-tertiary/90",
    size: "small" as const,
  },
];

const popularDestinations = [
  { name: "Bali", trips: 84, image: "/trip-bali.png" },
  { name: "Raja Ampat", trips: 22, image: "/trip-raja-ampat.png" },
  { name: "Bromo, Jawa Timur", trips: 41, image: "/trip-bromo.png" },
  { name: "Labuan Bajo", trips: 35, image: "/trip-komodo.png" },
  { name: "Yogyakarta", trips: 58, image: "/trip-yogyakarta.png" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Organizer Terverifikasi",
    description:
      "Setiap organizer melewati verifikasi identitas & legalitas berlapis, jadi kamu booking dengan tenang.",
    accent: "primary",
  },
  {
    icon: Wallet,
    title: "Booking Transparan",
    description:
      "Status booking kamu — pending, dikonfirmasi, atau dibatalkan — selalu bisa dipantau real-time.",
    accent: "secondary",
  },
  {
    icon: Headphones,
    title: "Dukungan Siaga",
    description:
      "Tim bantuan kami siap membantu kendala teknis maupun operasional selama trip berlangsung.",
    accent: "tertiary",
  },
];

const testimonials = [
  {
    name: "Rangga Aditya",
    role: "Traveler · 6x Open Trip",
    quote:
      "Dari cari trip sampai konfirmasi booking semuanya di satu tempat. Nggak perlu lagi chat sana-sini nunggu organizer bales DM.",
    hue: 205,
  },
  {
    name: "Wulan Sari",
    role: "Organizer · Bali Explorer",
    quote:
      "Dashboard organizer-nya bikin kelola booking jauh lebih cepat. Konfirmasi peserta yang dulu manual sekarang tinggal sekali klik.",
    hue: 25,
  },
  {
    name: "Farhan Maulana",
    role: "Traveler · Solo Traveler",
    quote:
      "Suka fitur statusnya jelas — pending, dikonfirmasi, dibatalkan. Jadi nggak was-was nunggu kepastian trip.",
    hue: 145,
  },
];

const accentMap = {
  primary: { bg: "bg-primary/10", hover: "group-hover:bg-primary", text: "text-primary" },
  secondary: { bg: "bg-secondary/10", hover: "group-hover:bg-secondary", text: "text-secondary" },
  tertiary: { bg: "bg-tertiary/10", hover: "group-hover:bg-tertiary", text: "text-tertiary" },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/trip-komodo.png" alt="TripMate" fill priority className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,28,48,0.85) 0%, rgba(11,28,48,0.35) 55%, rgba(11,28,48,0.78) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-gutter text-center text-white space-y-7 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mx-auto">
            <Compass className="h-[16px] w-[16px] text-primary-fixed" />
            <span className="uppercase tracking-widest text-[11px] font-semibold">
              Platform Open Trip Terpercaya
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] max-w-4xl mx-auto"
            style={{ letterSpacing: "-0.02em" }}
          >
            Temukan Open Trip, Kenali <span className="text-primary-fixed">Teman Baru</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Jelajahi ratusan open trip terkurasi dari organizer terverifikasi di seluruh
            Indonesia — booking mudah, transparan, dan aman dari satu platform.
          </p>

          {/* Search bar */}
          <div className="max-w-[900px] mx-auto pt-6">
            <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-outline-variant">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-tighter">
                    Lokasi
                  </label>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-on-surface font-semibold placeholder:text-outline/50 outline-none"
                    placeholder="Cari destinasi..."
                    type="text"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-outline-variant">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-tighter">
                    Jadwal
                  </label>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-on-surface font-semibold placeholder:text-outline/50 outline-none"
                    placeholder="Pilih tanggal"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0">
                <Sailboat className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-tighter">
                    Tipe Trip
                  </label>
                  <select className="w-full bg-transparent border-none focus:ring-0 p-0 text-on-surface font-semibold cursor-pointer outline-none">
                    <option>Semua Kategori</option>
                    <option>Open Trip</option>
                    <option>Private Trip</option>
                  </select>
                </div>
              </div>
              <Button size="lg" className="rounded-xl py-4 px-8 shadow-lg" asChild>
                <Link href="/trips">
                  <Search className="h-5 w-5" /> Cari
                </Link>
              </Button>
            </div>

            {/* Quick category chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {quickCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.label}
                    href={`/trips?category=${cat.label.toLowerCase()}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Platform stat strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-8">
            {platformStats.map((stat, i) => (
              <div key={i} className="flex items-center gap-7">
                <div className="text-left">
                  <p className="text-2xl md:text-3xl font-extrabold text-primary-fixed leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/70 mt-1">{stat.label}</p>
                </div>
                {i < platformStats.length - 1 && (
                  <div className="hidden sm:block w-px h-8 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="max-w-container-max mx-auto px-gutter py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
            Cara Kerja
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-on-surface"
            style={{ letterSpacing: "-0.02em" }}
          >
            Booking Open Trip Cuma 3 Langkah
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* connective line for desktop */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-outline-variant" />

          {howItWorks.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="relative bg-white rounded-3xl p-8 border border-outline-variant/40 shadow-[0_10px_30px_-15px_rgba(0,101,145,0.15)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/25">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-extrabold text-surface-container-high select-none">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ FEATURED TRIPS — BENTO GRID ═══════════════ */}
      <section className="bg-surface-container/60 py-24">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Destinasi Pilihan
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-on-surface"
                style={{ letterSpacing: "-0.02em" }}
              >
                Eksplorasi Trip Unggulan
              </h2>
            </div>
            <Link
              href="/trips"
              className="group flex items-center gap-2 text-primary font-bold hover:pr-2 transition-all"
            >
              Lihat Semua Destinasi
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large card */}
            {featuredTrips
              .filter((t) => t.size === "large")
              .map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="group relative rounded-3xl overflow-hidden min-h-[420px] block"
                >
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className={`${trip.tagColor} text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase`}>
                      {trip.tag}
                    </span>
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-on-surface text-xs font-bold px-2.5 py-1.5 rounded-full">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {trip.rating}
                      <span className="text-on-surface-variant font-medium">({trip.reviews})</span>
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <div className="flex items-center gap-1.5 text-white/80 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      {trip.destination}
                      <span className="text-white/40">·</span>
                      {trip.duration}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{trip.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Mulai dari</p>
                        <p className="text-2xl font-extrabold">{trip.priceLabel}</p>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            {/* Small cards stacked */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {featuredTrips
                .filter((t) => t.size === "small")
                .map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.id}`}
                    className="group relative rounded-3xl overflow-hidden min-h-[130px] flex items-center bg-white border border-outline-variant/40 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-32 h-full min-h-[130px] flex-shrink-0 overflow-hidden">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        {trip.destination}
                      </div>
                      <h4 className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {trip.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-primary font-extrabold">{trip.priceLabel}</span>
                        <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {trip.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ POPULAR DESTINATIONS ═══════════════ */}
      <section className="max-w-container-max mx-auto px-gutter py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
            Trending
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-on-surface"
            style={{ letterSpacing: "-0.02em" }}
          >
            Destinasi Paling Diminati
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularDestinations.map((dest) => (
            <Link
              key={dest.name}
              href={`/trips?destination=${encodeURIComponent(dest.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold leading-tight mb-1">{dest.name}</h3>
                <p className="text-xs text-white/75">{dest.trips} trip tersedia</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════ WHY TRIPMATE ═══════════════ */}
      <section className="bg-surface-container py-24">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Kenapa TripMate?
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-on-surface leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Traveling Lebih Tenang, Aman & Berkesan
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Kami tidak hanya menyediakan paket perjalanan — kami membangun standar baru
                untuk booking open trip yang transparan, aman, dan bisa dipantau dari awal
                sampai kamu pulang ke rumah.
              </p>
              <Button size="lg" className="rounded-xl px-8" asChild>
                <Link href="/trips">
                  Mulai Jelajahi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const accent = accentMap[feature.accent as keyof typeof accentMap];
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-5 bg-white p-6 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,101,145,0.12)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 shrink-0 ${accent.bg} ${accent.hover} rounded-2xl flex items-center justify-center ${accent.text} group-hover:text-white transition-colors`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-on-surface mb-1.5">{feature.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="max-w-container-max mx-auto px-gutter py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
            Kata Mereka
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-on-surface"
            style={{ letterSpacing: "-0.02em" }}
          >
            Dipercaya Traveler & Organizer
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-outline-variant/40 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-on-surface-variant leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-outline-variant/40">
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: `hsl(${t.hue}, 65%, 45%)` }}
                >
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{t.name}</p>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="max-w-container-max mx-auto px-gutter py-12 pb-24">
        <div className="relative rounded-[48px] bg-primary overflow-hidden px-8 py-20 md:p-24 text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mx-auto text-white">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Gratis Daftar, Tanpa Biaya Tersembunyi
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Siap Bertemu Teman Baru di Petualangan Esok?
            </h2>
            <p className="text-white/80 text-xl max-w-xl mx-auto">
              Dapatkan diskon eksklusif <span className="text-secondary-fixed font-bold">Rp 150.000</span> untuk
              pendaftaran trip pertama Anda hari ini.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-extrabold rounded-2xl py-6 px-12 text-lg"
                asChild
              >
                <Link href="/register">Gabung Sekarang</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl py-6 px-12 text-lg"
                asChild
              >
                <Link href="/trips">Lihat Panduan</Link>
              </Button>
            </div>
            <div className="pt-8 flex items-center justify-center gap-3 text-white/60 text-sm">
              <Users className="h-4 w-4" />
              <span>Bergabung dengan 10,000+ Traveler di Seluruh Indonesia</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}