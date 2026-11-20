import { motion } from "framer-motion";
import { Link } from "wouter";
import { getNextHajj } from "@/lib/hijri";
import { ChevronRight, Star, Users, Clock } from "lucide-react";

const ASSET_BASE = import.meta.env.BASE_URL;

const highlights = [
  { icon: Star, text: "3, 4 & 5-Star packages" },
  { icon: Users, text: "Scholar-led groups" },
  { icon: Clock, text: "Packages from £850 pp" },
];

export default function UmrahPromoSection() {
  const hajj = getNextHajj();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${ASSET_BASE}images/makkah-kaaba.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D2B1D]/95 via-[#0D2B1D]/85 to-[#0D2B1D]/60" />

      {/* Islamic pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-amber-400 font-semibold tracking-[0.25em] uppercase text-xs mb-3">
              ✦ Umrah & Hajj {hajj.gregorianYear} / {hajj.hijriYear}H ✦
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.08] mb-5">
              Answer the Call of<br />
              <span className="text-amber-400">Allah's Sacred House</span>
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8 max-w-lg">
              Let Sunrise Travels take care of every detail — flights, hotels, visas, and guided ziyarah — so you can focus purely on your worship and spiritual growth.
            </p>
            <Link
              href="/hajj-umrah"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0D2B1D] font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-base"
            >
              View Packages <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold text-sm">{h.text}</p>
                </div>
              );
            })}

            <div className="col-span-2 bg-amber-500/20 border border-amber-400/30 rounded-2xl p-5 text-center">
              <p className="text-amber-300 text-sm font-medium mb-1">Limited Spaces for Ramadan Umrah</p>
              <p className="text-white font-bold text-lg">Book Early to Avoid Disappointment</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    </section>
  );
}
