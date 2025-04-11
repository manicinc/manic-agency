// src/app/projects/[catalog]/[slug]/page.tsx
// NO "use client" - This needs to be a Server Component to fetch data

import React from 'react';
import { getAllProjects, getProjectBySlug } from '@/lib/getAllProjects'; // Use your project fetching functions
import { Project } from '@/types/project'; // Use your project type
import { Nav } from '@/components/Nav'; // Nav must be "use client" in its own file
import { ProjectDetail } from '@/components/Project/ProjectDetail'; // ProjectDetail can be server or client
import ThemeToggle from '@/components/Theme/ThemeToggle'; // ThemeToggle must be "use client" in its own file
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next'; // Import Metadata types

// Define the props expected by the Page component in App Router
interface ProjectPageProps {
    params: {
        catalog: string;
        slug: string;
    };
    // searchParams?: { [key: string]: string | string[] | undefined }; // Optional searchParams
}

// --- Static Parameter Generation ---
// Replaces getStaticPaths
export async function generateStaticParams() {
    try {
        const projects = getAllProjects(); // Fetch all projects to get their params
        return projects.map((project) => ({
            catalog: project.category, // Make sure your Project type has category
            slug: project.slug,
        }));
    } catch (error) {
        console.error("Error generating project static params:", error);
        return []; // Return empty array on error
    }
}

// --- Metadata Generation (Optional but Recommended) ---
type MetadataProps = ProjectPageProps & {} // Can add parent metadata type if needed

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata // Optional access to parent metadata
): Promise<Metadata> {
  try {
    const { catalog, slug } = params;
    const project = getProjectBySlug(catalog, slug); // Fetch data again for metadata

    if (!project) {
      // Optionally return default metadata or handle not found case
      return {
        title: 'Project Not Found',
      }
    }

    // Optionally merge with parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
      title: `${project.title} | Manic Agency Projects`, // Example title
      description: project.description || 'Project details for Manic Agency.', // Example description
      // Add other metadata like Open Graph, Twitter cards etc.
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.image ? [project.image] : [], // Add image if available
        // ... other OG properties
      },
    };
  } catch (error) {
      console.error(`Error generating metadata for project ${params.slug}:`, error);
      return { // Fallback metadata on error
         title: 'Error',
         description: 'Error loading project metadata.',
      }
  }
}


// --- Page Component (Server Component) ---
export default function ProjectDetailPage({ params }: ProjectPageProps) {

    // Fetch data DIRECTLY inside the Server Component
    const { catalog, slug } = params;
    let project: Project | null = null;
    let relatedProjects: Project[] = [];

    try {
        project = getProjectBySlug(catalog, slug);

        if (project) {
            // Get related projects only if the main project was found
            const allProjects = getAllProjects();
            relatedProjects = allProjects
                .filter((p) => {
                    // Type guard or ensure p has necessary properties
                    if (!p || typeof p !== 'object' || !p.slug || !p.category || !Array.isArray(p.tags) || !project) return false;

                    // Don't include the current project
                    if (p.slug === slug && p.category === catalog) return false;
                    // Include if same category
                    if (p.category === project.category) return true;
                     // Include if shared tags (at least one) - ensure project.tags exists
                    const currentProjectTags = project.tags || [];
                    const sharedTags = p.tags.filter((tag: string) => currentProjectTags.includes(tag));
                    return sharedTags.length > 0;
                })
                .slice(0, 3); // Limit to 3 related projects
        }
    } catch (error) {
        console.error(`Error fetching data for project page ${slug}:`, error);
        // Handle error state if needed, or rely on notFound below
    }


    // If the project wasn't found after fetching
    if (!project) {
        notFound(); // Trigger the 404 page
    }

    // Render the page content
    return (
        <>
            {/* Header section containing client components */}
            <div className="bg-bg-primary relative"> {/* Added relative positioning */}
                {/* Nav MUST be marked "use client" in Nav.tsx */}
                <Nav />
                {/* ThemeToggle MUST be marked "use client" in ThemeToggle.tsx */}
                <div className="absolute top-4 right-4 z-50">
                    <ThemeToggle />
                </div>
            </div>

            <main className="bg-bg-primary text-text-primary min-h-screen py-8 md:py-12">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* ProjectDetail can be Server or Client depending on its needs */}
                    {/* Pass the fetched data as props */}
                    <ProjectDetail project={project} relatedProjects={relatedProjects} />
                </div>
            </main>
        </>
    );
}