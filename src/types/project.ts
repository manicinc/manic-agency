export interface Project {
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    date: string;
    modifiedDate?: string;
    category: string;
    tags: string[];
    image: string;
    images?: string[]; // Additional images for gallery
    link?: string;
    github?: string;
    featured: boolean;
    content?: string;
    technologies?: string[];
    stats?: {
      label: string;
      value: string;
    }[];
    status?: 'completed' | 'ongoing' | 'concept';
    team?: {
      name: string;
      role: string;
      link?: string;
    }[];
    testimonials?: {
      quote: string;
      author: string;
      role?: string;
    }[];
    bgColor?: string; // For stylized project cards
    textColor?: string; // For contrast with bgColor
    sortOrder?: number; // Control display order for featured projects
  }

  export interface ProjectCategory {
    name: string;
    slug: string;
  }

  export interface Projects {
    projects: Project[];
    categories?: ProjectCategory[];
  }

  export interface ProjectFilter {
    category: string;
    tags: string[];
}

