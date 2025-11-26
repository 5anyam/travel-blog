"use client"
import Link from "next/link";
import { 
  ArrowRight, Calendar, BookOpen, ChevronRight, ChevronLeft,
  Mail, Clock, Tag, MapPin, Plane, Search, 
  TrendingUp, Star, ExternalLink
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

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  link: string;
  isExternal: boolean;
}

// Search Bar Component - Top of Page
const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Section className="relative bg-gray-900 border-b-2 border-gray-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto py-16 lg:py-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 text-center">
            Discover Your Next Adventure
          </h2>
          <p className="text-gray-200 text-lg text-center mb-8">
            Search from thousands of travel guides, tips, and destination reviews
          </p>
          
          <form onSubmit={handleSearch} className="relative">
            <div className={`flex items-center border-2 ${isFocused ? 'border-white' : 'border-white/30'} transition-colors bg-white`}>
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search destinations, travel tips, guides..."
                className="flex-1 px-4 py-4 text-gray-900 focus:outline-none"
              />
              <Button 
                type="submit"
                className="bg-black hover:bg-gray-800 text-white px-8 m-1 font-semibold"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-300">Popular:</span>
            {['Bali', 'Thailand', 'Europe', 'Budget Travel', 'Solo Travel'].map((term) => (
              <Link
                key={term}
                href={`/blogs?search=${encodeURIComponent(term)}`}
                className="text-sm px-3 py-1 border border-white/30 hover:border-white hover:bg-white hover:text-black text-white transition-all"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Banner Slider Component
const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<BannerSlide[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
      title: 'Exclusive Travel Deals',
      link: 'https://example.com/deals',
      isExternal: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200',
      title: 'Best Hotels Worldwide',
      link: 'https://example.com/hotels',
      isExternal: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
      title: 'Flight Booking Offers',
      link: 'https://example.com/flights',
      isExternal: true
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <Section className="bg-white">
      <Container>
        <div className="relative overflow-hidden bg-gray-100 border-2 border-gray-200">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="w-full flex-shrink-0 relative">
                <a 
                  href={banner.link}
                  target={banner.isExternal ? "_blank" : "_self"}
                  rel={banner.isExternal ? "noopener noreferrer" : ""}
                  className="block"
                >
                  <div className="relative aspect-[21/9] lg:aspect-[21/6]">
                    <img 
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-3xl lg:text-5xl font-bold mb-4">
                          {banner.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-100 transition-colors">
                          Explore Now
                          <ExternalLink className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white border-2 border-gray-200 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white border-2 border-gray-200 flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Category Navigation Bar
const CategoryBar = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: {
  categories: Category[];
  activeCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}) => {
  return (
    <div className="bg-white border-t border-b-2 border-gray-200 sticky top-0 z-40">
      <Container>
        <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-6 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === null
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            All Articles
          </button>
          {categories.slice(0, 10).map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-6 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

// Featured Posts - Large Hero Style
const FeaturedHero = ({ post }: { post: WordPressPost | null }) => {
  if (!post) return null;

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold tracking-wide uppercase mb-6">
              <Star className="w-3 h-3" />
              Featured Story
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title.rendered}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {stripHtml(post.excerpt.rendered).substring(0, 200)}...
            </p>
            
            <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
              {post._embedded?.author?.[0]?.name && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    {post._embedded.author[0].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {post._embedded.author[0].name}
                    </div>
                    <div className="text-xs">{formatDate(post.date)}</div>
                  </div>
                </div>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {getReadTime(post.content.rendered)} min read
              </span>
            </div>
            
            <Button 
              size="lg" 
              asChild 
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base"
            >
              <Link href={`/blogs/${post.slug}`}>
                Read Full Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <Link href={`/blogs/${post.slug}`}>
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-gray-200">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                  <img 
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <MapPin className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Trending Stories Grid
const TrendingGrid = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length < 3) return null;

  return (
    <Section className="bg-gray-50 border-y-2 border-gray-200">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <TrendingUp className="w-7 h-7" />
            Trending Stories
          </h2>
          <Link 
            href="/blogs?filter=trending"
            className="text-sm font-semibold text-gray-900 hover:underline flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article key={post.id} className="group bg-white border-2 border-gray-200 hover:border-black transition-all">
              <Link href={`/blogs/${post.slug}`}>
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <img 
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                {post._embedded?.['wp:term']?.[0]?.[0] && (
                  <span className="text-xs font-bold tracking-wide uppercase text-gray-500 mb-2 inline-block">
                    {post._embedded['wp:term'][0][0].name}
                  </span>
                )}

                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-gray-600 transition-colors">
                  <Link href={`/blogs/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{getReadTime(post.content.rendered)} min</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// Ad Banner Component
const AdBanner = ({ size = 'horizontal' }: { size?: 'horizontal' | 'square' }) => {
  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className={`bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center ${
            size === 'horizontal' ? 'aspect-[728/90]' : 'aspect-square max-w-md mx-auto'
          }`}>
            <div className="text-center">
              <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                Advertisement
              </p>
              <p className="text-gray-300 text-xs mt-1">
                {size === 'horizontal' ? '728 x 90' : '300 x 300'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Latest Articles Grid
const LatestArticles = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
        <p className="text-gray-600">Check back soon for new stories</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {posts.map((post) => (
        <article key={post.id} className="group">
          <Link href={`/blogs/${post.slug}`}>
            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100 border-2 border-gray-200 group-hover:border-black transition-all">
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                <img 
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-gray-300" />
                </div>
              )}
            </div>
          </Link>
          
          <div>
            {post._embedded?.['wp:term']?.[0]?.[0] && (
              <Link 
                href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
                className="text-xs font-bold tracking-wide uppercase text-gray-500 hover:text-black transition-colors mb-3 inline-block"
              >
                {post._embedded['wp:term'][0][0].name}
              </Link>
            )}
            
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-600 transition-colors">
              <Link href={`/blogs/${post.slug}`}>
                {post.title.rendered}
              </Link>
            </h3>
            
            <p className="text-gray-600 text-base mb-4 leading-relaxed line-clamp-3">
              {stripHtml(post.excerpt.rendered)}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-gray-500">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{getReadTime(post.content.rendered)} min</span>
              </div>
              
              <Link 
                href={`/blogs/${post.slug}`}
                className="text-black font-semibold hover:underline flex items-center gap-1"
              >
                Read
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

// Popular Destinations
const PopularDestinations = ({ categories }: { categories: Category[] }) => {
  return (
    <Section className="bg-white border-y-2 border-gray-200">
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600">
            Explore our most-read travel guides by destination
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((category) => (
            <Link
              key={category.id}
              href={`/blogs?category=${category.slug}`}
              className="group p-6 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all text-center"
            >
              <div className="font-bold text-lg mb-1 group-hover:underline">
                {category.name}
              </div>
              <div className="text-sm opacity-75">
                {category.count} {category.count === 1 ? 'guide' : 'guides'}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold"
          >
            <Link href="/categories">
              View All Destinations
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

// Newsletter Section
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
    <Section className="bg-black text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Never Miss a Story
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the latest travel insights, destination guides, and exclusive tips delivered weekly.
          </p>
          
          {subscribed ? (
            <div className="bg-white text-black px-8 py-4 inline-block text-lg font-semibold">
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
                  className="flex-1 px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white border-2 border-white"
                  placeholder="Your email address"
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 font-bold px-8"
                >
                  Subscribe Free
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Join 50,000+ travelers. No spam, unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
};

// About Section
const AboutClubMyTrip = () => {
  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              About ClubMyTrip
            </h2>
            <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                ClubMyTrip is your trusted travel companion, dedicated to helping travelers 
                discover amazing destinations, authentic experiences, and insider tips from 
                around the world. We believe travel changes lives and opens minds.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  Comprehensive destination guides and itineraries
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  Honest reviews and travel recommendations
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  Budget tips and money-saving strategies
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  Safety advice and travel hacks
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Trust Us</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our content is created by experienced travelers who have visited the destinations 
                they write about. We provide honest, practical advice based on real experiences, 
                not just internet research.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
                  <div className="text-sm text-gray-600">Monthly Readers</div>
                </div>
                <div className="border-2 border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Travel Guides</div>
                </div>
                <div className="border-2 border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
                  <div className="text-sm text-gray-600">Countries Covered</div>
                </div>
                <div className="border-2 border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">5 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
              
              <Button size="lg" asChild className="w-full bg-black hover:bg-gray-800">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Utility Functions
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
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
        const [featuredRes, postsRes, categoriesRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=6&orderby=date`),
          fetch(`${WP_API_URL}/posts?_embed&per_page=15&orderby=date`),
          fetch(`${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`)
        ]);

        if (featuredRes.ok) {
          const featured = await featuredRes.json();
          setFeaturedPosts(featured);
        }

        if (postsRes.ok) {
          const posts = await postsRes.json();
          setAllPosts(posts);
        }

        if (categoriesRes.ok) {
          const cats = await categoriesRes.json();
          setCategories(cats.filter((cat: Category) => 
            cat.count > 0 && cat.slug !== 'uncategorized'
          ));
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
      {/* Search Section - TOP */}
      <SearchSection />

      {/* Banner Slider */}
      <BannerSlider />

      {/* Category Navigation */}
      <CategoryBar 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Featured Hero Post */}
      <FeaturedHero post={featuredPosts[0] || null} />

      {/* Ad Banner 1 */}
      <AdBanner size="horizontal" />

      {/* Trending Stories */}
      <TrendingGrid posts={featuredPosts.slice(1, 4)} />

      {/* Latest Articles Section */}
      <Section className="bg-white">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Latest Travel Stories
            </h2>
            <p className="text-lg text-gray-600">
              Fresh perspectives and expert insights from around the world
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg font-medium">Loading amazing stories...</p>
            </div>
          ) : (
            <>
              <LatestArticles posts={filteredPosts} />
              
              {filteredPosts.length > 0 && (
                <div className="text-center mt-12">
                  <Button 
                    size="lg" 
                    asChild
                    className="bg-black hover:bg-gray-800 text-white font-semibold px-10"
                  >
                    <Link href="/blogs">
                      View All Articles
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* Ad Banner 2 */}
      <AdBanner size="horizontal" />

      {/* Popular Destinations */}
      <PopularDestinations categories={categories} />

      {/* Newsletter */}
      <NewsletterSection />

      {/* About Section */}
      <AboutClubMyTrip />

      {/* Ad Banner 3 - Square */}
      <AdBanner size="square" />
    </>
  );
}
