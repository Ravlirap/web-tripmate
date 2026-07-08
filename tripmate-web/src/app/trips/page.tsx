"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Calendar,
  Search,
  Filter,
  Star,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";

const allTrips = [
  {
    id: 1,
    title: "Bali Adventure - 4D3N",
    destination: "Bali",
    province: "Bali",
    price: 2500000,
    image: "/trip-bali.png",
    date: "15-18 Agustus 2026",
    quota: 15,
    organizer: "Bali Explorer",
    status: "active" as const,
    rating: 4.9,
    reviews: 128,
    duration: "4D3N",
    tag: "Terpopuler",
  },
  {
    id: 2,
    title: "Raja Ampat Paradise - 5D4N",
    destination: "Papua Barat",
    province: "Papua Barat",
    price: 8500000,
    image: "/trip-raja-ampat.png",
    date: "1-5 September 2026",
    quota: 12,
    organizer: "Ocean Adventures",
    status: "active" as const,
    rating: 5.0,
    reviews: 64,
    duration: "5D4N",
    tag: "Premium",
  },
  {
    id: 3,
    title: "Bromo Sunrise Tour - 3D2N",
    destination: "Jawa Timur",
    province: "Jawa Timur",
    price: 1500000,
    image: "/trip-bromo.png",
    date: "20-22 Agustus 2026",
    quota: 20,
    organizer: "Mountain Climbers",
    status: "active" as const,
    rating: 4.8,
    reviews: 203,
    duration: "3D2N",
    tag: "Best Value",
  },
  {
    id: 4,
    title: "Komodo Island Expedition - 4D3N",
    destination: "Nusa Tenggara Timur",
    province: "NTT",
    price: 4500000,
    image: "/trip-komodo.png",
    date: "10-13 September 2026",
    quota: 10,
    organizer: "Island Hoppers",
    status: "active" as const,
    rating: 4.7,
    reviews: 89,
    duration: "4D3N",
    tag: "Adventure",
  },
  {
    id: 5,
    title: "Yogyakarta Cultural Tour - 3D2N",
    destination: "Yogyakarta",
    province: "Yogyakarta",
    price: 1200000,
    image: "/trip-yogyakarta.png",
    date: "25-27 Agustus 2026",
    quota: 25,
    organizer: "Java Heritage",
    status: "active" as const,
    rating: 4.6,
    reviews: 156,
    duration: "3D2N",
    tag: "Budaya",
  },
  {
    id: 6,
    title: "Danau Toba Lake Tour - 4D3N",
    destination: "Sumatera Utara",
    province: "Sumatera Utara",
    price: 3000000,
    image: "/trip-bromo.png",
    date: "5-8 Oktober 2026",
    quota: 18,
    organizer: "North Sumatra Tours",
    status: "active" as const,
    rating: 4.5,
    reviews: 72,
    duration: "4D3N",
    tag: "Danau",
  },
];

const tagColors: Record<string, string> = {
  "Terpopuler": "bg-orange-500",
  "Premium": "bg-purple-500",
  "Best Value": "bg-emerald-500",
  "Adventure": "bg-red-500",
  "Budaya": "bg-blue-500",
  "Danau": "bg-cyan-500",
};

export default function ExploreTripsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProvince, setFilterProvince] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const provinces = [...new Set(allTrips.map((t) => t.province))];

  let filtered = allTrips.filter((trip) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      trip.title.toLowerCase().includes(q) ||
      trip.destination.toLowerCase().includes(q) ||
      trip.organizer.toLowerCase().includes(q);
    const matchProvince = filterProvince === "" || trip.province === filterProvince;
    return matchSearch && matchProvince;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === "popular") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterProvince("");
    setSortBy("popular");
  };

  const hasActiveFilters = searchTerm !== "" || filterProvince !== "" || sortBy !== "popular";

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* ─── HEADER ─── */}
      <div className="bg-background pt-10 pb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#0b1c30]" style={{ letterSpacing: "-0.02em" }}>
            Find your next adventure
          </h1>
          <p className="text-zinc-500 text-lg mb-6">
            Explore curated trips from top-rated local organizers worldwide.
          </p>

          {/* Bento-style search & filters — matches Stitch Explore Trips layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-white p-3 rounded-2xl border border-zinc-200/70 shadow-sm">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#f8f9ff] border-none rounded-xl ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>

            {/* Province filter */}
            <div className="lg:col-span-4 relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <select
                value={filterProvince}
                onChange={(e) => setFilterProvince(e.target.value)}
                className="w-full appearance-none pl-11 pr-4 py-3 bg-[#f8f9ff] border-none rounded-xl ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none transition-all text-sm cursor-pointer"
              >
                <option value="">Semua Provinsi</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-3 relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none pl-11 pr-4 py-3 bg-[#f8f9ff] border-none rounded-xl ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none transition-all text-sm cursor-pointer"
              >
                <option value="popular">Terpopuler</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-asc">Harga: Terendah</option>
                <option value="price-desc">Harga: Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {provinces.map((p) => (
              <button
                key={p}
                onClick={() => setFilterProvince(filterProvince === p ? "" : p)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filterProvince === p
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ─── RESULT COUNT / RESET ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <span className="text-sm text-zinc-500 font-medium">
            {filtered.length} trip ditemukan
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
            >
              <X className="h-3 w-3" />
              Reset Filter
            </button>
          )}
        </div>

        {/* ─── TRIP GRID ─── */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((trip) => (
              <Link key={trip.id} href={`/trips/${trip.id}`} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-zinc-100">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className={`${tagColors[trip.tag] || "bg-zinc-500"} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                        {trip.tag}
                      </span>
                    </div>
                    {/* Status */}
                    {trip.status !== "active" && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-zinc-600 text-white text-xs px-2.5 py-1 rounded-full">Penuh</span>
                      </div>
                    )}
                    {/* Duration badge */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {trip.duration}
                    </div>
                    {/* Rating */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-zinc-800">{trip.rating}</span>
                      <span className="text-xs text-zinc-500">({trip.reviews})</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-primary transition-colors mb-1 leading-snug">
                      {trip.title}
                    </h3>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                        <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                        <Calendar className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span>{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                        <Users className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span>Kuota: {trip.quota} orang</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <div>
                        <p className="text-xs text-zinc-400">Mulai dari</p>
                        <p className="text-xl font-bold text-primary">
                          Rp {trip.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="bg-primary/10 group-hover:bg-primary rounded-full p-2.5 transition-colors">
                        <ArrowRight className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex p-6 bg-zinc-100 rounded-full mb-6">
              <Search className="h-12 w-12 text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-700 mb-3">Trip Tidak Ditemukan</h2>
            <p className="text-zinc-500 mb-6">Coba ubah kata kunci pencarian atau reset filter.</p>
            <Button onClick={clearFilters}>Reset Filter</Button>
          </div>
        )}
      </div>
    </div>
  );
}