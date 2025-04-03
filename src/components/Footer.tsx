import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#23153c] to-[#1e1b45] text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Team Locations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Team Locations</h3>
          <ul className="space-y-2 opacity-80">
            <li>U.S.A</li>
            <li>Los Angeles, California</li>
            <li>Lagos, Nigeria</li>
            <li className="mt-2 text-purple-300">team@manic.agency</li>
          </ul>
        </div>
        
        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2 opacity-80">
            <li>Velvet Web</li>
            <li>Smart Parser</li>
            <li>SynthGPT</li>
            <li className="mt-2 text-purple-300 cursor-pointer hover:underline">See all →</li>
          </ul>
        </div>
        
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 opacity-80">
            <li>Mission</li>
            <li>Work</li>
            <li>Process</li>
            <li>Blog</li>
            <li>Contact us</li>
            <li>Team</li>
          </ul>
        </div>
        
        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-purple-300"><FaGithub /></a>
            <a href="#" className="hover:text-purple-300"><FaLinkedin /></a>
            <a href="#" className="hover:text-purple-300"><FaTwitter /></a>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
        <p className="font-semibold text-lg">Manic Agency</p>
        <p className="text-purple-300">team@manic.agency</p>
        <p>Lagos, Nigeria</p>
        <p className="mt-4">© Manic Agency 2025</p>
      </div>
    </footer>
  );
};

export default Footer;