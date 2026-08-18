import { useState, useRef, useEffect } from "react";
import {
  Plane, PlaneLanding, PlaneTakeoff, Users, CalendarDays,
  User, Mail, Phone, ArrowRight, AlertCircle, Loader2, ChevronDown,
  Plus, Minus, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/site-config";

type TripType = "return" | "oneway" | "multicity";
type FormState = "idle" | "loading";

interface Pax { adults: number; children: number; infants: number }
interface MultiCityLeg { from: string; to: string; date: string }
interface Fields {
  from: string; to: string; depart: string; returnDate: string;
  name: string; email: string; phone: string;
}
interface Errors extends Partial<Record<keyof Fields | "passengers", string>> {
  multiCity?: Array<Partial<Record<keyof MultiCityLeg, string>>>;
}

const EMPTY_FIELDS: Fields = { from: "", to: "", depart: "", returnDate: "", name: "", email: "", phone: "" };
const EMPTY_PAX: Pax = { adults: 1, children: 0, infants: 0 };
const EMPTY_MULTI_CITY: MultiCityLeg[] = [
  { from: "", to: "", date: "" },
  { from: "", to: "", date: "" },
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email.trim());
}

function isValidUkPhone(phone: string) {
  const compact = phone.replace(/[()\s.-]/g, "");
  return /^(?:0\d{10}|\+44\d{10})$/.test(compact);
}

