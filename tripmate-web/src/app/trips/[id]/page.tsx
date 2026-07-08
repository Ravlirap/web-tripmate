import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Calendar,
  ArrowLeft,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  ChevronRight,
  Share2,
  Heart,
  Shield,
} from "lucide-react";

const allTrips = [
  {
    id: 1,
    title: "Bali Adventure - 4D3N",
    destination: "Bali",
    price: 2500000,
    image: "/trip-bali.png",
    date: "15-18 Agustus 2026",
    quota: 15,
    quotaLeft: 8,
    organizer: { name: "Bali Explorer", id: "org1", avatar: "BE", rating: 4.9, totalTrips: 47 },
    status: "active" as const,
    description:
      "Nikmati keindahan alam Bali selama 4 hari 3 malam. Jelajahi pantai-pantai eksotis, budaya unik yang kaya, dan kuliner lezat yang menggugah selera. Trip ini dirancang untuk Anda yang mencari keseimbangan antara relaksasi dan petualangan, dengan itinerary yang matang dan pemandu berpengalaman.",
    duration: "4 Hari 3 Malam",
    rating: 4.9,
    reviews: 128,
    meetingPoint: "Bandara Ngurah Rai, Bali",
    includes: [
      "Akomodasi hotel bintang 3 (3 malam)",
      "Transportasi AC selama trip",
      "Tiket masuk semua objek wisata",
      "Tour guide profesional & ramah",
      "Sarapan pagi setiap hari",
      "Dokumentasi foto & video",
    ],
    excludes: [
      "Tiket pesawat PP",
      "Makan siang & malam",
      "Pengeluaran pribadi",
      "Asuransi perjalanan",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Seminyak", desc: "Tiba, check-in hotel, jelajahi Seminyak Beach & sunset" },
      { day: 2, title: "Ubud Culture Day", desc: "Tegalalang Rice Terrace, Monkey Forest, Ubud Art Market" },
      { day: 3, title: "Temple & Beach", desc: "Tanah Lot, Uluwatu Temple, Kecak Dance performance" },
      { day: 4, title: "Departure", desc: "Free time, belanja oleh-oleh, transfer ke bandara" },
    ],
  },
  {
    id: 2,
    title: "Raja Ampat Paradise - 5D4N",
    destination: "Papua Barat",
    price: 8500000,
    image: "/trip-raja-ampat.png",
    date: "1-5 September 2026",
    quota: 12,
    quotaLeft: 4,
    organizer: { name: "Ocean Adventures", id: "org2", avatar: "OA", rating: 5.0, totalTrips: 23 },
    status: "active" as const,
    description:
      "Rasakan keajaiban Raja Ampat, surga bawah laut Indonesia yang mendunia. Snorkeling dan diving di antara terumbu karang terkaya di dunia, menikmati pemandangan pulau-pulau karst yang dramatis, dan menyaksikan kehidupan laut yang luar biasa. Pengalaman sekali seumur hidup yang akan selalu Anda kenang.",
    duration: "5 Hari 4 Malam",
    rating: 5.0,
    reviews: 64,
    meetingPoint: "Bandara DEO, Sorong",
    includes: [
      "Akomodasi resort tepi pantai (4 malam)",
      "Kapal liveaboard dengan kapten berpengalaman",
      "Peralatan snorkeling & diving (basic)",
      "Makan 3x sehari selama trip",
      "Dokumentasi underwater professional",
      "Park entry fee Raja Ampat",
    ],
    excludes: [
      "Tiket pesawat PP ke Sorong",
      "Asuransi perjalanan (wajib)",
      "Peralatan diving advanced",
    ],
    itinerary: [
      { day: 1, title: "Arrival Sorong", desc: "Tiba di Sorong, transfer ke resort, snorkeling perdana" },
      { day: 2, title: "Wayag Islands", desc: "Trekking ke viewpoint Wayag, snorkeling di lagoon biru" },
      { day: 3, title: "Pianemo & Cape Kri", desc: "Viewpoint Pianemo, snorkeling di Cape Kri yang kaya ikan" },
      { day: 4, title: "Arborek & Pasir Timbul", desc: "Desa Arborek, sandbar putih, manta ray encounter" },
      { day: 5, title: "Departure", desc: "Pagi hari bebas, transfer ke bandara Sorong" },
    ],
  },
  {
    id: 3,
    title: "Bromo Sunrise Tour - 3D2N",
    destination: "Jawa Timur",
    price: 1500000,
    image: "/trip-bromo.png",
    date: "20-22 Agustus 2026",
    quota: 20,
    quotaLeft: 15,
    organizer: { name: "Mountain Climbers", id: "org3", avatar: "MC", rating: 4.8, totalTrips: 89 },
    status: "active" as const,
    description:
      "Saksikan matahari terbit spektakuler di atas kawah Gunung Bromo yang legendaris. Nikmati pemandangan kawah berasap yang megah, lautan pasir yang luas, dan langit yang memukau. Trip singkat namun penuh kesan mendalam — sempurna untuk weekend getaway.",
    duration: "3 Hari 2 Malam",
    rating: 4.8,
    reviews: 203,
    meetingPoint: "Terminal Bungurasih, Surabaya",
    includes: [
      "Transportasi PP dari Surabaya (bus AC)",
      "Akomodasi homestay nyaman (2 malam)",
      "Jeep Bromo (termasuk sunrise viewpoint)",
      "Tiket masuk kawasan TNBTS",
      "Tour guide berpengalaman",
    ],
    excludes: [
      "Tiket kereta/pesawat ke Surabaya",
      "Makan (tersedia warung lokal)",
      "Porter & kuda",
    ],
    itinerary: [
      { day: 1, title: "Surabaya - Bromo", desc: "Berangkat sore dari Surabaya, tiba di Cemoro Lawang malam hari" },
      { day: 2, title: "Sunrise & Kawah Bromo", desc: "Subuh ke viewpoint, jeep ke Kawah Bromo, Pasir Berbisik, Bukit Teletubbies" },
      { day: 3, title: "Kembali ke Surabaya", desc: "Sarapan, packing, perjalanan pulang ke Surabaya sore hari" },
    ],
  },
  {
    id: 4,
    title: "Komodo Island Expedition - 4D3N",
    destination: "Nusa Tenggara Timur",
    price: 4500000,
    image: "/trip-komodo.png",
    date: "10-13 September 2026",
    quota: 10,
    quotaLeft: 3,
    organizer: { name: "Island Hoppers", id: "org4", avatar: "IH", rating: 4.7, totalTrips: 35 },
    status: "active" as const,
    description:
      "Ekspedisi ke habitat asli Komodo di Taman Nasional Komodo. Saksikan langsung komodo raksasa di alam liar, berenang di Pink Beach yang legendaris, dan nikmati keindahan bawah laut Laut Flores yang menakjubkan.",
    duration: "4 Hari 3 Malam",
    rating: 4.7,
    reviews: 89,
    meetingPoint: "Bandara Komodo, Labuan Bajo",
    includes: [
      "Kapal liveaboard (3 malam)",
      "Makan 3x sehari",
      "Tour guide ranger Taman Nasional",
      "Tiket masuk Taman Nasional Komodo",
      "Snorkeling gear",
    ],
    excludes: [
      "Tiket pesawat ke Labuan Bajo",
      "Pajak daerah",
      "Tip untuk guide & crew",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Departure", desc: "Tiba di Labuan Bajo, boarding kapal, menuju Pulau Komodo" },
      { day: 2, title: "Pulau Komodo & Rinca", desc: "Trekking Pulau Komodo, lihat komodo, snorkeling" },
      { day: 3, title: "Pink Beach & Manta Point", desc: "Pink Beach, Manta Point snorkeling, Pulau Padar sunset" },
      { day: 4, title: "Return to Labuan Bajo", desc: "Snorkeling pagi, kembali ke pelabuhan, check-out" },
    ],
  },
];

