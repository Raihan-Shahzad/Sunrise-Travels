import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";

export function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2 space-y-2 px-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Home</Link>
              <Link href="/flights" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Flights</Link>
              <Link href="/hajj-umrah" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Hajj &amp; Umrah</Link>
              <Link href="/nadra-assistance" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">NADRA</Link>
              <Link href="/pakistani-visa-assistance" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Visa</Link>
              <Link href="/passport-assistance" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Passport</Link>
              <Link href="/appointments" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-semibold text-accent-600">📅 Book Appointment</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">About Us</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Blog</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-2 py-3 text-base font-medium">Contact</Link>
            </div>

            <div className="mt-8 px-4 flex flex-col gap-3">
              <Button asChild className="w-full bg-primary hover:bg-primary-600 h-12 text-lg">
                <a href={`tel:${PHONE_INTL}`}>
                  <Phone className="mr-2 h-5 w-5" /> Call Us: {PHONE}
                </a>
              </Button>
              <Button asChild className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white h-12 text-lg">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
