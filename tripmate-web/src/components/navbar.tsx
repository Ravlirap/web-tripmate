"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import {
  MapPin,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Compass,
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

  const roleBadge: Record<string, string> = {
    admin: "bg-tertiary-container/20 text-on-tertiary-fixed-variant",
    organizer: "bg-primary-container/20 text-on-primary-fixed-variant",
    traveler: "bg-confirmed/10 text-confirmed",
  };

  return (
    <nav className="w-full top-0 sticky z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/60 shadow-sm">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
              <MapPin className="h-5 w-5 text-on-primary" />
            </div>
            <span className="text-headline-sm font-bold text-primary">TripMate</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/" ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/trips"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive("/trips") ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <Compass className="h-4 w-4" />
              Jelajah Trip
            </Link>
            {isAuthenticated && dashboardLink && (
              <Link
                href={dashboardLink.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(dashboardLink.href) ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                {dashboardLink.label}
              </Link>
            )}
          </div>

          {/* Desktop auth */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2">
                  <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-on-primary text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface leading-none">{user.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[user.role] || "bg-surface-container text-on-surface-variant"}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-on-surface-variant hover:text-error hover:bg-error-container/20">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-on-surface font-semibold" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button size="sm" className="rounded-lg font-bold" asChild>
                  <Link href="/register">Daftar Gratis</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-on-surface" /> : <Menu className="h-5 w-5 text-on-surface" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-outline-variant shadow-xl md:hidden">
            <div className="px-4 py-4 space-y-1">
              {[
                { href: "/", label: "Beranda" },
                { href: "/trips", label: "Jelajah Trip", icon: Compass },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.href) ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && dashboardLink && (
                <Link
                  href={dashboardLink.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold ${
                    isActive(dashboardLink.href) ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {dashboardLink.label}
                </Link>
              )}

              <div className="pt-3 border-t border-outline-variant/60">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-lg">
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-on-primary text-sm font-bold">{user.name?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                        <span className="text-xs font-medium text-on-surface-variant">{user.role}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-error border-error/30 hover:bg-error-container/20">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Masuk</Link>
                    </Button>
                    <Button size="sm" className="w-full" asChild>
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