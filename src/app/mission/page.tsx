"use client"
import { Nav } from "@/components/Nav"; // Assuming Nav component path is correct
import React from 'react'; // Import React explicitly if needed (often implicit in newer setups)

const MissionPage = () => {
  return (
    <>
      {/* Navigation Bar */}
      <div className='bg-[#23153c]'>
        <Nav />
      </div>

      {/* Main Content Area - Replaces PageIntro */}
      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
         {/* We use max-w-3xl and mx-auto to constrain the text width for readability */}
        <div className="max-w-3xl mx-auto text-left md:text-center"> {/* Center text on medium screens and up */}

          {/* Eyebrow Text */}
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            Our mission
          </p>

          {/* Title */}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Any road will take us there
          </h1>

          {/* Content Paragraphs */}
          {/* Increased leading (line height) and added vertical space between paragraphs */}
          <div className="mt-8 space-y-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              To exist with clarity means reading between the lines while doing what you can to blur and erase
              the crooked and harmonize with the curved. Then you can build something that doesn&apos;t just meet a need,
              but assuages an urge.
            </p>
            <p>
              We work with a wide range of budgets and package plans, as we consider
              the societal, environmental, and cultural values and thus the impacts of the clients that reach us.
            </p>
            <p>
              Our organization encompasses a multitude of different blockchain, AI, and media-related
              outlets and SaaS platforms, allowing our team to work at every creative level, and to gain
              holistic insights in the entire spectrum of professional industries.
            </p>
          </div>

        </div>
      </main>
    </>
  );
};

export default MissionPage;