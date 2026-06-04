import React from 'react'
import { GlowingCard } from '../components/animations/GlowingCard'
import { Learning3D } from '../components/Learning3D'

export const Learning: React.FC = () => {
  const tracks = [
    {
      title: "UI/UX Design Track",
      tags: ["Figma", "Design Systems"],
      desc: "Mastered high-fidelity wireframing, component-driven design architectures, and advanced micro-interactions.",
      progress: 95,
      span: "md:col-span-1"
    },
    {
      title: "Frontend Architecture",
      tags: ["React", "Tailwind CSS"],
      desc: "Advanced layout structures, responsive designs, and utility-first clean layouts.",
      progress: 90,
      span: "md:col-span-1"
    },
    {
      title: "Backend Systems",
      tags: ["Laravel", "MySQL"],
      desc: "Database management, MVC routing, and application logic using Laravel & XAMPP.",
      progress: 85,
      span: "md:col-span-1"
    },
    {
      title: "Version Control",
      tags: ["Git", "GitHub"],
      desc: "Collaborative development workflows, branching strategies, and CI/CD basics.",
      progress: 92,
      span: "md:col-span-1"
    }
  ]

  return (
    <section id="learning" className="container mx-auto px-4 md:px-8 max-w-7xl py-20">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-[0.2em] mb-3">Growth Hub</h2>
          <h3 className="text-4xl font-bold">What I Learned</h3>
        </div>
        <p className="text-zinc-400 max-w-md text-sm">
          A continuous journey of exploring new technologies and perfecting my craft in digital product development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Side Cards */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          {tracks.slice(0, 2).map((track, index) => (
            <GlowingCard key={index}>
              <div className="bg-card border border-zinc-800 p-8 rounded-2xl h-full backdrop-blur-sm bg-zinc-950/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    {track.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xl font-bold text-emerald-500">{track.progress}%</span>
                </div>
                
                <h4 className="text-2xl font-bold mb-3">{track.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">{track.desc}</p>
                
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000 ease-out delay-300" 
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>

        {/* Center 3D Scene */}
        <div className="relative order-1 lg:order-2 h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full" />
          {/* <Learning3D /> */}
          <div className="text-emerald-500 font-mono">3D Scene Disabled for Debugging</div>
        </div>

        {/* Right Side Cards */}
        <div className="flex flex-col gap-8 order-3">
          {tracks.slice(2, 4).map((track, index) => (
            <GlowingCard key={index}>
              <div className="bg-card border border-zinc-800 p-8 rounded-2xl h-full backdrop-blur-sm bg-zinc-950/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    {track.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xl font-bold text-emerald-500">{track.progress}%</span>
                </div>
                
                <h4 className="text-2xl font-bold mb-3">{track.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">{track.desc}</p>
                
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000 ease-out delay-300" 
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
