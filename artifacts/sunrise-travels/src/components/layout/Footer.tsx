import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock } from "lucide-react";
import { PHONE, PHONE_INTL, EMAIL } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#071B17] py-16 text-emerald-50/70">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center rounded-2xl bg-white p-3">
              <img src="/sunrise-travels-logo.png" alt="Sunrise Travels" className="h-14 w-14 object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-emerald-50/60">
              Your trusted partner for worldwide flights, Hajj &amp; Umrah packages, and professional NADRA, Visa, and Passport assistance.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-accent hover:text-primary" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-accent hover:text-primary" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-accent hover:text-primary" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <a href={`tel:${PHONE_INTL}`} className="flex items-start gap-3 transition hover:text-amber-300">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5">{PHONE}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 transition hover:text-amber-300">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5">{EMAIL}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5">211A Dunstable Road,<br />Luton, LU1 1DD<br />United Kingdom</span>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Clock className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5 text-emerald-50/50">
                  Mon-Fri: 10:00 - 18:00<br />
                  Sat: 10:00 - 14:00<br />
                  Sun: Closed
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/flights" className="transition-colors hover:text-amber-300">Flights</Link>
              <Link href="/hajj-umrah" className="transition-colors hover:text-amber-300">Hajj &amp; Umrah</Link>
              <Link href="/nadra-assistance" className="transition-colors hover:text-amber-300">NADRA Assistance</Link>
              <Link href="/pakistani-visa-assistance" className="transition-colors hover:text-amber-300">Visa Services</Link>
              <Link href="/passport-assistance" className="transition-colors hover:text-amber-300">Passport Assistance</Link>
              <Link href="/about" className="transition-colors hover:text-amber-300">About Us</Link>
              <Link href="/blog" className="transition-colors hover:text-amber-300">Travel Blog</Link>
              <Link href="/contact" className="transition-colors hover:text-amber-300">Contact</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg font-semibold text-white">Newsletter</h4>
            <p className="text-sm text-emerald-50/60">Subscribe for the latest travel deals, Hajj/Umrah updates, and news.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-emerald-50/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent/85"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-emerald-50/40 md:flex-row">
          <p>© {new Date().getFullYear()} Sunrise Travels. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-amber-300">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-amber-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
