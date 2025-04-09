// /app/category/[category]/page.tsx
import { getAllPosts } from "@/lib/getAllPosts";
import type { BlogPost } from "@/types/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/blog/blogs.css";
import "@/app/blog/blogList.css";

// Define params type
type Params = {
  category: string;
};

export async function generateStaticParams(): Promise<Params[]> {
  console.log("[generateStaticParams] Generating params for /category/[category]");
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach(post => {
    if (post.category) {
      // Ensure category is treated as string and handle potential variations
      const cleanCategory = String(post.category).toLowerCase().trim();
      if(cleanCategory) categories.add(cleanCategory);
    }
  });

  const params = Array.from(categories).map(category => ({
    category: category, // Param name 'category' must match folder name '[category]'
  }));
  console.log(`[generateStaticParams] Found categories: ${params.map(p => p.category).join(', ')}`);
  return params;
}

export default function CategoryPage({ params }: { params: Params }) {
  const { category } = params;
  
  const posts: BlogPost[] = getAllPosts().filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );

  // Check if category actually exists / has posts
  if (posts.length === 0 && category !== 'undefined') {
    console.warn(`No posts found for category: ${category}, rendering 404.`);
    notFound();
  }

  // Decode for display
  const displayCategory = decodeURIComponent(category);

  return (
    <main className="blog-container">
      <div className="blog-header">
        <h1 className="blog-title">{displayCategory.toUpperCase()}</h1>
        <p className="blog-meta">All posts in "{displayCategory}"</p>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="blog-card-image"
              />
            )}
            <div className="blog-date">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </div>
            <h2 className="blog-entry-title">
              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="blog-link"
              >
                {post.title}
              </Link>
            </h2>
            <p className="blog-excerpt">{post.excerpt}</p>
            {post.tags && (
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="readmore-container">
              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="readmore-link"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}