import { Building2, MessageCircle, Phone } from "lucide-react";
import { PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";
import { getNextHajj } from "@/lib/hijri";

const hajj = getNextHajj();

export default function HajjNoticeSection() {
  return (
    <section className="py-16 bg-[#0D2B1D] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text side */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-amber-400 text-3xl mb-3">☪️</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Hajj {hajj.gregorianYear} / {hajj.hijriYear}H
            </h2>
            <p className="text-emerald-200 text-lg leading-relaxed mb-3">
              We offer complete <strong className="text-white">Hajj packages</strong> for individuals, couples, and groups — including flights, accommodation near the Haram, all ground transport, and visa processing.
            </p>
            <p className="text-emerald-300 text-base leading-relaxed">
              Due to the complexity of Hajj arrangements and limited government quota allocations, we handle all Hajj bookings <strong className="text-amber-400">exclusively in person at our Luton office</strong>. Our experienced team will walk you through every step.
            </p>
          </div>

          {/* Office visit card */}
          <div className="w-full md:w-80 shrink-0 bg-white/10 border border-amber-400/30 rounded-2xl p-6 backdrop-blur-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="font-heading font-bold text-white text-lg mb-2">Visit Our Office</h3>
            <p className="text-emerald-200 text-sm mb-4 leading-relaxed">
              211A Dunstable Road<br />Luton, LU1 1DD<br />
              <span className="text-slate-400 text-xs">Mon–Sat · 9am–6pm</span>
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${PHONE_INTL}`}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0D2B1D] font-bold px-5 py-3 rounded-xl transition-all text-sm w-full"
              >
                <Phone className="w-4 h-4" /> Call to Enquire
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm w-full"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
