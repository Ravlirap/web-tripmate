import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Search,
  ShieldCheck,
  Wallet,
  Headphones,
  Star,
  ArrowRight,
  Heart,
  Sailboat,
  Send,
} from "lucide-react";

const featuredTrips = [
  {
    id: 1,
    title: "Ubud Retreat & Yoga",
    destination: "Bali, Indonesia",
    priceLabel: "Rp 3.5jt",
    duration: "4H 3M",
    image: "/trip-bali.png",
    rating: 4.9,
    tag: "Open Trip",
    tagColor: "bg-primary/90",
  },
  {
    id: 2,
    title: "Phinisi Adventure",
    destination: "Labuan Bajo",
    priceLabel: "Rp 5.2jt",
    duration: "3H 2M",
    image: "/trip-komodo.png",
    rating: 5.0,
    tag: "Sailing",
    tagColor: "bg-secondary/90",
  },
  {
    id: 3,
    title: "Deep Blue Dive",
    destination: "Raja Ampat",
    priceLabel: "Rp 12.5jt",
    duration: "7H 6M",
    image: "/trip-raja-ampat.png",
    rating: 4.8,
    tag: "Premium",
    tagColor: "bg-primary/90",
  },
  {
    id: 4,
    title: "Rinjani Summit",
    destination: "Lombok, NTB",
    priceLabel: "Rp 2.8jt",
    duration: "3H 2M",
    image: "/trip-bromo.png",
    rating: 4.7,
    tag: "Adventure",
    tagColor: "bg-tertiary/90",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Komunitas Terverifikasi",
    description:
      "Setiap anggota melewati verifikasi identitas berlapis untuk memastikan lingkungan trip yang aman bagi semua orang.",
    iconBg: "bg-primary/10",
    hoverBg: "group-hover:bg-primary",
  },
  {
    icon: Wallet,
    title: "Jaminan Refund 100%",
    description:
      "Dana Anda aman di sistem escrow kami. Kami menjamin pengembalian dana penuh jika trip dibatalkan oleh penyelenggara.",
    iconBg: "bg-secondary/10",
    hoverBg: "group-hover:bg-secondary",
  },
  {
    icon: Headphones,
    title: "Dukungan Siaga 24/7",
    description:
      "Tim bantuan kami siap membantu kendala teknis maupun operasional selama perjalanan Anda berlangsung.",
    iconBg: "bg-tertiary/10",
    hoverBg: "group-hover:bg-tertiary",
  },
];

const trustAvatars = ["#89ceff", "#fd761a", "#de8712"];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/trip-komodo.png" alt="TripMate" fill priority className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(11,28,48,0.8) 0%, rgba(11,28,48,0.2) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-gutter text-center text-white space-y-8 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mx-auto">
            <ShieldCheck className="h-[18px] w-[18px]" />
            <span className="uppercase tracking-widest text-[11px] font-semibold">
              Komunitas Travel Terpercaya No. 1
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] max-w-4xl mx-auto"
            style={{ letterSpacing: "-0.02em" }}
          >
            Jelajah Nusantara Bersama <span className="text-primary-fixed">Teman Baru</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ubah rencana liburanmu menjadi petualangan sosial. Bergabunglah dengan open trip
            terkurasi dan ciptakan cerita di setiap sudut Indonesia.
          </p>

          {/* Integrated search bar */}
          <div className="max-w-[900px] mx-auto mt-12">
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
          </div>
        </div>
      </section>

      {/* ─── FEATURED TRIPS ─── */}
      <section className="max-w-container-max mx-auto px-gutter py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredTrips.map((trip) => (
            <div
              key={trip.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-[0_10px_30px_-10px_rgba(0,101,145,0.1)] hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[13px] text-primary flex items-center gap-1 shadow-sm">
                  <Star className="h-[14px] w-[14px] fill-current" /> {trip.rating}
                </div>
                <button
                  type="button"
                  aria-label="Simpan trip"
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-sm"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <Link
                    href={`/trips/${trip.id}`}
                    className="font-semibold text-lg text-on-surface hover:text-primary transition-colors"
                  >
                    {trip.title}
                  </Link>
                  <span
                    className={`${trip.tagColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap`}
                  >
                    {trip.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
                  <MapPin className="h-[18px] w-[18px] text-primary" /> {trip.destination}
                </div>
                <div className="mt-auto flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-outline uppercase font-bold tracking-wider">
                      Per Orang
                    </p>
                    <p className="text-primary font-extrabold text-xl">{trip.priceLabel}</p>
                  </div>
                  <span className="text-on-surface-variant text-xs font-semibold px-2 py-1 bg-surface-container rounded-md">
                    {trip.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-surface-container py-24">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
              Kenapa TripMate?
            </span>
            <h2
              className="text-4xl font-bold text-on-surface leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Traveling Lebih Tenang, Aman & Berkesan
            </h2>
            <p className="text-on-surface-variant text-lg">
              Kami tidak hanya menyediakan paket perjalanan, kami membangun standar baru dalam
              traveling berkelompok yang aman dan terpercaya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-10 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,101,145,0.1)] group hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 ${feature.iconBg} ${feature.hoverBg} rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:text-white transition-colors`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-on-surface mb-4">{feature.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-container-max mx-auto px-gutter py-24">
        <div className="relative rounded-[48px] bg-primary overflow-hidden px-8 py-20 md:p-24 text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-10">
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
            <div className="pt-8 flex items-center justify-center gap-4 text-white/60 text-sm">
              <div className="flex -space-x-3">
                {trustAvatars.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-primary"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <span>Bergabung dengan 10,000+ Traveler</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}