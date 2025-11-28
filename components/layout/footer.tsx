import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, MapPin, Plane } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-2 border-gray-800">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand Info - Takes more space */}
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
                Your trusted travel companion for discovering amazing destinations, 
                authentic experiences, and insider travel tips from around the world.
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
                  Join 50,000+ travelers. No spam.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  <a 
                    href="https://facebook.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Destinations
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/blogs?category=asia" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Asia
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=europe" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Europe
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=americas" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Americas
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=africa" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Africa
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=oceania" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Oceania
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=middle-east" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Middle East
                  </Link>
                </li>
              </ul>
            </div>

            {/* Travel Styles */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Travel Styles
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/blogs?category=adventure" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Adventure Travel
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=luxury" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Luxury Travel
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=budget" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Budget Travel
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=solo" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Solo Travel
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=family" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Family Travel
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=backpacking" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Backpacking
                  </Link>
                </li>
              </ul>
            </div>

            {/* Travel Resources */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/blogs?category=guides" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=tips" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Travel Tips
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=packing" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Packing Lists
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=visa" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Visa Information
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=safety" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Safety Tips
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs?category=itineraries" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Itineraries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wide border-b-2 border-white pb-2 inline-block">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    All Articles
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/advertise" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/careers" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/press" 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-medium">
                © {currentYear} ClubMyTrip. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/disclaimer" 
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                Disclaimer
              </Link>
              <Link 
                href="/cookie-policy" 
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
