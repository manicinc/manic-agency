"use client"
import Link from "next/link";
import React from "react";
import error404 from "@/lotties/error404.json";
import Lottie from "lottie-react";
import { Nav } from "@/components/Nav";

const NotFound = () => {
  return (
    <>
        {/* Navigation */}
          <div className='bg-[#23153c]'>
            <Nav />
          </div>
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div 
        className="w-full max-w-md flex flex-col items-center text-center animate-fade-in"
        style={{
          animation: "fadeIn 0.6s ease-in-out"
        }}
      >
        <div className="w-64 h-64 sm:w-80 sm:h-80 mb-6">
          <Lottie
            animationData={error404}
            loop={true}
            autoplay={true}
          />
        </div>
        
        <h1 className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
          Oops! Page not found
        </h1>
        
        <p className="mt-4 text-lg text-neutral-600 max-w-sm">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-neutral-950 text-white rounded-lg text-sm font-semibold transition hover:bg-neutral-800"
          >
            Go to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-neutral-300 rounded-lg text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
    </>

  );
};

export default NotFound;

// Add this to your global CSS file if you don't have a similar animation already
// Or you can use Tailwind's built-in animation utilities if configured
/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/