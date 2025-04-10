"use client";

import React, { useState, useEffect } from 'react';
import { ZapOff, Zap } from 'lucide-react';

export default function ThemeToggle() {
  // Initialize with system preference, but use stored preference if available
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('manic-theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
      document.documentElement.classList.toggle('light', storedTheme === 'light');
    } else {
      // If no stored preference, use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
      document.documentElement.classList.toggle('light', !systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Add transition class to body and scan lines element
    document.body.classList.add('theme-transitioning');
    
    // Create scanlines element if it doesn't exist
    if (!document.querySelector('.scanlines')) {
      const scanlines = document.createElement('div');
      scanlines.className = 'scanlines';
      document.body.appendChild(scanlines);
    }
    
    // Wait for the transition animation to reach halfway
    setTimeout(() => {
      // Toggle theme
      setIsDark(!isDark);
      
      // Update DOM
      document.documentElement.classList.toggle('dark', !isDark);
      document.documentElement.classList.toggle('light', isDark);
      
      // Store preference
      localStorage.setItem('manic-theme', !isDark ? 'dark' : 'light');
      
      // Wait for the second half of the animation
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.classList.remove('theme-transitioning');
        
        // Remove scanlines element
        const scanlines = document.querySelector('.scanlines');
        if (scanlines) scanlines.remove();
      }, 1000); // Second half of animation
    }, 1000); // First half of animation
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-md bg-bg-secondary border border-accent-primary focus:outline-none transition-all duration-300 theme-toggle"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        disabled={isTransitioning}
      >
        {!isTransitioning ? (
          isDark ? (
            <Zap className="w-5 h-5 text-accent-secondary" />
          ) : (
            <ZapOff className="w-5 h-5 text-accent-highlight" />
          )
        ) : (
          <div className="circuit-loader">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="circuit-path" d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path className="circuit-path" d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5"/>
              <path className="circuit-path" d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5"/>
              <path className="circuit-path" d="M12 2V22" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        )}
      </button>
      
      {/* Overlay that covers the whole page during transition */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="digital-transition">
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="circuit-circle" />
              <path d="M50 5 L50 95" stroke="currentColor" strokeWidth="2" className="circuit-line" />
              <path d="M5 50 L95 50" stroke="currentColor" strokeWidth="2" className="circuit-line" />
              <path d="M26 26 L74 74" stroke="currentColor" strokeWidth="2" className="circuit-line" />
              <path d="M26 74 L74 26" stroke="currentColor" strokeWidth="2" className="circuit-line" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" className="circuit-inner" />
            </svg>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .circuit-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }
        
        .circuit-path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: circuit 2s infinite linear;
        }
        
        .circuit-path:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        .circuit-path:nth-child(3) {
          animation-delay: 1s;
        }
        
        .circuit-path:nth-child(4) {
          animation-delay: 1.5s;
        }

        @keyframes circuit {
          0% {
            stroke-dashoffset: 60;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }


        .circuit-circle {
          animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .digital-transition {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .digital-transition svg {
          width: 100px;
          height: 100px;
          animation: digital 1s linear infinite;
        }

        @keyframes digital {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .theme-transitioning {
          overflow: hidden;
        }

        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: linear-gradient(
            rgba(255, 255, 255, 0.1) 50%,
            rgba(0, 0, 0, 0.1) 50%
          );
          background-size: 100% 4px;
          animation: scanlines 0.5s linear infinite;
        }

        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        .theme-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        `}</style>

    </div>
    );
}