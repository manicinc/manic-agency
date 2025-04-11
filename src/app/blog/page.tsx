// src/app/blog/page.tsx
import { getAllPosts } from "@/lib/getAllPosts";
import { BlogPost } from "@/types/blog";
import { Nav } from "@/components/Nav";
import BlogList from "./BlogListClient"; // Import the enhanced component
import "@/app/styles/blogs.css";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const posts: BlogPost[] = getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <>
        <div className="bg-bg-secondary">
          <Nav />
        </div>
        <main className="blog-container">
          <h1>No blog posts found.</h1>
          <p>Looks like we're still cooking up some content. Check back soon!</p>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="bg-bg-secondary">
        <Nav />
      </div>

      <main>
        <BlogList initialPosts={posts} />
      </main>
    </>
  );
}