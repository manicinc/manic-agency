'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { AsciiArtPlaceholder } from '@/lib/asciiPlaceholders';
import { Project } from '@/types/project';

interface ProjectCarouselProps {
  projects: Project[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  autoplay = true,
  autoplayInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalProjects = projects.length;
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set new timer
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalProjects);
    }, autoplayInterval);
    
    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeIndex, autoplay, autoplayInterval, isPaused, totalProjects]);
  
  // Navigation handlers
  const goToPrevious = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
  };
  
  const goToNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalProjects);
  };
  
  const goToSlide = (index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };
  
  // Exit early if no projects
  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-bg-secondary rounded-lg">
        <p className="text-text-muted">No featured projects available</p>
      </div>
    );
  }
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };
  
  const currentProject = projects[activeIndex];
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-bg-secondary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel container */}
      <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
        {/* Background layer with ASCII art */}
        <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
          <AsciiArtPlaceholder 
            height="100%" 
          />
        </div>
        
        {/* Image and content container */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0 z-10 flex flex-col md:flex-row"
          >
            {/* Project image */}
            <div className="w-full md:w-1/2 relative overflow-hidden md:flex md:items-center">
              {currentProject.image ? (
                <div className="relative aspect-video md:aspect-auto md:h-full">
                  {/* Add slight visual distortion effect on hover */}
                  <div className="group absolute inset-0 overflow-hidden">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/70 to-transparent md:bg-gradient-to-l md:from-transparent md:to-bg-primary/70"></div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-bg-tertiary">
                  <span className="text-text-muted">No image available</span>
                </div>
              )}
            </div>
            
            {/* Project content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <div className="space-y-4">
                {/* Category badge */}
                <div className="inline-block">
                  <span className="px-3 py-1 bg-bg-tertiary rounded-full text-xs font-medium text-accent-primary uppercase tracking-wide">
                    {currentProject.category}
                  </span>
                </div>
                
                {/* Title with staggered entrance */}
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {currentProject.title}
                </motion.h2>
                
                {/* Description */}
                <motion.p 
                  className="text-text-secondary text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {currentProject.description}
                </motion.p>
                
                {/* Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {currentProject.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs bg-bg-tertiary rounded text-text-secondary"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
                
                {/* Action buttons */}
                <motion.div 
                  className="flex flex-wrap gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Link 
                    href={`/projects/${currentProject.category}/${currentProject.slug}`}
                    className="px-5 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors flex items-center gap-2"
                  >
                    View Details
                  </Link>
                  
                  {currentProject.link && (
                    <a 
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-accent-primary text-accent-primary rounded-md hover:bg-accent-primary/10 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  
                  {currentProject.github && (
                    <a 
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-text-secondary text-text-secondary rounded-md hover:bg-bg-tertiary transition-colors flex items-center gap-2"
                    >
                      <Github size={16} />
                      Repository
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-bg-primary/50 backdrop-blur-sm text-text-primary hover:bg-accent-primary/20 transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-bg-primary/50 backdrop-blur-sm text-text-primary hover:bg-accent-primary/20 transition-colors"
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-4 gap-2 pb-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-accent-primary w-6' 
                : 'bg-text-muted/30 hover:bg-text-muted/50'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;