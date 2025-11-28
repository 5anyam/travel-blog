import { Metadata } from "next";
import { Phone, Mail, MapPin, Send, MessageSquare, Globe, Clock, Users } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | ClubMyTrip',
  description: 'Contact ClubMyTrip for travel inquiries, destination recommendations, and travel planning assistance. We\'re here to help make your travel dreams come true.',
  keywords: 'contact travel blog, travel inquiries, destination help, travel questions, ClubMyTrip contact',
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98184 00981"],
    description: "Mon-Sat, 10 AM - 7 PM IST",
    action: "tel:+919818400981"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@caishenunited.com"],
    description: "We reply within 24 hours",
    action: "mailto:support@caishenunited.com"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    details: ["+91 98184 00981"],
    description: "Quick responses",
    action: "https://wa.me/919818400981"
  },
  {
    icon: MapPin,
    title: "Based In",
    details: ["India"],
    description: "Serving travelers worldwide",
    action: null
  }
];

const reasons = [
  {
    icon: Globe,
    title: "Expert Travel Insights",
    description: "Real experiences from actual travelers"
  },
  {
    icon: Users,
    title: "50K+ Community",
    description: "Join thousands of happy travelers"
  },
  {
    icon: Clock,
    title: "Updated Content",
    description: "Fresh guides and tips regularly"
  },
  {
    icon: MessageSquare,
    title: "Quick Support",
    description: "Fast responses to your queries"
  }
];

const inquiryTypes = [
  "Destination Recommendations",
  "Travel Itinerary Planning",
  "Budget Travel Tips",
  "Solo Travel Guidance",
  "Group Travel Planning",
  "Adventure Activities",
  "Visa & Documentation Help",
  "Accommodation Suggestions",
  "Local Travel Tips",
  "Photography Spots",
  "Safety & Security Advice",
  "Collaboration Opportunities"
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white border-b border-gray-800">
        <Container>
          <div className="py-12 lg:py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3 h-3" />
              Get In Touch
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Let us Plan Your Next Adventure
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions about destinations, travel tips, or planning your trip? 
              We are here to help you explore the world!
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Section className="bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Fill out the form below and we will get back to you within 24 hours
                </p>

                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-3 py-2.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-3 py-2.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm rounded"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Inquiry Type *
                      </label>
                      <select 
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm rounded"
                      >
                        <option value="">Select type</option>
                        <option>Destination Inquiry</option>
                        <option>Travel Planning</option>
                        <option>General Question</option>
                        <option>Collaboration</option>
                        <option>Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help you?"
                      className="w-full px-3 py-2.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your travel plans or questions..."
                      className="w-full px-3 py-2.5 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm rounded resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy
                  </p>
                </form>
              </div>

              {/* Quick Contact Cards */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-black transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <div key={idx} className="mb-1">
                            {info.action ? (
                              <a 
                                href={info.action}
                                target={info.action.startsWith('http') ? '_blank' : undefined}
                                rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-xs text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              <p className="text-xs text-gray-900 font-semibold">{detail}</p>
                            )}
                          </div>
                        ))}
                        <p className="text-[10px] text-gray-500 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-black text-white rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3">Quick Contact</h3>
                <p className="text-xs text-gray-300 mb-5">
                  Need immediate assistance? Reach out directly
                </p>
                
                <div className="space-y-2.5">
                  <Button 
                    asChild 
                    variant="secondary" 
                    size="sm"
                    className="w-full bg-white text-black hover:bg-gray-100 text-xs font-semibold"
                  >
                    <a href="tel:+919818400981" className="flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="secondary" 
                    size="sm"
                    className="w-full bg-white text-black hover:bg-gray-100 text-xs font-semibold"
                  >
                    <a 
                      href="https://wa.me/919818400981" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-2" />
                      WhatsApp
                    </a>
                  </Button>

                  <Button 
                    asChild 
                    variant="secondary" 
                    size="sm"
                    className="w-full bg-white text-black hover:bg-gray-100 text-xs font-semibold"
                  >
                    <a 
                      href="mailto:support@caishenunited.com"
                      className="flex items-center justify-center"
                    >
                      <Mail className="w-3.5 h-3.5 mr-2" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>

              {/* Why ClubMyTrip */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Why ClubMyTrip?
                </h3>
                <div className="space-y-3">
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <reason.icon className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">
                          {reason.title}
                        </h4>
                        <p className="text-[10px] text-gray-600 mt-0.5">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* We Can Help With */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  We Can Help With
                </h3>
                <div className="space-y-1.5">
                  {inquiryTypes.map((type, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-700">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mr-2 flex-shrink-0" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs border-gray-300 hover:border-black"
                  >
                    <Link href="/blogs">Browse Travel Guides</Link>
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 text-center">
                  Our Community
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">50K+</div>
                    <div className="text-[10px] text-gray-600">Readers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">500+</div>
                    <div className="text-[10px] text-gray-600">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">100+</div>
                    <div className="text-[10px] text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">24/7</div>
                    <div className="text-[10px] text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                q: "How can I get destination recommendations?",
                a: "Contact us via email or WhatsApp with your travel preferences, budget, and dates. We'll provide personalized recommendations based on your interests."
              },
              {
                q: "Do you provide travel booking services?",
                a: "We're a travel content and guide platform. We provide recommendations and advice, but bookings should be made directly with service providers."
              },
              {
                q: "How quickly do you respond to inquiries?",
                a: "We typically respond within 24 hours during business days. For urgent queries, WhatsApp is the fastest way to reach us."
              },
              {
                q: "Can you help plan my entire trip?",
                a: "Yes! We offer travel planning guidance including itineraries, budget tips, accommodation suggestions, and local insights for your destination."
              },
              {
                q: "Are your travel guides updated regularly?",
                a: "Yes, we regularly update our content with fresh information, new destinations, and current travel advice to ensure accuracy."
              },
              {
                q: "Do you collaborate with travel brands?",
                a: "Yes! We're open to partnerships, collaborations, and sponsored content. Contact us at support@caishenunited.com for opportunities."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <div className="inline-block bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Still Have Questions?
              </h3>
              <p className="text-xs text-gray-600 mb-5 max-w-md">
                Our travel experts are here to help with any questions about destinations, planning, or travel tips
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-xs">
                  <a href="tel:+919818400981">
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Call Us
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-black text-xs">
                  <a href="https://wa.me/919818400981" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
