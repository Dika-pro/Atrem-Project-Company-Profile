import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SplitText } from '../components/animations/SplitText'
import { MagneticButton } from '../components/animations/MagneticButton'
import FloatingLines from '../components/animations/FloatingLines'
import ScrollReveal from '../components/animations/ScrollReveal'
import BorderGlow from '../components/animations/BorderGlow'

export const Company: React.FC = () => {
  const steps = [
    { phase: 'Phase 01', title: 'UI/UX Learning', desc: 'Mastering the Figma tools and Profesional website layout' },
    { phase: 'Phase 02', title: 'Tailwind & React', desc: 'Applying Tailwind CSS framework for modern styling and responsive design.' },
    { phase: 'Phase 03', title: 'Laravel Backend', desc: 'Learn Laravel framework for backend development and database management.' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="company" className="">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[100vh] flex items-center">
        {/* Floating Lines Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <FloatingLines 
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 20]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-20 md:py-28 text-center relative z-10">
          <SplitText 
            text="Praktek Kerja Lapangan Atrem Project"
            className="text-zinc-200 text-5xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent inline-block"
          />
          <p className="text-zinc-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
            Atrem Project is an digital Startup & web studio, 
            bridging the gap between theory and industry excellence.
          </p>
          <div className="flex items-center justify-center gap-6">
            <MagneticButton 
              onClick={() => scrollToSection('learning')}
              className="px-6 py-3 rounded-xl font-medium tracking-wide bg-indigo-500 text-white active:scale-95 transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              Explore More
            </MagneticButton>
            <MagneticButton 
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-xl font-medium tracking-wide border border-zinc-800 text-zinc-300 active:scale-95 transition-all hover:bg-zinc-900"
            >
              View Projects
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-24 text-center">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          "Life is just like Riding Bicycle. To keep your balance, you must keep moving"
        </ScrollReveal>
      </div>

      {/* Internship Workflow */}
      <div className="bg-zinc-900/30 border-y border-zinc-800/50 py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-indigo-500 uppercase tracking-[0.2em] mb-3">Workflow</h2>
            <h3 className="text-3xl font-bold">Atrem Project Roadmap</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <BorderGlow borderRadius={24} glowColor="240 100% 70%">
                  <div className="bg-card border border-zinc-800/50 p-8 rounded-2xl transition-all duration-300 group-hover:bg-zinc-900/50">
                    <span className="text-[10px] font-mono text-indigo-500 mb-4 block tracking-widest">{step.phase}</span>
                    <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </BorderGlow>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 text-zinc-700">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
