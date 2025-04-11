'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, Filter, Tag, Calendar, Clock, X, ArrowUp, SlidersHorizontal } from 'lucide-react';
import { BlogPost } from "@/types/blog";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GlitchAnimation from "@/components/GlitchAnimation";

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  // Router and URL handling
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State initialization from URL or defaults
  const [posts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [activeTags, setActiveTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') || ''
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get('sort') || 'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('order') as 'asc' | 'desc') || 'desc'
  );
  
  // UI state
  const [animationClass, setAnimationClass] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);
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
  
  // Update URL when filters change
  useEffect(() => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams();
    
    // Add parameters if they have values
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (activeTags.length > 0) params.set('tags', activeTags.join(','));
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy !== 'date') params.set('sort', sortBy);
    if (sortOrder !== 'desc') params.set('order', sortOrder);
    
    // Update the URL without refreshing the page
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(url, { scroll: false });
  }, [activeCategory, activeTags, searchTerm, sortBy, sortOrder, pathname, router]);

  // --- Memoized Calculations ---

  // Extract unique categories and tags from the posts
  const allCategories = useMemo(() => 
    ['all', ...Array.from(new Set(posts.map(post => post.category).filter((c): c is string => !!c)))]
  , [posts]);

  const allTags = useMemo(() =>
    Array.from(new Set(posts.flatMap(post => post.tags || []))).filter((t): t is string => !!t)
  , [posts]);

  // Filter and sort posts based on current state
  const filteredPosts = useMemo(() => {
    // First filter the posts
    const filtered = posts.filter(post => {
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
    });
    
    // Then sort the filtered posts
    return [...filtered].sort((a, b) => {
      // Handle different sort fields
      if (sortBy === 'date') {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'title') {
        const titleA = a.title || '';
        const titleB = b.title || '';
        return sortOrder === 'asc' 
          ? titleA.localeCompare(titleB) 
          : titleB.localeCompare(titleA);
      } else if (sortBy === 'readingTime') {
        const timeA = a.readingTime || 0;
        const timeB = b.readingTime || 0;
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      }
      return 0;
    });
  }, [posts, activeCategory, activeTags, searchTerm, sortBy, sortOrder]);

  // --- Callbacks ---

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setActiveCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setAnimationClass('fade-in');
    }, 300);
  }, []);

  // Toggle tag selection
  const toggleTag = useCallback((tag: string) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setActiveTags(prev =>
        prev.includes(tag)
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setAnimationClass('fade-in');
    }, 300);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((field: string) => {
    if (sortBy === field) {
      // Toggle order if clicking the same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortBy(field);
      setSortOrder('desc');
    }
  }, [sortBy]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Newsletter submission handler
  const handleNewsletterSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribing with email:", newsletterEmail);
    alert(`Subscription feature not implemented yet for ${newsletterEmail}.`);
    setNewsletterEmail('');
  }, [newsletterEmail]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setActiveCategory('all');
      setActiveTags([]);
      setSearchTerm('');
      setSortBy('date');
      setSortOrder('desc');
      setAnimationClass('fade-in');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []);

  // Format date function
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // --- Render ---
  return (
    <div className="blog-container">
      {/* Blog Header Section with Animation */}
      <div className="blog-header">
        <h1 className="blog-title">Writings of the Mad</h1>
        <p className="blog-meta">
          ✍️ Explorations from the rabbit hole. Thinkpieces, tutorials, dispatches, and coded visions.
        </p>
        
        {/* Rabbit Hole Animation */}
        <div className="blog-animation">
          <GlitchAnimation />
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          className="filters-toggle-mobile"
          onClick={() => setShowFiltersMobile(!showFiltersMobile)}
        >
          <SlidersHorizontal size={18} />
          <span>Filters {filteredPosts.length !== posts.length ? `(${filteredPosts.length})` : ''}</span>
        </button>
        
        {/* Filters Section */}
        <div className={`blog-filters ${showFiltersMobile ? 'show-mobile' : ''}`}>
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
            <Search className="search-icon" size={18} />
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
          
          {/* Sort Controls */}
          <div className="blog-sort">
            <span className="sort-label">Sort by:</span>
            <div className="sort-buttons">
              <button 
                className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
                onClick={() => handleSortChange('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button 
                className={`sort-button ${sortBy === 'title' ? 'active' : ''}`}
                onClick={() => handleSortChange('title')}
              >
                Title {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button 
                className={`sort-button ${sortBy === 'readingTime' ? 'active' : ''}`}
                onClick={() => handleSortChange('readingTime')}
              >
                Reading Time {sortBy === 'readingTime' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            </div>
          </div>

          {/* Category Filters */}
          {allCategories.length > 1 && (
            <div className="blog-categories-filter">
              <div className="filter-label">
                <Filter size={14} />
                <span>Categories</span>
              </div>
              <div className="filter-options">
                {allCategories.map(category => (
                  <button
                    type="button"
                    key={category}
                    className={`blog-category-filter ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="blog-tags-filter">
              <div className="filter-label">
                <Tag size={14} />
                <span>Tags</span>
              </div>
              <div className="filter-options">
                {allTags.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    className={`blog-tag-filter ${activeTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Reset button */}
          {(activeCategory !== 'all' || activeTags.length > 0 || searchTerm || sortBy !== 'date' || sortOrder !== 'desc') && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={resetFilters}
            >
              Reset All Filters
            </button>
          )}
          
          {/* Mobile Close Button */}
          <button 
            className="close-filters-mobile"
            onClick={() => setShowFiltersMobile(false)}
          >
            Close
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      {(activeCategory !== 'all' || activeTags.length > 0 || searchTerm) && (
        <div className="filter-summary">
          <span className="results-count">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
          </span>
          <div className="active-filters">
            {activeCategory !== 'all' && (
              <div className="active-filter">
                <span>Category: {activeCategory}</span>
                <button onClick={() => handleCategoryChange('all')}>
                  <X size={14} />
                </button>
              </div>
            )}
            {activeTags.map(tag => (
              <div key={tag} className="active-filter">
                <span>Tag: {tag}</span>
                <button onClick={() => toggleTag(tag)}>
                  <X size={14} />
                </button>
              </div>
            ))}
            {searchTerm && (
              <div className="active-filter">
                <span>Search: {searchTerm}</span>
                <button onClick={() => setSearchTerm('')}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Posts Grid or Empty State */}
      {filteredPosts.length > 0 ? (
        <div className={`blog-grid ${animationClass}`}>
          {filteredPosts.map((post) => (
            <article key={`${post.category || 'uncategorized'}-${post.slug}`} className="blog-card">
              {/* Image or ASCII Placeholder */}
              <div className="blog-card-image">
                {post.image ? (
                  <Link href={`/blog/${post.category}/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                    <img
                      src={post.image}
                      alt="" 
                      loading="lazy"
                      width={400}
                      height={250}
                    />
                  </Link>
                ) : (
                  <Link href={`/blog/${post.category}/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                    <div className="blog-card-ascii-placeholder"></div>
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
        title="Back to top"
      >
        <ArrowUp size={20} />
      </button>
      
      {/* Additional Styles */}
      <style jsx>{`
        /* Animation classes */
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .fade-out {
          animation: fadeOut 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(10px); }
        }
        
        /* Blog Animation */
        .blog-animation {
          margin-bottom: 2rem;
          max-height: 300px;
          overflow: hidden;
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* Filter Toggle for Mobile */
        .filters-toggle-mobile {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 0.5rem;
          color: var(--text-primary);
          width: 100%;
          margin-bottom: 1rem;
        }
        
        .close-filters-mobile {
          display: none;
          width: 100%;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 0.5rem;
          color: var(--text-primary);
          margin-top: 1rem;
        }
        
        /* Filter Summary */
        .filter-summary {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          border: 1px solid rgba(127, 90, 240, 0.1);
        }
        
        .results-count {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .active-filter {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.3rem 0.6rem;
          background: rgba(127, 90, 240, 0.1);
          border-radius: 9999px;
          font-size: 0.85rem;
          color: var(--accent-primary);
        }
        
        .active-filter button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--accent-primary);
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .active-filter button:hover {
          opacity: 1;
        }
        
        /* Blog Search */
        .blog-search {
          position: relative;
          margin-bottom: 1.5rem;
        }
        
        .blog-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 0.5rem;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }
        
        .blog-search-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(127, 90, 240, 0.2);
          outline: none;
        }
        
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }
        
        .blog-search-clear {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }
        
        .blog-search-clear:hover {
          color: var(--accent-highlight);
        }
        
        /* Sort Controls */
        .blog-sort {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .sort-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .sort-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .sort-button {
          padding: 0.4rem 0.8rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        
        .sort-button:hover {
          background: var(--bg-secondary);
          color: var(--accent-primary);
        }
        
        .sort-button.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }
        
        /* Category and Tag Filters */
        .blog-categories-filter,
        .blog-tags-filter {
          margin-bottom: 1.5rem;
        }
        
        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .blog-category-filter,
        .blog-tag-filter {
          padding: 0.4rem 0.8rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        
        .blog-category-filter:hover,
        .blog-tag-filter:hover {
          background: var(--bg-secondary);
          color: var(--accent-primary);
        }
        
        .blog-category-filter.active,
        .blog-tag-filter.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }
        
        /* Reset button */
        .reset-filters-btn {
          padding: 0.6rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(229, 49, 112, 0.3);
          border-radius: 0.5rem;
          color: var(--accent-highlight);
          font-size: 0.9rem;
          transition: all 0.2s ease;
          margin-bottom: 1rem;
        }
        
        .reset-filters-btn:hover {
          background: rgba(229, 49, 112, 0.1);
          border-color: var(--accent-highlight);
        }
        
        /* Blog Card Placeholder */
        .blog-card-ascii-placeholder {
          width: 100%;
          height: 200px;
          background: var(--bg-tertiary);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-family: monospace;
          overflow: hidden;
          position: relative;
        }
        
        .blog-card-ascii-placeholder::before {
          content: ">_";
          font-size: 2rem;
          position: absolute;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* Blog Card */
        .blog-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .blog-card-image {
          height: 200px;
          overflow: hidden;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .blog-card:hover .blog-card-image img {
          transform: scale(1.05);
        }
        
        .blog-date {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        
        .reading-time-small {
          display: flex;
          align-items: center;
        }
        
        .blog-category {
          margin-bottom: 0.75rem;
        }
        
        .category-name {
          background: rgba(127, 90, 240, 0.1);
          color: var(--accent-primary);
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .category-name:hover {
          background: rgba(127, 90, 240, 0.2);
        }
        
        .blog-entry-title {
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
          line-height: 1.3;
          color: var(--accent-primary);
        }
        
        .blog-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .blog-link:hover {
          color: var(--accent-highlight);
        }
        
        .blog-excerpt {
          margin-bottom: 1rem;
          color: var(--text-secondary);
          flex-grow: 1;
        }
        
        .blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .blog-tag {
          background: rgba(229, 49, 112, 0.1);
          color: var(--accent-highlight);
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .blog-tag:hover {
          background: rgba(229, 49, 112, 0.2);
          transform: translateY(-2px);
        }
        
        .blog-tag.active {
          background: var(--accent-highlight);
          color: white;
        }
        
        .readmore-container {
          text-align: right;
          margin-top: auto;
        }
        
        .readmore-link {
          color: var(--accent-primary);
          font-style: italic;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .readmore-link:hover {
          color: var(--accent-highlight);
        }
        
        .readmore-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-highlight));
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .readmore-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        /* Blog Empty State */
        .blog-empty-state {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          border: 1px dashed rgba(127, 90, 240, 0.3);
        }
        
        .empty-title {
          font-size: 1.5rem;
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }
        
        .empty-description {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        /* Newsletter Section */
        .blog-feature-section {
          margin-top: 4rem;
        }
        
        .feature-card {
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(127, 90, 240, 0.2);
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(127, 90, 240, 0.05), rgba(229, 49, 112, 0.05));
          z-index: 0;
        }
        
        .feature-title {
          font-size: 2rem;
          color: var(--accent-primary);
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        
        .feature-description {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .newsletter-input {
          flex-grow: 1;
          padding: 0.75rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid rgba(127, 90, 240, 0.2);
          border-radius: 0.5rem 0 0 0.5rem;
          color: var(--text-primary);
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
        
        .newsletter-button {
          padding: 0.75rem 1.5rem;
          background: var(--accent-primary);
          color: white;
          border: none;
          border-radius: 0 0.5rem 0.5rem 0;
          transition: all 0.2s ease;
        }
        
        .newsletter-button:hover {
          background: var(--accent-highlight);
        }
        
        /* Media Queries */
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .blog-filters {
            display: none;
            padding: 1rem;
            background: var(--bg-secondary);
            border-radius: 0.5rem;
            border: 1px solid rgba(127, 90, 240, 0.2);
            margin-bottom: 1.5rem;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            overflow-y: auto;
          }
          
          .blog-filters.show-mobile {
            display: block;
          }
          
          .filters-toggle-mobile {
            display: flex;
          }
          
          .close-filters-mobile {
            display: block;
          }
          
          .newsletter-form {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .newsletter-input {
            border-radius: 0.5rem;
          }
          
          .newsletter-button {
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}