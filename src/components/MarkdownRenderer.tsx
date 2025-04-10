'use client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { ReactNode } from 'react';

// Component imports
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { Components } from 'react-markdown';

/**
 * Props for the CustomMarkdownRenderer component
 */
interface CustomReactMarkdownProps {
    children: string;
    className?: string;
}

/**
 * Props for code blocks in markdown
 */
interface CodeProps {
    className?: string;
    children?: ReactNode;
    node?: any;
    [key: string]: any;
}

/**
 * Helper component to wrap image rendering with enhanced features
 * Handles sizing, alignment, captions, and visual effects
 */
const ImageWrapper: React.FC<{ src: string; alt: string; [key: string]: any }> = ({ src, alt, ...props }) => {
  // Parse size, alignment, effects, and caption from alt text
  // Format: ![alt text|size=small|align=left|effect=glow|caption=My caption](/path/to/image.jpg)
  let imageSize: 'small' | 'medium' | 'large' | 'full' | 'default' = 'default';
  let imageAlign: keyof typeof alignClasses = 'center';
  let imageEffect: keyof typeof effectClasses = 'none';
  let imageCaption = '';
  let altText = alt;
  let isZoomable = false;
  
  // Advanced parsing for parameters in alt text
  if (alt && alt.includes('|')) {
    const parts = alt.split('|');
    altText = parts[0].trim();
    
    // Process each parameter
    parts.slice(1).forEach((part) => {
      const [key, value] = part.includes('=') ? part.split('=') : [part.trim(), 'true'];
      
      // Handle different parameter types
      if (key.trim() === 'size' && ['small', 'medium', 'large', 'full', 'default'].includes(value.trim().toLowerCase())) {
        imageSize = value.trim().toLowerCase() as 'small' | 'medium' | 'large' | 'full' | 'default';
      }
      if (key.trim() === 'align' && ['left', 'center', 'right', 'default'].includes(value.trim().toLowerCase())) {
        imageAlign = value.trim().toLowerCase() as 'left' | 'center' | 'right' | 'default';
      }
      if (key.trim() === 'effect' && ['shadow', 'border', 'glow', 'glitch', 'none'].includes(value.trim().toLowerCase())) {
        imageEffect = value.trim().toLowerCase() as 'shadow' | 'border' | 'glow' | 'glitch' | 'none';
      }
      if (key.trim() === 'caption') imageCaption = value.trim();
      if (key.trim() === 'zoomable' && value.trim() === 'true') isZoomable = true;
    });
  }
  
  // CSS classes based on size
  const sizeClasses = {
    small: 'w-1/3 md:w-1/4 max-w-[300px] my-4',
    medium: 'w-2/3 md:w-1/2 max-w-[500px] my-6',
    large: 'w-full md:w-3/4 max-w-[800px] my-8',
    full: 'w-full my-8',
    default: 'w-full my-8',
  };
  
  // CSS classes based on alignment
  const alignClasses = {
    left: 'float-left mr-6 mb-4',
    center: 'mx-auto block',
    right: 'float-right ml-6 mb-4',
    default: 'mx-auto block',
  };
  
  // CSS classes based on effects
  const effectClasses = {
    shadow: 'shadow-lg',
    border: 'border border-accent-primary/20 p-1',
    glow: 'shadow-[0_0_15px_rgba(127,90,240,0.5)]',
    glitch: 'hover:before:opacity-100 hover:after:opacity-100 relative overflow-hidden',
    none: '',
  };
  
  // Combine all classes
  const sizeClass = sizeClasses[imageSize];
  const alignClass = alignClasses[imageAlign];
  const effectClass = effectClasses[imageEffect];
  
  const className = `${sizeClass} ${alignClass} ${effectClass} rounded-md`;
  const caption = imageCaption || altText;
  
  // Return a properly structured figure with optional caption
  return (
    <div className="md-image-container">
      <figure className={`image-with-caption ${alignClass}`}>
        <img
          src={src}
          alt={altText}
          className={`content-image ${className}`}
          loading="lazy"
          {...props}
        />
        {caption && (
          <figcaption className="text-center text-sm text-text-muted mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

/**
 * Custom components for React Markdown to enhance rendering
 * Each component overrides the default behavior of React Markdown
 */
export const markdownComponents: Components = {
    // Override paragraph to handle images properly
    p: ({ children, ...props }) => {
      // Check if this paragraph contains an image
      const childArray = React.Children.toArray(children);
      const imageIndex = childArray.findIndex(
        child => React.isValidElement(child) && 
        (child.type === 'img' || (child.props && 'src' in child.props))
      );
      
      // If an image is found directly in the children, split the content
      if (imageIndex !== -1) {
        // Split children into before, image, and after segments
        const before = childArray.slice(0, imageIndex);
        const image = childArray[imageIndex];
        const after = childArray.slice(imageIndex + 1);
        
        // Create fragments with proper element nesting
        return (
          <>
            {before.length > 0 && <p {...props}>{before}</p>}
            <div className="markdown-image-wrapper">{image}</div>
            {after.length > 0 && <p {...props}>{after}</p>}
          </>
        );
      }
      
      // Regular paragraph with no images - render normally
      return <p {...props}>{children}</p>;
    },
    
    // Custom image handling
    img: ({ src, alt, ...props }) => {
      return <ImageWrapper src={src || ''} alt={alt || 'Image'} {...props} />;
    },
    
    // Add syntax highlighting for code blocks
    code: ({ className, children, ...props }: CodeProps) => {
      // Check if this is a code block with a language specified
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match;
      
      // For code blocks with language specification
      if (!isInline && match) {
        return (
          <SyntaxHighlighter
            style={coldarkDark}
            language={match[1]}
            PreTag="div"
            className="rounded-md my-6"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }
      
      // For inline code
      return (
        <code className="px-1.5 py-0.5 bg-bg-tertiary text-accent-primary rounded font-mono" {...props}>
          {children}
        </code>
      );
    },
    
    // Support for custom callouts in blockquotes
    blockquote: ({ children, ...props }) => {
      // Try to check if this is a callout by examining children
      const childArray = React.Children.toArray(children);
      let isCallout = false;
      let calloutType = "note";
      let contentChildren = childArray;
      
      // Check if the first paragraph contains a callout marker
      if (childArray.length > 0 && React.isValidElement(childArray[0])) {
        const firstPara = childArray[0];
        const firstChildText = React.isValidElement(firstPara) && 
                              typeof firstPara.props.children === 'string' 
                              ? firstPara.props.children : '';
        
        if (firstChildText && /^:::(note|warning|tip|alert)\s*$/.test(firstChildText)) {
          isCallout = true;
          const match = firstChildText.match(/^:::(note|warning|tip|alert)\s*$/);
          calloutType = match ? match[1] : "note";
          contentChildren = childArray.slice(1);
        }
      }
      
      // Render different blockquote styles based on callout type
      if (isCallout) {
        // Map callout types to styles
        const styles: {[key: string]: string} = {
          note: "border-l-4 border-accent-primary bg-bg-tertiary",
          warning: "border-l-4 border-accent-alert bg-accent-alert/5",
          tip: "border-l-4 border-accent-secondary bg-accent-secondary/5",
          alert: "border-l-4 border-accent-highlight bg-accent-highlight/5"
        };
        
        const titleColors: {[key: string]: string} = {
          note: "text-accent-primary",
          warning: "text-accent-alert",
          tip: "text-accent-secondary",
          alert: "text-accent-highlight"
        };
        
        return (
          <div className={`${styles[calloutType]} p-4 rounded-r-md my-6`}>
            <h4 className={`font-bold ${titleColors[calloutType]} mb-2 capitalize`}>
              {calloutType}
            </h4>
            <div className="text-text-secondary">{contentChildren}</div>
          </div>
        );
      }
      
      // Regular blockquote
      return (
        <blockquote className="border-l-4 border-accent-primary pl-4 italic my-6 text-text-secondary" {...props}>
          {children}
        </blockquote>
      );
    },
    
    // Enhanced table support with proper styling
    table: ({ children, ...props }) => {
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse" {...props}>
            {children}
          </table>
        </div>
      );
    },
    
    thead: ({ children, ...props }) => {
      return (
        <thead className="bg-bg-tertiary" {...props}>
          {children}
        </thead>
      );
    },
    
    th: ({ children, ...props }) => {
      return (
        <th className="p-3 text-left text-accent-primary border-b border-accent-primary/20" {...props}>
          {children}
        </th>
      );
    },
    
    td: ({ children, ...props }) => {
      return (
        <td className="p-3 border-b border-accent-primary/10" {...props}>
          {children}
        </td>
      );
    },
};

/**
 * CustomMarkdownRenderer - A React component that enhances Markdown rendering
 * - Handles proper image rendering with captions and styling
 * - Supports code syntax highlighting
 * - Provides custom callouts and enhanced table styling
 * - Prevents hydration errors by ensuring proper DOM structure
 */
export function CustomMarkdownRenderer({ children, className="" }: CustomReactMarkdownProps) {
    return (
      <div className={className}>
        <ReactMarkdown
          components={markdownComponents}
          rehypePlugins={[
            rehypeSlug, // Adds id attributes to headings
            [rehypeAutolinkHeadings, { behavior: 'wrap' }], // Makes headings linkable
          ]}
          remarkPlugins={[
            remarkGfm, // GitHub Flavored Markdown support
            remarkUnwrapImages, // Critical plugin to remove p tags around images
          ]}
        >
          {children}
        </ReactMarkdown>

        <style jsx global>{`
          /* Ensure images are properly contained */
          .md-image-container {
            margin: 1.5rem 0;
            display: block;
          }
          
          /* Prevent images from being wrapped in paragraphs - safety measure */
          p > img, p > figure {
            display: none;
          }
          
          /* Apply proper styling to image wrappers */
          .markdown-image-wrapper {
            margin: 1.5rem 0;
          }
        `}</style>
      </div>
    );
}