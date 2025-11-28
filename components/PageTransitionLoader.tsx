// components/PageTransitionLoader.tsx
"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PageTransitionLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Hide loader when route changes
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Detect clicks on links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.target) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Only show loader for internal navigation
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          setIsLoading(true);
          
          // Fallback: hide loader after 10 seconds
          timeoutId = setTimeout(() => {
            setIsLoading(false);
          }, 10000);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
