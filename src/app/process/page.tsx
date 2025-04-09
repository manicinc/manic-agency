// app/process/page.tsx
"use client"; // Required for Lottie component

import React, { useEffect, useState } from 'react';
import { Nav } from "@/components/Nav";
import dynamic from 'next/dynamic';
import type { LottieComponentProps } from 'lottie-react';

// Dynamically import the Lottie component with SSR disabled
const LottieComponent = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="h-40 w-full bg-gray-200 animate-pulse rounded-md"></div>
});

// Define proper type for animation data
type AnimationData = any; // or a more specific type if you know the structure

const ProcessPage = () => {
  // Initialize state with the proper type
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  useEffect(() => {
    // Fix the data handling to extract default property
    import("@/lotties/walking.json").then((module) => {
      // Extract the default property if it exists, otherwise use the module itself
      setAnimationData(module.default || module);
    });
  }, []);

  return (
    <>
      {/* Navigation */}
      <div className='bg-[#23153c]'>
        <Nav />
      </div>

      {/* Main Content */}
      <main>
        <section className="container mx-auto px-4 py-16 md:py-20 lg:py-24 text-center overflow-hidden">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            Our process
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Mania driven design and development
          </h1>

          {/* Lottie Animation */}
          <div className="mt-10 mb-10 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            {animationData && (
              <LottieComponent animationData={animationData} loop={true} />
            )}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Pardon the Dust!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We&apos;re currently mapping out our design and development journey.
              Stay tuned as we develop our case studies and document our processes right here!
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProcessPage;