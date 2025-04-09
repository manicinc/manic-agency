import { getAllPosts } from "@/lib/getAllPosts";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://manic.agency";
  const posts = getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Manic.agency Blog</title>
      <link>${baseUrl}</link>
      <description>The manic writings of a mystic software collective</description>
      <language>en-us</language>
      ${posts
        .map(
          (post) => `
        <item>
          <title>${post.title}</title>
          <link>${baseUrl}/blog/${post.category}/${post.slug}</link>
          <guid>${baseUrl}/blog/${post.category}/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description><![CDATA[${post.excerpt}]]></description>
        </item>
      `
        )
        .join("\n")}
    </channel>
  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
