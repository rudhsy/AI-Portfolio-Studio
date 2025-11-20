
import React, { useState, useRef } from 'react';
import { PROJECTS } from '../data/cms';
import { Project } from '../types';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProjectGridProps {
  onProjectClick: (project: Project) => void;
}

interface SortableProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

// Reusable Tilt Logic Hook or Component could be here, but inlining for simplicity in this file
const useTilt = (ref: React.RefObject<HTMLDivElement>, active: boolean = true) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !active) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(ref.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center"
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return { handleMouseMove, handleMouseLeave };
};

const SortableProjectCard: React.FC<SortableProjectCardProps> = ({ project, index, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTilt(cardRef, !isDragging);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative aspect-[4/3] cursor-grab active:cursor-grabbing ${isDragging ? 'z-50' : 'z-0'}`}
    >
      {/* Inner Visual Card */}
      {/* NOTE: transformStyle: 'preserve-3d' combined with overflow-hidden on the same element breaks border-radius in some browsers.
          We separate them: Parent does 3D, Child clips content. */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => { if(!isDragging) onClick(); }}
        className={`w-full h-full group relative rounded-3xl transition-shadow duration-500 bg-white dark:bg-gray-900 ${isDragging ? 'opacity-50 ring-4 ring-accent/20' : 'hover:shadow-2xl shadow-sm'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Clipping Container for Background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ transform: 'translateZ(0)' }}>
            {/* Background Gradient */}
            <div 
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: project.coverImageGradient }}
            />
        </div>
        
        {/* Content Overlay - Pops out in 3D */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
           <div className="flex justify-between items-start">
              <span 
                className="text-base font-bold uppercase tracking-widest opacity-70 mix-blend-overlay font-mono" 
                style={{ color: project.textColor }}
              >
                  {(index + 1).toString().padStart(2, '0')}
              </span>
           </div>
  
           <div className="transform group-hover:translate-y-[-4px] transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-2 tracking-tight leading-none" style={{ color: project.textColor }}>
                  {project.title}
              </h3>
              <p className="text-sm font-medium opacity-90 tracking-wide" style={{ color: project.textColor }}>
                  {project.category} — {project.year}
              </p>
           </div>
        </div>
  
        {/* Hover Reveal Button */}
        <div 
            className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20"
            style={{ transform: 'translateZ(30px)' }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
              <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BehanceCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTilt(cardRef);

  return (
    <a 
      href="https://www.behance.net/rudhsy"
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full md:col-span-2 aspect-[2/1] md:aspect-[24/9] cursor-pointer block"
    >
       <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full group relative rounded-3xl transition-all duration-500 bg-white dark:bg-gray-900 hover:shadow-2xl shadow-sm"
        style={{ transformStyle: 'preserve-3d' }}
       >
          {/* Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ transform: 'translateZ(0)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-30 dark:opacity-10" 
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '24px 24px' }} 
              />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black shadow-xl flex items-center justify-center text-black dark:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                 <span className="font-black text-2xl tracking-tighter">Be</span>
              </div>
              <div className="text-center">
                 <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">View more projects on Behance</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                    Full Portfolio <ExternalLink size={12} />
                 </p>
              </div>
          </div>

          {/* Decoration Icon */}
          <div 
            className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ transform: 'translateZ(30px)' }}
          >
             <ArrowUpRight className="text-gray-400 dark:text-gray-500" size={24} />
          </div>

       </div>
    </a>
  );
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectClick }) => {
  const [projects, setProjects] = useState(PROJECTS);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <section id="work" className="py-12 md:py-24 px-4 w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Header & Annotation */}
        <div className="flex justify-between items-end mb-16 relative">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 select-none">
                Selected Works
            </h2>
            
            {/* Handwritten Annotation */}
            <div className="hidden lg:block absolute -top-4 -right-16 z-20 pointer-events-none select-none transform rotate-3">
                <div className="relative flex flex-col items-start">
                    <p 
                      className="font-hand text-2xl whitespace-nowrap mb-1" 
                      style={{ color: '#a855f7', opacity: 0.7 }}
                    >
                        psst... you can drag these!
                    </p>
                    <svg 
                      width="60" 
                      height="50" 
                      viewBox="0 0 100 100" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="transform -rotate-12 translate-x-4"
                      style={{ color: '#a855f7', opacity: 0.7 }}
                    >
                       <path 
                         d="M90 10 C 50 20, 40 40, 10 70" 
                         stroke="currentColor" 
                         strokeWidth="5" 
                         strokeLinecap="round" 
                         fill="none"
                       />
                       <path 
                         d="M10 50 L 10 70 L 30 70" 
                         stroke="currentColor" 
                         strokeWidth="5" 
                         strokeLinecap="round" 
                         strokeLinejoin="round"
                         fill="none"
                       />
                    </svg>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={projects.map(p => p.id)} 
              strategy={rectSortingStrategy}
            >
                {projects.map((project, index) => (
                  <SortableProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      onClick={() => onProjectClick(project)}
                  />
                ))}
            </SortableContext>
          </DndContext>

          {/* Behance Card - Placed inside grid but spans full width */}
          <BehanceCard />
        </div>
        
      </div>
    </section>
  );
};

export default ProjectGrid;
