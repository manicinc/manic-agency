// src/components/Header.tsx
import React from "react";
import { Nav } from "./Nav"; // Assuming Nav handles navigation display
// Remove imports for HeroSection, BlogPost, getAllPosts

// Header can be Server or Client, depending ONLY on Nav's requirements now.
// If Nav is Client, Header can still work fine here.
export const Header = () => {
    // No data fetching here
    // No featuredPosts prop

    return (
        // Removed min-h-screen, as that likely belongs to the overall page structure or Hero
        // Adjust styling as needed - maybe just position Nav?
        <header className="relative z-50 sticky-header"> {/* Example: Ensure it's above other content */}
            <Nav />
        </header>
    );
};