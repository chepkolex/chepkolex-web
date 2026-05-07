"use client";
import { useState } from 'react';
import { 
  LayoutDashboard, FileText, FolderOpen, Box, 
  History, Settings, PenTool, AlignLeft, Lightbulb, 
  Code2, Briefcase, Megaphone, Send, Plus, Paperclip
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('New Chat');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Templates', icon: <FileText size={18} /> },
    { name: 'Documents', icon: <FolderOpen size={18} /> },
    { name: 'AI Tools', icon: <Box size={18} /> },
    { name: 'History', icon: <History size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  const quickActions = [
    { title: "Write a Blog Post", icon: <PenTool className="text-blue-400" /> },
    { title: "Summarize Text", icon: <AlignLeft className="text-green-400" /> },
    { title: "Generate Ideas", icon: <Lightbulb className="text-yellow-400" /> },
    { title: "Code Assistant", icon: <Code2 className="text-purple-400" /> },
    { title: "Business Plan", icon: <Briefcase className="text-orange-400" /> },
    { title: "Marketing Copy", icon: <Megaphone className="text-pink-400" /> },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-300 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col p-4 bg-[#050505]">
        <h2 className="text-purple-500 font-bold text-xl px-4 mb-8">Chepkolex AI</h2>
        
        <button className="flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-800 p-3 rounded-xl mb-6 text-white transition-all">
          <Plus size={18} /> New Chat
        </button>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.name} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900 rounded-lg transition-colors group">
              <span className="text-zinc-500 group-hover:text-purple-400">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        {/* Upgrade Card */}
        <div className="mt-auto p-4 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/30 rounded-2xl mb-4">
          <p className="text-xs font-bold text-white mb-1">Upgrade to Pro</p>
          <p className="text-[10px] text-zinc-400 mb-3">Get unlimited GPT-4 access</p>
          <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-2 border-t border-zinc-800 pt-4">
          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs">👤</div>
          <div>
            <p className="text-xs font-bold text-white leading-none">Chepkolex</p>
            <p className="text-[10px] text-zinc-500">Premium Plan</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="max-w-3xl w-full text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Hello, <span className="text-purple-500">Chepkolex!</span> 👋
          </h1>
          <p className="text-zinc-500 text-lg">
            Your AI-powered assistant for business, code, and creative growth.
          </p>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mb-12">
          {quickActions.map((action) => (
            <button key={action.title} className="bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl text-left hover:border-zinc-700 transition-all group">
              <div className="mb-3">{action.icon}</div>
              <p className="text-sm font-medium text-white">{action.title}</p>
            </button>
          ))}
        </div>

        {/* Prompt Input Bar */}
        <div className="w-full max-w-4xl relative">
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 focus-within:border-purple-500/50 transition-colors shadow-2xl">
            <Paperclip size={20} className="text-zinc-500 cursor-pointer hover:text-zinc-300" />
            <input 
              type="text" 
              placeholder="Ask Chepkolex anything..." 
              className="bg-transparent border-none focus:ring-0 text-white w-full text-sm"
            />
            <button className="p-2 bg-zinc-800 hover:bg-purple-600 rounded-xl text-zinc-400 hover:text-white transition-all">
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-widest">
            Powered by Chepkolex AI v1.0
          </p>
        </div>
      </main>
    </div>
  );
}