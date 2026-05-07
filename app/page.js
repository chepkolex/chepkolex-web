import Services from './components/Services';
import { Shield, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Zap size={20} className="text-brand-dark fill-current" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter italic">
              CHEPKOLEX<span className="text-brand-accent">AI</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#solutions" className="hover:text-brand-accent transition-colors">Solutions</a>
            <a href="#about" className="hover:text-brand-accent transition-colors">Infrastructure</a>
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">
              v1.0.4-Beta
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold mb-6 animate-fade-in">
            <Shield size={14} /> ENCRYPTED OPERATOR PROTOCOL ACTIVE
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-blue-400 to-emerald-400">
              Execution.
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Autonomous AI workflows designed for the high-velocity business landscape of Nairobi. 
            Bridge the gap between raw data and professional results.
          </p>
        </div>
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-accent/10 blur-[120px] rounded-full -z-10"></div>
      </section>

      {/* Services Component (The grid we just fixed) */}
      <section id="solutions" className="pb-32">
        <Services />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm italic">
            © 2026 Chepkolex AI. Localized Intelligence. Global Standard.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <Globe size={16} />
            <span className="text-xs font-mono uppercase tracking-widest">NBO // HQ</span>
          </div>
        </div>
      </footer>
    </main>
  );
}