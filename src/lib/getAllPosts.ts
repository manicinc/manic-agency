// src/lib/getAllPosts.ts
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
    const escapedPath = formattedPath.replace(/(["$`\\])/g, '\\$1');
    // Get the latest commit date (ISO 8601 format)
    const command = `git log -1 --follow --format=${format} -- "${escapedPath}"`;
    const output = execSync(command, { timeout: 5000, stdio: 'pipe' }).toString().trim();
    return output || null;
  } catch (error: any) {
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
  return readingTime > 0 ? readingTime : 1;
}

// Main function to get all posts
export function getAllPosts(): BlogPost[] {
  console.log(`[getAllPosts] Reading posts from: ${POSTS_DIR}`);

  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`[getAllPosts] ERROR: Posts directory not found at ${POSTS_DIR}.`);
    throw new Error(`Posts directory not found: ${POSTS_DIR}`);
  }

  let posts: BlogPost[] = [];
  try {
    const categories = fs.readdirSync(POSTS_DIR, { withFileTypes: true });
    // console.log(`[getAllPosts] Found category dirents: ${categories.map(d => d.name).join(', ')}`);

    for (const categoryDirent of categories) {
      if (!categoryDirent.isDirectory()) continue;

      const categoryFromFile = categoryDirent.name; // Use folder name as category
      const categoryPath = path.join(POSTS_DIR, categoryFromFile);
      // console.log(`[getAllPosts] Processing category: ${categoryFromFile} at ${categoryPath}`);

      try {
        const files = fs.readdirSync(categoryPath, { withFileTypes: true });
        // console.log(`[getAllPosts] Files in ${categoryFromFile}: ${files.map(f => f.name).join(', ')}`);

        for (const fileDirent of files) {
          const fileName = fileDirent.name;
          const filePath = path.join(categoryPath, fileName);

          // Skip non-markdown files
          if (!fileDirent.isFile() || !fileName.endsWith('.md')) {
            continue;
          }

          try {
            const rawContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(rawContent);
            const slug = fileName.replace(/\.md$/, "");

            // --- Validate REQUIRED Fields ---
            const title = data.title ?? slug.replace(/-/g, ' '); // Fallback title
            let date = data.date; // Date from frontmatter
            if (date instanceof Date) date = date.toISOString().split('T')[0]; // Ensure YYYY-MM-DD string
            else if (typeof date === 'string') date = date.split('T')[0]; // Ensure YYYY-MM-DD string

            if (!slug || typeof slug !== 'string') { /* console.error... */; continue; }
            if (!categoryFromFile || typeof categoryFromFile !== 'string') { /* console.error... */; continue; } // Should always be true
            if (!title || typeof title !== 'string') { /* console.error... */; continue; }
            if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { // Validate YYYY-MM-DD format
                console.warn(`[getAllPosts] WARN: Invalid or missing 'date' (YYYY-MM-DD) in frontmatter for ${filePath}. Using today as fallback.`);
                date = new Date().toISOString().split('T')[0]; // Fallback date
            }

            // --- Process Optional Fields ---
            const excerpt = data.excerpt ?? content.slice(0, 150) + "...";
            let author = data.author ?? getGitLastCommitInfo(filePath, '%an') ?? "Manic Agency"; // Git author fallback
            const tags = data.tags ?? [];
            const image = data.image ?? null;
            const authorBio = data.authorBio;
            const featured = data.tags?.map((t:string) => String(t).toLowerCase()).includes('featured') ?? false; // Check if 'featured' tag exists
            const modifiedDate = getGitLastCommitInfo(filePath, '%cI'); // Get last commit date ISO string

            posts.push({
              slug: slug,
              category: categoryFromFile,
              title: title,
              date: date, // Primary date (from frontmatter or fallback)
              modifiedDate: modifiedDate ?? undefined, // Store if found
              excerpt: excerpt,
              author: author,
              tags: Array.isArray(tags) ? tags : [],
              image: typeof image === 'string' ? image : null, // Ensure image is string or null
              content: content,
              featured: featured,
              ...(authorBio && { authorBio: authorBio }),
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
     throw new Error(`Failed to read posts directory: ${POSTS_DIR}`);
  }

  // NOTE: Sorting is now done in the page component that uses this data

  console.log(`[getAllPosts] Finished. Found and processed ${posts.length} posts.`);
  // Log data for specific slugs (for debugging)
  // const specificSlugs = ['contribute', 'logomaker-...', 'ai-sociopaths', 'the-meat-interface'];
  // posts.forEach(p => { if (p?.slug && specificSlugs.includes(p.slug)) { console.log(`--- Data for ${p.slug} ---`); console.log(JSON.stringify(p, null, 2)); } });
  return posts;
}