// src/app/LayoutClient.tsx
'use client'; // Necessary for hooks like useState, useEffect, usePathname

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Type definition for window augmentation (optional but good practice)
declare global {
  interface Window {
    toggleTheme?: () => void;
  }
}

export default function LayoutClient() {
  const pathname = usePathname();
  const [isBlogArticle, setIsBlogArticle] = useState(false);

  // Check if current path is a blog article
  useEffect(() => {
    // Adjusted regex: Checks for /blog/ followed by at least one character segment, then / again, then more characters.
    // Example: /blog/category/article-slug matches
    // Example: /blog/article-slug does NOT match (use /^\/blog\/.+/ if needed)
    const blogArticlePattern = /^\/blog\/.+\/.+$/;
    setIsBlogArticle(blogArticlePattern.test(pathname));
  }, [pathname]);

  // Add/Remove body classes based on path and type
  useEffect(() => {
    const bodyElement = document.body;
    const htmlElement = document.documentElement; // Needed for theme classes

    // Add/remove .is-blog-article class
    if (isBlogArticle) {
      bodyElement.classList.add('is-blog-article');
    } else {
      bodyElement.classList.remove('is-blog-article');
    }

    // Remove old path class, add new one (Handles '/' -> 'home')
    const pathClass = `path-${pathname === '/' ? 'home' : pathname.substring(1).replace(/\//g, '-')}`;
    // Filter out any existing path-* classes before adding the new one
    bodyElement.className = bodyElement.className
      .split(' ')
      .filter(cls => !cls.startsWith('path-'))
      .join(' ');
    bodyElement.classList.add(pathClass);

    // Add/remove .is-blog class
    if (pathname.startsWith('/blog')) {
      bodyElement.classList.add('is-blog');
    } else {
      bodyElement.classList.remove('is-blog');
    }

    // Cleanup function on component unmount or path change
    return () => {
      bodyElement.classList.remove(pathClass);
      bodyElement.classList.remove('is-blog');
      bodyElement.classList.remove('is-blog-article');
    };
  }, [pathname, isBlogArticle]); // Dependencies for this effect

  // Handle page transitions (Simpler using beforeunload for now)
  useEffect(() => {
    const handleStart = () => document.documentElement.classList.add('page-transitioning');
    // Using 'load' is unreliable for SPA transitions. 'beforeunload' handles browser refreshes/closes.
    // For true SPA transition handling, you might need Next.js router events if accessible,
    // or libraries like NProgress integrated differently.
    window.addEventListener('beforeunload', handleStart);
    // Optionally remove class on initial load complete, though less useful for SPA
    const handleLoadComplete = () => document.documentElement.classList.remove('page-transitioning');
    window.addEventListener('load', handleLoadComplete);


    return () => {
      window.removeEventListener('beforeunload', handleStart);
       window.removeEventListener('load', handleLoadComplete);
      // Ensure class is removed if component unmounts during transition
      document.documentElement.classList.remove('page-transitioning');
    };
  }, []); // Runs once on mount

  // Dark mode setup and system preference listener
  useEffect(() => {
    const htmlElement = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to apply theme
    const applyTheme = (theme: string) => {
      htmlElement.classList.remove('dark', 'light');
      htmlElement.classList.add(theme);
    };

    // Check stored theme first, then system preference
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || (mediaQuery.matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    // Listener for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if no theme is explicitly stored by the user
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        htmlElement.classList.add('theme-transitioning');
        applyTheme(newTheme);
        setTimeout(() => {
          htmlElement.classList.remove('theme-transitioning');
        }, 300); // Match transition duration if needed
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Runs once on mount

  // Expose theme toggle function globally
  useEffect(() => {
    window.toggleTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.classList.add('theme-transitioning');
      htmlElement.classList.remove(currentTheme);
      htmlElement.classList.add(newTheme);

      // Store user preference
      localStorage.setItem('theme', newTheme);

      // Remove transitioning class after animation
      setTimeout(() => {
        htmlElement.classList.remove('theme-transitioning');
      }, 300); // Match transition duration if needed
    };

    // Cleanup global function on unmount
    return () => {
      delete window.toggleTheme;
    };
  }, []); // Runs once on mount

  // *** FIXED PART: Combined <style jsx global> block without CSS comments ***
  // This is rendered but the component itself outputs no visible DOM elements
  return (
    <>
      <style jsx global>{`
        body.is-blog-article {
          --blog-content-width: 760px;
        }

        body.is-blog-article .blog-post-container {
          max-width: var(--blog-content-width);
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }

        @media (min-width: 1024px) {
          body.is-blog-article .toc-container {
            position: fixed;
            top: 120px;
            left: 20px;
            width: 280px;
            max-width: 20vw;
          }

          body.is-blog-article .blog-post-container {
            margin-left: auto;
            margin-right: auto;
          }
        }

        body.is-blog-article .toc-container {
          background: var(--bg-secondary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 4px;
          padding: 1.5rem;
          margin: 2rem 0;
        }

        .page-transitioning * {
          transition: all 0.3s ease-out !important;
        }

        .page-transitioning::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--bg-primary); /* Ensure --bg-primary is defined in :root or body */
          opacity: 0.5;
          z-index: 9999;
          pointer-events: none;
          transition: opacity 0.3s ease-out; /* Add transition to the overlay */
        }

        /* Optional: Smooth theme transitions */
        html.theme-transitioning,
        html.theme-transitioning * {
           transition: background-color 0.3s ease-out, color 0.3s ease-out !important;
        }

      `}</style>
    </>
  );
}