import { useState } from "react";
import { useLocation } from "wouter";
import { CalendarCheck, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = "nadra" | "visa" | "passport";

const SERVICE_META: Record<Service, { label: string; color: string; bg: string; border: string; activeBg: string; activeBorder: string; activeText: string }> = {
  nadra: {
    label: "NADRA Assistance",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-100",
    activeBg: "bg-blue-600",
    activeBorder: "border-blue-600",
    activeText: "text-white",
  },
  visa: {
    label: "Pakistani Visa Assistance",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    activeBg: "bg-emerald-600",
    activeBorder: "border-emerald-600",
    activeText: "text-white",
  },
  passport: {
    label: "Passport Assistance",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-100",
    activeBg: "bg-violet-600",
    activeBorder: "border-violet-600",
    activeText: "text-white",
  },
};

const SUBTYPES: Record<Service, string[]> = {
  nadra: [
    "New NICOP / NICOP Renewal",
    "Lost / Damaged NICOP Replacement",
    "FRC Certificate",
    "POC Card",
    "Other NADRA Query",
  ],
  visa: [
    "New Visa / Renewal",
    "Visa Extension",
    "Other Visa Queries",
  ],
  passport: [
    "New Passport / Passport Renewal",
    "Lost / Damaged Passport Replacement",
    "Other Passport Queries",
  ],
};

interface Props {
  service: Service;
}

export default function AppointmentBookingCard({ service }: Props) {
  const meta = SERVICE_META[service];
  const subtypes = SUBTYPES[service];
  const [selected, setSelected] = useState<string | null>(null);
  const [, navigate] = useLocation();

  function handleBook() {
    const params = new URLSearchParams({ service });
    if (selected) params.set("sub", selected);
    navigate(`/appointments?${params.toString()}`);
  }

  return (
    <div className={cn("rounded-2xl border-2 overflow-hidden shadow-sm", meta.border)}>
      {/* Header */}
      <div className={cn("px-6 py-5", meta.bg)}>
        <div className="flex items-center gap-3 mb-1">
          <CalendarCheck className={cn("w-6 h-6", meta.color)} />
          <h3 className={cn("font-heading font-bold text-lg", meta.color)}>Book a Free Consultation</h3>
        </div>
        <p className="text-slate-600 text-sm">
          Meet our specialists in-office at our Luton branch.
        </p>
      </div>

      {/* Sub-service picker */}
      <div className="px-6 py-5 bg-white space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          What do you need help with?
        </p>
        <div className="space-y-2">
          {subtypes.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelected(selected === sub ? null : sub)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-between gap-3",
                selected === sub
                  ? cn(meta.activeBg, meta.activeBorder, meta.activeText)
                  : "border-slate-200 text-slate-700 bg-slate-50 hover:border-slate-400 hover:bg-white"
              )}
            >
              <span>{sub}</span>
              {selected === sub && <Check className="w-4 h-4 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 bg-white">
        <button
          onClick={handleBook}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-sm",
            service === "nadra" && "bg-blue-600 hover:bg-blue-700",
            service === "visa" && "bg-emerald-600 hover:bg-emerald-700",
            service === "passport" && "bg-violet-600 hover:bg-violet-700"
          )}
        >
          <CalendarCheck className="w-4 h-4" />
          {selected ? "Book This Appointment" : "Choose a Date & Time"}
          <ChevronRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-slate-500 text-center mt-3">
          Free · No obligation · Luton office only
        </p>
      </div>
    </div>
  );
}
