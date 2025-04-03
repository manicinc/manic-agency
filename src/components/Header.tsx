import React, { useState } from "react";
import HeroSection from "./HeroSection";
import { Nav } from "./Nav";

export const Header = () => {
    

    return (
        <header className="min-h-screen">
            <Nav/>
            <HeroSection/>
        </header>
    );
};