"use client";
import Sidebar from '@/components/Dashboard/Sidebar';
import { PenTool, AlignLeft, Lightbulb, Code2, Briefcase, Megaphone, Paperclip, Send } from 'lucide-react';

export default function Home() {
  const actions = [
    { title: "Write a Blog Post", icon: <PenTool className="text-blue-400" /> },
    { title: "Summarize Text", icon: <AlignLeft className="text-green-400" /> },
    { title: "Generate Ideas", icon: <Lightbulb className="text-yellow-400" /> },
    { title: "Code Assistant", icon: <Code2 className="text-purple-400" /> },
    { title: "Business Plan", icon: <Briefcase className="text-orange-400" /> },
    { title: "Marketing Copy", icon: <Megaphone className="text-pink-400" /> },
  ];

  return (
    <div className="flex h-screen bg-[#030303] text-zinc-400 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">Hello, <span className="text-purple-500">Chepkolex!</span> 👋</h2>
          <p className="text-zinc-500 text-xl">Your AI-powered assistant for business and code.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mb-12">
          {actions.map((a, i) => (
            <div key={i} className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all cursor-pointer">
              <div className="mb-4">{a.icon}</div>
              <h4 className="text-white text-sm font-semibold">{a.title}</h4>
            </div>
          ))}
        </div>
        <div className="w-full max-w-4xl bg-[#0f0f0f] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
          <Paperclip size={20} />
          <input type="text" placeholder="Ask Chepkolex anything..." className="flex-1 bg-transparent border-none focus:ring-0 text-white" />
          <button className="p-3 bg-purple-600 text-white rounded-xl"><Send size={18} /></button>
        </div>
      </main>
    </div>
  );
}