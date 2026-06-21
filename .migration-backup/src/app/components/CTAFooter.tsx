"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function CTAFooter() {
  return (
    <section className="bg-gradient-to-br from-accent to-accent-600 text-white py-20 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
          Ready to Plan Your Journey?
        </h2>
        <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10">
          Speak directly with one of our travel specialists. We're here to answer your questions and find the best options for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${process.env.NEXT_PUBLIC_PHONE_INTL}`}
            className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <Phone className="w-5 h-5" />
            Call: {process.env.NEXT_PUBLIC_PHONE}
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl border border-[#25D366] w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}