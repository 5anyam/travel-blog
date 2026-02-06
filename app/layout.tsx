// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/sonner";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://clubmytrip.com'),
  title: {
    default: 'ClubMyTrip - Your Trusted Travel Guide & Destination Expert',
    template: '%s | ClubMyTrip'
  },
  description: 'Discover amazing travel destinations, expert guides, and insider tips from around the world. ClubMyTrip helps you plan unforgettable journeys with honest reviews, budget tips, and authentic travel experiences.',
  keywords: 'travel blog, travel guides, destination guides, travel tips, budget travel, solo travel, adventure travel, travel reviews, vacation planning, trip planning, travel destinations, backpacking, luxury travel, travel inspiration',
  authors: [{ name: 'ClubMyTrip Team' }],
  creator: 'ClubMyTrip',
  publisher: 'Caishen United',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clubmytrip.com',
    siteName: 'ClubMyTrip',
    title: 'ClubMyTrip - Your Trusted Travel Guide & Destination Expert',
    description: 'Discover amazing travel destinations with expert guides, insider tips, and honest reviews from real travelers. Plan your perfect journey with ClubMyTrip.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClubMyTrip - Travel Guides and Destination Reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClubMyTrip - Travel Guides & Tips',
    description: 'Discover amazing destinations with expert travel guides, tips, and honest reviews.',
    images: ['/og-image.jpg'],
    creator: '@clubmytrip',
  },
  alternates: {
    canonical: 'https://clubmytrip.com',
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'verify-admitad': 'ff3fcff36d',
      'convertiser-verification': '4a2836a5da7012c891e09927e427664d7b22686d',
       },
  },
  category: 'travel',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'ClubMyTrip',
  url: 'https://clubmytrip.com',
  logo: 'https://clubmytrip.com/LOGO.png',
  description: 'Your trusted travel companion for discovering amazing destinations, authentic experiences, and insider tips from around the world.',
  foundingDate: '2020',
  slogan: 'Discover Your Next Adventure',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98184-00981',
    contactType: 'customer service',
    email: 'support@caishenunited.com',
    availableLanguage: ['en', 'hi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/clubmytrip',
    'https://www.instagram.com/clubmytrip',
    'https://www.twitter.com/clubmytrip',
    'https://www.youtube.com/clubmytrip',
    'https://www.linkedin.com/company/clubmytrip',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ClubMyTrip',
  url: 'https://clubmytrip.com',
  description: 'Travel guides, destination reviews, and expert tips for travelers worldwide.',
  publisher: {
    '@type': 'Organization',
    name: 'Caishen United',
    logo: {
      '@type': 'ImageObject',
      url: 'https://clubmytrip.com/LOGO.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://clubmytrip.com/blogs?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        
        <PageTransitionLoader />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
