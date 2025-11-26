import { Metadata } from "next";
import { AlertTriangle, Shield, FileText } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Disclaimer - Terms & Conditions',
  description: 'Read the disclaimer and terms of use for ClubMyTrip. Understand our liability limitations, affiliate disclosure, and terms of service for travel information.',
  keywords: 'disclaimer, terms of use, affiliate disclosure, travel blog disclaimer, liability terms',
  robots: 'index, follow',
};

export default function DisclaimerPage() {
  return (
    <>
      {/* Page Header */}
      <Section className="bg-white border-b-2 border-gray-200">
        <Container>
          <div className="py-12 lg:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-black font-semibold">Disclaimer</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Disclaimer
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Terms, conditions, and important legal notices
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Important Notice Box */}
            <div className="border-2 border-black bg-gray-50 p-8 mb-12">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Important Legal Notice
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using ClubMyTrip, you accept and agree to be bound by the 
                    terms and provisions of this disclaimer. If you do not agree to these terms, 
                    please discontinue use of this website immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  1. General Information Disclaimer
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    The information provided on ClubMyTrip is for general informational and educational 
                    purposes only. While we strive to provide accurate and up-to-date travel information, 
                    we make no representations or warranties of any kind, express or implied, about the 
                    completeness, accuracy, reliability, suitability, or availability of the information, 
                    products, services, or related graphics contained on the website.
                  </p>
                  <p>
                    Travel conditions, prices, regulations, and circumstances can change rapidly. Any 
                    reliance you place on such information is therefore strictly at your own risk.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  2. Affiliate & Advertising Disclosure
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    ClubMyTrip participates in various affiliate marketing programs, which means we may 
                    earn commissions on purchases made through our links to retailer sites. This includes, 
                    but is not limited to, hotel bookings, flight reservations, tour packages, travel 
                    insurance, and travel gear.
                  </p>
                  <p>
                    We only recommend products and services that we believe will add value to our readers. 
                    Our affiliate relationships do not influence our editorial content or recommendations. 
                    All opinions expressed on this website are our own honest assessments.
                  </p>
                  <p>
                    This website may display advertisements from third-party ad networks. We do not 
                    control the content of these advertisements and are not responsible for the products 
                    or services advertised.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  3. Travel Advice & Recommendations
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    All travel recommendations, tips, and advice provided on ClubMyTrip are based on 
                    personal experiences and research. They should not be considered as professional 
                    travel advice. We strongly recommend that you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Verify all information independently before making travel decisions</li>
                    <li>Check official government travel advisories for your destination</li>
                    <li>Consult with travel professionals when necessary</li>
                    <li>Purchase appropriate travel insurance for your trip</li>
                    <li>Stay informed about local laws, customs, and safety conditions</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  4. External Links & Third-Party Content
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    ClubMyTrip contains links to external websites and third-party resources that are 
                    not provided or maintained by us. We have no control over the nature, content, and 
                    availability of those sites.
                  </p>
                  <p>
                    The inclusion of any links does not necessarily imply a recommendation or endorse 
                    the views expressed within them. We are not responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>The content, accuracy, or opinions expressed on external websites</li>
                    <li>Privacy practices of external websites</li>
                    <li>Products or services offered by third parties</li>
                    <li>Any damages or losses arising from your use of external websites</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  5. Copyright & Content Usage
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    All content on ClubMyTrip, including text, images, graphics, logos, and multimedia 
                    elements, is protected by copyright and intellectual property laws. The content is 
                    owned by ClubMyTrip or licensed to us.
                  </p>
                  <p>
                    You may view, download, and print pages from the website for personal, non-commercial 
                    use only. You may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Republish material from this website without written permission</li>
                    <li>Sell, rent, or sub-license material from the website</li>
                    <li>Reproduce, duplicate, or copy material for commercial purposes</li>
                    <li>Redistribute content from ClubMyTrip without attribution</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  6. Limitation of Liability
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    In no event shall ClubMyTrip, its owners, authors, or contributors be liable for any 
                    direct, indirect, incidental, consequential, or punitive damages arising out of your 
                    access to or use of the website, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Travel mishaps, accidents, or injuries</li>
                    <li>Financial losses related to bookings or purchases</li>
                    <li>Missed flights, cancellations, or travel disruptions</li>
                    <li>Lost or stolen property during travel</li>
                    <li>Health issues or medical emergencies while traveling</li>
                    <li>Changes in visa requirements or travel restrictions</li>
                  </ul>
                  <p className="mt-4">
                    You acknowledge that travel involves inherent risks and you assume full responsibility 
                    for your safety and well-being while traveling.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  7. Changes to Content & Website
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    ClubMyTrip reserves the right to modify, suspend, or discontinue any aspect of the 
                    website at any time without prior notice. We may also update, change, or remove 
                    content without notification.
                  </p>
                  <p>
                    We are not obligated to update information and cannot guarantee that all information 
                    remains current. Travel information can change frequently, and it is your responsibility 
                    to verify details before making travel arrangements.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  8. User-Generated Content
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Comments, reviews, and other content submitted by users represent the opinions of 
                    those individuals and do not reflect the views of ClubMyTrip. We do not endorse or 
                    guarantee the accuracy of user-generated content.
                  </p>
                  <p>
                    We reserve the right to remove any user content that violates our terms or is deemed 
                    inappropriate, offensive, or harmful.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  9. Medical & Health Disclaimer
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Any health or medical information provided on ClubMyTrip is for informational purposes 
                    only and should not be considered as professional medical advice. Always consult with 
                    a qualified healthcare provider before traveling, especially regarding:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Required vaccinations and immunizations</li>
                    <li>Health precautions for specific destinations</li>
                    <li>Pre-existing medical conditions</li>
                    <li>Travel-related health risks</li>
                  </ul>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  10. Contact Information
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    If you have any questions or concerns about this disclaimer, please contact us:
                  </p>
                  <div className="border-l-4 border-black pl-6 my-6">
                    <p className="font-semibold text-gray-900">ClubMyTrip</p>
                    <p>Email: support@clubmytrip.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-16 p-8 bg-gray-50 border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Last Updated:</strong> November 27, 2025
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This disclaimer is subject to change without notice. We recommend reviewing this page 
                    periodically to stay informed of any updates. Your continued use of ClubMyTrip after 
                    any changes constitutes acceptance of those changes.
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    For more information, please review our{' '}
                    <Link href="/privacy-policy" className="text-black font-semibold underline hover:no-underline">
                      Privacy Policy
                    </Link>
                    {' '}and{' '}
                    <Link href="/terms-of-service" className="text-black font-semibold underline hover:no-underline">
                      Terms of Service
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
