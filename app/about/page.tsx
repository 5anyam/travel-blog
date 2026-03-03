"use client";

import Link from "next/link";
import { 
  ArrowRight, Globe, MapPin, Heart, 
  ShieldCheck, Users, Camera, Plane, Mail,
  Laptop, TrendingUp, ShoppingBag, Utensils, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
            alt="ClubMyTrip - Content Hub"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        
        <Container className="relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>Your Trusted Guide for Everything</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            We Don't Just Write. <br/>
            <span className="text-emerald-400">We Guide.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            ClubMyTrip is a multi-niche content platform covering travel, tech, lifestyle, finance, and more — helping you make smarter decisions every day.
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
                 <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80" alt="Tech" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                 <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80" alt="Travel" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
               </div>
               <div className="space-y-4">
                 <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" alt="Lifestyle" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                 <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80" alt="Shopping" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
               </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
               <div>
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                   One Platform. <br/> Endless Discoveries.
                 </h2>
                 <div className="w-20 h-1 bg-emerald-500 mb-8" />
               </div>
               
               <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                 <p>
                   <strong>ClubMyTrip</strong> started as a travel blog but has evolved into a full-scale content hub. From travel destinations and tech gadget reviews to personal finance tips and lifestyle guides — we cover topics that matter to you.
                 </p>
                 <p>
                   Our mission is simple: cut through the noise and deliver <em>honest, research-backed content</em> that helps you spend smarter, live better, and explore more.
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Honest Reviews</h4>
                      <p className="text-sm text-gray-500">Unbiased, research-backed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Made with Passion</h4>
                      <p className="text-sm text-gray-500">Real people, real opinions.</p>
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
                { label: "Topics Covered", value: "10+" },
                { label: "Articles Published", value: "500+" },
                { label: "Years Online", value: "3+" },
              ].map((stat, i) => (
                <div key={i} className="px-4">
                   <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                   <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </div>
        </Container>
      </div>

      {/* 4. What We Cover - Multi Niche */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Write About</h2>
            <p className="text-gray-600 text-lg">From budget travel hacks to the best laptops under ₹50K — we've got guides for every curious mind.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               {
                 icon: <MapPin className="w-7 h-7" />,
                 bg: "bg-orange-100",
                 color: "text-orange-600",
                 title: "Travel & Destinations",
                 desc: "Itineraries, destination guides, visa tips, and budget travel hacks for explorers of every kind.",
               },
               {
                 icon: <Laptop className="w-7 h-7" />,
                 bg: "bg-blue-100",
                 color: "text-blue-600",
                 title: "Tech & Gadgets",
                 desc: "In-depth reviews and comparisons of phones, laptops, accessories, and the latest in consumer tech.",
               },
               {
                 icon: <ShoppingBag className="w-7 h-7" />,
                 bg: "bg-purple-100",
                 color: "text-purple-600",
                 title: "Shopping & Deals",
                 desc: "Best product picks, buying guides, and curated deal roundups to help you buy smarter.",
               },
               {
                 icon: <TrendingUp className="w-7 h-7" />,
                 bg: "bg-emerald-100",
                 color: "text-emerald-600",
                 title: "Finance & Money",
                 desc: "Personal finance tips, credit card guides, savings strategies, and investment basics.",
               },
               {
                 icon: <Utensils className="w-7 h-7" />,
                 bg: "bg-red-100",
                 color: "text-red-500",
                 title: "Food & Lifestyle",
                 desc: "Food recommendations, wellness tips, and lifestyle content for everyday living.",
               },
               {
                 icon: <Zap className="w-7 h-7" />,
                 bg: "bg-yellow-100",
                 color: "text-yellow-600",
                 title: "How-To & Guides",
                 desc: "Step-by-step guides, tool comparisons, and practical how-tos across every niche we cover.",
               },
             ].map((item, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                 <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center ${item.color} mb-6`}>
                   {item.icon}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                 <p className="text-gray-600">{item.desc}</p>
               </div>
             ))}
          </div>
        </Container>
      </Section>

      {/* 5. Affiliate Disclosure Notice */}
      <Section className="py-10 bg-white">
        <Container>
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-3xl mx-auto">
            <ShieldCheck className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Affiliate Disclosure</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Some links on ClubMyTrip are affiliate links. If you make a purchase through these links, we may earn a small commission — at no extra cost to you. We only recommend products and services we genuinely believe in. This helps us keep the content free and the site running.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. CTA Section */}
      <Section className="py-24 bg-white">
        <Container>
          <div className="bg-emerald-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-20" />
             
             <div className="relative z-10 max-w-2xl mx-auto space-y-8">
               <h2 className="text-3xl md:text-5xl font-bold">Start Exploring Our Guides</h2>
               <p className="text-emerald-100 text-lg">
                 Whether you're planning a trip, buying a new gadget, or just looking for your next read — ClubMyTrip has something for you.
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
                 Have a question or collaboration idea? Email us at{" "}
                 <a href="mailto:support@clubmytrip.com" className="underline hover:text-white">
                   support@clubmytrip.com
                 </a>
               </p>
             </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
