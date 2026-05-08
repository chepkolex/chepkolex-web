"use client";
import Sidebar from '@/components/Dashboard/Sidebar';
import { 
  PenTool, AlignLeft, Lightbulb, Code2, Briefcase, 
  Megaphone, Paperclip, Send, Zap, Cpu, Shield, Target 
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState("");

  const actions = [
    { title: "Write a Blog Post", icon: <PenTool className="text-blue-400" /> },
    { title: "Summarize Text", icon: <AlignLeft className="text-green-400" /> },
    { title: "Generate Ideas", icon: <Lightbulb className="text-yellow-400" /> },
    { title: "Code Assistant", icon: <Code2 className="text-purple-400" /> },
    { title: "Business Plan", icon: <Briefcase className="text-orange-400" /> },
    { title: "Marketing Copy", icon: <Megaphone className="text-pink-400" /> },
  ];

  const badges = [
    { label: "FAST", icon: <Zap size={16} /> },
    { label: "SMART", icon: <Cpu size={16} /> },
    { label: "SECURE", icon: <Shield size={16} /> },
    { label: "PRODUCTIVE", icon: <Target size={16} /> },
  ];

  return (
    <div className="flex h-screen bg-[#030303] text-zinc-400 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Welcome Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hello, <span className="text-purple-500">Chepkolex!</span> 👋
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl">
            Your AI-powered assistant for business, code, and creative growth.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-12">
          {actions.map((a, i) => (
            <div key={i} className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-all cursor-pointer group">
              <div className="mb-4 group-hover:scale-110 transition-transform">{a.icon}</div>
              <h4 className="text-white text-sm font-semibold">{a.title}</h4>
            </div>
          ))}
        </div>

        {/* B-OK Badges Section */}
        <div className="flex items-center gap-8 mb-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              {b.icon}
              <span className="text-[10px] font-bold tracking-[0.25em]">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="w-full max-w-4xl bg-[#0f0f0f] border border-zinc-800 rounded-2xl p-2 flex items-center gap-2 shadow-2xl focus-within:border-purple-500/50 transition-all mb-10">
          <button className="p-3 text-zinc-500 hover:text-white"><Paperclip size={20} /></button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Chepkolex anything..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm py-3" 
          />
          <button className={`p-3 rounded-xl transition-all ${input ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-zinc-800 text-zinc-500'}`}>
            <Send size={18} />
          </button>
        </div>

        {/* Version Footer */}
        <div className="absolute bottom-6 w-full text-center">
          <p className="text-[10px] text-zinc-600 font-bold tracking-[0.3em] uppercase">
            Powered by Chepkolex AI V1.0
          </p>
        </div>
      </main>
    </div>
  );
}