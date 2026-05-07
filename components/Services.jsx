import { FileText, Cpu, MessageSquare, Activity } from 'lucide-react';

export default function Services() {
  const services = [
    { title: "AI Automation", desc: "Autonomous reports.", icon: <FileText className="text-blue-500" /> },
    { title: "Chatbots", desc: "NLP customer service.", icon: <MessageSquare className="text-blue-500" /> },
    { title: "Data Flow", desc: "Real-time metrics.", icon: <Activity className="text-blue-500" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
      {services.map((s, i) => (
        <div key={i} className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-blue-500/40 transition-all">
          <div className="mb-4">{s.icon}</div>
          <h3 className="text-xl font-bold mb-2">{s.title}</h3>
          <p className="text-zinc-400 text-sm">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
