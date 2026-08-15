import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-16">
        <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          What Our Clients Say
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Real feedback from our Google Business profile — 4.6/5 from 22 reviews.
        </p>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold hover:text-amber-300">
          Read all Google reviews <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {scrollItems.map((t, i) => (
            <div
              key={i}
              className="min-w-[320px] md:min-w-[400px] bg-slate-800 border border-slate-700 p-8 rounded-2xl shrink-0"
            >
              <div className="flex text-[#F5A623] mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-lg italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-slate-500">{t.date}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
