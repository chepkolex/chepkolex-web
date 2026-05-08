import { PenTool, AlignLeft, Lightbulb, Code2, Briefcase, Megaphone } from 'lucide-react';

export default function Services() {
  const actions = [
    { title: "Write a Blog Post", icon: <PenTool className="text-blue-400" /> },
    { title: "Summarize Text", icon: <AlignLeft className="text-green-400" /> },
    { title: "Generate Ideas", icon: <Lightbulb className="text-yellow-400" /> },
    { title: "Code Assistant", icon: <Code2 className="text-purple-400" /> },
    { title: "Business Plan", icon: <Briefcase className="text-orange-400" /> },
    { title: "Marketing Copy", icon: <Megaphone className="text-pink-400" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-16">
      {actions.map((a, i) => (
        <div key={i} className="p-8 bg-[#0f0f0f]/50 border border-zinc-800/40 rounded-3xl hover:border-zinc-700 transition-all cursor-pointer group">
          <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
            {a.icon}
          </div>
          <h4 className="text-white text-base font-bold tracking-tight">
            {a.title}
          </h4>
        </div>
      ))}
    </div>
  );
}