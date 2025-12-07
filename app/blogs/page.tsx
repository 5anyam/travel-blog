"use client";
import { Calendar, Search, X, ChevronDown, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

// ... (Interfaces same as before)
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
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    author?: Array<{ name: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// 1. Header with TOTAL COUNT
const CompactHeader = ({ 
  totalPostsCount, 
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange 
}: {
  totalPostsCount: number;
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
          <div className="flex items-center gap-4 lg:min-w-fit">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Link href="/" className="text-[10px] text-gray-500 hover:text-black">Home</Link>
                <span className="text-[10px] text-gray-400">/</span>
                <span className="text-[10px] text-gray-600 font-semibold">Articles</span>
              </div>
              <h1 className="text-base lg:text-lg font-bold text-gray-900">
                Travel Articles <span className="text-xs font-normal text-gray-500">({totalPostsCount})</span>
              </h1>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex-1 flex gap-2">
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
                <button onClick={() => onSearchChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

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
                      onClick={() => { onCategoryChange('all'); setIsFilterOpen(false); }}
                      className={`w-full px-2.5 py-1.5 text-left text-xs hover:bg-gray-50 ${selectedCategory === 'all' ? 'bg-gray-100 font-semibold' : ''}`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => { onCategoryChange(category.slug); setIsFilterOpen(false); }}
                        className={`w-full px-2.5 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center justify-between ${selectedCategory === category.slug ? 'bg-gray-100 font-semibold' : ''}`}
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

// ... (QuickCategories remains same)
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

// ... (ArticlesGrid remains same)
const ArticlesGrid = ({ 
  posts, 
  totalCount, 
  isLoading,
  searchQuery,
  categoryName,
  hasMore,
  onLoadMore,
  isLoadMoreLoading
}: { 
  posts: WordPressPost[];
  totalCount: number;
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
            {[1, 2, 3, 4, 5, 6].map((i) => <BlogCardSkeleton key={i} />)}
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
            <h3 className="text-base font-bold text-gray-900 mb-1">No Articles Found</h3>
            <p className="text-xs text-gray-600 mb-4">
              {searchQuery 
                ? `No results for "${searchQuery}"` 
                : 'Try adjusting your filters'}
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
        <div className="mb-3 pb-2 border-b border-gray-200">
          <p className="text-[11px] text-gray-600">
            Showing <span className="font-semibold text-gray-900">{posts.length}</span> of <span className="font-semibold text-gray-900">{totalCount}</span> results
            {categoryName && categoryName !== 'all' && (
              <> in <span className="font-semibold text-gray-900">{categoryName}</span></>
            )}
            {searchQuery && (
              <> for <span className="font-semibold text-gray-900">{searchQuery}</span></>
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

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
                `Load More (${totalCount - posts.length} remaining)`
              )}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

// ... (NewsletterCTA remains same)
const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  return (
    <div className="bg-black text-white py-8">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-lg font-bold mb-1">Get Travel Tips</h2>
          <p className="text-xs text-gray-300 mb-4">Subscribe for guides and inspiration</p>
          <form className="flex gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className="flex-1 px-3 py-2 text-xs text-gray-900 focus:outline-none rounded" />
            <Button type="submit" size="sm" className="bg-white text-black hover:bg-gray-200 font-semibold px-5 text-xs">Subscribe</Button>
          </form>
          <p className="text-[9px] text-gray-400 mt-2">No spam · Unsubscribe anytime</p>
        </div>
      </Container>
    </div>
  );
};

// 💡 NEW: BlogContent Component that uses useSearchParams
function BlogContent() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  
  // URL Params Hook
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize State from URL
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync state with URL if URL changes externally (optional but good practice)
  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || 'all';
    setSearchQuery(s);
    setSelectedCategory(c);
  }, [searchParams]);

  // Handle User Input Changes (Updates URL)
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set('search', query);
    else params.delete('search');
    router.replace(`/blogs?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug !== 'all') params.set('category', slug);
    else params.delete('category');
    router.replace(`/blogs?${params.toString()}`, { scroll: false });
  };

  // Main Data Fetch Effect
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setPage(1);
      setPosts([]);

      try {
        // 1. Fetch Categories first to resolve slug to ID
        let cats = categories;
        if (categories.length === 0) {
          const catRes = await fetch(`${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`);
          if (catRes.ok) {
            const catsData = await catRes.json();
            cats = catsData.filter((cat: Category) => cat.count > 0 && cat.slug !== 'uncategorized');
            setCategories(cats);
          }
        }

        // 2. Build Post URL
        let url = `${WP_API_URL}/posts?_embed&per_page=12&page=1`;
        
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        
        if (selectedCategory !== 'all') {
          const categoryId = cats.find(c => c.slug === selectedCategory)?.id;
          if (categoryId) {
            url += `&categories=${categoryId}`;
          }
        }

        // 3. Fetch Posts
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const total = parseInt(res.headers.get('X-WP-Total') || '0');
          const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
          
          setPosts(data);
          setTotalPostsCount(total);
          setHasMore(1 < totalPages);
        } else {
          setPosts([]);
          setTotalPostsCount(0);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    // Debounce a bit
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]); 


  // Load More Function
  const handleLoadMore = async () => {
    if (isLoadMoreLoading || !hasMore) return;
    setIsLoadMoreLoading(true);
    const nextPage = page + 1;
    
    let url = `${WP_API_URL}/posts?_embed&per_page=12&page=${nextPage}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    if (selectedCategory !== 'all') {
      const categoryId = categories.find(c => c.slug === selectedCategory)?.id;
      if (categoryId) url += `&categories=${categoryId}`;
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
        totalPostsCount={totalPostsCount}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange} // Use new handler
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange} // Use new handler
      />
      
      <QuickCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <ArticlesGrid 
        posts={posts}
        totalCount={totalPostsCount}
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

// MAIN PAGE COMPONENT (Wrapped in Suspense)
export default function BlogsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
