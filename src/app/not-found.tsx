"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Check if this is an old-style blog URL like /blog/post-name
    if (pathname && pathname.startsWith('/blog/') && pathname.split('/').length === 3) {
      const slug = pathname.split('/').pop();
      
      // Attempt to redirect to the proper category (client-side)
      // This is a simple approach - just try each category
      const categories = ['thinkpieces', 'tutorials'];
      
      // Try to find which category works
      interface CheckCategoryFunction {
        (index: number): Promise<void>;
      }

      const checkCategory: CheckCategoryFunction = async (index) => {
        if (index >= categories.length) {
          // If we've tried all categories, stay on the 404 page
          return;
        }
        
        const category: string = categories[index];
        const url: string = `/blog/${category}/${slug}`;
        
        try {
          // Try to fetch the URL to see if it exists
          const response: Response = await fetch(url);
          if (response.ok) {
        // If the page exists, redirect to it
        window.location.href = url;
          } else {
        // Try the next category
        checkCategory(index + 1);
          }
        } catch (error) {
          // If there's an error, try the next category
          checkCategory(index + 1);
        }
      };
      
      // Start checking categories
      checkCategory(0);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Return Home
      </Link>
    </div>
  );
}