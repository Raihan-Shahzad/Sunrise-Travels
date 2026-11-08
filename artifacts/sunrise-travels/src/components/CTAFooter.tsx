import { Phone, MessageCircle } from "lucide-react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";

const ASSET_BASE = import.meta.env.BASE_URL;

export default function CTAFooter() {
  return (
    <section className="relative isolate overflow-hidden bg-[#04120F] py-24 text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${ASSET_BASE}images/makkah-kaaba.jpg')` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#04120F]/95 via-[#04120F]/85 to-[#04120F]/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(200,146,43,0.25),transparent_70%)]" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <span className="eyebrow mb-4 text-amber-300">Start planning</span>
        <h2 className="mx-auto mb-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
          Ready to plan your journey?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-emerald-50/80 md:text-xl">
          Speak directly with one of our travel specialists. We&apos;re here to answer your
          questions and find the best options for you.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${PHONE_INTL}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-primary shadow-lg transition-colors hover:bg-accent/85 sm:w-auto"
          >
            <Phone className="h-5 w-5" />
            Call: {PHONE}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
