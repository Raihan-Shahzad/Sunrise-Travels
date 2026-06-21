import PilgrimageForm from "@/components/forms/PilgrimageForm";
import { Star, Check, Phone, MessageCircle } from "lucide-react";
import { PHONE_INTL, WHATSAPP_NUMBER } from "@/lib/site-config";

const packages = [
  {
    title: "Economy Umrah",
    stars: 3,
    price: "from £850",
    makkah: "3-Star Hotel (700m from Haram)",
    madinah: "3-Star Hotel (400m from Masjid Nabawi)",
    features: ["Return Flights Included", "Umrah Visa", "Full Transport", "Ziyarah in both holy cities"]
  },
  {
    title: "Standard Umrah",
    stars: 4,
    price: "from £1,150",
    makkah: "4-Star Hotel (Emaar Grand or similar)",
    madinah: "4-Star Hotel (Saja Al Madinah or similar)",
    features: ["Return Flights Included", "Umrah Visa", "Full Transport", "Ziyarah with Guide"]
  },
  {
    title: "Premium Umrah",
    stars: 5,
    price: "from £1,450",
    makkah: "5-Star Hotel (Swissotel or similar)",
    madinah: "5-Star Hotel (Pullman Zamzam or similar)",
    features: ["Return Flights Included", "Umrah E-Visa Fast Track", "Private Transport", "Breakfast Included"]
  }
];

export default function HajjUmrahPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative bg-slate-900 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565552643983-c65d9147a2b0?q=80&w=2000')" }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Your Spiritual Journey
          </h1>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed">
            Experience complete peace of mind on your sacred pilgrimage. We handle the logistics so you can focus entirely on your worship.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6 text-slate-900">Featured Packages</h2>
              <div className="space-y-6">
                {packages.map((pkg, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-slate-900">{pkg.title}</h3>
                          <div className="flex text-[#F5A623] mt-1">
                            {[...Array(pkg.stars)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-slate-500">Starting from</span>
                          <div className="font-bold text-2xl text-primary">{pkg.price}</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p><strong className="text-slate-900">Makkah:</strong> {pkg.makkah}</p>
                        <p><strong className="text-slate-900">Madinah:</strong> {pkg.madinah}</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-center md:border-l md:border-slate-100 md:pl-6 md:w-48 shrink-0">
                      <a href={`tel:${PHONE_INTL}`} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28">
              <PilgrimageForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
