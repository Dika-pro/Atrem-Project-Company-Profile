import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Navbar } from './components/Navbar'
import { Company } from './sections/Company'
import { About } from './sections/About'
import { Learning } from './sections/Learning'
import { SideQuests } from './sections/SideQuests'
import { Projects } from './sections/Projects'

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-obsidian text-zinc-100 selection:bg-indigo-500/30">
      <Navbar />
      
      <main>
        <Company />
        <About />
        <Learning />
        <SideQuests />
        <Projects />
      </main>

      <footer className="py-12 border-t border-zinc-800 text-center text-zinc-500 text-sm">
        <p>&copy; 2026 Atrem Project Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
