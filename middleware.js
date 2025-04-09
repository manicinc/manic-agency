// middleware.js
import { NextResponse } from 'next/server';

// Create a file in your project: src/app/blog/[slug]/page.tsx
// This will serve as a simple redirector for old-style URLs
export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Only process /blog/[slug] URLs (not already categorized ones)
  if (url.pathname.match(/^\/blog\/[\w-]+$/) && !url.pathname.match(/^\/blog\/[\w-]+\/[\w-]+$/)) {
    const slug = url.pathname.split('/').pop();
    
    // This is the magic - redirect to a specially crafted URL that tells 
    // our redirect page (at /blog/[slug]/page.tsx) which slug was requested
    return NextResponse.redirect(new URL(`/blog/${slug}?redirected=true`, url.origin));
  }
  
  return NextResponse.next();
}

// Configure matcher to only run middleware on specific paths
export const config = {
  matcher: [
    '/blog/:slug*'
  ],
};