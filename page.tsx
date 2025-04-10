'use client';

import React from 'react';
import { getProjectBySlug, getAllProjects } from '@/lib/getAllProjects';
import { Project } from '@/types/project';
import { Nav } from '@/components/Nav';
import { ProjectDetail } from '@/components/Project/ProjectDetail';
import ThemeToggle from '@/components/Theme/ThemeToggle';
import { notFound } from 'next/navigation';

interface ProjectDetailPageProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailPage({ 
  project, 
  relatedProjects 
}: ProjectDetailPageProps) {
  if (!project) {
    notFound();
  }
  
  return (
    <>
      {/* Header with Nav */}
      <div className="bg-bg-primary">
        <Nav />
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>
      
      <main className="bg-bg-primary text-text-primary min-h-screen py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <ProjectDetail project={project} relatedProjects={relatedProjects} />
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const projects = getAllProjects();
    
    interface ProjectPathParams {
      category: string;
      slug: string;
    }

    const paths = projects.map((project: Project) => ({
      params: {
        category: project.category,
        slug: project.slug,
      },
    }));
    
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }: { params: { category: string, slug: string } }) {
  try {
    const { category, slug } = params;
    const project = getProjectBySlug(category, slug);
    
    if (!project) {
      return {
        notFound: true,
      };
    }
    
    // Get related projects (same category or shared tags, excluding the current project)
    const allProjects = getAllProjects();
    interface RelatedProjectFilterParams {
      slug: string;
      category: string;
      tags: string[];
    }

    const relatedProjects = allProjects
      .filter((p: RelatedProjectFilterParams) => {
        // Don't include the current project
        if (p.slug === slug && p.category === category) return false;
        
        // Include if same category
        if (p.category === project.category) return true;
        
        // Include if shared tags (at least one)
        const sharedTags = p.tags.filter((tag: string) => project.tags.includes(tag));
        return sharedTags.length > 0;
      })
      .slice(0, 3); // Limit to 3 related projects
    
    return {
      props: {
        project,
        relatedProjects,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error fetching project ${params.slug}:`, error);
    return {
      notFound: true,
    };
  }
}