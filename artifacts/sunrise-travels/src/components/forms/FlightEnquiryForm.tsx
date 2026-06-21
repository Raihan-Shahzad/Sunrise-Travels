import { useState } from "react";
import { Plane, PlaneLanding, PlaneTakeoff, Users, CalendarDays, User, Mail, Phone, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TripType = "return" | "oneway";
type FormState = "idle" | "loading" | "success" | "error";

interface Fields {
  from: string;
  to: string;
  depart: string;
  returnDate: string;
  passengers: string;
  name: string;
  email: string;
  phone: string;
}

interface Errors extends Partial<Record<keyof Fields, string>> {}

function validate(fields: Fields, tripType: TripType): Errors {
  const errors: Errors = {};
  if (!fields.from.trim()) errors.from = "Departure city or airport required";
  if (!fields.to.trim()) errors.to = "Destination city or airport required";
  if (!fields.depart) {
    errors.depart = "Departure date required";
  } else if (new Date(fields.depart) < new Date(new Date().toDateString())) {
    errors.depart = "Departure date must be today or later";
  }
  if (tripType === "return") {
    if (!fields.returnDate) {
      errors.returnDate = "Return date required for a return trip";
    } else if (fields.depart && new Date(fields.returnDate) <= new Date(fields.depart)) {
      errors.returnDate = "Return date must be after departure";
    }
  }
  const pax = parseInt(fields.passengers);
  if (!fields.passengers || isNaN(pax) || pax < 1 || pax > 9) {
    errors.passengers = "Enter 1–9 passengers";
  }
  if (!fields.name.trim()) errors.name = "Full name required";
  if (!fields.email.trim()) {
    errors.email = "Email address required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Phone number required";
  } else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(fields.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }
  return errors;
}

const EMPTY: Fields = { from: "", to: "", depart: "", returnDate: "", passengers: "1", name: "", email: "", phone: "" };

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{children}</label>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  );
}

function Field({
  icon: Icon, placeholder, type = "text", value, onChange, error, ...rest
}: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  min?: string;
}) {
  return (
    <div>
      <div className={cn(
        "flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors",
        error ? "border-red-400 focus-within:border-red-500" : "border-slate-200 focus-within:border-primary focus-within:bg-white"
      )}>
        <Icon className={cn("w-4 h-4 shrink-0", error ? "text-red-400" : "text-slate-400")} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none min-w-0"
          {...rest}
        />
      </div>
      <FieldError msg={error} />
    </div>
  );
}

export default function FlightEnquiryForm() {
  const [tripType, setTripType] = useState<TripType>("return");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Set<keyof Fields>>(new Set());
  const [formState, setFormState] = useState<FormState>("idle");

  const today = new Date().toISOString().split("T")[0];

  function set(k: keyof Fields, v: string) {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched.has(k)) {
      setErrors((prev) => ({ ...prev, ...validate(next, tripType) }));
    }
  }

  function touch(k: keyof Fields) {
    setTouched((prev) => new Set([...prev, k]));
    setErrors((prev) => ({ ...prev, ...validate(fields, tripType) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = new Set(Object.keys(EMPTY) as (keyof Fields)[]);
    setTouched(allTouched);
    const errs = validate(fields, tripType);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("loading");
    setTimeout(() => setFormState("success"), 1200);
  }

  if (formState === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Quote Request Sent!</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Thanks, <strong>{fields.name.split(" ")[0]}</strong>! We'll get back to you within 2 hours on <strong>{fields.email}</strong> or call you on <strong>{fields.phone}</strong>.
        </p>
        <button
          onClick={() => { setFormState("idle"); setFields(EMPTY); setTouched(new Set()); setErrors({}); }}
          className="text-sm text-primary font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <Plane className="w-5 h-5 text-white" />
          <h3 className="font-heading text-lg font-bold text-white">Request a Flight Quote</h3>
        </div>
        <p className="text-primary-100 text-sm">Free · No obligation · Response within 2 hours</p>
      </div>

      {/* Trip type toggle */}
      <div className="px-6 pt-5 pb-2">
        <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
          {(["return", "oneway"] as TripType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTripType(t); setErrors({}); }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                tripType === t ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t === "return" ? "↩ Return" : "→ One-way"}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-4 space-y-4">
        {/* Route */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>From</FieldLabel>
            <Field icon={PlaneTakeoff} placeholder="e.g. London LHR" value={fields.from} onChange={(v) => set("from", v)} onBlur={() => touch("from")} error={errors.from} />
          </div>
          <div>
            <FieldLabel>To</FieldLabel>
            <Field icon={PlaneLanding} placeholder="e.g. Islamabad ISB" value={fields.to} onChange={(v) => set("to", v)} onBlur={() => touch("to")} error={errors.to} />
          </div>
        </div>

        {/* Dates */}
        <div className={cn("grid gap-3", tripType === "return" ? "grid-cols-2" : "grid-cols-1")}>
          <div>
            <FieldLabel>Departure Date</FieldLabel>
            <Field icon={CalendarDays} placeholder="Depart" type="date" min={today} value={fields.depart} onChange={(v) => set("depart", v)} onBlur={() => touch("depart")} error={errors.depart} />
          </div>
          {tripType === "return" && (
            <div>
              <FieldLabel>Return Date</FieldLabel>
              <Field icon={CalendarDays} placeholder="Return" type="date" min={fields.depart || today} value={fields.returnDate} onChange={(v) => set("returnDate", v)} onBlur={() => touch("returnDate")} error={errors.returnDate} />
            </div>
          )}
        </div>

        {/* Passengers */}
        <div>
          <FieldLabel>Passengers</FieldLabel>
          <div className={cn(
            "flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors",
            errors.passengers ? "border-red-400" : "border-slate-200 focus-within:border-primary focus-within:bg-white"
          )}>
            <Users className={cn("w-4 h-4 shrink-0", errors.passengers ? "text-red-400" : "text-slate-400")} />
            <select
              value={fields.passengers}
              onChange={(e) => set("passengers", e.target.value)}
              onBlur={() => touch("passengers")}
              className="flex-1 bg-transparent text-sm text-slate-800 outline-none cursor-pointer"
            >
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
              ))}
            </select>
          </div>
          <FieldError msg={errors.passengers} />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Your Details</p>
        </div>

        {/* Contact */}
        <div>
          <FieldLabel>Full Name</FieldLabel>
          <Field icon={User} placeholder="Your full name" value={fields.name} onChange={(v) => set("name", v)} onBlur={() => touch("name")} error={errors.name} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Email</FieldLabel>
            <Field icon={Mail} placeholder="you@example.com" type="email" value={fields.email} onChange={(v) => set("email", v)} onBlur={() => touch("email")} error={errors.email} />
          </div>
          <div>
            <FieldLabel>Phone</FieldLabel>
            <Field icon={Phone} placeholder="+44 7700 000000" type="tel" value={fields.phone} onChange={(v) => set("phone", v)} onBlur={() => touch("phone")} error={errors.phone} />
          </div>
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
        >
          {formState === "loading" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
          ) : (
            <>Get Best Price <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </div>
  );
}
