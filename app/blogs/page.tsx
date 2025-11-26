import { Metadata } from "next";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Blogs & Articles - Company Secretary Insights | Praveen K & Associates',
  description: 'Read expert insights on company law, compliance, corporate governance, and regulatory updates from CS Praveen Kumar and team.',
  keywords: 'company secretary blog, corporate law articles, compliance updates, CS insights, regulatory news',
};

// WordPress API URL
const WP_API_URL = 'https://thefashionableworld.com/wp-json/wp/v2';

interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

// Fetch posts from WordPress
async function getPosts(): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=12`, {
      next: { revalidate: 3600 } // Revalidate every hour
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

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Strip HTML tags from excerpt
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        title="Blogs & Articles"
        description="Expert insights on Company Secretary services, compliance, and corporate governance"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blogs" }
        ]}
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest Updates & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest developments in company law, compliance regulations, 
            and corporate governance from our expert team
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Available</h3>
            <p className="text-gray-600">Check back soon for new articles and insights.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <Calendar className="h-8 w-8 text-[#3AA6FF]" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">CS Articles</p>
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{calculateReadingTime(post.content.rendered)} min read</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3AA6FF] transition-colors">
                    {post.title.rendered}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {stripHtml(post.excerpt.rendered)}
                  </p>

                  {post._embedded?.author?.[0]?.name && (
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <User className="h-3 w-3 mr-1" />
                      <span>By {post._embedded.author[0].name}</span>
                    </div>
                  )}

                  <Link href={`/blogs/${post.slug}`}>
                    <Button variant="outline" size="sm" className="group/btn w-full">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* Categories Section */}
      <Section className="bg-gray-50">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular Topics</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Company Law",
              "Corporate Governance",
              "ROC Compliance",
              "NCLT Matters",
              "Secretarial Audit",
              "IPR & Trademarks",
              "Tax Updates",
              "Regulatory Changes"
            ].map((topic, index) => (
              <div key={index} className="bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-sm font-medium text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
