import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-4">
          Un investissement pour votre carrière.
        </h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Choisissez le plan qui vous correspond. Obtenez plus d'entretiens avec un CV optimisé par l'Intelligence Artificielle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="glass rounded-3xl p-8 border border-neutral-200">
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">Essentiel</h3>
          <p className="text-neutral-500 mb-6">Parfait pour tester la magie de l'IA.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-neutral-900">0€</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-neutral-600"><Check className="w-5 h-5 text-blue-500" /> 1 Bump de CV gratuit</li>
            <li className="flex items-center gap-3 text-neutral-600"><Check className="w-5 h-5 text-blue-500" /> Modèle de base</li>
            <li className="flex items-center gap-3 text-neutral-600"><Check className="w-5 h-5 text-blue-500" /> Export PDF standard</li>
          </ul>
          <button className="w-full py-4 rounded-xl font-semibold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors">
            Commencer gratuitement
          </button>
        </div>

        {/* Premium Plan */}
        <div className="glass-dark rounded-3xl p-8 border border-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAIRE</div>
          <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
          <p className="text-neutral-400 mb-6">Toutes les fonctionnalités débloquées.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-white">4.99€</span>
            <span className="text-neutral-400"> / mois</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-neutral-300"><Check className="w-5 h-5 text-blue-400" /> Bumps de CV illimités</li>
            <li className="flex items-center gap-3 text-neutral-300"><Check className="w-5 h-5 text-blue-400" /> Accès aux 12 modèles Premium</li>
            <li className="flex items-center gap-3 text-neutral-300"><Check className="w-5 h-5 text-blue-400" /> Optimisation ATS maximale</li>
            <li className="flex items-center gap-3 text-neutral-300"><Check className="w-5 h-5 text-blue-400" /> Génération de Lettre de Motivation</li>
            <li className="flex items-center gap-3 text-neutral-300"><Check className="w-5 h-5 text-blue-400" /> Pas de filigrane</li>
          </ul>
          <button className="w-full py-4 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            Passer Premium
          </button>
        </div>
      </div>
    </main>
  );
}
