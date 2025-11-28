"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Destinations', 
    href: '/blogs',
    hasDropdown: true,
    dropdownItems: [
      {
        category: "Popular Destinations",
        items: [
          { name: "Southeast Asia", href: "/blogs?category=southeast-asia" },
          { name: "Europe", href: "/blogs?category=europe" },
          { name: "Middle East", href: "/blogs?category=middle-east" },
          { name: "Americas", href: "/blogs?category=americas" }
        ]
      },
      {
        category: "Travel Style",
        items: [
          { name: "Adventure Travel", href: "/blogs?category=adventure" },
          { name: "Luxury Travel", href: "/blogs?category=luxury" },
          { name: "Budget Travel", href: "/blogs?category=budget" },
          { name: "Solo Travel", href: "/blogs?category=solo" }
        ]
      },
      {
        category: "Travel Tips",
        items: [
          { name: "Travel Guides", href: "/blogs?category=guides" },
          { name: "Packing Tips", href: "/blogs?category=packing" },
          { name: "Travel Hacks", href: "/blogs?category=hacks" },
          { name: "Safety & Health", href: "/blogs?category=safety" }
        ]
      },
      {
        category: "Experiences",
        items: [
          { name: "Food & Cuisine", href: "/blogs?category=food" },
          { name: "Culture & Heritage", href: "/blogs?category=culture" },
          { name: "Nature & Wildlife", href: "/blogs?category=nature" },
          { name: "Beach & Islands", href: "/blogs?category=beach" }
        ]
      }
    ]
  },
  { name: 'Travel Guides', href: '/blogs?filter=guides' },
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
      {/* Main Navbar - Black Background */}
      <nav className={cn(
        "sticky top-0 z-50 bg-black transition-all duration-300",
        isScrolled ? "shadow-2xl border-b-2 border-gray-800" : "border-b border-gray-800"
      )}>
        <Container>
          <div className="flex justify-between items-center py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-10">
                <Image
                  src="/clubmytrip.jpg"
                  alt="ClubMyTrip Logo"
                  width={160}
                  height={40}
                  className="h-12 w-auto object-cover"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-semibold transition-colors",
                      "text-gray-300 hover:text-white",
                      activeDropdown === item.name && "text-white"
                    )}
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

                  {/* Minimal Dropdown Menu - White Background */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white shadow-2xl border-2 border-gray-200 z-50">
                      <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          {item.dropdownItems?.map((category, index) => (
                            <div key={index} className="space-y-3">
                              <h3 className="text-xs font-bold text-black uppercase tracking-wider pb-2 border-b-2 border-black">
                                {category.category}
                              </h3>
                              <ul className="space-y-1">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.href}
                                      className="block text-sm text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-2 transition-all font-medium"
                                      onClick={handleLinkClick}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {/* Simple CTA */}
                        <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
                          <p className="text-lg font-bold text-gray-900 mb-3">
                            Explore All Destinations
                          </p>
                          <Button 
                            size="sm" 
                            asChild 
                            className="bg-black text-white hover:bg-gray-800 font-semibold"
                          >
                            <Link href="/blogs" onClick={handleLinkClick}>
                              View All Articles
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              <Button 
                asChild 
                className="hidden lg:inline-flex bg-white text-black hover:bg-gray-200 font-semibold border-2 border-white"
                size="sm"
              >
                <Link href="/blogs">Browse Stories</Link>
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 text-white hover:bg-gray-800"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Black Background */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t-2 border-gray-800 bg-black">
              <div className="pt-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {!item.hasDropdown ? (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 transition-colors font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <>
                        <button
                          className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 transition-colors font-semibold"
                          onClick={() => setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )}
                        >
                          {item.name}
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            activeDropdown === item.name ? "rotate-180" : ""
                          )} />
                        </button>
                        
                        {/* Mobile Dropdown */}
                        {activeDropdown === item.name && (
                          <div className="bg-gray-900 border-l-2 border-white ml-4 mt-1 mb-2">
                            {item.dropdownItems?.map((category, index) => (
                              <div key={index} className="py-2">
                                <p className="text-xs font-bold text-white uppercase tracking-wide mb-2 px-4">
                                  {category.category}
                                </p>
                                {category.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-black transition-colors font-medium"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                
                <div className="px-4 pt-4 border-t-2 border-gray-800">
                  <Button 
                    asChild 
                    className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
                  >
                    <Link href="/blogs" onClick={() => setIsOpen(false)}>
                      Browse All Stories
                    </Link>
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
