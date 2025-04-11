import React, { useState, useEffect } from 'react';

// Expanded set of ASCII placeholders with rabbit hole and sci-fi themes
const placeholders = [
  `
        ̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___
     <(_ _)> Summoning the muse...
      | |   Loading chaotic wonders...
     _| |_  Rabbit hole initialized...
  `,

`██▓▒░░WONDER░▒▓██
  ▓██▒▒░MATRIX░▒▒██▓
 ░▒▓█▓▒░LOADING░▒▓█▓▒░
  ▒░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░
   ▓█▓▒░▒▓████▓▒░▒▓█▓ 
    ▒▓▒░▒▓████▓▒░▒▓▒  Initializing neural interface...
     ░▒░▒▓████▓▒░▒░   Unfolding reality matrix...
      ░░▒▓████▓▒░░    Synchronizing fragments...
        ▒▓█▓█▓▒
         ▒▓█▓▒
          ▒▓▒
           ░`,

           `<---> [node] <--->
      /     \\ /     \\ /     \\
 [node]-----(core)-----[node]   Synaptic pathways forming...
      \\     / \\     / \\     /
       <---> [node] <--->     Complex thought unfolding...
        | \\   / | \\   / |
       (*) ---(*) ---(*)      Memories crystallizing...
        | /   \\ | /   \\ |
     [branch] [branch] [branch]  Follow the white rabbit...`,

     `.--""--.
       /        \\
      |  O  //  |     The looking glass reveals...
      \\   ==    /     Gaze protocols active...
       '.____.'      Reflection in progress...
      / |    | \\     What does the rabbit see?
     |  |____|  | 
     \\  (____)  /
      '.______.'
      / _.__._ \\
     | / \\__/ \\ |
     \\(________)/`,

     `~~~~~//~~~~~
     ~/~\\~/~\\~/~\\~    Reality bandwidth fluctuating...
    ~// (*) \\\\ //~   Dimensional gates aligning...
   ~/~\\ \\_/ /~\\ /~   High strangeness detected...
  ~//~ (___) ~\\\\~    Tune in... drop out...
 ~/~\\~/~ | ~ \\~/~\\~
 ~~~~ --(+)-- ~~~~   Amplifying the weird...`,

 `+-------[ENTRY]-------+
   |  +---+  |  +---+  |   Navigating the labyrinth...
   |  |   |  |  |   |  |
   +--+   +--X--+   +--+   Dead ends encountered...
   |  |   |  |  |   |  |
   |  +---+  |  +---+  |   Following white rabbits...
   X--[TRAP?]--+--[EXIT?]-X
   |  +---+  |  +---+  |   Rerouting neural pathways...
   |  |   |  |  |   |  |
   +--+   +--+--+   +--+   Falling through realities...
      |___________|`,

      `_________
       /         \\
      /   _____   \\
     /   / ___ \\   \\    Approaching the singularity...
    |   | / _ \\ |   |   Reality bending inward...
    |   | \\_/ | |   |
    \\   \\ --- /   /     Information density increasing...
     \\   -----   /
      \\_________/      The rabbit hole deepens...
     /___________\\ 
    <------------->
     \\___________/
      . . . . .     Do not adjust your perception...`,

      `. * .
       .' .*. '.      Data points converging...
      / .*.*.*. \\     Patterns emerging from chaos...
     *..*..*..*..* Conceptual fragments aligning...
     :\\ .*.*.*. /:
      '. '.*. .'      Portal materializing...
       * ' * ' * / \\ / \\ / \\
     +---+---+---+    Finding the white rabbit...`,
  `
       _______
     _/       \\_
    / |       | \\      Mad hatter transmission...
   |  |_______|  |
   \\_/_______\\_/      Teatime in wonderland...
       |     |
      /|\\   /|\\
     /_|_\\ /_|_\\      Down we go...
  `,
  
  `
  /\\__/\\
 / o  o \\    Through the rabbit hole...
(    -   )
 \\  __  /     Deeper still...
  (____)/      
  /    \\       The white rabbit beckons...
 /______\\
/________\\     Curiouser and curiouser...`,

`
          ∩
         ('\\    \\\\
        /  \\    ) \\
       /|_|\\   /  /
      /_/_\\_\\  /  /        The rabbit runs ahead...
      )     (_/  /         Mad ideas this way...
      |        | /          
      |________|/           Choose the red pill...
      |_|____|_|
      (_)    (_)
`,

`
     ___     ___
    /   \\~~~/   \\    
   |     o o     |   Tea party loading...
    \\___/~|~\\___/
        \\__/        Dreams and madness...
      _|____|_
     |________|      Wonderland manifesting...
       |_||_|
       |_||_|        Time is but a construct...
`,

`
|\\__/,|   (\\ 
|_ _  |.--.) )   Cheshire cat grinning...
( T   )     /    
(((^_(((/(((_/   Reality's just a smile...
`
];

