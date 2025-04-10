'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageRendererProps {
  src: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  align?: 'left' | 'center' | 'right';
  effect?: 'shadow' | 'border' | 'glow' | 'glitch' | 'none';
  className?: string;
  caption?: string;
  onClick?: () => void;
}

export default function ImageRenderer({
  src,
  alt = '',
  size = 'medium',
  align = 'center',
  effect = 'none',
  className = '',
  caption,
  onClick,
}: ImageRendererProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate CSS classes based on props
  const sizeClass = `image-${size}`;
  const alignClass = `image-${align}`;
  const effectClass = effect !== 'none' ? `image-${effect}` : '';
  
  const combinedClasses = `content-image ${sizeClass} ${alignClass} ${effectClass} ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`;
  
  // Handle image loading and errors
  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };
  
  return (
    <figure className={`image-with-caption ${alignClass}`}>
      {/* Image placeholder while loading */}
      {!isLoaded && !error && (
        <div 
          className={`animate-pulse bg-bg-tertiary rounded-md ${sizeClass} w-full`}
          style={{ aspectRatio: '16/9' }}
        />
      )}
      
      {/* Error state */}
      {error && (
        <div className={`flex items-center justify-center bg-bg-tertiary text-text-muted rounded-md ${sizeClass}`} style={{ aspectRatio: '16/9' }}>
          <span>Failed to load image</span>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt || caption || 'Image'}
        className={combinedClasses}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
      
      {/* Optional caption */}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// Image Grid component for displaying multiple images in a grid
interface ImageGridProps {
  images: {
    src: string;
    alt?: string;
    caption?: string;
  }[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ImageGrid({ images, columns = 3, className = '' }: ImageGridProps) {
  const gridClass = `grid-cols-1 sm:grid-cols-2 ${columns >= 3 ? 'md:grid-cols-3' : ''} ${columns === 4 ? 'lg:grid-cols-4' : ''}`;
  
  return (
    <div className={`image-grid ${gridClass} ${className}`}>
      {images.map((image, index) => (
        <figure key={index} className="image-with-caption">
          <img
            src={image.src}
            alt={image.alt || image.caption || `Grid image ${index + 1}`}
            className="content-image"
            loading="lazy"
          />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

// Image with zoom/lightbox functionality
export function ZoomableImage({ src, alt, size = 'medium', align = 'center', caption }: ImageRendererProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  
  const toggleZoom = () => setIsZoomed(!isZoomed);
  
  return (
    <>
      <ImageRenderer
        src={src}
        alt={alt}
        size={size}
        align={align}
        caption={caption}
        onClick={toggleZoom}
        className="hover:cursor-zoom-in"
      />
      
      {/* Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-bg-primary/90 backdrop-blur-md flex items-center justify-center"
          onClick={toggleZoom}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={src}
              alt={alt || caption || 'Zoomed image'}
              className="max-w-full max-h-[90vh] object-contain"
            />
            {caption && (
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-bg-primary/80 text-text-primary text-center">
                {caption}
              </figcaption>
            )}
          </div>
          <button
            className="absolute top-4 right-4 text-4xl text-text-primary hover:text-accent-primary"
            onClick={toggleZoom}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}