import React from "react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relativev py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Reality</span> with the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"> Digital Future</span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-xl font-bold">
            We are a group of web developers, digital marketers, machine learning / AI engineers, product designers, game designers, and legal specialists, working at the intersection of reality, mixed reality, web3, and the emerging metaverse.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition duration-300" href="#work">
                Explore Our Work
              </Link>
              <Link className="px-8 py-3 bg-transparent border border-white hover:bg-white/10 text-white font-medium rounded-md transition duration-300" href="/contact">
                Connect With Us
              </Link>
            </div>
          </div>
          
        </div>
        
        {/* Tech Logos/Partnerships */}
        <div className="mt-16 pt-8">
          <p className="text-center text-gray-400 text-sm mb-6">Leveraging cutting-edge technologies</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">AR/VR</div>
            <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">Web3</div>
            <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">AI/ML</div>
            <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">Cloud</div>
            <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">DevOps</div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;