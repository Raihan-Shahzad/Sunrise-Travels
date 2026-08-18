import { AlertTriangle, CheckCircle2, Globe, FileCheck, Briefcase, Phone, MessageCircle } from "lucide-react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";

const services = [
  {
    title: "Tourist Visas",
    desc: "Guidance for short-term tourism visas, including required itineraries and accommodation proofs.",
    icon: Globe,
  },
  {
    title: "Family Visit Visas",
    desc: "Assistance with spousal and family visit visas, ensuring correct sponsor documentation.",
    icon: FileCheck,
  },
  {
    title: "Business Visas",
    desc: "Support for commercial travel, including invitation letter requirements and company documentation.",
    icon: Briefcase,
  },
];

const documents = [
  "Valid Passport (minimum 6 months validity beyond travel dates)",
  "Recent passport-sized photographs (white background)",
  "Proof of residence / legal status in the UK",
  "Invitation letter or hotel booking confirmation",
  "Bank statements from the last 3 months",
  "Return flight booking (or itinerary)",
];

export default function VisaPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Pakistani Visa Assistance</h1>
          <p className="text-xl text-primary-100 leading-relaxed">
            Navigate the visa application process with confidence. We offer document review and expert consultation for all visa types.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg shadow-sm">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Important Notice</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Sunrise Travels does <strong>not</strong> process visa applications on your behalf. We provide guidance, consultation, and document preparation assistance only.
                </p>
              </div>
            </div>
          </div>

          {/* Visa types */}
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">Visa Categories We Cover</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
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
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
              Requirements vary by visa type and individual circumstances — call us before your visit to confirm exactly what to bring.
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
