import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-[#3AA6FF] to-[#2690E6]">
      <Container>
        <div className="text-center text-white">
          <div className="mb-8">
            <h1 className="text-9xl font-bold mb-4 opacity-20">404</h1>
            <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-md mx-auto">
              The page you are looking for does not exist or has been moved.
              Let us get you back on track.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-[#3AA6FF] hover:bg-gray-100">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-white text-white hover:bg-white hover:text-[#3AA6FF]"
            >
              <Link href="/services">
                <Search className="mr-2 h-5 w-5" />
                Browse Services
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-white text-white hover:bg-white hover:text-[#3AA6FF]"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Company Registration", href: "/services/private-limited-company-registration" },
                { name: "Annual Compliance", href: "/services/private-limited-annual-compliance" },
                { name: "Trademark Registration", href: "/services/trademark-registration" },
                { name: "NCLT Matters", href: "/services/merger-amalgamation-nclt" }
              ].map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="text-blue-100 hover:text-white underline transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}