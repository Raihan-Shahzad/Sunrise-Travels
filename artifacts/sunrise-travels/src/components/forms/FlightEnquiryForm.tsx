import { useState, useRef, useEffect } from "react";
import {
  Plane, PlaneLanding, PlaneTakeoff, Users, CalendarDays,
  User, Mail, Phone, ArrowRight, CheckCircle2, AlertCircle,
  Loader2, ChevronDown, Plus, Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TripType = "return" | "oneway";
type FormState = "idle" | "loading" | "success";

interface Pax { adults: number; children: number; infants: number }
interface Fields {
  from: string; to: string; depart: string; returnDate: string;
  name: string; email: string; phone: string;
}
interface Errors extends Partial<Record<keyof Fields | "passengers", string>> {}

const EMPTY_FIELDS: Fields = { from: "", to: "", depart: "", returnDate: "", name: "", email: "", phone: "" };
const EMPTY_PAX: Pax = { adults: 1, children: 0, infants: 0 };

function validate(fields: Fields, tripType: TripType, pax: Pax): Errors {
  const e: Errors = {};
  if (!fields.from.trim()) e.from = "Departure city or airport required";
  if (!fields.to.trim()) e.to = "Destination required";
  if (!fields.depart) {
    e.depart = "Departure date required";
  } else if (new Date(fields.depart) < new Date(new Date().toDateString())) {
    e.depart = "Must be today or later";
  }
  if (tripType === "return") {
    if (!fields.returnDate) e.returnDate = "Return date required";
    else if (fields.depart && new Date(fields.returnDate) <= new Date(fields.depart))
      e.returnDate = "Must be after departure";
  }
  if (pax.adults + pax.children + pax.infants < 1) e.passengers = "Add at least 1 passenger";
  if (pax.infants > pax.adults) e.passengers = "Infants cannot exceed adults";
  if (!fields.name.trim()) e.name = "Full name required";
  if (!fields.email.trim()) e.email = "Email required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email";
  if (!fields.phone.trim()) e.phone = "Phone required";
  else if (!/^[\d\s+\-()\\.]{7,15}$/.test(fields.phone.trim())) e.phone = "Enter a valid number";
  return e;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{children}</label>;
}
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  );
}
function Field({ icon: Icon, placeholder, type = "text", value, onChange, error, ...rest }: {
  icon: React.ElementType; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; error?: string; min?: string; onBlur?: () => void;
}) {
  return (
    <div>
      <div className={cn(
        "flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors",
        error ? "border-red-400" : "border-slate-200 focus-within:border-primary focus-within:bg-white"
      )}>
        <Icon className={cn("w-4 h-4 shrink-0", error ? "text-red-400" : "text-slate-400")} />
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none min-w-0"
          {...rest}
        />
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function PaxRow({ label, sub, value, min, max, onChange }: {
  label: string; sub: string; value: number; min: number; max: number; onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
            value <= min
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          )}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-5 text-center text-sm font-bold text-slate-800">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
            value >= max
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          )}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function PassengerPicker({ pax, onChange, error }: {
  pax: Pax; onChange: (p: Pax) => void; error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const total = pax.adults + pax.children + pax.infants;
  const parts = [
    `${pax.adults} Adult${pax.adults !== 1 ? "s" : ""}`,
    pax.children > 0 ? `${pax.children} Child${pax.children !== 1 ? "ren" : ""}` : null,
    pax.infants > 0 ? `${pax.infants} Infant${pax.infants !== 1 ? "s" : ""}` : null,
  ].filter(Boolean).join(", ");

  const maxTotal = 9;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors text-left",
          error ? "border-red-400" : open ? "border-primary bg-white" : "border-slate-200 hover:border-slate-300"
        )}
      >
        <Users className={cn("w-4 h-4 shrink-0", error ? "text-red-400" : "text-slate-400")} />
        <span className="flex-1 text-sm text-slate-800">{parts}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>
      <FieldError msg={error} />

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4">
          <PaxRow
            label="Adults" sub="Age 12+"
            value={pax.adults} min={1} max={maxTotal - pax.children - pax.infants}
            onChange={(n) => onChange({ ...pax, adults: n })}
          />
          <PaxRow
            label="Children" sub="Age 2–11"
            value={pax.children} min={0} max={maxTotal - pax.adults - pax.infants}
            onChange={(n) => onChange({ ...pax, children: n })}
          />
          <PaxRow
            label="Infants" sub="Under 2 · lap"
            value={pax.infants} min={0} max={Math.min(pax.adults, maxTotal - pax.adults - pax.children)}
            onChange={(n) => onChange({ ...pax, infants: n })}
          />
          <p className="text-xs text-slate-400 mt-2">Max 9 passengers · Infants cannot exceed adults</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Done · {total} {total === 1 ? "Passenger" : "Passengers"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function FlightEnquiryForm() {
  const [tripType, setTripType] = useState<TripType>("return");
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [pax, setPax] = useState<Pax>(EMPTY_PAX);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Set<keyof Fields | "passengers">>(new Set());
  const [formState, setFormState] = useState<FormState>("idle");

  const today = new Date().toISOString().split("T")[0];

  function setField(k: keyof Fields, v: string) {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched.has(k)) setErrors(validate(next, tripType, pax));
  }

  function touchField(k: keyof Fields) {
    setTouched((prev) => new Set([...prev, k]));
    setErrors(validate(fields, tripType, pax));
  }

  function handlePaxChange(p: Pax) {
    setPax(p);
    if (touched.has("passengers")) setErrors(validate(fields, tripType, p));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allKeys = [...Object.keys(EMPTY_FIELDS), "passengers"] as (keyof Fields | "passengers")[];
    setTouched(new Set(allKeys));
    const errs = validate(fields, tripType, pax);
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
          Thanks, <strong>{fields.name.split(" ")[0]}</strong>! We'll contact you within 2 hours on <strong>{fields.email}</strong> or by calling <strong>{fields.phone}</strong>.
        </p>
        <button
          onClick={() => { setFormState("idle"); setFields(EMPTY_FIELDS); setPax(EMPTY_PAX); setTouched(new Set()); setErrors({}); }}
          className="text-sm text-primary font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-primary px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <Plane className="w-5 h-5 text-white" />
          <h3 className="font-heading text-lg font-bold text-white">Request a Flight Quote</h3>
        </div>
        <p className="text-primary-100 text-sm">Free · No obligation · Response within 2 hours</p>
      </div>

      <div className="px-6 pt-5 pb-2">
        <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
          {(["return", "oneway"] as TripType[]).map((t) => (
            <button
              key={t} type="button"
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>From</FieldLabel>
            <Field icon={PlaneTakeoff} placeholder="e.g. London LHR" value={fields.from} onChange={(v) => setField("from", v)} onBlur={() => touchField("from")} error={errors.from} />
          </div>
          <div>
            <FieldLabel>To</FieldLabel>
            <Field icon={PlaneLanding} placeholder="e.g. Islamabad ISB" value={fields.to} onChange={(v) => setField("to", v)} onBlur={() => touchField("to")} error={errors.to} />
          </div>
        </div>

        <div className={cn("grid gap-3", tripType === "return" ? "grid-cols-2" : "grid-cols-1")}>
          <div>
            <FieldLabel>Departure Date</FieldLabel>
            <Field icon={CalendarDays} placeholder="Depart" type="date" min={today} value={fields.depart} onChange={(v) => setField("depart", v)} onBlur={() => touchField("depart")} error={errors.depart} />
          </div>
          {tripType === "return" && (
            <div>
              <FieldLabel>Return Date</FieldLabel>
              <Field icon={CalendarDays} placeholder="Return" type="date" min={fields.depart || today} value={fields.returnDate} onChange={(v) => setField("returnDate", v)} onBlur={() => touchField("returnDate")} error={errors.returnDate} />
            </div>
          )}
        </div>

        <div>
          <FieldLabel>Passengers</FieldLabel>
          <PassengerPicker
            pax={pax}
            onChange={handlePaxChange}
            error={touched.has("passengers") ? errors.passengers : undefined}
          />
        </div>

        <div className="border-t border-slate-100 pt-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Your Details</p>
        </div>

        <div>
          <FieldLabel>Full Name</FieldLabel>
          <Field icon={User} placeholder="Your full name" value={fields.name} onChange={(v) => setField("name", v)} onBlur={() => touchField("name")} error={errors.name} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Email</FieldLabel>
            <Field icon={Mail} placeholder="you@example.com" type="email" value={fields.email} onChange={(v) => setField("email", v)} onBlur={() => touchField("email")} error={errors.email} />
          </div>
          <div>
            <FieldLabel>Phone</FieldLabel>
            <Field icon={Phone} placeholder="+44 7700 000000" type="tel" value={fields.phone} onChange={(v) => setField("phone", v)} onBlur={() => touchField("phone")} error={errors.phone} />
          </div>
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
        >
          {formState === "loading"
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            : <>Get Best Price <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  );
}
