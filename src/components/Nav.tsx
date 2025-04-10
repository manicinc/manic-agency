"use client"
import { useState } from "react";
import Link from "next/link";

export const Nav = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container mx-auto px-4 py-10" >
                <div className="flex flex-wrap items-center justify-between">
                    {/* Logo and Company Name */}
                    <div className="flex items-center space-x-2">
                    <a className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 glitch uppercase" href="/">
                            manic <br/> Agency
                        </a>
                        <span className="hidden md:inline-block h-6 w-px bg-gray-300 mx-2"></span>
                        <p className="hidden md:block text-xs text-gray-200 max-w-md">
                            Intersection of reality, mixed reality, web3, and the emerging metaverse
                        </p>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <a href="/#services" className="text-gray-100 hover:text-teal-300 transition duration-300">Services</a>
                        <a href="/projects" className="text-gray-100 hover:text-teal-300 transition duration-300">Projects</a>
                        <a href="/team" className="text-gray-100 hover:text-teal-300 transition duration-300">Maniacs</a>
                        <a href="/blog" className="text-gray-100 hover:text-teal-300 transition duration-300">Blog</a>
                        <a href="/open-source" className="text-gray-100 hover:text-teal-300 transition duration-300">Open-Source</a>
                        <Link
  href="/contact"
  className="inline-block px-8 py-3 text-black font-mono text-lg tracking-wider uppercase bg-[#0ff] rounded-md transition duration-300 hover:bg-[#0cc] shadow-[4px_4px_0_#f0f,8px_8px_0_#00f] hover:shadow-[2px_2px_0_#f0f,4px_4px_0_#00f]"
>
  Contact Us
</Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pt-4 pb-2">
                        <div className="flex flex-col space-y-3">
                            <a href="/#services" className="text-gray-100 hover:text-teal-300 transition duration-300">Services</a>
                            <a href="/projects" className="text-gray-100 hover:text-teal-300 transition duration-300">Projects</a>
                            <a href="/team" className="text-gray-100 hover:text-teal-300 transition duration-300">Maniacs</a>
                            <a href="/blog" className="text-gray-100 hover:text-teal-300 transition duration-300">Blog</a>
                            <a href="/open-source" className="text-gray-100 hover:text-teal-300 transition duration-300">Open-Source</a>
                            <a
  href="/contact"
  className="inline-block px-8 py-3 text-black font-mono text-lg tracking-wider uppercase bg-[#0ff] rounded-md transition duration-300 hover:bg-[#0cc] shadow-[4px_4px_0_#f0f,8px_8px_0_#00f] hover:shadow-[2px_2px_0_#f0f,4px_4px_0_#00f]"
>
  Contact Us
</a>
                        </div>
                        <div className="mt-4 text-xs text-gray-200">
                            We are a group of web developers, digital marketers, machine learning / AI engineers, product designers, game designers, and legal specialists, working at the intersection of reality, mixed reality, web3, and the emerging metaverse.
                        </div>
                    </div>
                )}
            </div>
    )
}