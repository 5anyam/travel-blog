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
    "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
  ];
  return images[index % images.length];
};

// ✅ FIX 1: alt_text required (not optional), author removed to match BlogCard exactly
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

/* ----------------------------- Banner ----------------------------- */
function AdBanner({
  href,
  imgSrc,
  alt,
  heightClass = "h-[120px] md:h-[160px]",
}: {
  href: string;
  imgSrc: string;
  alt: string;
  heightClass?: string;
}) {
  return (
    <div className="w-full my-4 md:my-6">
      <div className="flex items-center justify-between mb-2">
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
        <div
          className={[
            "relative w-full",
            heightClass,
            "bg-white border border-gray-200 rounded-xl shadow-sm",
            "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden",
          ].join(" ")}
        >
          <div className="absolute inset-0 bg-gray-50" />
          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            className="relative w-full h-full p-3 md:p-4 object-contain group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </a>
    </div>
  );
}

/* ----------------------------- HERO SLIDER ----------------------------- */
// ✅ FIX 2: Responsive & compact height slider
function HeroPostSlider({ posts }: { posts: WordPressPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = posts.slice(0, 5);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  const active = slides[activeIndex];

  return (
    <Section className="bg-gradient-to-b from-gray-50 to-white pt-4 pb-8 md:pt-8 md:pb-10 border-b border-gray-100">
      <Container>
        {/* Top heading — compact on mobile */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-emerald-600 font-bold uppercase text-xs tracking-[0.18em]">
              Latest Stories
            </span>
            <h1 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Discover fresh guides & deals
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 shrink-0">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live updates
          </div>
        </div>

        {/* Slider grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
          {/* ✅ FIX 3: fixed height instead of aspect ratio — prevents huge height on mobile */}
          <div className="md:col-span-2">
            <Link href={`/${active.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-500">
                <div className="relative h-[200px] sm:h-[260px] md:h-[300px] overflow-hidden">
                  {active._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <img
                      src={active._embedded["wp:featuredmedia"][0].source_url}
                      alt={active._embedded["wp:featuredmedia"][0].alt_text || active.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-3 right-3 bottom-3 text-white">
                    <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] bg-white/15 backdrop-blur-sm px-2 py-1 rounded-full mb-1.5">
                      Featured
                    </span>
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
                      {active.title.rendered}
                    </h2>
                    <p className="mt-1 text-xs text-gray-200 line-clamp-1 hidden sm:block">
                      {stripHtml(active.excerpt.rendered)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
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
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    Read now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* ✅ FIX 4: side list hidden on mobile, dots shown always */}
          <div className="flex flex-col gap-2">
            {/* dots — always visible */}
            <div className="flex items-center gap-2 mb-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-6 bg-emerald-500"
                      : "w-2 bg-gray-300 hover:bg-emerald-300"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* vertical list — desktop only */}
            <div className="hidden md:block rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-3 space-y-1 max-h-[280px] overflow-y-auto no-scrollbar">
              {slides.map((post, idx) => (
                <button
                  key={post.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left rounded-xl px-2 py-2 transition-colors duration-200 ${
                    idx === activeIndex ? "bg-emerald-50" : "hover:bg-gray-50"
                  }`}
                >
                  <p className="text-[10px] text-gray-400 mb-0.5">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {post.title.rendered}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- Category Carousel ----------------------------- */
function CategoryCarousel({ categories }: { categories: Category[] }) {
  const cats = useMemo(
    () =>
      categories
        .filter((c) => c.count > 0 && c.slug !== "uncategorized")
        .slice(0, 12),
    [categories]
  );

  if (!cats.length) return null;

  return (
    <Section className="bg-white py-8 md:py-10 border-b border-gray-100">
      <Container>
        <div className="flex items-end justify-between mb-5 md:mb-7">
          <div>
            <span className="text-emerald-600 font-bold uppercase text-xs tracking-wider">
              Browse
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Explore by Category
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Swipe and pick what you want to read.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-sm font-semibold text-gray-600 hover:text-black flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {cats.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/blogs?category=${cat.slug}`}
              className="snap-start shrink-0 w-[82%] sm:w-[52%] md:w-[34%] lg:w-[26%] rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition"
            >
              <div className="relative h-36 md:h-40">
                <img
                  src={getCategoryImage(cat.slug, idx)}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-base font-bold leading-tight line-clamp-1">
                    {cat.name}
                  </div>
                  <div className="text-xs opacity-90">{cat.count} Articles</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold text-gray-900">
                  Read {cat.name} guides
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Tap to explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- FEATURED PARTNER ----------------------------- */
const VisualFeatures = () => {
  return (
    <Section className="bg-white py-6 md:py-8 border-y border-gray-100">
      <Container>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-700">
            Featured Partner
          </h2>
          <span className="text-xs text-gray-400">
            Handpicked brand we recommend
          </span>
        </div>
        <AdBanner
          href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm"
          imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
          alt="Sephora India beauty offers banner"
        />
      </Container>
    </Section>
  );
};

/* ----------------------------- MAGAZINE FEATURED ----------------------------- */
const MagazineFeatured = ({ post }: { post: WordPressPost | null }) => {
  if (!post) return null;

  return (
    <Section className="bg-[#111] text-white py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-900/20 rounded-full blur-[80px] pointer-events-none" />
      <Container className="relative z-10">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                <span className="w-8 h-[2px] bg-emerald-400" />
                Editors Choice
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                Expert‑curated guides, offers & product recommendations
              </p>
            </div>
            <h2 className="text-xl md:text-3xl font-serif font-bold leading-tight">
              {post.title.rendered}
            </h2>
            <p className="text-gray-400 text-sm md:text-base line-clamp-3">
              {stripHtml(post.excerpt.rendered)}
            </p>
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-full px-8 h-11"
              >
                <Link href={`/${post.slug}`}>Read Guide & Offers</Link>
              </Button>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
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
      </Container>
    </Section>
  );
};

/* ----------------------------- TRENDING ----------------------------- */
const TrendingGrid = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length < 3) return null;

  return (
    <Section className="bg-white py-10 md:py-16">
      <Container>
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Trending Now
          </h2>
          <Link
            href="/blogs?filter=trending"
            className="text-emerald-600 text-sm font-semibold hover:underline whitespace-nowrap"
          >
            View All
          </Link>
        </div>

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

/* ----------------------------- BENTO CATEGORIES ----------------------------- */
const BentoCategories = ({ categories }: { categories: Category[] }) => {
  if (!categories.length) return null;
  const featuredCats = categories.slice(0, 4);

  return (
    <Section className="bg-gray-50 py-10 md:py-16">
      <Container>
        <div className="flex flex-row justify-between items-end mb-6 md:mb-10">
          <div>
            <span className="text-emerald-600 font-bold uppercase text-xs tracking-wider">
              Interests
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Collections
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-semibold text-gray-600 hover:text-black flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[400px]">
          <Link
            href={`/blogs?category=${featuredCats[0]?.slug}`}
            className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden h-[220px] md:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img
              src={getCategoryImage(featuredCats[0].slug, 0)}
              alt={featuredCats[0].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-5 left-5 z-20 text-white">
              <span className="text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2 py-1 rounded mb-2 inline-block">
                MOST POPULAR
              </span>
              <h3 className="text-xl font-bold">{featuredCats[0].name}</h3>
              <p className="text-sm opacity-90">{featuredCats[0].count} Articles</p>
            </div>
          </Link>

          {featuredCats.slice(1).map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/blogs?category=${cat.slug}`}
              className={`relative group rounded-2xl overflow-hidden h-[160px] md:h-auto ${
                idx === 2 ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                src={getCategoryImage(cat.slug, idx + 1)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={cat.name}
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="text-base font-bold">{cat.name}</h3>
                <span className="text-xs opacity-80">{cat.count} Articles</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

/* ----------------------------- MAIN PAGE ----------------------------- */
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

        if (featuredRes.ok) {
          const data: WordPressPost[] = await featuredRes.json();
          setFeaturedPosts(data);
        }
        if (postsRes.ok) {
          const data: WordPressPost[] = await postsRes.json();
          setAllPosts(data);
        }
        if (categoriesRes.ok) {
          const cats: Category[] = await categoriesRes.json();
          setCategories(cats);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      {/* Section 1: Hero slider */}
      <HeroPostSlider posts={featuredPosts} />

      {/* Section 2: Categories strip */}
      <CategoryCarousel categories={categories} />

      {/* Section 3: Main content + sticky sidebar */}
      <Section className="bg-white py-10 md:py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left content */}
            <div className="lg:col-span-8 space-y-0">
              <MagazineFeatured post={featuredPosts[0] ?? null} />
              <TrendingGrid posts={featuredPosts.slice(1, 4)} />
              <BentoCategories categories={categories} />
            </div>

            {/* Right sticky sidebar - desktop only */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Sponsored placements
                </h3>
                <AdBanner
                  href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=right1"
                  imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
                  alt="Sephora India beauty offers banner"
                  heightClass="h-[160px]"
                />
                <AdBanner
                  href="https://fiverr.com/"
                  imgSrc="https://media.licdn.com/dms/image/v2/D5612AQHbkZGFEYKE8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680706756544?e=2147483647&v=beta&t=_lgS0dv9rhaIBXVE7kq1-lBKu5E0EtS_fmeCXA9zdWY"
                  alt="Fiverr freelance services promotion"
                  heightClass="h-[160px]"
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Mid-page featured partner */}
      <VisualFeatures />

      {/* Latest Posts + bottom banner */}
      <Section className="bg-gray-50 py-12 md:py-16">
        <Container>
          <LatestPostsGrid
            posts={allPosts}
            isLoading={isLoading}
            title="Latest Stories"
            showViewAll={true}
            viewAllLink="/blogs"
          />
          <AdBanner
            href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=pld"
            imgSrc="https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698"
            alt="Sephora India beauty offers banner"
          />
        </Container>
      </Section>
    </div>
  );
}
