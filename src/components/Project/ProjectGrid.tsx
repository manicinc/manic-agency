'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { ExternalLink, Github, Search, Filter, X, Code } from 'lucide-react';
import { AsciiArtPlaceholder } from '@/lib/asciiPlaceholders';

interface ProjectGridProps {
  projects: Project[];
  categories?: string[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects,
  categories = []
}) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isShowingFilters, setIsShowingFilters] = useState(false);
  
  // Extract all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags || []))
  ).sort();
  
  // Update filtered projects when filter or search changes
  useEffect(() => {
    let result = [...projects];
    
    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(project => {
        // Check if it's a category filter
        if (categories.includes(filter)) {
          return project.category === filter;
        }
        // Else it's a tag filter
        return project.tags.includes(filter);
      });
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies?.some(tech => tech.toLowerCase().includes(query)) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(result);
  }, [filter, searchQuery, projects, categories]);
  
  // Clear filters
  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="space-y-8">
      {/* Filter & Search Section */}
      <div className="sticky top-4 z-20 bg-bg-secondary/80 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-accent-primary/20">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full py-2 px-4 pl-10 bg-bg-tertiary text-text-primary rounded-md border border-accent-primary/30 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-accent-primary"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          {/* Filter toggle */}
          <button
            onClick={() => setIsShowingFilters(!isShowingFilters)}
            className="flex items-center gap-2 py-2 px-4 bg-bg-tertiary text-text-primary rounded-md border border-accent-primary/30 hover:bg-bg-primary transition-colors"
          >
            <Filter size={16} />
            <span>Filter</span>
            {filter !== 'all' && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-accent-primary text-white rounded-full">1</span>
            )}
          </button>
          
          {/* Clear filters button (only shown when filters are active) */}
          {(filter !== 'all' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 py-2 px-4 bg-accent-highlight/10 text-accent-highlight rounded-md border border-accent-highlight/30 hover:bg-accent-highlight/20 transition-colors"
            >
              <X size={16} />
              <span>Clear filters</span>
            </button>
          )}
        </div>
        
        {/* Filter options */}
        <AnimatePresence>
          {isShowingFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Category filters */}
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        filter === 'all'
                          ? 'bg-accent-primary text-white'
                          : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          filter === category
                            ? 'bg-accent-primary text-white'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Tag filters */}
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          filter === tag
                            ? 'bg-accent-highlight text-white'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Results summary */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-text-primary">
          {filteredProjects.length === 0
            ? 'No projects found'
            : filteredProjects.length === 1
            ? '1 project found'
            : `${filteredProjects.length} projects found`}
        </h2>
        
        {/* Additional information display */}
        {filter !== 'all' && (
          <div className="text-sm text-text-secondary">
            Filtered by: <span className="font-medium text-accent-primary">{filter}</span>
          </div>
        )}
      </div>
      
      {/* Projects grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="mb-4">
            <X className="inline-block text-accent-highlight" size={48} />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No matching projects</h3>
          <p className="text-text-secondary mb-6">Try adjusting your search or filters to find what you're looking for.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={`${project.category}-${project.slug}`}
                variants={itemVariants}
                layout
                className="group relative bg-bg-secondary rounded-lg overflow-hidden border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10"
              >
                {/* Project card with hover effects */}
                <div className="aspect-video relative overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <AsciiArtPlaceholder 
                        height="100%" 
                      />
                    </div>
                  )}
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Links */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <Link 
                        href={`/projects/${project.category}/${project.slug}`}
                        className="p-2 bg-accent-primary text-white rounded-full hover:bg-accent-highlight transition-colors"
                        aria-label={`View details for ${project.title}`}
                      >
                        <Code size={18} />
                      </Link>
                      
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-bg-secondary text-accent-primary rounded-full hover:bg-bg-primary transition-colors"
                          aria-label={`Visit live demo for ${project.title}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-bg-secondary text-text-primary rounded-full hover:bg-bg-primary transition-colors"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-bg-primary/80 backdrop-blur-sm text-xs font-medium text-accent-primary rounded-md uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
                    <Link href={`/projects/${project.category}/${project.slug}`} className="hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="text-text-secondary mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => setFilter(tag)}
                        className="px-2 py-0.5 text-xs bg-bg-tertiary hover:bg-bg-primary rounded text-text-secondary transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-bg-tertiary rounded text-text-secondary">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-accent-primary/10">
                      <h4 className="text-xs uppercase text-text-muted mb-2 tracking-wider">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-accent-primary/10 text-accent-primary">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-bg-tertiary text-text-secondary">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGrid;