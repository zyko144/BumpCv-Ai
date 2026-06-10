import { useState, useRef, type DragEvent } from 'react';
import { UploadCloud, CheckCircle2, FileText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Upload({ setView }: { setView: (v: 'editor') => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      alert("Veuillez sélectionner un fichier PDF.");
      return;
    }
    
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
        setTimeout(() => setView('editor'), 1500);
      } else {
        throw new Error(data.error || "Réponse invalide");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'analyse du CV par l'IA.");
      setFile(null);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-neutral-900 mb-4 tracking-tight">Uploadez votre CV</h1>
        <p className="text-lg text-neutral-500 max-w-lg mx-auto">L'intelligence artificielle de BumpCv va lire votre document PDF, extraire vos compétences et restructurer votre parcours en un clin d'œil.</p>
      </div>

      {!loading && !file && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "w-full max-w-2xl aspect-video glass rounded-[3rem] border-[3px] border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-xl",
            isDragging ? "border-blue-500 bg-blue-50/50 scale-[1.02]" : "border-neutral-300 hover:border-blue-400 hover:bg-white/80"
          )}
        >
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300",
            isDragging ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-blue-50 text-blue-600"
          )}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <p className="text-neutral-900 font-bold text-xl mb-2">Cliquez pour sélectionner un PDF</p>
          <p className="text-neutral-500 text-sm">ou glissez-déposez le fichier directement ici</p>
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
        <div className="w-full max-w-2xl glass rounded-[3rem] p-12 flex flex-col items-center text-center shadow-2xl border border-white/60">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <div className="relative bg-white w-20 h-20 rounded-2xl shadow-sm flex items-center justify-center border border-neutral-100">
              <FileText className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>
          </div>
          
          <h3 className="text-2xl font-black text-neutral-900 mb-3">Analyse IA en cours...</h3>
          <p className="text-neutral-500 mb-8 max-w-md">Veuillez patienter pendant que nos algorithmes restructurent vos expériences et optimisent vos mots-clés ATS.</p>
          
          <div className="w-full h-4 bg-neutral-100/80 border border-neutral-200/50 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite_linear]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
            </div>
          </div>
          <span className="text-sm font-bold text-blue-600 mt-4">{progress}%</span>
        </div>
      )}

      {progress === 100 && file && (
        <div className="w-full max-w-2xl glass rounded-[3rem] p-12 flex flex-col items-center text-center shadow-2xl border border-white/60">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-black text-neutral-900 mb-3">CV Analysé avec Succès !</h3>
          <p className="text-neutral-500 font-medium">Ouverture de l'éditeur de conception magique...</p>
        </div>
      )}
    </main>
  );
}
