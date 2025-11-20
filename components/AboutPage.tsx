
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { RESUME } from '../data/resume';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Matter from 'matter-js';
import { Mail, Github, Linkedin, MapPin, GripHorizontal, ArrowUpRight } from 'lucide-react';
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
import { clsx } from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface SortableBentoItemProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const SortableBentoItem: React.FC<SortableBentoItemProps> = ({ id, className, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "bento-card relative overflow-hidden group",
        className,
        isDragging ? 'opacity-80 scale-[1.02] shadow-2xl z-50 ring-2 ring-accent' : ''
      )}
    >
      {children}
      
      {/* Hover Drag Handle Hint */}
      <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 cursor-grab active:cursor-grabbing mix-blend-multiply dark:mix-blend-screen">
        <GripHorizontal size={20} />
      </div>
    </div>
  );
};

// --- Physics Skill Jar Component ---
interface SkillJarProps {
  title: string;
  items: string[];
}

const SkillJar: React.FC<SkillJarProps> = ({ title, items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  // Track dimensions to handle resizing
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0 || items.length === 0) return;

    // Module Aliases
    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const Composite = Matter.Composite;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    // 1. Setup Matter Engine
    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const { width, height } = dimensions;

    // 2. Create Static Boundaries (Walls)
    const wallThickness = 100;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { 
        isStatic: true, 
        render: { visible: false },
        label: 'ground'
    });
    const leftWall = Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 4, { 
        isStatic: true, 
        render: { visible: false },
        label: 'leftWall'
    });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 4, { 
        isStatic: true, 
        render: { visible: false },
        label: 'rightWall'
    });

    Composite.add(world, [ground, leftWall, rightWall]);

    // 3. Create Bodies for Skill Items
    const itemBodies: Matter.Body[] = [];
    
    itemsRef.current.forEach((el, i) => {
      if (!el || i >= items.length) return;
      
      // Reset transform to measure dimensions accurately
      el.style.transform = 'none';
      const w = el.offsetWidth || 100; // Fallback width
      const h = el.offsetHeight || 40; // Fallback height
      
      // Spawn positions: Random spread across width, staggered height above container
      const x = Math.random() * (width - w) + w / 2;
      const y = -Math.random() * (height * 2) - 100; 
      
      const body = Bodies.rectangle(x, y, w, h, {
        restitution: 0.5,      // Bounciness
        friction: 0.3,         // Surface friction
        frictionAir: 0.01,     // Air resistance
        angle: (Math.random() - 0.5) * 0.2,
        chamfer: { radius: h / 2 },
        render: { visible: false },
        label: `skill-${i}`
      });
      
      itemBodies.push(body);
    });

    Composite.add(world, itemBodies);

    // 4. Add Mouse Interaction
    const mouse = Mouse.create(containerRef.current);
    // Remove events to prevent scrolling interference
    // @ts-ignore
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // @ts-ignore
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: { visible: false }
        }
    });

    Composite.add(world, mouseConstraint);

    // 5. Run the Simulation
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 6. Render Loop
    let animationId: number;
    const update = () => {
      if(!engineRef.current) return;
      
      itemBodies.forEach((body, i) => {
        const el = itemsRef.current[i];
        if (el) {
            const { x, y } = body.position;
            const angle = body.angle;
            
            // Apply transform
            el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px, 0) rotate(${angle}rad)`;
            
            // Ensure visibility once physics starts updating positions
            if (el.style.opacity !== '1') {
                el.style.opacity = '1';
            }
        }
      });
      animationId = requestAnimationFrame(update);
    };
    update();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(world, false, true);
    };
  }, [items, dimensions]); // Re-run if items or dimensions change

  return (
    <div className="flex flex-col h-full w-full">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1 select-none">
            {title}
        </h4>
        <div 
            ref={containerRef} 
            onPointerDown={(e) => e.stopPropagation()}
            className="relative flex-1 w-full min-h-[240px] bg-gray-50/80 dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden cursor-crosshair"
        >
             {/* Visual Elements */}
             <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white/90 to-transparent dark:from-white/10 opacity-80 pointer-events-none z-10"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-black/5 to-transparent dark:from-white/5 rounded-full blur-2xl pointer-events-none"></div>
             
             {/* Skill Items */}
             {items.map((skill, i) => (
                 <div 
                    key={i} 
                    ref={(el) => { itemsRef.current[i] = el; }}
                    className="absolute top-0 left-0 px-3 py-1.5 rounded-full bg-white dark:bg-[#222] text-[11px] font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-white/10 select-none whitespace-nowrap will-change-transform z-20 opacity-0"
                 >
                    {skill}
                 </div>
             ))}
        </div>
    </div>
  );
};

type BentoItemData = 
  | { id: 'hero'; type: 'hero' }
  | { id: 'intro'; type: 'intro' }
  | { id: 'image'; type: 'image' }
  | { id: 'narrative'; type: 'narrative' }
  | { id: 'contact'; type: 'contact' }
  | { id: string; type: 'skill'; data: { name: string; items: string[] } };

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize All Page Sections as Draggable Items
  const [items, setItems] = useState<BentoItemData[]>([
    { id: 'hero', type: 'hero' },
    { id: 'image', type: 'image' },
    { id: 'intro', type: 'intro' },
    { id: 'narrative', type: 'narrative' },
    ...RESUME.skills.map((s, i) => ({ id: `skill-${i}`, type: 'skill', data: s } as BentoItemData)),
    { id: 'contact', type: 'contact' }
  ]);

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
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Entrance Animation
      gsap.from(".bento-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.2
      });

      // Hero Text Reveal inside the card
      gsap.from(".hero-line", {
        y: '100%',
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.6
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full pt-32 pb-20 px-4 md:px-8 overflow-x-hidden overflow-y-auto">
      
      <div className="max-w-[90rem] mx-auto">
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items.map(i => i.id)} 
            strategy={rectSortingStrategy}
          >
            {/* grid-flow-dense is key here for filling gaps when dragging different sized items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-24 grid-flow-dense auto-rows-min">
                
                {items.map((item) => {
                    
                    // --- 1. HERO TITLE ---
                    if (item.type === 'hero') {
                        return (
                            <SortableBentoItem 
                                key={item.id} 
                                id={item.id}
                                className="col-span-1 md:col-span-4 bg-transparent p-0 min-h-[200px] md:min-h-[300px] flex flex-col justify-end"
                            >
                               <h1 className="text-5xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] text-black dark:text-white select-none pointer-events-none">
                                  <div className="overflow-hidden"><span className="hero-line block">DESIGNING</span></div>
                                  <div className="overflow-hidden"><span className="hero-line block text-accent">CURIOSITY</span></div>
                                  <div className="overflow-hidden"><span className="hero-line block">INTO REALITY</span></div>
                               </h1>
                            </SortableBentoItem>
                        );
                    }

                    // --- 2. INTRO TEXT ---
                    if (item.type === 'intro') {
                        return (
                            <SortableBentoItem 
                                key={item.id} 
                                id={item.id}
                                className="col-span-1 md:col-span-1 bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 flex items-center"
                            >
                                <div className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 leading-snug select-none pointer-events-none">
                                    Hello! I'm <span className="text-black dark:text-white font-bold bg-yellow-100 dark:bg-yellow-900/30 px-2 rounded-lg">{RESUME.personal.name}</span>.
                                    <br/><br/>
                                    I bridge the gap between <span className="italic font-serif">"What if"</span> and <span className="italic font-serif">"What is"</span>.
                                </div>
                            </SortableBentoItem>
                        );
                    }

                    // --- 3. IMAGE ---
                    if (item.type === 'image') {
                        return (
                            <SortableBentoItem 
                                key={item.id} 
                                id={item.id}
                                className="col-span-1 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden aspect-[3/4]"
                            >
                               <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                                alt="Portrait" 
                                className="w-full h-full object-cover select-none pointer-events-none scale-105 group-hover:scale-100 transition-transform duration-700" 
                               />
                               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                                  <div className="flex items-center gap-2 text-white text-sm font-mono backdrop-blur-md bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20">
                                     <MapPin size={12}/> Mumbai, India
                                  </div>
                               </div>
                            </SortableBentoItem>
                        );
                    }

                    // --- 4. NARRATIVE ---
                    if (item.type === 'narrative') {
                        return (
                            <SortableBentoItem 
                                key={item.id} 
                                id={item.id}
                                className="col-span-1 md:col-span-2 bg-white dark:bg-[#111] p-8 md:p-10 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-center"
                            >
                               <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 select-none flex items-center gap-2">
                                  <div className="w-8 h-[1px] bg-accent"></div> The Narrative
                               </h3>
                               <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-loose font-light select-none">
                                 Currently studying at the <span className="font-bold text-black dark:text-white">{RESUME.personal.department}</span>, IIT Bombay. My journey isn't just about making things look good—it's about making them feel right. 
                                 <br/><br/>
                                 I specialize in <span className="text-black dark:text-white font-medium border-b border-accent/50">Interaction Design</span> and <span className="text-black dark:text-white font-medium border-b border-accent/50">XR</span>. I believe the best interfaces are the ones that don't just respond to inputs, but anticipate needs and spark joy. 
                               </p>
                            </SortableBentoItem>
                        );
                    }

                    // --- 5. SKILL JAR (GRAVITY) ---
                    if (item.type === 'skill' && 'data' in item) {
                        const isLarge = item.data.items.length > 8;
                        const spanClass = isLarge ? 'md:col-span-2' : 'md:col-span-1';
                        
                        return (
                            <SortableBentoItem 
                                key={item.id} 
                                id={item.id}
                                className={`col-span-1 ${spanClass} bg-white dark:bg-[#111] p-5 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col`}
                            >
                                <SkillJar title={item.data.name} items={item.data.items} />
                            </SortableBentoItem>
                        );
                    }

                    // --- 6. CONTACT / FOOTER ---
                    if (item.type === 'contact') {
                      return (
                        <SortableBentoItem 
                           key={item.id}
                           id={item.id}
                           className="col-span-1 md:col-span-4 bg-[#7B2CBF] rounded-3xl shadow-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 mt-8"
                        >
                            <div className="text-center md:text-left pointer-events-none select-none">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                                  Let's build something impossible.
                                </h2>
                                <p className="text-purple-100/80 font-medium">Open for collaborations and coffee chats.</p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                <a 
                                  href={`mailto:hello@${RESUME.personal.portfolio}`} 
                                  className="px-6 py-3 rounded-full bg-white text-[#7B2CBF] font-bold hover:scale-105 transition-transform flex items-center gap-2 pointer-events-auto shadow-lg"
                                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag on button click
                                >
                                   <Mail size={18} /> Say Hello
                                </a>
                                <a 
                                  href={`https://${RESUME.personal.portfolio}`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center gap-2 pointer-events-auto"
                                  onPointerDown={(e) => e.stopPropagation()}
                                >
                                  <Github size={18} /> GitHub <ArrowUpRight size={14}/>
                                </a>
                            </div>
                        </SortableBentoItem>
                      )
                    }
                    
                    return null;
                })}

            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default AboutPage;
