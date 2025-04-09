// src/app/blog/page.tsx
import { getAllPosts } from "@/lib/getAllPosts";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { format } from "date-fns";
import { Nav } from "@/components/Nav";
import "@/app/blog/blogs.css";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const posts: BlogPost[] = getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <main className="blog-container">
        <h1>No blog posts found.</h1>
        <p>Looks like we're still cooking up some content. Check back soon!</p>
      </main>
    );
  }

  // Sort by featured first, then by date (newest first)
  const sortedPosts = posts
    .slice()
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <>
      <div className="bg-[#1a1a1e]">
        <Nav />
      </div>

      <main className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-meta">Explore articles, insights & updates</p>
        </header>

        <section className="blog-grid">
          {sortedPosts.map((post) => (
            <article key={post.slug} className={`blog-card ${post.featured ? "featured" : ""}`}>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-card-image"
                />
              )}

              <div className="blog-date">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </div>

              <h2 className="blog-entry-title">
                <Link href={`/blog/${post.category}/${post.slug}`} className="blog-link">
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="blog-excerpt">{post.excerpt}</p>
              )}

              {(post.tags ?? []).length > 0 && (
                <div className="blog-tags">
                  {(post.tags || []).map((tag) => (
                    <span key={tag} className="blog-tag">#{tag}</span>
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
        </section>
      </main>
    </>
  );
}
