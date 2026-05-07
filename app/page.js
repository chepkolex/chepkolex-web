import Services from './components/Services';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tighter">CHEPKOLEX<span className="text-blue-500">AI</span></h1>
        <div className="flex gap-4 text-sm text-zinc-400">
          <span>Digital Operator v1.0</span>
          <span className="text-green-500">● Online</span>
        </div>
      </nav>
      <div className="py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-4 uppercase tracking-tighter">The Future of Execution.</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">Deploying autonomous AI agents to manage your marketing, web, and business workflows.</p>
      </div>
      <Services />
    </main>
  );
}
