
import React from 'react';
import { X, Mail, Twitter, Linkedin, Globe } from 'lucide-react';
import { RESUME } from '../data/resume';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
       <div 
         className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl transition-opacity duration-500" 
         onClick={onClose}
       />
       
       <div className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-[#111] rounded-3xl shadow-2xl flex overflow-hidden animate-[fadeIn_0.4s_ease-out] border border-gray-200 dark:border-gray-800">
          
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:rotate-90 transition-transform duration-300"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row w-full h-full">
            
            {/* Left Column: Image & Quick Info */}
            <div className="w-full md:w-1/3 h-64 md:h-full relative bg-gray-100 dark:bg-gray-900">
               <img 
                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                 alt={RESUME.personal.name} 
                 className="w-full h-full object-cover grayscale opacity-90"
               />
               <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-2xl font-bold">{RESUME.personal.name}</h3>
                  <p className="text-white/70">Mumbai, India</p>
               </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-2/3 h-full overflow-y-auto p-8 md:p-16 bg-white dark:bg-[#111]">
                
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black dark:text-white leading-tight">
                        Building thoughtful pathways from <span className="text-accent">'What if?'</span> to <span className="text-accent">'What is'</span>.
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                        <p>
                            I am an {RESUME.personal.department} student at {RESUME.personal.institute} (Class of {RESUME.personal.graduationYear}). My work focuses on designing interactions that make curiosity the only interface you need.
                        </p>
                        <p>
                           From developing novel Mixed Reality interaction models to designing ergonomic interfaces for ride-hailing apps, I bridge the gap between rigorous research and tangible, human-centric solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 border-t border-gray-200 dark:border-gray-800 pt-12">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Expertise</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Interaction Design</li>
                                <li>Mixed Reality (AR/VR)</li>
                                <li>User Research</li>
                                <li>Prototyping</li>
                                <li>System Design</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Connect</h4>
                            <div className="flex gap-4">
                                <a href={`mailto:hello@${RESUME.personal.portfolio}`} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white transition-colors">
                                    <Mail size={20} />
                                </a>
                                <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                <a href={`https://${RESUME.personal.portfolio}`} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white transition-colors">
                                    <Globe size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Current Status</h4>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-black dark:text-white font-medium">Open to opportunities</span>
                        </div>
                    </div>

                </div>

            </div>
          </div>
       </div>
    </div>
  );
};

export default AboutModal;
