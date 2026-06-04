import React, { useRef, useEffect, useState } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // HSL format: "H S L" e.g., "240 100% 50%"
  glowRadius?: number;
  glowIntensity?: number;
  edgeSensitivity?: number;
  borderRadius?: number;
  background?: string;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  glowColor = "240 100% 70%",
  glowRadius = 150,
  glowIntensity = 1,
  edgeSensitivity = 100,
  borderRadius = 16,
  background = "#09090b", // Matches zinc-950
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < edgeSensitivity) {
        setOpacity(1 - distance / edgeSensitivity);
      } else {
        setOpacity(0);
      }

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [edgeSensitivity]);

  return (
    <div
      ref={containerRef}
      className={`relative p-[1px] overflow-hidden ${className}`}
      style={{ 
        borderRadius: `${borderRadius}px`,
        background: `rgba(255, 255, 255, 0.05)` 
      }}
    >
      {/* The Glow Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: opacity * glowIntensity,
          background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, hsla(${glowColor}, 0.2), transparent 80%)`,
        }}
      />

      {/* The Border Beam (Masked) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: '1px',
          background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, hsla(${glowColor}, 1), transparent 40%)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        } as any}
      />

      {/* Content Container */}
      <div 
        className="relative z-20 h-full w-full overflow-hidden"
        style={{ 
          borderRadius: `${borderRadius - 1}px`,
          background: background 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
