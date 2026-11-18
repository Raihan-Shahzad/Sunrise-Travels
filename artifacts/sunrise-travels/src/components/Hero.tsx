import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Star, MapPin } from "lucide-react";
import { PHONE, PHONE_INTL } from "@/lib/site-config";
import { Link } from "wouter";

const ASSET_BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-[#04120F]">
      {/* Destination photography */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${ASSET_BASE}images/makkah-kaaba.jpg')` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#04120F]/96 via-[#04120F]/78 to-[#04120F]/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#04120F] via-transparent to-[#04120F]/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_15%_85%,rgba(200,146,43,0.22),transparent_70%)]" />

      {/* Islamic geometric overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-medium tracking-wide text-white/90 md:text-sm">
                4.9/5 · Trusted by thousands of UK Muslims
              </span>
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
              ✦ بسم الله الرحمن الرحيم ✦
            </p>

            <h1 className="font-heading text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Your Journey to the{" "}
              <span className="italic text-amber-300">Sacred Places</span>{" "}
              Begins Here
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-emerald-50/85 md:text-xl">
              A trusted UK travel agency for premium Hajj &amp; Umrah packages, worldwide
              flights, and seamless NADRA, visa &amp; passport assistance.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-xl bg-amber-500 px-8 text-base font-bold text-[#0D2B1D] shadow-lg shadow-black/30 transition-colors hover:bg-amber-400"
              >
                <Link href="/hajj-umrah">View Umrah Packages</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-xl border-white/30 bg-white/10 px-8 text-base text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              >
                <a href={`tel:${PHONE_INTL}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {PHONE}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom destination strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/10 bg-[#04120F]/55 backdrop-blur-md md:block">
        <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4 text-xs uppercase tracking-[0.2em] text-emerald-50/70">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-amber-300" /> Luton · United Kingdom
          </span>
          <span className="flex items-center gap-5">
            <span>Makkah</span>
            <span className="text-amber-300/60">·</span>
            <span>Madinah</span>
            <span className="text-amber-300/60">·</span>
            <span>Pakistan</span>
            <span className="text-amber-300/60">·</span>
            <span>Worldwide</span>
          </span>
        </div>
      </div>
    </section>
  );
}
