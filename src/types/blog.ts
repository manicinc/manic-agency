// src/types/blog.ts - Updated Type definitions

export interface BlogPost {
  slug: string;
  category: string; // Now required
  title: string;
  date: string; // Primary date from frontmatter (or git first commit)
  modifiedDate?: string; // Optional: Date of last modification (e.g., git last commit)
  excerpt?: string;
  content?: string;
  image?: string | null; // Can be string or null
  author?: string;
  authorBio?: string;
  tags?: string[];
  readingTime?: number;
  featured?: boolean; // Added for sorting
}

export interface TableOfContentsItem {
  level: number;
  text: string;
  slug: string;
}

export interface ShareButtonsProps {
  title: string;
  url: string;
}

// Interface for ASCII Placeholder component props (Optional)
export interface AsciiPlaceholderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}