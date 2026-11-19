import { AlertTriangle, CheckCircle2, Ticket, Phone, MessageCircle } from "lucide-react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";
import PageHero from "@/components/PageHero";

const ASSET_BASE = import.meta.env.BASE_URL;

const steps = [
  { num: 1, title: "Document Review", desc: "We check your existing documents (CNIC, old passport, etc.) to ensure they meet consulate requirements before your visit." },
  { num: 2, title: "Application Guidance", desc: "We walk you through completing the necessary forms accurately to avoid rejections or delays." },
  { num: 3, title: "Consulate Appointment", desc: "We help you understand how to schedule your visit to the relevant Pakistani consulate or High Commission." },
];

const documents = [
  "Valid or expired Pakistani Passport",
  "Original CNIC / NICOP",
  "Passport-sized photographs (white background)",
  "Proof of UK address (utility bill or bank statement)",
  "Birth certificate (for new / first-time applicants)",
];

export default function PassportPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      <PageHero
        eyebrow="Passport Services"
        title="Passport Assistance"
        subtitle="Expert guidance for passport applications, renewals, and replacements."
        image={`${ASSET_BASE}images/passport.jpg`}
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
                  Sunrise Travels does <strong>not</strong> process passport applications on your behalf. We provide guidance, consultation, and document preparation assistance only.
                </p>
              </div>
            </div>
          </div>

          {/* How we help */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">How We Help</h2>
            <ol className="space-y-5">
              {steps.map((step) => (
                <li key={step.num} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mt-0.5">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-7 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
              <Ticket className="w-7 h-7 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Passport Types</h4>
                <p className="text-sm text-slate-600">We assist with Ordinary (36, 72, or 100-page), Official, and Diplomatic passports across Normal, Urgent, and Fast Track categories.</p>
              </div>
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
              Requirements vary by passport category and processing speed — call us before your visit to confirm exactly what you need.
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
