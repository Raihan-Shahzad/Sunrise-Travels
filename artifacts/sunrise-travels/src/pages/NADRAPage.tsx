import { AlertTriangle, CheckCircle2, FileText, Users, Phone, MessageCircle } from "lucide-react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";
import PageHero from "@/components/PageHero";

const ASSET_BASE = import.meta.env.BASE_URL;

const services = [
  {
    title: "NICOP Applications",
    desc: "Assistance with new applications, renewals, lost cards, or modifications for the National Identity Card for Overseas Pakistanis.",
    icon: FileText,
  },
  {
    title: "POC Applications",
    desc: "Guidance for foreign nationals of Pakistani origin applying for the Pakistan Origin Card.",
    icon: Users,
  },
  {
    title: "FRC (Family Registration)",
    desc: "Support in obtaining your Family Registration Certificate by birth or marriage.",
    icon: CheckCircle2,
  },
];

const documents = [
  "Valid passport",
  "Existing or expired CNIC / NICOP (if applicable)",
  "Passport-sized photograph (white background)",
  "Proof of relationship for family members (e.g. marriage / birth certificate)",
  "Proof of UK address (utility bill or bank statement)",
];

export default function NADRAPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      <PageHero
        eyebrow="NADRA Assistance"
        title="NADRA Application Assistance"
        subtitle="Skip the confusion and hassle. We provide expert guidance and document preparation assistance for all your NADRA needs."
        image={`${ASSET_BASE}images/pakistan-flag.jpg`}
      />

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg shadow-sm">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Important Notice</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Sunrise Travels does <strong>not</strong> process NADRA applications on your behalf. We provide guidance, consultation, and document preparation assistance only.
                </p>
              </div>
            </div>
          </div>

          {/* What we help with */}
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">How We Can Help</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base mb-2 text-slate-900">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What to bring */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-heading text-2xl font-bold mb-5 text-slate-900">What to Bring</h2>
            <ul className="space-y-3">
              {documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
              Requirements vary by case type — call us before your visit so we can confirm exactly what you need to bring.
            </p>
          </div>

          {/* Book CTA */}
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <h2 className="font-heading text-2xl font-bold mb-2">Ready to Book an Appointment?</h2>
            <p className="text-primary-100 mb-7 text-sm">
              Give us a call or send us a WhatsApp message and we'll get you booked in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_INTL}`}
                className="flex items-center justify-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-slate-100 transition-colors shadow"
              >
                <Phone className="w-5 h-5" /> Call Us — {PHONE}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp to Book
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
