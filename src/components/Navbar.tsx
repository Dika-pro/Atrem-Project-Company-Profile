import React, { useState, useEffect } from 'react'
import GooeyNav from './animations/GooeyNav'

export const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = [
    { id: 'company', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'learning', label: 'Learning' },
    { id: 'projects', label: 'Projects' },
  ]

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 200; // Adjusted offset for better center-screen detection

          navItems.forEach((item, index) => {
            const element = document.getElementById(item.id);
            if (element) {
              const offsetTop = element.offsetTop;
              const height = element.offsetHeight;

              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                setActiveIndex(index);
              }
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('company')}>
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <img src="/ATREM PROJECT LOGO.png" alt="" className='rounded-sm' />
          </div>
          <span className="font-bold text-lg hidden lg:block tracking-wide">Atrem Project</span>
        </div>

        {/* Center Nav */}
        <div className="flex-1 flex justify-center">
          <GooeyNav 
            items={navItems} 
            onItemClick={(item) => scrollToSection(item.id as string)}
            className="max-w-fit"
            activeIndex={activeIndex}
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-white">Dika</span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Frontend Developers</span>
          </div>
          <button className="w-11 h-11 rounded-full bg-zinc-900 border-2 border-zinc-800 hover:border-indigo-500 flex items-center justify-center transition-all overflow-hidden shrink-0">
            <div className="w-full h-full bg-zinc-800" />
          </button>
        </div>
      </div>
    </header>
  )
}

