import { useEffect, useState } from "react";
import { Calendar, Clock, Mail, Phone, RefreshCw, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Appointment = {
  reference: string;
  service: "nadra" | "visa" | "passport";
  subService: string;
  appointmentDate: string | null;
  appointmentTime: string | null;
  fullName: string;
  email: string;
  phone: string;
  notes: string | null;
  status: string;
  createdAt: string;
};

const labels = {
  nadra: "NADRA Assistance",
  visa: "Pakistani Visa Assistance",
  passport: "Passport Assistance",
};

export default function AppointmentInboxPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAppointments() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE}/api/appointments`);
      if (!response.ok) throw new Error("Unable to load appointments");
      setAppointments((await response.json()) as Appointment[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load appointments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAppointments();
    const interval = window.setInterval(() => void loadAppointments(), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <p className="text-amber-300 uppercase tracking-[0.2em] text-xs font-semibold mb-2">Staff view</p>
              <h1 className="font-heading text-4xl font-bold">Appointment Inbox</h1>
              <p className="text-primary-100 mt-2">New bookings appear here automatically every 30 seconds.</p>
            </div>
            <Button onClick={() => void loadAppointments()} variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {error && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 mb-6">{error}</div>}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">Loading appointments…</div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h2 className="font-heading text-xl font-bold text-slate-900">No appointments yet</h2>
            <p className="text-slate-500 mt-1">New bookings will appear here when customers submit the form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <article key={appointment.reference} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-bold text-primary">{appointment.reference}</span>
                      <span className="text-xs uppercase tracking-wide rounded-full bg-amber-50 text-amber-800 px-2.5 py-1">{appointment.status}</span>
                      <span className="text-xs text-slate-400">{new Date(appointment.createdAt).toLocaleString("en-GB")}</span>
                    </div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">{appointment.fullName}</h2>
                    <p className="text-primary font-medium mt-1">{labels[appointment.service]}</p>
                    <p className="text-slate-600 text-sm mt-1">{appointment.subService}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-600 lg:text-right">
                    {appointment.appointmentDate && appointment.appointmentTime ? (
                      <>
                        <span className="flex items-center gap-2 lg:justify-end"><Calendar className="w-4 h-4 text-primary" />{appointment.appointmentDate}</span>
                        <span className="flex items-center gap-2 lg:justify-end"><Clock className="w-4 h-4 text-primary" />{appointment.appointmentTime}</span>
                      </>
                    ) : (
                      <span className="flex items-center gap-2 lg:justify-end sm:col-span-2"><Calendar className="w-4 h-4 text-primary" />Date &amp; time to arrange on WhatsApp</span>
                    )}
                    <a href={`tel:${appointment.phone}`} className="flex items-center gap-2 lg:justify-end hover:text-primary"><Phone className="w-4 h-4 text-primary" />{appointment.phone}</a>
                    <a href={`mailto:${appointment.email}`} className="flex items-center gap-2 lg:justify-end hover:text-primary"><Mail className="w-4 h-4 text-primary" />{appointment.email}</a>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 text-sm text-slate-600">
                    <UserRound className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span><strong className="text-slate-800">Notes:</strong> {appointment.notes}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}