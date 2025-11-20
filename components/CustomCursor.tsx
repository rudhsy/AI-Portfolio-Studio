import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Initial setup
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });
    
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isHoveringLink = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.tagName === 'IMG';
      
      setIsPointer(!!isHoveringLink);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference transition-transform duration-200 ease-out ${isClicking ? 'scale-75' : 'scale-100'}`}
    >
      <div 
        className={`bg-white rounded-full transition-all duration-300 ${
          isPointer ? 'w-4 h-4' : 'w-2 h-2'
        }`} 
      />
      {/* Hover ring */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full transition-all duration-300 ${
          isPointer ? 'w-10 h-10 opacity-100' : 'w-0 h-0 opacity-0'
        }`}
      />
    </div>
  );
};

export default CustomCursor;