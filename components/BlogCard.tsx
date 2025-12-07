// components/BlogCard.tsx
"use client"
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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsNavigating(true);
    router.push(`/${post.slug}`);
  };

  return (
    <article className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
      {/* Image Section */}
      <Link href={`/${post.slug}`} onClick={handleClick} className="relative block aspect-[4/3] overflow-hidden">
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
          <>
            <img 
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <MapPin className="w-10 h-10 text-gray-300" />
          </div>
        )}
        
        {/* Floating Category Badge (Premium White Pill) */}
        {post._embedded?.['wp:term']?.[0]?.[0] && (
          <div className="absolute top-4 left-4 z-10">
            <Link 
              href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
              className="inline-block px-3 py-1 bg-white/95 backdrop-blur-md shadow-sm text-gray-900 text-[10px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              {post._embedded['wp:term'][0][0].name}
            </Link>
          </div>
        )}
      </Link>
      
      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Meta Info (Top) */}
        <div className="flex items-center gap-3 text-xs font-medium text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1.5">
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
        
        {/* Footer Link */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link 
            href={`/${post.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-emerald-600 uppercase tracking-wide transition-colors group/link"
          >
            Read Article
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
