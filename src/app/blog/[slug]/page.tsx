import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Nav } from "@/components/Nav";
import "@/app/blog/blogPost.css"; // 👈 new styles here

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src", "blogs"));

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
      <main className="blog-post-container">
        <article className="blog-post-content">
          <h1 className="post-title">{data.title}</h1>
          <p className="post-meta">
            {data.author && <span>{data.author} • </span>}
            {new Date(data.date).toLocaleDateString()}
          </p>
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}
