import React from 'react';
import ChromaGrid from '../components/animations/ChromaGrid';
import { Cpu, Globe, Rocket, Shield, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const structureItems = [
    {
      id: 1,
      content: (
        <div className="text-center">
          <Cpu className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
          <h4 className="font-bold text-white">Innovation Lab</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Research & Dev</p>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="text-center">
          <Globe className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
          <h4 className="font-bold text-white">Digital Studio</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Product Design</p>
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div className="text-center">
          <Rocket className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
          <h4 className="font-bold text-white">Project Hub</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Live Deployment</p>
        </div>
      )
    },
    {
      id: 4,
      content: (
        <div className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
          <h4 className="font-bold text-white">Quality Assurance</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Industry Standards</p>
        </div>
      )
    },
    {
      id: 5,
      content: (
        <div className="text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
          <h4 className="font-bold text-white">Fast-Track</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Learning Curve</p>
        </div>
      )
    },
    {
      id: 6,
      content: <div className="text-zinc-800 font-mono text-xs">ATREM</div>
    },
    {
      id: 7,
      content: <div className="text-zinc-800 font-mono text-xs">PROJECT</div>
    },
    {
      id: 8,
      content: <div className="text-zinc-800 font-mono text-xs">2026</div>
    }
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="flex-1">
            <h2 className="text-sm font-mono text-indigo-500 uppercase tracking-[0.2em] mb-3">About Atrem Project</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-6">Our Organized Structure</h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              We operate as a cohesive digital ecosystem, where each department is fine-tuned to deliver excellence. From research to deployment, our structure ensures every PKL participant masters the industry workflow.
            </p>
          </div>
          <div className="flex-1 w-full h-[400px]">
             <ChromaGrid 
                items={structureItems} 
                radius={300} 
                damping={0.3} 
                className="rounded-3xl border border-zinc-800"
              />
          </div>
        </div>
      </div>
    </section>
  );
};
