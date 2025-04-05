import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

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
            <li><Link href="/mission" className="hover:text-purple-300" >Mission</Link></li>
            <li><Link href="/work" className="hover:text-purple-300" >Work</Link></li>
            <li><Link href="/process" className="hover:text-purple-300" >Process</Link></li>
            <li><Link href="/blog" className="hover:text-purple-300" >Blog</Link></li>
            <li><Link href="/contact" className="hover:text-purple-300" >Contact us</Link></li>
            <li><Link href="/team" className="hover:text-purple-300" >Team</Link></li>
          </ul>
        </div>
        
        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://github.com/manicinc" className="hover:text-purple-300" target="_blank"><FaGithub /></a>
            <a href="https://www.linkedin.com/company/manic-agency-llc/" className="hover:text-purple-300" target="_blank"><FaLinkedin /></a>
            <a href="https://x.com/manicagency" className="hover:text-purple-300" target="_blank"><FaTwitter /></a>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
        <p className="font-semibold text-lg">Manic Agency</p>
        <p className="text-purple-300">team@manic.agency</p>
        <p>Los Angeles California</p>
        <p className="mt-4">© Manic Agency 2025</p>
      </div>
    </footer>
  );
};

export default Footer;