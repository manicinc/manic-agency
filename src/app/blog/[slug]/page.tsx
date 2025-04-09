// src/app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';

// This page handles redirects for URLs like /blog/post-name
// It searches for the post in all categories and redirects to the proper location
export default function BlogSlugRedirect({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = findCategoryForSlug(slug);
  
  // Redirect to the category-based URL
  redirect(`/blog/${category}/${slug}`);
  
  // This will never render, but Next.js needs a return
  return null;
}

// Function to find which category a slug belongs to
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

// Generate static params for known slugs to avoid file system operations at runtime
export function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const slugs: { slug: string }[] = [];
  
  try {
    // Get all category directories
    const categories = fs.readdirSync(postsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // Get all slugs from all categories
    for (const category of categories) {
      const categoryPath = path.join(postsDir, category);
      
      const files = fs.readdirSync(categoryPath)
        .filter(filename => filename.endsWith('.md'));
      
      for (const file of files) {
        slugs.push({ slug: file.replace('.md', '') });
      }
    }
    
    return slugs;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}