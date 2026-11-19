import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, User, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import { WHATSAPP_NUMBER } from "@/lib/site-config";
import type { CountryCode } from "libphonenumber-js";
import {
  CountryPhoneInput,
  DEFAULT_PHONE_COUNTRY,
  formatPhone,
  isValidPhone,
} from "@/components/forms/CountryPhoneInput";

type Service = "nadra" | "visa" | "passport";

function getInitialState() {
  const params = new URLSearchParams(window.location.search);
  const svc = params.get("service") as Service | null;
  const sub = params.get("sub") ?? "";
  const validService = svc && ["nadra", "visa", "passport"].includes(svc) ? svc : null;
  const initialStep = validService && sub ? 1 : 0;
  return { service: validService, subService: sub, step: initialStep };
}

const SERVICES = {
  nadra: {
    label: "NADRA Assistance",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    activeBorder: "border-blue-500",
    subtypes: [
        "New NICOP / NICOP Renewal",
        "Lost / Damaged NICOP Replacement",
        "FRC Certificate",
        "POC Card",
        "Other NADRA Query",
    ],
  },
  visa: {
      label: "Pakistani Visa Assistance",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    activeBorder: "border-emerald-500",
    subtypes: [
        "New Visa / Renewal",
        "Visa Extension",
        "Other Visa Queries",
    ],
  },
  passport: {
      label: "Passport Assistance",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    activeBorder: "border-violet-500",
    subtypes: [
        "New Passport / Passport Renewal",
        "Lost / Damaged Passport Replacement",
        "Other Passport Queries",
    ],
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

const STEPS = ["Service", "Your Details", "Confirm"];

export default function AppointmentsPage() {
  const init = getInitialState();
  const [step, setStep] = useState(init.step);
  const [service, setService] = useState<Service | null>(init.service);
  const [subService, setSubService] = useState(init.subService);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
  const [notes, setNotes] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const requiresQueryDescription = subService.startsWith("Other ");

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function validateDetails(): FieldErrors {
    const next: FieldErrors = {};

    if (!name.trim()) next.name = "Please enter your full name.";
    else if (name.trim().length < 2) next.name = "Please enter at least 2 characters.";

    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = "Please enter a valid email address.";

    if (!phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(phone, phoneCountry)) {
      next.phone = "Please enter a valid phone number for the selected country.";
    }

    if (requiresQueryDescription && !notes.trim()) {
      next.notes = "Please describe what you need help with.";
    }

    return next;
  }

  function handleNextFromService() {
    if (!service) {
      setServiceError("Please select a service to continue.");
      return;
    }
    if (!subService) {
      setServiceError("Please select the type of assistance you need.");
      return;
    }
    setServiceError("");
    setStep(1);
  }

  function handleNextFromDetails() {
    const nextErrors = validateDetails();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setStep(2);
    }
  }

  function handleSubmit() {
    const nextErrors = validateDetails();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStep(1);
      return;
    }

    const message = [
      "Hello Sunrise Travels, I would like to book a free appointment.",
      "",
      `Service: ${SERVICES[service!].label}`,
      `Type: ${subService}`,
      "",
      "My details:",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${formatPhone(phone, phoneCountry)}`,
      ...(notes.trim() ? ["", `Notes: ${notes.trim()}`] : []),
      "",
      "Please confirm my appointment. Thank you.",
    ].join("\n");

    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <PageHero
        eyebrow="Free consultation"
        title="Book an Appointment"
        subtitle="Schedule a free consultation at our Luton office for NADRA, Pakistani Visa, or Passport assistance."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
        size="compact"
      />

      {/* Stepper */}
      <div className="sticky top-16 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1 min-w-0">
                <div className={cn(
                  "flex items-center gap-2 font-medium text-sm shrink-0",
                  step === i ? "text-primary" : i < step ? "text-green-600" : "text-slate-400"
                )}>
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    step === i ? "bg-primary text-white" : i < step ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                  )}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="hidden sm:block">{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-1", i < step ? "bg-green-400" : "bg-slate-200")} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <AnimatePresence mode="wait">
          {/* Step 0: Choose Service */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">What service do you need?</h2>
                <p className="text-slate-500">Select a service category, then choose the specific type of assistance required.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {(Object.keys(SERVICES) as Service[]).map((key) => {
                  const svc = SERVICES[key];
                  return (
                    <button
                      key={key}
                      onClick={() => { setService(key); setSubService(""); setServiceError(""); }}
                      className={cn(
                        "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-md",
                        service === key ? `${svc.bg} ${svc.activeBorder}` : `bg-white ${svc.border} hover:${svc.bg}`
                      )}
                    >
                      <div className={cn("text-lg font-bold mb-1", svc.color)}>{svc.label}</div>
                      <div className="text-sm text-slate-500">{svc.subtypes.length} service types</div>
                    </button>
                  );
                })}
              </div>

              {service && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="font-semibold text-slate-800 mb-3">Select the type of assistance:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES[service].subtypes.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => { setSubService(sub); setServiceError(""); }}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left text-sm font-medium transition-all",
                          subService === sub
                            ? `bg-primary/5 border-primary text-primary`
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                        )}
                      >
                        {subService === sub && <Check className="w-4 h-4 inline mr-2 text-primary" />}
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {serviceError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                  {serviceError}
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleNextFromService}
                  className="bg-primary hover:bg-primary/90 text-white px-8 h-12"
                >
                  Next: Your Details <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Your Details</h2>
                <p className="text-slate-500">Tell us who you are and we'll arrange your free consultation.</p>
              </div>

              {service && (
                <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">Selected service</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{SERVICES[service].label}</p>
                    <p className="text-sm text-slate-600">{subService}</p>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-5 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="appointment-name">Full Name *</label>
                  <Input
                    id="appointment-name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                    placeholder="e.g. Muhammad Ali Khan"
                    className={cn("h-11", errors.name && "border-red-400 focus-visible:ring-red-300")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="appointment-email">Email Address *</label>
                    <Input
                      id="appointment-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                      placeholder="you@example.com"
                      className={cn("h-11", errors.email && "border-red-400 focus-visible:ring-red-300")}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="appointment-phone">Phone Number *</label>
                    <CountryPhoneInput
                      id="appointment-phone"
                      country={phoneCountry}
                      onCountryChange={(country) => { setPhoneCountry(country); clearError("phone"); }}
                      value={phone}
                      onValueChange={(value) => { setPhone(value); clearError("phone"); }}
                      placeholder="07xxx xxxxxx"
                      error={errors.phone}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="appointment-notes">
                    {requiresQueryDescription ? "What do you need help with? *" : "Additional Notes (optional)"}
                  </label>
                  <Textarea
                    id="appointment-notes"
                    value={notes}
                    onChange={(e) => { setNotes(e.target.value); clearError("notes"); }}
                    placeholder={requiresQueryDescription ? "Briefly describe your query..." : "Any additional context or questions for us..."}
                    className={cn("min-h-[80px] max-h-28", errors.notes && "border-red-400 focus-visible:ring-red-300")}
                    aria-invalid={!!errors.notes}
                  />
                  {errors.notes ? (
                    <p className="text-xs text-red-600 mt-1.5">{errors.notes}</p>
                  ) : requiresQueryDescription ? (
                    <p className="text-xs text-slate-500 mt-1.5">Please describe what you need help with so we can prepare for your appointment.</p>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(0)} className="px-8 h-12">Back</Button>
                <Button onClick={handleNextFromDetails} className="bg-primary hover:bg-primary/90 text-white px-8 h-12">
                  Review Booking <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Review & Confirm */}
          {step === 2 && service && (
            <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Confirm your Appointment</h2>
                <p className="text-slate-500">Please review the details below, then send your request on WhatsApp — your appointment details will be ready to send.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-primary/5 border-b border-primary/10 px-8 py-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Appointment Summary</span>
                </div>
                <div className="p-8 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  <SummaryItem icon={<FileText className="w-4 h-4" />} label="Service" value={SERVICES[service].label} />
                  <SummaryItem icon={<FileText className="w-4 h-4" />} label="Type" value={subService} />
                  <SummaryItem icon={<User className="w-4 h-4" />} label="Name" value={name} />
                  <SummaryItem icon={<User className="w-4 h-4" />} label="Email" value={email} />
                  <SummaryItem icon={<User className="w-4 h-4" />} label="Phone" value={formatPhone(phone, phoneCountry) || phone} />
                  {notes && (
                    <SummaryItem
                      icon={<FileText className="w-4 h-4" />}
                      label={requiresQueryDescription ? "Query description" : "Notes"}
                      value={notes}
                      className="sm:col-span-2"
                    />
                  )}
                </div>
                <div className="px-8 pb-6">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                    <strong>Please note:</strong> This appointment is for a free in-office consultation. Sunrise Travels provides guidance and document preparation assistance only.
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="px-8 h-12">Back</Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/90 text-white px-10 h-12 font-semibold"
                >
                  <><MessageCircle className="w-4 h-4 mr-2" /> Confirm on WhatsApp</>
                </Button>
              </div>
              <p className="text-center text-xs text-slate-500">Free · No obligation · Opens WhatsApp with your appointment details ready</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SummaryItem({
  icon, label, value, className
}: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-slate-900 font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}
