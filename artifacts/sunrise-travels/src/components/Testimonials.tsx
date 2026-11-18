import { Star } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  { name: "Loves travel", rating: 5, text: "Excellent customer service! I've been using Sunrise Travel for the past five years.", date: "Google review" },
  { name: "Ifzana Begum", rating: 5, text: "The staff were super-responsive, polite and extremely knowledgeable.", date: "Google review" },
  { name: "Muhammad Hafeez", rating: 5, text: "I've been buying tickets from Sunrise Travels for 9 years now, and the team has always been very helpful.", date: "Google review" },
  { name: "MUHAAMAD ALTAF", rating: 5, text: "Excellent service, very pleased with prices and staff is very cooperative. Highly recommended.", date: "Google review" },
  { name: "Tabz Khan", rating: 5, text: "Cheap flights, help with NADRA ID cards and visas, and staff who are great help.", date: "Google review" },
  { name: "Saqib Malik", rating: 5, text: "Excellent customer service. Helped me in finding the best flight deals.", date: "Google review" },
];

const scrollItems = [...testimonials, ...testimonials];
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Sunrise+Travels+Centre+ltd/@51.8859051,-0.4320476,17z/data=!4m16!1m7!3m6!1s0x48764857d56874fd:0xdcb88ea4a349edc3!2sSunrise+Travels+Centre+ltd!8m2!3d51.8859018!4d-0.4294727!16s%2Fg%2F1w0h6_px!3m7!1s0x48764857d56874fd:0xdcb88ea4a349edc3!8m2!3d51.8859018!4d-0.4294727!9m1!1b1!16s%2Fg%2F1w0h6_px";

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-[#071B17] py-24 text-white">
      <div className="container mx-auto mb-14 px-4">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="What our clients say"
          subtitle="Real feedback from our Google Business profile — 4.6/5 from 22 reviews."
        />
        <div className="mt-5 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
          >
            Read all Google reviews <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#071B17] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#071B17] to-transparent md:w-28" />
        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {scrollItems.map((t, i) => (
            <div
              key={i}
              className="min-w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:min-w-[400px]"
            >
              <div className="mb-6 flex text-amber-300">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mb-6 font-heading text-lg italic leading-relaxed text-emerald-50/90">
                “{t.text}”
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-50/40">{t.date}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
