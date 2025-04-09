// /app/blog/BlogInteractiveClient.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TableOfContentsItem } from '@/types/blog'; // Make sure this type path is correct

interface Props {
  tableOfContents: TableOfContentsItem[];
  postUrl: string;
  postTitle: string;
}

export default function BlogInteractiveClient({ tableOfContents, postUrl, postTitle }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll listener
  const handleScroll = useCallback(() => {
    // Back to Top visibility
    setShowBackToTop(window.scrollY > 300);

    // Reading Progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setReadingProgress(progress);

    // Active Heading for TOC
    const headings = Array.from(document.querySelectorAll('.blog-content h1[id], .blog-content h2[id], .blog-content h3[id]')) as HTMLElement[];
    let currentActive = '';
    const offset = 150; // Adjust offset from viewport top as needed

    // Find the topmost heading within the offset
    for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) {
            currentActive = heading.id;
        } else {
            // Break early once we are past the offset
            break;
        }
    }
    // Alternative: Find last heading above the offset
    // for (let i = headings.length - 1; i >= 0; i--) {
    //   const heading = headings[i];
    //   if (heading.offsetTop <= scrollTop + offset) {
    //     currentActive = heading.id;
    //     break;
    //   }
    // }

    setActiveHeading(currentActive);

  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

   // Placeholder for other effects from blogEffects.js
  useEffect(() => {
    console.log("Initialize post-specific client-side effects if any.");
    // Example: const cleanup = initMushroomCursor('.mushroom-cursor');
    // return () => cleanup();
  }, []);


  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // TOC link click handler
  const handleTocClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset for fixed header, adjust if needed
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
       // Optionally update URL hash (be careful with SPA navigation)
       // window.history.pushState(null, "", `#${slug}`);
    } else {
        console.warn(`TOC element with id "${slug}" not found.`);
    }
  }, []);

  // Render only the interactive parts
  return (
    <>
      {/* Reading Progress Bar */}
      <div
         className="reading-progress" // Style this in your CSS
         style={{ width: `${readingProgress}%` }}
         role="progressbar"
         aria-valuenow={Math.round(readingProgress)}
         aria-valuemin={0}
         aria-valuemax={100}
         aria-label="Reading progress"
      />

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <aside className="toc-container">
          <h2 className="toc-title">
            <svg width="18" height="18" /* TOC Icon */ >...</svg>
            In This Article
          </h2>
          <nav aria-label="Table of Contents">
            <ul className="toc-list">
              {tableOfContents.map((heading, index) => {
                 // Rely on rehype-slug to generate predictable IDs
                 const generatedSlug = heading.text.toLowerCase()
                    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except space/hyphen
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/-+/g, '-'); // Collapse multiple hyphens
                 if (!generatedSlug) return null; // Skip if slug generation failed

                 return (
                   <li key={generatedSlug} className={`toc-item level-${heading.level}`} style={{ paddingLeft: `${(heading.level - 1) * 15}px` }}>
                      <a
                         href={`#${generatedSlug}`}
                         className={activeHeading === generatedSlug ? 'active' : ''}
                         onClick={(e) => handleTocClick(e, generatedSlug)}
                       >
                         {heading.text}
                       </a>
                   </li>
                  );
               })}
            </ul>
          </nav>
        </aside>
      )}

      {/* Back to Top Button */}
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg width="24" height="24" /* Arrow Up Icon */>...</svg>
      </button>
    </>
  );
}