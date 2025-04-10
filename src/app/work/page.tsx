'use client'; // Keep this as EmblaCarousel likely requires client-side JS

// Removed Swiper imports as they weren't used in the final structure shown
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// Removed PageIntro import
// import PageIntro from '@/components/PageIntro';
import Image from 'next/image';
// Removed Link import - assuming it's used within EmblaCarousel or not needed here directly
// import Link from 'next/link';
// Removed Work import as it wasn't used
// import Work from '@/components/Work';
import { Nav } from '@/components/Nav';
import curve from '@/images/curve.png'; // Make sure this path is correct
import EmblaCarousel from '@/components/EmblaCarousel'; // Make sure this path is correct
import React from 'react'; // Good practice to include React
import "../styles/embla.css";

const WorkPage = () => {
  // Project data remains the same
  const projects = [
    {
      id: 1,
      imageUrl: "/manic.gif",
      link: 'https://manicinc.github.io/logomaker/',
      title: "Logo Maker"
    },
    {
      id: 2,
      imageUrl: '/velvet_web.png',
      link: 'https://www.manic.agency/velvet',
      title: 'Velvet Web',
    },
    {
      id: 3,
      imageUrl: "/portapack.jpg",
      link: "https://github.com/manicinc/portapack",
      title: "Portapack",
    }
  ];

  return (
    <>
      {/* Navigation */}
      <div className='bg-[#23153c]'>
        <Nav />
      </div>

      {/* Main Content Wrapper */}
      <main>
        {/* --- Section replacing PageIntro --- */}
        <section className="bg-white dark:bg-slate-900 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
             {/* Eyebrow */}
            <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              Our work
            </p>
             {/* Title */}
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Manic creations
            </h1>
            {/* Description Paragraphs */}
            <div className="mt-6 space-y-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
              <p>
                Our organization has a multitude of templates and robust boilerplate
                solutions we utilize to build in-house platforms, SaaSes, and media
                organizations. Depending on the requirements of a client and the
                needs of a project, we can integrate our existing toolkit of
                templatized code to create streamlined solutions for others.
              </p>
              <p>
                These are the projects that have been developed and are fully owned
                and managed by Manic Agency / Manic Labs.
              </p>
            </div>
          </div>
        </section>
        {/* --- End Section replacing PageIntro --- */}


        {/* --- Existing Project Carousel Section --- */}
        {/* Added some padding top (pt-12) to separate from the section above */}
        {/* Added padding bottom (pb-16) for spacing at the end */}
        <section className="container mx-auto px-4 pt-12 pb-16 md:pb-20">
          {/* Section Heading with Curve */}
          {/* Changed text slightly to differentiate from the page title/eyebrow */}
          <h2 className="text-3xl font-bold text-center grow-0 flex flex-col items-center mb-10 md:mb-14 text-gray-900 dark:text-white">
            <span>Featured Projects</span>
            {/* Added small margin-top to the image */}
            <Image src={curve} alt="Decorative curve" className='w-44 grow-0 mt-2'/>
          </h2>

          {/* Carousel Component */}
          {/* Ensure EmblaCarousel is styled appropriately internally or via props */}
          <EmblaCarousel slides={projects} options={{ loop: true }} /> {/* Added example options prop */}

        </section>
        {/* --- End Project Carousel Section --- */}

      </main>
    </>
  );
};

export default WorkPage;