import { motion } from "framer-motion";
import { Link } from "wouter";

const destinations = [
  {
    name: "Makkah",
    sub: "Saudi Arabia",
    image: "https://images.unsplash.com/photo-1565552643983-c65d9147a2b0?q=80&w=800&auto=format&fit=crop",
    price: "Umrah from £850",
    link: "/hajj-umrah",
  },
  {
    name: "Madinah",
    sub: "Saudi Arabia",
    image: "https://images.unsplash.com/photo-1591604130424-a8e22e50e8c6?q=80&w=800&auto=format&fit=crop",
    price: "Packages from £850",
    link: "/hajj-umrah",
  },
  {
    name: "Lahore",
    sub: "Pakistan",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=800&auto=format&fit=crop",
    price: "Flights from £550",
    link: "/flights",
  },
  {
    name: "Islamabad",
    sub: "Pakistan",
    image: "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?q=80&w=800&auto=format&fit=crop",
    price: "Flights from £530",
    link: "/flights",
  },
  {
    name: "Dubai",
    sub: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    price: "Flights from £350",
    link: "/flights",
  },
  {
    name: "Istanbul",
    sub: "Turkey",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
    price: "Flights from £250",
    link: "/flights",
  },
  {
    name: "Karachi",
    sub: "Pakistan",
    image: "https://images.unsplash.com/photo-1609686664285-1e278e8cee20?q=80&w=800&auto=format&fit=crop",
    price: "Flights from £520",
    link: "/flights",
  },
  {
    name: "Kuala Lumpur",
    sub: "Malaysia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
    price: "Flights from £650",
    link: "/flights",
  },
];

export default function DestinationGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Popular Routes</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Top Destinations
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From the holy cities of Makkah and Madinah to the heart of Pakistan — we fly you there with the best fares and service.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((d, index) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
            >
              <Link href={d.link} className="block w-full h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-slate-700"
                  style={{ backgroundImage: `url('${d.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 text-white">
                  <h3 className="font-heading text-xl font-bold leading-tight">{d.name}</h3>
                  <p className="text-xs text-slate-300 mb-1">{d.sub}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-semibold text-xs">{d.price}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Book →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
