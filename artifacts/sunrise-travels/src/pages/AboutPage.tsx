import { Users, HeartHandshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow="Our Story"
        title="Connecting Communities, Fulfilling Journeys"
        subtitle="Since 2008, Sunrise Travels has been the trusted name in Luton and across the UK for premium travel services, specializing in Hajj, Umrah, and worldwide flights."
        image="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2000&auto=format&fit=crop"
        imagePosition="center 35%"
        size="tall"
      />

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#04120F]/60 via-transparent to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="eyebrow mb-2 text-amber-300">Luton, UK</p>
              <p className="font-heading text-xl font-semibold">Your journey, handled with care</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-4 text-slate-900">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To provide seamless, reliable, and affordable travel solutions to the UK Muslim and Pakistani communities, ensuring that every journey—whether for family reunions or sacred pilgrimages—is handled with utmost care and professionalism.
              </p>
            </div>

            <div className="pl-6 border-l-4 border-accent">
              <h3 className="font-bold text-xl mb-2 text-slate-900">Why Customers Trust Us</h3>
              <p className="text-slate-600">
                We believe in transparency, competitive pricing, and building long-term relationships. Our team doesn't just sell tickets; we provide comprehensive travel consultancy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <span className="font-semibold text-slate-900">15+ Years Exp.</span>
              </div>
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-8 h-8 text-primary" />
                <span className="font-semibold text-slate-900">Personal Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <SectionHeading eyebrow="Our Impact" title="Our impact over the years" className="mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-slate-600 font-medium">Years in Business</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">25k+</div>
              <div className="text-slate-600 font-medium">Flights Booked</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">8k+</div>
              <div className="text-slate-600 font-medium">Pilgrims Assisted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10k+</div>
              <div className="text-slate-600 font-medium">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
