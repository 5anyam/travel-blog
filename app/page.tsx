"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Compass } from "lucide-react";
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
    "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
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
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
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

/* ═══════════════════════════════ SKELETONS ═══════════════════════════════ */

function SkeletonBox({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`} />;
}

function HeroSliderSkeleton() {
  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <Container>
        <div className="mb-3">
          <SkeletonBox className="h-2.5 w-20 mb-1.5" />
          <SkeletonBox className="h-6 w-56" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <SkeletonBox className="h-[220px] sm:h-[260px] md:h-[290px] w-full rounded-xl" />
          </div>
          <div className="hidden md:flex flex-col gap-0 rounded-xl overflow-hidden border border-gray-100">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="px-3 py-2.5 border-b border-gray-100 last:border-0">
                <SkeletonBox className="h-2.5 w-12 mb-1.5" />
                <SkeletonBox className="h-3.5 w-full mb-1" />
                <SkeletonBox className="h-3.5 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function CategoryCarouselSkeleton() {
  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <Container>
        <div className="flex items-center justify-between mb-3">
          <div>
            <SkeletonBox className="h-2.5 w-14 mb-1.5" />
            <SkeletonBox className="h-5 w-40" />
          </div>
        </div>
        <div className="flex gap-3 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shrink-0 w-[72%] sm:w-[44%] md:w-[30%] lg:w-[22%]">
              <SkeletonBox className="h-28 w-full rounded-xl mb-2" />
              <SkeletonBox className="h-3 w-24 rounded" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function MainContentSkeleton() {
  return (
    <div className="bg-white py-4">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 space-y-4">
            <SkeletonBox className="h-[180px] w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <SkeletonBox className="h-36 w-full rounded-xl mb-2" />
                  <SkeletonBox className="h-4 w-full mb-1" />
                  <SkeletonBox className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          </div>
          <aside className="hidden lg:block lg:col-span-4 space-y-3">
            <SkeletonBox className="h-2.5 w-28" />
            <SkeletonBox className="aspect-square w-full rounded-xl" />
            <SkeletonBox className="aspect-square w-full rounded-xl" />
          </aside>
        </div>
      </Container>
    </div>
  );
}

/* ═══════════════════════════ SQUARE SIDEBAR AD ═══════════════════════════ */

function SidebarSquareAd({
  href,
  imgSrc,
  alt,
}: {
  href: string;
  imgSrc: string;
  alt: string;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1 px-0.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-gray-400">
          Sponsored
        </span>
        <span className="bg-gray-100 text-gray-400 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
          Ad
        </span>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-300">
          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-full p-3 object-contain group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
      </a>
    </div>
  );
}

/* ══════════════════════════ INLINE AD BANNER ══════════════════════════ */

function InlineAdBanner({
  href,
  imgSrc,
  alt,
}: {
  href: string;
  imgSrc: string;
  alt: string;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-gray-400">
          Sponsored
        </span>
        <span className="bg-gray-100 text-gray-400 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
          Ad
        </span>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="relative w-full h-[90px] md:h-[110px] rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300">
          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-full py-2 px-6 object-contain group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </a>
    </div>
  );
}

/* ═══════════════════════════════ HERO SLIDER ═══════════════════════════════ */

function HeroPostSlider({ posts }: { posts: WordPressPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = posts.slice(0, 5);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;
  const active = slides[activeIndex];

  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <Container>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-[0.2em]">
              Latest Articles
            </span>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Fresh guides, reviews &amp; deals
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live updates
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-start">
          {/* Main featured image */}
          <div className="md:col-span-2">
            <Link href={`/${active.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative h-[200px] sm:h-[250px] md:h-[290px] overflow-hidden">
                  {active._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <img
                      src={active._embedded["wp:featuredmedia"][0].source_url}
                      alt={active._embedded["wp:featuredmedia"][0].alt_text || active.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute left-3 right-3 bottom-3 text-white">
                    <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-[0.18em] bg-emerald-500 px-2 py-0.5 rounded-full mb-1.5">
                      Featured
                    </span>
                    <h2 className="text-sm sm:text-base md:text-lg font-bold line-clamp-2 leading-snug">
                      {active.title.rendered}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-gray-300 line-clamp-1 hidden sm:block">
                      {stripHtml(active.excerpt.rendered)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>
                      {new Date(active.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>4–7 min read</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    Read now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Slide list */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 mb-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-6 bg-emerald-500" : "w-2 bg-gray-300 hover:bg-emerald-300"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="hidden md:block rounded-xl border border-gray-100 bg-gray-50 divide-y divide-gray-100 overflow-hidden">
              {slides.map((post, idx) => (
                <button
                  key={post.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 transition-colors duration-200 ${
                    idx === activeIndex ? "bg-emerald-50" : "hover:bg-white"
                  }`}
                >
                  <p className="text-[10px] text-gray-400 mb-0.5 font-medium">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                  <p
                    className={`text-xs font-semibold line-clamp-2 leading-snug ${
                      idx === activeIndex ? "text-emerald-700" : "text-gray-800"
                    }`}
                  >
                    {post.title.rendered}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════ CATEGORY CAROUSEL ══════════════════════════ */

function CategoryCarousel({ categories }: { categories: Category[] }) {
  const cats = useMemo(
    () => categories.filter((c) => c.count > 0 && c.slug !== "uncategorized").slice(0, 12),
    [categories]
  );
  if (!cats.length) return null;

  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <Container>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-wider">
              Browse
            </span>
            <h2 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
              Explore Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-gray-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {cats.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/blogs?category=${cat.slug}`}
              className="snap-start shrink-0 w-[72%] sm:w-[44%] md:w-[30%] lg:w-[22%] rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-28 md:h-32 overflow-hidden">
                <img
                  src={getCategoryImage(cat.slug, idx)}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <div className="text-sm font-bold leading-tight line-clamp-1">{cat.name}</div>
                  <div className="text-[10px] opacity-80 font-medium">{cat.count} Articles</div>
                </div>
              </div>
              <div className="px-3 py-2 bg-white">
                <div className="text-xs font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ═══════════════════════ FEATURED PARTNER BANNER ═══════════════════════ */

const FeaturedPartner = () => (
  <div className="border-b border-gray-100 py-2 bg-white">
    <Container>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-600">Featured Partners</span>
        <span className="bg-gray-100 text-gray-400 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
          Sponsored
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <InlineAdBanner
          href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm1"
          imgSrc="https://www.lookfantastic.at/images?url=https://static.thcdn.com/widgets/95-fr/17/original-LookFantastic_TopBanner_dt_1900x600_GENERIC_S22-104617.png&format=webp&auto=avif&width=1920&fit=cover"
          alt="Featured partner 1"
        />
        <InlineAdBanner
          href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm2"
          imgSrc="https://www.lookfantastic.at/images?url=https://static.thcdn.com/widgets/95-fr/17/original-LookFantastic_TopBanner_dt_1900x600_GENERIC_S22-104617.png&format=webp&auto=avif&width=1920&fit=cover"
          alt="Featured partner 2"
        />
        <InlineAdBanner
          href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm3"
          imgSrc="https://www.lookfantastic.at/images?url=https://static.thcdn.com/widgets/95-fr/17/original-LookFantastic_TopBanner_dt_1900x600_GENERIC_S22-104617.png&format=webp&auto=avif&width=1920&fit=cover"
          alt="Featured partner 3"
        />
      </div>
    </Container>
  </div>
);


/* ═══════════════════════ MAGAZINE FEATURED (Dark) ═══════════════════════ */

const MagazineFeatured = ({ post }: { post: WordPressPost | null }) => {
  if (!post) return null;
  return (
    <div className="bg-[#0f0f0f] text-white rounded-xl overflow-hidden relative mb-4">
      <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-900/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 p-4 md:p-5">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-6 items-center">
          <div className="space-y-2.5">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[10px] tracking-widest mb-2">
                <span className="w-5 h-[2px] bg-emerald-400" />
                Editor&apos;s Pick
              </div>
              <h2 className="text-base md:text-xl font-extrabold leading-tight tracking-tight">
                {post.title.rendered}
              </h2>
            </div>
            <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
              {stripHtml(post.excerpt.rendered)}
            </p>
            <Button
              asChild
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-5 h-8 text-xs font-bold tracking-wide"
            >
              <Link href={`/${post.slug}`}>Read Article →</Link>
            </Button>
          </div>
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═════════════════════════ TRENDING GRID ═════════════════════════ */

const TrendingGrid = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length < 3) return null;
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
        <h2 className="text-base md:text-lg font-extrabold text-gray-900 flex items-center gap-2 tracking-tight">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Trending Now
        </h2>
        <Link
          href="/blogs?filter=trending"
          className="text-emerald-600 text-xs font-semibold hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="flex overflow-x-auto pb-3 md:pb-0 md:grid md:grid-cols-3 gap-3 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {posts.slice(0, 3).map((post) => (
          <div key={post.id} className="snap-start min-w-[260px] md:min-w-0">
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═════════════════════════ BENTO CATEGORIES ═════════════════════════ */

const BentoCategories = ({ categories }: { categories: Category[] }) => {
  if (!categories.length) return null;
  const featuredCats = categories.slice(0, 4);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-wider">
            Topics
          </span>
          <h2 className="text-lg md:text-2xl font-extrabold text-gray-900 tracking-tight">
            Collections
          </h2>
        </div>
        <Link
          href="/categories"
          className="text-xs font-semibold text-gray-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 h-auto md:h-[300px]">
        {/* Large left tile */}
        <Link
          href={`/blogs?category=${featuredCats[0]?.slug}`}
          className="md:col-span-2 md:row-span-2 relative group rounded-xl overflow-hidden h-[170px] md:h-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent z-10" />
          <img
            src={getCategoryImage(featuredCats[0].slug, 0)}
            alt={featuredCats[0].name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 z-20 text-white">
            <span className="text-[9px] font-bold bg-emerald-500 px-2 py-0.5 rounded-full mb-2 inline-block uppercase tracking-wider">
              Most Popular
            </span>
            <h3 className="text-lg font-extrabold leading-tight">{featuredCats[0].name}</h3>
            <p className="text-xs opacity-80 mt-0.5">{featuredCats[0].count} Articles</p>
          </div>
        </Link>

        {/* Smaller tiles */}
        {featuredCats.slice(1).map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/blogs?category=${cat.slug}`}
            className={`relative group rounded-xl overflow-hidden h-[120px] md:h-auto ${
              idx === 2 ? "md:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img
              src={getCategoryImage(cat.slug, idx + 1)}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              alt={cat.name}
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 z-20 text-white">
              <h3 className="text-sm font-bold leading-tight">{cat.name}</h3>
              <span className="text-[10px] opacity-80">{cat.count} Articles</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════ PREMIUM SIDEBAR ══════════════════════════ */

function PremiumSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-4">
      <div className="sticky top-20 space-y-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Sponsored Placements
        </p>

        {/* Square Ad 1 */}
        <SidebarSquareAd
          href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=right1"
          imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
          alt="Advertisement"
        />

        <div className="border-t border-gray-100" />

        {/* Square Ad 2 */}
        <SidebarSquareAd
          href="https://fiverr.com/"
          imgSrc="https://fiverr.ck-cdn.com/tn/serve/?cid=45097613"
          alt="Advertisement"
        />

        <div className="border-t border-gray-100" />

        {/* Premium CTA Widget */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-100 p-4 text-center">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2.5">
            <Compass className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs font-extrabold text-gray-900 mb-1 tracking-tight">
            Plan Your Next Trip
          </p>
          <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">
            Handpicked destinations, travel guides &amp; exclusive deals.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-3.5 py-1.5 rounded-full transition-colors"
          >
            Explore Guides <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* ═════════════════════════ MAIN PAGE ═════════════════════════ */

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
          fetch(`${WP_API_URL}/categories?per_page=12&orderby=count&order=desc`),
        ]);
        if (featuredRes.ok) setFeaturedPosts(await featuredRes.json());
        if (postsRes.ok) setAllPosts(await postsRes.json());
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
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
      <div className="bg-white">
        <HeroSliderSkeleton />
        <CategoryCarouselSkeleton />
        <MainContentSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Slider */}
      <HeroPostSlider posts={featuredPosts} />

      {/* Category Scroll */}
      <CategoryCarousel categories={categories} />

      {/* Featured Partner Banner */}
      <FeaturedPartner />

      {/* Main Grid: Content + Sidebar */}
      <div className="bg-white py-4">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Main Content */}
            <div className="lg:col-span-8">
              <MagazineFeatured post={featuredPosts[0] ?? null} />
              <TrendingGrid posts={featuredPosts.slice(1, 4)} />
              <BentoCategories categories={categories} />
            </div>

            {/* Right: Premium Square Ad Sidebar */}
            <PremiumSidebar />
          </div>
        </Container>
      </div>

      {/* Latest Posts Grid */}
      <div className="bg-gray-50 border-t border-gray-100 py-4">
        <Container>
          <LatestPostsGrid
            posts={allPosts}
            isLoading={false}
            title="Latest Articles"
            showViewAll={true}
            viewAllLink="/blogs"
          />
        </Container>
      </div>
    </div>
  );
}
