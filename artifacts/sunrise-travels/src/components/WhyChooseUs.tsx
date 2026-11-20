import { CheckCircle2, Users, ShieldCheck, HeartHandshake, Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ASSET_BASE = import.meta.env.BASE_URL;

const reasons = [
  { title: "Trusted Experts", icon: ShieldCheck, desc: "Over 15 years of industry experience." },
  { title: "Personal Service", icon: HeartHandshake, desc: "Dedicated agents for your specific needs." },
  { title: "Competitive Prices", icon: Trophy, desc: "We guarantee the best fares and rates." },
  { title: "UK-Based Support", icon: Users, desc: "Local Luton office with real human support." },
  { title: "Fast Response", icon: Zap, desc: "Instant WhatsApp replies and call backs." },
  { title: "Community Reputation", icon: CheckCircle2, desc: "Highest rated travel agency in Luton." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-24 text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${ASSET_BASE}images/madinah-masjid-nabawi.jpg')` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#04120F]/95 via-primary/90 to-[#04120F]/85" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <span className="eyebrow mb-4 text-amber-300">Our Promise</span>
              <h2 className="font-heading text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
                Why choose Sunrise Travels?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-100">
                We go beyond just booking tickets. We provide complete peace of mind through expert
                consultation, dedicated support, and unmatched industry knowledge. Your journey is
                our priority.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-14 rounded-xl bg-accent px-8 font-semibold text-primary hover:bg-accent/85">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-semibold">{r.title}</h3>
                  <p className="text-sm text-primary-100">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
