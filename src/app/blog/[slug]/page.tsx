// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Nav } from "@/components/Nav";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src",  "blogs"));

  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "src", "blogs", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <>
      <div className="bg-[#23153c]">
        <Nav />
      </div>
      <main className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-12">
        <h1>{data.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(data.date).toLocaleDateString()}
        </p>
        <ReactMarkdown>{content}</ReactMarkdown>
      </main>
    </>
  );
}
