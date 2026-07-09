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
  Route,
  Briefcase,
  Info,
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
    admin: "text-tertiary",
    organizer: "text-primary",
    traveler: "text-confirmed",
  };

  const roleLabel: Record<string, string> = {
    admin: "Admin",
    organizer: "Organizer",
    traveler: "Traveler",
  };

  // Link informasi utama — di tengah navbar
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/trips", label: "Jelajah Trip", icon: Compass },
    { href: "/cara-kerja", label: "Cara Kerja", icon: Route },
    { href: "/tentang", label: "Tentang Kami", icon: Info },
  ];

  return (
    <nav className="w-full top-0 sticky z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/60">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/20">
              <MapPin className="h-5 w-5 text-on-primary" />
            </div>
            <span className="text-lg font-extrabold text-primary tracking-tight">
              TripMate
            </span>
          </Link>

          {/* Desktop nav — pill segmented control */}
          <div className="hidden lg:flex items-center gap-0.5 bg-surface-container-low border border-outline-variant/50 rounded-full p-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    active
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary hover:bg-white"
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated && dashboardLink && (
              <Link
                href={dashboardLink.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive(dashboardLink.href)
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary hover:bg-white"
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                {dashboardLink.label}
              </Link>
            )}
          </div>

          {/* Desktop auth + secondary CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 bg-surface-container-low border border-outline-variant/60 rounded-full pl-1.5 pr-4 py-1.5">
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-on-primary text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-on-surface">{user.name}</p>
                    <span className={`text-[10px] font-semibold ${roleBadge[user.role] || ""}`}>
                      {roleLabel[user.role] || user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="p-2.5 rounded-full text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-on-surface font-semibold" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full font-semibold border-primary/30 text-primary hover:bg-primary/5 hidden xl:inline-flex"
                  asChild
                >
                  <Link href="/register?role=organizer">
                    <Briefcase className="h-3.5 w-3.5" />
                    Jadi Organizer
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="rounded-full font-bold bg-secondary-container hover:bg-secondary-container/90 text-white shadow-md shadow-secondary-container/25 px-5"
                  asChild
                >
                  <Link href="/register">Daftar Gratis</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container transition-colors shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-on-surface" /> : <Menu className="h-5 w-5 text-on-surface" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-outline-variant/60 px-1 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.href) ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              );
            })}

            {isAuthenticated && dashboardLink && (
              <Link
                href={dashboardLink.href}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive(dashboardLink.href) ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                {dashboardLink.label}
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                href="/register?role=organizer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase className="h-4 w-4" />
                Jadi Organizer
              </Link>
            )}

            <div className="pt-3 mt-2 border-t border-outline-variant/60">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-xl">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-on-primary text-sm font-bold">{user.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                      <span className="text-xs font-medium text-on-surface-variant">{roleLabel[user.role] || user.role}</span>
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
                  <Button size="sm" className="w-full bg-secondary-container hover:bg-secondary-container/90" asChild>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Daftar Gratis</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}