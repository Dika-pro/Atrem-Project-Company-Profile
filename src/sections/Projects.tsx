import React from 'react'
import { ExternalLink } from 'lucide-react'

export const Projects: React.FC = () => {
  const projects = [
    {
      title: "SEKAR Official Site",
      desc: "High-performance production frontend platform.",
      tags: ["React", "Vercel", "Tailwind"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      color: "from-blue-500/20"
    },
    {
      title: "Valora Digital Agency",
      desc: "Premium corporate branding & elegant grids.",
      tags: ["UI/UX", "Component Architect"],
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      color: "from-purple-500/20"
    },
    {
      title: "Vanguard Sports Car UI",
      desc: "Futuristic dark-themed luxury interface.",
      tags: ["Dark Mode", "Framer Motion"],
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      color: "from-red-500/20"
    },
    {
      title: "Atrem Tech Zone",
      desc: "Comprehensive IT course platform hub.",
      tags: ["Full Stack", "Education"],
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      color: "from-indigo-500/20"
    }
  ]

  return (
    <section id="projects" className="container mx-auto px-4 md:px-8 max-w-7xl py-20 animate-in fade-in duration-700">
      <div className="mb-16">
        <h2 className="text-sm font-mono text-indigo-500 uppercase tracking-[0.2em] mb-3">Portfolio</h2>
        <h3 className="text-4xl font-bold">Featured Projects</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="group relative bg-card border border-zinc-800 rounded-3xl overflow-hidden transition-all hover:border-zinc-700">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="p-8 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <button className="text-zinc-400 hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </button>
              </div>
              
              <h4 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h4>
              <p className="text-zinc-400 text-sm">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
