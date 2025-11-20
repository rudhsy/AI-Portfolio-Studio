
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const SKILLS = [
  "XR Design",
  "Game Design",
  "UX Design",
  "System Design",
  "Visual Design"
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Randomize rotation for sticker effect (initial state)
      gsap.set(".skill-capsule", {
        rotation: () => (Math.random() * 10) - 5 
      });

      // Stagger entrance animation
      gsap.fromTo(".skill-capsule",
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "elastic.out(1, 0.75)",
          delay: 0.2
        }
      );

      // Organic Floating Animation for inner content
      // This runs independently of the drag wrapper
      const inners = gsap.utils.toArray<HTMLElement>(".skill-inner");
      inners.forEach((inner) => {
        gsap.to(inner, {
          y: `-=${8 + Math.random() * 8}`, // Move up and down
          x: `+=${Math.random() * 10 - 5}`, // Drift left/right
          rotation: Math.random() * 6 - 3,  // Slight rotation
          duration: 2 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2 // Random start time
        });
      });

      // Make skills draggable
      Draggable.create(".skill-capsule", {
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
        onDragStart: function() {
          gsap.to(this.target, { scale: 1.1, zIndex: 50, duration: 0.2 });
        },
        onDragEnd: function() {
          gsap.to(this.target, { scale: 1, zIndex: 1, duration: 0.2 });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[45vh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-8 md:pt-40 md:pb-12">
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-[90rem] px-4">
        
        {/* Title */}
        <h1 
          className="text-7xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter text-black dark:text-white mb-6 text-center select-none leading-[0.9] pb-2"
        >
          <span className="text-black dark:text-white filter drop-shadow-sm">
            ANIRUDH A.
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.8em] text-gray-500 dark:text-gray-400 select-none pl-[0.8em]">
            Interaction Designer
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 mt-6"></div>
        </div>

        {/* Skills Capsules / Stickers */}
        <div className="flex flex-wrap justify-center gap-5 relative">
          {SKILLS.map((skill, idx) => (
            <div 
              key={idx}
              className="skill-capsule cursor-grab active:cursor-grabbing relative group"
            >
              <div className="skill-inner px-6 py-3 rounded-full border border-white/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 select-none group-hover:text-black dark:group-hover:text-white transition-colors">
                  {skill}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Hero;
