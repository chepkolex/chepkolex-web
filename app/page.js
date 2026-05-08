"use client";
import Sidebar from '@/components/Dashboard/Sidebar';
import { FileUp, Send } from 'lucide-react';
import { useState } from 'react';
import Services from '@/components/Services'; // Using the directory path you specified

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen bg-[#030303] text-zinc-400 overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col items-center p-8 relative">
        {/* Main Content Area - Centered vertically and horizontally */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl">
          
          {/* Hero Header */}
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold text-white mb-4 tracking-tight">
              Hello, <span className="text-purple-500">Chepkolex!</span> 👋
            </h2>
            <p className="text-zinc-500 text-xl font-medium">
              Your AI-powered assistant for business, code, and creative growth.
            </p>
          </div>

          {/* Action Grid (from Services.jsx) */}
          <Services />

          {/* Chat Input Area */}
          <div className="w-full max-w-4xl relative group">
            {/* Subtle Outer Glow on Focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#0f0f0f] border border-zinc-800 rounded-2xl p-3 flex items-center gap-3 shadow-2xl transition-all group-focus-within:border-zinc-700">
              <button className="p-3 text-zinc-500 hover:text-white transition-colors">
                <FileUp size={22} />
              </button>
              
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Chepkolex anything..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-white text-base py-3 placeholder:text-zinc-600" 
              />
              
              <button 
                className={`p-3 rounded-xl transition-all duration-300 ${
                  input 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-zinc-800/50 text-zinc-600'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Global Footer - Powered by Chepkolex AI */}
        <div className="py-6 w-full text-center">
          <p className="text-[10px] text-zinc-600 font-bold tracking-[0.4em] uppercase">
            Powered by Chepkolex AI V1.0
          </p>
        </div>
      </main>
    </div>
  );
}