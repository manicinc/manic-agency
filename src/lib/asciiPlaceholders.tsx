// src/lib/asciiPlaceholders.ts
import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { AsciiPlaceholderProps } from '@/types/blog';

const placeholders = [
  // ... (keep your array of ASCII art strings) ...
  `
        ̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___
     <(_ _)> Burning the midnight oil...
      | |   Ideas loading...
     _| |_  Vibes initializing...
  `,

`██▓▒░░ERROR░▒▓██
  ▓██▒▒░SYS.FAULT░▒▒██▓
 ░▒▓█▓▒░REBOOT?░▒▓█▓▒░
  ▒░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░
   ▓█▓▒░▒▓████▓▒░▒▓█▓ 
    ▒▓▒░▒▓████▓▒░▒▓▒  Signal integrity low...
     ░▒░▒▓████▓▒░▒░   Recalibrating reality matrix...
      ░░▒▓████▓▒░░    Please stand by... fragments incoming...
        ▒▓█▓█▓▒
         ▒▓█▓▒
          ▒▓▒
           ░`,

           `<---> [node] <--->
      /     \ /     \ /     \
 [node]-----(core)-----[node]   Synaptic pathways firing...
      \     / \     / \     /
       <---> [node] <--->     Processing complex thought...
        | \   / | \   / |
       (*) ---(*) ---(*)      Idea crystallizing... maybe...
        | /   \ | /   \ |
     [branch] [branch] [branch]  Memory access... fragmented...`,

     `.--""--.
       /        \
      |  O  //  |     Observing the observer...
      \   ==    /     Gaze protocols active...
       '.____.'      Reflection analysis running...
      / |    | \     What does the Meat Interface see?
     |  |____|  | 
     \  (____)  /
      '.______.'
      / _.__._ \
     | / \__/ \ |
     \(________)/`,

     `~~~~~//~~~~~
     ~/~\~/~\~/~\~    Fluctuating energy levels detected...
    ~// (*) \\ //~   Vibrational alignment sequence...
   ~/~\ \_/ /~\ /~   WARNING: High strangeness field...
  ~//~ (___) ~\\~    Tune in carefully...
 ~/~\~/~ | ~ \~/~\~
 ~~~~ --(+)-- ~~~~   Amplifying the weird...`,

 `+-------[ENTRY]-------+
   |  +---+  |  +---+  |   Navigating the code labyrinth...
   |  |   |  |  |   |  |
   +--+   +--X--+   +--+   Dead ends encountered...
   |  |   |  |  |   |  |
   |  +---+  |  +---+  |   Searching for the core loop...
   X--[TRAP?]--+--[EXIT?]-X
   |  +---+  |  +---+  |   Logic pathways rerouting...
   |  |   |  |  |   |  |
   +--+   +--+--+   +--+   Hold tight... maybe...
      |___________|`,

      `_________
       /         \
      /   _____   \
     /   / ___ \   \    Approaching the singularity...
    |   | / _ \ |   |   Reality bending...
    |   | \_/ | |   |
    \   \ --- /   /     Information density increasing...
     \   -----   /
      \_________/      Hold onto your axioms...
     /___________\ 
    <------------->
     \___________/
      . . . . .      Signal lost? Or found?`,

      `. * .
       .' .*. '.      Data points converging...
      / .*.*.*. \     Pattern emerging from noise...
     *..*..*..*..* Conceptual fragments aligning...
     :\ .*.*.*. /:
      '. '.*. .'      Insight forming... possibly sharp...
       * ' * ' * / \ / \ / \
     +---+---+---+     Stand by for synthesis...`,
  `
       _______
     _/       \\_
    / |       | \\      Manic energy detected...
   |  |_______|  |
   \\_/_______\\_/      Stand by for transmission...
       |     |
      /|\\   /|\\
     /_|_\\ /_|_\\
  `,
   // ... include all your other placeholder strings ...
];

// Keep the random function, but it will be called in useEffect now
function getRandomAsciiArt(): string {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
}

// --- UPDATED COMPONENT ---
export const AsciiArtPlaceholder: React.FC<AsciiPlaceholderProps> = ({ className = '', width = '100%', height = '200px' }) => {
  // State to hold the art, initially null or empty
  const [art, setArt] = useState<string | null>(null);

  // useEffect runs only on the client, after the initial render/hydration
  useEffect(() => {
    // Select random art *after* mounting
    setArt(getRandomAsciiArt());
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render a consistent placeholder (or null) during SSR and initial hydration
  // Only render the actual art once the effect has run and updated the state
  if (art === null) {
     // You can return null or a simple placeholder div while loading client-side
     return (
         <div
            className={`ascii-placeholder loading ${className}`}
            style={{ width, height, border: '1px dashed rgba(255, 255, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(30, 25, 40, 0.5)' }}
            aria-hidden="true"
         >
            {/* Optional: Loading indicator */}
            <span style={{fontSize: '0.8em', color: '#aaa5c5', opacity: 0.5}}>Loading vibe...</span>
         </div>
     );
  }

  // Render the actual art once state is set on the client
  return (
    <div
      className={`ascii-placeholder ${className}`}
      style={{
        width, height, display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden',
        border: '1px dashed rgba(255, 255, 255, 0.2)',
        borderRadius: '10px', background: 'rgba(30, 25, 40, 0.5)',
      }}
      aria-hidden="true"
    >
      <pre style={{ margin: 0, fontSize: '0.8em', color: '#aaa5c5', textAlign: 'center', lineHeight: '1.4' }}>
        {art}
      </pre>
    </div>
  );
};