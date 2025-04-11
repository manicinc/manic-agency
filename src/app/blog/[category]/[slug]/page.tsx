// src/app/blog/[category]/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from 'react';

// Components
import { Nav } from "@/components/Nav";
import { CustomMarkdownRenderer } from "@/components/MarkdownRenderer"; // Updated renderer

// Data Fetching & Types
import { getAllPosts, calculateReadingTime } from "@/lib/getAllPosts";
import { BlogPost, TableOfContentsItem } from "@/types/blog";
import BlogInteractiveClient from '@/app/blog/BlogInteractiveClient';

// Import styles
import "@/app/styles"; // Use our new consolidated styles

// Constants
const POSTS_DIR = path.join(process.cwd(), "src", "posts");

// --- Data Fetching Function ---
function getPostBySlug(category: string, slug: string): BlogPost | null {
    const filePath = path.join(POSTS_DIR, category, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        console.warn(`Post not found at: ${filePath}`);
        return null;
    }

    try {
        const rawContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(rawContent);

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
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
            image: typeof data.image === 'string' ? data.image : null,
            content: content, // Keep content for rendering and TOC
            readingTime,
            featured: Array.isArray(data.tags) && data.tags.map(t => String(t).toLowerCase()).includes('featured'),
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
    // Regex to find h1, h2, h3 headings
    const headingRegex = /^(#{1,3})\s+(.*)/gm;
    const headings: TableOfContentsItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length; // 1, 2, or 3
        const text = match[2].trim();
        // Simple slugification, consider a more robust library if needed
        const slug = text.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove unwanted chars
            .replace(/\s+/g, '-')    // Replace spaces with hyphens
            .replace(/-+/g, '-');   // Collapse multiple hyphens

        headings.push({ level, text, slug });
    }
    return headings;
}

// --- Type Definitions ---
type PageParams = {
    category: string;
    slug: string;
};

type Props = {
    params: PageParams;
};

// --- Static Param Generation ---
export async function generateStaticParams(): Promise<PageParams[]> {
    try {
        const posts = getAllPosts(); // Fetch all posts
        return posts.map((post) => ({
            category: post.category,
            slug: post.slug,
        }));
    } catch (error) {
        console.error("Error generating blog static params:", error);
        return [];
    }
}

// --- Metadata Generation ---
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category, slug } = params;
    const post = getPostBySlug(category, slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    // Example metadata
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const postUrl = `${siteUrl}/blog/${category}/${slug}`;
    const imageUrl = post.image ? (post.image.startsWith('/') ? `${siteUrl}${post.image}` : post.image) : `${siteUrl}/default-og-image.png`;

    return {
        title: post.title,
        description: post.excerpt,
        metadataBase: new URL(siteUrl),
        authors: [{ name: post.author || 'Manic Agency' }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: postUrl,
            siteName: 'Manic Agency Blog',
            images: [
              {
                url: imageUrl,
              },
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
            authors: [post.author || 'Manic Agency'],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    };
}

// --- THE ACTUAL PAGE COMPONENT ---
export default function BlogPostPage({ params }: Props) {
    const { category, slug } = params;

    // Fetch the specific post data for rendering
    const post = getPostBySlug(category, slug);

    // If post not found after fetching, show 404
    if (!post) {
        notFound();
    }

    // Generate TOC from the fetched post content
    const tableOfContents = generateTableOfContents(post.content || '');

    // Construct URL for potential client components
    const postUrl = `/blog/${category}/${slug}`;

    return (
        <>
            {/* Navigation */}
            <div className="bg-bg-secondary relative">
                <Nav />
            </div>

            {/* Client component for interactive elements */}
            <BlogInteractiveClient
                tableOfContents={tableOfContents}
                postUrl={postUrl}
                postTitle={post.title}
            />

            <main className="blog-post-container">
                <article className="blog-content">
                    {/* Post Header */}
                    <header className="post-header">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <span className="post-author">By {post.author}</span>
                            <span className="post-divider">|</span>
                            <time className="post-date" dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.readingTime && (
                                <>
                                    <span className="post-divider">|</span>
                                    <span className="post-reading-time">{post.readingTime} min read</span>
                                </>
                            )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="post-tags">
                                {post.tags.map(tag => (
                                    <Link key={tag} href={`/blog/tag/${tag}`} className="post-tag">
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="post-featured-image">
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="featured-image"
                            />
                        </div>
                    )}

                    {/* Post Content using our enhanced markdown renderer */}
                    <div className="post-content">
                        <CustomMarkdownRenderer>
                            {String(post.content)}
                        </CustomMarkdownRenderer>
                    </div>

                    {/* Author Bio if available */}
                    {post.authorBio && (
                        <div className="author-bio">
                            <h3 className="author-bio-title">About the Author</h3>
                            <p>{post.authorBio}</p>
                        </div>
                    )}

                    {/* Post Footer */}
                    <footer className="post-footer">
                        <div className="post-share">
                            <h3 className="share-title">Share this post</h3>
                            <div className="share-buttons">
                                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`} 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="share-button twitter-share">
                                    Twitter
                                </a>
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="share-button linkedin-share">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                        <div className="post-navigation">
                            <Link href="/blog" className="post-back-link">
                                ← Back to Blog
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>
            
            {/* Additional styling specific to blog posts */}
            <style jsx>{`
                .post-header {
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(127, 90, 240, 0.2);
                }
                
                .post-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                    color: var(--accent-primary);
                }
                
                .post-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                    font-size: 0.95rem;
                }
                
                .post-divider {
                    color: var(--text-muted);
                }
                
                .post-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                
                .post-tag {
                    display: inline-block;
                    background: rgba(127, 90, 240, 0.1);
                    color: var(--accent-primary);
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.85rem;
                    transition: all 0.2s ease;
                }
                
                .post-tag:hover {
                    background: rgba(127, 90, 240, 0.2);
                    transform: translateY(-2px);
                }
                
                .post-featured-image {
                    margin: 2rem 0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }
                
                .featured-image {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                }
                
                .post-content {
                    margin: 2rem 0;
                }
                
                .author-bio {
                    margin: 3rem 0;
                    padding: 1.5rem;
                    background: var(--bg-secondary);
                    border-radius: 0.5rem;
                    border: 1px solid rgba(127, 90, 240, 0.2);
                }
                
                .author-bio-title {
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    color: var(--accent-primary);
                }
                
                .post-footer {
                    margin-top: 3rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(127, 90, 240, 0.2);
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .post-share {
                    margin-bottom: 1.5rem;
                }
                
                .share-title {
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }
                
                .share-buttons {
                    display: flex;
                    gap: 0.75rem;
                }
                
                .share-button {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.6rem 1rem;
                    border-radius: 0.5rem;
                    color: white;
                    transition: all 0.2s ease;
                }
                
                .twitter-share {
                    background-color: #1DA1F2;
                }
                
                .linkedin-share {
                    background-color: #0077B5;
                }
                
                .share-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                
                .post-navigation {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                }
                
                .post-back-link {
                    display: inline-flex;
                    align-items: center;
                    color: var(--accent-primary);
                    transition: all 0.2s ease;
                }
                
                .post-back-link:hover {
                    color: var(--accent-highlight);
                    transform: translateX(-3px);
                }
                
                @media (max-width: 768px) {
                    .post-title {
                        font-size: 2rem;
                    }
                    
                    .post-meta {
                        flex-direction: column;
                        gap: 0.25rem;
                    }
                    
                    .post-divider {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}