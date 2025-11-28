// components/LatestPostsGrid.tsx
"use client"
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";

interface Post {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

interface LatestPostsGridProps {
  posts: Post[];
  isLoading?: boolean;
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  currentPage?: number;
  totalPages?: number;
  searchTerm?: string;
  categorySlug?: string;
}

export function LatestPostsGrid({
  posts,
  isLoading = false,
  title = "Latest Travel Stories",
  showViewAll = true,
  viewAllLink = "/blogs",
  currentPage,
  totalPages,
  searchTerm,
  categorySlug
}: LatestPostsGridProps) {
  
  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-8">
        {title && (
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              Fresh perspectives and expert insights from around the world
            </p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // No Posts State
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 border-4 border-gray-200 mx-auto mb-6 flex items-center justify-center">
          <MapPin className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
        <p className="text-gray-600 mb-8">
          {searchTerm 
            ? `No results found for "${searchTerm}". Try a different search.`
            : 'Check back soon for new travel stories and guides.'}
        </p>
        <Button asChild className="bg-black hover:bg-gray-800">
          <Link href="/blogs">Browse All Articles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      {title && (
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : title}
          </h2>
          <p className="text-lg text-gray-600">
            {searchTerm 
              ? `Found ${posts.length} ${posts.length === 1 ? 'article' : 'articles'}`
              : 'Fresh perspectives and expert insights from around the world'}
          </p>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination or View All Button */}
      {totalPages && totalPages > 1 ? (
        <div className="flex items-center justify-between pt-8 border-t-2 border-gray-200">
          <div>
            {currentPage && currentPage > 1 && (
              <Button 
                variant="outline" 
                asChild
                className="border-2 border-gray-200 hover:border-black"
              >
                <Link 
                  href={`/blogs?page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ''}${categorySlug ? `&category=${categorySlug}` : ''}`}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Link>
              </Button>
            )}
          </div>

          <div className="text-sm font-semibold text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div>
            {currentPage && currentPage < totalPages && (
              <Button 
                variant="outline" 
                asChild
                className="border-2 border-gray-200 hover:border-black"
              >
                <Link 
                  href={`/blogs?page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ''}${categorySlug ? `&category=${categorySlug}` : ''}`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      ) : showViewAll ? (
        <div className="text-center pt-8">
          <Button 
            size="lg" 
            asChild
            className="bg-black hover:bg-gray-800 text-white font-semibold px-10"
          >
            <Link href={viewAllLink}>
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
