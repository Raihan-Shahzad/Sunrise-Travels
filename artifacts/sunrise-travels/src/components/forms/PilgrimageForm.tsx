import { useState } from "react";
import { User, Mail, Phone, CheckCircle2, AlertCircle, Loader2, ArrowRight, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CountryCode } from "libphonenumber-js";
import { CountryPhoneInput, DEFAULT_PHONE_COUNTRY, isValidPhone } from "@/components/forms/CountryPhoneInput";

type HotelPref = "3star" | "4star" | "5star";
type FormState = "idle" | "loading" | "success";

interface Errors {
  name?: string; email?: string; phone?: string; month?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  );
}

function InputField({ icon: Icon, type = "text", placeholder, value, onChange, error, onBlur }: {
  icon: React.ElementType; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; onBlur?: () => void;
}) {
  return (
    <div>
      <div className={cn(
        "flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors",
        error ? "border-red-400" : "border-slate-200 focus-within:border-emerald-600 focus-within:bg-white"
      )}>
        <Icon className={cn("w-4 h-4 shrink-0", error ? "text-red-400" : "text-slate-400")} />
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} onBlur={onBlur}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
        />
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function Stepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
        className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
          value <= min ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
        )}>
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-8 text-center font-bold text-slate-800">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
        className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
          value >= max ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
        )}>
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function PilgrimageForm() {
  const [hotel, setHotel] = useState<HotelPref>("4star");
  const [travellers, setTravellers] = useState(2);
  const [month, setMonth] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [formState, setFormState] = useState<FormState>("idle");

  function validate(n: string, e: string, p: string, m: string, country: CountryCode = phoneCountry): Errors {
    const err: Errors = {};
    if (!n.trim()) err.name = "Full name required";
    if (!e.trim()) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) err.email = "Enter a valid email";
    if (!p.trim()) err.phone = "Phone required";
    else if (!isValidPhone(p, phoneCountry)) err.phone = "Enter a valid number for the selected country";
    if (!m) err.month = "Please select a preferred month";
    return err;
  }

  function touch(field: string) {
    setTouched((prev) => new Set([...prev, field]));
    setErrors(validate(name, email, phone, month));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(new Set(["name", "email", "phone", "month"]));
    const errs = validate(name, email, phone, month);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setFormState("loading");
    setTimeout(() => setFormState("success"), 1200);
  }

  if (formState === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <p className="text-2xl mb-2">🕋</p>
        <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">JazakAllah Khair!</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          We've received your enquiry, <strong>{name.split(" ")[0]}</strong>. Our team will be in touch within 2 hours insha'Allah.
        </p>
        <button
          onClick={() => { setFormState("idle"); setName(""); setEmail(""); setPhone(""); setMonth(""); setTouched(new Set()); setErrors({}); }}
          className="text-sm text-emerald-700 font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Islamic green header */}
      <div className="bg-[#0D2B1D] px-6 py-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M20 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM4 4V0H2v4H0v2h2v4h2V6h4V4H4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10">
          <p className="text-amber-400 text-sm mb-1">بسم الله</p>
          <h3 className="font-heading text-lg font-bold text-white">Get a Free Package Quote</h3>
          <p className="text-emerald-300 text-xs mt-1">Umrah · Group & Private</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-5 pb-6 pt-5 space-y-5">

        {/* Hotel preference */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Hotel Preference</p>
          <div className="grid grid-cols-3 gap-2">
            {([["3star", "3★ Economy"], ["4star", "4★ Standard"], ["5star", "5★ Premium"]] as [HotelPref, string][]).map(([v, label]) => (
              <button
                key={v} type="button"
                onClick={() => setHotel(v)}
                className={cn(
                  "py-2.5 rounded-xl border-2 text-xs font-semibold transition-all",
                  hotel === v
                    ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-amber-300"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Travellers */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Number of Travellers</p>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-sm text-slate-700">{travellers} {travellers === 1 ? "Traveller" : "Travellers"}</span>
            <Stepper value={travellers} min={1} max={20} onChange={setTravellers} />
          </div>
        </div>

        {/* Month */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Preferred Month</p>
          <select
            value={month}
            onChange={(e) => { setMonth(e.target.value); if (touched.has("month")) setErrors(validate(name, email, phone, e.target.value)); }}
            onBlur={() => touch("month")}
            className={cn(
              "w-full bg-slate-50 border rounded-xl px-3.5 py-3 text-sm text-slate-800 outline-none transition-colors",
              errors.month ? "border-red-400" : "border-slate-200 focus:border-emerald-600 focus:bg-white"
            )}
          >
            <option value="">Select a month…</option>
            {MONTHS.map((m) => <option key={m} value={m}>{m} 2025</option>)}
          </select>
          <FieldError msg={errors.month} />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Your Details</p>
        </div>

        <InputField icon={User} placeholder="Full name" value={name} onChange={setName} onBlur={() => touch("name")} error={touched.has("name") ? errors.name : undefined} />
        <InputField icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} onBlur={() => touch("email")} error={touched.has("email") ? errors.email : undefined} />
        <div>
          <CountryPhoneInput
            icon={Phone}
            country={phoneCountry}
            onCountryChange={(country) => { setPhoneCountry(country); if (touched.has("phone")) setErrors(validate(name, email, phone, month, country)); }}
            value={phone}
            onValueChange={setPhone}
            onBlur={() => touch("phone")}
            error={touched.has("phone") ? errors.phone : undefined}
            placeholder="Phone / WhatsApp"
            className="h-auto px-3.5 py-3"
          />
          <FieldError msg={touched.has("phone") ? errors.phone : undefined} />
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-[#0D2B1D] font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] mt-1"
        >
          {formState === "loading"
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            : <>Request Free Quote <ArrowRight className="w-4 h-4" /></>}
        </button>
        <p className="text-xs text-slate-400 text-center">No payment required · We'll call you back</p>
      </form>
    </div>
  );
}
