import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Calendar,
  Shield,
  Clock,
  Award,
  Heart,
  ArrowRight,
  Star,
  TrendingUp,
  CheckCircle2,
  Compass,
} from "lucide-react";

const featuredTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    subtitle: "4 Hari 3 Malam",
    destination: "Bali",
    price: 2500000,
    image: "/trip-bali.png",
    date: "15-18 Agustus 2026",
    quota: 15,
    organizer: "Bali Explorer",
    rating: 4.9,
    reviews: 128,
    tag: "Terpopuler",
  },
  {
    id: 2,
    title: "Raja Ampat Paradise",
    subtitle: "5 Hari 4 Malam",
    destination: "Papua Barat",
    price: 8500000,
    image: "/trip-raja-ampat.png",
    date: "1-5 September 2026",
    quota: 12,
    organizer: "Ocean Adventures",
    rating: 5.0,
    reviews: 64,
    tag: "Premium",
  },
  {
    id: 3,
    title: "Bromo Sunrise Tour",
    subtitle: "3 Hari 2 Malam",
    destination: "Jawa Timur",
    price: 1500000,
    image: "/trip-bromo.png",
    date: "20-22 Agustus 2026",
    quota: 20,
    organizer: "Mountain Climbers",
    rating: 4.8,
    reviews: 203,
    tag: "Best Value",
  },
];

const stats = [
  { icon: Users, label: "Traveler Aktif", value: "10,000+", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: MapPin, label: "Destinasi", value: "150+", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Calendar, label: "Trip Tersedia", value: "500+", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Award, label: "Rating Rata-rata", value: "4.9/5", color: "text-purple-600", bg: "bg-purple-50" },
];

const features = [
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Semua organizer terverifikasi dan sistem pembayaran dijamin keamanannya",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Komunitas Aktif",
    description: "Bergabung dengan ribuan traveler dari seluruh Indonesia yang aktif berbagi pengalaman",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Booking Mudah",
    description: "Proses booking cepat dalam hitungan menit, konfirmasi langsung dari organizer",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Heart,
    title: "Pengalaman Terbaik",
    description: "Trip berkualitas tinggi dengan guide berpengalaman dan itinerary yang matang",
    color: "from-rose-500 to-pink-500",
  },
];

const testimonials = [
  {
    name: "Rizky Pratama",
    location: "Jakarta",
    avatar: "RP",
    text: "Pengalaman luar biasa! Trip ke Bromo via TripMate benar-benar memuaskan. Organizer sangat profesional dan guide-nya ramah.",
    rating: 5,
    trip: "Bromo Sunrise Tour",
  },
  {
    name: "Siti Nuraini",
    location: "Bandung",
    avatar: "SN",
    text: "Raja Ampat adalah surga! Terima kasih TripMate sudah menghubungkan saya dengan organizer terbaik. Pasti repeat trip!",
    rating: 5,
    trip: "Raja Ampat Paradise",
  },
  {
    name: "Dimas Wijaya",
    location: "Surabaya",
    avatar: "DW",
    text: "Booking di TripMate sangat mudah. Bali trip kemarin jadi liburan paling memorable yang pernah saya jalani bersama keluarga.",
    rating: 5,
    trip: "Bali Adventure",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/trip-bali.png"
            alt="Indonesia Travel"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/90 via-[#0b1c30]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-white">#1 Platform Open Trip Indonesia</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
              Temukan<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-tertiary-container">
                Petualangan
              </span><br />
              Impianmu
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Platform open trip terpercaya untuk menjelajahi destinasi menakjubkan 
              bersama traveler lainnya. Booking mudah, pengalaman tak terlupakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-secondary-container hover:bg-secondary text-white font-semibold text-base px-8 py-6 rounded-full shadow-lg shadow-secondary-container/30 transition-all hover:scale-105"
                asChild
              >
                <Link href="/trips">
                  <Compass className="mr-2 h-5 w-5" />
                  Explore Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-full backdrop-blur-sm"
                asChild
              >
                <Link href="/register">Daftar Gratis</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                {["RP", "SN", "DW", "BW"].map((initials, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `hsl(${i * 60 + 200}, 70%, 50%)` }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-white font-semibold ml-1">4.9</span>
                </div>
                <p className="text-white/60 text-sm">dari 10,000+ traveler</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-0.5 h-10 bg-white/30 rounded-full" />
          <div className="w-0.5 h-4 bg-white/60 rounded-full" />
        </div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="relative -mt-12 z-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className={`inline-flex p-3 rounded-2xl ${stat.bg} mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-[#0b1c30]">{stat.value}</div>
                    <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED TRIPS SECTION ─── */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Trip Pilihan</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4" style={{ letterSpacing: '-0.02em' }}>
              Destinasi Terfavorit
            </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto">
              Pilihan trip terbaik yang paling diminati traveler Indonesia
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredTrips.map((trip) => (
              <Link key={trip.id} href={`/trips/${trip.id}`} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#fd761a] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {trip.tag}
                      </span>
                    </div>
                    {/* Rating */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-zinc-800">{trip.rating}</span>
                      <span className="text-xs text-zinc-500">({trip.reviews})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-[#0b1c30] group-hover:text-primary transition-colors">
                          {trip.title}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-0.5">{trip.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Kuota: {trip.quota} orang</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <div>
                        <p className="text-xs text-zinc-400">Mulai dari</p>
                        <p className="text-2xl font-bold text-primary">
                          Rp {trip.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="bg-primary/10 group-hover:bg-primary rounded-full p-2.5 transition-colors">
                        <ArrowRight className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-10 py-6 rounded-full transition-all"
              asChild
            >
              <Link href="/trips">
                Lihat Semua Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-1.5 mb-4">
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">Keunggulan Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4" style={{ letterSpacing: '-0.02em' }}>
              Kenapa Pilih TripMate?
            </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto">
              Platform terpercaya dengan ekosistem yang mendukung perjalanan impianmu
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-3xl border border-zinc-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1c30] mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-1.5 mb-4">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-700">Testimoni</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4" style={{ letterSpacing: '-0.02em' }}>
              Kata Mereka
            </h2>
            <p className="text-lg text-zinc-500">
              Lebih dari 10,000 traveler telah mempercayakan petualangan mereka ke TripMate
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `hsl(${i * 80 + 200}, 65%, 50%)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0b1c30]">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.location} · {t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/trip-raja-ampat.png"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Siap Memulai<br />
            <span className="text-secondary-container">Petualanganmu?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan traveler dan temukan pengalaman yang tidak akan pernah terlupakan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary-container hover:bg-secondary text-white font-semibold text-base px-10 py-6 rounded-full shadow-lg shadow-secondary-container/30 transition-all hover:scale-105"
              asChild
            >
              <Link href="/register">
                Daftar Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/15 font-semibold text-base px-10 py-6 rounded-full"
              asChild
            >
              <Link href="/trips">Lihat Semua Trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}