// src/lib/getAllProjects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execSync } from 'child_process';
import { Project } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "src", "projects");

// --- Env Var to Control Git Usage ---
const USE_GIT_FALLBACK = process.env.USE_GIT_FALLBACK !== 'false' && process.env.USE_GIT_FALLBACK !== '0';

// Gets info for the LATEST commit affecting the file
function getGitLastCommitInfo(filePath: string, format: string): string | null {
  if (!USE_GIT_FALLBACK) return null;
  try {
    const formattedPath = path.normalize(filePath);
    const escapedPath = formattedPath.replace(/(["$`\\])/g, '\\$1');
    // Get the latest commit date (ISO 8601 format)
    const command = `git log -1 --follow --format=${format} -- "${escapedPath}"`;
    const output = execSync(command, { timeout: 5000, stdio: 'pipe' }).toString().trim();
    return output || null;
  } catch (error: any) {
    if (!error.stderr?.toString().includes('fatal: no such path')) {
       console.warn(`[getGitLastCommitInfo] WARN: Could not get Git info (${format}) for ${filePath}.`);
    }
    return null;
  }
}

// Main function to get all projects
export function getAllProjects(): Project[] {
  console.log(`[getAllProjects] Reading projects from: ${PROJECTS_DIR}`);

  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`[getAllProjects] ERROR: Projects directory not found at ${PROJECTS_DIR}.`);
    throw new Error(`Projects directory not found: ${PROJECTS_DIR}`);
  }

  let projects: Project[] = [];
  try {
    const categories = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true });

    for (const categoryDirent of categories) {
      if (!categoryDirent.isDirectory()) continue;

      const categoryFromFile = categoryDirent.name; // Use folder name as category
      const categoryPath = path.join(PROJECTS_DIR, categoryFromFile);

      try {
        const files = fs.readdirSync(categoryPath, { withFileTypes: true });

        for (const fileDirent of files) {
          const fileName = fileDirent.name;
          const filePath = path.join(categoryPath, fileName);

          // Skip non-markdown files
          if (!fileDirent.isFile() || !fileName.endsWith('.md')) {
            continue;
          }

          try {
            const rawContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(rawContent);
            const slug = fileName.replace(/\.md$/, "");

            // --- Validate REQUIRED Fields ---
            const title = data.title ?? slug.replace(/-/g, ' '); // Fallback title
            const description = data.description ?? content.slice(0, 150) + "...";
            let date = data.date; // Date from frontmatter
            
            if (date instanceof Date) date = date.toISOString().split('T')[0]; // Ensure YYYY-MM-DD string
            else if (typeof date === 'string') date = date.split('T')[0]; // Ensure YYYY-MM-DD string
            
            // Use reasonable fallbacks for required fields
            if (!slug || typeof slug !== 'string') continue;
            if (!categoryFromFile || typeof categoryFromFile !== 'string') continue;
            if (!title || typeof title !== 'string') continue;
            if (!date || typeof date !== 'string') {
                date = getGitLastCommitInfo(filePath, '%as') ?? new Date().toISOString().split('T')[0]; // Fallback date
            }
            
            // Required image with fallback
            const image = data.image ?? `/projects/${categoryFromFile}/${slug}.jpg`; // Default naming convention

            // --- Process Optional Fields ---
            const longDescription = data.longDescription ?? "";
            const tags = data.tags ?? [];
            const link = data.link ?? "";
            const github = data.github ?? "";
            const featured = data.featured ?? false;
            const images = data.images ?? [];
            const technologies = data.technologies ?? [];
            const stats = data.stats ?? [];
            const status = data.status ?? 'completed';
            const team = data.team ?? [];
            const testimonials = data.testimonials ?? [];
            const bgColor = data.bgColor ?? "";
            const textColor = data.textColor ?? "";
            const sortOrder = data.sortOrder ?? 99;
            
            const modifiedDate = getGitLastCommitInfo(filePath, '%cI'); // Get last commit date ISO string

            projects.push({
              slug,
              title,
              description,
              longDescription,
              date,
              modifiedDate: modifiedDate ?? undefined,
              category: categoryFromFile,
              tags: Array.isArray(tags) ? tags : [],
              image,
              images: Array.isArray(images) ? images : [],
              link,
              github,
              featured,
              content,
              technologies: Array.isArray(technologies) ? technologies : [],
              stats: Array.isArray(stats) ? stats : [],
              status: ['completed', 'ongoing', 'concept'].includes(status) 
                ? status as 'completed' | 'ongoing' | 'concept' 
                : 'completed',
              team: Array.isArray(team) ? team : [],
              testimonials: Array.isArray(testimonials) ? testimonials : [],
              bgColor,
              textColor,
              sortOrder
            });

          } catch (fileProcessingError) {
              console.error(`[getAllProjects] ERROR processing file ${filePath}:`, fileProcessingError);
          }
        } // end file loop
      } catch (categoryReadError) {
        console.error(`[getAllProjects] ERROR reading files in category ${categoryPath}:`, categoryReadError);
      }
    } // end category loop
  } catch (topLevelError) {
     console.error(`[getAllProjects] ERROR reading projects directory ${PROJECTS_DIR}:`, topLevelError);
     throw new Error(`Failed to read projects directory: ${PROJECTS_DIR}`);
  }

  // Sort projects by featured status (featured first) and then by date (newest first)
  projects.sort((a, b) => {
    // First sort by featured status
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // If both have same featured status, then sort by sortOrder for featured items
    if (a.featured && b.featured) {
      if (a.sortOrder !== b.sortOrder) {
        return (a.sortOrder || 99) - (b.sortOrder || 99);
      }
    }
    
    // Finally sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  console.log(`[getAllProjects] Finished. Found and processed ${projects.length} projects.`);
  return projects;
}

// Get a single project by slug
export function getProjectBySlug(category: string, slug: string): Project | null {
  try {
    const filePath = path.join(PROJECTS_DIR, category, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Project not found at: ${filePath}`);
      return null;
    }
    
    const rawContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(rawContent);
    
    let date = data.date;
    if (date instanceof Date) {
      date = date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      date = date.split('T')[0];
    } else {
      date = getGitLastCommitInfo(filePath, '%as') ?? new Date().toISOString().split('T')[0];
    }
    
    const modifiedDate = getGitLastCommitInfo(filePath, '%cI');
    
    return {
      slug,
      title: data.title ?? slug.replace(/-/g, ' '),
      description: data.description ?? content.slice(0, 150) + "...",
      longDescription: data.longDescription ?? "",
      date,
      modifiedDate: modifiedDate ?? undefined,
      category,
      tags: data.tags ?? [],
      image: data.image ?? `/projects/${category}/${slug}.jpg`,
      images: data.images ?? [],
      link: data.link ?? "",
      github: data.github ?? "",
      featured: data.featured ?? false,
      content,
      technologies: data.technologies ?? [],
      stats: data.stats ?? [],
      status: data.status ?? 'completed',
      team: data.team ?? [],
      testimonials: data.testimonials ?? [],
      bgColor: data.bgColor ?? "",
      textColor: data.textColor ?? "",
      sortOrder: data.sortOrder ?? 99
    };
  } catch (error) {
    console.error(`Error reading project ${category}/${slug}:`, error);
    return null;
  }
}

// Get featured projects
export function getFeaturedProjects(limit: number = 3): Project[] {
  const projects = getAllProjects();
  return projects
    .filter(project => project.featured)
    .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99))
    .slice(0, limit);
}

// Get project categories
export function getProjectCategories(): string[] {
  const projects = getAllProjects();
  const categories = new Set<string>();
  
  projects.forEach(project => {
    if (project.category) {
      categories.add(project.category);
    }
  });
  
  return Array.from(categories);
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  const projects = getAllProjects();
  return projects.filter(project => project.category === category);
}