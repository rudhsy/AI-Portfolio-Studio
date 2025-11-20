import React, { useEffect, useRef } from 'react';
import { Project } from '../types';
import { X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      
      // Slide up animation
      gsap.fromTo(modalRef.current, 
        { y: '100%' },
        { y: '0%', duration: 0.8, ease: 'power4.out' }
      );

      // Reset scroll
      if(scrollRef.current) scrollRef.current.scrollTop = 0;

    } else {
      document.body.style.overflow = '';
    }
  }, [project]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: '100%',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: onClose
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current || !coverRef.current) return;
    const scrollY = scrollRef.current.scrollTop;
    // Simple parallax on cover
    coverRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
  };

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-500" 
        onClick={handleClose} 
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full h-full bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-2xl flex flex-col pointer-events-auto"
      >
        
        {/* Floating Close Button */}
        <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md hover:scale-110 transition-transform text-black dark:text-white border border-white/20 shadow-lg"
        >
            <X size={24} />
        </button>

        {/* Scrollable Area */}
        <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto no-scrollbar scroll-smooth"
            onScroll={handleScroll}
        >
           
           {/* Hero Section (Parallax) */}
           <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
              <div 
                ref={coverRef}
                className="w-full h-full absolute top-0 left-0"
                style={{ background: project.coverImageGradient }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0A0A0A]"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                 <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-black text-black dark:text-white mb-4 tracking-tighter leading-none">
                        {project.title}
                    </h1>
                 </div>
              </div>
           </div>

           {/* Project Details Strip */}
           <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-900 sticky top-0 z-40 px-8 md:px-16 py-6">
              <div className="max-w-7xl mx-auto flex flex-wrap gap-8 justify-between items-center">
                  <div className="flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <div>
                          <span className="block text-xs text-gray-300 dark:text-gray-600 mb-1">Role</span>
                          {project.role}
                      </div>
                      <div>
                          <span className="block text-xs text-gray-300 dark:text-gray-600 mb-1">Year</span>
                          {project.year}
                      </div>
                      <div>
                          <span className="block text-xs text-gray-300 dark:text-gray-600 mb-1">Category</span>
                          {project.category}
                      </div>
                  </div>
                  
                  <button className="px-6 py-2 bg-accent text-white rounded-full font-semibold hover:bg-accent-dark transition-colors flex items-center gap-2 text-sm">
                      Visit Live Site <ArrowUpRight size={14} />
                  </button>
              </div>
           </div>

           {/* Case Study Content */}
           <div className="bg-white dark:bg-[#0A0A0A] p-8 md:p-16 min-h-screen">
               <div className="max-w-7xl mx-auto space-y-20">
                    
                    <div className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed max-w-4xl">
                        {project.shortDescription}
                    </div>

                    {project.caseStudy.map((block, idx) => (
                        <div key={idx} className="space-y-6">
                            {block.type === 'text' && (
                                <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl">
                                    <div className="w-12 h-[1px] bg-accent mt-4 hidden md:block"></div>
                                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-loose font-light flex-1">
                                        {block.content}
                                    </p>
                                </div>
                            )}
                            {block.type === 'image' && (
                                <div className="group w-full">
                                    <div 
                                      className="overflow-hidden rounded-xl shadow-2xl bg-gray-100 dark:bg-gray-900 transform-gpu"
                                    >
                                        <img 
                                            src={block.content} 
                                            alt={block.caption || "Project shot"} 
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    {block.caption && (
                                        <p className="text-sm text-gray-400 mt-4 text-center font-mono uppercase tracking-wider">
                                            — {block.caption}
                                        </p>
                                    )}
                                </div>
                            )}
                            {block.type === 'video' && (
                                <div className="rounded-xl overflow-hidden shadow-2xl w-full">
                                    <video 
                                        src={block.content} 
                                        autoPlay 
                                        muted 
                                        loop 
                                        playsInline
                                        className="w-full h-auto"
                                    />
                                </div>
                            )}
                        </div>
                    ))}

               </div>
               
               {/* Footer in Modal */}
               <div className="max-w-4xl mx-auto mt-32 pt-12 border-t border-gray-100 dark:border-gray-900 text-center">
                   <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Thanks for watching!</h3>
                   <button 
                     onClick={handleClose}
                     className="text-accent hover:text-accent-dark underline underline-offset-4"
                   >
                       Back to Projects
                   </button>
               </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;