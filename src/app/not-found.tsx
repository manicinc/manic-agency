"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dark1 from "@/images/404/dark-1.png";
import dark2 from "@/images/404/dark-2.png";
import dark3 from "@/images/404/dark-3.png";
import dark4 from "@/images/404/dark-4.png";
import white1 from "@/images/404/white-1.png";
import white2 from "@/images/404/white-2.png";
import white3 from "@/images/404/white-3.png";
import white4 from "@/images/404/white-4.png";
import Image from "next/image";

const darkImages = [dark1, dark2, dark3, dark4];
const whiteImages = [white1, white2, white3, white4];

export default function NotFound() {
  const pathname = usePathname();
  const [currentImage, setCurrentImage] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Toggle this if you want to preview light mode
  const isDarkMode = true;

  const imageSet = isDarkMode ? darkImages : whiteImages;

  useEffect(() => {
    // Automatic redirection for old blog slugs
    if (pathname && pathname.startsWith("/blog/") && pathname.split("/").length === 3) {
      const slug = pathname.split("/").pop();
      const categories = ["thinkpieces", "tutorials"];
      const checkCategory = async (index: number): Promise<void> => {
        if (index >= categories.length) return;
        const url = `/blog/${categories[index]}/${slug}`;
        try {
          const res = await fetch(url);
          if (res.ok) window.location.href = url;
          else checkCategory(index + 1);
        } catch {
          checkCategory(index + 1);
        }
      };
      checkCategory(0);
    }
  }, [pathname]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        const newIndex = (Math.floor(Math.random() * imageSet.length));
        setCurrentImage(newIndex);
        setIsGlitching(false);
      }, 150); // short glitch effect
    }, 4000); // every 4 seconds

    return () => clearInterval(glitchInterval);
  }, [imageSet]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative w-full max-w-md aspect-square mb-8 overflow-hidden rounded-xl border border-gray-700 shadow-2xl">
        <Image
          src={imageSet[currentImage]}
          alt="404"
          fill
          className={`object-cover transition duration-300 ease-in-out ${
            isGlitching ? "animate-glitch" : ""
          }`}
        />
      </div>
      <h1 className="text-6xl font-bold tracking-widest text-center mb-4 glitch-text">
        404
      </h1>
      <p className="text-xl mb-6 text-center max-w-xl">
        This part of the rabbit hole doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-lg rounded-full bg-pink-600 hover:bg-pink-500 transition text-white shadow-lg shadow-pink-500/40"
      >
        Return Home
      </Link>

      <style jsx>{`
        .glitch-text {
          text-shadow: 2px 2px 0 #ff00ff, -2px -2px 0 #00ffff;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            opacity: 1;
          }
          20% {
            transform: translate(-5px, 3px);
            opacity: 0.8;
          }
          40% {
            transform: translate(4px, -4px);
            opacity: 1;
          }
          60% {
            transform: translate(-2px, 2px);
            opacity: 0.9;
          }
          80% {
            transform: translate(3px, -1px);
            opacity: 0.95;
          }
          100% {
            transform: translate(0);
            opacity: 1;
          }
        }

        .animate-glitch {
          animation: glitch 150ms ease-in-out;
        }
      `}</style>
    </div>
  );
}
