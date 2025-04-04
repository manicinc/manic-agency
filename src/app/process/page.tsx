"use client"; // Required for Lottie component

import React from 'react';
import { Nav } from "@/components/Nav";
// Removed PageIntro import
// import PageIntro from "@/components/PageIntro";
import Lottie from "lottie-react"; // Import the Lottie component
import walkingLottie from "@/lotties/walking.json"; // Corrected variable name assumption

const ProcessPage = () => {
  return (
    <>
      {/* Navigation */}
      <div className='bg-[#23153c]'>
        <Nav />
      </div>

      {/* Main Content */}
      <main>
        {/* --- Section replacing PageIntro --- */}
        <section className="container mx-auto px-4 py-16 md:py-20 lg:py-24 text-center overflow-hidden"> {/* Added overflow-hidden for safety */}

          {/* Eyebrow Text */}
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            Our process
          </p>

          {/* Title */}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Mania driven design and development
          </h1>

          {/* Lottie Animation */}
          {/* Centered and constrained width for responsiveness */}
          <div className="mt-10 mb-10 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Lottie animationData={walkingLottie} loop={true} />
          </div>

          {/* Placeholder/Coming Soon Content */}
          {/* Styled slightly differently now it's below the animation */}
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
        {/* --- End Section replacing PageIntro --- */}

        {/* Keep commented out sections if you plan to implement them later */}
        {/* <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40"> */}
          {/* Discover */}
          {/* <Discover /> */}
          {/* Build */}
          {/* <Build /> */}
          {/* Deliver */}
          {/* <Deliver /> */}
        {/* </div> */}
        {/* Values */}
        {/* <Values /> */}
        {/* <ContactSection /> */}
      </main>
    </>
  );
};

export default ProcessPage;