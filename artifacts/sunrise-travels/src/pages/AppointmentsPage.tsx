import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calendar, Clock, User, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Service = "nadra" | "visa" | "passport";

const SERVICES = {
  nadra: {
    label: "NADRA Assistance",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    activeBorder: "border-blue-500",
    subtypes: [
      "New NICOP Application",
      "NICOP Renewal",
      "NICOP Replacement (Lost/Damaged)",
      "Pakistan Origin Card (POC)",
      "Family Registration Certificate (FRC)",
      "Other NADRA Query",
    ],
  },
  visa: {
    label: "Visa Assistance",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    activeBorder: "border-emerald-500",
    subtypes: [
      "Tourist Visa Application",
      "Family Visit Visa",
      "Business Visa",
      "Visa Renewal / Extension",
      "Visa Enquiry / Consultation",
    ],
  },
  passport: {
    label: "Passport Assistance",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    activeBorder: "border-violet-500",
    subtypes: [
      "New Passport Application",
      "Passport Renewal",
      "Lost or Damaged Passport",
      "Urgent / Fast-Track Passport",
      "Passport Consultation",
    ],
  },
};

const TIMES = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

function getAvailableDates(count = 14) {
  const dates: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (dates.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(new Date(d));
    }
  }
  return dates;
}

function formatDateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDateLabel(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

const STEPS = ["Service", "Date & Time", "Your Details", "Confirm"];

export default function AppointmentsPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [subService, setSubService] = useState("");
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [error, setError] = useState("");

  const dates = getAvailableDates(14);
  const selectedDate = dates.find((d) => formatDateKey(d) === dateKey);

  const canNextStep1 = !!service && !!subService;
  const canNextStep2 = !!dateKey && !!time;
  const canNextStep3 = name.trim() && email.trim() && phone.trim();

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          subService,
          appointmentDate: dateKey,
          appointmentTime: time,
          fullName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: notes.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to book appointment");
      }
      const data = await res.json();
      setBookingRef(data.reference);
      setBooked(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (booked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Appointment Booked!</h2>
          <p className="text-slate-500 mb-6">We'll confirm your appointment by phone or email shortly.</p>
          <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3 mb-8 border border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Reference</span>
              <span className="font-bold text-primary">{bookingRef}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Service</span>
              <span className="font-semibold text-slate-900">{SERVICES[service!].label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Type</span>
              <span className="font-semibold text-slate-900 text-right max-w-[180px]">{subService}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Date</span>
              <span className="font-semibold text-slate-900">{selectedDate ? formatDateLabel(selectedDate) : dateKey}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Time</span>
              <span className="font-semibold text-slate-900">{time}</span>
            </div>
          </div>
          <Button
            onClick={() => { setBooked(false); setStep(0); setService(null); setSubService(""); setDateKey(""); setTime(""); setName(""); setEmail(""); setPhone(""); setNotes(""); }}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12"
          >
            Book Another Appointment
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-primary-100 text-lg">
            Schedule a free consultation at our Luton office for NADRA, Visa, or Passport assistance.
          </p>
        </div>
      </section>

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
                      onClick={() => { setService(key); setSubService(""); }}
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
                        onClick={() => setSubService(sub)}
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

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(1)}
                  disabled={!canNextStep1}
                  className="bg-primary hover:bg-primary/90 text-white px-8 h-12 disabled:opacity-40"
                >
                  Next: Choose Date <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Pick a date & time</h2>
                <p className="text-slate-500">Office hours: Monday – Friday, 10:00 AM – 5:00 PM</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Available Dates
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {dates.map((d) => {
                    const key = formatDateKey(d);
                    return (
                      <button
                        key={key}
                        onClick={() => { setDateKey(key); setTime(""); }}
                        className={cn(
                          "p-3 rounded-xl border-2 text-center text-sm transition-all",
                          dateKey === key
                            ? "bg-primary border-primary text-white font-bold shadow-md"
                            : "bg-white border-slate-200 text-slate-700 hover:border-primary/60"
                        )}
                      >
                        <div className="font-medium">{d.toLocaleDateString("en-GB", { weekday: "short" })}</div>
                        <div className="text-lg font-bold leading-tight">{d.getDate()}</div>
                        <div className="text-xs opacity-80">{d.toLocaleDateString("en-GB", { month: "short" })}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {dateKey && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" /> Available Times
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={cn(
                          "py-2.5 rounded-xl border-2 text-sm font-medium transition-all",
                          time === t
                            ? "bg-primary border-primary text-white shadow-md"
                            : "bg-white border-slate-200 text-slate-700 hover:border-primary/60"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(0)} className="px-8 h-12">Back</Button>
                <Button onClick={() => setStep(2)} disabled={!canNextStep2} className="bg-primary hover:bg-primary/90 text-white px-8 h-12 disabled:opacity-40">
                  Next: Your Details <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Your Details</h2>
                <p className="text-slate-500">We'll use this to confirm your appointment and send you a reminder.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-5 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muhammad Ali Khan"
                    className="h-11"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07xxx xxxxxx"
                      className="h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Notes (optional)</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional context or questions for us..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="px-8 h-12">Back</Button>
                <Button onClick={() => setStep(3)} disabled={!canNextStep3} className="bg-primary hover:bg-primary/90 text-white px-8 h-12 disabled:opacity-40">
                  Review Booking <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Confirm your Appointment</h2>
                <p className="text-slate-500">Please review the details below before confirming.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-primary/5 border-b border-primary/10 px-8 py-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Appointment Summary</span>
                </div>
                <div className="p-8 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  <SummaryItem icon={<FileText className="w-4 h-4" />} label="Service" value={SERVICES[service!].label} />
                  <SummaryItem icon={<FileText className="w-4 h-4" />} label="Type" value={subService} />
                  <SummaryItem icon={<Calendar className="w-4 h-4" />} label="Date" value={selectedDate ? formatDateLabel(selectedDate) : dateKey} />
                  <SummaryItem icon={<Clock className="w-4 h-4" />} label="Time" value={time} />
                  <SummaryItem icon={<User className="w-4 h-4" />} label="Name" value={name} />
                  <SummaryItem icon={<User className="w-4 h-4" />} label="Email" value={email} />
                  <SummaryItem icon={<User className="w-4 h-4" />} label="Phone" value={phone} />
                  {notes && <SummaryItem icon={<FileText className="w-4 h-4" />} label="Notes" value={notes} className="sm:col-span-2" />}
                </div>
                <div className="px-8 pb-6">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                    <strong>Please note:</strong> This appointment is for a free in-office consultation. Sunrise Travels provides guidance and document preparation assistance only.
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)} className="px-8 h-12" disabled={loading}>Back</Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white px-10 h-12 font-semibold"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Booking…</>
                  ) : (
                    <><Check className="w-4 h-4 mr-2" /> Confirm Appointment</>
                  )}
                </Button>
              </div>
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
