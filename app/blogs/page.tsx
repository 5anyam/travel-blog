import { Metadata } from "next";
import { Calendar, Clock, ArrowRight, Search, Filter, Tag } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Travel Guides & Articles - Expert Tips for Travelers',
  description: 'Discover comprehensive travel guides, destination reviews, budget tips, and expert advice for your next adventure. Read authentic travel experiences from real travelers.',
  keywords: 'travel guides, destination guides, travel blog, travel tips, budget travel, solo travel, adventure travel, travel advice, vacation planning, backpacking guides',
  openGraph: {
    title: 'Travel Guides & Articles | ClubMyTrip',
    description: 'Expert travel guides and destination reviews from experienced travelers',
    images: ['/og-blogs.jpg'],
  },
};

// WordPress API URL
const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

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
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
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

// Fetch posts from WordPress
async function getPosts(): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=24`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch categories
async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const cats = await res.json();
    return cats.filter((cat: Category) => cat.count > 0 && cat.slug !== 'uncategorized');
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().substring(0, 160) + '...';
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Page Header Component
const BlogsHeader = () => {
  return (
    <Section className="bg-white border-b-2 border-gray-200">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black font-semibold">All Articles</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Travel Stories & Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Explore our collection of travel guides, destination reviews, and expert tips 
            from experienced travelers around the world. Find inspiration for your next adventure.
          </p>
        </div>
      </Container>
    </Section>
  );
};

// Search & Filter Bar
const SearchFilterBar = () => {
  return (
    <Section className="bg-gray-50 border-b-2 border-gray-200 sticky top-0 z-30">
      <Container>
        <div className="py-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="flex items-center border-2 border-gray-300 bg-white">
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="flex-1 px-4 py-3 focus:outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 items-center">
            <Button variant="outline" className="border-2 border-gray-300 hover:border-black">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <select className="px-4 py-3 border-2 border-gray-300 bg-white focus:outline-none focus:border-black font-semibold">
              <option>Latest</option>
              <option>Most Popular</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Featured Post Component
const FeaturedPost = ({ post }: { post: WordPressPost }) => {
  return (
    <Section className="bg-white border-b-2 border-gray-200">
      <Container>
        <div className="py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold tracking-wide uppercase mb-6">
            Featured Article
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <Link href={`/blogs/${post.slug}`}>
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-gray-200 hover:border-black transition-all">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Calendar className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>
            </Link>

            {/* Content */}
            <div>
              {post._embedded?.['wp:term']?.[0]?.[0] && (
                <Link 
                  href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
                  className="text-xs font-bold tracking-wide uppercase text-gray-500 hover:text-black transition-colors mb-4 inline-block"
                >
                  {post._embedded['wp:term'][0][0].name}
                </Link>
              )}

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                <Link href={`/blogs/${post.slug}`} className="hover:text-gray-600 transition-colors">
                  {post.title.rendered}
                </Link>
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {stripHtml(post.excerpt.rendered)}
              </p>

              <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                {post._embedded?.author?.[0]?.name && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                      {post._embedded.author[0].name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {post._embedded.author[0].name}
                    </span>
                  </div>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {calculateReadingTime(post.content.rendered)} min
                </span>
              </div>

              <Button size="lg" asChild className="bg-black hover:bg-gray-800 text-white px-8">
                <Link href={`/blogs/${post.slug}`}>
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Articles Grid
const ArticlesGrid = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) {
    return (
      <Section className="bg-white">
        <Container>
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-gray-200 mx-auto mb-6 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-8">Check back soon for new travel stories and guides.</p>
            <Button asChild className="bg-black hover:bg-gray-800">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blogs/${post.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100 border-2 border-gray-200 group-hover:border-black transition-all">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-gray-300" />
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
                    <span>{calculateReadingTime(post.content.rendered)} min</span>
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

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold px-10"
          >
            Load More Articles
          </Button>
        </div>
      </Container>
    </Section>
  );
};

// Categories Section
const CategoriesSection = ({ categories }: { categories: Category[] }) => {
  return (
    <Section className="bg-gray-50 border-y-2 border-gray-200">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Tag className="w-8 h-8" />
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600">
            Find articles organized by destination and travel style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blogs?category=${category.slug}`}
              className="group p-6 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all text-center"
            >
              <div className="font-bold text-lg mb-1 group-hover:underline">
                {category.name}
              </div>
              <div className="text-sm opacity-75">
                {category.count} {category.count === 1 ? 'article' : 'articles'}
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
              View All Categories
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

// Newsletter CTA
const NewsletterCTA = () => {
  return (
    <Section className="bg-black text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center py-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Get Travel Tips in Your Inbox
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our weekly newsletter for exclusive guides, tips, and travel inspiration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white border-2 border-white"
            />
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-bold px-8"
            >
              Subscribe Free
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Join 50,000+ travelers. No spam, unsubscribe anytime.
          </p>
        </div>
      </Container>
    </Section>
  );
};

// Main Page Component
export default async function BlogsPage() {
  const posts = await getPosts();
  const categories = await getCategories();
  
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <BlogsHeader />
      <SearchFilterBar />
      
      {featuredPost && <FeaturedPost post={featuredPost} />}
      
      <ArticlesGrid posts={remainingPosts} />
      
      <CategoriesSection categories={categories} />
      
      <NewsletterCTA />
    </>
  );
}
