import { Metadata } from "next";
import { Mail, Send, MessageSquare, Globe, Clock, Users, MapPin } from "lucide-react";
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
    icon: Mail,
    title: "Email Us",
    details: ["support@clubmytrip.com"],
    description: "We reply within 24 hours",
    action: "mailto:support@clubmytrip.com"
  },
  {
    icon: MapPin,
    title: "Based In",
    details: ["New Delhi, India"],
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
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Fill out the form below and we will get back to you via email.
                </p>

                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-all text-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-all text-sm rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-all text-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Inquiry Type *
                      </label>
                      <select 
                        required
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-all text-sm rounded-lg"
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
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-all text-sm rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your travel plans or questions..."
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-all text-sm rounded-lg resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-lg text-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We respect your privacy. No spam ever.
                  </p>
                </form>
              </div>

              {/* Quick Contact Cards */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-black hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
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
                                className="text-sm text-gray-900 font-semibold hover:text-emerald-600 transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              <p className="text-sm text-gray-900 font-semibold">{detail}</p>
                            )}
                          </div>
                        ))}
                        <p className="text-xs text-gray-500 mt-1 font-medium">
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
              <div className="bg-black text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-3">Quick Support</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Prefer email? Reach out directly for faster assistance.
                </p>
                
                <Button 
                  asChild 
                  variant="secondary" 
                  size="lg"
                  className="w-full bg-white text-black hover:bg-gray-200 text-sm font-bold h-12 rounded-lg"
                >
                  <a 
                    href="mailto:support@clubmytrip.com"
                    className="flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </a>
                </Button>
              </div>

              {/* Why ClubMyTrip */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-5">
                  Why ClubMyTrip?
                </h3>
                <div className="space-y-4">
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <reason.icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {reason.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* We Can Help With */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  We Can Help With
                </h3>
                <div className="space-y-2">
                  {inquiryTypes.map((type, index) => (
                    <div key={index} className="flex items-center text-xs font-medium text-gray-600">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mr-2.5 flex-shrink-0" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs font-bold border-gray-300 hover:border-black h-10 rounded-lg"
                  >
                    <Link href="/blogs">Browse Travel Guides</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-gray-50 py-16">
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
                a: "Email us with your travel preferences, budget, and dates. We'll provide personalized recommendations based on your interests."
              },
              {
                q: "Do you provide travel booking services?",
                a: "We are a travel content and guide platform. We provide recommendations and advice, but bookings should be made directly with service providers."
              },
              {
                q: "How quickly do you respond?",
                a: "We typically respond to all emails within 24 hours during business days."
              },
              {
                q: "Can you help plan my entire trip?",
                a: "Yes! We offer travel planning guidance including itineraries, budget tips, accommodation suggestions, and local insights."
              },
              {
                q: "Are your travel guides updated regularly?",
                a: "Yes, we regularly update our content with fresh information, new destinations, and current travel advice."
              },
              {
                q: "Do you collaborate with travel brands?",
                a: "Yes! We're open to partnerships. Contact us at support@clubmytrip.com for opportunities."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-black transition-all hover:shadow-md">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-block bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Still Have Questions?
              </h3>
              <p className="text-xs text-gray-600 mb-6 max-w-md mx-auto">
                Our team is ready to answer your questions via email.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-sm font-bold px-8 rounded-full">
                  <a href="mailto:support@clubmytrip.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us Now
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* ✅ Powered by Proshala - Added here */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Powered by{" "}
              <a
                href="https://www.proshala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 font-medium transition-colors"
              >
                Proshala
              </a>
            </p>
          </div>

        </Container>
      </Section>
    </>
  );
}

