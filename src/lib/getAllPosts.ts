// lib/getAllPosts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "src", "blogs");

export function getAllPosts() {
  const filenames = fs.readdirSync(blogsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(blogsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.slice(0, 150),
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
