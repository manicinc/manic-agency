import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/getAllProjects';
import { Project } from '@/types/project';
import { Nav } from '@/components/Nav';
import { ProjectDetail } from '@/components/Project/ProjectDetail';
import ThemeToggle from '@/components/Theme/ThemeToggle';

// For static site generation with Next.js
export async function generateStaticParams() {
  try {
    const projects = getAllProjects();
    
    return projects.map((project) => ({
      params: {
        category: project.category,
        slug: project.slug,
      },
    }));
  } catch (error) {
    console.error("Error generating static paths:", error);
    return [];
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
    
    // Get related projects
    const allProjects = getAllProjects();
    const relatedProjects = allProjects
      .filter((p) => {
        if (p.slug === slug && p.category === category) return false;
        if (p.category === project.category) return true;
        const sharedTags: string[] = p.tags.filter((tag: string) => project.tags.includes(tag));
        return sharedTags.length > 0;
      })
      .slice(0, 3);
    
    return {
      props: {
        project,
        relatedProjects,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error fetching project ${params.slug}:`, error);
    return {
      notFound: true,
    };
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const category = params?.category as string;
  const slug = params?.slug as string;
  
  useEffect(() => {
    async function loadProject() {
      try {
        if (!category || !slug) {
          setError(true);
          return;
        }
        
        const projectData = getProjectBySlug(category, slug);
        
        if (!projectData) {
          setError(true);
          return;
        }
        
        setProject(projectData);
        
        // Get related projects
        const allProjects = getAllProjects();
        const related = allProjects
          .filter((p) => {
            if (p.slug === slug && p.category === category) return false;
            if (p.category === projectData.category) return true;
            const sharedTags = p.tags.filter((tag) => projectData.tags.includes(tag));
            return sharedTags.length > 0;
          })
          .slice(0, 3);
        
        setRelatedProjects(related);
      } catch (err) {
        console.error("Error loading project:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    loadProject();
  }, [category, slug]);
  
  if (loading) {
    return (
      <>
        <div className="bg-bg-primary">
          <Nav />
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </div>
        
        <main className="bg-bg-primary text-text-primary min-h-screen py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-accent-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-accent-primary rounded-full animate-spin"></div>
            </div>
          </div>
        </main>
      </>
    );
  }
  
  if (error || !project) {
    return (
      <>
        <div className="bg-bg-primary">
          <Nav />
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </div>
        
        <main className="bg-bg-primary text-text-primary min-h-screen py-20">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Project Not Found</h1>
            <p className="text-xl text-text-secondary mb-8">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <a 
              href="/projects" 
              className="px-6 py-3 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Projects
            </a>
          </div>
        </main>
      </>
    );
  }
  
  return (
    <>
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