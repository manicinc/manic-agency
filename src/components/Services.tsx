import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import image44 from "@/images/image44.png";
import image46 from "@/images/image46.png";
import image47 from "@/images/image47.png";
import image50 from "@/images/image50.png";
import image51 from "@/images/image51.png";
import image52 from "@/images/image52.png";
import image53 from "@/images/image53.png";
import curve from "@/images/curve.png";

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const boxRefs = useRef<any>([]);

  // Reset refs array when services change
  useEffect(() => {
    boxRefs.current = boxRefs.current.slice(0, services.length);
  }, []);

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

  const services = [
    {
      title: "Development & Deployment",
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
        "From concept to execution, we build and deploy cutting-edge applications across all platforms. Our development team excels in creating seamless experiences for web, mobile, AR/VR, and blockchain environments, ensuring your solution works flawlessly wherever your users are.",
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
        "We pioneer solutions at the bleeding edge of technology. Our team specializes in AI/ML implementation, blockchain applications, mixed reality experiences, and metaverse development—transforming emerging technologies into practical solutions that give your business a competitive advantage.",
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
      title: "Design with Clarity & Artistry",
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
        "Our design philosophy blends aesthetic excellence with intuitive functionality. We create visually stunning interfaces and experiences that communicate clearly and delight users. From brand identity to product design, we craft visual narratives that resonate with your audience.",
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
      title: "Legal Consultation",
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
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      ),
      description:
        "Navigate the complex legal landscape of digital innovation with confidence. Our legal specialists provide expert guidance on intellectual property, data privacy, regulatory compliance, and smart contracts, ensuring your technological innovations have solid legal foundations.",
      features: [
        "IP protection",
        "Data privacy compliance",
        "Smart contract auditing",
        "Regulatory guidance",
        "Web3 & metaverse legal frameworks",
      ],
      backgroundImage: image50,
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
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8l-8 8"></path>
          <path d="M8 8l8 8"></path>
        </svg>
      ),
      description:
        "We transform innovative ideas into compelling narratives that drive engagement and conversions. Our data-driven marketing strategies leverage the latest digital channels to connect with your audience. We blend creativity with analytics to deliver marketing campaigns that achieve measurable results.",
      features: [
        "Digital marketing strategy",
        "Content creation",
        "Web3 & metaverse marketing",
        "Social media management",
        "Performance analytics",
      ],
      backgroundImage: image51,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with specified gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#23153c] via-[#1e1b45] to-[#102040] overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex flex-col items-center">
            <span>Our Services</span> <Image src={curve} alt="curve" className="w-44"/>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            We offer comprehensive solutions across the digital landscape,
            combining technical excellence with creative vision.
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
                {service.title}
              </button>
            ))}
          </div>

          <div
            className="mt-6 bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 relative overflow-hidden"
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
              className="relative bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:border-[#ff448c] transition-all duration-300 hover:translate-y-1 group overflow-hidden"
            >
              {/* Background Image on Hover */}
              <div
                className={`absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                style={{
                  backgroundImage: `url(${service.backgroundImage.src})`,
                }}
              ></div>

              {activeBox === index && (
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

              <div className="text-[#ff448c] mb-4 group-hover:scale-110 transform transition-transform duration-300 relative z-10">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 relative z-10">
                {service.description}
              </p>
              <ul className="grid grid-cols-1 gap-3 relative z-10">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff448c] mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

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
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
