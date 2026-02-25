"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/BlogCard";
import { LatestPostsGrid } from "@/components/LatestPostsGrid";
import { useEffect, useState } from "react";

const WP_API_URL = "https://cms.clubmytrip.com/wp-json/wp/v2";

// ✅ FIXED INTERFACE - added content property
interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string }; // ✅ This was missing
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
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
    <div className="w-full my-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Sponsored
        </span>
        <span className="text-xs text-gray-400">Advertisement</span>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-[140px] md:h-[180px]">
          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-contain p-4"
          />
        </div>
      </a>
    </div>
  );
}

function HeroSection({ posts }: { posts: WordPressPost[] }) {
  if (!posts?.[0]) return null;

  const post = posts[0];

  return (
    <Section className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            {post.title.rendered}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
            {stripHtml(post.excerpt.rendered)}
          </p>
          <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-full font-semibold shadow-2xl">
            <Link href={`/${post.slug}`}>Read Complete Guide</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function CategoriesSection({ categories }: { categories: Category[] }) {
  const featuredCats = categories.slice(0, 8);

  if (!featuredCats.length) return null;

  return (
    <Section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Travel Guides
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover expert recommendations, deals and insider tips
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredCats.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/blogs?category=${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden h-48 md:h-56 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500"
              />
              <img
                src={`https://images.unsplash.com/photo-${(1000 + idx) % 1000}?w=400&q=80&ixlib=rb-4.0.3`}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg md:text-xl font-bold mb-1">{cat.name}</h3>
                <p className="text-sm opacity-90">{cat.count} Guides</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MainContent({ posts }: { posts: WordPressPost[] }) {
  return (
    <Section className="py-24 bg-white">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3 mx-auto">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
            Trending Now
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked stories and expert recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1, 10).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=15`),
          fetch(`${WP_API_URL}/categories?per_page=20`),
        ]);

        if (postsRes.ok) {
          const fetchedPosts: WordPressPost[] = await postsRes.json();
          setPosts(fetchedPosts);
        }

        if (categoriesRes.ok) {
          const fetchedCats: Category[] = await categoriesRes.json();
          setCategories(fetchedCats.filter(c => c.count > 0 && c.slug !== "uncategorized"));
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-8">
        <div className="text-center animate-pulse space-y-6">
          <div className="w-20 h-20 bg-emerald-200/50 rounded-2xl mx-auto shadow-lg" />
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded-xl w-64 mx-auto" />
            <div className="h-6 bg-gray-100 rounded-lg w-48 mx-auto" />
          </div>
          <div className="h-10 bg-emerald-100 rounded-full w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">Unable to load content. Please refresh.</p>
          <Button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <HeroSection posts={posts} />
      
      {/* Top sponsored */}
      <Container className="py-12">
        <AdBanner
          href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=top"
          imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
          alt="Featured travel partner"
        />
      </Container>

      {/* Categories */}
      <CategoriesSection categories={categories} />
      
      {/* Main content */}
      <MainContent posts={posts} />

      {/* Bottom sponsored + CTA */}
      <Section className="bg-gradient-to-t from-emerald-600 to-emerald-700 text-white py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover More</h2>
            <p className="text-xl opacity-95 max-w-2xl mx-auto">
              Latest guides, deals and expert recommendations
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <AdBanner
              href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=bottom"
              imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
              alt="Exclusive offers"
            />
            <div className="text-center md:text-left max-w-md">
              <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-semibold shadow-2xl mb-4">
                <Link href="/blogs">Browse All Guides</Link>
              </Button>
              <p className="text-lg opacity-90">10K+ readers monthly</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
