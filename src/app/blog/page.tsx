// src/app/blog/page.js (or wherever your BlogPage component lives)
"use client"; // Keep if you need client-side interactions, but data fetching below is usually server-side
import { FunctionComponent } from 'react';
import Link from 'next/link'; // Assuming Next.js for routing
import { Nav } from "@/components/Nav";

// Define a type/interface for clarity (optional, but good practice if using TypeScript)

interface Post {
  slug: string;
  title: string;
  date: string; // Or Date object
  excerpt: string;
}

interface BlogPageProps {
  posts: Post[];
}


// Assume 'posts' is fetched server-side (e.g., in a parent Server Component
// or using generateStaticParams/fetch in Next.js App Router) and passed as a prop.
const BlogPage: FunctionComponent<BlogPageProps> = ({ posts = [] }) => { // Provide default empty array
  return (
    <>
      <div className='bg-[#23153c]'>
        <Nav />
      </div>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* --- Replaced PageIntro --- */}
        <div className="mb-10 md:mb-16 text-center border-b pb-8 border-gray-300 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            Writings of the Mad
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay up-to-date with the latest news in marketing, media, and tech sectors,
            as we publish industry insights for public benefit.
          </p>
        </div>
        {/* --- End Replaced PageIntro --- */}

        {posts.length > 0 ? (
          <div className="grid gap-8 lg:gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md">
                 <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={new Date(post.date).toISOString()}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </time>
                 </div>
                 <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                   <Link href={`/blog/${post.slug}`} className="hover:underline">
                     {post.title}
                   </Link>
                 </h2>
                 <p className="mb-5 font-light text-gray-600 dark:text-gray-400">
                   {post.excerpt}
                 </p>
                 <div className="flex justify-between items-center">
                     {/* Optionally add author info here */}
                     <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                        Read more
                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                 </div>
              </article>
            ))}
          </div>
        ) : (
          // Display a message if there are no posts
          <div className="text-center py-12">
             <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No posts yet!</h2>
             <p className="text-gray-500 dark:text-gray-400">
                Check back soon for new articles.
             </p>
          </div>
        )}
      </main>
    </>
  );
};

export default BlogPage;

// --- HOW TO GET THE 'posts' PROP ---
// This part typically happens OUTSIDE the component itself, usually server-side.
// Example (Conceptual - depends heavily on your specific setup/framework):
/*
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // Library to parse frontmatter from Markdown

export async function getStaticProps() { // Or equivalent data fetching in App Router
  const postsDirectory = path.join(process.cwd(), 'content/posts'); // Adjust path
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents); // data = frontmatter, content = markdown body

    // Generate an excerpt (simple example: first 150 chars)
    const excerpt = content.substring(0, 150) + '...';

    return {
      slug: filename.replace(/\.mdx?$/, ''), // Create slug from filename
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || excerpt, // Use frontmatter excerpt if available
      // ... any other frontmatter fields (author, tags, etc.)
    };
  });

  // Sort posts by date, newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts,
    },
  };
}
*/

// You would also need a dynamic route like `/blog/[slug].js` or `/blog/[slug]/page.js`
// to display the full content of a single post, likely using a Markdown renderer
// like 'react-markdown' or 'next-mdx-remote'.