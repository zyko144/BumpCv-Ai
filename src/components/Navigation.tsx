

interface Props {
  currentView: 'home' | 'upload' | 'pricing' | 'editor';
  setView: (view: 'home' | 'upload' | 'pricing' | 'editor') => void;
}

export default function Navigation({ currentView, setView }: Props) {
  return (
    <nav className="fixed top-0 inset-x-0 h-16 glass z-50 flex items-center px-6 md:px-12 justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => setView('home')}
      >
        <img src="/logo.png" alt="BumpCv Logo" className="w-8 h-8 rounded-lg object-cover" />
        <span className="font-bold text-xl tracking-tight text-neutral-900">BumpCv</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
        <button 
          onClick={() => setView('home')} 
          className={`transition-colors hover:text-neutral-900 ${currentView === 'home' ? 'text-neutral-900' : ''}`}
        >
          Accueil
        </button>
        <button 
          onClick={() => setView('editor')} 
          className={`transition-colors hover:text-neutral-900 ${currentView === 'editor' ? 'text-neutral-900' : ''}`}
        >
          Éditeur
        </button>
        <button 
          onClick={() => setView('pricing')} 
          className={`transition-colors hover:text-neutral-900 ${currentView === 'pricing' ? 'text-neutral-900' : ''}`}
        >
          Tarifs
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-neutral-900 hover:opacity-70 transition-opacity">
          Connexion
        </button>
        <button 
          onClick={() => setView('upload')}
          className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
        >
          Bumper un CV
        </button>
      </div>
    </nav>
  );
}
