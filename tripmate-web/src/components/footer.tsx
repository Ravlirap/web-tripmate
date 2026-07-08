import Link from "next/link";
import { MapPin, Mail, Phone, Globe, Camera, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "Tentang Kami", href: "/about" },
      { label: "Kontak", href: "/contact" },
      { label: "Karir", href: "/careers" },
    ],
    support: [
      { label: "FAQ", href: "/faq" },
      { label: "Syarat & Ketentuan", href: "/terms" },
      { label: "Kebijakan Privasi", href: "/privacy" },
    ],
    trips: [
      { label: "Explore Trips", href: "/trips" },
      { label: "Destinasi Populer", href: "/trips?popular=true" },
      { label: "Trip Mendatang", href: "/trips?upcoming=true" },
    ],
  };

  const socialLinks = [
    { icon: Globe, href: "https://facebook.com/tripmate", label: "Facebook" },
    { icon: Camera, href: "https://instagram.com/tripmate", label: "Instagram" },
    { icon: MessageCircle, href: "https://twitter.com/tripmate", label: "Twitter" },
  ];

  return (
    <footer className="border-t bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">TripMate</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-zinc-600">
              Platform open trip terpercaya untuk petualangan Anda. Temukan destinasi impian dan 
              bergabung dengan traveler lainnya untuk pengalaman tak terlupakan.
            </p>
            <div className="mt-6 space-y-2">
              <a 
                href="mailto:info@tripmate.com" 
                className="flex items-center text-sm text-zinc-600 hover:text-primary"
              >
                <Mail className="mr-2 h-4 w-4" />
                info@tripmate.com
              </a>
              <a 
                href="tel:+6281234567890" 
                className="flex items-center text-sm text-zinc-600 hover:text-primary"
              >
                <Phone className="mr-2 h-4 w-4" />
                +62 812-3456-7890
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">Bantuan</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trip Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">Open Trip</h3>
            <ul className="space-y-3">
              {footerLinks.trips.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-sm text-zinc-600">
            © {currentYear} TripMate. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="mt-4 flex space-x-4 md:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-primary"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}