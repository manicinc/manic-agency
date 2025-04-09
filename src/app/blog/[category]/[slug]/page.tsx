// src/app/blog/[category]/[slug]/page.tsx
import Link from "next/link";
import { Nav } from "@/components/Nav";

// This function is crucial for Next.js 15 types
export default async function BlogPostPage(props: any) {
  // Await the params to satisfy Next.js 15
  const params = await props.params;
  const { category, slug } = params;

  return (
    <>
      <div className="bg-[#1a1a1e]">
        <Nav />
      </div>
      
      <main className="container mx-auto p-5">
        <h1 className="text-2xl font-bold">Blog Post</h1>
        <p>Category: {category}</p>
        <p>Slug: {slug}</p>
        
        <div className="mt-5">
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </main>
    </>
  );
}