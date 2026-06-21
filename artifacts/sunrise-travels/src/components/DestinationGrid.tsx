import { motion } from "framer-motion";
import { Link } from "wouter";

const destinations = [
  { name: "Pakistan", image: "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?q=80&w=800&auto=format&fit=crop", price: "from £550" },
  { name: "Saudi Arabia", image: "https://images.unsplash.com/photo-1565552643983-c65d9147a2b0?q=80&w=800&auto=format&fit=crop", price: "from £450" },
  { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop", price: "from £350" },
  { name: "Turkey", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop", price: "from £250" },
  { name: "Malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop", price: "from £650" },
  { name: "Thailand", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop", price: "from £500" },
  { name: "USA", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop", price: "from £450" },
  { name: "Canada", image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?q=80&w=800&auto=format&fit=crop", price: "from £450" },
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
            Discover our most booked flight routes. We guarantee competitive fares and excellent service to these top locations.
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
              <Link href={`/flights`} className="block w-full h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-slate-700"
                  style={{ backgroundImage: `url('${d.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white transform transition-transform duration-300">
                  <h3 className="font-heading text-xl md:text-2xl font-bold mb-1">{d.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-accent font-medium text-sm md:text-base">{d.price}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Book Now
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
