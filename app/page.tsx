"use client";
import Link from "next/link";
import { 
  ArrowRight, Search, TrendingUp, Globe, ShieldCheck, Wallet, Calendar, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/BlogCard"; // Ensure this matches your new BlogCard component
import { LatestPostsGrid } from "@/components/LatestPostsGrid";
import { useState, useEffect } from "react";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

// Helper to get random unique images for categories
const getCategoryImage = (slug: string, index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Beach
    "https://images.unsplash.com/photo-1519681393798-2f43f463c1c5?w=800&q=80", // Mountain
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", // City
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", // Adventure
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", // Food
    "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&q=80", // Travel
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80", // Culture
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"  // Nature
  ];
  return images[index % images.length];
};

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

// 1. HERO SECTION (Mobile Optimized)
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop"
          alt="Travel Background"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 md:to-black/60" />
      </div>

      <Container className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-fade-in-up w-full">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs md:text-sm font-medium tracking-wide mx-auto">
            <Globe className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
            <span>Explore with confidence</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] drop-shadow-2xl">
            FIND YOUR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              NEXT ESCAPE
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-xl mx-auto font-light leading-relaxed px-2">
            Curated guides & expert tips for the modern traveler.
          </p>
          
          
          {/* Mobile-Friendly Search */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto w-full mt-6 md:mt-8 px-2">
            <div className="flex flex-col sm:flex-row items-center bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-full p-2 shadow-2xl gap-2">
                <div className="flex items-center w-full px-2 h-12">
                  <Search className="w-5 h-5 text-gray-400 ml-1 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where to? (e.g. Bali)"
                    className="flex-1 px-3 py-2 text-gray-900 text-base placeholder:text-gray-500 focus:outline-none bg-transparent w-full"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto rounded-xl sm:rounded-full bg-black hover:bg-gray-800 text-white px-8 h-12 sm:h-12 text-base font-semibold transition-all active:scale-95"
                >
                  Search
                </Button>
            </div>
            
            {/* Quick Chips - Scrollable on Mobile */}
            <div className="flex overflow-x-auto pb-2 pt-4 justify-start sm:justify-center gap-3 no-scrollbar snap-x px-1">
              {['🏝️ Bali', '🏔️ Alps', '🕌 Dubai', '🎒 Solo', '💰 Budget'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => window.location.href=`/blogs?search=${encodeURIComponent(tag.replace(/[^a-zA-Z ]/g, ""))}`}
                  className="snap-start flex-shrink-0 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-xs md:text-sm whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

// 2. VISUAL FEATURES
const VisualFeatures = () => {
  const features = [
    { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: "Verified", desc: "Expert vetted." },
    { icon: <Wallet className="w-6 h-6 md:w-8 md:h-8" />, title: "Budget", desc: "Save money." },
    { icon: <MapPin className="w-6 h-6 md:w-8 md:h-8" />, title: "Hidden", desc: "No tourist traps." },
    { icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />, title: "Planned", desc: "Day-by-day." },
  ];

  return (
    <Section className="py-10 md:py-16 bg-white border-b border-gray-100">
      <Container>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl md:bg-transparent">
                 <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 md:mb-4">
                    {f.icon}
                 </div>
                 <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">{f.title}</h3>
                 <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            ))}
         </div>
      </Container>
    </Section>
  );
};

