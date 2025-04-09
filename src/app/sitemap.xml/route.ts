// src/app/sitemap.xml/route.ts
import { getAllPosts } from "@/lib/getAllPosts";

// This is required for static export
export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  
  // Create the XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.manic.agency/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://www.manic.agency/blog</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.8</priority>
    </url>
    ${posts.map(post => `
    <url>
      <loc>https://www.manic.agency/blog/${post.category}/${post.slug}</loc>
      <lastmod>${post.modifiedDate || post.date}</lastmod>
      <priority>0.7</priority>
    </url>
    `).join('')}
  </urlset>`;
  
  // Return the XML with the appropriate headers
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}