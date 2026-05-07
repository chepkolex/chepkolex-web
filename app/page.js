import Services from '@/components/Services';
import { Shield, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Zap size={20} className="text-black fill-current" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter italic uppercase">
              CHEPKOLEX<span className="text-blue-500">AI</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">
              OPERATOR v1.0.4
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6">
            <Shield size={14} /> ENCRYPTED OPERATOR PROTOCOL ACTIVE
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400">
              Execution.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Autonomous AI workflows designed for the high-velocity business landscape. 
            Bridge the gap between raw data and professional results.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
      </section>

      {/* Services Component */}
      <section className="pb-32">
        <Services />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500">
          <p className="text-sm italic">© 2026 Chepkolex AI. Localized Intelligence.</p>
          <div className="flex items-center gap-4">
            <Globe size={16} />
            <span className="text-xs font-mono uppercase tracking-widest">NBO // HQ</span>
          </div>
        </div>
      </footer>
    </main>
  );
}