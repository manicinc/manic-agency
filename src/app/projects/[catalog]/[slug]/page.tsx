// src/app/projects/[catalog]/[slug]/page.tsx

// --- NO 'use client' --- (This is a Server Component)

import React from 'react';
// We DO NOT import useEffect, useState, useParams here

// We CAN import server-side functions
import { getProjectBySlug, getAllProjects } from '@/lib/getAllProjects';
import { Project } from '@/types/project';
import { Nav } from '@/components/Nav'; // Assuming these are compatible or client components
import { ProjectDetail } from '@/components/Project/ProjectDetail'; // This component will receive data as props
import ThemeToggle from '@/components/Theme/ThemeToggle';
import { notFound } from 'next/navigation'; // Import notFound

// --- generateStaticParams is CORRECT ---
// This runs server-side at build time to determine paths
export async function generateStaticParams() {
  console.log("[generateStaticParams] Generating params for /projects/[catalog]/[slug]");
  try {
    const projects = getAllProjects(); // Uses fs - OK here
    const params = projects.map((project) => ({
      catalog: project.category, // Use 'catalog' to match folder name
      slug: project.slug,
    }));
    console.log(`[generateStaticParams] Found ${params.length} project paths.`);
    return params;
  } catch (error) {
    console.error("[generateStaticParams] Error:", error);
    return []; // Return empty array on error
  }
}

// --- REMOVE getStaticProps entirely ---


// Define the props type, including `params` for dynamic segments
interface ProjectDetailPageProps {
  params: {
    catalog: string; // Changed from 'category' to 'catalog' to match folder name
    slug: string;
  };
}

// The Page component is async and receives params
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { catalog, slug } = params; // Get catalog and slug from params prop

  console.log(`[ProjectDetailPage] Rendering page for catalog: ${catalog}, slug: ${slug}`);

  // --- Fetch Data DIRECTLY in the Server Component ---
  const project = getProjectBySlug(catalog, slug); // Use fs - OK here

  // --- Handle Not Found ---
  if (!project) {
    console.warn(`[ProjectDetailPage] Project not found for catalog: ${catalog}, slug: ${slug}. Triggering 404.`);
    notFound(); // Use the notFound function
  }

  // --- Fetch Related Projects (Server-Side) ---
  // You can still calculate related projects here
  let relatedProjects: Project[] = [];
  try {
      const allProjects = getAllProjects(); // Use fs - OK here
      relatedProjects = allProjects
        .filter((p) => {
            // Exclude the current project
            if (p.slug === slug && p.category === catalog) return false;
            // Prioritize same category
            if (p.category === project.category) return true;
            // Fallback to shared tags (optional logic)
            // const sharedTags = p.tags?.filter((tag: string) => project.tags?.includes(tag));
            // return sharedTags && sharedTags.length > 0;
            return false; // Simpler: only relate by category for this example
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort related by date
        .slice(0, 3); // Limit to 3
       console.log(`[ProjectDetailPage] Found ${relatedProjects.length} related projects.`);
  } catch (error) {
      console.error("[ProjectDetailPage] Error fetching related projects:", error);
      // Decide how to handle errors fetching related projects (e.g., show none)
      relatedProjects = [];
  }


  // --- NO useState, useEffect, useParams ---

  // --- Render the Page ---
  // Pass the fetched data to the actual UI component(s)
  return (
    <>
      {/* Header */}
      <div className="bg-bg-primary sticky top-0 z-40">
        <Nav />
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="bg-bg-primary text-text-primary min-h-screen py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          {/*
            The ProjectDetail component receives the data.
            If ProjectDetail needs state, effects, or browser APIs,
            IT must be marked with 'use client' in its own file.
          */}
          <ProjectDetail project={project} relatedProjects={relatedProjects} />
        </div>
      </main>
    </>
  );
}