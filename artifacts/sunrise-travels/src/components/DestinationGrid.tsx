import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const ASSET_BASE = import.meta.env.BASE_URL;

const destinations = [
  {
    name: "Makkah",
    sub: "Saudi Arabia",
    image: `${ASSET_BASE}images/makkah-kaaba.jpg`,
    price: "Umrah from £850",
    link: "/umrah",
  },
  {
    name: "Madinah",
    sub: "Saudi Arabia",
    image: `${ASSET_BASE}images/madinah-masjid-nabawi.jpg`,
    price: "Packages from £850",
    link: "/umrah",
  },
  {
    name: "Lahore",
    sub: "Pakistan",
    image: `${ASSET_BASE}images/destinations/lahore.jpg`,
    price: "Flights from £550",
    link: "/flights",
  },
  {
    name: "Islamabad",
    sub: "Pakistan",
    image: `${ASSET_BASE}images/destinations/islamabad.jpg`,
    price: "Flights from £530",
    link: "/flights",
  },
  {
    name: "Dubai",
    sub: "UAE",
    image: `${ASSET_BASE}images/destinations/dubai.jpg`,
    price: "Flights from £350",
    link: "/flights",
  },
  {
    name: "Istanbul",
    sub: "Turkey",
    image: `${ASSET_BASE}images/destinations/istanbul.jpg`,
    price: "Flights from £250",
    link: "/flights",
  },
  {
    name: "Karachi",
    sub: "Pakistan",
    image: `${ASSET_BASE}images/destinations/karachi.jpg`,
    price: "Flights from £520",
    link: "/flights",
  },
  {
    name: "Kuala Lumpur",
    sub: "Malaysia",
    image: `${ASSET_BASE}images/destinations/kuala-lumpur.jpg`,
    price: "Flights from £650",
    link: "/flights",
  },
];

export default function DestinationGrid() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Popular Routes"
            title="Where will you go next?"
            subtitle="From the holy cities of Makkah and Madinah to the heart of Pakistan — we fly you there with the best fares and service."
          />
          <Link
            href="/flights"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary hover:text-accent-600"
          >
            All routes <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {destinations.map((d, index) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative block overflow-hidden rounded-[1.4rem]"
            >
              <Link href={d.link} className="block h-full w-full">
                <div className="relative aspect-[3/4] w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-slate-700 transition-transform duration-[900ms] group-hover:scale-110"
                    style={{ backgroundImage: `url('${d.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04120F]/95 via-[#04120F]/35 to-[#04120F]/10 transition-opacity group-hover:from-[#04120F]/98" />

                  <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-[#04120F]/45 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
                    {d.sub}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                    <h3 className="font-heading text-2xl font-semibold leading-tight md:text-[1.7rem]">
                      {d.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-amber-300">{d.price}</p>
                    <span className="mt-2 flex translate-y-1 items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Book now <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-accent-600" />
          Don&apos;t see your city? Call us — we book worldwide.
        </div>
      </div>
    </section>
  );
}
