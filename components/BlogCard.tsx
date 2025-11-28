// components/BlogCard.tsx
"use client"
import Link from "next/link";
import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react";
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
    <article className="group bg-white border border-gray-200 hover:border-black transition-all duration-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md">
      {/* Image */}
      <Link href={`/blogs/${post.slug}`} onClick={handleClick} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
            <>
              <img 
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Category Badge on Image */}
          {post._embedded?.['wp:term']?.[0]?.[0] && (
            <div className="absolute top-2 left-2">
              <Link 
                href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
                className="inline-block px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider hover:bg-black transition-colors rounded"
                onClick={(e) => e.stopPropagation()}
              >
                {post._embedded['wp:term'][0][0].name}
              </Link>
            </div>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-3.5">
        {/* Title */}
        <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors">
          <Link href={`/${post.slug}`} onClick={handleClick}>
            {post.title.rendered}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
          {stripHtml(post.excerpt.rendered)}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              {getReadTime(post.content.rendered)}m
            </span>
          </div>
          
          {/* Read More Link */}
          <Link 
            href={`/${post.slug}`}
            onClick={handleClick}
            className="text-[10px] font-bold text-black hover:text-gray-600 uppercase tracking-wider transition-colors flex items-center gap-0.5"
          >
            Read
            <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};
