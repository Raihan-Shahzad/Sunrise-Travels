"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, PlaneTakeoff, Heart, Medal } from "lucide-react";

const stats = [
  { label: "Years Experience", value: 15, suffix: "+", icon: Medal },
  { label: "Happy Customers", value: 10, suffix: "k+", icon: Heart },
  { label: "Flights Booked", value: 25, suffix: "k+", icon: PlaneTakeoff },
  { label: "Pilgrims Assisted", value: 8, suffix: "k+", icon: Users },
];

function CountUpNumber({ end, suffix }: { end: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-slate-900 mb-12">
          Numbers That Speak Volumes
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={s.label} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center">
                  <CountUpNumber end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-slate-600 font-medium">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}