"use client"
import Link from "next/link";
import { ArrowRight, TrendingUp, Calendar, BookOpen, ChevronLeft, ChevronRight, Mail, Flame, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useState, useEffect } from "react";

const WP_API_URL = 'https://thefashionableworld.com/wp-json/wp/v2';

interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        '96': string;
      };
    }>;
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

// Featured Posts Hero Carousel - Magazine Style
const FeaturedPostsCarousel = ({ posts }: { posts: WordPressPost[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying && posts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === posts.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, posts.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? posts.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === posts.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  if (posts.length === 0) return null;

  return (
    <div className="relative w-full h-[65vh] lg:h-[75vh] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {posts.map((post) => (
          <div key={post.id} className="w-full h-full flex-shrink-0 relative">
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
              <img
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
              <Container>
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      FEATURED
                    </span>
                    {post._embedded?.['wp:term']?.[0]?.[0] && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                        {post._embedded['wp:term'][0][0].name}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {post.title.rendered}
                  </h1>
                  
                  <p className="text-lg lg:text-xl text-gray-200 mb-6 line-clamp-2">
                    {stripHtml(post.excerpt.rendered)}
                  </p>
                  
                  <div className="flex items-center gap-6 text-white/80 text-sm mb-6">
                    {post._embedded?.author?.[0]?.name && (
                      <span className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          {post._embedded.author[0].name.charAt(0)}
                        </div>
                        {post._embedded.author[0].name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getReadTime(post.content.rendered)} min read
                    </span>
                  </div>
                  
                  <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100">
                    <Link href={`/blogs/${post.slug}`}>
                      Read Full Story
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 lg:left-8 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 lg:right-8 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-4'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Trending Strip Component
const TrendingStrip = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) return null;
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 overflow-hidden">
      <Container>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold whitespace-nowrap">
            <TrendingUp className="w-5 h-5" />
            TRENDING NOW
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-scroll">
              {posts.slice(0, 5).map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blogs/${post.slug}`}
                  className="whitespace-nowrap hover:underline flex items-center gap-2"
                >
                  <span className="text-white/60">•</span>
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

// Newsletter Signup Component
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing! 🎉');
    setEmail('');
  };

  return (
    <Section className="bg-gradient-to-br from-[#3AA6FF] to-[#2690E6]">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#3AA6FF]" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest articles, insights, and updates delivered directly to your inbox every week.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
                placeholder="Enter your email address"
              />
              <Button 
                type="submit" 
                size="lg" 
                className="bg-white text-[#3AA6FF] hover:bg-gray-100 font-bold whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">
              Join 10,000+ readers. Unsubscribe anytime. No spam, ever.
            </p>
          </form>
        </div>
      </Container>
    </Section>
  );
};

// Category Tabs Component
const CategoryTabs = ({ categories, activeCategory, onSelectCategory }: {
  categories: Category[];
  activeCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b-2 border-gray-200 scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
          activeCategory === null
            ? 'bg-[#3AA6FF] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Articles
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
            activeCategory === category.id
              ? 'bg-[#3AA6FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
          <span className="ml-2 text-xs opacity-75">({category.count})</span>
        </button>
      ))}
    </div>
  );
};

// Utility functions
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
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
  return Math.ceil(words / 200);
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch featured posts (first 3)
        const featuredRes = await fetch(`${WP_API_URL}/posts?_embed&per_page=3&orderby=date`);
        if (featuredRes.ok) {
          const featured = await featuredRes.json();
          setFeaturedPosts(featured);
        }

        // Fetch all posts
        const postsRes = await fetch(`${WP_API_URL}/posts?_embed&per_page=12&orderby=date`);
        if (postsRes.ok) {
          const posts = await postsRes.json();
          setAllPosts(posts);
        }

        // Fetch categories
        const categoriesRes = await fetch(`${WP_API_URL}/categories?per_page=10&orderby=count&order=desc`);
        if (categoriesRes.ok) {
          const cats = await categoriesRes.json();
          setCategories(cats.filter((cat: Category) => cat.count > 0));
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
      {/* Featured Posts Hero Carousel */}
      <FeaturedPostsCarousel posts={featuredPosts} />

      {/* Trending Strip */}
      <TrendingStrip posts={allPosts} />

      {/* Magazine Introduction */}
      <Section className="bg-white border-b-4 border-[#3AA6FF]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-[#3AA6FF]">CS India Magazine</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Your premier source for company law insights, regulatory updates, compliance tips, 
              and business news. Stay informed with expert analysis, in-depth articles, and the 
              latest developments in corporate governance and legal compliance.
            </p>
          </div>
        </Container>
      </Section>

      {/* Latest Articles with Category Tabs */}
      <Section className="bg-gray-50">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-[#3AA6FF]" />
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive collection of articles across various topics
            </p>
          </div>

          {/* Category Tabs */}
          <CategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Articles Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#3AA6FF]"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading articles...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
                  >
                    <Link href={`/blogs/${post.slug}`}>
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 relative">
                        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                          <img 
                            src={post._embedded['wp:featuredmedia'][0].source_url} 
                            alt={post.title.rendered}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-16 w-16 text-[#3AA6FF]" />
                          </div>
                        )}
                        
                        {post._embedded?.['wp:term']?.[0]?.[0] && (
                          <span className="absolute top-3 left-3 px-3 py-1 bg-[#3AA6FF] text-white text-xs font-bold rounded-full">
                            {post._embedded['wp:term'][0][0].name}
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getReadTime(post.content.rendered)} min
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#3AA6FF] transition-colors line-clamp-2">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title.rendered}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {post._embedded?.author?.[0]?.name && (
                          <span className="text-sm text-gray-700 font-medium flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#3AA6FF] text-white flex items-center justify-center text-xs font-bold">
                              {post._embedded.author[0].name.charAt(0)}
                            </div>
                            {post._embedded.author[0].name}
                          </span>
                        )}
                        <Link 
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center text-[#3AA6FF] hover:text-[#2690E6] font-bold text-sm group-hover:gap-2 transition-all"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="text-center">
                <Button size="lg" asChild className="bg-[#3AA6FF] hover:bg-[#2690E6] text-white font-bold">
                  <Link href="/blogs">
                    View All Articles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Articles Found</h3>
              <p className="text-gray-600 text-lg">
                {activeCategory ? 'Try selecting a different category' : 'Check back soon for new content'}
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Popular Topics */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Tag className="w-10 h-10 text-[#3AA6FF]" />
              Popular Topics
            </h2>
            <p className="text-lg text-gray-600">
              Explore articles by popular categories and topics
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                href={`/blogs?category=${category.slug}`}
                className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#3AA6FF] hover:to-[#2690E6] hover:text-white border border-gray-200 hover:border-transparent rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