function validate(fields: Fields, tripType: TripType, pax: Pax, multiCityLegs: MultiCityLeg[]): Errors {
  const e: Errors = {};
  const today = new Date(new Date().toDateString());

  if (tripType === "multicity") {
    e.multiCity = multiCityLegs.map((leg, index) => {
      const legErrors: Partial<Record<keyof MultiCityLeg, string>> = {};
      if (!leg.from.trim()) legErrors.from = "Departure city or airport required";
      if (!leg.to.trim()) legErrors.to = "Destination required";
      if (!leg.date) {
        legErrors.date = "Date required";
      } else if (new Date(leg.date) < today) {
        legErrors.date = "Must be today or later";
      } else if (index > 0 && multiCityLegs[index - 1].date && new Date(leg.date) < new Date(multiCityLegs[index - 1].date)) {
        legErrors.date = "Must be on or after the previous leg";
      }
      return legErrors;
    });
    if (e.multiCity.every((leg) => Object.keys(leg).length === 0)) delete e.multiCity;
  } else {
    if (!fields.from.trim()) e.from = "Departure city or airport required";
    if (!fields.to.trim()) e.to = "Destination required";
    if (!fields.depart) {
      e.depart = "Departure date required";
    } else if (new Date(fields.depart) < today) {
      e.depart = "Must be today or later";
    }
    if (tripType === "return") {
      if (!fields.returnDate) e.returnDate = "Return date required";
      else if (fields.depart && new Date(fields.returnDate) <= new Date(fields.depart))
        e.returnDate = "Must be after departure";
    }
  }
  if (pax.adults + pax.children + pax.infants < 1) e.passengers = "Add at least 1 passenger";
  if (pax.infants > pax.adults) e.passengers = "Infants cannot exceed adults";
  if (!fields.name.trim()) e.name = "Full name required";
  if (!fields.email.trim()) e.email = "Email required";
  else if (!isValidEmail(fields.email)) e.email = "Enter a valid email address";
  if (!fields.phone.trim()) e.phone = "Phone required";
  else if (!isValidUkPhone(fields.phone)) e.phone = "Enter a valid UK number, e.g. 01582 732007";
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

function DateField({ label, value, min, error, onChange, onBlur, placeholder }: {
  label: string;
  value: string;
  min?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
}) {
  const formattedDate = value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : placeholder;

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className={cn(
        "relative flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all overflow-hidden",
        error
          ? "border-red-400 bg-red-50/40"
          : "border-slate-200 bg-slate-50 hover:border-primary/40 hover:bg-white focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10"
      )}>
        <span className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          error ? "bg-red-100 text-red-500" : "bg-primary/10 text-primary"
        )}>
          <CalendarDays className="w-4 h-4" />
        </span>
        <span className={cn(
          "flex-1 text-sm font-medium",
          value ? "text-slate-800" : "text-slate-400"
        )}>
          {formattedDate}
        </span>
        <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
        <input
          type="date"
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-label={label}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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
  const [multiCityLegs, setMultiCityLegs] = useState<MultiCityLeg[]>(EMPTY_MULTI_CITY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Set<keyof Fields | "passengers">>(new Set());
  const [formState, setFormState] = useState<FormState>("idle");

  const today = new Date().toISOString().split("T")[0];

  function setField(k: keyof Fields, v: string) {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched.has(k)) setErrors(validate(next, tripType, pax, multiCityLegs));
  }

  function touchField(k: keyof Fields) {
    setTouched((prev) => new Set([...prev, k]));
    setErrors(validate(fields, tripType, pax, multiCityLegs));
  }

  function handlePaxChange(p: Pax) {
    setPax(p);
    if (touched.has("passengers")) setErrors(validate(fields, tripType, p, multiCityLegs));
  }

  function updateMultiCityLeg(index: number, key: keyof MultiCityLeg, value: string) {
    const next = multiCityLegs.map((leg, i) => i === index ? { ...leg, [key]: value } : leg);
    setMultiCityLegs(next);
    if (tripType === "multicity" && errors.multiCity) setErrors(validate(fields, tripType, pax, next));
  }

  function addMultiCityLeg() {
    if (multiCityLegs.length < 4) setMultiCityLegs([...multiCityLegs, { from: "", to: "", date: "" }]);
  }

  function removeMultiCityLeg(index: number) {
    if (multiCityLegs.length <= 2) return;
    const next = multiCityLegs.filter((_, i) => i !== index);
    setMultiCityLegs(next);
    setErrors(validate(fields, tripType, pax, next));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allKeys = [...Object.keys(EMPTY_FIELDS), "passengers"] as (keyof Fields | "passengers")[];
    setTouched(new Set(allKeys));
    const errs = validate(fields, tripType, pax, multiCityLegs);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setFormState("loading");
    const itinerary = tripType === "multicity"
      ? multiCityLegs.map((leg, i) => `Leg ${i + 1}: ${leg.from} to ${leg.to} on ${leg.date}`).join("\n")
      : `From: ${fields.from}\nTo: ${fields.to}\nDeparture: ${fields.depart}${tripType === "return" ? `\nReturn: ${fields.returnDate}` : ""}`;
    const message = [
      "Hello Sunrise Travels, I would like a flight quote.",
      "",
      `Trip type: ${tripType === "return" ? "Return" : tripType === "oneway" ? "One-way" : "Multi-city"}`,
      itinerary,
      `Passengers: ${pax.adults} adult(s), ${pax.children} child(ren), ${pax.infants} infant(s)`,
      "",
      "My details:",
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone}`,
      "",
      "Please share your best available fare. Thank you.",
    ].join("\n");
    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-primary px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <Plane className="w-5 h-5 text-white" />
          <h3 className="font-heading text-lg font-bold text-white">Request a Flight Quote</h3>
        </div>
        <p className="text-primary-100 text-sm">Free · No obligation · Opens WhatsApp with your quote details ready</p>
      </div>

      <div className="px-6 pt-5 pb-2">
        <div className="flex flex-wrap bg-slate-100 rounded-xl p-1 gap-1">
          {(["return", "oneway", "multicity"] as TripType[]).map((t) => (
            <button
              key={t} type="button"
              onClick={() => { setTripType(t); setErrors({}); }}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-semibold transition-all",
                tripType === t ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t === "return" ? "↩ Return" : t === "oneway" ? "→ One-way" : "⇄ Multi-city"}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-4 space-y-4">
        {tripType === "multicity" ? (
          <div className="space-y-3">
            {multiCityLegs.map((leg, index) => {
              const legErrors = errors.multiCity?.[index];
              return (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Flight {index + 1}</p>
                    {multiCityLegs.length > 2 && (
                      <button type="button" onClick={() => removeMultiCityLeg(index)} className="text-slate-400 hover:text-red-600" aria-label={`Remove flight ${index + 1}`}>
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel>From</FieldLabel>
                      <Field icon={PlaneTakeoff} placeholder="e.g. London LHR" value={leg.from} onChange={(v) => updateMultiCityLeg(index, "from", v)} error={legErrors?.from} />
                    </div>
                    <div>
                      <FieldLabel>To</FieldLabel>
                      <Field icon={PlaneLanding} placeholder="e.g. Islamabad ISB" value={leg.to} onChange={(v) => updateMultiCityLeg(index, "to", v)} error={legErrors?.to} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <DateField
                      label="Date"
                      placeholder="Choose travel date"
                      min={today}
                      value={leg.date}
                      onChange={(v) => updateMultiCityLeg(index, "date", v)}
                      error={legErrors?.date}
                    />
                  </div>
                </div>
              );
            })}
            {multiCityLegs.length < 4 && (
              <button type="button" onClick={addMultiCityLeg} className="w-full border border-dashed border-primary/50 text-primary rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/5 transition-colors">
                <Plus className="w-4 h-4 inline mr-1.5" /> Add another city
              </button>
            )}
          </div>
        ) : (
          <>
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
                <DateField
                  label="Departure Date"
                  placeholder="Choose departure date"
                  min={today}
                  value={fields.depart}
                  onChange={(v) => setField("depart", v)}
                  onBlur={() => touchField("depart")}
                  error={errors.depart}
                />
              </div>
              {tripType === "return" && (
                <div>
                  <DateField
                    label="Return Date"
                    placeholder="Choose return date"
                    min={fields.depart || today}
                    value={fields.returnDate}
                    onChange={(v) => setField("returnDate", v)}
                    onBlur={() => touchField("returnDate")}
                    error={errors.returnDate}
                  />
                </div>
              )}
            </div>
          </>
        )}

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
              <Field icon={Phone} placeholder="01582 732007 or +44 7700 000000" type="tel" value={fields.phone} onChange={(v) => setField("phone", v)} onBlur={() => touchField("phone")} error={errors.phone} />
          </div>
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
        >
          {formState === "loading"
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Opening WhatsApp…</>
            : <>Get Best Price on WhatsApp <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  );
}
