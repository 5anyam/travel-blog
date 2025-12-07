"use client";
import { Calendar, Search, X, ChevronDown, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import Link from "next/link";
import { useState, useEffect } from "react";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  categories: number[];
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{ name: string }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Single Line Header + Search/Filter Combined
const CompactHeader = ({ 
  totalPosts,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange 
}: {
  totalPosts: number;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <Container>
        <div className="py-2.5 flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Title + Breadcrumb */}
          <div className="flex items-center gap-4 lg:min-w-fit">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Link href="/" className="text-[10px] text-gray-500 hover:text-black">
                  Home
                </Link>
                <span className="text-[10px] text-gray-400">/</span>
                <span className="text-[10px] text-gray-600 font-semibold">Articles</span>
              </div>
              <h1 className="text-base lg:text-lg font-bold text-gray-900">
                Travel Articles <span className="text-xs font-normal text-gray-500">({totalPosts})</span>
              </h1>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex-1 flex gap-2">
            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-xs rounded"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative w-32 sm:w-36">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full px-2.5 py-1.5 border border-gray-300 hover:border-black bg-white text-left flex items-center justify-between text-xs font-medium transition-colors rounded"
              >
                <span className="truncate">
                  {selectedCategory === 'all' 
                    ? 'Category' 
                    : categories.find(c => c.slug === selectedCategory)?.name || 'Category'}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform flex-shrink-0 ml-1 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg max-h-56 overflow-y-auto z-50 rounded">
                    <button
                      onClick={() => {
                        onCategoryChange('all');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 text-left text-xs hover:bg-gray-50 ${
                        selectedCategory === 'all' ? 'bg-gray-100 font-semibold' : ''
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          onCategoryChange(category.slug);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full px-2.5 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center justify-between ${
                          selectedCategory === category.slug ? 'bg-gray-100 font-semibold' : ''
                        }`}
                      >
                        <span className="truncate">{category.name}</span>
                        <span className="text-gray-400 text-[10px] ml-1">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Quick Categories
const QuickCategories = ({ categories, selectedCategory, onCategoryChange }: {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <Container>
        <div className="py-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all rounded flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-black text-white'
                  : 'border border-gray-300 hover:border-black bg-white'
              }`}
            >
              All
            </button>
            {categories.slice(0, 10).map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.slug)}
                className={`px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all rounded flex-shrink-0 ${
                  selectedCategory === category.slug
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black bg-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

// Compact Articles Grid
const ArticlesGrid = ({ 
  posts, 
  isLoading,
  searchQuery,
  categoryName,
  hasMore,
  onLoadMore,
  isLoadMoreLoading
}: { 
  posts: WordPressPost[];
  isLoading: boolean;
  searchQuery: string;
  categoryName: string;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadMoreLoading: boolean;
}) => {
  if (isLoading && posts.length === 0) {
    return (
      <div className="bg-white py-4">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="bg-white">
        <Container>
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-gray-200 mx-auto mb-3 flex items-center justify-center rounded">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No Articles Found</h3>
            <p className="text-xs text-gray-600 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : 'Check back soon'}
            </p>
            <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-xs">
              <Link href="/blogs">View All</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white py-4">
      <Container>
        {/* Results Counter */}
        <div className="mb-3 pb-2 border-b border-gray-200">
          <p className="text-[11px] text-gray-600">
            <span className="font-semibold text-gray-900">{posts.length}</span> result{posts.length !== 1 ? 's' : ''}
            {categoryName && categoryName !== 'all' && (
              <> in <span className="font-semibold text-gray-900">{categoryName}</span></>
            )}
            {hasMore && <span className="ml-1 text-gray-400">(showing partial results)</span>}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8 mb-4">
            <Button 
              onClick={onLoadMore}
              disabled={isLoadMoreLoading}
              size="sm"
              variant="outline"
              className="border border-gray-300 hover:border-black hover:bg-black hover:text-white font-semibold px-8 py-2 text-xs h-9 min-w-[120px]"
            >
              {isLoadMoreLoading ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Articles'
              )}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

// Compact Newsletter
const NewsletterCTA = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="bg-black text-white py-8">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-lg font-bold mb-1">Get Travel Tips</h2>
          <p className="text-xs text-gray-300 mb-4">Subscribe for guides and inspiration</p>
          
          <form className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 px-3 py-2 text-xs text-gray-900 focus:outline-none rounded"
            />
            <Button 
              type="submit"
              size="sm"
              className="bg-white text-black hover:bg-gray-200 font-semibold px-5 text-xs"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-[9px] text-gray-400 mt-2">No spam · Unsubscribe anytime</p>
        </div>
      </Container>
    </div>
  );
};

// Main Component
export default function BlogsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Data Fetch
  useEffect(() => {
    async function fetchInitialData() {
      setIsLoading(true);
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=12&page=1`),
          fetch(`${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`)
        ]);

        if (postsRes.ok) {
          const postsData = await postsRes.json();
          const totalPages = parseInt(postsRes.headers.get('X-WP-TotalPages') || '1');
          
          setPosts(postsData);
          setHasMore(1 < totalPages);
        }

        if (categoriesRes.ok) {
          const catsData = await categoriesRes.json();
          setCategories(catsData.filter((cat: Category) => 
            cat.count > 0 && cat.slug !== 'uncategorized'
          ));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  // Filter Logic (Runs when category/search changes)
  // Note: For true scalability, search/filter should be server-side. 
  // This client-side filter works best if you fetch ALL posts, but with pagination we usually reset.
  // Here, I am resetting pagination and re-fetching from server when filters change.
  useEffect(() => {
    if (isLoading) return; // Skip initial load

    const fetchFilteredData = async () => {
      setIsLoading(true);
      setPage(1);
      setPosts([]); // Clear current posts
      
      let url = `${WP_API_URL}/posts?_embed&per_page=12&page=1`;
      
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      if (selectedCategory !== 'all') {
        const categoryId = categories.find(c => c.slug === selectedCategory)?.id;
        if (categoryId) {
          url += `&categories=${categoryId}`;
        }
      }

      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
          
          setPosts(data);
          setHasMore(1 < totalPages);
        } else {
          setPosts([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Filter error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search slightly
    const timeoutId = setTimeout(() => {
      fetchFilteredData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);


  // Load More Function
  const handleLoadMore = async () => {
    if (isLoadMoreLoading || !hasMore) return;

    setIsLoadMoreLoading(true);
    const nextPage = page + 1;
    
    let url = `${WP_API_URL}/posts?_embed&per_page=12&page=${nextPage}`;
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    if (selectedCategory !== 'all') {
      const categoryId = categories.find(c => c.slug === selectedCategory)?.id;
      if (categoryId) {
        url += `&categories=${categoryId}`;
      }
    }

    try {
      const res = await fetch(url);
      if (res.ok) {
        const newPosts = await res.json();
        const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
        
        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
        setHasMore(nextPage < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };


  const categoryName = selectedCategory === 'all' 
    ? 'All Categories' 
    : categories.find(c => c.slug === selectedCategory)?.name || '';


  return (
    <>
      <CompactHeader 
        totalPosts={posts.length} // Note: This shows currently loaded count, not total DB count
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <QuickCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <ArticlesGrid 
        posts={posts}
        isLoading={isLoading}
        searchQuery={searchQuery}
        categoryName={categoryName}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoadMoreLoading={isLoadMoreLoading}
      />
      
      <NewsletterCTA />
    </>
  );
}
