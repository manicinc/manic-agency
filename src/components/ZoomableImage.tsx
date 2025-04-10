// src/components/ZoomableImage.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
}

export default function ZoomableImage({ src, alt = '', caption, className = '' }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle opening the zoom view
  const openZoom = () => {
    setIsZoomed(true);
    // Prevent body scrolling when zoomed
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the zoom view
  const closeZoom = () => {
    setIsZoomed(false);
    document.body.style.overflow = '';
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isZoomed && e.key === 'Escape') {
        closeZoom();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isZoomed]);

  // Add modal to document body to avoid z-index issues
  useEffect(() => {
    if (isZoomed) {
      const modal = document.createElement('div');
      modal.className = `image-zoom-overlay ${isZoomed ? 'active' : ''}`;
      modal.innerHTML = `
        <div class="image-zoom-container">
          <img src="${src}" alt="${alt}" class="image-zoom-img" />
          ${caption ? `<div class="image-zoom-caption">${caption}</div>` : ''}
        </div>
        <button class="image-zoom-close">&times;</button>
      `;
      
      document.body.appendChild(modal);
      
      // Add click handler to close on background click
      modal.addEventListener('click', (e) => {
        if (e.target === modal || (e.target as HTMLElement).classList.contains('image-zoom-close')) {
          closeZoom();
        }
      });
      
      // Prevent propagation from image clicks
      const imgContainer = modal.querySelector('.image-zoom-container');
      if (imgContainer) {
        imgContainer.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
      
      return () => {
        document.body.removeChild(modal);
      };
    }
  }, [isZoomed, src, alt, caption]);

  return (
    <img
      src={src}
      alt={alt}
      className={`image-zoomable ${className}`}
      onClick={openZoom}
      loading="lazy"
    />
  );
}