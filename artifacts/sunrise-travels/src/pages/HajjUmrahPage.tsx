import PilgrimageForm from "@/components/forms/PilgrimageForm";
import { motion } from "framer-motion";
import { Check, Phone, MessageCircle, Star, Shield, Heart, Award, Clock, Plane, Utensils, Bus, FileText, MapPin, Users, ChevronRight } from "lucide-react";
import { PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";
import { Link } from "wouter";

const packages = [
  {
    tier: "Economy",
    stars: 3,
    price: "£850",
    badge: null,
    color: "border-slate-200",
    headerBg: "bg-slate-700",
    makkah: "3-Star Hotel · 700m from Haram",
    madinah: "3-Star Hotel · 400m from Masjid Nabawi",
    nights: "14 nights",
    features: ["Return Flights (Economy)", "Umrah Visa Included", "Return Transfers", "Group Ziyarah Tour", "24/7 Support"],
  },
  {
    tier: "Standard",
    stars: 4,
    price: "£1,150",
    badge: "Most Popular",
    color: "border-amber-400",
    headerBg: "bg-emerald-800",
    makkah: "4-Star Hotel · Emaar Grand or similar",
    madinah: "4-Star Hotel · Saja Al Madinah or similar",
    nights: "14 nights",
    features: ["Return Flights (Economy)", "Umrah Visa Included", "Private Transfers", "Guided Ziyarah in both cities", "Breakfast Included", "24/7 Dedicated Support"],
  },
  {
    tier: "Premium",
    stars: 5,
    price: "£1,450",
    badge: "Best Experience",
    color: "border-amber-500",
    headerBg: "bg-[#1B3A2D]",
    makkah: "5-Star Hotel · Swissotel or similar",
    madinah: "5-Star Hotel · Pullman Zamzam or similar",
    nights: "14–21 nights",
    features: ["Return Flights (Business Class opt.)", "E-Visa Fast Track", "Private Luxury Transfers", "Full Board (Breakfast + Dinner)", "Exclusive Guided Ziyarah", "Dedicated Agent"],
  },
];

const included = [
  { icon: Plane, label: "Return Flights", sub: "From UK airports" },
  { icon: FileText, label: "Umrah Visa", sub: "Fast processing" },
  { icon: Bus, label: "All Transfers", sub: "Airport & intercity" },
  { icon: Utensils, label: "Meals", sub: "As per package" },
  { icon: MapPin, label: "Ziyarah Tour", sub: "Holy sites visits" },
  { icon: Users, label: "Group Leader", sub: "Experienced scholar" },
  { icon: Shield, label: "Travel Insurance", sub: "Comprehensive cover" },
  { icon: Clock, label: "24/7 Support", sub: "Always available" },
];

const whyUs = [
  { icon: Award, title: "ATOL & ABTA Protected", desc: "Your money is fully protected. Book with complete confidence." },
  { icon: Heart, title: "Scholar-Led Groups", desc: "Our groups are led by experienced scholars who guide you spiritually throughout." },
  { icon: Shield, title: "Over 20 Years Experience", desc: "We have been organising pilgrimages for over two decades from the UK." },
  { icon: Star, title: "5-Star Reviews", desc: "Hundreds of satisfied pilgrims return to us year after year." },
];

const sites = [
  { name: "Masjid al-Haram", location: "Makkah", image: "https://images.unsplash.com/photo-1565552643983-c65d9147a2b0?q=80&w=800&auto=format&fit=crop" },
  { name: "Masjid Nabawi", location: "Madinah", image: "https://images.unsplash.com/photo-1591604130424-a8e22e50e8c6?q=80&w=800&auto=format&fit=crop" },
  { name: "Mount Arafat", location: "Makkah", image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7bb?q=80&w=800&auto=format&fit=crop" },
  { name: "Masjid Quba", location: "Madinah", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=800&auto=format&fit=crop" },
];

export default function HajjUmrahPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565552643983-c65d9147a2b0?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2B1D]/90 via-[#0D2B1D]/75 to-[#0D2B1D]/90" />

        {/* Islamic geometric overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-amber-400 font-semibold tracking-[0.3em] uppercase text-sm mb-3">بسم الله الرحمن الرحيم</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Your Sacred Journey<br />
              <span className="text-amber-400">to Makkah & Madinah</span>
            </h1>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Alhamdulillah — let us handle every detail of your pilgrimage so you can focus entirely on your worship. Trusted by thousands of UK Muslims since 2003.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#packages"
                className="bg-amber-500 hover:bg-amber-400 text-[#0D2B1D] font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-base flex items-center justify-center gap-2"
              >
                View Packages <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all backdrop-blur-sm text-base flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="bg-[#0D2B1D] border-b border-emerald-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm text-emerald-200">
            {["ATOL Protected", "ABTA Member", "20+ Years Experience", "Scholar-Led Groups", "IATA Approved"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="text-amber-400">✦</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

          {/* Left: packages + content */}
          <div className="lg:col-span-2 space-y-16">

            {/* Why choose us */}
            <div>
              <span className="text-emerald-700 font-semibold tracking-wider uppercase text-xs mb-2 block">Why Sunrise Travels</span>
              <h2 className="font-heading text-3xl font-bold mb-8 text-slate-900">Pilgrimage with Peace of Mind</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {whyUs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Packages */}
            <div id="packages">
              <span className="text-emerald-700 font-semibold tracking-wider uppercase text-xs mb-2 block">2025 / 1447H Packages</span>
              <h2 className="font-heading text-3xl font-bold mb-8 text-slate-900">Choose Your Package</h2>
              <div className="space-y-6">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white rounded-2xl border-2 ${pkg.color} shadow-sm overflow-hidden`}
                  >
                    {pkg.badge && (
                      <div className="bg-amber-500 text-[#0D2B1D] text-xs font-bold uppercase tracking-wider px-4 py-1.5 text-center">
                        ✦ {pkg.badge}
                      </div>
                    )}
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-heading text-xl font-bold text-slate-900">{pkg.tier} Umrah</h3>
                            <div className="flex text-amber-400 mt-1 gap-0.5">
                              {[...Array(pkg.stars)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-current" />)}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{pkg.nights}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-slate-400">Starting from</span>
                            <div className="font-bold text-2xl text-emerald-700">{pkg.price}</div>
                            <span className="text-xs text-slate-400">per person</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-slate-700">
                            <span className="text-amber-500 shrink-0 mt-0.5">🕋</span>
                            <span><strong>Makkah:</strong> {pkg.makkah}</span>
                          </div>
                          <div className="flex items-start gap-2 text-slate-700">
                            <span className="text-emerald-600 shrink-0 mt-0.5">🕌</span>
                            <span><strong>Madinah:</strong> {pkg.madinah}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                          {pkg.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 justify-center md:border-l md:border-slate-100 md:pl-6 md:w-44 shrink-0">
                        <a href={`tel:${PHONE_INTL}`} className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                          <Phone className="w-4 h-4" /> Call to Book
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                        <p className="text-center text-xs text-slate-400">Free quote · No commitment</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div>
              <span className="text-emerald-700 font-semibold tracking-wider uppercase text-xs mb-2 block">Every Package Includes</span>
              <h2 className="font-heading text-3xl font-bold mb-6 text-slate-900">Everything Taken Care Of</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {included.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 mx-auto mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="font-semibold text-sm text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sacred sites gallery */}
            <div>
              <span className="text-emerald-700 font-semibold tracking-wider uppercase text-xs mb-2 block">Sacred Sites</span>
              <h2 className="font-heading text-3xl font-bold mb-6 text-slate-900">Places You Will Visit</h2>
              <div className="grid grid-cols-2 gap-4">
                {sites.map((site, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${site.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B1D]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <p className="font-heading font-bold text-base">{site.name}</p>
                      <p className="text-xs text-emerald-300 flex items-center gap-1"><MapPin className="w-3 h-3" />{site.location}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: sticky form */}
          <div>
            <div className="sticky top-28">
              <PilgrimageForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Hajj CTA ── */}
      <section className="py-16 bg-[#0D2B1D] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <p className="text-amber-400 text-2xl mb-3">🕋</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Planning for Hajj 2025 / 1446H?</h2>
          <p className="text-emerald-200 mb-8 text-lg leading-relaxed">
            Hajj registrations are limited. Contact us now to discuss your options and secure your spot for the greatest journey of your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${PHONE_INTL}`} className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0D2B1D] font-bold px-8 py-4 rounded-xl transition-all">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] text-white font-bold px-8 py-4 rounded-xl transition-all">
              <MessageCircle className="w-5 h-5" /> WhatsApp for Hajj Info
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
