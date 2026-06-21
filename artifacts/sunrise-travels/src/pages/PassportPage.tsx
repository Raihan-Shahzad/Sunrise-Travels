import AppointmentBookingCard from "@/components/AppointmentBookingCard";
import { AlertTriangle, CheckCircle2, Ticket } from "lucide-react";

export default function PassportPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Passport Assistance</h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Expert guidance for Pakistani Machine Readable Passports (MRP) renewals and new applications.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-12 shadow-sm">
          <div className="flex gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Legal Disclaimer</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Sunrise Travels DOES NOT issue, process, approve, renew, or submit government applications on your behalf. We ONLY provide Guidance, Consultation, and Document Preparation Assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">How We Assist You</h2>
              <ul className="space-y-4 mb-8">
                {[
                  { num: 1, title: "Document Review", desc: "We thoroughly check your existing documents (CNIC, old passport, etc.) to ensure they meet consulate requirements." },
                  { num: 2, title: "Application Preparation", desc: "Guidance on completing the necessary forms accurately to avoid rejections." },
                  { num: 3, title: "Consulate Appointment", desc: "Assistance with scheduling your visit to the relevant Pakistani consulate or High Commission." }
                ].map((step) => (
                  <li key={step.num} className="flex items-start gap-3 text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5 font-bold text-sm">{step.num}</div>
                    <span><strong className="text-slate-900">{step.title}:</strong> {step.desc}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-4">
                <Ticket className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Passport Categories</h4>
                  <p className="text-sm text-slate-600">We assist with Ordinary (36, 72, or 100 pages), Official, and Diplomatic passports across Normal, Urgent, and Fast Track processing categories.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">Documents You'll Typically Need</h2>
              <ul className="space-y-4">
                {[
                  "Valid or expired Pakistani Passport",
                  "Original CNIC / NICOP",
                  "Passport-sized photographs (white background)",
                  "Proof of address (utility bill, bank statement)"
                ].map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="sticky top-28">
              <AppointmentBookingCard service="passport" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
