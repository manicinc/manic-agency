// src/lib/getAllPosts.ts
import "server-only"; // <-- KEEP THIS. It's correct for App Router.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execSync } from 'child_process';
import { BlogPost } from "@/types/blog";

const POSTS_DIR = path.join(process.cwd(), "src", "posts");

// --- Env Var to Control Git Usage ---
const USE_GIT_FALLBACK = process.env.USE_GIT_FALLBACK !== 'false' && process.env.USE_GIT_FALLBACK !== '0';
if (!USE_GIT_FALLBACK) {
  console.log("[getAllPosts] Git fallback for date/author is DISABLED via environment variable.");
}

// Gets info for the LATEST commit affecting the file
function getGitLastCommitInfo(filePath: string, format: string): string | null {
  if (!USE_GIT_FALLBACK) return null;
  try {
    const formattedPath = path.normalize(filePath);
    // Basic escaping for common shell characters (might need refinement depending on paths)
    const escapedPath = formattedPath.replace(/(["$`\\])/g, '\\$1');
    const command = `git log -1 --follow --format=${format} -- "${escapedPath}"`;
    const output = execSync(command, { timeout: 5000, stdio: 'pipe' }).toString().trim();
    return output || null;
  } catch (error: any) {
    // Silently ignore 'no such path' errors, warn others
    if (!error.stderr?.toString().includes('fatal: no such path')) {
        console.warn(`[getGitLastCommitInfo] WARN: Could not get Git info (${format}) for ${filePath}. Error: ${error.message}`);
    }
    return null;
  }
}

// Helper function (can be moved)
export function calculateReadingTime(content: string | undefined): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime > 0 ? readingTime : 1; // Ensure minimum 1 min
}

// Main function to get all posts
export function getAllPosts(): BlogPost[] {
  console.log(`[getAllPosts] Reading posts from: ${POSTS_DIR}`);

  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`[getAllPosts] ERROR: Posts directory not found at ${POSTS_DIR}.`);
    // Consider returning empty array instead of throwing for some use cases?
    throw new Error(`Posts directory not found: ${POSTS_DIR}`);
  }

  let posts: BlogPost[] = [];
  try {
    const categories = fs.readdirSync(POSTS_DIR, { withFileTypes: true });

    for (const categoryDirent of categories) {
      if (!categoryDirent.isDirectory()) continue;

      const categoryFromFile = categoryDirent.name;
      const categoryPath = path.join(POSTS_DIR, categoryFromFile);

      try {
        const files = fs.readdirSync(categoryPath, { withFileTypes: true });

        for (const fileDirent of files) {
          const fileName = fileDirent.name;
          const filePath = path.join(categoryPath, fileName);

          if (!fileDirent.isFile() || !fileName.endsWith('.md')) {
            continue;
          }

          try {
            const rawContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(rawContent);
            const slug = fileName.replace(/\.md$/, "");

            // --- Validate REQUIRED Fields ---
            const title = data.title ?? slug.replace(/-/g, ' ');
            let date = data.date;
            if (date instanceof Date) {
                // Format date to YYYY-MM-DD string if it's a Date object
                date = date.toISOString().split('T')[0];
            } else if (typeof date === 'string') {
                // Ensure YYYY-MM-DD format if it's a string
                date = date.split('T')[0];
            } else {
                // Handle cases where date might be missing or invalid type
                date = null; // Or set a default/fallback date
            }

            // Validate mandatory fields more strictly
            if (!slug || typeof slug !== 'string') {
                console.warn(`[getAllPosts] Skipping ${filePath} due to invalid slug.`);
                continue;
            }
            if (!title || typeof title !== 'string') {
                console.warn(`[getAllPosts] Skipping ${filePath} due to invalid title.`);
                 continue;
            }
            // Validate date format YYYY-MM-DD after potential formatting/fallback
             if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                 console.warn(`[getAllPosts] WARN: Invalid or missing 'date' (YYYY-MM-DD) in frontmatter for ${filePath}. Using today as fallback.`);
                 date = new Date().toISOString().split('T')[0]; // Fallback date
             }


            // --- Process Optional Fields ---
            const excerpt = data.excerpt ?? content.slice(0, 150) + "...";
            let author = data.author ?? getGitLastCommitInfo(filePath, '%an') ?? "Manic Agency";
            const tags = data.tags ?? [];
            const image = data.image ?? null;
            const featured = Array.isArray(tags) && tags.map(t => String(t).toLowerCase()).includes('featured'); // Safer check
            const modifiedDate = getGitLastCommitInfo(filePath, '%cI'); // ISO 8601 format

            posts.push({
              slug: slug,
              category: categoryFromFile,
              title: title,
              date: date, // Formatted/validated date
              modifiedDate: modifiedDate ?? undefined,
              excerpt: excerpt,
              author: typeof author === 'string' ? author : "Manic Agency", // Ensure author is string
              tags: Array.isArray(tags) ? tags.map(String) : [], // Ensure tags is string array
              image: typeof image === 'string' ? image : null,
              content: content, // Include content if needed downstream, otherwise remove
              featured: !!featured, // Ensure boolean
              readingTime: calculateReadingTime(content), // Calculate reading time
              // Spread optional fields safely
              ...(data.authorBio && { authorBio: data.authorBio }),
            });

          } catch (fileProcessingError) {
              console.error(`[getAllPosts] ERROR processing file ${filePath}:`, fileProcessingError);
          }
        } // end file loop
      } catch (categoryReadError) {
        console.error(`[getAllPosts] ERROR reading files in category ${categoryPath}:`, categoryReadError);
      }
    } // end category loop
  } catch (topLevelError) {
     console.error(`[getAllPosts] ERROR reading top-level posts directory ${POSTS_DIR}:`, topLevelError);
     // Depending on use case, maybe return empty array instead of throwing?
     throw new Error(`Failed to read posts directory: ${POSTS_DIR}`);
  }

  console.log(`[getAllPosts] Finished. Found and processed ${posts.length} posts.`);
  return posts;
}