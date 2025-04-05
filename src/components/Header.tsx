import React from "react";
import HeroSection from "./HeroSection";
import { Nav } from "./Nav";

// Assuming you have a CSS file imported, e.g., App.css, index.css, or Header.css
// If not, create one (e.g., Header.css) and import it:
// import './Header.css'; // Adjust the path if necessary

export const Header = () => {
    return (
        <header className="min-h-screen">
            <Nav />
            <HeroSection />

            
            
        </header>
    );
};

// Make sure HeroSection and Nav components are correctly imported/defined elsewhere
// export default Header; // If this is your main export