// src/app/api/find-post-category/[slug]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const category = findCategoryForSlug(slug);
  
  // Redirect to the category/slug URL
  return NextResponse.redirect(new URL(`/blog/${category}/${slug}`, request.url));
}

function findCategoryForSlug(slug: string): string {
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  
  try {
    // Get all category directories
    const categories = fs.readdirSync(postsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // Search for the slug in each category
    for (const category of categories) {
      const filePath = path.join(postsDir, category, `${slug}.md`);
      if (fs.existsSync(filePath)) {
        return category;
      }
    }
    
    // If not found, default to thinkpieces
    return 'thinkpieces';
  } catch (error) {
    console.error('Error finding category for slug:', error);
    return 'thinkpieces'; // Default fallback
  }
}