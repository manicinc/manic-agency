// Suggested filename: app/open-source/page.tsx (or .jsx if not using TypeScript)

'use client';

import React, { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav'; // Make sure Nav exists
import ThemeToggle from '@/components/Theme/ThemeToggle'; // Make sure ThemeToggle exists
import { motion } from 'framer-motion';
import {
  Github, Star, GitFork, Code, ExternalLink, Clock,
  ChevronDown, BookOpen, Users, Check, AlertCircle, Archive, X // Added X for close buttons
} from 'lucide-react';
import { AsciiArtPlaceholder } from '@/lib/asciiPlaceholders'; // Make sure AsciiPlaceholder exists

// Define the Repository type (interface)
interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  created_at: string;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  archived: boolean;
}

// --- This is now your main Page component ---
export default function Page() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState<string | null>(null);
  const [filterTopic, setFilterTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('stars');

  // Function to fetch repositories
  useEffect(() => {
    async function fetchRepositories() {
      // Reset state before fetching
      setLoading(true);
      setError(null);
      // Keep previous repositories during loading for a smoother feel?
      // Or clear them: setRepositories([]);

      try {
        // Using the GitHub API to fetch Manic Inc repositories
        const response = await fetch('https://api.github.com/users/manicinc/repos?per_page=100&sort=updated');

        if (!response.ok) {
          // Try to get more specific error message from GitHub if possible
          let errorText = `GitHub API error: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData.message) {
              errorText += ` - ${errorData.message}`;
            }
          } catch (parseError) {
             // Ignore if response body can't be parsed as JSON
          }
          throw new Error(errorText);
        }

        const data = await response.json();
        setRepositories(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setRepositories([]); // Clear repositories on error
        setLoading(false);
        // *** Removed the sample data fallback logic here ***
      }
    }

    fetchRepositories();
  }, []); // Empty dependency array means this runs once on mount

  // --- Helper Functions (languages, topics, filteredRepositories, formatDate, timeAgo, modals, animations, colors) remain largely the same ---

  // Extract unique languages and topics
   const languages = React.useMemo(() => {
     const allLanguages = repositories
       .map(repo => repo.language)
       .filter(Boolean) as string[];

     return Array.from(new Set(allLanguages)).sort();
   }, [repositories]);

   const topics = React.useMemo(() => {
     const allTopics = repositories
       .flatMap(repo => repo.topics || [])
       .filter(Boolean);

     // Filter out generic/unwanted topics
     const filteredTopics = Array.from(new Set(allTopics))
       .sort()
       .filter(topic => topic.toLowerCase() !== 'manic' && topic.toLowerCase() !== 'agency');

     return filteredTopics;
   }, [repositories]);

   // Filter and sort repositories
   const filteredRepositories = React.useMemo(() => {
      // If there's an error or still loading, return empty array to prevent processing
      if (error || loading) return [];

     let filtered = [...repositories];

     // Apply language filter
     if (filterLanguage) {
       filtered = filtered.filter(repo => repo.language === filterLanguage);
     }

     // Apply topic filter
     if (filterTopic) {
       filtered = filtered.filter(repo => repo.topics?.includes(filterTopic));
     }

     // Sort repositories
     switch (sortBy) {
       case 'stars':
         filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
         break;
       case 'updated':
         filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
         break;
       case 'name':
         filtered.sort((a, b) => a.name.localeCompare(b.name));
         break;
     }

     return filtered;
   }, [repositories, filterLanguage, filterTopic, sortBy, loading, error]); // Include loading and error

   // Format date
   const formatDate = (dateString: string) => {
     try {
         const date = new Date(dateString);
         // Check for invalid date
         if (isNaN(date.getTime())) {
             return "Invalid Date";
         }
         return new Intl.DateTimeFormat('en-US', {
             year: 'numeric',
             month: 'short',
             day: 'numeric'
         }).format(date);
     } catch (e) {
         console.error("Error formatting date:", dateString, e);
         return "Invalid Date";
     }
   };

   // Time ago function
   const timeAgo = (dateString: string) => {
     try {
         const date = new Date(dateString);
         const now = new Date();
         // Check if the date is valid
         if (isNaN(date.getTime())) {
             return "Invalid date";
         }
         const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

         // Handle future dates or immediate past
         if (seconds < 0) return 'in the future';
         if (seconds < 60) return 'just now';

         let interval = Math.floor(seconds / 31536000);
         if (interval >= 1) {
             return interval === 1 ? '1 year ago' : `${interval} years ago`;
         }
         interval = Math.floor(seconds / 2592000);
         if (interval >= 1) {
             return interval === 1 ? '1 month ago' : `${interval} months ago`;
         }
         interval = Math.floor(seconds / 86400);
         if (interval >= 1) {
             return interval === 1 ? '1 day ago' : `${interval} days ago`;
         }
         interval = Math.floor(seconds / 3600);
         if (interval >= 1) {
             return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
         }
         interval = Math.floor(seconds / 60);
         // This condition should be >= 1 based on the check above
         return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;

     } catch (e) {
         console.error("Error calculating time ago:", dateString, e);
         return "Error calculating time";
     }
   };


   // Open repository modal
   const openRepoModal = (repo: Repository) => {
     setSelectedRepo(repo);
     setShowModal(true);
     document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
   };

   // Close repository modal
   const closeRepoModal = () => {
     setShowModal(false);
     setSelectedRepo(null); // Clear selected repo when closing
     document.body.style.overflow = ''; // Re-enable scrolling
   };

   // Animation variants
   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: {
         staggerChildren: 0.05 // Slightly faster stagger
       }
     }
   };

   const itemVariants = {
     hidden: { y: 20, opacity: 0 },
     visible: {
         y: 0,
         opacity: 1,
         transition: { type: "spring", stiffness: 100 } // Added subtle spring animation
     }
   };


   // Language color map
   const languageColors: { [key: string]: string } = {
     JavaScript: '#f1e05a',
     TypeScript: '#3178c6', // Updated color
     Python: '#3572A5',
     HTML: '#e34c26',
     CSS: '#563d7c',
     SCSS: '#c6538c',
     Shell: '#89e051',
     Ruby: '#701516',
     Go: '#00ADD8',
     Rust: '#dea584',
     C: '#555555',
     'C++': '#f34b7d',
     'C#': '#178600',
     Java: '#b07219',
     PHP: '#4F5D95',
     Swift: '#F05138', // Updated color
     Kotlin: '#A97BFF', // Updated color
     Dart: '#00B4AB',
     Elixir: '#6e4a7e',
     Vue: '#4FC08D', // Added Vue
     Svelte: '#FF3E00', // Added Svelte
     Default: '#8e8e8e' // Fallback color
   };

   // Get color for a language or default
   const getLanguageColor = (language: string | null | undefined) => {
     if (!language) return languageColors.Default;
     return languageColors[language] || languageColors.Default;
   };

  return (
    <>
      {/* Header with Nav */}
      <div className="bg-bg-primary sticky top-0 z-40"> {/* Made Nav sticky */}
        <Nav />
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>

      <main className="bg-bg-primary text-text-primary min-h-screen pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background ASCII art */}
          <div className="absolute inset-0 -z-10 opacity-40">
            <AsciiArtPlaceholder
              height="100%"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative z-10">Open Source</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent-primary opacity-20 rounded"></span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-text-secondary mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Explore our public repositories and contributions to the developer community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center gap-4"
              >
                <a
                  href="https://github.com/manicinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Github size={18} />
                  View GitHub Profile
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Repositories Section */}
        <section className="container mx-auto px-4 sm:px-6">
          {/* Filters and Sorting */}
           {/* Only show filters if loading is done and there's no error, OR if there are repositories (even with error, maybe allow filtering?) */}
           {(!loading && !error || repositories.length > 0) && ( // Conditionally render filters
            <div className="mb-10 bg-bg-secondary/80 backdrop-blur-md p-4 md:p-6 rounded-lg border border-accent-primary/20 sticky top-[calc(var(--nav-height,64px)+1rem)] z-30"> {/* Added sticky positioning for filters */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                {/* Language filter */}
                <div className="flex-1">
                  <label htmlFor="lang-filter" className="block text-sm text-text-secondary mb-2">Filter by Language</label>
                  <select
                    id="lang-filter"
                    value={filterLanguage || ''}
                    onChange={(e) => setFilterLanguage(e.target.value || null)}
                    disabled={loading || error || languages.length === 0 ? true : false} // Disable if loading, error, or no languages
                    className="w-full p-2 bg-bg-tertiary text-text-primary rounded-md border border-accent-primary/30 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">All Languages</option>
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic filter */}
                <div className="flex-1">
                  <label htmlFor="topic-filter" className="block text-sm text-text-secondary mb-2">Filter by Topic</label>
                  <select
                    id="topic-filter"
                    value={filterTopic || ''}
                    onChange={(e) => setFilterTopic(e.target.value || null)}
                    disabled={loading || !!error || topics.length === 0} // Disable if loading, error, or no topics
                    className="w-full p-2 bg-bg-tertiary text-text-primary rounded-md border border-accent-primary/30 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">All Topics</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort by */}
                <div className="flex-1">
                  <label htmlFor="sort-by" className="block text-sm text-text-secondary mb-2">Sort by</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'stars' | 'updated' | 'name')}
                    disabled={!!(loading || error || filteredRepositories.length < 2)} // Disable if loading, error, or < 2 repos to sort
                    className="w-full p-2 bg-bg-tertiary text-text-primary rounded-md border border-accent-primary/30 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="stars">Most Stars</option>
                    <option value="updated">Recently Updated</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>

                {/* Reset filters button */}
                {(filterLanguage || filterTopic) && (
                  <button
                    onClick={() => {
                      setFilterLanguage(null);
                      setFilterTopic(null);
                    }}
                    className="px-4 py-2 bg-accent-highlight/10 text-accent-highlight rounded-md border border-accent-highlight/30 hover:bg-accent-highlight/20 transition-colors mt-4 md:mt-7 self-end md:self-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!!loading || !!error}
                    aria-label="Reset filters"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )} {/* End of conditional filter rendering */}


           {/* Loading state */}
          {loading && (
            <div className="flex flex-col justify-center items-center h-64 text-center text-text-secondary">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-accent-primary/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-accent-primary rounded-full animate-spin"></div>
              </div>
              <p className="text-lg font-medium">Loading Repositories...</p>
              <p className="text-sm">Fetching data from GitHub.</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="bg-red-900/20 border border-red-700 text-red-300 p-6 rounded-lg mb-8 shadow-md text-center">
              <AlertCircle size={40} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-bold mb-2">
                Error Loading Repositories
              </h3>
              <p className="text-base mb-1">Could not fetch data from GitHub.</p>
              <p className="text-sm text-red-400/80 bg-red-900/30 px-2 py-1 inline-block rounded">Details: {error}</p>
              {/* *** Removed the conditional message about fallback data *** */}
            </div>
          )}


          {/* Content Area: Only render results info/grid/no-results message if NOT loading AND there is NO error */}
          {!loading && !error && (
             <>
                {/* Results info - Show only if filters/sorting are visible and there are repositories */}
                {(repositories.length > 0) && (
                  <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h2 className="text-xl font-semibold text-text-primary">
                      {filteredRepositories.length === 0
                        ? 'No repositories match your criteria'
                        : `${filteredRepositories.length} ${filteredRepositories.length === 1 ? 'repository' : 'repositories'} found`}
                    </h2>

                    {/* Filter indicators */}
                    {(filterLanguage || filterTopic) && (
                      <div className="text-sm text-text-secondary flex flex-wrap gap-x-3 gap-y-1">
                        {filterLanguage && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-bg-secondary border border-accent-primary/20">
                            Lang: <strong className="text-accent-primary">{filterLanguage}</strong>
                            <button onClick={() => setFilterLanguage(null)} className="ml-1 text-red-400 hover:text-red-600" aria-label={`Remove ${filterLanguage} language filter`}>&times;</button>
                          </span>
                        )}
                        {filterTopic && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-bg-secondary border border-accent-primary/20">
                            Topic: <strong className="text-accent-primary">{filterTopic}</strong>
                            <button onClick={() => setFilterTopic(null)} className="ml-1 text-red-400 hover:text-red-600" aria-label={`Remove ${filterTopic} topic filter`}>&times;</button>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

               {/* Repositories grid - Show if there are filtered repositories */}
                {filteredRepositories.length > 0 && (
                    <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    >
                    {filteredRepositories.map((repo) => (
                        <motion.div
                        key={repo.id}
                        variants={itemVariants}
                        layout // Animate layout changes smoothly
                        className={`group relative bg-bg-secondary rounded-lg overflow-hidden border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10 ${repo.archived ? 'opacity-70 hover:opacity-90' : ''} cursor-pointer`} // Added cursor-pointer
                        onClick={() => openRepoModal(repo)}
                        role="button" // Semantics for clickable div
                        tabIndex={0} // Make it focusable
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openRepoModal(repo); }} // Keyboard accessibility
                        >
                        {/* Repository card content... (remains the same) */}
                         <div className="p-6 h-full flex flex-col">
                               {/* Archived badge */}
                               {repo.archived && (
                                 <div className="absolute top-3 right-3 px-2 py-1 bg-gray-700/80 backdrop-blur-sm text-xs font-medium text-gray-300 rounded-md flex items-center gap-1 border border-gray-600 z-10"> {/* Added z-index */}
                                   <Archive size={12} />
                                   Archived
                                 </div>
                               )}

                               {/* Repository name */}
                               <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors flex items-start gap-2 pr-20"> {/* Increased padding right for badge */}
                                 <Github size={20} className="flex-shrink-0 mt-1 text-text-secondary group-hover:text-accent-primary transition-colors" />
                                 <span className="line-clamp-1 break-all">{repo.name}</span>
                               </h3>

                               {/* Description */}
                               <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow min-h-[60px]"> {/* Set min-height */}
                                 {repo.description || <span className="italic text-text-muted">No description provided</span>}
                               </p>

                               {/* Repository stats */}
                               <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-text-muted border-t border-accent-primary/10 pt-4">
                                 {/* Stars */}
                                 <div className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
                                   <Star size={14} className="text-yellow-400"/>
                                   <span>{repo.stargazers_count}</span>
                                 </div>

                                 {/* Forks */}
                                 <div className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                                   <GitFork size={14} />
                                   <span>{repo.forks_count}</span>
                                 </div>

                                 {/* Issues */}
                                  {repo.open_issues_count > 0 && ( // Only show if issues exist
                                     <div className="flex items-center gap-1" title={`${repo.open_issues_count} open issues`}>
                                         <AlertCircle size={14} className="text-orange-400"/>
                                         <span>{repo.open_issues_count}</span>
                                     </div>
                                   )}

                                 {/* Updated */}
                                 <div className="flex items-center gap-1" title={`Last updated ${formatDate(repo.updated_at)}`}>
                                   <Clock size={14} />
                                   <span>{timeAgo(repo.updated_at)}</span>
                                 </div>
                               </div>

                               {/* Language & Topics Footer */}
                               <div className="mt-auto flex flex-col gap-3">
                                   {/* Language */}
                                    {repo.language && (
                                       <div className="flex items-center gap-2">
                                          <span
                                            className="w-3 h-3 rounded-full border border-black/20"
                                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                                            title={`Language: ${repo.language}`}
                                          ></span>
                                          <span className="text-sm text-text-secondary">{repo.language}</span>
                                       </div>
                                     )}

                                   {/* Topics */}
                                   {repo.topics && repo.topics.length > 0 && (
                                     <div className="flex flex-wrap gap-1.5">
                                       {repo.topics.slice(0, 3).map((topic) => (
                                         <span
                                           key={topic}
                                           className="px-2 py-0.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20"
                                         >
                                           {topic}
                                         </span>
                                       ))}
                                       {repo.topics.length > 3 && (
                                         <span className="px-2 py-0.5 text-xs bg-bg-tertiary text-text-secondary rounded-full border border-accent-primary/10">
                                           +{repo.topics.length - 3} more
                                         </span>
                                       )}
                                     </div>
                                   )}
                               </div>

                               {/* View details indicator - subtle */}
                               <div className="absolute bottom-3 right-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                 <ChevronDown size={16} />
                                 <span className="sr-only">View details</span>
                               </div>
                         </div>
                        </motion.div>
                    ))}
                    </motion.div>
                )}

               {/* No results state - Show if API succeeded but NO repositories match filters OR API returned empty */}
               {filteredRepositories.length === 0 && repositories.length > 0 && ( // Check if filters resulted in empty
                 <div className="bg-bg-secondary rounded-lg p-8 text-center border border-accent-primary/10 mt-8">
                    <div className="mb-4">
                    {/* Use a different icon? Maybe a search icon or filter icon? */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-accent-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No Matching Repositories</h3>
                    <p className="text-text-secondary mb-6">Try adjusting or resetting your filters to find what you're looking for.</p>
                    {(filterLanguage || filterTopic) && ( // Only show reset if filters are active
                        <button
                        onClick={() => {
                            setFilterLanguage(null);
                            setFilterTopic(null);
                        }}
                        className="px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors"
                        >
                        Reset Filters
                        </button>
                    )}
                 </div>
               )}

               {/* Initial Empty state - Show if API succeeded but returned NO repositories at all */}
               {repositories.length === 0 && !loading && !error && ( // Check if initial fetch was empty
                 <div className="bg-bg-secondary rounded-lg p-8 text-center border border-accent-primary/10 mt-8">
                    <div className="mb-4">
                        <Archive className="inline-block text-text-secondary mx-auto" size={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No Public Repositories Found</h3>
                    <p className="text-text-secondary">It seems there are no public repositories available for this user at the moment.</p>
                 </div>
               )}
             </>
          )} {/* End of !loading && !error block */}

        </section>
      </main>

      {/* Repository Detail Modal (remains the same) */}
       {showModal && selectedRepo && (
          // Using framer-motion for modal animation
          <motion.div
              className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeRepoModal} // Close on backdrop click
          >
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>

              {/* Modal content */}
              <motion.div
                  className="relative w-full max-w-3xl p-6 md:p-8 bg-bg-secondary border border-accent-primary/20 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto" // Added max-height and scroll
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="repo-modal-title"
              >
                  <div className="flex justify-between items-start mb-6 gap-4">
                       <h3 id="repo-modal-title" className="text-2xl font-bold text-text-primary flex items-center gap-3 flex-wrap">
                           <Github size={24} />
                           <span className="break-all">{selectedRepo.name}</span>

                           {/* Archive badge */}
                           {selectedRepo.archived && (
                             <span className="px-2 py-0.5 bg-gray-700 text-xs font-medium text-gray-300 rounded-md flex items-center gap-1 border border-gray-600 whitespace-nowrap">
                                 <Archive size={12} />
                                 Archived
                             </span>
                           )}
                       </h3>

                       <button
                           onClick={closeRepoModal}
                           className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-full hover:bg-bg-tertiary -mt-1 -mr-1 sticky top-0" // Make close button sticky within modal
                           aria-label="Close modal"
                       >
                           {/* Using Lucide X icon */}
                           <X size={24} />
                       </button>
                  </div>

                  {/* Repository description */}
                  <p className="text-text-secondary mb-6">
                       {selectedRepo.description || <span className="italic text-text-muted">No description provided</span>}
                  </p>

                  {/* Repository details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm border-t border-b border-accent-primary/10 py-6">
                       {/* Left column */}
                       <div className="space-y-3">
                           {/* Statistics */}
                           <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-md border border-accent-primary/10" title={`${selectedRepo.stargazers_count} stars`}>
                                    <Star size={16} className="text-yellow-400" />
                                    <span className="font-medium">{selectedRepo.stargazers_count}</span> <span className="text-text-muted">stars</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-md border border-accent-primary/10" title={`${selectedRepo.forks_count} forks`}>
                                    <GitFork size={16} />
                                    <span className="font-medium">{selectedRepo.forks_count}</span> <span className="text-text-muted">forks</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-md border border-accent-primary/10" title={`${selectedRepo.open_issues_count} open issues`}>
                                    <AlertCircle size={16} className="text-orange-400"/>
                                    <span className="font-medium">{selectedRepo.open_issues_count}</span> <span className="text-text-muted">issues</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-md border border-accent-primary/10" title={`${selectedRepo.watchers_count} watchers`}>
                                    <Users size={16} />
                                    <span className="font-medium">{selectedRepo.watchers_count}</span> <span className="text-text-muted">watchers</span>
                                </div>
                           </div>

                           {/* Language */}
                           {selectedRepo.language && (
                                <div className="flex items-center gap-2">
                                    <span className="text-text-secondary w-24 flex-shrink-0">Language:</span>
                                    <div className="flex items-center gap-2">
                                        <span
                                          className="w-3 h-3 rounded-full border border-black/20"
                                          style={{ backgroundColor: getLanguageColor(selectedRepo.language) }}
                                        ></span>
                                        <span className="font-medium">{selectedRepo.language}</span>
                                    </div>
                                </div>
                              )}

                           {/* License */}
                           <div className="flex items-center gap-2">
                             <span className="text-text-secondary w-24 flex-shrink-0">License:</span>
                             {selectedRepo.license ? (
                               selectedRepo.license.url ? (
                                 <a href={selectedRepo.license.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent-primary hover:underline inline-flex items-center gap-1">
                                   {selectedRepo.license.name} <ExternalLink size={12} className="opacity-70"/>
                                 </a>
                               ) : (
                                 <span className="font-medium">{selectedRepo.license.name}</span>
                               )
                             ) : (
                               <span className="text-text-muted italic">Not specified</span>
                             )}
                           </div>


                           {/* Created at */}
                           <div className="flex items-center gap-2">
                                <span className="text-text-secondary w-24 flex-shrink-0">Created:</span>
                                <span className="font-medium">{formatDate(selectedRepo.created_at)}</span>
                           </div>

                           {/* Updated at */}
                           <div className="flex items-center gap-2">
                                <span className="text-text-secondary w-24 flex-shrink-0">Updated:</span>
                                <span className="font-medium">{formatDate(selectedRepo.updated_at)} ({timeAgo(selectedRepo.updated_at)})</span>
                           </div>
                       </div>

                       {/* Right column */}
                       <div className="space-y-4">
                           {/* Topics */}
                           {selectedRepo.topics && selectedRepo.topics.length > 0 && (
                                <div>
                                    <h4 className="text-text-secondary mb-2 font-medium">Topics:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedRepo.topics.map((topic) => (
                                            <span
                                              key={topic}
                                              className="px-2.5 py-1 text-xs bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20"
                                            >
                                              {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                              )}

                           {/* Repository links */}
                           <div>
                                <h4 className="text-text-secondary mb-2 font-medium">Links:</h4>
                                <div className="space-y-2">
                                    {/* GitHub repo link */}
                                    <a
                                        href={selectedRepo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-accent-primary hover:text-accent-highlight transition-colors group"
                                    >
                                        <Github size={16} />
                                        <span className="group-hover:underline">View on GitHub</span>
                                        <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
                                    </a>

                                    {/* Homepage link (if available) */}
                                    {selectedRepo.homepage && (
                                        <a
                                            href={selectedRepo.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-accent-primary hover:text-accent-highlight transition-colors group"
                                        >
                                            <ExternalLink size={16} />
                                            <span className="group-hover:underline truncate max-w-[200px] sm:max-w-[300px]">{selectedRepo.homepage.replace(/^https?:\/\//, '')}</span> {/* Show domain nicely */}
                                            <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 ml-auto" />
                                        </a>
                                      )}
                                </div>
                           </div>
                       </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 justify-end mt-8 pt-6 border-t border-accent-primary/10"> {/* Added top border */}
                       <a
                           href={selectedRepo.html_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-highlight transition-colors flex items-center gap-2 shadow-sm hover:shadow-md order-2 sm:order-1" // Button order
                       >
                           <Github size={18} />
                           View Repository
                       </a>

                       {selectedRepo.homepage && (
                           <a
                               href={selectedRepo.homepage}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="px-4 py-2 border border-text-secondary text-text-secondary hover:border-accent-primary hover:text-accent-primary rounded-md transition-colors flex items-center gap-2 shadow-sm hover:shadow-md order-3 sm:order-2"
                           >
                               <ExternalLink size={18} />
                               Visit Website
                           </a>
                         )}

                       <button
                           onClick={closeRepoModal}
                           className="px-4 py-2 bg-bg-tertiary text-text-secondary hover:bg-bg-primary rounded-md transition-colors order-1 sm:order-3" // Close button first on small screens
                       >
                           Close
                       </button>
                  </div>
              </motion.div>
          </motion.div>
       )}
    </>
  );
}