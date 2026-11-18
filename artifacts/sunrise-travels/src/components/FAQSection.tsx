import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

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
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeading
          eyebrow="Common Questions"
          title="Frequently asked questions"
          className="mb-14"
        />

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="flex w-full items-center justify-between gap-8 py-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-heading text-lg font-semibold text-slate-900 md:text-xl">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-accent-600" : "text-slate-400"
                  }`}
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
                    <div className="max-w-3xl pb-6 leading-relaxed text-slate-600">
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
