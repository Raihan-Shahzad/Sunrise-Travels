import { defaultMetadata } from "@/app/(components)/seo/Meta";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

export const metadata = {
  ...defaultMetadata,
  title: "Travel Blog & News | Sunrise Travels",
  description: "Latest updates, travel tips, Hajj & Umrah guides, and news from Sunrise Travels.",
};

const posts = [
  {
    id: 1,
    slug: "essential-hajj-packing-list-2024",
    title: "The Essential Hajj Packing List for 2024",
    excerpt: "Preparing for Hajj can be overwhelming. Here is our comprehensive packing guide to ensure you have everything you need for your spiritual journey.",
    date: "May 15, 2024",
    category: "Hajj & Umrah"
  },
  {
    id: 2,
    slug: "latest-nicop-renewal-guidelines",
    title: "Latest Guidelines for NICOP Renewal from the UK",
    excerpt: "NADRA has recently updated some procedures for Overseas Pakistanis. Read our guide on what documents are currently required for a smooth renewal process.",
    date: "April 28, 2024",
    category: "NADRA Assistance"
  },
  {
    id: 3,
    slug: "top-5-family-destinations-pakistan",
    title: "Top 5 Family Destinations to Visit in Pakistan",
    excerpt: "Planning a family trip back home? Discover the most family-friendly spots from the northern valleys to historical landmarks.",
    date: "April 10, 2024",
    category: "Travel Guides"
  },
  {
    id: 4,
    slug: "understanding-umrah-evisa",
    title: "Understanding the New Saudi Umrah E-Visa System",
    excerpt: "The Saudi government has made obtaining an Umrah visa easier than ever. Here is a step-by-step breakdown of how the new e-Visa system works.",
    date: "March 22, 2024",
    category: "Hajj & Umrah"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-primary text-white py-20 mb-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Travel Blog & News
          </h1>
          <p className="text-xl text-primary-100 leading-relaxed">
            Stay updated with the latest travel tips, destination guides, and essential visa/NADRA updates.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full">{post.category}</span>
                <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              </div>
              <h2 className="font-heading text-2xl font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-semibold text-primary hover:text-primary-600 transition-colors">
                Read Full Article <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
