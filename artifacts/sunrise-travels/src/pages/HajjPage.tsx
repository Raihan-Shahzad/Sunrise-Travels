import { Building2, Bus, FileText, MessageCircle, Plane } from "lucide-react";
import { Link } from "wouter";

import HajjNoticeSection from "@/components/HajjNoticeSection";
import { WHATSAPP_NUMBER } from "@/lib/site-config";
import { getNextHajj } from "@/lib/hijri";

const ASSET_BASE = import.meta.env.BASE_URL;

const packageDetails = [
  {
    icon: Plane,
    title: "Flights",
    description: "Return flight arrangements as part of your Hajj package.",
  },
  {
    icon: Building2,
    title: "Accommodation",
    description: "Accommodation near the Haram, planned around your journey.",
  },
  {
    icon: Bus,
    title: "Ground transport",
    description: "Transport coordinated for the different stages of your trip.",
  },
  {
    icon: FileText,
    title: "Visa processing",
    description: "Support with the Hajj visa process and required documents.",
  },
];

export default function HajjPage() {
  const hajj = getNextHajj();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative flex min-h-[420px] items-center overflow-hidden bg-[#0D2B1D]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${ASSET_BASE}images/mount-arafat.jpg')` }}
          role="img"
          aria-label="Pilgrims at Mount Arafat"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B17]/90 via-[#071B17]/70 to-[#071B17]/30" />
        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Hajj {hajj.gregorianYear} · {hajj.hijriYear}H
          </p>
          <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
            Hajj {hajj.gregorianYear} packages
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-50/90">
            Prepare for your pilgrimage with experienced support for flights, accommodation, transport, and visa arrangements.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#hajj-support"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-7 py-3.5 font-bold text-[#0D2B1D] transition-colors hover:bg-amber-400"
            >
              Explore Hajj support
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              WhatsApp our team
            </a>
          </div>
        </div>
      </section>

      <HajjNoticeSection />

      <section id="hajj-support" className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Hajj {hajj.gregorianYear}
          </p>
          <h2 className="font-heading text-3xl font-bold text-slate-900 md:text-4xl">
            Journey arrangements, handled together
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Our team can explain the package arrangements and guide you through the next steps in person at our Luton office.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packageDetails.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Contact Us
          </Link>
          <Link
            href="/umrah"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary"
          >
            Explore Umrah packages
          </Link>
        </div>
      </section>
    </div>
  );
}