function getTripById(id: number) {
  return allTrips.find((t) => t.id === id);
}

export default function TripDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tripId = parseInt(params.id, 10);
  const trip = getTripById(tripId);

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl mb-6">🗺️</div>
          <h1 className="text-3xl font-bold text-zinc-800 mb-3">Trip Tidak Ditemukan</h1>
          <p className="text-zinc-500 mb-8">
            Trip dengan ID {params.id} tidak dapat ditemukan.
          </p>
          <Button asChild>
            <Link href="/trips">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Trip
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const quotaPercent = Math.round(((trip.quota - trip.quotaLeft) / trip.quota) * 100);

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* ─── HERO IMAGE ─── */}
      <div className="relative h-[55vh] min-h-[400px]">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-[#0b1c30]/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </div>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2.5 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2.5 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom info on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  <span className="text-white/80 text-sm">{trip.destination}</span>
                  <ChevronRight className="h-3 w-3 text-white/50" />
                  <span className="text-white/80 text-sm">{trip.duration}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {trip.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meta badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-700">{trip.rating}</span>
                <span className="text-sm text-yellow-600">({trip.reviews} ulasan)</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-700 font-medium">{trip.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-700 font-medium">{trip.meetingPoint}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#0b1c30] mb-4">Tentang Trip Ini</h2>
              <p className="text-zinc-600 leading-relaxed">{trip.description}</p>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-3xl p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#0b1c30] mb-6">Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{item.day}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-semibold text-[#0b1c30] mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                      {i < trip.itinerary.length - 1 && (
                        <div className="w-px h-4 bg-zinc-200 ml-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes & Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-7 shadow-sm">
                <h2 className="text-lg font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Yang Termasuk
                </h2>
                <ul className="space-y-3">
                  {trip.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl p-7 shadow-sm">
                <h2 className="text-lg font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-400" />
                  Tidak Termasuk
                </h2>
                <ul className="space-y-3">
                  {trip.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-3xl p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#0b1c30] mb-4">Tentang Organizer</h2>
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: "linear-gradient(135deg, #006591, #0ea5e9)" }}
                >
                  {trip.organizer.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0b1c30] text-lg">{trip.organizer.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-zinc-700">{trip.organizer.rating}</span>
                    </div>
                    <span className="text-zinc-300">·</span>
                    <span className="text-sm text-zinc-500">{trip.organizer.totalTrips} trip</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 rounded-full px-3 py-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 overflow-hidden">
                {/* Price header */}
                <div className="bg-gradient-to-r from-[#006591] to-[#0ea5e9] p-6 text-white">
                  <p className="text-white/70 text-sm mb-1">Harga per orang</p>
                  <p className="text-4xl font-bold">
                    Rp {trip.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Quota progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500 flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        Kuota Tersisa
                      </span>
                      <span className={`font-bold ${trip.quotaLeft <= 5 ? "text-red-500" : "text-emerald-600"}`}>
                        {trip.quotaLeft} dari {trip.quota}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-[#0ea5e9] rounded-full transition-all"
                        style={{ width: `${quotaPercent}%` }}
                      />
                    </div>
                    {trip.quotaLeft <= 5 && (
                      <p className="text-xs text-red-500 mt-2 font-medium">⚡ Hampir penuh! Segera pesan.</p>
                    )}
                  </div>

                  {/* Trip info */}
                  <div className="space-y-3 py-4 border-y border-zinc-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        Tanggal
                      </span>
                      <span className="font-medium text-zinc-700">{trip.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        Durasi
                      </span>
                      <span className="font-medium text-zinc-700">{trip.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 flex items-center gap-1.5">
                        <UserCheck className="h-4 w-4" />
                        Organizer
                      </span>
                      <span className="font-medium text-zinc-700">{trip.organizer.name}</span>
                    </div>
                  </div>

                  {/* Book button */}
                  <Button
                    size="lg"
                    className="w-full bg-[#fd761a] hover:bg-[#e06010] text-white font-bold rounded-2xl py-6 text-base shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]"
                    asChild
                  >
                    <Link href={`/trips/${trip.id}/book`}>
                      Pesan Sekarang
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-2xl border-primary text-primary hover:bg-primary/5"
                    asChild
                  >
                    <Link href="/login">Login untuk Memesan</Link>
                  </Button>

                  {/* Security note */}
                  <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Booking aman & terjamin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}