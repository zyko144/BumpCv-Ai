import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  return (
    <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 mb-6">
          Un investissement pour votre carrière.
        </h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          Choisissez le plan qui vous correspond. Décrochez plus d'entretiens avec un CV optimisé par l'Intelligence Artificielle et un design ultra-premium.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-[2.5rem] p-10 border border-neutral-200/60 shadow-xl hover:shadow-2xl transition-shadow bg-white/40"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">Essentiel</h3>
          <p className="text-neutral-500 mb-8 font-medium">Parfait pour tester la magie de l'IA.</p>
          <div className="mb-10">
            <span className="text-6xl font-black text-neutral-900 tracking-tighter">0€</span>
          </div>
          <ul className="space-y-5 mb-10">
            <li className="flex items-center gap-4 text-neutral-700 font-medium"><div className="bg-blue-100 p-1 rounded-full"><Check className="w-4 h-4 text-blue-600" /></div> 1 Bump de CV gratuit</li>
            <li className="flex items-center gap-4 text-neutral-700 font-medium"><div className="bg-blue-100 p-1 rounded-full"><Check className="w-4 h-4 text-blue-600" /></div> Éditeur de contenu basique</li>
            <li className="flex items-center gap-4 text-neutral-700 font-medium"><div className="bg-blue-100 p-1 rounded-full"><Check className="w-4 h-4 text-blue-600" /></div> Export PDF standard</li>
          </ul>
          <button 
            onClick={() => alert("Vous êtes déjà sur le plan gratuit ! Allez uploader un CV.")}
            className="w-full py-4 rounded-xl font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Plan Actuel
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-[2.5rem] p-10 relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-800 text-white shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)] transition-all"
        >
          <div className="absolute inset-0 opacity-10 mix-blend-overlay border border-white/10 rounded-[2.5rem]"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-6 py-2 rounded-bl-3xl shadow-lg">LE PLUS CHOISI</div>
          
          <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Premium</h3>
          <p className="text-neutral-400 mb-8 font-medium relative z-10">L'arme absolue pour votre recherche d'emploi.</p>
          <div className="mb-10 relative z-10">
            <span className="text-6xl font-black text-white tracking-tighter">4.99€</span>
            <span className="text-neutral-400 font-medium"> / mois</span>
          </div>
          <ul className="space-y-5 mb-10 relative z-10">
            <li className="flex items-center gap-4 text-neutral-200 font-medium"><div className="bg-blue-500/20 p-1 rounded-full"><Check className="w-4 h-4 text-blue-400" /></div> Bumps de CV illimités</li>
            <li className="flex items-center gap-4 text-neutral-200 font-medium"><div className="bg-blue-500/20 p-1 rounded-full"><Check className="w-4 h-4 text-blue-400" /></div> Accès aux 12 modèles Premium</li>
            <li className="flex items-center gap-4 text-neutral-200 font-medium"><div className="bg-blue-500/20 p-1 rounded-full"><Check className="w-4 h-4 text-blue-400" /></div> Optimisation ATS maximale (IA +)</li>
            <li className="flex items-center gap-4 text-neutral-200 font-medium"><div className="bg-blue-500/20 p-1 rounded-full"><Check className="w-4 h-4 text-blue-400" /></div> Générateur de Lettre de Motivation</li>
          </ul>
          <button 
            onClick={() => alert("L'intégration Stripe arrive très bientôt ! Gardez un oeil sur nos mises à jour.")}
            className="w-full py-4 rounded-xl font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-colors shadow-lg relative z-10"
          >
            Passer Premium
          </button>
        </motion.div>
      </div>
    </main>
  );
}
