"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import {
  MapPin,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Compass,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "admin": return { href: "/admin", label: "Admin Panel" };
      case "organizer": return { href: "/organizer", label: "Dashboard" };
      case "traveler": return { href: "/dashboard", label: "Dashboard" };
      default: return null;
    }
  };

  const dashboardLink = getDashboardLink();

  // Role badge colors
  const roleBadge: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    organizer: "bg-blue-100 text-blue-700",
    traveler: "bg-emerald-100 text-emerald-700",
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-b border-zinc-200/60" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container shadow-md shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              TripMate
            </span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/") && pathname === "/"
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-600 hover:text-primary hover:bg-zinc-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/trips"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/trips")
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-600 hover:text-primary hover:bg-zinc-100"
              }`}
            >
              <Compass className="h-4 w-4" />
              Explore Trip
            </Link>

            {isAuthenticated && dashboardLink && (
              <Link
                href={dashboardLink.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(dashboardLink.href)
                    ? "bg-primary/10 text-primary"
                    : "text-zinc-600 hover:text-primary hover:bg-zinc-100"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                {dashboardLink.label}
              </Link>
            )}
          </div>

          {/* ── Desktop Auth ── */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                {/* User info pill */}
                <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-700 leading-none">{user.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[user.role] || "bg-zinc-100 text-zinc-600"}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-600 hover:text-primary rounded-xl font-medium"
                  asChild
                >
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary-container hover:opacity-95 text-white rounded-xl font-semibold shadow-md shadow-primary/20 transition-all hover:shadow-primary/30"
                  asChild
                >
                  <Link href="/register">Daftar Gratis</Link>
                </Button>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-zinc-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-zinc-700" />
            ) : (
              <Menu className="h-5 w-5 text-zinc-700" />
            )}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-xl md:hidden">
            <div className="px-4 py-4 space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/trips", label: "Explore Trip", icon: Compass },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && dashboardLink && (
                <Link
                  href={dashboardLink.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive(dashboardLink.href) ? "bg-primary/10 text-primary" : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {dashboardLink.label}
                </Link>
              )}

              <div className="pt-3 border-t border-zinc-100">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-[#0ea5e9] flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{user.name?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-700">{user.name}</p>
                        <span className={`text-xs font-medium ${roleBadge[user.role]}`}>{user.role}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full rounded-xl text-red-500 border-red-200 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full rounded-xl" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Masuk</Link>
                    </Button>
                    <Button size="sm" className="w-full rounded-xl bg-primary" asChild>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Daftar Gratis</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}