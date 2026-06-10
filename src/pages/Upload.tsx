import { useState, useRef } from 'react';
import { UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';

export default function Upload({ setView }: { setView: (v: 'editor') => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setLoading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 200);

    const formData = new FormData();
    formData.append('cv', selectedFile);

    try {
      const res = await fetch('/api/bump-cv', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      clearInterval(interval);
      setProgress(100);
      
      // Store result in local storage to pass to editor
      if (data.data) {
        localStorage.setItem('bumped_cv', JSON.stringify(data.data));
        setTimeout(() => setView('editor'), 1000);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'analyse du CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-neutral-900 mb-4">Uploadez votre CV</h1>
        <p className="text-neutral-500">L'IA de BumpCv va lire votre PDF et l'améliorer instantanément.</p>
      </div>

      {!loading && !file && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-xl aspect-video glass rounded-3xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:bg-white/50 transition-colors"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="text-neutral-900 font-semibold text-lg">Cliquez pour sélectionner un PDF</p>
          <p className="text-neutral-400 text-sm mt-2">ou glissez-déposez le fichier ici</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) handleUpload(e.target.files[0]);
            }}
          />
        </div>
      )}

      {loading && (
        <div className="w-full max-w-xl glass rounded-3xl p-8 flex flex-col items-center text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Analyse IA en cours...</h3>
          <p className="text-neutral-500 mb-6">Nous restructurons vos expériences et optimisons vos mots-clés.</p>
          
          <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {progress === 100 && (
        <div className="w-full max-w-xl glass rounded-3xl p-8 flex flex-col items-center text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-6" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">CV Bumpsé avec succès !</h3>
          <p className="text-neutral-500">Ouverture de l'éditeur dans quelques secondes...</p>
        </div>
      )}
    </main>
  );
}
