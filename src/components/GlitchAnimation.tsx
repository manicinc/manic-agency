import React, { useState, useEffect, useCallback } from 'react';

// Define types for the state (interfaces remain the same)
interface Path {
  points: string;
  // Color is now handled by CSS Variables, but we can keep a type for potential overrides
  // color: string; 
  opacity: number;
  animationDuration: number;
  strokeWidth: number;
  className: string; // To assign theme classes
}

interface NoiseDot {
  x: number;
  y: number;
  radius: number;
  // color: string; // Handled by CSS Variables
  opacity: number;
  animationDuration: number;
  className: string; // To assign theme classes
}

interface TextElement {
  text: string;
  x: number;
  y: number;
  // color: string; // Handled by CSS Variables
  fontSize: number;
  opacity: number;
  animationDuration: number;
  rotation: number;
  className: string; // To assign theme classes
}

interface GlitchState {
  paths: Path[];
  noise: NoiseDot[];
  textElements: TextElement[];
  spiralRotation: number;
}

interface GlitchAnimationProps {
  width?: string;
  height?: string;
  className?: string; // For additional container styling
}

const GlitchAnimation: React.FC<GlitchAnimationProps> = ({
  width = '100%',
  height = '300px', // Adjusted default height slightly
  className = ''
}) => {
  const [glitchState, setGlitchState] = useState<GlitchState>({
    paths: [],
    noise: [],
    textElements: [],
    spiralRotation: 0
  });

  // Generate spiral path points (remains the same)
  const generateSpiralPoints = (
    centerX: number,
    centerY: number,
    spins: number,
    pointCount: number
  ): string => {
    let points = '';
    const a = 0.5; // Growth factor adjustment might be needed
    const maxRadius = 45; // Maximum spiral radius adjusted

    for (let i = 0; i < pointCount; i++) {
      const t = (i / (pointCount - 1)) * spins * Math.PI * 2;
      // Logarithmic spiral for potentially tighter center: r = a * exp(b * t)
      // Using simpler Archimedean spiral: r = a * t
      const radius = Math.min(a * t, maxRadius); 
      const x = centerX + radius * Math.cos(t);
      const y = centerY + radius * Math.sin(t);
      points += `${x.toFixed(2)},${y.toFixed(2)} `;
    }

    return points.trim();
  };

  // Generate random glitch elements
  const generateGlitchElements = useCallback(() => {
    // Generate spiral paths
    const paths: Path[] = [];
    const numPaths = 3 + Math.floor(Math.random() * 3); // Slightly more paths

    // Main spirals - Use CSS variables for color via className
    for (let i = 0; i < numPaths; i++) {
        const isPrimary = i % 2 === 0;
        paths.push({
            points: generateSpiralPoints(
                50 + (Math.random() - 0.5) * 10, // Center variation
                50 + (Math.random() - 0.5) * 10, // Center variation
                2 + Math.random() * 3,
                40 + Math.floor(Math.random() * 20) // Point variation
            ),
            // No color here, use CSS
            opacity: isPrimary ? (0.5 + Math.random() * 0.4) : (0.3 + Math.random() * 0.3),
            animationDuration: 10 + Math.random() * 15,
            strokeWidth: isPrimary ? (1 + Math.random() * 1) : (0.5 + Math.random() * 0.8),
            className: isPrimary ? 'glitch-path-primary' : 'glitch-path-secondary'
        });
    }


    // Generate noise dots for starfield effect - Use CSS variables for color via className
    const numNoise = 50 + Math.floor(Math.random() * 30); // More noise dots
    const noise: NoiseDot[] = [];

    for (let i = 0; i < numNoise; i++) {
      const type = Math.random();
      noise.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        radius: 0.2 + Math.random() * 0.8, // Smaller dots overall
        // No color here, use CSS
        opacity: 0.3 + Math.random() * 0.5,
        animationDuration: 4 + Math.random() * 8,
        className: type < 0.6 ? 'noise-primary' : (type < 0.9 ? 'noise-secondary' : 'noise-accent') // Assign classes for different colors
      });
    }

    // Generate glitch text elements - Use CSS variables for color via className
    const texts = [
      'follow', 'rabbit', 'hole', 'down', 'deeper', 'wonder',
      'curious', 'fall', 'endless', 'dive', 'descend', '?', '!',
      'madness', 'spiral', 'vortex', 'abyss', 'late!', 'time'
    ];
    const numTexts = 5 + Math.floor(Math.random() * 4); // More text elements
    const textElements: TextElement[] = [];

    for (let i = 0; i < numTexts; i++) {
      const textIndex = Math.floor(Math.random() * texts.length);
      const distanceFromCenter = 15 + Math.random() * 35; // Wider distribution
      const angle = Math.random() * Math.PI * 2;
      const x = 50 + Math.cos(angle) * distanceFromCenter;
      const y = 50 + Math.sin(angle) * distanceFromCenter;
      const type = Math.random();

      textElements.push({
        text: texts[textIndex],
        x,
        y,
        // No color here, use CSS
        fontSize: 5 + Math.random() * 6, // Slightly smaller text
        opacity: 0.4 + Math.random() * 0.4,
        animationDuration: 5 + Math.random() * 7, // Faster text glitch
        rotation: -45 + Math.random() * 90, // Wider rotation
        className: type < 0.6 ? 'text-primary' : 'text-secondary' // Assign classes for different colors
      });
    }

    const spiralRotation = Math.random() * 360;

    setGlitchState({ paths, noise, textElements, spiralRotation });
  }, []);

  useEffect(() => {
    generateGlitchElements();

    // Regenerate elements every 10 seconds
    const interval = setInterval(() => {
      generateGlitchElements();
    }, 10000); // Slightly faster refresh

    return () => clearInterval(interval);
  }, [generateGlitchElements]);

  return (
    <div className={`glitch-animation-container ${className}`}
      style={{
        width,
        height,
        position: 'relative', // Keep relative unless used as fixed overlay
        overflow: 'hidden', // Important with 'slice'
        // Removed border-radius, add via className if needed
        // Example: add 'rounded-lg' if using Tailwind
        // backgroundColor: 'var(--bg-fallback, black)', // Fallback color
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice" // Cover and slice, no distortion
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'block', // Prevents small gap below SVG
        //   filter: 'drop-shadow(0 0 3px var(--glow-color-soft))' // Subtle glow on whole SVG
        }}
      >
        {/* Definitions for Gradients and Filters */}
        <defs>
          <radialGradient id="vortexGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            {/* Use CSS Variables for stops */}
            <stop offset="0%" stopColor="var(--bg-center)" stopOpacity="0.95" />
            <stop offset="30%" stopColor="var(--bg-mid)" stopOpacity="0.85" />
            <stop offset="70%" stopColor="var(--bg-outer)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--bg-edge)" stopOpacity="1" />
          </radialGradient>

          {/* Filter for the glow effect */}
          <filter id="elementGlow" x="-50%" y="-50%" width="200%" height="200%">
             {/* Blur more for a softer glow */}
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" /> 
            <feMerge>
                <feMergeNode in="coloredBlur"/> 
                {/* Keep original sharp graphic on top */}
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>

        {/* Dark vortex background */}
        <rect width="100" height="100" fill="url(#vortexGradient)" />

        {/* Animated spiral base */}
        <g style={{
          // Slower, smoother rotation for the base
          animation: `rotateBase ${25 + Math.random() * 15}s infinite linear`, 
          transformOrigin: 'center',
          transform: `rotate(${glitchState.spiralRotation}deg)`
        }}>
          <path
            d={`M 50,50 ${generateSpiralPoints(50, 50, 5, 100)}`}
            stroke="var(--spiral-base-primary)" // Use CSS Variable
            strokeWidth="0.3" // Thinner base
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M 50,50 ${generateSpiralPoints(50, 50, 4, 80)}`}
            stroke="var(--spiral-base-secondary)" // Use CSS Variable
            strokeWidth="0.2" // Thinner base
            fill="none"
            strokeLinecap="round"
            style={{
              animation: 'dashOffset 25s infinite linear'
            }}
          />
        </g>

        {/* Glitch Paths */}
        {glitchState.paths.map((path, index) => (
          <polyline
            key={`path-${index}`}
            points={path.points}
            // stroke handled by className
            className={path.className} // Assign class for color
            strokeWidth={path.strokeWidth}
            fill="none"
            strokeOpacity={path.opacity}
            filter="url(#elementGlow)" // Apply glow filter
            style={{
              animation: `glitchPath ${path.animationDuration}s infinite alternate ease-in-out`,
            }}
          />
        ))}

        {/* Noise Dots - starfield effect */}
        {glitchState.noise.map((dot, index) => (
          <circle
            key={`noise-${index}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.radius}
            // fill handled by className
            className={dot.className} // Assign class for color
            fillOpacity={dot.opacity}
           // filter="url(#elementGlow)" // Glow might be too much on tiny dots
            style={{
              animation: `glitchNoise ${dot.animationDuration}s infinite alternate`,
            }}
          />
        ))}

        {/* UPDATED Rabbit silhouette - More recognizable head/ears */}
        <g transform="translate(0, 5)"> {/* Move rabbit slightly down */}
            <path
                // A more distinct rabbit head/ears shape
                d="M 50 35 Q 48 32 47 35 T 45 38 Q 43 40 45 45 L 45 58 Q 45 62 48 62 H 52 Q 55 62 55 58 L 55 45 Q 57 40 55 38 T 53 35 Q 52 32 50 35 Z M 48 30 Q 48 25 50 25 T 52 30 Z M 52 30 Q 52 25 50 25 T 48 30 Z"
                fill="var(--rabbit-fill)" // Use CSS Variable
                stroke="var(--rabbit-stroke)" // Use CSS Variable
                strokeWidth="0.3"
                filter="url(#elementGlow)"
                style={{
                    animation: 'rabbitGlitch 12s infinite alternate ease-in-out',
                    transformOrigin: '50px 48px', // Center of the new shape approx
                }}
            />
        </g>

        {/* Alice silhouette falling - slightly improved path */}
        <path
          // A slightly more defined 'dress' shape
          d="M 50 75 C 47 75 46 78 46 80 L 47 88 Q 50 92 53 88 L 54 80 C 54 78 53 75 50 75 Z" 
          fill="var(--alice-fill)" // Use CSS Variable
          opacity="0.6" // Slightly more visible
          style={{
            animation: 'aliceFall 18s infinite linear', // Slower fall
            transformOrigin: 'center',
          }}
        />

        {/* Glitch Text Elements */}
        {glitchState.textElements.map((textElement, index) => (
          <text
            key={`text-${index}`}
            x={textElement.x}
            y={textElement.y}
            // fill handled by className
            className={textElement.className} // Assign class for color
            fontSize={textElement.fontSize}
            opacity={textElement.opacity}
            filter="url(#elementGlow)" // Add glow to text too
            style={{
              animation: `textGlitch ${textElement.animationDuration}s infinite alternate ease-in-out`,
              fontFamily: "'Courier New', Courier, monospace", // Thematic font
              transform: `rotate(${textElement.rotation}deg)`,
              transformOrigin: `${textElement.x}px ${textElement.y}px`,
              paintOrder: 'stroke', // Ensure stroke is behind fill if needed
              strokeWidth: '0.1', // Optional thin stroke for definition
              stroke: 'var(--text-stroke)',
              textAnchor: 'middle', // Center text horizontally
              dominantBaseline: 'middle' // Center text vertically
            }}
          >
            {textElement.text}
          </text>
        ))}
      </svg>

      {/* CSS for animations and THEME COLORS */}
      <style jsx global>{`
        :root {
          /* Light Theme Colors (Defaults) */
          --bg-fallback: #eeeeff;
          --bg-center: #f0f0ff;
          --bg-mid: #dadaf5;
          --bg-outer: #c0c0e0;
          --bg-edge: #a0a0cc;
          --spiral-base-primary: rgba(50, 50, 100, 0.2);
          --spiral-base-secondary: rgba(100, 50, 100, 0.15);
          --primary-color: #3a3a8a; /* Dark blue/purple */
          --secondary-color: #8a3a8a; /* Dark magenta */
          --accent-color: #505050;  /* Grey for some noise */
          --text-color-primary: #2d2d5e;
          --text-color-secondary: #5e2d5e;
          --text-stroke: rgba(250, 250, 255, 0.5); /* Light stroke for contrast */
          --rabbit-fill: rgba(60, 60, 90, 0.5);
          --rabbit-stroke: rgba(30, 30, 60, 0.7);
          --alice-fill: rgba(100, 100, 150, 0.3);
          --glow-color-soft: rgba(100, 100, 200, 0.3);
        }

        @media (prefers-color-scheme: dark) {
          :root {
            /* Dark Theme Colors */
            --bg-fallback: #0a0b13;
            --bg-center: #141625;
            --bg-mid: #1d2038;
            --bg-outer: #0a0b13;
            --bg-edge: #000000;
            --spiral-base-primary: rgba(127, 90, 240, 0.15); /* Original purple */
            --spiral-base-secondary: rgba(229, 49, 112, 0.1); /* Original pink */
            --primary-color: #7f5af0; /* Bright Purple */
            --secondary-color: #e53170; /* Bright Pink */
            --accent-color: #ffffff; /* White for some noise */
            --text-color-primary: rgba(127, 90, 240, 0.8);
            --text-color-secondary: rgba(229, 49, 112, 0.8);
            --text-stroke: rgba(0, 0, 0, 0.5); /* Dark stroke */
            --rabbit-fill: rgba(200, 200, 220, 0.15); /* Ghostly white */
            --rabbit-stroke: rgba(220, 220, 240, 0.3);
            --alice-fill: rgba(200, 200, 220, 0.1); /* Very faint */
            --glow-color-soft: rgba(127, 90, 240, 0.3);
          }
        }

       /* Assign theme colors to elements using classes */
        .glitch-path-primary { stroke: var(--primary-color); }
        .glitch-path-secondary { stroke: var(--secondary-color); }
        
        .noise-primary { fill: var(--primary-color); }
        .noise-secondary { fill: var(--secondary-color); }
        .noise-accent { fill: var(--accent-color); }
        
        .text-primary { fill: var(--text-color-primary); }
        .text-secondary { fill: var(--text-color-secondary); }

        /* Animations (Mostly unchanged, adjusted timings/intensity) */
        @keyframes rotateBase { /* Renamed from rotateSlow */
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes dashOffset {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1000; } /* Negative makes it feel like drawing in */
        }

        @keyframes glitchPath {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          10% { transform: translate(-0.5px, 0.5px); opacity: 0.6; }
          30% { transform: translate(0.5px, -0.5px); opacity: 0.9; }
          50% { transform: translate(-0.8px, -0.2px); opacity: 0.5; }
          70% { transform: translate(0.2px, 0.8px); opacity: 0.7; }
          90% { transform: translate(-0.3px, 0.3px); opacity: 1.0; }
        }

        @keyframes glitchNoise {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.1);}
          25% { transform: translate(1px, -1px) scale(1); }
          75% { transform: translate(-1px, 1px) scale(0.8); }
        }

        @keyframes textGlitch {
           0%, 100% { opacity: 0.6; transform: skewX(0deg) rotate(${Math.random() * 10 - 5}deg); }
           25% { opacity: 0.9; transform: skewX(-2deg) translate(-1px, 1px) rotate(${Math.random() * 10 - 5}deg); }
           50% { opacity: 0.4; transform: skewX(0deg) translate(0.5px, -0.5px) rotate(${Math.random() * 10 - 5}deg); }
           75% { opacity: 0.8; transform: skewX(2deg) translate(1px, 0px) rotate(${Math.random() * 10 - 5}deg); }
        }

        @keyframes rabbitGlitch {
          0%, 85%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          90% { transform: scale(1.05) rotate(-2deg); opacity: 1; filter: brightness(1.2); }
          95% { transform: scale(0.98) rotate(3deg); opacity: 0.7; filter: brightness(0.9); }
        }

        @keyframes aliceFall {
          0% { transform: translateY(-80px) rotate(-10deg) scale(0.8); opacity: 0; }
          10% { opacity: var(--alice-opacity, 0.1); } /* Use variable for opacity too */
          90% { opacity: var(--alice-opacity, 0.1); }
          100% { transform: translateY(80px) rotate(10deg) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default GlitchAnimation;