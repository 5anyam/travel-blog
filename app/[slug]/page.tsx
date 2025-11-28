import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag, BookOpen } from "lucide-react";
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

// Fetch functions remain the same...
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

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Article Not Found | ClubMyTrip' };

  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-image.jpg';

  return {
    title: `${post.title.rendered} | ClubMyTrip`,
    description: description,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

// Compact Article Header
const ArticleHeader = ({ post }: { post: WordPressPost }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <Container>
        <div className="max-w-4xl mx-auto py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-black">Articles</Link>
            {post._embedded?.['wp:term']?.[0]?.[0] && (
              <>
                <span>/</span>
                <Link 
                  href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
                  className="hover:text-black"
                >
                  {post._embedded['wp:term'][0][0].name}
                </Link>
              </>
            )}
          </nav>

          {/* Category Badge */}
          {post._embedded?.['wp:term']?.[0]?.[0] && (
            <Link 
              href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider mb-4 hover:bg-gray-800 rounded"
            >
              <Tag className="w-3 h-3" />
              {post._embedded['wp:term'][0][0].name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title.rendered}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pb-4 border-b border-gray-200">
            {post._embedded?.author?.[0]?.name && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 flex items-center justify-center font-bold text-gray-700 text-sm rounded-full">
                  {post._embedded.author[0].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-xs">
                    {post._embedded.author[0].name}
                  </div>
                  <div className="text-[10px] text-gray-500">Travel Writer</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{calculateReadingTime(post.content.rendered)} min</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Featured Image
const FeaturedImage = ({ post }: { post: WordPressPost }) => {
  if (!post._embedded?.['wp:featuredmedia']?.[0]?.source_url) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-6">
          <div className="relative aspect-[16/9] overflow-hidden border border-gray-200 rounded-lg">
            <Image
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post._embedded['wp:featuredmedia'][0].alt_text && (
            <p className="text-xs text-gray-500 mt-2 text-center italic">
              {post._embedded['wp:featuredmedia'][0].alt_text}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

// Share Buttons
const ShareButtons = ({ post }: { post: WordPressPost }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post.title.rendered;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-700">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 border border-gray-300 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all rounded"
      >
        <Facebook className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 border border-gray-300 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all rounded"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 border border-gray-300 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all rounded"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

// Related Posts
const RelatedPosts = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) return null;

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="max-w-4xl mx-auto py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article key={post.id} className="group bg-white border border-gray-200 hover:border-black transition-all rounded-lg overflow-hidden">
                <Link href={`/${post.slug}`}>
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
                        <BookOpen className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  {post._embedded?.['wp:term']?.[0]?.[0] && (
                    <span className="text-[10px] font-bold uppercase text-gray-500 mb-2 inline-block">
                      {post._embedded['wp:term'][0][0].name}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-gray-600">
                    <Link href={`/${post.slug}`}>{post.title.rendered}</Link>
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{calculateReadingTime(post.content.rendered)}m</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

// Newsletter
const NewsletterCTA = () => {
  return (
    <div className="bg-black text-white py-10">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Enjoyed This Article?</h2>
          <p className="text-sm text-gray-300 mb-5">Get more tips delivered weekly</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-2.5 text-sm text-gray-900 focus:outline-none rounded"
            />
            <Button size="sm" className="bg-white text-black hover:bg-gray-200 font-semibold px-6">
              Subscribe
            </Button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">No spam · Unsubscribe anytime</p>
        </div>
      </Container>
    </div>
  );
};

// Main Component
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.categories, post.id);

  return (
    <>
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
          }),
        }}
      />

      <ArticleHeader post={post} />
      <FeaturedImage post={post} />

      {/* Main Content - PROPERLY STYLED */}
      <div className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto py-6">
            {/* Back Button */}
            <Link href="/blogs" className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-black mb-6 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Articles
            </Link>

            {/* Article Content - Fixed Styling */}
            <article 
              className="
                wp-content
                prose prose-sm md:prose-base max-w-none
                
                [&>h1]:text-2xl [&>h1]:md:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:leading-tight
                [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-200
                [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3
                [&>h4]:text-base [&>h4]:md:text-lg [&>h4]:font-bold [&>h4]:text-gray-900 [&>h4]:mt-6 [&>h4]:mb-3
                [&>h5]:text-base [&>h5]:font-bold [&>h5]:text-gray-900 [&>h5]:mt-6 [&>h5]:mb-3
                [&>h6]:text-sm [&>h6]:font-bold [&>h6]:text-gray-900 [&>h6]:mt-4 [&>h6]:mb-2
                
                [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-sm [&>p]:md:text-base
                [&>p>strong]:font-bold [&>p>strong]:text-gray-900
                [&>p>em]:italic
                [&>p>a]:text-black [&>p>a]:font-semibold [&>p>a]:underline hover:[&>p>a]:no-underline
                
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:text-gray-700 [&>ul]:text-sm [&>ul]:md:text-base
                [&>ul>li]:mb-2 [&>ul>li]:leading-relaxed
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:text-gray-700 [&>ol]:text-sm [&>ol]:md:text-base
                [&>ol>li]:mb-2 [&>ol>li]:leading-relaxed
                
                [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:bg-gray-50 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-gray-700
                
                [&>pre]:bg-gray-900 [&>pre]:text-white [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:text-sm
                [&>code]:bg-gray-100 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                
                [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:border [&_img]:border-gray-200 [&_img]:my-6
                [&_figure]:my-6
                [&_figcaption]:text-xs [&_figcaption]:text-gray-500 [&_figcaption]:text-center [&_figcaption]:mt-2 [&_figcaption]:italic
                
                [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
                [&_table_th]:bg-gray-100 [&_table_th]:border [&_table_th]:border-gray-300 [&_table_th]:px-4 [&_table_th]:py-2 [&_table_th]:text-left [&_table_th]:font-bold [&_table_th]:text-sm
                [&_table_td]:border [&_table_td]:border-gray-300 [&_table_td]:px-4 [&_table_td]:py-2 [&_table_td]:text-sm
                
                [&>hr]:my-8 [&>hr]:border-t-2 [&>hr]:border-gray-200
                
                [&_.wp-block-button]:my-4
                [&_.wp-block-button__link]:inline-block [&_.wp-block-button__link]:px-6 [&_.wp-block-button__link]:py-3 [&_.wp-block-button__link]:bg-black [&_.wp-block-button__link]:text-white [&_.wp-block-button__link]:font-semibold [&_.wp-block-button__link]:no-underline [&_.wp-block-button__link]:rounded
                
                [&_.alignleft]:float-left [&_.alignleft]:mr-4 [&_.alignleft]:mb-4
                [&_.alignright]:float-right [&_.alignright]:ml-4 [&_.alignright]:mb-4
                [&_.aligncenter]:mx-auto [&_.aligncenter]:block
              "
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Share Section */}
            <div className="pt-6 mt-8 border-t border-gray-200">
              <ShareButtons post={post} />
            </div>
          </div>
        </Container>
      </div>

      <RelatedPosts posts={relatedPosts} />
      <NewsletterCTA />
    </>
  );
}
