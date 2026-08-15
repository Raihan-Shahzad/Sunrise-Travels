import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Star } from "lucide-react";
import { PHONE, PHONE_INTL } from "@/lib/site-config";
import { Link } from "wouter";

const ASSET_BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="relative h-[88vh] min-h-[640px] w-full bg-[#0D2B1D] flex items-center">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${ASSET_BASE}images/makkah-kaaba.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D2B1D]/92 via-[#0D2B1D]/70 to-transparent" />
      </div>

      {/* Islamic geometric overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 · Trusted by thousands of UK Muslims</span>
            </div>

            <p className="text-amber-400 tracking-[0.25em] uppercase text-xs font-semibold mb-3">بسم الله الرحمن الرحيم</p>

            <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Journey to the{" "}
              <span className="text-amber-400">Sacred Places</span>{" "}
              Begins Here
            </h1>

            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-xl leading-relaxed">
              Trusted UK-based agency for premium Hajj & Umrah packages, worldwide flights, and seamless NADRA & Visa assistance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-[#0D2B1D] font-bold h-14 px-8 text-base shadow-lg">
                <Link href="/hajj-umrah">View Umrah Packages</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white h-14 px-8 text-base backdrop-blur-sm">
                <a href={`tel:${PHONE_INTL}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {PHONE}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
