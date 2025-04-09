// src/app/category/[category]/page.tsx
import Link from "next/link";

// This function is crucial for Next.js 15 types
export default async function CategoryPage(props: any) {
  // Await the params to satisfy Next.js 15
  const params = await props.params;
  const { category } = params;

  return (
    <main className="container mx-auto p-5">
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      
      <div className="mt-5">
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← Back to blog
        </Link>
      </div>
    </main>
  );
}