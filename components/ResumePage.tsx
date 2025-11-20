
import React, { useEffect, useRef } from 'react';
import { RESUME } from '../data/resume';
import { Download, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ResumeItem } from '../types';

const ResumePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".resume-content", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderSectionTitle = (title: string) => (
    <h3 className="flex items-center text-sm font-bold uppercase tracking-[0.15em] text-accent dark:text-accent-dark border-b-2 border-accent/10 dark:border-accent/20 pb-2 mb-6">
      <span className="mr-2 w-2 h-2 bg-accent rounded-full"></span>
      {title}
    </h3>
  );

  const renderResumeItem = (item: ResumeItem, compact = false) => (
    <div key={item.id} className={`group ${compact ? 'mb-4' : 'mb-8'} last:mb-0`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1.5">
        <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-accent transition-colors duration-200">
          {item.title}
        </h4>
        {item.date && (
          <span className="text-xs font-mono font-medium text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded shrink-0 mt-1 sm:mt-0 sm:ml-3">
            {item.date}
          </span>
        )}
      </div>
      
      {item.subtitle && (
        <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 italic">
          {item.subtitle}
        </div>
      )}

      {item.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
          {item.description}
        </p>
      )}

      {item.bullets && (
        <ul className="space-y-1.5 mt-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="text-[0.9rem] text-gray-600 dark:text-gray-400 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent/60">
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full pt-32 pb-20 px-4 md:px-8 overflow-x-hidden overflow-y-auto">
      <div className="max-w-[90rem] mx-auto">
        
        <div className="resume-content w-full max-w-5xl mx-auto bg-white dark:bg-[#111] shadow-2xl border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden relative">
          
          {/* Decorative Top Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-accent via-purple-500 to-blue-500"></div>

          <div className="p-8 md:p-12 lg:p-16">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-12">
               {/* Logo & Name */}
               <div className="flex items-start gap-6">
                 <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white p-1 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png" 
                      alt="IIT Bombay" 
                      className="w-full h-full object-contain"
                    />
                 </div>
                 <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-1">
                      {RESUME.personal.name}
                    </h1>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                      {RESUME.personal.department}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {RESUME.personal.institute}
                    </p>
                 </div>
               </div>

               {/* Personal Details Right */}
               <div className="w-full md:w-auto flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between md:justify-start gap-4">
                    <span className="font-semibold text-gray-900 dark:text-gray-300 w-24">Roll No:</span>
                    <span>{RESUME.personal.rollNo}</span>
                  </div>
                  <div className="flex justify-between md:justify-start gap-4">
                    <span className="font-semibold text-gray-900 dark:text-gray-300 w-24">Program:</span>
                    <span>{RESUME.personal.program}</span>
                  </div>
                  <div className="flex justify-between md:justify-start gap-4">
                    <span className="font-semibold text-gray-900 dark:text-gray-300 w-24">DOB:</span>
                    <span>{RESUME.personal.dob}</span>
                  </div>
                   <a href={`https://${RESUME.personal.portfolio}`} target="_blank" rel="noreferrer" className="flex justify-between md:justify-start gap-4 hover:text-accent transition-colors">
                    <span className="font-semibold text-gray-900 dark:text-gray-300 w-24">Portfolio:</span>
                    <span className="flex items-center gap-1">{RESUME.personal.portfolio} <ExternalLink size={12}/></span>
                  </a>
               </div>
            </div>

            {/* Academic Strip - Styled like a table header */}
            <div className="mb-10 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <div className="bg-gray-100 dark:bg-gray-800 px-6 py-3 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <span>Examination</span>
                    <span className="hidden md:block">University</span>
                    <span className="hidden md:block">Institute</span>
                    <span className="text-right md:text-left">Year</span>
                    <span className="text-right">CPI / %</span>
                </div>
                <div className="bg-white dark:bg-gray-900/30 px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm font-medium text-gray-800 dark:text-gray-200 items-center">
                    <span className="font-bold">Graduation</span>
                    <span className="hidden md:block text-gray-600 dark:text-gray-400">IIT Bombay</span>
                    <span className="hidden md:block text-gray-600 dark:text-gray-400">IIT Bombay</span>
                    <span className="text-right md:text-left">{RESUME.personal.graduationYear}</span>
                    <span className="text-right font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded inline-block w-fit justify-self-end">{RESUME.personal.cpi}</span>
                </div>
            </div>
            
            {/* Tagline Quote */}
            <div className="mb-12 text-center px-4 md:px-12">
               <p className="text-xl md:text-2xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed">
                   "{RESUME.personal.tagline}"
               </p>
            </div>

            {/* Main 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Left Column (Primary Content - 7 cols) */}
              <div className="lg:col-span-7 space-y-10">
                 
                 {/* Key Projects */}
                 <section>
                   {renderSectionTitle("Key Projects")}
                   <div className="pl-2 border-l-2 border-gray-100 dark:border-gray-800 space-y-8">
                      {RESUME.projects.map(p => (
                        <div key={p.id} className="pl-4 -ml-[18px]">
                           {/* Custom bullet for timeline feel */}
                           <div className="absolute w-3 h-3 bg-accent rounded-full mt-1.5 -ml-[23px] ring-4 ring-white dark:ring-[#111]"></div>
                           {renderResumeItem(p)}
                        </div>
                      ))}
                   </div>
                 </section>

                 {/* Work Experience */}
                 <section>
                   {renderSectionTitle("Work Experience")}
                   <div className="pl-2 border-l-2 border-gray-100 dark:border-gray-800 space-y-8">
                      {RESUME.experience.map(e => (
                         <div key={e.id} className="pl-4 -ml-[18px]">
                           <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -ml-[23px] ring-4 ring-white dark:ring-[#111]"></div>
                           {renderResumeItem(e)}
                        </div>
                      ))}
                   </div>
                 </section>
              </div>

              {/* Right Column (Sidebar - 5 cols) */}
              <div className="lg:col-span-5 space-y-10">
                 
                 {/* Positions of Responsibility */}
                 <section className="bg-gray-50 dark:bg-gray-900/20 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/50">
                   {renderSectionTitle("Positions of Responsibility")}
                   <div className="space-y-6">
                      {RESUME.positions.map(p => renderResumeItem(p, true))}
                   </div>
                 </section>

                 {/* Achievements */}
                 <section>
                   {renderSectionTitle("Achievements")}
                   <div className="space-y-6">
                      {RESUME.awards.map(a => renderResumeItem(a, true))}
                   </div>
                 </section>

                 {/* Skills */}
                 <section>
                   {renderSectionTitle("Skills")}
                   <div className="space-y-8">
                      {RESUME.skills.map((skill, idx) => (
                          <div key={idx}>
                              <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3 tracking-wider">
                                  {skill.name}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, i) => (
                                  <span 
                                    key={i} 
                                    className="inline-block px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-accent hover:text-white dark:hover:bg-accent transition-colors cursor-default"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                          </div>
                      ))}
                   </div>
                 </section>

              </div>
            </div>
            
            {/* Footer Action */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                <button 
                  onClick={() => window.print()}
                  className="group flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <Download size={18} className="group-hover:animate-bounce" /> 
                    Download Resume PDF
                </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResumePage;
