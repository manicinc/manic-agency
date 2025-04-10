'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Tag, Users, Trophy, BarChart, ChevronRight, ChevronLeft } from 'lucide-react';
import { AsciiArtPlaceholder } from '@/lib/asciiPlaceholders';
import { Code } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectDetailProps {
  project: Project;
  relatedProjects?: Project[];
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ 
  project,
  relatedProjects = []
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // Combine main image with additional images
  const allImages = [project.image, ...(project.images || [])].filter(Boolean) as string[];
  
  // Calculate project status for display
  const statusColor = {
    completed: 'bg-accent-secondary',
    ongoing: 'bg-accent-alert',
    concept: 'bg-accent-primary'
  }[project.status || 'completed'];
  
  // Calculate dates
  const formattedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  // Helper for next/prev image navigation
  const goToNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const goToPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  // Custom markdown components
  const markdownComponents = {
    code({ node, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const isBlockCode = !!match;

      return isBlockCode ? (
        <SyntaxHighlighter
          style={coldarkDark as any}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="px-1.5 py-0.5 bg-bg-tertiary text-accent-primary rounded" {...props}>
          {children}
        </code>
      );
    },
    img({ src, alt, ...props }: any) {
      return (
        <div className="my-8">
          <img 
            loading="lazy" 
            src={src} 
            alt={alt || ''} 
            className="rounded-md max-w-full mx-auto" 
            {...props} 
          />
          {alt && <p className="text-center text-sm text-text-muted mt-2">{alt}</p>}
        </div>
      );
    },
    h2({ node, children, ...props }: any) {
      return (
        <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-accent-primary" {...props}>
          {children}
        </h2>
      );
    },
    h3({ node, children, ...props }: any) {
      return (
        <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-accent-secondary" {...props}>
          {children}
        </h3>
      );
    },
    p({ node, children, ...props }: any) {
      return (
        <p className="mb-6 text-text-secondary leading-relaxed" {...props}>
          {children}
        </p>
      );
    },
    ul({ node, children, ...props }: any) {
      return (
        <ul className="mb-6 pl-6 list-disc text-text-secondary" {...props}>
          {children}
        </ul>
      );
    },
    ol({ node, children, ...props }: any) {
      return (
        <ol className="mb-6 pl-6 list-decimal text-text-secondary" {...props}>
          {children}
        </ol>
      );
    },
    li({ node, children, ...props }: any) {
      return (
        <li className="mb-2" {...props}>
          {children}
        </li>
      );
    },
    blockquote({ node, children, ...props }: any) {
      return (
        <blockquote 
          className="border-l-4 border-accent-primary pl-4 italic my-6 text-text-secondary" 
          {...props}
        >
          {children}
        </blockquote>
      );
    },
    a({ node, children, href, ...props }: any) {
      return (
        <a 
          href={href} 
          className="text-accent-primary hover:text-accent-highlight hover:underline transition-colors"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <article className="max-w-7xl mx-auto pb-16">
      {/* Page header with ASCII background */}
      <div className="relative overflow-hidden mb-12 rounded-lg">
        <div className="absolute inset-0 -z-10">
          <AsciiArtPlaceholder 
            height="100%" 
          />
        </div>
        
        <div className="relative pt-20 pb-20 px-6 md:px-12 bg-gradient-to-b from-bg-primary/80 to-bg-primary/95 backdrop-blur-sm">
          {/* Back link */}
          <Link 
            href="/projects" 
            className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all projects
          </Link>
          
          {/* Project title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.title}
          </motion.h1>
          
          {/* Project meta */}
          <motion.div 
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-text-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Date */}
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-accent-primary" />
              <span>{formattedDate(project.date)}</span>
            </div>
            
            {/* Category */}
            <div className="flex items-center">
              <Tag size={16} className="mr-2 text-accent-primary" />
              <Link 
                href={`/projects?category=${project.category}`}
                className="hover:text-accent-primary transition-colors"
              >
                {project.category}
              </Link>
            </div>
            
            {/* Status */}
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusColor}`}></span>
              <span className="capitalize">{project.status || 'Completed'}</span>
            </div>
          </motion.div>
          
          {/* Tags */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {project.tags.map((tag, index) => (
              <Link 
                key={index}
                href={`/projects?tag=${tag}`}
                className="px-3 py-1 bg-bg-tertiary/50 backdrop-blur-sm hover:bg-bg-tertiary rounded-full text-sm text-text-secondary hover:text-accent-primary transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </motion.div>
          
          {/* Action buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors flex items-center gap-2"
              >
                <ExternalLink size={18} />
                View Live Project
              </a>
            )}
            
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-text-secondary text-text-secondary hover:border-accent-primary hover:text-accent-primary rounded-md transition-colors flex items-center gap-2"
              >
                <Github size={18} />
                Source Code
              </a>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 sm:px-6">
        {/* Main column */}
        <div className="lg:col-span-2">
          {/* Main content area */}
          <div className="space-y-6">
            {/* Project images gallery */}
            {allImages.length > 0 && (
              <div className="mb-10 rounded-lg overflow-hidden bg-bg-secondary border border-accent-primary/20">
                <div className="relative aspect-video">
                  <img 
                    src={allImages[activeImageIndex]} 
                    alt={`${project.title} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Image navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-primary/50 backdrop-blur-sm text-text-primary hover:bg-accent-primary/20 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      <button
                        onClick={goToNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-primary/50 backdrop-blur-sm text-text-primary hover:bg-accent-primary/20 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  
                  {/* Image counter */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-bg-primary/70 backdrop-blur-sm rounded-full text-sm text-text-secondary">
                      {activeImageIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          activeImageIndex === index 
                            ? 'border-accent-primary scale-105' 
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover object-center"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Project long description or content */}
            <div className="prose prose-lg max-w-none">
              {project.content ? (
                <ReactMarkdown 
                  components={markdownComponents}
                  rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
                  remarkPlugins={[remarkGfm]}
                >
                  {project.content}
                </ReactMarkdown>
              ) : (
                <div className="text-text-secondary leading-relaxed">
                  <p>{project.longDescription || project.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            {/* Project details card */}
            <div className="bg-bg-secondary rounded-lg p-6 border border-accent-primary/20">
              <h2 className="text-xl font-bold text-text-primary mb-4">Project Details</h2>
              
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-text-muted mb-3 tracking-wider flex items-center">
                    <Code className="mr-2" size={16} />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-bg-tertiary text-text-secondary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Team members */}
              {project.team && project.team.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-text-muted mb-3 tracking-wider flex items-center">
                    <Users className="mr-2" size={16} />
                    Team
                  </h3>
                  <ul className="space-y-2">
                    {project.team.map((member, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center mr-3 text-accent-primary">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">
                            {member.link ? (
                              <a 
                                href={member.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent-primary transition-colors"
                              >
                                {member.name}
                              </a>
                            ) : (
                              member.name
                            )}
                          </div>
                          {member.role && (
                            <div className="text-sm text-text-secondary">{member.role}</div>
                          )}
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
                )}  
                    
                    {/* Project stats */}
                    <div className="mb-6">
                      <h3 className="text-sm uppercase text-text-muted mb-3 tracking-wider flex items-center">
                        <BarChart className="mr-2" size={16} />
                        Stats
                      </h3>
                      <ul className="space-y-2">
                        {project.stats && Object.entries(project.stats).map(([key, value], index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="text-text-secondary">{key}</span>
                            <span className="font-medium text-text-primary">{value.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </div>
                        
                        {/* Related projects */}
                        {relatedProjects.length > 0 && (
                          <div className="bg-bg-secondary rounded-lg p-6 border border-accent-primary/20">
                            <h2 className="text-xl font-bold text-text-primary mb-4">Related Projects</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {relatedProjects.map((relatedProject, index) => (
                                <Link 
                                  key={index} 
                                  href={`/projects/${relatedProject.category}/${relatedProject.slug}`}
                                  className="flex flex-col bg-bg-tertiary rounded-lg p-4 hover:bg-bg-tertiary/50 transition-colors"
                                >
                                  <img 
                                    src={relatedProject.image} 
                                    alt={relatedProject.title} 
                                    className="rounded-lg mb-4"
                                  />
                                  <h3 className="text-lg font-semibold text-text-primary">{relatedProject.title}</h3>
                                  <p className="text-sm text-text-secondary">{relatedProject.description}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                </div>
            </div>
        </article>
    );
}
