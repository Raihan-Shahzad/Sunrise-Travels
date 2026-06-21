import { defaultMetadata } from "@/app/(components)/seo/Meta";
import PassportForm from "../components/ConversionForms/PassportForm";
import { AlertTriangle, CheckCircle2, Ticket } from "lucide-react";

export const metadata = {
  ...defaultMetadata,
  title: "Pakistani Passport Assistance | Sunrise Travels",
  description: "Consultation and document preparation assistance for Pakistani Passport renewals, new applications, and lost passport replacements.",
};

export default function PassportPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Passport Assistance
          </h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Expert guidance for Pakistani Machine Readable Passports (MRP) renewals and new applications.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        {/* IMPORTANT DISCLAIMER - Legal Requirement */}
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
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">How We Assist You</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">1</div>
                  <span><strong>Document Review:</strong> We thoroughly check your existing documents (CNIC, old passport, etc.) to ensure they meet consulate requirements.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">2</div>
                  <span><strong>Application Preparation:</strong> Guidance on completing the necessary forms accurately to avoid rejections.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">3</div>
                  <span><strong>Appointment Booking:</strong> Assistance with scheduling your visit to the relevant Pakistani consulate or High Commission.</span>
                </li>
              </ul>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-4">
                <Ticket className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Passport Categories</h4>
                  <p className="text-sm text-slate-600">We assist with Ordinary (36, 72, or 100 pages), Official, and Diplomatic passports across Normal, Urgent, and Fast Track processing categories.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28">
              <PassportForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
