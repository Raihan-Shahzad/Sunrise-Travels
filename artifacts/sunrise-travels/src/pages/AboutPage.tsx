import { ShieldCheck, Users, Trophy, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')"}}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Connecting Communities, Fulfilling Journeys
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Since 2008, Sunrise Travels has been the trusted name in Luton and across the UK for premium travel services, specializing in Hajj, Umrah, and worldwide flights.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop')"}}></div>
            <div className="absolute inset-0 bg-primary/20"></div>
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
                <ShieldCheck className="w-8 h-8 text-primary" />
                <span className="font-semibold text-slate-900">ATOL Protected</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-primary" />
                <span className="font-semibold text-slate-900">IATA Accredited</span>
              </div>
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
          <h2 className="font-heading text-3xl font-bold mb-12 text-slate-900">Our Impact Over the Years</h2>
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
