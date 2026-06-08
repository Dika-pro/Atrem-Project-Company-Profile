import React, { useState } from 'react'
import { ExternalLink, X, CheckCircle2, Layout, Hammer, History } from 'lucide-react'
import { cn } from '../lib/utils'

interface Project {
  title: string
  desc: string
  tags: string[]
  img: string
  color: string
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      title: "Lego Shop",
      desc: "Interactive e-commerce interface for collectible building sets.",
      tags: ["UI/UX", "Figma", "Design"],
      img: "/lego shop.jpg",
      color: "from-yellow-500/20"
    },
    {
      title: "Oceanica",
      desc: "Modern maritime exploration and conservation platform.",
      tags: ["UI/UX", "Figma", "Design"],
      img: "/oceanica.jpg",
      color: "from-blue-500/20"
    },
    {
      title: "Ice Cream Shop",
      desc: "Sweet and vibrant digital storefront for premium desserts.",
      tags: ["UI/UX", "Figma", "Design"],
      img: "/ice scream shop.jpg",
      color: "from-pink-500/20"
    },
    {
      title: "Camera Shop",
      desc: "Professional equipment showcase for photography enthusiasts.",
      tags: ["UI/UX", "Figma", "Design"],
      img: "/camera shop.jpg",
      color: "from-zinc-500/20"
    },
    {
      title: "Art Shop",
      desc: "Curated digital gallery and marketplace for contemporary artists.",
      tags: ["UI/UX", "Figma", "Design"],
      img: "/art shop.jpg",
      color: "from-purple-500/20"
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
          <div 
            key={index} 
            onClick={() => setSelectedProject(project)}
            className="group relative bg-card border border-zinc-800 rounded-3xl overflow-hidden transition-all hover:border-zinc-700 cursor-pointer"
          >
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
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      {tag}
                    </span>
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

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Image Preview Side */}
              <div className="lg:w-3/5 relative bg-zinc-900 overflow-y-auto custom-scrollbar">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Info Side */}
              <div className="lg:w-2/5 p-8 lg:p-12 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl">
                      <Layout size={28} className="text-indigo-500" />
                    </div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <span className="text-xs font-mono text-indigo-500 uppercase tracking-[0.3em] block mb-2">Project Case Study</span>
                  <h4 className="text-4xl font-bold mb-6">{selectedProject.title}</h4>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">
                        <History size={14} />
                        About Project
                      </div>
                      <p className="text-zinc-400 leading-relaxed">
                        {selectedProject.desc} Designed with focus on user experience, aesthetic consistency, and modern design principles.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest mb-3">
                        <Hammer size={14} />
                        Tools & Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider mb-1">Project Status</p>
                        <p className="text-2xl font-black text-emerald-500">Done</p>
                      </div>
                      <CheckCircle2 size={32} className="text-emerald-500 opacity-50" />
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800 transition-all"
                  >
                    Close Showcase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
