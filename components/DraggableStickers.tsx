import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const STICKERS = [
  { id: 1, content: "✨", x: 10, y: 20, rotate: 12 },
  { id: 2, content: "🚀", x: 85, y: 15, rotate: -10 },
  { id: 3, content: "👾", x: 15, y: 70, rotate: 5 },
  { id: 4, content: "🎨", x: 80, y: 60, rotate: -15 },
];

const DraggableStickers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      Draggable.create(".sticker", {
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
        onDragStart: function() {
            gsap.to(this.target, { scale: 1.2, duration: 0.2, ease: "back.out(1.7)" });
        },
        onDragEnd: function() {
            gsap.to(this.target, { scale: 1, duration: 0.3, ease: "bounce.out" });
        }
      });
      
      // Initial entrance animation
      gsap.from(".sticker", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        delay: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {STICKERS.map((s) => (
        <div
          key={s.id}
          className="sticker absolute cursor-grab active:cursor-grabbing pointer-events-auto select-none text-4xl md:text-6xl filter drop-shadow-lg hover:brightness-110"
          style={{ 
            left: `${s.x}%`, 
            top: `${s.y}%`,
            transform: `rotate(${s.rotate}deg)`
          }}
        >
          {s.content}
        </div>
      ))}
    </div>
  );
};

export default DraggableStickers;