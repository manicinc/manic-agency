"use client";

import React, { useState, useEffect } from 'react';
import { Zap, ZapOff } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  // Initialize with system preference, but use stored preference if available
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Determine icon size based on the size prop
  const iconSizes = {
    sm: { button: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { button: 'w-10 h-10', icon: 'w-5 h-5' },
    lg: { button: 'w-12 h-12', icon: 'w-6 h-6' }
  };

  const { button: buttonSize, icon: iconSize } = iconSizes[size];

  // Initialize theme on mount
  useEffect(() => {
    // Mark component as mounted for SSR handling
    setMounted(true);
    
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
      
      // Store the initial preference
      localStorage.setItem('manic-theme', systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  // Toggle theme with transition effects
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
        if (scanlines && scanlines.parentNode) {
          scanlines.parentNode.removeChild(scanlines);
        }
      }, 1000); // Second half of animation
    }, 1000); // First half of animation
  };

  // If not mounted yet (SSR), render a placeholder of the same size
  if (!mounted) {
    return (
      <div 
        className={`${buttonSize} flex items-center justify-center bg-transparent ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-center ${buttonSize} rounded-md bg-bg-tertiary 
                   border border-accent-primary focus:outline-none transition-all duration-300 
                   theme-toggle relative overflow-hidden`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        disabled={isTransitioning}
      >
        {!isTransitioning ? (
          isDark ? (
            <Zap className={`${iconSize} text-accent-primary`} />
          ) : (
            <ZapOff className={`${iconSize} text-accent-highlight`} />
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
        
        {/* Glow effect on hover */}
        <span className="absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-primary/10 to-accent-highlight/10"></span>
      </button>
      
      {/* Animation during transition */}
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
          animation: digital 2s linear infinite;
          filter: drop-shadow(0 0 10px var(--accent-primary));
        }

        @keyframes digital {
          0% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(90deg);
          }
          50% {
            transform: scale(1.1) rotate(180deg);
          }
          75% {
            transform: scale(1.05) rotate(270deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        .theme-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        /* Enhancing the button with a subtle pulse effect */
        .theme-toggle::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            to right,
            var(--accent-primary),
            var(--accent-highlight),
            var(--accent-primary)
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.7;
          animation: borderPulse 4s linear infinite;
        }
        
        @keyframes borderPulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        
        /* Circuit and scanline effects */
        .circuit-line {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawLine 2s infinite;
        }
        
        @keyframes drawLine {
          0% { stroke-dashoffset: 90; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -90; }
        }
        
        /* Enhanced circuit inner element */
        .circuit-inner {
          animation: pulseGlow 2s infinite alternate;
        }
        
        @keyframes pulseGlow {
          0% { r: 8; stroke-width: 1.5; }
          100% { r: 12; stroke-width: 2.5; }
        }
      `}</style>
    </div>
  );
}