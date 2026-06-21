"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/(components)/ui/button";
import { Phone, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full bg-slate-900 flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
              <div className="flex text-[#F5A623]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 Best Rated Travel Agency</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Journey to the <span className="text-accent">Sacred Places</span> Begins Here
            </h1>
            
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl">
              Trusted UK-based agency for premium Hajj & Umrah packages, worldwide flights, and seamless NADRA & Visa assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-600 text-white h-14 px-8 text-lg">
                <a href="/contact">Book Your Consultation</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white h-14 px-8 text-lg backdrop-blur-sm">
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_INTL}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {process.env.NEXT_PUBLIC_PHONE}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}