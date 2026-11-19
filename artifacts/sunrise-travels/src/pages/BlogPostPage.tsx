import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";

const ASSET_BASE = import.meta.env.BASE_URL;

const covers: Record<string, string> = {
  "essential-hajj-packing-list-2024": `${ASSET_BASE}images/makkah-kaaba.jpg`,
  "latest-nicop-renewal-guidelines": `${ASSET_BASE}images/pakistan-flag.jpg`,
  "top-5-family-destinations-pakistan": `${ASSET_BASE}images/destinations/pakistan.jpg`,
  "understanding-umrah-evisa": `${ASSET_BASE}images/madinah-masjid-nabawi.jpg`,
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const cover = covers[slug] ?? `${ASSET_BASE}images/makkah-kaaba.jpg`;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="relative h-[300px] w-full overflow-hidden bg-[#04120F] md:h-[380px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${cover}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04120F] via-[#04120F]/55 to-[#04120F]/30" />
      </div>

      <div className="container mx-auto -mt-28 max-w-3xl px-4">
        <Link href="/blog" className="mb-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.12em] text-white/80 hover:text-amber-300">
          <ArrowLeft className="w-4 h-4 mr-2" /> All articles
        </Link>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>Published recently</span>
          </div>

          <h1 className="mb-8 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="lead mb-8 text-xl text-slate-600">
              This is a placeholder for the blog post content. In a fully implemented CMS or Markdown-backed blog, the actual content for <strong>{slug}</strong> would be rendered here.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>Key Information</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul>
              <li>First important point to consider</li>
              <li>Second essential requirement</li>
              <li>Third step in the process</li>
            </ul>
            <blockquote>"Travel is the only thing you buy that makes you richer."</blockquote>
            <p>
              For personalized assistance regarding the topics discussed in this article, please don't hesitate to contact our expert team at our Luton office.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
