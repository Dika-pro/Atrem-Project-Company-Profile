import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ChromaItem {
  id: number | string;
  content?: React.ReactNode;
  className?: string;
}

interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items = [],
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(grid, {
        '--x': `${x}px`,
        '--y': `${y}px`,
        '--opacity': 1,
        duration: damping,
        ease: ease,
      } as any);
    };

    const handleMouseLeave = () => {
      gsap.to(grid, {
        '--opacity': 0,
        duration: fadeOut,
        ease: ease,
      } as any);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [damping, fadeOut, ease]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-zinc-900/10 ${className}`}
    >
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full h-full p-4"
        style={{
          '--x': '0px',
          '--y': '0px',
          '--opacity': 0,
          '--radius': `${radius}px`,
        } as React.CSSProperties}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative aspect-video bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden group ${item.className || ''}`}
          >
            {/* The Chroma Effect Layer */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle var(--radius) at var(--x) var(--y), rgba(99, 102, 241, 0.4), transparent)`,
                opacity: 'var(--opacity)',
              } as React.CSSProperties}
            />
            
            {/* Content Slot */}
            <div className="relative z-10 flex items-center justify-center w-full h-full p-6 text-zinc-400 group-hover:text-white transition-colors">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChromaGrid;
