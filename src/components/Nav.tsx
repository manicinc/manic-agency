"use client"; // <--- MUST HAVE THIS
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './Theme/ThemeToggle';
import { Menu, X, ChevronDown, Rabbit } from 'lucide-react';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for nav appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    setMounted(true);
    
    // Randomly glitch the logo text
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);
  
  // Menu toggle function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Check if a path is active
interface IsActivePathProps {
    path: string;
}

const isActivePath = (path: IsActivePathProps['path']): boolean => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path) || false;
};
  
  // Create a rabbit icon SVG component
  const RabbitIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rabbit-icon">
      <path d="M12,7 C13,6 15,8 14,10 L14.5,12 C15,12 15.5,13 14,14 L13.5,17 C13.5,18 10.5,18 10.5,17 L10,14 C8.5,13 9,12 9.5,12 L10,10 C9,8 11,6 12,7 Z" />
      <path d="M8,22 C6,19 6,15 8,12" strokeDasharray="12" strokeDashoffset="12" className="rabbit-ear-left" />
      <path d="M16,22 C18,19 18,15 16,12" strokeDasharray="12" strokeDashoffset="12" className="rabbit-ear-right" />
    </svg>
  );
  
  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'py-2 nav-scrolled' : 'py-4'
      } ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center justify-between relative">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-2">
             {/* --- MODIFIED LOGO STRUCTURE --- */}
            <a 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 glitch uppercase hover:opacity-80 transition-opacity" 
                href="/"
                aria-label="Manic Agency Home" // Added aria-label
                >
                manic <br/> Agency 
            </a>
             {/* --- END MODIFIED LOGO STRUCTURE --- */}

            <span className="hidden md:inline-block h-6 w-px bg-accent-primary opacity-30 mx-2"></span>
            <p className="hidden md:block text-xs text-text-secondary max-w-md">
               Intersection of reality, mixed reality, web3, and the emerging metaverse
            </p>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="/#services" 
              className={`nav-link ${isActivePath('/#services') ? 'nav-active' : ''}`}
            >
              Services
              <span className="nav-link-indicator"></span>
            </a>
            <a 
              href="/projects" 
              className={`nav-link ${isActivePath('/projects') ? 'nav-active' : ''}`}
            >
              Projects
              <span className="nav-link-indicator"></span>
            </a>
            <a 
              href="/team" 
              className={`nav-link ${isActivePath('/team') ? 'nav-active' : ''}`}
            >
              Maniacs
              <span className="nav-link-indicator"></span>
            </a>
            <a 
              href="/blog" 
              className={`nav-link ${isActivePath('/blog') ? 'nav-active' : ''}`}
            >
              Blog
              <span className="nav-link-indicator"></span>
            </a>
            <a 
              href="/open-source" 
              className={`nav-link ${isActivePath('/open-source') ? 'nav-active' : ''}`}
            >
              Open-Source
              <span className="nav-link-indicator"></span>
            </a>
            
            {/* Contact Button with Glow Effect */}
            <Link
              href="/contact"
              className="contact-btn inline-block px-8 py-3 text-black font-mono text-lg tracking-wider uppercase bg-[#0ff] rounded-md transition duration-300 hover:bg-[#0cc] shadow-[4px_4px_0_#f0f,8px_8px_0_#00f] hover:shadow-[2px_2px_0_#f0f,4px_4px_0_#00f] relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#0ff] via-[#0ff] to-[#0cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -inset-x-1 bottom-0 h-1 bg-gradient-to-r from-[#f0f] to-[#00f] contact-btn-line"></span>
            </Link>
            
            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle size="md" />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle size="sm" />
            
            <button 
              onClick={toggleMenu}
              className="mobile-menu-btn text-text-primary focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <div className={`mobile-menu md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 pb-2 mobile-menu-content">
            <div className="flex flex-col space-y-4">
              <a href="/#services" className="mobile-nav-link">Services</a>
              <a href="/projects" className="mobile-nav-link">Projects</a>
              <a href="/team" className="mobile-nav-link">Maniacs</a>
              <a href="/blog" className="mobile-nav-link">Blog</a>
              <a href="/open-source" className="mobile-nav-link">Open-Source</a>
              
              <Link
                href="/contact"
                className="self-start inline-block px-8 py-3 text-black font-mono text-lg tracking-wider uppercase bg-[#0ff] rounded-md transition duration-300 hover:bg-[#0cc] shadow-[4px_4px_0_#f0f,8px_8px_0_#00f] hover:shadow-[2px_2px_0_#f0f,4px_4px_0_#00f]"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-6 text-xs text-text-secondary border-t border-accent-primary border-opacity-20 pt-4">
              We are a group of web developers, digital marketers, machine learning / AI engineers, product designers, game designers, and legal specialists, working at the intersection of reality, mixed reality, web3, and the emerging metaverse.
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative rabbit icon in fixed position */}
      <div className="absolute top-1/2 right-2 -translate-y-1/2 hidden md:block opacity-20 hover:opacity-50 transition-opacity">
        <RabbitIcon />
      </div>
      
      {/* Navigation underline effect */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-px nav-underline"></div>
      )}
      
      {/* CSS for navigation animations */}
      <style jsx>{`
        /* Logo glitch effect */
        .logo-glitch {
          position: relative;
          animation: textGlitch 0.2s linear 3;
        }
        
        @keyframes textGlitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }
        
        .logo-text-1, .logo-text-2 {
          position: relative;
        }
        
        .logo-text-1::before, .logo-text-2::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          color: transparent;
          background-image: linear-gradient(to right, #0ff, #f0f);
          background-clip: text;
          filter: blur(3px);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .logo-glitch .logo-text-1::before, 
        .logo-glitch .logo-text-2::before {
          opacity: 0.7;
          animation: textSplit 0.2s linear infinite alternate-reverse;
        }
        
        @keyframes textSplit {
          0% { transform: translate(-2px, 0); }
          100% { transform: translate(2px, 0); }
        }
        
        /* Navigation links effect */
        .nav-link {
          position: relative;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        
        .nav-link:hover, .nav-active {
          color: var(--accent-primary);
        }
        
        .nav-link-indicator {
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            var(--accent-primary), 
            var(--accent-highlight)
          );
          transition: width 0.3s ease;
          opacity: 0;
        }
        
        .nav-link:hover .nav-link-indicator,
        .nav-active .nav-link-indicator {
          width: 100%;
          opacity: 1;
        }
        
        /* Mobile menu links */
        .mobile-nav-link {
          color: var(--text-primary);
          font-weight: 500;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 1rem;
          border-left: 2px solid transparent;
        }
        
        .mobile-nav-link:hover {
          color: var(--accent-primary);
          padding-left: 1.5rem;
          border-left: 2px solid var(--accent-primary);
        }
        
        /* Contact button animation */
        .contact-btn-line {
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .contact-btn:hover .contact-btn-line {
          transform: scaleX(1);
        }
        
        /* Navigation underline effect */
        .nav-underline {
          background: linear-gradient(90deg, 
            transparent, 
            var(--accent-primary), 
            var(--accent-highlight), 
            var(--accent-primary), 
            transparent
          );
          opacity: 0.5;
        }
        
        /* Scrolled navigation state */
        .nav-scrolled {
          background-color: rgba(var(--bg-primary-rgb), 0.8);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(var(--accent-primary-rgb), 0.1);
        }
        
        /* Mobile menu button */
        .mobile-menu-btn {
          position: relative;
          z-index: 20;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(var(--bg-tertiary-rgb), 0.5);
          transition: all 0.3s ease;
        }
        
        .mobile-menu-btn:hover {
          background: rgba(var(--accent-primary-rgb), 0.2);
        }
        
        /* Rabbit icon animation */
        .rabbit-icon {
          fill: none;
          transition: all 0.3s ease;
        }
        
        .rabbit-ear-left, .rabbit-ear-right {
          animation: drawEars 2s linear forwards;
          animation-delay: 1s;
        }
        
        @keyframes drawEars {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        :global(:root) {
          --bg-primary-rgb: 10, 11, 19;
          --accent-primary-rgb: 127, 90, 240;
        }
        
        :global(.light) {
          --bg-primary-rgb: 255, 255, 254;
          --accent-primary-rgb: 98, 70, 234;
        }
      `}</style>
    </div>
  );
};

export default Nav;