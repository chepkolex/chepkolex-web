import { LayoutDashboard, FileText, FolderOpen, Box, History, Settings, Plus } from 'lucide-react';

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
    <aside className="w-72 border-r border-zinc-800/50 flex flex-col bg-[#050505] p-6 h-full">
      <div className="flex items-center gap-2 mb-10 px-2 text-white font-bold text-xl italic">
        <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        Chepkolex AI
      </div>
      <button className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-8 text-white text-sm">
        <Plus size={16} /> New Chat
      </button>
      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 cursor-pointer">
            <span className={item.active ? 'text-purple-500' : 'text-zinc-500'}>{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
