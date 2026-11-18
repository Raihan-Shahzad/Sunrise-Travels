import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, PlaneTakeoff, Heart, Medal } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  { label: "Years Experience", value: 15, suffix: "+", icon: Medal },
  { label: "Happy Customers", value: 10, suffix: "k+", icon: Heart },
  { label: "Flights Booked", value: 25, suffix: "k+", icon: PlaneTakeoff },
  { label: "Pilgrims Assisted", value: 8, suffix: "k+", icon: Users },
];

function CountUpNumber({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [end, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative bg-slate-100 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our Track Record"
          title="Numbers that speak volumes"
          className="mb-12"
        />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center border-t-2 border-primary/15 pt-6 text-center"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-accent-600 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-1 flex items-center font-heading text-4xl font-semibold text-primary md:text-5xl">
                  <CountUpNumber end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
