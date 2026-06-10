import { useState, useEffect } from 'react';
import { Download, Edit3, Loader2, Sparkles, Plus, Trash2, FileText } from 'lucide-react';

export default function Editor() {
  const [data, setData] = useState<any>({
    personalInfo: { name: "Jean Dupont", title: "Développeur Full Stack", email: "jean@email.com", location: "Paris", phone: "" },
    summary: "Développeur passionné avec 5 ans d'expérience.",
    experiences: [
      { company: "TechCorp", position: "Dev React", startDate: "2020", endDate: "2023", description: ["Création d'apps", "Optimisation"] }
    ],
    education: [
      { school: "Université de Paris", degree: "Master en Informatique", year: "2020" }
    ],
    skills: ["React", "Node", "TypeScript"]
  });

  const [enhancing, setEnhancing] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bumped_cv');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with default to prevent undefined fields
        setData({
          personalInfo: parsed.personalInfo || data.personalInfo,
          summary: parsed.summary || "",
          experiences: parsed.experiences || [],
          education: parsed.education || [],
          skills: parsed.skills || []
        });
      }
    } catch(e) {
      console.error(e);
    }
  }, []);

  const handleEnhance = async (text: string, type: string, index?: number) => {
    setEnhancing(true);
    try {
      const res = await fetch('/api/enhance-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type })
      });
      const result = await res.json();
      
      const newData = { ...data };
      if (type === 'summary') {
        newData.summary = result.enhanced;
      } else if (type === 'experience' && index !== undefined) {
        newData.experiences[index].description = result.bullets || [result.enhanced];
      }
      setData(newData);
    } catch(err) {
      alert("Erreur IA");
    }
    setEnhancing(false);
  };

  const handleGenerateCoverLetter = async () => {
    setEnhancing(true);
    try {
      const res = await fetch('/api/enhance-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: JSON.stringify(data), type: 'cover-letter' })
      });
      const result = await res.json();
      setCoverLetter(result.enhanced);
    } catch(err) {
      alert("Erreur IA");
    }
    setEnhancing(false);
  };

  const addExperience = () => {
    setData({
      ...data, 
      experiences: [...(data.experiences || []), { company: "", position: "", startDate: "", endDate: "", description: [] }]
    });
  };

  const removeExperience = (index: number) => {
    const newExp = [...data.experiences];
    newExp.splice(index, 1);
    setData({...data, experiences: newExp});
  };

  const printPdf = () => {
    window.print();
  };

  return (
    <div className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 print-container">
      
      {/* LEFT: Editor Panel (Hidden when printing) */}
      <div className="glass rounded-3xl p-6 h-[80vh] overflow-y-auto custom-scrollbar no-print">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-blue-600" /> Éditeur de Contenu
        </h2>
        
        {/* Personal Info */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-neutral-700 border-b pb-2">Informations Personnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <input 
              value={data.personalInfo?.name || ''} 
              onChange={e => setData({...data, personalInfo: {...data.personalInfo, name: e.target.value}})}
              className="w-full bg-white/50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Nom"
            />
            <input 
              value={data.personalInfo?.title || ''} 
              onChange={e => setData({...data, personalInfo: {...data.personalInfo, title: e.target.value}})}
              className="w-full bg-white/50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Titre professionnel"
            />
            <input 
              value={data.personalInfo?.email || ''} 
              onChange={e => setData({...data, personalInfo: {...data.personalInfo, email: e.target.value}})}
              className="w-full bg-white/50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Email"
            />
            <input 
              value={data.personalInfo?.location || ''} 
              onChange={e => setData({...data, personalInfo: {...data.personalInfo, location: e.target.value}})}
              className="w-full bg-white/50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Ville"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4 mb-8 relative">
          <h3 className="text-lg font-semibold text-neutral-700 border-b pb-2">Accroche (Summary)</h3>
          <textarea 
            value={data.summary || ''} 
            onChange={e => setData({...data, summary: e.target.value})}
            className="w-full bg-white/50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]" 
          />
          <button 
            onClick={() => handleEnhance(data.summary, 'summary')}
            disabled={enhancing}
            className="absolute top-0 right-0 mt-1 flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100"
          >
            {enhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            Améliorer via IA
          </button>
        </div>

        {/* Experiences */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-neutral-700 border-b pb-2">Expériences</h3>
          {data.experiences?.map((exp: any, i: number) => (
            <div key={i} className="bg-neutral-50/50 p-4 rounded-xl border border-neutral-200 relative group">
              <button 
                onClick={() => removeExperience(i)}
                className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <input value={exp.position || ''} onChange={e => {
                const arr = [...data.experiences]; arr[i].position = e.target.value; setData({...data, experiences: arr});
              }} className="font-bold text-neutral-900 bg-transparent outline-none w-full mb-1" placeholder="Poste" />
              <input value={exp.company || ''} onChange={e => {
                const arr = [...data.experiences]; arr[i].company = e.target.value; setData({...data, experiences: arr});
              }} className="text-sm text-neutral-500 bg-transparent outline-none w-full mb-3" placeholder="Entreprise" />
              
              <div className="flex gap-2 mb-2">
                 <input value={exp.startDate || ''} onChange={e => {
                  const arr = [...data.experiences]; arr[i].startDate = e.target.value; setData({...data, experiences: arr});
                }} className="text-xs text-neutral-400 bg-transparent outline-none w-1/2" placeholder="Date de début" />
                 <input value={exp.endDate || ''} onChange={e => {
                  const arr = [...data.experiences]; arr[i].endDate = e.target.value; setData({...data, experiences: arr});
                }} className="text-xs text-neutral-400 bg-transparent outline-none w-1/2" placeholder="Date de fin" />
              </div>

              <textarea 
                value={(exp.description || []).join('\n')}
                onChange={e => {
                  const arr = [...data.experiences]; arr[i].description = e.target.value.split('\n'); setData({...data, experiences: arr});
                }}
                className="w-full bg-white/80 border border-neutral-200 rounded-lg p-2 text-sm min-h-[80px]"
                placeholder="Description de l'expérience..."
              />
              
              <button 
                onClick={() => handleEnhance(exp.description.join(' '), 'experience', i)}
                className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <Sparkles className="w-3 h-3" /> Optimiser ATS
              </button>
            </div>
          ))}
          <button onClick={addExperience} className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:underline bg-blue-50 px-4 py-2 rounded-lg">
            <Plus className="w-4 h-4" /> Ajouter une expérience
          </button>
        </div>

        {/* Cover Letter Generator */}
        <div className="space-y-4 mt-12 pt-6 border-t border-neutral-200">
           <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
             <FileText className="w-5 h-5 text-emerald-600" /> Lettre de Motivation Premium
           </h3>
           <p className="text-sm text-neutral-500">L'IA va rédiger une lettre sur-mesure basée sur les données actuelles de ce CV.</p>
           <button 
             onClick={handleGenerateCoverLetter}
             disabled={enhancing}
             className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
           >
             {enhancing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
             Générer ma lettre
           </button>
        </div>

      </div>

      {/* RIGHT: Live Preview (A4 Paper) */}
      <div className="bg-neutral-200/50 rounded-3xl p-6 h-[80vh] flex flex-col items-center justify-start overflow-y-auto custom-scrollbar border border-neutral-200 no-print preview-container">
        <div className="w-full flex justify-between items-center mb-4 no-print">
          <span className="text-sm font-semibold text-neutral-500">Aperçu en direct</span>
          <button onClick={printPdf} className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-800 shadow-xl">
            <Download className="w-4 h-4" /> Exporter PDF
          </button>
        </div>
        
        {/* CV Paper */}
        <div id="cv-paper" className="w-[210mm] min-h-[297mm] bg-white shadow-xl shrink-0 p-12 text-left print-element">
          <h1 className="text-4xl font-light text-neutral-900 mb-1 tracking-tight">{data.personalInfo?.name}</h1>
          <h2 className="text-xl font-medium text-blue-600 mb-4">{data.personalInfo?.title}</h2>
          <div className="flex gap-4 text-xs text-neutral-500 mb-8 pb-4 border-b">
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.email && data.personalInfo?.location && <span>•</span>}
            {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo?.phone && <span>•</span>}
            {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          </div>

          {data.summary && <p className="text-sm text-neutral-700 leading-relaxed mb-8">{data.summary}</p>}

          {data.experiences && data.experiences.length > 0 && (
            <>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-4">Expérience Professionnelle</h3>
              <div className="space-y-6">
                {data.experiences.map((exp: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-semibold text-neutral-900">{exp.position} — <span className="font-normal text-neutral-600">{exp.company}</span></h4>
                      <span className="text-xs text-neutral-400">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 space-y-1">
                      {(exp.description || []).map((desc: string, j: number) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {data.education && data.education.length > 0 && (
            <>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mt-8 mb-4">Formation</h3>
              <div className="space-y-4">
                {data.education.map((edu: any, i: number) => (
                  <div key={i} className="flex justify-between items-baseline">
                    <h4 className="font-semibold text-neutral-900">{edu.degree} <span className="font-normal text-neutral-600">— {edu.school}</span></h4>
                    <span className="text-xs text-neutral-400">{edu.year}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {data.skills && data.skills.length > 0 && (
            <>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mt-8 mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, i: number) => (
                  <span key={i} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium border border-neutral-200">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Cover Letter Modal Overlay */}
      {coverLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-6 no-print">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Lettre de Motivation Générée</h2>
            <div className="whitespace-pre-wrap text-neutral-700 text-sm leading-relaxed mb-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              {coverLetter}
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setCoverLetter(null)} className="px-6 py-2 rounded-lg font-semibold text-neutral-500 hover:bg-neutral-100">Fermer</button>
              <button onClick={() => {
                 navigator.clipboard.writeText(coverLetter);
                 alert("Copié dans le presse-papier !");
              }} className="px-6 py-2 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700">Copier le texte</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
