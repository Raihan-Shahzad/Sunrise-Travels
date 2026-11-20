  import { useState, useRef, useEffect } from "react";
  import {
    Plane, PlaneLanding, PlaneTakeoff, Users, CalendarDays,
    User, Mail, Phone, ArrowRight, AlertCircle, Loader2, ChevronDown,
    Plus, Minus, X, ChevronLeft, ChevronRight,
  } from "lucide-react";
  import { type CountryCode } from "libphonenumber-js";
  import { cn } from "@/lib/utils";
  import { isAirportLabel } from "@/lib/airports";
  import AirportCombobox from "@/components/forms/AirportCombobox";
  import { WHATSAPP_NUMBER } from "@/lib/site-config";
  import {
    CountryPhoneInput,
    DEFAULT_PHONE_COUNTRY,
    formatPhone,
    isValidPhone,
  } from "@/components/forms/CountryPhoneInput";

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

  function localDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function isValidDateKey(value: string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return false;
    const [, year, month, day] = match.map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  function isValidEmail(email: string) {
    const value = email.trim();
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value);
  }

  function validate(
    fields: Fields,
    tripType: TripType,
    pax: Pax,
    multiCityLegs: MultiCityLeg[],
    phoneCountry: CountryCode,
  ): Errors {
    const e: Errors = {};
    const today = localDateKey();

    if (tripType === "multicity") {
      e.multiCity = multiCityLegs.map((leg, index) => {
        const legErrors: Partial<Record<keyof MultiCityLeg, string>> = {};
        const from = leg.from.trim();
        const to = leg.to.trim();
        if (!from) legErrors.from = "Select a departure airport from the list";
        else if (!isAirportLabel(from)) legErrors.from = "Select an airport from the list";
        if (!to) legErrors.to = "Select a destination airport from the list";
        else if (!isAirportLabel(to)) legErrors.to = "Select an airport from the list";
        else if (from && from.localeCompare(to, undefined, { sensitivity: "base" }) === 0) {
          legErrors.to = "Choose a destination different from departure";
        }
        if (!leg.date) {
          legErrors.date = "Date required";
        } else if (!isValidDateKey(leg.date)) {
          legErrors.date = "Choose a valid date";
        } else if (leg.date < today) {
          legErrors.date = "Must be today or later";
        } else if (
          index > 0 &&
          isValidDateKey(multiCityLegs[index - 1].date) &&
          leg.date < multiCityLegs[index - 1].date
        ) {
          legErrors.date = "Must be on or after the previous leg";
        }
        return legErrors;
      });
      if (e.multiCity.every((leg) => Object.keys(leg).length === 0)) delete e.multiCity;
    } else {
      const from = fields.from.trim();
      const to = fields.to.trim();
      if (!from) e.from = "Select a departure airport from the list";
      else if (!isAirportLabel(from)) e.from = "Select an airport from the list";
      if (!to) e.to = "Select a destination airport from the list";
      else if (!isAirportLabel(to)) e.to = "Select an airport from the list";
      else if (from && from.localeCompare(to, undefined, { sensitivity: "base" }) === 0) {
        e.to = "Choose a destination different from departure";
      }
      if (!fields.depart) {
        e.depart = "Departure date required";
      } else if (!isValidDateKey(fields.depart)) {
        e.depart = "Choose a valid date";
      } else if (fields.depart < today) {
        e.depart = "Must be today or later";
      }
      if (tripType === "return") {
        if (!fields.returnDate) e.returnDate = "Return date required";
        else if (!isValidDateKey(fields.returnDate)) e.returnDate = "Choose a valid date";
        else if (isValidDateKey(fields.depart) && fields.returnDate <= fields.depart)
          e.returnDate = "Must be after departure";
      }
    }
    const passengerCount = pax.adults + pax.children + pax.infants;
    if (passengerCount < 1) e.passengers = "Add at least 1 passenger";
    else if (passengerCount > 9) e.passengers = "Maximum 9 passengers";
    if (pax.infants > pax.adults) e.passengers = "Infants cannot exceed adults";
    if (!fields.name.trim()) e.name = "Full name required";
    else if (fields.name.trim().length < 2) e.name = "Enter at least 2 characters";
    else if (fields.name.trim().length > 100) e.name = "Name must be 100 characters or fewer";
    if (!fields.email.trim()) e.email = "Email required";
    else if (!isValidEmail(fields.email)) e.email = "Enter a valid email address";
    if (!fields.phone.trim()) e.phone = "Phone required";
    else if (!isValidPhone(fields.phone, phoneCountry)) {
      e.phone = "Enter a valid phone number for the selected country";
    }
    return e;
  }

  function FieldLabel({
    children,
    required = false,
    htmlFor,
  }: {
    children: React.ReactNode;
    required?: boolean;
    htmlFor?: string;
  }) {
    return (
      <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {children}
        {required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> required</span>}
      </label>
    );
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
    value: string; onChange: (v: string) => void; error?: string;
    id?: string; required?: boolean; autoComplete?: string;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    onBlur?: () => void;
  }) {
    return (
      <div>
        <div className={cn(
          "flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors",
          error ? "border-red-400" : "border-slate-200 focus-within:border-primary focus-within:bg-white"
        )}>
          <Icon className={cn("w-4 h-4 shrink-0", error ? "text-red-400" : "text-slate-400")} />
          <input
            id={rest.id}
            type={type} placeholder={placeholder} value={value}
            onChange={(e) => onChange(e.target.value)}
            required={rest.required}
            aria-required={rest.required}
            aria-invalid={!!error}
            autoComplete={rest.autoComplete}
            inputMode={rest.inputMode}
            maxLength={rest.maxLength}
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none min-w-0"
            onBlur={rest.onBlur}
          />
        </div>
        <FieldError msg={error} />
      </div>
    );
  }

  function DateField({ id, label, value, min, error, onChange, onBlur, placeholder }: {
    id?: string;
    label: string;
    value: string;
    min?: string;
    error?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder: string;
  }) {
    const [open, setOpen] = useState(false);
    const initialDate = value || min || localDateKey();
    const [viewMonth, setViewMonth] = useState(() => {
      const [year, month] = initialDate.split("-").map(Number);
      return new Date(year, month - 1, 1);
    });
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      function closeOnOutsideClick(event: MouseEvent) {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", closeOnOutsideClick);
      return () => document.removeEventListener("mousedown", closeOnOutsideClick);
    }, [open]);

    useEffect(() => {
      if (!value) return;
      const [year, month] = value.split("-").map(Number);
      setViewMonth(new Date(year, month - 1, 1));
    }, [value]);

    const minDate = min ? new Date(`${min}T00:00:00`) : null;
    const selectedDate = value ? new Date(`${value}T12:00:00`) : null;
    const monthLabel = viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    const monthStartDay = (viewMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const todayKey = localDateKey();
    const previousMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
    const previousMonthDisabled = minDate
      ? previousMonth < new Date(minDate.getFullYear(), minDate.getMonth(), 1)
      : false;

    const formattedDate = value
      ? selectedDate!.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : placeholder;

    return (
      <div ref={pickerRef} className="relative">
        <FieldLabel required htmlFor={id}>{label}</FieldLabel>
        <button
          id={id}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-haspopup="dialog"
            aria-required="true"
            aria-invalid={!!error}
          className={cn(
            "relative w-full flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all",
            error
              ? "border-red-400 bg-red-50/40"
              : open
                ? "border-primary bg-white ring-2 ring-primary/10"
                : "border-slate-200 bg-slate-50 hover:border-primary/40 hover:bg-white"
          )}
        >
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
          <ChevronDown className={cn("w-4 h-4 shrink-0 text-slate-400 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div
            role="dialog"
            aria-label={`${label} calendar`}
            className="absolute left-0 top-full z-50 mt-2 w-[min(19rem,calc(100vw-3rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setViewMonth(previousMonth)}
                disabled={previousMonthDisabled}
                aria-label="Previous month"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900">{monthLabel}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Select a date</p>
              </div>
              <button
                type="button"
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                aria-label="Next month"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <span key={day} className="py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{day}</span>
              ))}
              {Array.from({ length: monthStartDay }).map((_, index) => (
                <span key={`empty-${index}`} className="h-9" aria-hidden="true" />
              ))}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
                const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const disabled = !!minDate && date < minDate;
                const selected = dateKey === value;
                const today = dateKey === todayKey;
                return (
                  <button
                    key={dateKey}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onChange(dateKey);
                      onBlur?.();
                      setOpen(false);
                    }}
                    className={cn(
                      "relative h-9 rounded-lg text-sm font-medium transition-all",
                      disabled
                        ? "cursor-not-allowed text-slate-300"
                        : selected
                          ? "bg-primary text-white shadow-md shadow-primary/25"
                          : "text-slate-700 hover:bg-primary/10 hover:text-primary",
                      today && !selected && "font-bold text-primary"
                    )}
                    aria-label={date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  >
                    {day}
                    {today && !selected && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3 text-center text-xs text-slate-400">
              {selectedDate ? `Selected: ${formattedDate}` : "Choose your travel date"}
            </div>
          </div>
        )}
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

  function PassengerPicker({ id, pax, onChange, error }: {
    id?: string;
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
          id={id}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-required="true"
          aria-invalid={!!error}
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
    const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
    const [pax, setPax] = useState<Pax>(EMPTY_PAX);
    const [multiCityLegs, setMultiCityLegs] = useState<MultiCityLeg[]>(EMPTY_MULTI_CITY);
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Set<keyof Fields | "passengers">>(new Set());
    const [formState, setFormState] = useState<FormState>("idle");

    const today = localDateKey();

    function setField(k: keyof Fields, v: string) {
      const next = { ...fields, [k]: v };
      setFields(next);
      if (touched.has(k)) setErrors(validate(next, tripType, pax, multiCityLegs, phoneCountry));
    }

    function handlePhoneCountryChange(country: CountryCode) {
      setPhoneCountry(country);
      if (touched.has("phone")) {
        setErrors(validate(fields, tripType, pax, multiCityLegs, country));
      }
    }

    function touchField(k: keyof Fields) {
      setTouched((prev) => new Set([...prev, k]));
      setErrors(validate(fields, tripType, pax, multiCityLegs, phoneCountry));
    }

    function handlePaxChange(p: Pax) {
      setPax(p);
      if (touched.has("passengers")) setErrors(validate(fields, tripType, p, multiCityLegs, phoneCountry));
    }

    function updateMultiCityLeg(index: number, key: keyof MultiCityLeg, value: string) {
      const next = multiCityLegs.map((leg, i) => i === index ? { ...leg, [key]: value } : leg);
      setMultiCityLegs(next);
      if (tripType === "multicity" && errors.multiCity) setErrors(validate(fields, tripType, pax, next, phoneCountry));
    }

    function addMultiCityLeg() {
      if (multiCityLegs.length < 4) setMultiCityLegs([...multiCityLegs, { from: "", to: "", date: "" }]);
    }

    function removeMultiCityLeg(index: number) {
      if (multiCityLegs.length <= 2) return;
      const next = multiCityLegs.filter((_, i) => i !== index);
      setMultiCityLegs(next);
      setErrors(validate(fields, tripType, pax, next, phoneCountry));
    }

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const allKeys = [...Object.keys(EMPTY_FIELDS), "passengers"] as (keyof Fields | "passengers")[];
      setTouched(new Set(allKeys));
      const errs = validate(fields, tripType, pax, multiCityLegs, phoneCountry);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setFormState("loading");
      const phoneNumber = formatPhone(fields.phone, phoneCountry);
      if (!phoneNumber) {
        setFormState("idle");
        setErrors({ ...errs, phone: "Enter a valid phone number for the selected country" });
        return;
      }
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
        `Phone: ${phoneNumber}`,
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
                        <FieldLabel required htmlFor={`multi-city-${index}-from`}>From</FieldLabel>
                        <AirportCombobox id={`multi-city-${index}-from`} icon={PlaneTakeoff} placeholder="Search airport or code" value={leg.from} onChange={(v) => updateMultiCityLeg(index, "from", v)} error={legErrors?.from} required />
                      </div>
                      <div>
                        <FieldLabel required htmlFor={`multi-city-${index}-to`}>To</FieldLabel>
                        <AirportCombobox id={`multi-city-${index}-to`} icon={PlaneLanding} placeholder="Search airport or code" value={leg.to} onChange={(v) => updateMultiCityLeg(index, "to", v)} error={legErrors?.to} required align="right" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <DateField
                        id={`multi-city-${index}-date`}
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
                  <FieldLabel required htmlFor="flight-from">From</FieldLabel>
                  <AirportCombobox id="flight-from" icon={PlaneTakeoff} placeholder="Search airport or code" value={fields.from} onChange={(v) => setField("from", v)} onBlur={() => touchField("from")} error={touched.has("from") ? errors.from : undefined} required />
                </div>
                <div>
                  <FieldLabel required htmlFor="flight-to">To</FieldLabel>
                  <AirportCombobox id="flight-to" icon={PlaneLanding} placeholder="Search airport or code" value={fields.to} onChange={(v) => setField("to", v)} onBlur={() => touchField("to")} error={touched.has("to") ? errors.to : undefined} required align="right" />
                </div>
              </div>

              <div className={cn("grid gap-3", tripType === "return" ? "grid-cols-2" : "grid-cols-1")}>
                <div>
                  <DateField
                    id="flight-departure-date"
                    label="Departure Date"
                    placeholder="Choose departure date"
                    min={today}
                    value={fields.depart}
                    onChange={(v) => setField("depart", v)}
                    onBlur={() => touchField("depart")}
                    error={touched.has("depart") ? errors.depart : undefined}
                  />
                </div>
                {tripType === "return" && (
                  <div>
                    <DateField
                      id="flight-return-date"
                      label="Return Date"
                      placeholder="Choose return date"
                      min={fields.depart || today}
                      value={fields.returnDate}
                      onChange={(v) => setField("returnDate", v)}
                      onBlur={() => touchField("returnDate")}
                      error={touched.has("returnDate") ? errors.returnDate : undefined}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          <div>
            <FieldLabel required htmlFor="flight-passengers">Passengers</FieldLabel>
            <PassengerPicker
              id="flight-passengers"
              pax={pax}
              onChange={handlePaxChange}
              error={touched.has("passengers") ? errors.passengers : undefined}
            />
          </div>

          <div className="border-t border-slate-100 pt-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Your Details</p>
          </div>

          <div>
            <FieldLabel required htmlFor="flight-name">Full Name</FieldLabel>
            <Field id="flight-name" icon={User} placeholder="Your full name" value={fields.name} onChange={(v) => setField("name", v)} onBlur={() => touchField("name")} error={touched.has("name") ? errors.name : undefined} required autoComplete="name" maxLength={100} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel required htmlFor="flight-email">Email</FieldLabel>
              <Field id="flight-email" icon={Mail} placeholder="you@example.com" type="email" value={fields.email} onChange={(v) => setField("email", v)} onBlur={() => touchField("email")} error={touched.has("email") ? errors.email : undefined} required autoComplete="email" inputMode="email" maxLength={254} />
            </div>
            <div>
              <FieldLabel required htmlFor="flight-phone-number">Phone</FieldLabel>
              <CountryPhoneInput
                id="flight-phone-number"
                icon={Phone}
                country={phoneCountry}
                onCountryChange={handlePhoneCountryChange}
                value={fields.phone}
                onValueChange={(value) => setField("phone", value)}
                onBlur={() => touchField("phone")}
                error={touched.has("phone") ? errors.phone : undefined}
                placeholder="7700 900123"
                className="h-auto min-w-0 px-3.5 py-3"
              />
              <FieldError msg={touched.has("phone") ? errors.phone : undefined} />
            </div>
          </div>

          <button
            type="submit"
            disabled={formState === "loading"}
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-70 text-primary font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
          >
            {formState === "loading"
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Opening WhatsApp…</>
              : <>Get Best Price on WhatsApp <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    );
  }