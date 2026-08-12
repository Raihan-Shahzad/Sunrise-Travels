import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock } from "lucide-react";
import { PHONE, PHONE_INTL, EMAIL } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center">
              <img src="/logo.jpg" alt="Sunrise Travels" className="h-14 w-auto rounded-sm" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner for worldwide flights, Hajj & Umrah packages, and professional NADRA, Visa, and Passport assistance.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <a href={`tel:${PHONE_INTL}`} className="flex items-start gap-3 hover:text-white transition">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5">{PHONE}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 hover:text-white transition">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5">{EMAIL}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5">211A Dunstable Road,<br />Luton, LU1 1DD<br />United Kingdom</span>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Clock className="h-5 w-5 shrink-0 text-accent" />
                <span className="mt-0.5 text-slate-400">
                  Mon-Fri: 10:00 - 18:00<br />
                  Sat: 10:00 - 14:00<br />
                  Sun: Closed
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/flights" className="hover:text-primary transition-colors">Flights</Link>
              <Link href="/hajj-umrah" className="hover:text-primary transition-colors">Hajj & Umrah</Link>
              <Link href="/nadra-assistance" className="hover:text-primary transition-colors">NADRA Assistance</Link>
              <Link href="/pakistani-visa-assistance" className="hover:text-primary transition-colors">Visa Services</Link>
              <Link href="/passport-assistance" className="hover:text-primary transition-colors">Passport Assistance</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">Travel Blog</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Newsletter</h4>
            <p className="text-sm text-slate-400">Subscribe for the latest travel deals, Hajj/Umrah updates, and news.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-600 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="pt-4 flex gap-3 opacity-60">
              <span className="text-xs">ATOL Protected</span>
              <span className="text-xs">IATA Accredited</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} Sunrise Travels. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