// 3. BENTO CATEGORIES
const BentoCategories = ({ categories }: { categories: Category[] }) => {
  if (!categories.length) return null;
  const featuredCats = categories.slice(0, 4);

  return (
    <Section className="bg-gray-50 py-12 md:py-20">
      <Container>
        <div className="flex flex-row justify-between items-end mb-6 md:mb-10">
          <div>
            <span className="text-emerald-600 font-bold uppercase text-xs tracking-wider">Interests</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Collections</h2>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-gray-600 hover:text-black flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[450px]">
          {/* Main Card */}
          <Link href={`/blogs?category=${featuredCats[0]?.slug}`} className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden h-[250px] md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img 
              src={getCategoryImage(featuredCats[0].slug, 0)}
              alt={featuredCats[0].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute bottom-5 left-5 z-20 text-white">
              <span className="text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2 py-1 rounded mb-2 inline-block">MOST POPULAR</span>
              <h3 className="text-2xl font-bold">{featuredCats[0].name}</h3>
              <p className="text-sm opacity-90">{featuredCats[0].count} Articles</p>
            </div>
          </Link>

          {/* Secondary Cards */}
          {featuredCats.slice(1).map((cat, idx) => (
            <Link key={cat.id} href={`/blogs?category=${cat.slug}`} className={`relative group rounded-2xl overflow-hidden h-[180px] md:h-auto ${idx === 2 ? 'md:col-span-2' : ''}`}>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
               <img 
                 src={getCategoryImage(cat.slug, idx + 1)}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                 alt={cat.name}
               />
               <div className="absolute bottom-4 left-4 z-20 text-white">
                 <h3 className="text-lg font-bold">{cat.name}</h3>
                 <span className="text-xs opacity-80">{cat.count} Articles</span>
               </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// 4. MAGAZINE FEATURED
const MagazineFeatured = ({ post }: { post: WordPressPost | null }) => {
  if (!post) return null;
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

  return (
    <Section className="bg-[#111] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-900/20 rounded-full blur-[80px] pointer-events-none" />
        <Container className="relative z-10">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                  <span className="w-8 h-[2px] bg-emerald-400"></span>
                  Editors Choice
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight">
                  {post.title.rendered}
                </h2>
                <p className="text-gray-400 text-base md:text-lg line-clamp-3">
                  {stripHtml(post.excerpt.rendered)}
                </p>
                <div className="pt-2">
                   <Button asChild size="lg" className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12">
                      <Link href={`/${post.slug}`}>Read Article</Link>
                   </Button>
                </div>
             </div>
             <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
               {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                  <img 
                    src={post._embedded['wp:featuredmedia'][0].source_url} 
                    alt={post.title.rendered}
                    className="w-full h-full object-cover"
                  />
               ) : (
                  <div className="w-full h-full bg-gray-800" />
               )}
             </div>
          </div>
        </Container>
      <div className="w-full my-6 md:my-8">
  <a 
    href="https://fiverr.com/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="block group"
  >
    <div className="relative w-full h-[90px] md:h-[120px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <img
        src="https://play-lh.googleusercontent.com/R3soEg6oL3HYXFNGgUfZiz5RyS-X6bzG0HadXvyMm1V2GfG6rBxOy8p9XQ_QJDVI1Q" 
        alt="Fiverr"
        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 728px"
      />
    </div>
  </a>
</div>
    </Section>
  );
};

// 5. TRENDING SECTION
const TrendingGrid = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length < 3) return null;

  return (
    <Section className="bg-white py-12 md:py-20">
      <Container>
        <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            Trending Now
          </h2>
          <Link href="/blogs?filter=trending" className="text-emerald-600 text-sm font-semibold hover:underline whitespace-nowrap">View All</Link>
        </div>
        
        {/* Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 gap-6 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="snap-start min-w-[280px] md:min-w-0 h-full">
               <BlogCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// MAIN PAGE
export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featuredRes, postsRes, categoriesRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=6&orderby=date`),
          fetch(`${WP_API_URL}/posts?_embed&per_page=12&orderby=date`),
          fetch(`${WP_API_URL}/categories?per_page=8&orderby=count&order=desc`)
        ]);

        if (featuredRes.ok) setFeaturedPosts(await featuredRes.json());
        if (postsRes.ok) setAllPosts(await postsRes.json());
        if (categoriesRes.ok) {
          const cats = await categoriesRes.json();
          setCategories(cats.filter((c: Category) => c.count > 0 && c.slug !== 'uncategorized'));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      
      <VisualFeatures />

      <BentoCategories categories={categories} />
      
      <MagazineFeatured post={featuredPosts[0] || null} />

      <TrendingGrid posts={featuredPosts.slice(1, 4)} />

      {/* Latest Posts */}
      <Section className="bg-gray-50 py-16 md:py-20">
        <Container>
          <LatestPostsGrid 
            posts={allPosts}
            isLoading={isLoading}
            title="Latest Stories"
            showViewAll={true}
            viewAllLink="/blogs"
          />
        </Container>
      </Section>
    </div>
  );
}
