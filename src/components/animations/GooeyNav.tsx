import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  id: number | string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

interface GooeyNavProps {
  items: NavItem[];
  duration?: number;
  particleCount?: number;
  blur?: number;
  gap?: number;
  className?: string;
  onItemClick?: (item: NavItem) => void;
  activeIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  duration = 0.6,
  particleCount = 6,
  blur = 10,
  gap = 20,
  className = "",
  onItemClick,
  activeIndex: externalActiveIndex
}) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;
  
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; startX: number; endX: number }[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ x: 0, width: 0 });
  
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const activeElement = itemsRef.current[activeIndex];
    const navContainer = activeElement?.parentElement;
    if (activeElement && navContainer) {
      const style = window.getComputedStyle(navContainer);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      
      setIndicatorStyle({
        x: activeElement.offsetLeft - paddingLeft,
        width: activeElement.offsetWidth
      });
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // Sync particles when activeIndex changes (including from scroll)
  const prevIndexRef = useRef(activeIndex);
  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      const activeElement = itemsRef.current[prevIndexRef.current];
      const targetElement = itemsRef.current[activeIndex];
      const navContainer = activeElement?.parentElement;
      
      if (activeElement && targetElement && navContainer) {
        const style = window.getComputedStyle(navContainer);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;

        const startX = (activeElement.offsetLeft - paddingLeft) + activeElement.offsetWidth / 2;
        const endX = (targetElement.offsetLeft - paddingLeft) + targetElement.offsetWidth / 2;

        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
          id: Date.now() + i,
          x: (Math.random() - 0.5) * 40,
          y: (Math.random() - 0.5) * 40,
          startX: startX - 10,
          endX: endX - 10
        }));
        
        setParticles(newParticles);
        setTimeout(() => setParticles([]), duration * 1000);
      }
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex, particleCount, duration]);

  const handleItemClick = (index: number, item: NavItem) => {
    if (index === activeIndex) {
      if (onItemClick) onItemClick(item);
      return;
    }
    
    setInternalActiveIndex(index);
    if (onItemClick) onItemClick(item);
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="relative flex items-center bg-zinc-900/100 backdrop-blur-md border border-zinc-800 rounded-full p-1.5 px-5 shadow-2xl"
        style={{ filter: 'url(#gooey-nav-filter)', gap: `${gap}px` }}
      >
        {/* Active Indicator */}
        <motion.div
          className="absolute bg-indigo-500 rounded-full top-0"
          initial={false}
          animate={{
            x: indicatorStyle.x,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
          }}
          style={{ height: 40, marginTop: '6px' }} // 6px for centering in h-52 container (p-1.5 = 6px)
        />

        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-indigo-500 rounded-full left-0 top-0"
              initial={{ x: particle.startX, scale: 1, opacity: 1, y: 10 }}
              animate={{ 
                x: particle.endX + particle.x,
                y: 10 + particle.y,
                scale: 0,
                opacity: 0 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration, ease: "easeOut" }}
              style={{ width: 20, height: 20, marginTop: '6px' }}
            />
          ))}
        </AnimatePresence>

        {items.map((item, index) => (
          <button
            key={item.id}
            ref={el => itemsRef.current[index] = el}
            onClick={() => handleItemClick(index, item)}
            className={`relative z-10 flex h-10 px-6 items-center justify-center rounded-full transition-colors duration-200 ${
              activeIndex === index ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GooeyNav;
