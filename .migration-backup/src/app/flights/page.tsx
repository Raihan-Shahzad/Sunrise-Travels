import { defaultMetadata } from "@/app/(components)/seo/Meta";
import FlightEnquiryForm from "../components/ConversionForms/FlightEnquiryForm";
import { Plane, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  ...defaultMetadata,
  title: "Worldwide Flights & Pakistan Specialist | Sunrise Travels",
  description: "Book cheap flights to Pakistan, Dubai, Saudi Arabia and worldwide. Best fares guaranteed with Emirates, Qatar, PIA, and British Airways.",
};

export default function FlightsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-slate-900 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Exclusive Flight Fares to Pakistan & Worldwide
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              As a specialist travel agency, we have access to unpublished fares and special baggage allowances. Call us before you book online!
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Up to 50kg baggage allowance (selected airlines)",
                "Flexible date changes available",
                "Special child & infant discounts",
                "Book now, pay later options"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
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
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-8 text-slate-800">We Partner With Top Airlines</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Logos would go here, text placeholders for now */}
            <span className="text-xl font-bold">Emirates</span>
            <span className="text-xl font-bold">Qatar Airways</span>
            <span className="text-xl font-bold">PIA</span>
            <span className="text-xl font-bold">British Airways</span>
            <span className="text-xl font-bold">Saudi Airlines</span>
            <span className="text-xl font-bold">Etihad</span>
          </div>
        </div>
      </section>
    </div>
  );
}