"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Categories', 
    href: '/blogs',
    hasDropdown: true,
    dropdownItems: [
      {
        category: "Lifestyle",
        items: [
          { name: "Fashion & Style", href: "/blogs?category=fashion", icon: "👗" },
          { name: "Beauty & Makeup", href: "/blogs?category=beauty", icon: "💄" },
          { name: "Travel & Adventure", href: "/blogs?category=travel", icon: "✈️" },
          { name: "Home & Decor", href: "/blogs?category=home-decor", icon: "🏡" }
        ]
      },
      {
        category: "Entertainment",
        items: [
          { name: "Celebrity News", href: "/blogs?category=celebrity", icon: "⭐" },
          { name: "Movies & TV", href: "/blogs?category=movies", icon: "🎬" },
          { name: "Music", href: "/blogs?category=music", icon: "🎵" },
          { name: "Events & Parties", href: "/blogs?category=events", icon: "🎉" }
        ]
      },
      {
        category: "Food & Wellness",
        items: [
          { name: "Food & Recipes", href: "/blogs?category=food", icon: "🍽️" },
          { name: "Health & Fitness", href: "/blogs?category=health", icon: "💪" },
          { name: "Nutrition & Diet", href: "/blogs?category=nutrition", icon: "🥗" },
          { name: "Wellness & Yoga", href: "/blogs?category=wellness", icon: "🧘" }
        ]
      },
      {
        category: "Business & Tech",
        items: [
          { name: "Technology", href: "/blogs?category=technology", icon: "💻" },
          { name: "Business & Startups", href: "/blogs?category=business", icon: "💼" },
          { name: "Finance & Money", href: "/blogs?category=finance", icon: "💰" },
          { name: "Career & Education", href: "/blogs?category=career", icon: "📚" }
        ]
      },
      {
        category: "More Topics",
        items: [
          { name: "Relationships", href: "/blogs?category=relationships", icon: "❤️" },
          { name: "Parenting & Kids", href: "/blogs?category=parenting", icon: "👶" },
          { name: "Sports & Gaming", href: "/blogs?category=sports", icon: "⚽" },
          { name: "Auto & Vehicles", href: "/blogs?category=auto", icon: "🚗" }
        ]
      }
    ]
  },
  { name: 'Latest', href: '/blogs?filter=latest' },
  { name: 'Trending', href: '/blogs?filter=trending' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top bar - Magazine Style */}
      <div className="bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] text-white py-2.5 text-sm border-b border-blue-600">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-2 font-semibold">
                <Flame className="h-4 w-4 text-yellow-300" />
                Breaking News & Latest Updates
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-blue-100">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navbar */}
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white backdrop-blur-md shadow-lg border-b" : "bg-white border-b border-gray-100"
      )}>
        <Container>
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-full h-12">
                <Image
                  src="/LOGO.png"
                  alt="Magazine Logo"
                  width={180}
                  height={60}
                  className="rounded-lg h-16 w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-[#3AA6FF] transition-colors font-semibold py-2 text-base"
                    onClick={() => !item.hasDropdown && handleLinkClick()}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={cn(
                        "h-4 w-4 ml-1 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    )}
                  </Link>

                  {/* Mega Dropdown Menu for Categories */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                          {item.dropdownItems?.map((category, index) => (
                            <div key={index} className="space-y-4">
                              <h3 className="text-sm font-bold text-[#3AA6FF] uppercase tracking-wider border-b-2 border-[#3AA6FF] pb-2">
                                {category.category}
                              </h3>
                              <ul className="space-y-2">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.href}
                                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#3AA6FF] hover:bg-blue-50 rounded-lg px-3 py-2.5 transition-all cursor-pointer group"
                                      onClick={handleLinkClick}
                                    >
                                      <span className="text-lg group-hover:scale-125 transition-transform">
                                        {subItem.icon}
                                      </span>
                                      <span className="font-medium">{subItem.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {/* CTA in Dropdown */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <div className="bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] rounded-xl p-6 text-white text-center">
                            <TrendingUp className="w-8 h-8 mx-auto mb-3" />
                            <p className="text-lg font-bold mb-2">Explore All Categories</p>
                            <p className="text-sm text-blue-100 mb-4">Discover thousands of articles across all topics</p>
                            <Button size="sm" variant="secondary" asChild className="bg-white text-[#3AA6FF] hover:bg-gray-100 font-bold">
                              <Link href="/blogs" onClick={handleLinkClick}>
                                Browse All Articles
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button & Mobile menu button */}
            <div className="flex items-center space-x-4">
              <Button 
                asChild 
                className="hidden lg:inline-flex bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] hover:from-[#2690E6] hover:to-[#3AA6FF] text-white shadow-md font-bold"
              >
                <Link href="/blogs">Explore Articles</Link>
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t bg-white">
              <div className="pt-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#3AA6FF] hover:bg-gray-50 rounded-md transition-colors font-semibold"
                      onClick={() => !item.hasDropdown && setIsOpen(false)}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    
                    {/* Mobile Dropdown */}
                    {item.hasDropdown && (
                      <div className="pl-4 space-y-1 border-l-2 border-gray-100 ml-4 mt-2">
                        {item.dropdownItems?.map((category, index) => (
                          <div key={index} className="py-2">
                            <p className="text-xs font-bold text-[#3AA6FF] uppercase tracking-wide mb-2 px-3">
                              {category.category}
                            </p>
                            {category.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:text-[#3AA6FF] hover:bg-gray-50 rounded transition-colors cursor-pointer"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="text-base">{subItem.icon}</span>
                                <span className="font-medium">{subItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 border-t border-gray-100">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] hover:from-[#2690E6] hover:to-[#3AA6FF] text-white font-bold"
                  >
                    <Link href="/blogs" onClick={() => setIsOpen(false)}>Explore All Articles</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </>
  );
}
