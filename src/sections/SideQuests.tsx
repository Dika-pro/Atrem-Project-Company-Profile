import React, { useState } from 'react'
import { CheckCircle2, Clock, X, User2, Calendar, Target } from 'lucide-react'
import { cn } from '../lib/utils'
import { MagneticButton } from '../components/animations/MagneticButton'

interface Quest {
  title: string
  task: string
  date: string
  status: string
  assignees: string[]
  xp: number
}

export const SideQuests: React.FC = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  const quests: Quest[] = [
    {
      title: "Explore 20 tools",
      task: "Explore tools yang bisa generate: 20 ui landing page",
      date: "10/01/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 150
    },
    {
      title: "Data Bisnis - 17 januari",
      task: "Cari akun ig/gmaps dari bidang usaha: cari web / akun ig yang jualan SaaS, pisah jadi 2",
      date: "19/01/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 200
    },
    {
      title: "40 akun SaaS",
      task: "Cari web / akun ig yang jualan SaaS, pisah jadi 2",
      date: "19/01/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 200
    },
    {
      title: "Daftar Penjual Aset UI/UX & Source Code",
      task: "Cari web / akun ig yang jualan UI Kit / UI Template",
      date: "22/01/2026",
      status: "Finish",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 300
    },
    {
      title: "List 10 Ide Sistem Bisnis",
      task: "Coba buat 10 ide sistem per orang: 10 web local dan 10 web internasional",
      date: "12/02/2026",
      status: "Finish",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 250
    },
    {
      title: "List 10 Website local/internasional",
      task: "Cari 10 web local dan 10 web internasional per orang",
      date: "20/02/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 250
    },
    {
      title: "40 data - Akun ig share informasi",
      task: "Cari akun ig yang biasa menshare informasi",
      date: "26/02/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 180
    },
    {
      title: "80 data akun ig vibecoding/vibeuix",
      task: "Cari akun ig yang biasa menshare informasi",
      date: "06/03/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 220
    },
    {
      title: "40 akun ig/tiktok yang jualan barang thrift",
      task: "Cari akun ig/tiktok yang jualan barang thrift",
      date: "06/03/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 200
    },
    {
      title: "acc ig/gmaps bidang usaha",
      task: "Cari akun ig/gmaps dari bidang usaha",
      date: "25/04/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 200
    },
    {
      title: "Agency_Data",
      task: "Cari akun sosmed/web agency software house",
      date: "25/04/2026",
      status: "Ready To Review",
      assignees: ["Dika", "Garba", "Radit", "Satria"],
      xp: 150
    }
  ]

  return (
    <section id="sidequests" className="container mx-auto px-4 md:px-8 max-w-7xl py-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-sm font-mono text-indigo-500 uppercase tracking-[0.2em] mb-3">Gamification</h2>
          <h3 className="text-4xl font-bold">Side Quests</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, index) => (
          <div key={index} className="bg-card border border-zinc-800 p-6 rounded-2xl group transition-all hover:border-zinc-700 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target size={14} className="text-indigo-500" />
                <h4 className="text-lg font-bold leading-tight">{quest.title}</h4>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-3">
                {quest.task}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {quest.assignees.map(name => (
                  <span key={name} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 font-medium">
                    <User2 size={10} />
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <MagneticButton 
              onClick={() => setSelectedQuest(quest)}
              className="w-full py-4 rounded-xl text-sm font-bold bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all hover:border-indigo-500/50"
            >
              Inspect Quest
            </MagneticButton>
          </div>
        ))}
      </div>

      {/* Quest Detail Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative p-8">
              <button 
                onClick={() => setSelectedQuest(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-2xl">
                  <Target size={24} className="text-indigo-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">Quest Detail</span>
                  <h4 className="text-2xl font-bold">{selectedQuest.title}</h4>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-zinc-500 mb-2 font-medium">Objective</p>
                  <p className="text-zinc-300 leading-relaxed">{selectedQuest.task}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
                      <Calendar size={12} />
                      Deadline
                    </div>
                    <span className="text-sm font-bold text-zinc-200">{selectedQuest.date}</span>
                  </div>
                  <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
                      <Clock size={12} />
                      Status
                    </div>
                    <span className="text-sm font-bold text-indigo-500">
                      Team Work
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider mb-1">Status</p>
                    <p className="text-2xl font-black text-emerald-500">Done</p>
                  </div>
                  <CheckCircle2 size={32} className="text-emerald-500 opacity-50" />
                </div>
              </div>

              <div className="mt-8">
                <MagneticButton 
                  onClick={() => setSelectedQuest(null)}
                  className="w-full py-5 px-8 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
                >
                  Close Archive
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
