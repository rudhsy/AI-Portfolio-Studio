
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ThemeToggle from './components/ThemeToggle';
import ProjectModal from './components/ProjectModal';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import AmbientBackground from './components/AmbientBackground';
import { Project } from './types';
import gsap from 'gsap';

type ViewState = 'home' | 'about' | 'resume';

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    // Page load animation
    gsap.to('.main-wrapper', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.1
    });
  }, []);

  // Handle View Transitions
  const handleChangeView = (newView: ViewState) => {
    if (newView === currentView) return;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simple transition out
    gsap.to('.content-container', {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
            setCurrentView(newView);
            // Transition in
            gsap.fromTo('.content-container', 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    });
  };

  return (
    <ThemeProvider>
      <main className="main-wrapper opacity-0 relative min-h-screen w-full overflow-x-hidden bg-light dark:bg-dark transition-colors duration-500 selection:bg-accent selection:text-white">
        
        {/* Global Ambient Background */}
        <AmbientBackground />

        {/* UI Layer */}
        <ThemeToggle />
        <Navbar 
          currentView={currentView}
          onChangeView={handleChangeView}
        />

        {/* Content Layer */}
        <div className="content-container relative z-10">
            {currentView === 'home' && (
                <>
                    <Hero />
                    <ProjectGrid onProjectClick={setActiveProject} />
                </>
            )}
            
            {currentView === 'about' && (
                <AboutPage />
            )}

            {currentView === 'resume' && (
                <ResumePage />
            )}
        </div>
        
        {/* Footer */}
        <footer className="relative z-10 py-12 text-center text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600 border-t border-gray-200 dark:border-gray-900 mt-auto bg-white/30 dark:bg-black/30 backdrop-blur-sm">
           <p>Made with ❤️ by Anirudh and AI Studio</p>
        </footer>

        {/* Modals */}
        <ProjectModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />

      </main>
    </ThemeProvider>
  );
};

export default App;
