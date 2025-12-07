"use client";
import Link from "next/link";
import { 
  ArrowRight, ChevronRight, ChevronLeft,
  Clock, MapPin, Search, 
  TrendingUp, Star, Globe, Plane, ShieldCheck, Wallet, Calendar, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/BlogCard";
import { LatestPostsGrid } from "@/components/LatestPostsGrid";
import { useState, useEffect } from "react";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

// ... (Interfaces remain the same)
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
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// 1. IMMERSIVE HERO SECTION (Mobile Optimized)
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background with Mobile Optimization */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop"
          alt="Travel Background"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        {/* Darker gradient on mobile for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 md:to-black/80" />
      </div>

      <Container className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-fade-in-up">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs md:text-sm font-medium tracking-wide">
            <Globe className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
            <span>Explore the world with confidence</span>
          </div>
          
          {/* Main Title - Responsive sizing */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] drop-shadow-2xl">
            FIND YOUR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              NEXT ESCAPE
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Curated guides, expert tips, and hidden gems for the modern explorer.
          </p>
          
          {/* Search Bar - Mobile Stacked */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full mt-8 px-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 hidden md:block"></div>
              <div className="relative flex flex-col md:flex-row items-center bg-white/95 md:bg-white rounded-2xl md:rounded-full p-2 shadow-2xl gap-2">
                <div className="flex items-center w-full px-2">
                  <Search className="w-5 h-5 text-gray-400 ml-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where to?"
                    className="flex-1 px-3 py-3 md:py-4 text-gray-900 text-base md:text-lg placeholder:text-gray-500 focus:outline-none bg-transparent"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto rounded-xl md:rounded-full bg-black hover:bg-gray-800 text-white px-8 h-12 md:h-14 text-base md:text-lg font-semibold transition-all active:scale-95"
                >
                  Search
                </Button>
              </div>
            </div>
            
            {/* Quick Chips - Horizontally Scrollable on Mobile */}
            <div className="flex overflow-x-auto pb-4 md:pb-0 justify-start md:justify-center gap-3 mt-6 px-2 no-scrollbar snap-x">
              {['🏝️ Bali', '🏔️ Swiss Alps', '🕌 Dubai', '🎒 Solo', '💰 Budget'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => window.location.href=`/blogs?search=${encodeURIComponent(tag.replace(/[^a-zA-Z ]/g, ""))}`}
                  className="snap-start flex-shrink-0 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm transition-all active:scale-95 whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Stats - Grid on Mobile */}
        <div className="absolute bottom-6 left-4 right-4 md:left-0 md:right-0 flex justify-between md:justify-center gap-4 md:gap-12 text-white/80 border-t border-white/10 pt-6 max-w-5xl mx-auto">
           <div className="text-center flex-1 md:flex-none">
             <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
             <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-80">Destinations</div>
           </div>
           <div className="w-px h-10 bg-white/20"></div>
           <div className="text-center flex-1 md:flex-none">
             <div className="text-2xl md:text-3xl font-bold text-white">50k+</div>
             <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-80">Travelers</div>
           </div>
           <div className="w-px h-10 bg-white/20 hidden md:block"></div>
           <div className="text-center flex-1 md:flex-none hidden md:block">
             <div className="text-3xl font-bold text-white">100%</div>
             <div className="text-xs uppercase tracking-wider opacity-80">Authentic</div>
           </div>
        </div>
      </Container>
    </div>
  );
};

// 2. VISUAL FEATURES (Horizontal Scroll on Mobile)
const VisualFeatures = () => {
  const features = [
    { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: "Verified Guides", desc: "Expert vetted destinations." },
    { icon: <Wallet className="w-6 h-6 md:w-8 md:h-8" />, title: "Budget Hacks", desc: "Save money traveling." },
    { icon: <MapPin className="w-6 h-6 md:w-8 md:h-8" />, title: "Hidden Gems", desc: "Beyond tourist traps." },
    { icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />, title: "Smart Plans", desc: "Day-by-day itineraries." },
  ];

  return (
    <Section className="py-12 md:py-20 bg-white border-b border-gray-100">
      <Container>
         {/* Grid on Desktop, Horizontal Scroll on Mobile */}
         <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-4 gap-4 md:gap-8 snap-x no-scrollbar">
            {features.map((f, i) => (
              <div key={i} className="snap-start min-w-[240px] md:min-w-0 flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-all duration-300">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 md:mb-6">
                    {f.icon}
                 </div>
                 <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{f.title}</h3>
                 <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
         </div>
      </Container>
    </Section>
  );
};

// 3. BENTO GRID CATEGORIES (Responsive Layout)
const BentoCategories = ({ categories }: { categories: Category[] }) => {
  if (!categories.length) return null;

  const featuredCats = categories.slice(0, 4);

  return (
    <Section className="bg-gray-50 py-12 md:py-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div>
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-xs md:text-sm">Browse by Interest</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">Curated Collections</h2>
          </div>
          <Link href="/categories" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black font-medium transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:h-[400px]">
          {/* Main Large Card - Full width on mobile */}
          <Link href={`/blogs?category=${featuredCats[0]?.slug}`} className="group relative col-span-1 md:col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-sm h-[300px] md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" 
              alt={featuredCats[0]?.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
              <span className="px-3 py-1 bg-white text-black text-[10px] md:text-xs font-bold rounded-full mb-3 inline-block">Most Popular</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredCats[0]?.name}</h3>
              <p className="text-white/90 text-xs md:text-sm max-w-xs line-clamp-2">Explore our most comprehensive guides and hidden gems.</p>
            </div>
          </Link>

          {/* Secondary Cards */}
          {featuredCats.slice(1).map((cat, idx) => (
            <Link key={cat.id} href={`/blogs?category=${cat.slug}`} className={`group relative rounded-2xl overflow-hidden shadow-sm h-[200px] md:h-auto ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
               <img 
                 src={`https://source.unsplash.com/random/400x400/?${cat.slug},travel`} 
                 onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400"}
                 alt={cat.name}
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
               />
               <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20">
                 <h3 className="text-lg md:text-xl font-bold text-white">{cat.name}</h3>
                 <span className="text-white/80 text-xs">{cat.count} Articles</span>
               </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// 4. MAGAZINE FEATURED (Mobile Stacked Layout)
const MagazineFeatured = ({ post }: { post: WordPressPost | null }) => {
  if (!post) return null;
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

  return (
    <Section className="bg-[#111] text-white py-16 lg:py-32 relative overflow-hidden">
        {/* Background blobs (reduced opacity for mobile) */}
        <div className="absolute top-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-emerald-900/20 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
             
             {/* Text Content */}
             <div className="lg:col-span-5 space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 text-emerald-400 font-bold tracking-widest uppercase text-xs">
                  <span className="w-8 h-[2px] bg-emerald-400"></span>
                  Editors Choice
                </div>
                
                <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                  {post.title.rendered}
                </h2>
                
                <p className="text-gray-400 text-base md:text-lg leading-relaxed line-clamp-4">
                  {stripHtml(post.excerpt.rendered)}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                   <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-full h-12">
                      <Link href={`/${post.slug}`}>Read Article</Link>
                   </Button>
                   <Button variant="outline" asChild size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-full h-12">
                      <Link href="/blogs">View All</Link>
                   </Button>
                </div>
             </div>

             {/* Image Content */}
             <div className="lg:col-span-7 w-full relative group">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                   {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                      <img 
                        src={post._embedded['wp:featuredmedia'][0].source_url} 
                        alt={post.title.rendered}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                   ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">No Image</div>
                   )}
                   
                   {/* Mobile Overlay only */}
                   <div className="lg:hidden absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="text-white text-xs font-medium">Featured Story</div>
                   </div>
                </div>
             </div>
          </div>
        </Container>
    </Section>
  );
};

// 5. BANNER (Responsive Placeholder)
const ModernBannerSlider = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <Container>
         <div className="w-full h-32 md:h-48 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 text-sm md:text-base">
            Dynamic Banner Slider Area
         </div>
      </Container>
    </div>
  );
};

// MAIN COMPONENT
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
        console.error(error);
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

      <MagazineFeatured post={featuredPosts[0]} />

      <Section className="bg-white pt-16 md:pt-20">
        <Container>
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
             <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Now</h2>
             <Link href="/blogs?filter=trending" className="text-emerald-600 text-sm font-semibold hover:underline">View All</Link>
          </div>
          {/* Scrollable on mobile, grid on desktop */}
          <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 gap-6 snap-x no-scrollbar">
             {featuredPosts.slice(1, 4).map(post => (
               <div key={post.id} className="snap-start min-w-[280px] md:min-w-0">
                 <BlogCard post={post} />
               </div>
             ))}
          </div>
        </Container>
      </Section>

      <ModernBannerSlider />

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
