"use client";

import { CheckCircle2, Users, ShieldCheck, HeartHandshake, Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/(components)/ui/button";

const reasons = [
  { title: "Trusted Experts", icon: ShieldCheck, desc: "Over 15 years of industry experience." },
  { title: "Personal Service", icon: HeartHandshake, desc: "Dedicated agents for your specific needs." },
  { title: "Competitive Prices", icon: Trophy, desc: "We guarantee the best fares and rates." },
  { title: "UK‑Based Support", icon: Users, desc: "Local Luton office with real human support." },
  { title: "Fast Response", icon: Zap, desc: "Instant WhatsApp replies and call backs." },
  { title: "Community Reputation", icon: CheckCircle2, desc: "Highest rated travel agency in Luton." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-primary text-white py-24 relative overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Our Promise</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Why Choose Sunrise Travels?
              </h2>
              <p className="text-primary-100 text-lg leading-relaxed">
                We go beyond just booking tickets. We provide complete peace of mind through expert consultation, dedicated support, and unmatched industry knowledge. Your journey is our priority.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-white font-semibold h-14 px-8">
                <a href="/about">Discover Our Story</a>
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{r.title}</h3>
                  <p className="text-primary-100 text-sm">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}