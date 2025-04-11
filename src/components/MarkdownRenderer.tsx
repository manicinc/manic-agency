'use client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { ReactNode, useState } from 'react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Component imports
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { Components } from 'react-markdown';

// Import our own components
import ZoomableImage from './ZoomableImage';
import { AsciiArtPlaceholder } from '@/lib/asciiPlaceholders';

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
 * Props for ImageGrid component
 */
interface ImageGridProps {
    children: React.ReactNode;
    columns?: number;
}

/**
 * ImageGrid Component for arranging multiple images in a grid layout
 */
const ImageGrid: React.FC<ImageGridProps> = ({ children, columns = 2 }) => {
  return (
    <div 
      className="image-grid my-8" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${columns}, 1fr)`, 
        gap: '1rem' 
      }}
    >
      {children}
    </div>
  );
};

/**
 * Banner Component for highlighted sections
 */
interface BannerProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
}

const Banner: React.FC<BannerProps> = ({ 
  text, 
  backgroundColor = 'var(--accent-primary)', 
  textColor = 'white',
  alignment = 'center',
  size = 'medium',
  icon
}) => {
  const sizeClass = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-4 px-6 text-base',
    large: 'py-6 px-8 text-lg'
  };

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div 
      className={`banner ${sizeClass[size]} ${alignClass[alignment]} my-8 rounded-md relative overflow-hidden`}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Optional backdrop pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(0.5)">
            <path d="M100,0 L100,100 M0,100 L100,100 M0,0 L100,0 M0,0 L0,100" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
            <circle cx="100" cy="0" r="2" fill="currentColor" />
            <circle cx="0" cy="100" r="2" fill="currentColor" />
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>
      
      <div className="relative z-10 flex items-center justify-center">
        {icon && <span className="mr-2 text-2xl">{icon}</span>}
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
      </div>
    </div>
  );
};

/**
 * Timeline Component
 */
interface TimelineItem {
  date: string;
  title: string;
  content: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="timeline my-8">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="timeline-date">{item.date}</div>
            <h4 className="timeline-title">{item.title}</h4>
            <div className="timeline-body">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Tabs Component
 */
interface TabsProps {
  children: React.ReactNode[];
  titles: string[];
}

const Tabs: React.FC<TabsProps> = ({ children, titles }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container my-8">
      <div className="tabs-header">
        {titles.map((title, index) => (
          <button 
            key={index} 
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

/**
 * Custom components for React Markdown to enhance rendering
 * Each component overrides the default behavior of React Markdown
 */
export const markdownComponents: Components = {
  // Override paragraph to handle images and custom components
  p: ({ children, ...props }) => {
    const childArray = React.Children.toArray(children);
    
    // Check if this paragraph contains a custom component marker
    const text = childArray.join('');
    
    // Handle Banner component
    if (typeof text === 'string' && text.startsWith(':::banner')) {
      const match = text.match(/:::banner\s*(?:\{([^}]*)\})?\s*(.*)/);
      if (match) {
        const [, options, content] = match;
        let params: BannerProps = { text: content };
        
        if (options) {
          options.split(',').forEach(option => {
            const [key, value] = option.trim().split('=');
            if (key && value) {
              const trimmedKey = key.trim();
              if (trimmedKey in params) {
                if (trimmedKey in params) {
                    (params as any)[trimmedKey] = value.trim();
                }
              }
            }
          });
        }
        
        return <Banner {...params} />;
      }
    }
    
    // Check if this paragraph contains an image
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
    
    // Handle lead paragraph (first paragraph after heading)
    if (typeof children === 'string' && children.startsWith('>> ')) {
      return <p className="lead-paragraph">{children.substring(3)}</p>;
    }
    
    // Regular paragraph with no images - render normally
    return <p {...props}>{children}</p>;
  },
  
  // Custom image handling with our ZoomableImage component
  img: ({ src, alt, ...props }) => {
    if (!src) return <AsciiArtPlaceholder className="mx-auto my-4" height="250px" />;
    
    // Parse options from alt text (e.g., ![description|size=medium|align=center|effect=glow|caption=My caption](image.jpg))
    let imageSize = 'medium';
    let imageAlign = 'center';
    let imageEffect = 'none';
    let imageBorder = 'none';
    let imageCaption = '';
    let altText = alt || '';
    let isZoomable = true;
    
    if (alt && alt.includes('|')) {
      const parts = alt.split('|');
      altText = parts[0].trim();
      
      parts.slice(1).forEach(part => {
        const [key, value] = part.includes('=') ? part.split('=') : [part.trim(), 'true'];
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        
        if (trimmedKey === 'size' && ['small', 'medium', 'large', 'full'].includes(trimmedValue)) {
          imageSize = trimmedValue;
        }
        if (trimmedKey === 'align' && ['left', 'center', 'right'].includes(trimmedValue)) {
          imageAlign = trimmedValue;
        }
        if (trimmedKey === 'effect' && ['shadow', 'border', 'glow', 'glitch', 'none'].includes(trimmedValue)) {
          imageEffect = trimmedValue;
        }
        if (trimmedKey === 'border' && ['simple', 'gradient', 'glow', 'inset', 'dashed', 'none'].includes(trimmedValue)) {
          imageBorder = trimmedValue;
        }
        if (trimmedKey === 'caption') {
          imageCaption = trimmedValue;
        }
        if (trimmedKey === 'zoomable') {
          isZoomable = trimmedValue !== 'false';
        }
      });
    }
    
    // Use our ZoomableImage component
    return (
      <ZoomableImage 
        src={src} 
        alt={altText}
        caption={imageCaption} 
        size={imageSize as 'small' | 'medium' | 'large' | 'full'}
        align={imageAlign as 'left' | 'center' | 'right'}
        effect={imageEffect as 'shadow' | 'border' | 'glow' | 'glitch' | 'none'}
        border={imageBorder as 'simple' | 'gradient' | 'glow' | 'inset' | 'dashed' | 'none'}
        zoomable={isZoomable}
      />
    );
  },
  
  // Add syntax highlighting for code blocks
  code: ({ className, children, ...props }: CodeProps) => {
    // Check if this is a code block with a language specified
    const match = /language-(\w+)/.exec(className || '');
    const isInline = !match;
    
    // For code blocks with language specification
    if (!isInline && match) {
      return (
        <div className="code-block-wrapper">
          <div className="code-block-header">
            <span className="code-language">{match[1]}</span>
            <button className="code-copy-button" onClick={() => {
              navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
            }}>
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            style={coldarkDark}
            language={match[1]}
            PreTag="div"
            className="rounded-md my-6"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    }
    
    // For inline code
    return (
      <code className="px-1.5 py-0.5 bg-bg-tertiary text-accent-primary rounded font-mono text-sm" {...props}>
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
    
    // Check if this is a styled quote (begins with *)
    const isQuote = childArray.length > 0 && 
                   React.isValidElement(childArray[0]) && 
                   typeof childArray[0].props.children === 'string' && 
                   childArray[0].props.children.startsWith('*') && 
                   childArray[0].props.children.endsWith('*');
    
    // Render different blockquote styles based on type
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
      
      const icons: {[key: string]: string} = {
        note: "ℹ️",
        warning: "⚠️",
        tip: "💡",
        alert: "🚨"
      };
      
      return (
        <div className={`${styles[calloutType]} p-4 rounded-md my-6`}>
          <h4 className={`font-bold ${titleColors[calloutType]} mb-2 capitalize flex items-center`}>
            <span className="mr-2">{icons[calloutType]}</span>
            {calloutType}
          </h4>
          <div className="text-text-secondary">{contentChildren}</div>
        </div>
      );
    }
    
    // Styled quote (with a more elegant design)
    else if (isQuote) {
      const quoteText = String(React.isValidElement(childArray[0]) ? childArray[0].props.children : '')
        .slice(1, -1).trim(); // Remove * characters
      
      return (
        <blockquote className="styled-quote my-8">
          <div className="quote-content">{quoteText}</div>
          {childArray.length > 1 && (
            <div className="quote-attribution">
              {childArray.slice(1)}
            </div>
          )}
        </blockquote>
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
  
  // Enhanced headings with anchor links and proper styling
  h1: ({ children, ...props }) => (
    <h1 
      className="text-2xl md:text-3xl font-bold mt-8 mb-4 pb-2 border-b border-accent-primary/20 text-accent-primary"
      {...props}
    >
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }) => (
    <h2 
      className="text-xl md:text-2xl font-bold mt-6 mb-3 text-accent-secondary"
      {...props}
    >
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }) => (
    <h3 
      className="text-lg md:text-xl font-semibold mt-5 mb-3 text-text-primary"
      {...props}
    >
      {children}
    </h3>
  ),
  
  h4: ({ children, ...props }) => (
    <h4 
      className="text-base md:text-lg font-semibold mt-4 mb-2 text-text-primary"
      {...props}
    >
      {children}
    </h4>
  ),
  
  // Enhanced link styling
  a: ({ children, href, ...props }) => (
    <a 
      href={href} 
      className="text-accent-primary hover:text-accent-highlight underline decoration-accent-primary/30 hover:decoration-accent-highlight/50 transition-colors duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  
  // Styled horizontal rule
  hr: () => (
    <hr className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
  ),
  
  // Enhanced list styling
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-text-secondary" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-text-secondary" {...props}>
      {children}
    </ol>
  ),
  
  // Custom component handling
  div: ({ children, ...props }) => {
    // Handle ImageGrid component
    if (props.className === 'image-grid') {
      const columns = (props as { 'data-columns'?: string })['data-columns'] || 2;
      return <ImageGrid columns={Number(columns)}>{children}</ImageGrid>;
    }
    
    // Regular div
    return <div {...props}>{children}</div>;
  },
  
  // // Math formula rendering via KaTeX
  // math: ({ value }: { value: string }) => {
  //   return <div className="math math-display">{value}</div>;
  // },
  
  // inlineMath: ({ value }: { value: string }) => {
  //   return <span className="math math-inline">{value}</span>;
  // },
};

/**
 * CustomMarkdownRenderer - A React component that enhances Markdown rendering
 */
export function CustomMarkdownRenderer({ children, className="" }: CustomReactMarkdownProps) {
    // Parse for ImageGrid components
    const processContent = (content: string) => {
      // Replace ImageGrid tags with div elements that can be processed by our custom renderer
      return content.replace(
        /<ImageGrid\s*columns=(\d+)>([\s\S]*?)<\/ImageGrid>/g, 
        (_, columns, innerContent) => `<div class="image-grid" data-columns="${columns}">${innerContent}</div>`
      );
    };
    
    const processedContent = processContent(children);
    
    return (
      <div className={`blog-content ${className}`}>
        <ReactMarkdown
          components={markdownComponents}
          rehypePlugins={[
            rehypeSlug, // Adds id attributes to headings
            [rehypeAutolinkHeadings, { behavior: 'wrap' }], // Makes headings linkable
            rehypeKatex, // Renders KaTeX math formulas
          ]}
          remarkPlugins={[
            remarkGfm, // GitHub Flavored Markdown support
            remarkUnwrapImages, // Critical plugin to remove p tags around images
            remarkMath, // Math formula parsing
          ]}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    );
}