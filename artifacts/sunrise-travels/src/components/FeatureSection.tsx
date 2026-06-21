import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Building2, Ticket, FileText, FileCheck, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const features = [
  { title: "Worldwide Flights", icon: Plane, description: "Competitive fares to every major global hub.", link: "/flights" },
  { title: "Hajj Packages", icon: BookOpen, description: "All-inclusive pilgrimage solutions.", link: "/hajj-umrah" },
  { title: "Umrah Packages", icon: Building2, description: "Flexible Umrah trips for families and groups.", link: "/hajj-umrah" },
  { title: "NADRA Guidance", icon: FileCheck, description: "Expert help with NICOP, POC & FRC applications.", link: "/nadra-assistance" },
  { title: "Visa Assistance", icon: FileText, description: "Step-by-step support for all Pakistani visas.", link: "/pakistani-visa-assistance" },
  { title: "Passport Assistance", icon: Ticket, description: "Renew, replace or apply for new passports.", link: "/passport-assistance" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FeatureSection() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive Travel Solutions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From booking your dream flight to handling complex visa applications, we offer end-to-end services tailored for you.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={itemVariants}>
                <Link href={f.link} className="block group">
                  <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                        {f.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed mb-4">{f.description}</p>
                      <span className="text-primary font-medium text-sm flex items-center group-hover:underline">
                        Learn more <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
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
