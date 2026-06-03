import React from 'react'
import { cn } from '../lib/utils'

export const Navbar: React.FC = () => {
  const navLinks = [
    { id: 'company', label: 'Company' },
    { id: 'learning', label: 'Learning' },
    { id: 'sidequests', label: 'Side Quests' },
    { id: 'projects', label: 'Projects' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass h-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl h-full flex items-center justify-between">
        {/* {Logo} */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-3xl flex items-center justify-center font-bold text-white"><img src="./dist/assets/logo atrem.png" alt="logo-atrem"/></div>
          <span className="font-bold tracking-tight text-xl hidden sm:block">ATREM PROJECT</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium transition-colors hover:text-indigo-500 text-zinc-400"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Intern HUD */}
        <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-full pl-1.5 pr-4 py-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 border border-white/10" />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Dika | XI RPL 5</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-emerald-500">[ Web Developer ]</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
