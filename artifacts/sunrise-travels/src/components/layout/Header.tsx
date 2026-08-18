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
        isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-white border-b"
      }`}
    >
      {/* Top Info Bar */}
      <div className="hidden md:block bg-slate-900 text-slate-200 text-xs py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex gap-6">
            <a href={`tel:${PHONE_INTL}`} className="flex items-center gap-2 hover:text-white transition">
              <Phone className="h-3 w-3" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition">
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
        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="Sunrise Travels" className="h-14 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-700">
          <Link href="/flights" className="hover:text-primary transition-colors">Flights</Link>
          <Link href="/hajj-umrah" className="hover:text-primary transition-colors">Hajj &amp; Umrah</Link>
          <Link href="/nadra-assistance" className="hover:text-primary transition-colors">NADRA</Link>
          <Link href="/pakistani-visa-assistance" className="hover:text-primary transition-colors">Visa</Link>
          <Link href="/passport-assistance" className="hover:text-primary transition-colors">Passport</Link>
          <Link href="/appointments" className="bg-accent hover:bg-accent/90 text-white px-4 py-1.5 rounded-full font-semibold text-sm transition-colors">Book Appt</Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold">
            <a href={`tel:${PHONE_INTL}`}>
              <Phone className="mr-2 h-4 w-4" />
              {PHONE}
            </a>
          </Button>
          <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold shadow-sm">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white hidden sm:flex">
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
