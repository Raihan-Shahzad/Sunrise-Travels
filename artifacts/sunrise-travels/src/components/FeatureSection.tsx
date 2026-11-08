import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Building2, Ticket, FileText, FileCheck, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import SectionHeading from "@/components/SectionHeading";

const ASSET_BASE = import.meta.env.BASE_URL;

const features = [
  {
    title: "Worldwide Flights",
    icon: Plane,
    description: "Competitive fares to every major global hub.",
    link: "/flights",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Hajj Packages",
    icon: BookOpen,
    description: "All-inclusive pilgrimage solutions.",
    link: "/hajj-umrah",
    image: `${ASSET_BASE}images/makkah-kaaba.jpg`,
  },
  {
    title: "Umrah Packages",
    icon: Building2,
    description: "Flexible Umrah trips for families and groups.",
    link: "/hajj-umrah",
    image: `${ASSET_BASE}images/madinah-masjid-nabawi.jpg`,
  },
  {
    title: "NADRA Guidance",
    icon: FileCheck,
    description: "New or renewed NICOPs, lost or damaged replacements, and other queries.",
    link: "/nadra-assistance",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Pakistani Visa Assistance",
    icon: FileText,
    description: "New visas, renewals, extensions, and other Pakistani visa queries.",
    link: "/pakistani-visa-assistance",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Passport Assistance",
    icon: Ticket,
    description: "New passports, renewals, lost or damaged replacements, and other queries.",
    link: "/passport-assistance",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=900&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeatureSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-[10%] top-[60%] h-[60%] w-[40%] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          eyebrow="Our Services"
          title="Travel, planned end to end"
          subtitle="From booking your dream flight to handling complex visa paperwork — one team for the whole journey."
          className="mb-14 md:mb-16"
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={itemVariants}>
                <Link href={f.link} className="group block h-full">
                  <Card className="h-full gap-0 overflow-hidden border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={f.image}
                        alt={f.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="photo-scrim absolute inset-0" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-amber-300 backdrop-blur-md">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/85">
                          Sunrise Travels
                        </span>
                      </div>
                    </div>
                    <CardHeader className="px-6 pb-2 pt-6">
                      <CardTitle className="font-heading text-2xl font-semibold leading-snug transition-colors group-hover:text-primary">
                        {f.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <p className="mb-4 leading-relaxed text-slate-600">{f.description}</p>
                      <span className="flex items-center text-sm font-semibold text-accent-600 group-hover:underline">
                        Explore
                        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
