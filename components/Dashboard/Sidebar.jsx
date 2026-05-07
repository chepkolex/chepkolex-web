import { LayoutDashboard, FileText, FolderOpen, Box, History, Settings, Plus, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const items = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Templates', icon: <FileText size={20} /> },
    { name: 'Documents', icon: <FolderOpen size={20} /> },
    { name: 'AI Tools', icon: <Box size={20} /> },
    { name: 'History', icon: <History size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-72 border-r border-zinc-800/50 flex flex-col bg-[#050505] p-6 h-full hidden md:flex">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        <h1 className="text-xl font-bold text-white tracking-tight italic">Chepkolex AI</h1>
      </div>

      <button className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-8 text-white text-sm font-medium hover:bg-zinc-800 transition-all">
        <Plus size={16} /> New Chat
      </button>

      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <div key={item.name} className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:bg-zinc-900/50'}`}>
            <div className="flex items-center gap-3">
              <span className={item.active ? 'text-purple-500' : 'text-zinc-500'}>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            {item.active && <ChevronRight size={14} className="text-purple-500" />}
          </div>
        ))}
      </nav>

      <div className="mt-auto p-5 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-1">Upgrade to Pro</h3>
        <p className="text-[10px] text-zinc-500 mb-4 leading-relaxed">Unlimited access to models.</p>
        <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-all">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
