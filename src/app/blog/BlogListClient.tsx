// Added React.FC for component typing and React.FormEvent/ChangeEvent
import React, { useState, useEffect, useMemo, useCallback, FC, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { AsciiArtPlaceholder } from "@/lib/asciiPlaceholders";
import { Search, Filter, Tag, Calendar, Clock, X, ArrowUp } from "lucide-react";

// Import post props to use for initialPosts
import { BlogPost } from "@/types/blog";

// Format dates nicely
// Removed unused FormatDateOptions interface

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
  } catch (e) {
    console.error("Error formatting date:", e); // Log error for debugging
    return dateString; // Return original on error
  }
}

// Define Component Props
interface BlogListProps {
  initialPosts: BlogPost[];
}

// Use React.FC for component typing
const BlogList: FC<BlogListProps> = ({ initialPosts }) => {
  // State for posts - initialised with server-sorted data
  const [posts] = useState(initialPosts); // Type inferred from initialPosts

  // State for filters and UI
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // *** FIX 1: Explicitly type useState to avoid never[] inference ***
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [animationClass, setAnimationClass] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  // --- Effects ---

  // Scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Memoized Calculations ---

  // Extract unique categories and tags from the posts
  const allCategories = useMemo(() =>
    // Added type guard `is string` to ensure filter result is string[]
    ['all', ...Array.from(new Set(posts.map(post => post.category).filter((c): c is string => !!c)))]
  , [posts]);

  const allTags = useMemo(() =>
    // Added type guard `is string`
    Array.from(new Set(posts.flatMap(post => post.tags || []))).filter((t): t is string => !!t)
  , [posts]);

  // Filter posts based on current state
  const filteredPosts = useMemo(() => posts.filter(post => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
    // activeTags is now correctly typed as string[]
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

  // Removed unused HandleCategoryChangeParams interface

  // *** FIX 2: Accept category directly as string, remove object destructuring ***
  const handleCategoryChange = useCallback((category: string) => {
    setAnimationClass('fade-out');
    // Use timeout matching CSS animation duration
    setTimeout(() => {
      setActiveCategory(category);
      setActiveTags([]); // Reset tags when category changes
      setSearchTerm(''); // Reset search
      setAnimationClass('fade-in');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up on filter change
    }, 300);
  }, []); // Keep empty deps if no external state/props used

  // Removed unused ToggleTagParams interface

  // *** FIX 3: Accept tag directly as string, remove object destructuring ***
  const toggleTag = useCallback((tag: string) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      // 'prev' is now correctly inferred as string[]
      setActiveTags(prev =>
        prev.includes(tag)
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
      setAnimationClass('fade-in');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []); // Keep empty deps if no external state/props used

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Newsletter submission handler
  // *** FIX 4: Add type for event object ***
  const handleNewsletterSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribing with email:", newsletterEmail);
    alert(`Subscription feature not implemented yet for ${newsletterEmail}.`);
    setNewsletterEmail('');
  }, [newsletterEmail]); // Keep dependency

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
  }, []); // Keep empty deps

  // --- Render ---
  return (
    <div className="blog-container">
      {/* Header Section with Title and Description */}
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
             // Optionally add explicit type to event
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="blog-search-input"
            aria-label="Search blog posts"
          />
          <Search className="search-icon text-accent-primary" size={18} />
          {searchTerm && (
            <button
              type="button"
              className="blog-search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        {allCategories.length > 1 && (
          <div className="blog-categories-filter">
            {allCategories.map(category => (
              <button
                type="button"
                key={category}
                className={`blog-category-filter ${activeCategory === category ? 'active' : ''}`}
                // No change needed here, already passes string
                onClick={() => handleCategoryChange(category)}
              >
                <Filter size={12} className="mr-1" />
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
                // No change needed here, already passes string
                onClick={() => toggleTag(tag)}
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Blog Posts Grid or Empty State */}
      {filteredPosts.length > 0 ? (
        <div className={`blog-grid ${animationClass}`}>
          {filteredPosts.map((post) => (
            <article key={`${post.category || 'uncategorized'}-${post.slug}`} className="blog-card">
               {/* Image or ASCII Placeholder */}
               <div className="blog-card-image">
                 {post.image ? (
                   <Link href={`/blog/${post.category}/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                     {/* Consider Next/Image */}
                     <img
                       src={post.image}
                       alt="" // Add descriptive alt text
                       loading="lazy"
                       width={400} // Example width
                       height={250} // Example height
                     />
                   </Link>
                 ) : (
                   <Link href={`/blog/${post.category}/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                     <AsciiArtPlaceholder className="blog-card-ascii-placeholder" />
                   </Link>
                 )}
               </div>

               {/* Date Display */}
               <div className="blog-date">
                 <span title={`Published: ${post.date}`}>
                   <Calendar size={14} className="mr-1" />
                   <time dateTime={post.date ? new Date(post.date).toISOString() : undefined}>
                      {post.date ? formatDate(post.date) : 'Date unavailable'}
                   </time>
                 </span>
                 {post.modifiedDate && post.modifiedDate !== post.date && (
                    <span className="modified-date" title={`Last Updated: ${formatDate(post.modifiedDate)}`}>
                      (Updated: {formatDate(post.modifiedDate)})
                    </span>
                 )}
                 {post.readingTime && (
                    <span className="reading-time-small">
                      <Clock size={14} className="mr-1" />
                      {post.readingTime} min read
                    </span>
                 )}
               </div>

               {/* Category Badge */}
               {post.category && (
                 <div className="blog-category">
                   <button
                     type="button"
                     className="category-name"
                     // Ensure category exists before passing, use non-null assertion '!' if certain
                     onClick={() => handleCategoryChange(post.category!)}
                     aria-label={`Filter by category: ${post.category}`}
                   >
                     {post.category.toUpperCase()}
                   </button>
                 </div>
               )}

               {/* Title */}
               <h2 className="blog-entry-title">
                  <Link href={`/blog/${post.category}/${post.slug}`} className="blog-link">
                    {post.title || 'Untitled Post'}
                  </Link>
               </h2>

               {/* Excerpt */}
               <p className="blog-excerpt">{post.excerpt || 'No excerpt available.'}</p>

               {/* Tags */}
               {post.tags && post.tags.length > 0 && (
                 <div className="blog-tags">
                   {post.tags.map((tag) => (
                     <button
                       type="button"
                       key={tag}
                       className={`blog-tag ${activeTags.includes(tag) ? 'active' : ''}`}
                        // No change needed here, already passes string
                       onClick={() => toggleTag(tag)}
                       aria-label={`Filter by tag: ${tag}`}
                     >
                       #{tag}
                     </button>
                   ))}
                 </div>
               )}

               {/* Read More Link */}
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
               // Optionally add explicit type to event
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewsletterEmail(e.target.value)}
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
        title="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default BlogList;