'use client';

import React from 'react';
import { Nav } from '@/components/Nav';
import ProjectCarousel from '@/components/Project/ProjectCarousel';
import ProjectGrid from '@/components/Project/ProjectGrid';
import ThemeToggle from '@/components/Theme/ThemeToggle';
import { getFeaturedProjects, getAllProjects, getProjectCategories } from '@/lib/getAllProjects';
import { Project } from '@/types/project';

interface ProjectsPageProps {
  allProjects: Project[];
  featuredProjects: Project[];
  categories: string[];
}

export default function ProjectsPage({ 
  allProjects = [], 
  featuredProjects = [],
  categories = []
}: ProjectsPageProps) {
  return (
    <>
      {/* Header with Nav */}
      <div className="bg-bg-primary">
        <Nav />
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>
      
      <main className="bg-bg-primary text-text-primary min-h-screen">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
                <span className="relative z-10">Our Work</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent-primary opacity-20 rounded"></span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-12">
                Experimental projects combining AI, creative coding, and emerging technologies
              </p>
            </div>
            
            {/* Featured Projects Carousel */}
            {featuredProjects.length > 0 && (
              <div className="mb-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Featured Projects
                </h2>
                <ProjectCarousel projects={featuredProjects} />
              </div>
            )}
            
            {/* All Projects Grid */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Explore All Projects
              </h2>
              <ProjectGrid projects={allProjects} categories={categories} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const allProjects = getAllProjects();
    const featuredProjects = getFeaturedProjects(3);
    const categories = getProjectCategories();
    
    return {
      props: {
        allProjects,
        featuredProjects,
        categories,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      props: {
        allProjects: [],
        featuredProjects: [],
        categories: [],
      },
      // Revalidate more frequently if there was an error
      revalidate: 600,
    };
  }
}