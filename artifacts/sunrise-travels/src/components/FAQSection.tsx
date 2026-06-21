import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do you only provide flights to Pakistan?",
    answer: "No, while we specialize in travel to Pakistan and Saudi Arabia, we offer highly competitive worldwide flights to any destination. We work with all major airlines including Emirates, Qatar Airways, British Airways, and more."
  },
  {
    question: "What is included in your Umrah packages?",
    answer: "Our comprehensive Umrah packages typically include return flights, Umrah visa processing, accommodation in Makkah and Madinah, transportation between airports and hotels, and guided Ziyarah tours. We offer Economy, Standard, and Premium tiers to suit your budget."
  },
  {
    question: "How long does a NADRA NICOP application take?",
    answer: "Processing times vary depending on the service tier chosen. Fast-track applications can take 7-10 working days, while standard processing usually takes 3-4 weeks. We ensure your application is submitted correctly to avoid unnecessary delays."
  },
  {
    question: "Can you help me if I've lost my Pakistani passport?",
    answer: "Yes, we provide full assistance for lost, damaged, or expired Pakistani passports. We guide you through the required documentation, help fill out the forms, and assist with booking your appointment at the consulate."
  },
  {
    question: "Are my flight bookings financially protected?",
    answer: "Yes, Sunrise Travels is ATOL protected and IATA accredited. Your financial security and peace of mind are guaranteed when booking flights and package holidays with us."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Common Questions</span>
          <h2 className="font-heading text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-slate-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
