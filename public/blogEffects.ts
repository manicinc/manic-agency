// public/blogEffects.ts - Client-side scripts for blog wonderland effects with TypeScript support

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initReadingProgress();
    initParticles();
    initMushroomCursor();
    initGlitchEffects();
    initScrollAnimations();
    initCopyLink();
  });
  
  // Initialize reading progress indicator
  function initReadingProgress(): void {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
  
  // Initialize wonderland particles
  function initParticles(): void {
    const particlesContainer = document.querySelector('.wonderland-particles');
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 10 + 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 10;
      
      // Apply styles to the HTML element
      const particleEl = particle as HTMLElement;
      particleEl.style.width = `${size}px`;
      particleEl.style.height = `${size}px`;
      particleEl.style.left = `${posX}%`;
      particleEl.style.top = `${posY}%`;
      particleEl.style.animationDelay = `${delay}s`;
      particleEl.style.animationDuration = `${duration}s`;
      
      // Add random color
      const hue = Math.random() * 60 + 240; // Blue to purple range
      const saturation = Math.random() * 40 + 60;
      const lightness = Math.random() * 40 + 60;
      particleEl.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Initialize mushroom cursor
  function initMushroomCursor(): void {
    const cursor = document.querySelector('.mushroom-cursor');
    if (!cursor || !(cursor instanceof HTMLElement)) return;
    
    // Create mushroom SVG
    cursor.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 18C26.6274 18 32 14.4183 32 10C32 5.58172 26.6274 2 20 2C13.3726 2 8 5.58172 8 10C8 14.4183 13.3726 18 20 18Z" fill="#E896FF" />
        <path d="M20 17C25.5228 17 30 13.6421 30 9.5C30 5.35786 25.5228 2 20 2C14.4772 2 10 5.35786 10 9.5C10 13.6421 14.4772 17 20 17Z" fill="#FFB6FF" />
        <path d="M18 38V18H22V38H18Z" fill="#C77EFF" />
        <circle cx="15" cy="8" r="1.5" fill="white" />
        <circle cx="23" cy="10" r="2" fill="white" />
        <circle cx="18" cy="5" r="1" fill="white" />
      </svg>
    `;
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Add/remove active class for links
    // Convert NodeList to Array for TypeScript compatibility
    Array.from(document.querySelectorAll('a, button')).forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }
  
  // Initialize glitch text effects
  function initGlitchEffects(): void {
    const glitchElements = document.querySelectorAll('.blog-title, .blog-entry-title');
    
    // Convert NodeList to Array for TypeScript compatibility
    Array.from(glitchElements).forEach(el => {
      // Add event listeners with properly typed Element
      el.addEventListener('mouseenter', () => {
        el.classList.add('glitch-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        el.classList.remove('glitch-hover');
      });
    });
  }
  
  // Initialize scroll animations
  function initScrollAnimations(): void {
    const animateElements = document.querySelectorAll('.blog-card, .toc-container, .author-bio, .related-posts');
    
    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      Array.from(animateElements).forEach(el => {
        el.classList.add('animate-in');
      });
      return;
    }
    
    // Explicitly type the IntersectionObserver to handle Element targets
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof Element) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each element
    Array.from(animateElements).forEach(el => {
      observer.observe(el);
    });
  }
  
  // Initialize copy link functionality
  function initCopyLink(): void {
    const copyButton = document.querySelector('.copy-link-btn');
    if (!copyButton) return;
    
    copyButton.addEventListener('click', () => {
      // Extract the URL from the button's parent (more reliable than assuming window.location)
      const shareButtons = copyButton.closest('.share-buttons');
      let url = window.location.href;
      
      // Try to find a link with the URL in the share buttons
      if (shareButtons) {
        const links = shareButtons.querySelectorAll('a');
        
        // Convert NodeList to Array for TypeScript
        Array.from(links).forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.includes('url=')) {
            url = decodeURIComponent(href.split('url=')[1].split('&')[0]);
          }
        });
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        // Type assertion since we know copyButton exists
        const button = copyButton as HTMLElement;
        const originalText = button.textContent || 'Copy Link';
        button.textContent = 'Copied!';
        
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  }
  
  // Add support for smooth scrolling to anchors
  document.addEventListener('click', (e) => {
    // Type safety: first check if target is an Element, then cast to HTMLElement
    if (!(e.target instanceof Element)) return;
    
    // Now safely cast to HTMLElement and check if it's an anchor
    const target = e.target as HTMLElement;
    
    // Check if it's an anchor link
    if (target && target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          e.preventDefault();
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    }
  });
  
  // Initialize dark/light mode toggle based on system preference
  function initThemeToggle(): void {
    // Check for system dark mode preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // You could add a theme toggle button and additional logic here
    if (prefersDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    
    // Listen for changes to the preferred color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (e.matches) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
      }
    });
  }
  
  // Interface for shape definitions
  interface ShapeDefinition {
    class: string;
    svg: string;
  }
  
  // Optional: Initialize floating shapes animation
  function initFloatingShapes(): void {
    const container = document.querySelector('.blog-container');
    if (!container) return;
    
    const shapes: ShapeDefinition[] = [
      { class: 'floating-shape mushroom', svg: '<svg viewBox="0 0 40 40"><path d="M20 18C26.6274 18 32 14.4183 32 10C32 5.58172 26.6274 2 20 2C13.3726 2 8 5.58172 8 10C8 14.4183 13.3726 18 20 18Z" fill="#E896FF" /><path d="M18 38V18H22V38H18Z" fill="#C77EFF" /></svg>' },
      { class: 'floating-shape teacup', svg: '<svg viewBox="0 0 40 40"><path d="M30 15a10 10 0 0 0-20 0v5h20v-5z" fill="#9D66FF" /><path d="M8 20h24v3a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8v-3z" fill="#BB8DFF" /><path d="M34 20a4 4 0 0 0 0-8h-4v4h2a2 2 0 1 1 0 4h-2" stroke="#E896FF" stroke-width="2" fill="none" /></svg>' },
      { class: 'floating-shape key', svg: '<svg viewBox="0 0 40 40"><circle cx="12" cy="20" r="8" fill="#BB8DFF" /><rect x="20" y="18" width="16" height="4" fill="#9D66FF" /><rect x="28" y="14" width="4" height="4" fill="#9D66FF" /><rect x="28" y="22" width="4" height="4" fill="#9D66FF" /></svg>' },
      { class: 'floating-shape potion', svg: '<svg viewBox="0 0 40 40"><path d="M16 5h8v6h-8z" fill="#BB8DFF" /><path d="M26 11H14l-4 8v10a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V19l-4-8z" fill="#E896FF" /><circle cx="20" cy="22" r="5" fill="#FFB6FF" /></svg>' }
    ];
    
    // Add 5 random shapes
    for (let i = 0; i < 5; i++) {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const div = document.createElement('div');
      div.className = randomShape.class;
      div.innerHTML = randomShape.svg;
      
      // Random position, speed, and size
      const size = Math.random() * 30 + 20;
      const left = Math.random() * 100;
      const speed = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.left = `${left}%`;
      div.style.animationDuration = `${speed}s`;
      div.style.animationDelay = `${delay}s`;
      
      // Add to page
      document.body.appendChild(div);
    }
  }
  
  // Optional: Call additional initializations
  // initThemeToggle();
  // initFloatingShapes();