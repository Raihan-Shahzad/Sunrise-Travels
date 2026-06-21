import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Aisha Khan", rating: 5, text: "Sunrise Travels handled my Umrah from start to finish—no stress at all! The hotel was very close to the Haram.", date: "March 2024" },
  { name: "Rashid Ahmed", rating: 5, text: "Great pricing on flights to Pakistan and the team helped with my NICOP renewal when I was struggling.", date: "May 2024" },
  { name: "Sadia Ali", rating: 5, text: "Friendly staff, quick WhatsApp replies, and the visa help was spot-on. Highly recommended for families.", date: "February 2024" },
  { name: "Tariq Mahmood", rating: 5, text: "Been using them for 10 years. Always the best prices for PIA and Emirates. Trustworthy brothers.", date: "April 2024" },
  { name: "Fatima Noor", rating: 5, text: "Hajj 2023 was incredibly well organized. They guided us every step of the way. May Allah reward them.", date: "July 2023" },
];

const scrollItems = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-16">
        <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          What Our Clients Say
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Read reviews from thousands of satisfied travelers and pilgrims.
        </p>
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