// Get a random ASCII art from the expanded collection
function getRandomAsciiArt(): string {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
}

// Interface for component props
interface AsciiPlaceholderProps {
  className?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  themeOverride?: 'light' | 'dark' | null;
}

// Enhanced ASCII Placeholder Component
export const AsciiArtPlaceholder: React.FC<AsciiPlaceholderProps> = ({ 
  className = '', 
  width = '100%', 
  height = '200px',
  style = {},
  themeOverride = null
}) => {
  // State to hold the selected art
  const [art, setArt] = useState<string | null>(null);
  // State to track theme for dynamic styling
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Effect to select random art and detect theme on mount
  useEffect(() => {
    // Select random ASCII art
    setArt(getRandomAsciiArt());
    
    // Detect theme from document class if not overridden
    if (themeOverride === null) {
      // Default to dark if document element not available (SSR)
      setIsDarkMode(!document.documentElement.classList.contains('light'));
      
      // Set up theme change detection
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            setIsDarkMode(!document.documentElement.classList.contains('light'));
          }
        });
      });
      
      observer.observe(document.documentElement, { attributes: true });
      
      return () => observer.disconnect();
    } else {
      // Use override value if provided
      setIsDarkMode(themeOverride === 'dark');
    }
  }, [themeOverride]);

  // Generate placeholder background dynamically based on theme
  const getPlaceholderStyle = () => {
    const baseStyle: React.CSSProperties = {
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      ...style
    };
    
    if (isDarkMode) {
      return {
        ...baseStyle,
        background: 'rgba(20, 22, 37, 0.7)',
        border: '1px dashed rgba(127, 90, 240, 0.3)',
        boxShadow: '0 4px 15px rgba(10, 11, 19, 0.2), 0 0 10px rgba(127, 90, 240, 0.1)'
      };
    } else {
      return {
        ...baseStyle,
        background: 'rgba(240, 240, 248, 0.7)',
        border: '1px dashed rgba(98, 70, 234, 0.3)',
        boxShadow: '0 4px 15px rgba(20, 22, 37, 0.1)'
      };
    }
  };

  // Generate text style dynamically based on theme
  const getTextStyle = () => {
    if (isDarkMode) {
      return {
        margin: 0,
        fontSize: '0.8em',
        lineHeight: '1.4',
        textAlign: 'center' as const,
        color: 'rgba(127, 90, 240, 0.8)',
        fontFamily: 'monospace',
        textShadow: '0 0 5px rgba(127, 90, 240, 0.3)'
      };
    } else {
      return {
        margin: 0,
        fontSize: '0.8em',
        lineHeight: '1.4',
        textAlign: 'center' as const,
        color: 'rgba(98, 70, 234, 0.8)',
        fontFamily: 'monospace'
      };
    }
  };

  // Loading placeholder when art isn't ready yet
  if (art === null) {
    return (
      <div
        className={`ascii-placeholder loading ${className}`}
        style={getPlaceholderStyle()}
        aria-hidden="true"
      >
        <span style={{ fontSize: '0.8em', opacity: 0.5, color: isDarkMode ? '#aaa5c5' : '#6246ea' }}>
          Loading vibe...
        </span>
      </div>
    );
  }

  // Render the actual ASCII art
  return (
    <div
      className={`ascii-placeholder ${className}`}
      style={getPlaceholderStyle()}
      aria-hidden="true"
    >
      <pre style={getTextStyle()}>
        {art}
      </pre>
    </div>
  );
};

export default AsciiArtPlaceholder;