"use client";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  post: {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    _embedded?: {
      'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
      'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
      author?: Array<{ name: string; avatar_urls?: { '48': string } }>;
    };
  };
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  const getReadTime = (content: string): number => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsNavigating(true);
    router.push(`/${post.slug}`);
  };

  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <Link href={`/${post.slug}`} onClick={handleClick} className="relative block aspect-[4/3] overflow-hidden">
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
          <>
            <img 
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <MapPin className="w-10 h-10 text-gray-300" />
          </div>
        )}

        {/* Floating Category Badge */}
        {post._embedded?.['wp:term']?.[0]?.[0] && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm shadow-sm text-xs font-bold text-gray-900 rounded-full uppercase tracking-wide">
              {post._embedded['wp:term'][0][0].name}
            </span>
          </div>
        )}
      </Link>
      
      {/* Content Body */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Date & Read Time Row */}
        <div className="flex items-center gap-3 text-xs font-medium text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {getReadTime(post.content.rendered)} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors">
          <Link href={`/${post.slug}`} onClick={handleClick}>
            {post.title.rendered}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2 flex-1">
          {stripHtml(post.excerpt.rendered)}
        </p>
        
        {/* Footer: Author & Action */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
               {/* Fallback Initial or Author Image if available */}
               <span className="text-[10px] font-bold text-gray-500">
                 {post._embedded?.author?.[0]?.name?.charAt(0) || "A"}
               </span>
            </div>
            <span className="text-xs font-semibold text-gray-600 truncate max-w-[100px]">
              {post._embedded?.author?.[0]?.name || "ClubMyTrip"}
            </span>
          </div>

          <Link 
            href={`/${post.slug}`}
            onClick={handleClick}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform"
          >
            Read Post
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
