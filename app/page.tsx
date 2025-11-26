"use client"
import Link from "next/link";
import { 
  ArrowRight, Calendar, BookOpen, ChevronLeft, ChevronRight, 
  Mail, Clock, Tag, MapPin, Plane, Search, Share2, 
  Facebook, Twitter, MessageCircle, Bookmark, User,
  TrendingUp, Star, Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    author?: Array<{ name: string; avatar_urls?: { '96': string } }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Hero Section with Search - Travel Focused
const TravelHero = ({ featuredPost }: { featuredPost: WordPressPost | null }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="relative w-full h-[80vh] lg:h-[85vh] overflow-hidden">
      {featuredPost?._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
        <img
          src={featuredPost._embedded['wp:featuredmedia'][0].source_url}
          alt={featuredPost.title.rendered}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-teal-500 to-green-400"></div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      
      <Container>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
            Discover Amazing Travel Experiences
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            Expert travel guides, destination reviews, and insider tips for your next adventure
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
            <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-full p-2 shadow-2xl">
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, guides, tips..."
                  className="w-full py-3 focus:outline-none text-gray-900"
                />
              </div>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-3 rounded-full font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/blogs?category=destinations" className="px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all font-medium">
              <MapPin className="w-4 h-4 inline mr-2" />
              Destinations
            </Link>
            <Link href="/blogs?category=travel-tips" className="px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all font-medium">
              <Star className="w-4 h-4 inline mr-2" />
              Travel Tips
            </Link>
            <Link href="/blogs?category=guides" className="px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all font-medium">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Travel Guides
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

// Featured Destinations Carousel
const FeaturedDestinations = ({ posts }: { posts: WordPressPost[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(posts.length / 3));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(posts.length / 3)) % Math.ceil(posts.length / 3));
  };

  if (posts.length === 0) return null;

  return (
    <Section className="bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Plane className="w-8 h-8 text-blue-600" />
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600">Handpicked travel experiences just for you</p>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button
              onClick={goToPrev}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <article 
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <Link href={`/blogs/${post.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <img 
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      Featured
                    </span>
                  </div>

                  {post._embedded?.['wp:term']?.[0]?.[0] && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post._embedded['wp:term'][0][0].name}
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {getReadTime(post.content.rendered)} min
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blogs/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {stripHtml(post.excerpt.rendered)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {post._embedded?.author?.[0]?.name && (
                    <span className="text-sm text-gray-700 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center text-xs font-bold">
                        {post._embedded.author[0].name.charAt(0)}
                      </div>
                      {post._embedded.author[0].name}
                    </span>
                  )}
                  
                  <Link 
                    href={`/blogs/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// Trending Topics Bar
const TrendingBar = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 text-white py-3 shadow-lg">
      <Container>
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 font-bold whitespace-nowrap">
            <TrendingUp className="w-5 h-5" />
            <span className="hidden sm:inline">TRENDING NOW</span>
            <span className="sm:hidden">TRENDING</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              {posts.slice(0, 8).map((post) => (
                <Link 
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="whitespace-nowrap hover:underline text-sm md:text-base"
                >
                  {post.title.rendered}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Newsletter with Travel Theme
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <Section className="bg-gradient-to-br from-blue-600 via-teal-500 to-green-400 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-2xl">
            <Mail className="w-10 h-10 text-blue-600 -rotate-12" />
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Get Travel Inspiration Weekly
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join 50,000+ travelers receiving expert tips, destination guides, and exclusive travel deals directly in their inbox.
          </p>
          
          {subscribed ? (
            <div className="bg-white text-green-600 px-8 py-6 rounded-2xl text-xl font-bold inline-flex items-center gap-3 shadow-2xl">
              ✓ Successfully subscribed! Check your email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 rounded-xl md:rounded-full text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/50 focus:outline-none shadow-xl"
                  placeholder="Enter your email address"
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 rounded-xl md:rounded-full shadow-xl"
                >
                  Subscribe Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-white/80 mt-4 flex items-center justify-center gap-2">
                <span>🔒</span>
                No spam. Unsubscribe anytime. 100% free forever.
              </p>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
};

// Category Navigation - SEO Friendly
const CategoryNavigation = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: {
  categories: Category[];
  activeCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}) => {
  return (
    <div className="bg-white border-b-2 border-gray-100 sticky top-0 z-40 shadow-sm">
      <Container>
        <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeCategory === null
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Navigation className="w-4 h-4" />
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

// Latest Articles Grid - Enhanced for AdSense
const LatestArticlesGrid = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">No Articles Found</h3>
        <p className="text-gray-600 text-lg mb-8">
          We are working on bringing you amazing travel content. Check back soon!
        </p>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-500">
          <Link href="/blogs">
            Browse All Articles
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <article 
          key={post.id}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
        >
          <Link href={`/blogs/${post.slug}`}>
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                <img 
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-blue-300" />
                </div>
              )}
              
              {post._embedded?.['wp:term']?.[0]?.[0] && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {post._embedded['wp:term'][0][0].name}
                </span>
              )}

              <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
                <Bookmark className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </Link>
          
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {getReadTime(post.content.rendered)} min read
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              <Link href={`/blogs/${post.slug}`}>
                {post.title.rendered}
              </Link>
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
              {stripHtml(post.excerpt.rendered)}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              {post._embedded?.author?.[0]?.name && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    {post._embedded.author[0].name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {post._embedded.author[0].name}
                  </span>
                </div>
              )}
              
              <Link 
                href={`/blogs/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-sm group-hover:gap-2 transition-all"
              >
                Read
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

// Popular Topics Section
const PopularTopics = ({ categories }: { categories: Category[] }) => {
  return (
    <Section className="bg-white border-t-2 border-gray-100">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Tag className="w-9 h-9 text-blue-600" />
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover travel content tailored to your interests. From beach getaways to mountain adventures.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {categories.slice(0, 12).map((category) => (
            <Link
              key={category.id}
              href={`/blogs?category=${category.slug}`}
              className="group px-6 py-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-600 hover:to-teal-500 border-2 border-gray-200 hover:border-transparent rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {category.name}
                <span className="text-sm opacity-75">({category.count})</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" asChild variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            <Link href="/categories">
              View All Categories
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

// Utility Functions
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().substring(0, 160) + '...';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)); // Minimum 1 min read time
}

// Main Component
export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch featured posts
        const featuredRes = await fetch(`${WP_API_URL}/posts?_embed&per_page=6&orderby=date`);
        if (featuredRes.ok) {
          const featured = await featuredRes.json();
          setFeaturedPosts(featured);
        }

        // Fetch all posts for listing
        const postsRes = await fetch(`${WP_API_URL}/posts?_embed&per_page=15&orderby=date`);
        if (postsRes.ok) {
          const posts = await postsRes.json();
          setAllPosts(posts);
        }

        // Fetch categories
        const categoriesRes = await fetch(`${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`);
        if (categoriesRes.ok) {
          const cats = await categoriesRes.json();
          setCategories(cats.filter((cat: Category) => cat.count > 0 && cat.slug !== 'uncategorized'));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPosts = activeCategory 
    ? allPosts.filter(post => post.categories.includes(activeCategory))
    : allPosts;

  return (
    <>
      {/* SEO: Add breadcrumb structured data here */}
      
      {/* Hero Section */}
      <TravelHero featuredPost={featuredPosts[0] || null} />

      {/* Trending Bar */}
      <TrendingBar posts={allPosts} />

      {/* Featured Destinations */}
      <FeaturedDestinations posts={featuredPosts} />

      {/* Latest Articles Section */}
      <Section className="bg-gray-50">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <BookOpen className="w-9 h-9 text-blue-600" />
              Latest Travel Articles
            </h2>
            <p className="text-lg text-gray-600">
              Fresh insights, tips, and stories from around the world
            </p>
          </div>

          {/* Category Tabs */}
          <CategoryNavigation 
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <div className="mt-8">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                <p className="mt-6 text-gray-600 text-lg font-medium">Loading amazing content...</p>
              </div>
            ) : (
              <>
                <LatestArticlesGrid posts={filteredPosts} />
                
                {filteredPosts.length > 0 && (
                  <div className="text-center mt-12">
                    <Button 
                      size="lg" 
                      asChild 
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl"
                    >
                      <Link href="/blogs">
                        Explore All Articles
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* Popular Topics */}
      <PopularTopics categories={categories} />

      {/* AdSense Placement Zone - Add after content loads */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Add AdSense code here after approval */}
            <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">Advertisement Space</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

// Add custom scrolling animation to CSS
const style = `
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;
