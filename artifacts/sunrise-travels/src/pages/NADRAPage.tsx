import NADRAForm from "@/components/forms/NADRAForm";
import { AlertTriangle, CheckCircle2, FileText, Clock, Users, CalendarCheck } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    title: "NICOP Applications",
    desc: "Assistance with new applications, renewals, lost cards, or modifications for the National Identity Card for Overseas Pakistanis.",
    icon: FileText
  },
  {
    title: "POC Applications",
    desc: "Guidance for foreign nationals of Pakistani origin applying for the Pakistan Origin Card.",
    icon: Users
  },
  {
    title: "FRC (Family Registration)",
    desc: "Support in obtaining your Family Registration Certificate by birth or marriage.",
    icon: CheckCircle2
  }
];

export default function NADRAPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            NADRA Application Assistance
          </h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Skip the confusion and hassle. We provide expert consultation and document preparation assistance for all your NADRA needs.
          </p>
        </div>
      </section>

      <section className="py-8 bg-accent/10 border-b border-accent/20">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-8 h-8 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-slate-900">Need in-person help?</p>
              <p className="text-sm text-slate-600">Book a free consultation at our Luton office.</p>
            </div>
          </div>
          <Link href="/appointments?service=nadra" className="shrink-0 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Book an Appointment
          </Link>
        </div>
      </section>
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-12 shadow-sm">
          <div className="flex gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Legal Disclaimer</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Sunrise Travels DOES NOT issue, process, approve, renew, or submit government applications on your behalf. We are an independent travel agency. We ONLY provide Guidance, Consultation, and Document Preparation Assistance. All final decisions rest solely with the relevant government authorities.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-8 text-slate-900">How We Can Help</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {services.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-slate-900">{s.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">General Required Documents</h2>
              <ul className="space-y-4">
                {[
                  "Valid Pakistani or British Passport",
                  "Existing or expired CNIC/NICOP (if applicable)",
                  "Passport size photograph (white background)",
                  "Proof of relationship for family members"
                ].map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
                <Clock className="w-4 h-4 inline mr-2" />
                Note: Requirements vary strictly by case type. Please submit an enquiry for personalized guidance.
              </p>
            </div>
          </div>

          <div>
            <div className="sticky top-28">
              <NADRAForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
