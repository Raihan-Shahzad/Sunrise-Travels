import { Link } from "wouter";
import { Calendar, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const ASSET_BASE = import.meta.env.BASE_URL;

const posts = [
  {
    id: 1,
    slug: "essential-hajj-packing-list-2024",
    title: "The Essential Hajj Packing List for 2024",
    excerpt: "Preparing for Hajj can be overwhelming. Here is our comprehensive packing guide to ensure you have everything you need for your spiritual journey.",
    date: "May 15, 2024",
    category: "Hajj & Umrah",
    image: `${ASSET_BASE}images/makkah-kaaba.jpg`,
  },
  {
    id: 2,
    slug: "latest-nicop-renewal-guidelines",
    title: "Latest Guidelines for NICOP Renewal from the UK",
    excerpt: "NADRA has recently updated some procedures for Overseas Pakistanis. Read our guide on what documents are currently required for a smooth renewal process.",
    date: "April 28, 2024",
    category: "NADRA Assistance",
    image: `${ASSET_BASE}images/pakistan-flag.jpg`,
  },
  {
    id: 3,
    slug: "top-5-family-destinations-pakistan",
    title: "Top 5 Family Destinations to Visit in Pakistan",
    excerpt: "Planning a family trip back home? Discover the most family-friendly spots from the northern valleys to historical landmarks.",
    date: "April 10, 2024",
    category: "Travel Guides",
    image: `${ASSET_BASE}images/destinations/pakistan.jpg`,
  },
  {
    id: 4,
    slug: "understanding-umrah-evisa",
    title: "Understanding the New Saudi Umrah E-Visa System",
    excerpt: "The Saudi government has made obtaining an Umrah visa easier than ever. Here is a step-by-step breakdown of how the new e-Visa system works.",
    date: "March 22, 2024",
    category: "Hajj & Umrah",
    image: `${ASSET_BASE}images/madinah-masjid-nabawi.jpg`,
  }
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <PageHero
        eyebrow="Travel Journal"
        title="Travel Blog & News"
        subtitle="Stay updated with the latest travel tips, destination guides, and essential visa/NADRA updates."
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="container mx-auto -mt-10 max-w-5xl px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="photo-scrim absolute inset-0" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#04120F]/55 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber-300 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="p-7">
                <span className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <Calendar className="h-3.5 w-3.5" /> {post.date}
                </span>
                <h2 className="mb-3 font-heading text-2xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mb-5 leading-relaxed text-slate-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.12em] text-accent-600 hover:text-primary">
                  Read article <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
