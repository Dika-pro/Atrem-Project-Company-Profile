import React, { useState } from 'react'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { cn } from '../lib/utils'
import { MagneticButton } from '../components/animations/MagneticButton'

export const SideQuests: React.FC = () => {
  const [filter, setFilter] = useState('All')

  const quests = [
    { title: "Optimize SEKAR Assets", type: "Frontend", status: "Completed", xp: 150, difficulty: "Easy" },
    { title: "Refactor Valora Grid", type: "Design", status: "Active", xp: 300, difficulty: "Medium" },
    { title: "Laravel API Middleware", type: "Backend", status: "Active", xp: 450, difficulty: "Hard" },
    { title: "Vanguard Dark Theme", type: "UI/UX", status: "Completed", xp: 200, difficulty: "Medium" },
    { title: "Atrem Hub XP Logic", type: "Logic", status: "Active", xp: 500, difficulty: "Hard" },
    { title: "Mobile Responsive Fix", type: "Frontend", status: "Completed", xp: 100, difficulty: "Easy" },
  ]

  const filteredQuests = filter === 'All' 
    ? quests 
    : quests.filter(q => q.status === filter)

  return (
    <section id="sidequests" className="container mx-auto px-4 md:px-8 max-w-7xl py-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-sm font-mono text-indigo-500 uppercase tracking-[0.2em] mb-3">Gamification</h2>
          <h3 className="text-4xl font-bold">Side Quests</h3>
        </div>
        
        <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          {['All', 'Active', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                filter === tab ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map((quest, index) => (
          <div key={index} className="bg-card border border-zinc-800 p-6 rounded-2xl group transition-all hover:border-zinc-700">
            <div className="flex justify-between items-start mb-6">
              <span className={cn(
                "flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider",
                quest.status === 'Completed' ? "text-emerald-500" : "text-amber-500"
              )}>
                {quest.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} className="animate-pulse" />}
                {quest.status}
              </span>
              <span className="text-xs font-bold text-indigo-500">+{quest.xp} XP</span>
            </div>
            
            <h4 className="text-lg font-bold mb-2">{quest.title}</h4>
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-6">
              <span className="px-2 py-0.5 bg-zinc-900 rounded">{quest.type}</span>
              <span className="flex items-center gap-1">
                <Circle size={8} fill="currentColor" /> {quest.difficulty}
              </span>
            </div>

            <MagneticButton className="w-full py-2.5 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
              Inspect Quest
            </MagneticButton>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <MagneticButton className="px-8 py-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
          View More Quests
        </MagneticButton>
      </div>
    </section>
  )
}
