import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag, User, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      description?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

// Fetch all posts for static generation
async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=100`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch single post
async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return null;
    
    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch related posts
async function getRelatedPosts(categoryIds: number[], currentPostId: number): Promise<WordPressPost[]> {
  try {
    if (categoryIds.length === 0) return [];
    
    const res = await fetch(
      `${WP_API_URL}/posts?categories=${categoryIds[0]}&per_page=3&exclude=${currentPostId}&_embed`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Generate static params
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return { title: 'Article Not Found | ClubMyTrip' };
  }

  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-image.jpg';

  return {
    title: `${post.title.rendered} | ClubMyTrip`,
    description: description,
    keywords: 'travel guide, destination guide, travel tips, travel advice, vacation planning',
    authors: post._embedded?.author?.[0]?.name ? [{ name: post._embedded.author[0].name }] : undefined,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post._embedded?.author?.[0]?.name ? [post._embedded.author[0].name] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description: description,
      images: [imageUrl],
    },
  };
}

// Utility functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

// Article Header Component
const ArticleHeader = ({ post }: { post: WordPressPost }) => {
  return (
    <Section className="bg-white border-b-2 border-gray-200">
      <Container>
        <div className="max-w-4xl mx-auto py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-black transition-colors">
              Articles
            </Link>
            <span>/</span>
            {post._embedded?.['wp:term']?.[0]?.[0] && (
              <>
                <Link 
                  href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
                  className="hover:text-black transition-colors"
                >
                  {post._embedded['wp:term'][0][0].name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-black font-semibold line-clamp-1">
              {post.title.rendered}
            </span>
          </nav>

          {/* Category Badge */}
          {post._embedded?.['wp:term']?.[0]?.[0] && (
            <Link 
              href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold tracking-wide uppercase mb-6 hover:bg-gray-800 transition-colors"
            >
              <Tag className="w-3 h-3" />
              {post._embedded['wp:term'][0][0].name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title.rendered}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {stripHtml(post.excerpt.rendered)}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-8 border-b-2 border-gray-200">
            {post._embedded?.author?.[0]?.name && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-bold text-gray-700 text-lg">
                  {post._embedded.author[0].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {post._embedded.author[0].name}
                  </div>
                  <div className="text-xs">Travel Writer</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{calculateReadingTime(post.content.rendered)} min read</span>
            </div>

            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>Travel Guide</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Featured Image Component
const FeaturedImage = ({ post }: { post: WordPressPost }) => {
  if (!post._embedded?.['wp:featuredmedia']?.[0]?.source_url) return null;

  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] overflow-hidden border-2 border-gray-200">
            <Image
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post._embedded['wp:featuredmedia'][0].alt_text && (
            <p className="text-sm text-gray-500 mt-3 text-center italic">
              {post._embedded['wp:featuredmedia'][0].alt_text}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
};

// Share Buttons Component
const ShareButtons = ({ post }: { post: WordPressPost }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post.title.rendered;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-700">Share:</span>
      
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  );
};

// Related Posts Component
const RelatedPosts = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) return null;

  return (
    <Section className="bg-gray-50 border-t-2 border-gray-200">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group bg-white border-2 border-gray-200 hover:border-black transition-all">
                <Link href={`/blogs/${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                      <Image
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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

                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-gray-600 transition-colors">
                    <Link href={`/blogs/${post.slug}`}>
                      {post.title.rendered}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{calculateReadingTime(post.content.rendered)} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Enjoyed This Article?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get more travel tips and destination guides delivered to your inbox every week.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 text-gray-900 focus:outline-none border-2 border-white"
            />
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-bold px-8"
            >
              Subscribe Free
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </Section>
  );
};

// Main Blog Post Component
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.categories, post.id);

  return (
    <>
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title.rendered,
            description: stripHtml(post.excerpt.rendered),
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            datePublished: post.date,
            dateModified: post.modified,
            author: {
              '@type': 'Person',
              name: post._embedded?.author?.[0]?.name || 'ClubMyTrip Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'ClubMyTrip',
              logo: {
                '@type': 'ImageObject',
                url: 'https://clubmytrip.com/LOGO.png',
              },
            },
          }),
        }}
      />

      <ArticleHeader post={post} />
      <FeaturedImage post={post} />

      {/* Main Content */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/blogs">
              <Button variant="ghost" size="sm" className="mb-8 hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Articles
              </Button>
            </Link>

            {/* Article Content */}
            <article 
              className="prose prose-lg max-w-none mb-12
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                prose-h2:text-3xl prose-h2:border-b-2 prose-h2:border-gray-200 prose-h2:pb-3
                prose-h3:text-2xl prose-h4:text-xl
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-a:text-black prose-a:font-semibold prose-a:underline hover:prose-a:no-underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-2
                prose-li:marker:text-black prose-li:marker:font-bold
                prose-img:border-2 prose-img:border-gray-200 prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-50 
                prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-white"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Share Section */}
            <div className="pt-8 border-t-2 border-gray-200">
              <ShareButtons post={post} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Newsletter */}
      <NewsletterCTA />
    </>
  );
}
