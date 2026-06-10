import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Pricing from './pages/Pricing';
import Editor from './pages/Editor';

function App() {
  const [view, setView] = useState<'home' | 'upload' | 'pricing' | 'editor'>('home');

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FBFBFD]">
      {/* Liquid Blobs Background (Global) */}
      <div className="absolute top-0 inset-x-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <div className="blob bg-blue-200/50 w-[800px] h-[800px] -top-64 -left-64" style={{ animationDelay: '0s' }} />
        <div className="blob bg-purple-200/50 w-[600px] h-[600px] top-32 -right-32" style={{ animationDelay: '-5s' }} />
        <div className="blob bg-emerald-100/40 w-[700px] h-[700px] -bottom-64 left-32" style={{ animationDelay: '-10s' }} />
      </div>

      <Navigation currentView={view} setView={setView} />

      {view === 'home' && <Home setView={setView} />}
      {view === 'upload' && <Upload setView={setView} />}
      {view === 'pricing' && <Pricing />}
      {view === 'editor' && <Editor />}
    </div>
  );
}

export default App;
