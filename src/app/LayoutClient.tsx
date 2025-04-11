// src/app/ClientLayoutLogic.tsx
"use client"; // This component NEEDS to be client-side

import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/ScrollBtns/ScrollToTop";
import ScrollToTopArticle from "@/components/ScrollBtns/ScrollToTopArticle";
// Import other client hooks like useState, useEffect if needed here

export default function LayoutClient() {
    const pathname = usePathname(); // Use the hook here
    // Determine which scroll button to show based on path
    const isBlogArticle = /^\/blog\/[^\/]+\/[^\/]+$/.test(pathname);

    // Any other client-side state or effects for the layout go here

    return (
        <>
            {/* Conditionally render scroll buttons based on pathname */}
            {isBlogArticle ? <ScrollToTopArticle /> : <ScrollToTop />}
        </>
    );
}