// src/components/HeroSection.tsx
import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog"; // Make sure BlogPost type is correct
import { ArrowRight } from 'lucide-react';

// Define props for the component
interface HeroSectionProps {
  featuredPosts: BlogPost[];
}

// This can now safely be a Server Component (or even Client if needed, as it doesn't fetch)
// No "use client" needed unless you add client hooks here later
export function HeroSection({ featuredPosts }: HeroSectionProps) {

  // Data (`featuredPosts`) is received as a prop

  return (
    <div className="container mx-auto px-4 py-16 md:py-24"> {/* Adjust padding */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Featured 
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          A brief, engaging subtitle about what you do or offer.
        </p>
        {/* Optional: Add main Call-to-Action buttons here if needed */}
      </div>

      {/* Featured Posts Section */}
      {/* Check if the received array has posts */}
      {featuredPosts && featuredPosts.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8">
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Map over the received featuredPosts prop */}
            {featuredPosts.map((post) => (
              <div key={post.slug + (post.category || '')} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col">
                {post.image && (
                  <Link href={`/blog/${post.category}/${post.slug}`} className="block mb-4 overflow-hidden rounded">
                    <img
                      src={post.image}
                      alt={post.title || 'Blog post image'} // Use title for alt text
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width={400} // Example: Provide dimensions
                      height={225} // Example: Provide dimensions
                    />
                  </Link>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">
                  <Link href={`/blog/${post.category}/${post.slug}`} className="hover:text-accent-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href={`/blog/${post.category}/${post.slug}`} className="text-accent-primary hover:text-accent-secondary font-semibold inline-flex items-center">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Optionally handle case where featuredPosts is empty */}
      {(!featuredPosts || featuredPosts.length === 0) && (
         <p className="text-center text-gray-500">No featured posts available right now.</p>
      )}
    </div>
  );
}