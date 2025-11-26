import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, BookOpen, TrendingUp, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Magazine Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative w-full h-16">
                  <Image
                    src="/LOGO.png"
                    alt="Magazine Logo"
                    width={180}
                    height={60}
                    className="rounded-lg object-contain"
                  />
                </div>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm max-w-md">
                Your daily dose of trending stories, lifestyle tips, celebrity news, and expert insights. 
                Stay updated with the latest in fashion, entertainment, food, health, and more.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#3AA6FF]" />
                  Subscribe to Newsletter
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3AA6FF] focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] hover:from-[#2690E6] hover:to-[#3AA6FF] rounded-lg text-white font-semibold text-sm transition-all">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Join 10,000+ readers. No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#3AA6FF] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#3AA6FF] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#3AA6FF] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#3AA6FF] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#3AA6FF] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Flame className="h-5 w-5 text-[#3AA6FF]" />
                Popular Topics
              </h3>
              <div className="space-y-3">
                <Link href="/blogs?category=fashion" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Fashion & Style
                </Link>
                <Link href="/blogs?category=celebrity" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Celebrity News
                </Link>
                <Link href="/blogs?category=food" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Food & Recipes
                </Link>
                <Link href="/blogs?category=health" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Health & Fitness
                </Link>
                <Link href="/blogs?category=travel" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Travel & Adventure
                </Link>
                <Link href="/blogs?category=technology" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Technology
                </Link>
              </div>
            </div>

            {/* More Categories */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#3AA6FF]" />
                More Categories
              </h3>
              <div className="space-y-3">
                <Link href="/blogs?category=beauty" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Beauty & Makeup
                </Link>
                <Link href="/blogs?category=business" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Business & Startups
                </Link>
                <Link href="/blogs?category=movies" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Movies & TV
                </Link>
                <Link href="/blogs?category=sports" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Sports & Gaming
                </Link>
                <Link href="/blogs?category=parenting" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Parenting & Kids
                </Link>
                <Link href="/blogs?category=relationships" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Relationships
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#3AA6FF]" />
                Quick Links
              </h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  About Us
                </Link>
                <Link href="/blogs" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  All Articles
                </Link>
                <Link href="/blogs?filter=latest" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Latest Posts
                </Link>
                <Link href="/blogs?filter=trending" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Trending Now
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Contact Us
                </Link>
                <Link href="/advertise" className="block text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200">
                  Advertise With Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 Magazine. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm transition-colors">
                Disclaimer
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
