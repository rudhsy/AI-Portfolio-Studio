
import React from 'react';
import { clsx } from 'clsx';
import gsap from 'gsap';

interface NavbarProps {
  currentView: string;
  onChangeView: (view: 'home' | 'about' | 'resume') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
     gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  // Helper for button classes
  const getButtonClasses = (isActive: boolean) => clsx(
    "px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border border-transparent",
    isActive 
      ? "bg-accent text-white shadow-lg shadow-accent/25" 
      : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5"
  );

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <nav className="glass-panel rounded-full p-1.5 shadow-2xl flex items-center gap-1 border border-white/40 dark:border-white/10 bg-white/70 dark:bg-black/60 backdrop-blur-xl">
        <button 
          onClick={() => onChangeView('home')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={getButtonClasses(currentView === 'home')}
        >
          Work
        </button>
        
        <button 
          onClick={() => onChangeView('about')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={getButtonClasses(currentView === 'about')}
        >
          About
        </button>

        <button 
          onClick={() => onChangeView('resume')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={getButtonClasses(currentView === 'resume')}
        >
          Resume
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
