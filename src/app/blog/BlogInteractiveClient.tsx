'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TableOfContentsItem } from '@/types/blog';
import { BookOpen, ArrowUp } from 'lucide-react';

interface Props {
  tableOfContents: TableOfContentsItem[];
  postUrl: string;
  postTitle: string;
}

export default function BlogInteractiveClient({ tableOfContents, postUrl, postTitle }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [showMobileToc, setShowMobileToc] = useState(false);

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
    
    if (headings.length === 0) return;
    
    // Find the current active heading
    let currentActive = '';
    const offset = 180; // Increased offset to fix visibility issues
    
    // Find the topmost visible heading
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();
      
      if (rect.top <= offset) {
        currentActive = heading.id;
      } else {
        break;
      }
    }
    
    // If we scrolled past all headings, use the last one
    if (currentActive === '' && scrollTop > 0 && headings.length > 0) {
      currentActive = headings[headings.length - 1].id;
    }
    
    setActiveHeading(currentActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get proper header offset, accounting for fixed elements
  const getHeaderOffset = useCallback(() => {
    const header = document.querySelector('.sticky-header') || document.querySelector('header');
    return header ? header.clientHeight + 80 : 120; // Added more margin
  }, []);

  // TOC link click handler
  const handleTocClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    
    const element = document.getElementById(slug);
    if (element) {
      let offsetTop = element.offsetTop - getHeaderOffset();
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile TOC after clicking
      setShowMobileToc(false);
    }
  }, [getHeaderOffset]);

  // Toggle mobile TOC visibility
  const toggleMobileToc = useCallback(() => {
    setShowMobileToc(prev => !prev);
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div
         className="reading-progress"
         style={{ width: `${readingProgress}%` }}
         role="progressbar"
         aria-valuenow={Math.round(readingProgress)}
         aria-valuemin={0}
         aria-valuemax={100}
         aria-label="Reading progress"
      />

      {/* Mobile TOC Toggle Button */}
      {tableOfContents.length > 0 && (
        <button 
          className="mobile-toc-toggle" 
          onClick={toggleMobileToc}
          aria-expanded={showMobileToc}
          aria-label="Toggle table of contents"
        >
          <BookOpen size={20} />
          <span>Contents</span>
        </button>
      )}

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <aside className={`toc-container ${showMobileToc ? 'mobile-visible' : ''}`}>
          <div className="toc-header">
            <h2 className="toc-title">
              <BookOpen size={18} className="mr-2" />
              In This Article
            </h2>
            <button 
              className="toc-close-mobile" 
              onClick={() => setShowMobileToc(false)}
              aria-label="Close table of contents"
            >
              &times;
            </button>
          </div>
          
          <nav aria-label="Table of Contents">
            <ul className="toc-list">
              {tableOfContents.map((heading) => {
                 // Use the slug from the heading if available, or generate one
                 const slug = heading.slug || heading.text
                   .toLowerCase()
                   .replace(/[^\w\s-]/g, '')
                   .replace(/\s+/g, '-')
                   .replace(/-+/g, '-');
                 
                 if (!slug) return null;

                 return (
                   <li 
                     key={slug} 
                     className={`toc-item level-${heading.level} ${activeHeading === slug ? 'active' : ''}`} 
                     style={{ 
                       paddingLeft: `${(heading.level - 1) * 12}px`,
                       borderLeft: activeHeading === slug ? '2px solid var(--accent-primary)' : 'none'
                     }}
                   >
                      <a
                         href={`#${slug}`}
                         className={activeHeading === slug ? 'active' : ''}
                         onClick={(e) => handleTocClick(e, slug)}
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
        <ArrowUp size={20} />
      </button>
      
      {/* Styles for the mobile TOC */}
      <style jsx global>{`
        /* Mobile TOC Toggle Button */
        .mobile-toc-toggle {
          display: none; /* Hidden on desktop */
          position: fixed;
          bottom: 30px;
          left: 30px;
          background: var(--bg-secondary);
          border: 1px solid var(--accent-primary);
          border-radius: 30px;
          padding: 8px 16px;
          z-index: 100;
          color: var(--text-primary);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          align-items: center;
          gap: 8px;
        }
        
        /* Mobile TOC Container */
        @media (max-width: 1023px) {
          .toc-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-secondary);
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
            max-height: 100vh;
            padding: 20px;
            margin: 0;
          }
          
          .toc-container.mobile-visible {
            transform: translateX(0);
          }
          
          .mobile-toc-toggle {
            display: flex;
          }
          
          .toc-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .toc-close-mobile {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 24px;
            cursor: pointer;
          }
        }
        
        /* Desktop TOC */
        @media (min-width: 1024px) {
          .toc-header .toc-close-mobile {
            display: none;
          }
          
          .toc-container {
            width: 280px;
            max-width: 20vw;
          }
          
          .blog-post-container {
            margin-left: calc(20vw + 40px);
          }
        }
        
        /* Enhanced TOC styles */
        .toc-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--accent-primary);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }
        
        .toc-list {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }
        
        .toc-item {
          margin-bottom: 0.75rem;
          transition: border-color 0.2s ease;
        }
        
        .toc-item a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          display: block;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          transition: all 0.2s ease;
        }
        
        .toc-item a:hover {
          color: var(--accent-primary);
          background: rgba(127, 90, 240, 0.1);
        }
        
        .toc-item a.active {
          color: var(--accent-primary);
          font-weight: 500;
        }
      `}</style>
    </>
  );
}