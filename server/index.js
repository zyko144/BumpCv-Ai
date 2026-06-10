import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { db, dbGet, dbRun, dbAll } from './db.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Load .env
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const upload = multer({ storage: multer.memoryStorage() });

// Gemini init
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper to extract JSON from Gemini markdown
const extractJson = (text) => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  try {
    return match ? JSON.parse(match[1]) : JSON.parse(text);
  } catch {
    return { error: "Failed to parse AI response" };
  }
};

// ─── ROUTES ─────────────────────────────────────────────────────────────────

// 1. Upload & Bump CV (PDF to Enhanced JSON)
app.post('/api/bump-cv', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Fichier PDF requis.' });

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const rawText = pdfData.text;

    // Call Gemini to enhance the CV
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
Tu es un recruteur expert et un rédacteur de CV de haut niveau.
Voici le texte brut extrait d'un ancien CV :
${rawText}

Ta mission est d'améliorer, de corriger, et de rendre ce CV extrêmement professionnel et optimisé pour les logiciels ATS.
Réponds UNIQUEMENT avec un JSON valide respectant cette structure exacte :
{
  "personalInfo": { "name": "...", "email": "...", "phone": "...", "location": "...", "title": "Titre du poste optimisé" },
  "summary": "Une phrase d'accroche professionnelle et percutante de 3-4 lignes.",
  "experiences": [
    {
      "company": "...", "position": "...", "startDate": "...", "endDate": "...",
      "description": ["Action 1 (optimisée avec des verbes d'action)", "Action 2...", "Action 3..."]
    }
  ],
  "education": [ { "school": "...", "degree": "...", "year": "..." } ],
  "skills": ["Compétence 1", "Compétence 2"]
}
    `;

    const result = await model.generateContent(prompt);
    const enhancedData = extractJson(result.response.text());

    res.json({ success: true, data: enhancedData });
  } catch (error) {
    console.error('Erreur Bump:', error);
    res.status(500).json({ error: 'Erreur lors de l\'amélioration du CV.' });
  }
});

// 2. Enhance specific text (Job Description, etc)
app.post('/api/enhance-text', async (req, res) => {
  const { text, type } = req.body;
  if (!text) return res.status(400).json({ error: 'Texte requis' });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    let prompt = `Améliore ce texte de CV pour qu'il soit plus professionnel, percutant et orienté résultats. Texte d'origine : "${text}"`;
    if (type === 'experience') {
      prompt = `Transforme cette description d'expérience en une liste à puces professionnelle de 3 lignes, utilisant des verbes d'action forts. Texte brut: "${text}". Renvoie JUSTE un JSON : { "bullets": ["...", "...", "..."] }`;
    }

    const result = await model.generateContent(prompt);
    
    if (type === 'experience') {
      res.json(extractJson(result.response.text()));
    } else {
      res.json({ enhanced: result.response.text().trim() });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur IA' });
  }
});

// 3. Mock Authentication (for demo)
app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;
  let user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    const id = Date.now().toString();
    await dbRun('INSERT INTO users (id, name, email, plan, bump_credits) VALUES (?, ?, ?, ?, ?)', [id, email.split('@')[0], email, 'free', 1]);
    user = await dbGet('SELECT * FROM users WHERE id = ?', [id]);
  }
  res.json({ user });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`BumpCv Backend running on http://localhost:${PORT}`);
});
