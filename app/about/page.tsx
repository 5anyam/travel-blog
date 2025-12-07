"use client";

import Link from "next/link";
import { 
  ArrowRight, Globe, MapPin, Heart, 
  ShieldCheck, Users, Camera, Plane, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section - Immersive & Inspiring */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
            alt="ClubMyTrip Travel Philosophy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <Container className="relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>Your Trusted Travel Companion</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            We Do do not Just Travel. <br/>
            <span className="text-emerald-400">We Explore.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            ClubMyTrip is dedicated to helping you discover the worlds hidden gems, plan smarter itineraries, and create unforgettable memories—on any budget.
          </p>
        </Container>
      </div>

      {/* 2. Our Story & Mission */}
      <Section className="py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4 mt-8">
                 <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=80" alt="Adventure" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                 <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80" alt="Culture" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
               </div>
               <div className="space-y-4">
                 <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" alt="Nature" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                 <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80" alt="Relaxation" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
               </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
               <div>
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                   Making Travel Simple, <br/> Authentic & Accessible
                 </h2>
                 <div className="w-20 h-1 bg-emerald-500 mb-8" />
               </div>
               
               <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                 <p>
                   Founded with a passion for wandering, <strong>ClubMyTrip</strong> started as a small personal blog and has grown into a community of over 50,000 travelers. We realized that while the internet is full of information, it lacks <em>curation</em> and <em>authenticity</em>.
                 </p>
                 <p>
                   Our mission is simple: to bridge the gap between dreaming and departing. We provide verified guides, honest reviews, and practical budget hacks that empower you to explore more for less.
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Verified Guides</h4>
                      <p className="text-sm text-gray-500">Expert vetted content.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Passionate Team</h4>
                      <p className="text-sm text-gray-500">Real travelers writing.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Stats Section (Dark Mode) */}
      <div className="bg-black py-20 text-white">
        <Container>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
              {[
                { label: "Monthly Readers", value: "50K+" },
                { label: "Destinations Covered", value: "100+" },
                { label: "Travel Guides", value: "500+" },
                { label: "Years of Experience", value: "5+" },
              ].map((stat, i) => (
                <div key={i} className="px-4">
                   <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                   <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </div>
        </Container>
      </div>

      {/* 4. What We Cover */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Guide to the World</h2>
            <p className="text-gray-600 text-lg">Whether you are a solo backpacker or planning a luxury honeymoon, we have got you covered.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
               <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                 <MapPin className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Destination Guides</h3>
               <p className="text-gray-600">Detailed itineraries for cities, beaches, and mountains worldwide. Know exactly where to go and what to see.</p>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
               <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                 <Plane className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Travel Tips & Hacks</h3>
               <p className="text-gray-600">Master the art of packing, find cheap flights, and navigate visa requirements like a pro.</p>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
               <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                 <Camera className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Gear Reviews</h3>
               <p className="text-gray-600">Honest reviews of luggage, cameras, and travel gadgets to help you pack smarter.</p>
             </div>
          </div>
        </Container>
      </Section>

      {/* 5. Join Community CTA */}
      <Section className="py-24 bg-white">
        <Container>
          <div className="bg-emerald-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
             {/* Decorative Circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-20" />
             
             <div className="relative z-10 max-w-2xl mx-auto space-y-8">
               <h2 className="text-3xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
               <p className="text-emerald-100 text-lg">
                 Join our newsletter and get exclusive travel guides, deals, and inspiration delivered straight to your inbox.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 h-14 px-8 text-lg font-bold rounded-full">
                    <Link href="/blogs">Explore Articles</Link>
                 </Button>
                 <Button asChild variant="outline" size="lg" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800 h-14 px-8 text-lg font-medium rounded-full">
                    <Link href="/contact">Contact Us</Link>
                 </Button>
               </div>
               <p className="text-sm text-emerald-300/80 pt-4">
                 Have a question? Email us at <a href="mailto:support@clubmytrip.com" className="underline hover:text-white">support@clubmytrip.com</a>
               </p>
             </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
