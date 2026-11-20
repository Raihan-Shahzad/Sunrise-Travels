import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MobileDrawer } from "./MobileDrawer";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER, EMAIL } from "@/lib/site-config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/70 bg-white/95 shadow-md backdrop-blur-sm"
          : "border-b border-slate-200/70 bg-white"
      }`}
    >
      {/* Top Info Bar */}
      <div className="hidden bg-[#071B17] py-2 text-[0.68rem] uppercase tracking-[0.16em] text-emerald-50/70 md:block">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex gap-6">
            <a href={`tel:${PHONE_INTL}`} className="flex items-center gap-2 transition hover:text-amber-300">
              <Phone className="h-3 w-3" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition hover:text-amber-300">
              <Mail className="h-3 w-3" />
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>211A Dunstable Road, Luton, LU1 1DD</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex shrink-0 items-center">
          <img src="/logo.png" alt="Sunrise Travels" className="h-14 w-auto object-contain md:h-16" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-[0.76rem] font-semibold uppercase tracking-[0.13em] text-slate-700 lg:flex">
          <Link href="/flights" className="transition-colors hover:text-accent-600">Flights</Link>
          <Link href="/hajj-umrah" className="transition-colors hover:text-accent-600">Hajj &amp; Umrah</Link>
          <Link href="/nadra-assistance" className="transition-colors hover:text-accent-600">NADRA</Link>
          <Link href="/visa-assistance" className="transition-colors hover:text-accent-600">Visa</Link>
          <Link href="/passport-assistance" className="transition-colors hover:text-accent-600">Passport</Link>
          <Link
            href="/appointments"
            className="rounded-full bg-accent px-5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-accent/85"
          >
            Book Appt
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" className="border-primary/25 font-semibold text-primary hover:bg-primary/5">
            <a href={`tel:${PHONE_INTL}`}>
              <Phone className="mr-2 h-4 w-4" />
              {PHONE}
            </a>
          </Button>
          <Button asChild className="bg-[#25D366] font-semibold text-white shadow-sm hover:bg-[#20bd5a]">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="hidden bg-[#25D366] text-white hover:bg-[#20bd5a] sm:flex">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
