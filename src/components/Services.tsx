"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import image44 from "@/images/image44.png";
import image46 from "@/images/image46.png";
import image47 from "@/images/image47.png";
import image50 from "@/images/image50.png";
import image51 from "@/images/image51.png";
import image52 from "@/images/image52.png"; // Added missing import if needed
import image53 from "@/images/image53.png"; // Added missing import if needed
import curve from "@/images/curve.png";
import ClientsSection from "./ClientsSection";

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const boxRefs = useRef<any>([]);

  
  const services = [
    // ... (service data remains the same) ...
    {
        title: "Development and deployments on every platform",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        ),
        description:
          "Each of our devs is full-stack with at least one specialization in a particular area, whether that's frontend, SEO, mobile, VR / AR, deep learning, databases, web scraping, smart contracts, or devops and the cloud.",
        features: [
          "Cross-platform development",
          "Cloud infrastructure",
          "DevOps automation",
          "API integration",
          "Performance optimization",
        ],
        backgroundImage: image44,
      },
      {
        title: "Innovative & Emergent Tech",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M20 12h2"></path>
            <path d="M2 12h2"></path>
            <path d="M17.5 6.5l-1.4 1.4"></path>
            <path d="M6.5 17.5l-1.4 1.4"></path>
            <path d="M17.5 17.5l-1.4-1.4"></path>
            <path d="M6.5 6.5l-1.4-1.4"></path>
          </svg>
        ),
        description:
          "We rely on robust and battle-tested tech to stand on the shoulders of. But we also continually keep up-to-date with trends and research in upcoming fields poised to strike the mainstream world, such as blockchain, generative AI, and virtual and augmented reality. We understand demand and innovation are bidirectional.",
        features: [
          "AI & machine learning integration",
          "Web3 & blockchain solutions",
          "Mixed reality experiences",
          "Metaverse development",
          "IoT ecosystems",
        ],
        backgroundImage: image46,
      },
      {
        title: "Designs with clarity and artistry",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
        ),
        description:
          "Our branding and UI / UX skills are unparalleled, as we employ true artists with a passion for their craft. We focus on humanistic-centric design and aim for simplicity.",
        features: [
          "UI/UX design",
          "Brand identity",
          "3D modeling & animation",
          "Game design",
          "Motion graphics",
        ],
        backgroundImage: image47,
      },
      
      {
        title: "Creative & Results-Oriented Marketing",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
             {/* Corrected SVG path for a target or megaphone icon */}
             <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path><path d="M12 6a6 6 0 100 12 6 6 0 000-12z"></path><path d="M12 10a2 2 0 100 4 2 2 0 000-4z"></path>
            </svg>
        ),
        description:
          " Growth hacking and going viral come naturally for us. Our in-house tools for social media analytics and brand monitoring aid us in bringing campaigns and user acquisition to the next level.",
        features: [
          "Digital marketing strategy",
          "Content creation",
          "Web3 & metaverse marketing",
          "Social media management",
          "Performance analytics",
        ],
        backgroundImage: image51,
      },
      {
        title: "Data Intelligence & Analytics",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
          </svg>
        ),
        description:
          "We transform raw data into actionable insights through advanced analytics, visualization, and predictive modeling. Our expertise spans traditional datasets to complex behavioral analytics in virtual environments, helping businesses make data-driven decisions across all reality planes.",
        features: [
          "Behavioral analytics in XR",
          "Real-time data visualization",
          "Predictive user modeling",
          "Cross-platform attribution",
          "Engagement & retention metrics",
        ],
        backgroundImage: image50,
      },
      {
        title: "Digital Twin & Simulation Environments",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <path d="M3.29 7 12 12l8.71-5"></path>
            <path d="M12 22V12"></path>
          </svg>
        ),
        description:
          "We create highly accurate digital replicas of physical spaces, products, and processes that enable testing, training, and visualization in risk-free virtual environments. Our digital twins bridge the gap between physical and digital, unlocking new possibilities for product development and operational efficiency.",
        features: [
          "Industrial process simulation",
          "Interactive product prototypes",
          "Virtual training environments",
          "Architectural visualization",
          "IoT-connected real-time twins",
        ],
        backgroundImage: image53,
      }
  ];

  useEffect(() => {
    // This effect now correctly depends on the number of services
    boxRefs.current = boxRefs.current.slice(0, services.length);
  }, [services.length]); // Added services.length

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent, index: number) => {
    const box = boxRefs.current[index];
    if (!box) return;

    const rect = box.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setActiveBox(index);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setActiveBox(null);
  };

  return (
    <section className="relative py-20 overflow-hidden" id="services">
      {/* Background with specified gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#23153c] via-[#1e1b45] to-[#102040] overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex flex-col items-center">
            <span>Our Services</span>{" "}
            <Image src={curve} alt="curve" className="w-44" />
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Fall down the rabbit hole with us to determine optimal budgeting,
            ideal market timing, and holistic architecture & design to manifest
            your vision
          </p>
        </div>

        {/* Mobile Services Tabs */}
        <div className="md:hidden mb-8">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium transition-colors ${
                  activeService === index
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {service.title.split(" ")[0]} {/* Show first word for brevity */}
              </button>
            ))}
          </div>

          <div
            className="mt-6 bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10 relative overflow-hidden" // Changed backdrop-blur-sm to backdrop-blur-md
            ref={(el) => (boxRefs.current[0] = el as any)}
            onMouseMove={(e) => handleMouseMove(e as any, 0)}
            onMouseLeave={handleMouseLeave}
          >
            {activeBox === 0 && (
              <div
                className="absolute pointer-events-none mouse-light-effect"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            )}
            <div className="flex items-center mb-4">
              <div className="text-teal-400 mr-3">
                {services[activeService].icon}
              </div>
              <h3 className="text-xl font-bold text-white">
                {services[activeService].title}
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              {services[activeService].description}
            </p>
            <ul className="grid grid-cols-1 gap-3">
              {services[activeService].features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Services Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (boxRefs.current[index] = el as any)}
              onMouseMove={(e) => handleMouseMove(e as any, index)}
              onMouseLeave={handleMouseLeave}
              className="relative bg-white/5 rounded-xl p-8 backdrop-blur-md border border-white/10 hover:border-[#8641ff] transition-all duration-300 hover:-translate-y-1 group overflow-hidden" // Changed backdrop-blur-sm to backdrop-blur-md and adjusted hover translate
            >
              {/* Background Image on Hover */}
              <div
                className={`absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`} // Ensure z-index is lower than content
                style={{
                  backgroundImage: `url(${service.backgroundImage.src})`,
                }}
              ></div>

              {/* Mouse Light Effect */}
              {activeBox === index && (
                <div
                  className="absolute pointer-events-none mouse-light-effect z-0" // Ensure z-index is lower than content
                  style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              )}

              {/* Card Content */}
              <div className="relative z-10"> {/* Ensure content is above overlays */}
                <div className="text-[#8641ff] mb-4 group-hover:scale-110 transform transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8641ff] mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ClientsSection />

      {/* Custom styles for animations */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .mouse-light-effect {
          pointer-events: none;
          position: absolute;
          transition: opacity 0.15s ease;
          /* Ensure it doesn't interfere with hover effects if needed */
          /* z-index: 0; */ 
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;