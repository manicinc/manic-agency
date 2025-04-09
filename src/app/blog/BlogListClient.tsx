// /app/blog/BlogListClient.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
// Import the ASCII placeholder component
import { AsciiArtPlaceholder } from "@/lib/asciiPlaceholders";

interface BlogListClientProps {
  initialPosts: BlogPost[]; // Expecting sorted posts now
}

// Helper to format dates nicely
function formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    try {
        // Attempt to create a valid Date object
        const date = new Date(dateString);
        // Check if the date object is valid
        if (isNaN(date.getTime())) {
            return dateString; // Return original string if invalid
        }
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
    } catch (e) {
        return dateString; // Return original string on error
    }
}


export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  // State for posts - initialised with server-sorted data
  const [posts] = useState<BlogPost[]>(initialPosts);

  // State for filters and UI
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // --- Effects ---

  // Scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Placeholder for Blog Effects (e.g., cursor, particles JS part)
  useEffect(() => {
    console.log("Initialize client-side effects (cursor, particles JS, etc.)");
    // Example: If you have a function `initMushroomCursor` in a utility file:
    // import { initMushroomCursor } from '@/lib/effects';
    // const cleanupCursor = initMushroomCursor('.mushroom-cursor');
    // return () => { cleanupCursor(); }; // Cleanup function

    // Example: If you have particle generation JS
    // import { initParticles } from '@/lib/effects';
    // const cleanupParticles = initParticles('.wonderland-particles');
    // return () => { cleanupParticles(); };

    // IMPORTANT: Any logic from the old `blogEffects.js` goes here.
  }, []);


  // --- Memoized Calculations ---

  // Extract unique categories and tags from the posts
  const allCategories = useMemo(() =>
    ['all', ...Array.from(new Set(posts.map(post => post.category).filter((c): c is string => !!c)))]
  , [posts]);

  const allTags = useMemo(() =>
    Array.from(new Set(posts.flatMap(post => post.tags || []))).filter(Boolean)
  , [posts]);

  // Filter posts based on current state
  const filteredPosts = useMemo(() => posts.filter(post => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
    const tagsMatch = activeTags.length === 0 ||
      activeTags.every(tag => (post.tags ?? []).includes(tag));
    const searchMatch = !searchTerm ||
      post.title?.toLowerCase().includes(lowerSearchTerm) ||
      post.excerpt?.toLowerCase().includes(lowerSearchTerm) ||
      post.category?.toLowerCase().includes(lowerSearchTerm) ||
      (post.tags ?? []).some(tag => tag.toLowerCase().includes(lowerSearchTerm));
    return categoryMatch && tagsMatch && searchMatch;
  }), [posts, activeCategory, activeTags, searchTerm]);


  // --- Callbacks ---

  // Handle category change with animation
  const handleCategoryChange = useCallback((category: string) => {
    setAnimationClass('fade-out');
    // Use timeout matching CSS animation duration
    setTimeout(() => {
      setActiveCategory(category);
      setActiveTags([]); // Reset tags when category changes
      setSearchTerm(''); // Optionally reset search
      setAnimationClass('fade-in');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up on filter change
    }, 300);
  }, []);

  // Toggle tag selection
  const toggleTag = useCallback((tag: string) => {
     setAnimationClass('fade-out'); // Optional: Animate tag filtering too
     setTimeout(() => {
        setActiveTags(prev =>
          prev.includes(tag)
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
        );
        setAnimationClass('fade-in');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up on filter change
     }, 300);
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

   // Newsletter submission handler (Placeholder)
   const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      console.log("Subscribing with email:", newsletterEmail);
      alert(`Subscription feature not implemented yet for ${newsletterEmail}.`);
      // TODO: Add actual API call logic here to subscribe the user
      setNewsletterEmail(''); // Clear input
   }, [newsletterEmail]);

   // Reset all filters
   const resetFilters = useCallback(() => {
      setAnimationClass('fade-out');
      setTimeout(() => {
        setActiveCategory('all');
        setActiveTags([]);
        setSearchTerm('');
        setAnimationClass('fade-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
   }, []);


  // --- Render JSX ---
  return (
    <>
      {/* Header Section with Filters and Search */}
      <div className="blog-header">
        <h1 className="blog-title">Writings of the Mad</h1>
        <p className="blog-meta">
          ✍️ Explorations from the rabbit hole. Thinkpieces, tutorials, dispatches, and coded visions.
        </p>

        {/* Search Bar */}
        <div className="blog-search">
          <input
            type="text"
            placeholder="Search the rabbit hole..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blog-search-input"
            aria-label="Search blog posts"
          />
          {searchTerm && (
            <button
              type="button"
              className="blog-search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            > × </button>
          )}
        </div>

        {/* Category Filters */}
        {allCategories.length > 1 && ( // Only show if there are categories other than 'all'
          <div className="blog-categories-filter">
            {allCategories.map(category => (
              <button
                type="button"
                key={category}
                className={`blog-category-filter ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="blog-tags-filter">
            {allTags.map(tag => (
              <button
                type="button"
                key={tag}
                className={`blog-tag-filter ${activeTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

        {/* Blog Post Grid or Empty State */}
      {filteredPosts.length > 0 ? (
        <div className={`blog-grid ${animationClass}`}>
          {filteredPosts.map((post) => (
            <article key={post.slug + post.category} className="blog-card">
              {/* --- UPDATED: Image or ASCII Placeholder --- */}
              <div className="blog-card-image"> {/* Container helps maintain layout */}
                 {post.image ? (
                   <Link href={`/blog/${post.category}/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                     <img
                        src={post.image}
                        alt="" // Decorative
                        loading="lazy"
                        width="400" // Example width
                        height="250" // Example height matching aspect ratio
                     />
                   </Link>
                 ) : (
                   // Render ASCII placeholder if no image
                   <AsciiArtPlaceholder className="blog-card-ascii-placeholder" /> // Add specific class if needed
                 )}
              </div>
              {/* --- END IMAGE/PLACEHOLDER --- */}

              {/* --- UPDATED: Date Display --- */}
              <div className="blog-date">
                 <span title={`Published: ${post.date}`}> {/* Tooltip for exact date */}
                    <svg aria-hidden="true" focusable="false" /* Calendar Icon */>...</svg>
                    <time dateTime={post.date}>
                       {formatDate(post.date)}
                    </time>
                 </span>
                 {/* Optionally display modified date if different from published date */}
                 {post.modifiedDate && post.modifiedDate.split('T')[0] !== post.date && (
                    <span className="modified-date" title={`Last Updated: ${post.modifiedDate}`} style={{marginLeft: '10px', opacity: 0.7, fontSize: '0.9em'}}>
                      (Updated: {formatDate(post.modifiedDate)})
                    </span>
                 )}
                 {post.readingTime && (
                   <span className="reading-time-small">
                      <svg aria-hidden="true" focusable="false" /* Clock Icon */>...</svg>
                      {post.readingTime} min read
                   </span>
                 )}
              </div>
              {/* --- END DATE DISPLAY --- */}

              {post.category && (
                 <div className="blog-category">
                   <button
                     type="button"
                     className="category-name" // Use consistent class
                     onClick={() => handleCategoryChange(post.category!)}
                     aria-label={`Filter by category: ${post.category}`}
                   >
                     {post.category.toUpperCase()}
                   </button>
                 </div>
              )}

              <h2 className="blog-entry-title">
                <Link href={`/blog/${post.category}/${post.slug}`} className="blog-link">
                  {post.title}
                </Link>
              </h2>

              <p className="blog-excerpt">{post.excerpt}</p>

              {post.tags && post.tags.length > 0 && (
                <div className="blog-tags">
                  {post.tags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`blog-tag ${activeTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleTag(tag)}
                      aria-label={`Filter by tag: ${tag}`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}

              <div className="readmore-container">
                <Link href={`/blog/${post.category}/${post.slug}`} className="readmore-link">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="blog-empty-state">
          <h2 className="empty-title">Nothing Found in the Rabbit Hole...</h2>
          <p className="empty-description">
            No posts match your current search or filters. Perhaps try something else?
          </p>
          <button
            type="button"
            className="reset-filters-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}

       {/* Newsletter Section */}
       <div className="blog-feature-section">
          <div className="feature-card">
            <h2 className="feature-title">Stay In Wonderland</h2>
            <p className="feature-description">
              Don&apos;t miss a trip down the rabbit hole. Get notified when new writings appear.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
       </div>

       {/* Back to Top Button */}
       <button
         type="button"
         className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
         onClick={scrollToTop}
         aria-label="Back to top"
         title="Back to top" // Tooltip
       >
         <svg aria-hidden="true" focusable="false" /* Arrow Up Icon */>...</svg>
       </button>
    </>
  );
}