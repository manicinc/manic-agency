import React from "react";
import Link from "next/link";
import Container from "./Container";
import FadeInLong from "./FadeIn";

export const HeroSection = () => {
  return (
    <section className="relativev md:pt-32">
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
            <Link
  href="#work"
  className="inline-block px-8 py-3 text-black font-mono text-lg tracking-wider uppercase bg-[#0ff] rounded-md transition duration-300 hover:bg-[#0cc] shadow-[4px_4px_0_#f0f,8px_8px_0_#00f] hover:shadow-[2px_2px_0_#f0f,4px_4px_0_#00f]"
>
  Explore Our Work
</Link>



<Link
  href="/contact"
  className="inline-block px-8 py-3 text-white font-mono text-lg tracking-wider uppercase border-2 border-[#0ff] rounded-md transition duration-300 hover:bg-[#0ff]/10 shadow-[2px_2px_0_#f0f,4px_4px_0_#00f]"
>
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
      
    {/* --- New Section Added Below --- */}
    <div className="py-5 md:py-0">

    <Container>
        <FadeInLong className="flex items-center gap-x-8 w-full">
        {/* <FadeIn className="max-w-full"> */}
          <div className="logoNeon text-1xl w-full">
            <div className="logoNeonText w-full"> <b><span></span>We&apos;re <span> </span>all<span> m</span>ad here</b></div>
          </div>
        </FadeInLong>
        {/* <FadeInStagger faster> */}
        {/* </FadeInStagger> */}
      </Container>
    </div>
            {/* --- End of New Section --- */}

    </section>
  );
};

export default HeroSection;