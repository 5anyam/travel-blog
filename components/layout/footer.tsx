import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-2 border-gray-800">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            
            {/* Brand Info */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <div className="relative h-12">
                  <Image
                    src="/clubmytrip.jpg"
                    alt="ClubMyTrip"
                    width={160}
                    height={48}
                    className="h-12 w-auto object-cover"
                  />
                </div>
              </Link>

              <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
                Your go-to content hub for travel, tech, lifestyle, finance, and
                more — helping you make smarter decisions every day.
              </p>

              {/* Newsletter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                  Stay Updated
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                  <button className="px-6 py-3 bg-white hover:bg-gray-200 text-black font-semibold text-sm transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Join 50,000+ readers. No spam, ever.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {[
                    { href: "https://instagram.com/clubmytrip", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                    { href: "https://facebook.com/clubmytrip", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                    { href: "https://twitter.com/clubmytrip", icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                    { href: "https://youtube.com/@clubmytrip", icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                  ].map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                      {s.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Categories
              </h3>
              <ul className="space-y-3">
                <li><Link href="/blogs?category=travel" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Travel</Link></li>
                <li><Link href="/blogs?category=tech" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Tech & Gadgets</Link></li>
                <li><Link href="/blogs?category=finance" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Finance & Money</Link></li>
                <li><Link href="/blogs?category=lifestyle" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Lifestyle</Link></li>
                <li><Link href="/blogs?category=shopping" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Shopping & Deals</Link></li>
                <li><Link href="/blogs?category=food" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Food</Link></li>
              </ul>
            </div>

            {/* Quick Reads */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Quick Reads
              </h3>
              <ul className="space-y-3">
                <li><Link href="/blogs?category=buying-guides" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Buying Guides</Link></li>
                <li><Link href="/blogs?category=how-to" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">How-To Guides</Link></li>
                <li><Link href="/blogs?category=reviews" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Product Reviews</Link></li>
                <li><Link href="/blogs?category=tips" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Tips & Tricks</Link></li>
                <li><Link href="/blogs?category=best-picks" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Best Picks</Link></li>
                <li><Link href="/blogs?category=comparisons" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Comparisons</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Resources
              </h3>
              <ul className="space-y-3">
                <li><Link href="/blogs?category=travel-guides" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Travel Guides</Link></li>
                <li><Link href="/blogs?category=packing" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Packing Lists</Link></li>
                <li><Link href="/blogs?category=visa" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Visa Information</Link></li>
                <li><Link href="/blogs?category=deals" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Latest Deals</Link></li>
                <li><Link href="/blogs?category=itineraries" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Itineraries</Link></li>
                <li><Link href="/blogs?category=safety" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Safety Tips</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Company
              </h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About Us</Link></li>
                <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">All Articles</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact Us</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure Strip */}
        <div className="border-t border-gray-800 py-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed max-w-3xl mx-auto">
            <span className="text-gray-400 font-semibold">Affiliate Disclosure:</span>{" "}
            ClubMyTrip earns commissions from qualifying purchases made through affiliate
            links on this site, at no extra cost to you. We only recommend products we
            genuinely believe in.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium text-center md:text-left">
              © {currentYear} ClubMyTrip. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Disclaimer</Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Cookie Policy</Link>
            </div>
          </div>

          {/* Powered by Proshala */}
          <div className="mt-4 text-center border-t border-gray-800 pt-4">
            <p className="text-gray-500 text-xs">
              Powered by{" "}
              <Link
                href="https://www.proshala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                Proshala
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
