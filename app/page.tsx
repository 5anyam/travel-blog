"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/BlogCard";
import { LatestPostsGrid } from "@/components/LatestPostsGrid";
import { useEffect, useMemo, useState } from "react";

const WP_API_URL = "https://cms.clubmytrip.com/wp-json/wp/v2";

const getCategoryImage = (slug: string, index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
    "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&q=80",
    "https://images.unsplash.com/photo-1526566762798-8fac9c07aa98?w=800&q=80",
    "https://images.unsplash.com/photo-1572048572872-2394404cf1f3?w=800&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    "https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=800&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=800&q=80",
    "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?w=800&q=80",
  ];
  return images[index % images.length];
};

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

function AdBanner({
  href,
  imgSrc,
  alt,
}: {
  href: string;
  imgSrc: string;
  alt: string;
}) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
          Sponsored
        </span>
        <span className="text-[10px] text-gray-300">Advertisement</span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden h-[120px] md:h-[160px]">
          <div className="absolute inset-0 bg-gray-50" />
          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-full p-2 md:p-3 object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </a>
    </div>
  );
}

/* ----------------------------- HERO SECTION ----------------------------- */
function HeroSection({ posts }: { posts: WordPressPost[] }) {
  if (!posts.length) return null;

  const activePost = posts[0];

  return (
    <Section className="bg-gradient-to-br from-emerald-50 via-white to-gray-50 pt-12 pb-16 md:pt-20 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/20 to-transparent" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Hero content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Live: Latest Stories
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {activePost.title.rendered}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              {stripHtml(activePost.excerpt.rendered)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8">
                <Link href={`/${activePost.slug}`}>Read Full Guide</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="rounded-full px-8">
                <Link href="/blogs">View All Stories</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 pt-2">
              <span>{new Date(activePost.date).toLocaleDateString("en-IN")}</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm border border-white/30">
              {activePost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                <img
                  src={activePost._embedded["wp:featuredmedia"][0].source_url}
                  alt={activePost.title.rendered}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Featured image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- MAIN CONTENT GRID ----------------------------- */
function MainContent({ posts, categories }: { posts: WordPressPost[]; categories: Category[] }) {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-12">
          {/* Left: Main feed */}
          <div className="xl:col-span-2 space-y-12">
            {/* Featured magazine style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 6).map((post, idx) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Categories */}
            <div className="pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-emerald-600" />
                Explore by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.slice(0, 8).map((cat, idx) => (
                  <Link
                    key={cat.id}
                    href={`/blogs?category=${cat.slug}`}
                    className="group relative rounded-2xl overflow-hidden h-32 md:h-40 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={getCategoryImage(cat.slug, idx)}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="font-bold text-sm md:text-base leading-tight">
                        {cat.name}
                      </div>
                      <div className="text-xs opacity-90">{cat.count} posts</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sponsored sidebar */}
          <div className="xl:col-span-1 mt-12 xl:mt-0 xl:sticky xl:top-24 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Featured Partners
            </h3>
            
            <div className="space-y-4">
              <AdBanner
                href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=right1"
                imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
                alt="Sephora India beauty offers"
              />
              <AdBanner
                href="https://fiverr.com/"
                imgSrc="https://media.licdn.com/dms/image/v2/D5612AQHbkZGFEYKE8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680706756544?e=2147483647&v=beta&t=_lgS0dv9rhaIBXVE7kq1-lBKu5E0EtS_fmeCXA9zdWY"
                alt="Fiverr freelance services"
              />
              <AdBanner
                href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=right2"
                imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
                alt="Exclusive travel deals"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- MAIN PAGE ----------------------------- */
export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=12&orderby=date`),
          fetch(`${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`),
        ]);

        if (postsRes.ok) {
          const posts = await postsRes.json();
          setFeaturedPosts(posts);
          setAllPosts(posts);
        }
        
        if (categoriesRes.ok) {
          const cats: Category[] = await categoriesRes.json();
          setCategories(cats.filter(c => c.count > 0 && c.slug !== "uncategorized"));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading fresh content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <HeroSection posts={featuredPosts} />
      
      {/* Main content grid */}
      <MainContent posts={featuredPosts} categories={categories} />

      {/* Newsletter / CTA footer */}
      <Section className="bg-emerald-600 text-white py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get exclusive deals delivered
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 10K+ subscribers getting the best offers straight to their inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 border-none focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-8 font-semibold">
                Subscribe Free
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
