import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, Sparkles, LayoutTemplate, Briefcase, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FBFBFD]">
      {/* Liquid Blobs Background */}
      <div className="absolute top-0 inset-x-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <div className="blob bg-blue-200/50 w-[800px] h-[800px] -top-64 -left-64" style={{ animationDelay: '0s' }} />
        <div className="blob bg-purple-200/50 w-[600px] h-[600px] top-32 -right-32" style={{ animationDelay: '-5s' }} />
        <div className="blob bg-emerald-100/40 w-[700px] h-[700px] -bottom-64 left-32" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 glass z-50 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-neutral-900">BumpCv</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
          <a href="#" className="hover:text-neutral-900 transition-colors">Comment ça marche ?</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Modèles</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Tarifs</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-neutral-900 hover:opacity-70 transition-opacity">
            Connexion
          </button>
          <button className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors">
            Commencer
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/60 text-xs font-semibold text-neutral-600 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Nouveau : Bump AI v2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-neutral-900 leading-[1.1] mb-6">
              Votre CV, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">transcendé par l'IA.</span>
            </h1>
            <p className="text-lg text-neutral-500 mb-10 max-w-lg leading-relaxed">
              Importez votre ancien PDF. L'intelligence artificielle réécrit vos expériences, optimise les mots-clés ATS et génère un design digne d'Apple en quelques secondes.
            </p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Créer de zéro
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-white text-neutral-900 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-colors shadow-sm border border-neutral-200">
                Voir les modèles
              </button>
            </div>
          </motion.div>

          {/* Right Column - Interaction */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-md mx-auto lg:ml-auto"
          >
            {/* The Glass Dropzone */}
            <div 
              className={cn(
                "absolute inset-0 rounded-[2.5rem] glass p-8 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 cursor-pointer shadow-2xl",
                isHovering ? "border-blue-400/50 scale-[1.02] bg-white/70" : "border-white/60"
              )}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <FileUp className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Bumpez votre CV</h3>
              <p className="text-neutral-500 mb-8 max-w-xs">
                Glissez-déposez votre vieux PDF ici. L'IA s'occupe du reste.
              </p>
              
              <div className="w-full h-12 rounded-full border border-dashed border-neutral-300 flex items-center justify-center text-sm font-medium text-neutral-400 bg-neutral-50/50">
                Format supporté : PDF
              </div>
            </div>

            {/* Floating Elements representing features */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass rounded-2xl p-4 flex items-center gap-3 shadow-xl"
            >
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-neutral-900">Designs Premium</p>
                <p className="text-xs text-neutral-500">12 modèles</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 glass rounded-2xl p-4 flex items-center gap-3 shadow-xl"
            >
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-neutral-900">Mots-clés ATS</p>
                <p className="text-xs text-neutral-500">Optimisation IA</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
