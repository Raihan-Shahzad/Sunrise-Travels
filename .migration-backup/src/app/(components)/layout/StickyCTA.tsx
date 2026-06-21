"use client";

import { Phone, MessageCircle } from "lucide-react";

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full items-center bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <a
        href={`tel:${process.env.NEXT_PUBLIC_PHONE_INTL}`}
        className="flex flex-1 items-center justify-center gap-2 border-r border-slate-200 h-full text-primary font-semibold hover:bg-primary/5 transition-colors"
      >
        <Phone className="h-5 w-5" />
        <span>Call Now</span>
      </a>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 h-full text-[#25D366] font-semibold hover:bg-[#25D366]/5 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}