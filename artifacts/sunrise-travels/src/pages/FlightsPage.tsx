import FlightEnquiryForm from "@/components/forms/FlightEnquiryForm";
import { CheckCircle2 } from "lucide-react";

export default function FlightsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#04120F] py-16 text-white md:py-20">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#04120F]/96 via-[#04120F]/85 to-[#04120F]/45" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_80%_20%,rgba(200,146,43,0.2),transparent_70%)]" />

        <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <span className="eyebrow mb-4 text-amber-300">Worldwide flights</span>
            <h1 className="mb-6 font-heading text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              Exclusive fares to Pakistan{" "}
              <span className="italic text-amber-300">&amp; worldwide</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-emerald-50/85">
              As a specialist travel agency, we have access to unpublished fares and special baggage allowances. Call us before you book online!
            </p>
            <ul className="space-y-3.5">
              {[
                "Up to 50kg baggage allowance (selected airlines)",
                "Flexible date changes available",
                "Special child & infant discounts",
                "Book now, pay later options"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-emerald-50/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FlightEnquiryForm />
          </div>
        </div>
      </section>

      {/* Popular Airlines */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="eyebrow mb-3 text-accent-600">Airline partners</span>
          <h2 className="mb-9 font-heading text-2xl font-semibold text-slate-900 md:text-3xl">We partner with top airlines</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-400 md:gap-x-16">
            <span className="font-heading text-xl font-semibold">Emirates</span>
            <span className="font-heading text-xl font-semibold">Qatar Airways</span>
            <span className="font-heading text-xl font-semibold">PIA</span>
            <span className="font-heading text-xl font-semibold">British Airways</span>
            <span className="font-heading text-xl font-semibold">Saudi Airlines</span>
            <span className="font-heading text-xl font-semibold">Etihad</span>
          </div>
        </div>
      </section>
    </div>
  );
}
