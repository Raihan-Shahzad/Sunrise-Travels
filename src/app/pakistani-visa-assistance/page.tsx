import { defaultMetadata } from "@/app/(components)/seo/Meta";
import VisaForm from "../components/ConversionForms/VisaForm";
import { AlertTriangle, CheckCircle2, Globe, FileCheck, Briefcase } from "lucide-react";

export const metadata = {
  ...defaultMetadata,
  title: "Pakistani Visa Assistance & Consultation | Sunrise Travels",
  description: "Professional visa consultation and document preparation assistance for Pakistani Tourist, Family, and Business visas.",
};

const services = [
  {
    title: "Tourist Visas",
    desc: "Guidance for short-term tourism visas, including required itineraries and accommodation proofs.",
    icon: Globe
  },
  {
    title: "Family Visit Visas",
    desc: "Assistance with spousal and family visit visas, ensuring correct sponsor documentation.",
    icon: FileCheck
  },
  {
    title: "Business Visas",
    desc: "Support for commercial travel, including invitation letter requirements and company documentation.",
    icon: Briefcase
  }
];

export default function VisaPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Pakistani Visa Assistance
          </h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Navigate the visa application process with confidence. We offer meticulous document review and expert consultation.
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
            <div>
              <h2 className="font-heading text-3xl font-bold mb-8 text-slate-900">Visa Categories</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {services.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
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
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">Standard Document Checklist</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Valid Passport (minimum 6 months validity)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Recent passport-sized photographs</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Proof of residence / Legal status in the UK</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Invitation letter or hotel booking confirmation</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="sticky top-28">
              <VisaForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
