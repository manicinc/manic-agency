// src/app/blog/[category]/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from 'react';

// Components
import { Nav } from "@/components/Nav";
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Data Fetching & Types
import { getAllPosts, calculateReadingTime } from "@/lib/getAllPosts";
import { BlogPost, TableOfContentsItem } from "@/types/blog";
import { ArticleJsonLd } from 'next-seo';

// CSS
import "@/app/styles/blogs.css";

import { CustomMarkdownRenderer } from "@/components/MarkdownRenderer";

// Constants
const POSTS_DIR = path.join(process.cwd(), "src", "posts");

// Data Fetching Function
async function getPostData(category: string, slug: string): Promise<BlogPost | null> {
  if (!category || !slug) return null;
  
  const filePath = path.join(POSTS_DIR, category, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Post not found at: ${filePath}`);
    return null;
  }
  
  try {
    const rawContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(rawContent);
    
    // Handle date formatting
    let date = data.date;
    if (date instanceof Date) {
      date = date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      date = date.split('T')[0];
    } else {
      date = new Date().toISOString().split('T')[0]; // Fallback
    }
    
    const readingTime = calculateReadingTime(content);
    
    return {
      slug,
      category,
      title: data.title ?? slug.replace(/-/g, ' '),
      excerpt: data.excerpt ?? content.slice(0, 150) + "...",
      date,
      author: data.author ?? "Manic Agency",
      tags: data.tags ?? [],
      image: data.image ?? null,
      content,
      readingTime,
      ...(data.authorBio && { authorBio: data.authorBio }),
    };
  } catch (error) {
    console.error(`Error reading post ${category}/${slug}:`, error);
    return null;
  }
}

// Helper function for formatting dates
function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
  } catch (e) {
    return dateString;
  }
}

// Generate table of contents from markdown content
function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,3})\s+(.*)/gm;
  const headings: TableOfContentsItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
      
    headings.push({ level, text, slug });
  }
  
  return headings;
}

// Type definition for params
type Params = {
  category: string;
  slug: string;
};

// Metadata Generation
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostData(category, slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const ogImage = post.image || '/default-og-image.png';

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

// Static Path Generation
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const posts = getAllPosts();
    return posts
      .filter(post => post.category && post.slug)
      .map(post => ({
        category: post.category!,
        slug: post.slug!,
      }));
  } catch (error) {
    console.error("Failed to generate static blog params:", error);
    return [];
  }
}

// Main Page Component
export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  // Await the params object to access its properties
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  if (!category || !slug) {
    notFound();
  }

  const post = await getPostData(category, slug);
  
  if (!post) {
    notFound();
  }
  
  const tableOfContents = generateTableOfContents(post.content || '');

  return (
    <>
    <head>
    <ArticleJsonLd
      type="BlogPosting"
      url={`https://manic.agency/blog/${post.category}/${post.slug}`}
      title={post.title}
      images={[post.image ?? 'https://yourdomain.com/default.jpg']}
      datePublished={post.date}
      authorName={post.author}
      description={post.excerpt || "No description available"}
    />
    </head>
      <div className="bg-[#1a1a1e]">
        <Nav />
      </div>
      
      <main className="blog-container">
        <article className="blog-post">
          {post.image && (
            <div className="blog-featured-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}
          
          <h1 className="blog-title">{post.title}</h1>
          
          <div className="blog-meta-container">
            <p className="blog-meta">
              <span>{post.author} • </span>
              <span className="blog-date-published" title={`Published: ${post.date}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="reading-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {post.readingTime} min read
              </span>
            </p>
            
            {post.category && (
              <Link href={`/category/${post.category}`} className="blog-category-link">
                Filed under: <span className="category-name">{post.category.toUpperCase()}</span>
              </Link>
            )}
          </div>
          
          <div className="blog-content">
            <CustomMarkdownRenderer>
              {typeof post.content === 'string' ? post.content : ''}
            </CustomMarkdownRenderer>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags">
              {post.tags.map(tag => (
                <Link key={tag} href={`/tags/${tag.toLowerCase()}`} className="blog-tag">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          
          {post.authorBio && (
            <div className="author-bio">
              <h3>About the Author</h3>
              <p>{post.authorBio}</p>
            </div>
          )}
        </article>
        
        {/* Table of Contents could be added here as a client component */}
        
        <div className="blog-navigation">
          <Link href="/blog" className="back-to-blog">
            ← Back to all posts
          </Link>
        </div>
      </main>
    </>
  );
}