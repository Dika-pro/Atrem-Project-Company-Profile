import React from 'react'
import { GlowingCard } from '../components/animations/GlowingCard'

export const Learning: React.FC = () => {
  const tracks = [
    {
      title: "UI/UX Design Track",
      tags: ["Figma", "Design Systems"],
      desc: "Mastered high-fidelity wireframing, component-driven design architectures, and advanced micro-interactions.",
      progress: 95,
      span: "md:col-span-2"
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
      span: "md:col-span-2"
    }
  ]

  return (
    <section id="learning" className="container mx-auto px-4 md:px-8 max-w-7xl py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-16">
        <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-[0.2em] mb-3">Growth Hub</h2>
        <h3 className="text-4xl font-bold">What I Learned</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {tracks.map((track, index) => (
          <GlowingCard 
            key={index} 
            className={track.span}
          >
            <div className="bg-card border border-zinc-800 p-8 rounded-2xl h-full">
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
    </section>
  )
}
