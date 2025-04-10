// src/app/projects/page.tsx

// --- NO 'use client' here ---
// This makes it a Server Component by default.

import React from 'react';
// Import components needed for the page structure
import { Nav } from '@/components/Nav';
import ProjectCarousel from '@/components/Project/ProjectCarousel';
import ProjectGrid from '@/components/Project/ProjectGrid';
import ThemeToggle from '@/components/Theme/ThemeToggle';
// Import the functions that read your markdown/filesystem data (server-side code)
import { getAllProjects, getFeaturedProjects, getProjectCategories } from '@/lib/getAllProjects';
// Import the type definition if needed for clarity or prop typing
import { Project } from '@/types/project';

// --- NO getStaticProps here ---
// It's not used in the App Router.


// The Page component itself is now async
export default async function ProjectsPage() {

  // --- Data Fetching Happens Directly Here (Server-Side/Build-Time) ---
  let allProjects: Project[] = [];
  let featuredProjects: Project[] = [];
  let categories: string[] = [];
  let fetchError: string | null = null;

  console.log("[ProjectsPage] Fetching data on the server/at build time...");

  try {
    // Directly call your server-side library functions
    allProjects = getAllProjects(); // Uses fs, path etc. - OK here!
    featuredProjects = getFeaturedProjects(3);
    categories = getProjectCategories();
    console.log(`[ProjectsPage] Fetched ${allProjects.length} projects, ${featuredProjects.length} featured.`);
  } catch (error) {
    console.error("[ProjectsPage] Error fetching projects data:", error);
    fetchError = error instanceof Error ? error.message : "Failed to load projects data.";
    // Handle the error - show an error message to the user (see below)
  }

  // --- NO useState or useEffect for initial data loading ---


  // --- Render Error State ---
  // If data fetching failed, display an error message instead of the normal page
  if (fetchError) {
      return (
         <>
           {/* Basic header even on error page */}
           <div className="bg-bg-primary sticky top-0 z-40">
             <Nav />
             <div className="absolute top-4 right-4 z-50">
               <ThemeToggle />
             </div>
           </div>
           <main className="bg-bg-primary text-text-primary min-h-screen flex items-center justify-center">
              <div className="text-center p-8 bg-red-900/20 border border-red-700 rounded-lg max-w-lg mx-auto">
                 <h1 className="text-2xl font-bold text-red-300 mb-4">Error Loading Project Data</h1>
                 <p className="text-red-400">{fetchError}</p>
                 <p className="text-sm text-red-500 mt-2">Please check server logs or contact support.</p>
              </div>
           </main>
         </>
      );
  }

  // --- Render Normal Page ---
  // This JSX is rendered using the data fetched above.
  return (
    <>
      {/* Header with Nav - These components might need 'use client' in their own files */}
      <div className="bg-bg-primary sticky top-0 z-40">
        <Nav />
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>

      <main className="bg-bg-primary text-text-primary min-h-screen">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            {/* Static Hero Content */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
                <span className="relative z-10">Our Work</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent-primary opacity-20 rounded"></span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-12">
                Experimental projects combining AI, creative coding, and emerging technologies
              </p>
            </div>

            {/* --- Featured Projects Section --- */}
            {/* Render based on the 'featuredProjects' data fetched server-side */}
            {featuredProjects.length > 0 ? (
              <div className="mb-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Featured Projects
                </h2>
                {/* Pass the data as props. ProjectCarousel might need 'use client' in its own file. */}
                <ProjectCarousel projects={featuredProjects} />
              </div>
            ) : (
              <div className="text-center text-text-secondary mb-24">No featured projects found.</div>
            )}

            {/* --- All Projects Grid Section --- */}
            {/* Render based on the 'allProjects' and 'categories' data fetched server-side */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Explore All Projects
              </h2>
              {allProjects.length > 0 ? (
                /* Pass the data as props. ProjectGrid might need 'use client' in its own file. */
                 <ProjectGrid projects={allProjects} categories={categories} />
              ) : (
                 <div className="text-center text-text-secondary py-10">No projects available.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}