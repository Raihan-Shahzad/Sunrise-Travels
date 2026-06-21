import { defaultMetadata } from "@/app/(components)/seo/Meta";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real app, fetch post data based on slug to generate specific metadata
  return {
    ...defaultMetadata,
    title: `${params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Sunrise Travels Blog`,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-3xl pt-16">
        <Link href="/blog" className="inline-flex items-center text-primary font-medium mb-12 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>
        
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-slate-500 mb-6">
            <Calendar className="w-5 h-5" />
            <span>Published recently</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {title}
          </h1>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="lead text-xl text-slate-600 mb-8">
              This is a placeholder for the blog post content. In a fully implemented CMS or Markdown-backed blog, the actual content for <strong>{params.slug}</strong> would be rendered here.
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
            
            <blockquote>
              "Travel is the only thing you buy that makes you richer."
            </blockquote>
            
            <p>
              For personalized assistance regarding the topics discussed in this article, please don't hesitate to contact our expert team at our Luton office.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
