/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const DEFAULT_PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

// Initialize server-side Gemini client lazily/safely
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Falling back to default exhibition layouts.");
      throw new Error("GEMINI_API_KEY is not set.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. API: Generate exhibition space layout for Thareah's portfolio
app.post('/api/gemini/generate-layout', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const ai = getGeminiClient();
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are a Japanese exhibition design director for Pearl Idea Co., Ltd. 
Develop an exquisite, high-end museum or retail display window exhibition layout corresponding to the prompt: "${prompt}".
Connect this prompt conceptually to digital structures, AI, and architectural beauty. 
Position items gracefully on a 2D floor grid (X from 10 to 90, Y from 10 to 90) representing a boutique designer showcase.
Return the layout detailing the lighting mood, color palette, elements, and curation notes.`,
      config: {
        systemInstruction: "You are an elite, minimal-aesthetic spatial designer and visual merchandiser. Design pristine galleries with architectural composition, focusing on the synergy between physical art, digital science, and precise layout structures.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['theme', 'inspiration', 'lightingMood', 'colorScheme', 'elements', 'curatorsNotes'],
          properties: {
            theme: {
              type: Type.STRING,
              description: 'The title/theme of the display gallery.'
            },
            inspiration: {
              type: Type.STRING,
              description: 'Brief design concept inspired by the prompt.'
            },
            lightingMood: {
              type: Type.STRING,
              description: 'Exquisite explanation of the lighting setup (e.g. Warm amber downlights, cyber-blue neon accents).'
            },
            colorScheme: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 to 5 sophisticated hex codes or high-contrast color names.'
            },
            elements: {
              type: Type.ARRAY,
              description: 'List of elements arranged strategically in the exhibition window space.',
              items: {
                type: Type.OBJECT,
                required: ['id', 'name', 'type', 'x', 'y', 'color', 'size', 'description'],
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: 'Elegant item name like Glass Pedestal with Ancient Scroll, Holographic Terminal.' },
                  type: {
                    type: Type.STRING,
                    enum: ['pedestal', 'lighting', 'sculpture', 'text-panel', 'mannequin', 'screen', 'prop']
                  },
                  x: { type: Type.INTEGER, description: 'Strategic horizontal placement from 10 to 90.' },
                  y: { type: Type.INTEGER, description: 'Strategic vertical depth placement from 10 to 90.' },
                  color: { type: Type.STRING, description: 'Aesthetic color representation' },
                  size: {
                    type: Type.STRING,
                    enum: ['small', 'medium', 'large']
                  },
                  description: { type: Type.STRING, description: 'How this item fits into the narrative.' }
                }
              }
            },
            curatorsNotes: {
              type: Type.STRING,
              description: 'Direct commentary from the spatial visual director.'
            }
          }
        }
      }
    });

    const resultText = response.text?.trim() || '{}';
    const parsedResult = JSON.parse(resultText);
    return res.json(parsedResult);

  } catch (error: any) {
    console.error("Layout generation failed:", error);
    
    // Fallback: Provide a stunning mock layout if API key is missing or call fails
    const fallbackLayouts: Record<string, any> = {
      default: {
        theme: "Synaptic Canopy EXHIBIT",
        inspiration: `An architectural display capturing elegant networks of thought, modeled after simple forest structures. Designed as a luxury window in Ginza.`,
        lightingMood: "Soft vertical spots casting elongated linear shadows across concrete slabs.",
        colorScheme: ["#171717", "#E0F2FE", "#F4F4F5", "#F59E0B"],
        elements: [
          {
            id: "el1",
            name: "Brutalist Stone Pedestal",
            type: "pedestal",
            x: 25,
            y: 35,
            color: "Raw slate grey",
            size: "large",
            description: "Supports a micro-projection of mathematical clusters showing diabetes risk vectors."
          },
          {
            id: "el2",
            name: "Holographic Neural Column",
            type: "screen",
            x: 50,
            y: 20,
            color: "Prismatic teal glow",
            size: "medium",
            description: "A narrow vertical screen simulating live OCR glyph segmentation."
          },
          {
            id: "el3",
            name: "Mannequin in Origami Robes",
            type: "mannequin",
            x: 75,
            y: 40,
            color: "Unbleached parchment white",
            size: "large",
            description: "Draped in custom structured grid pleated fabric, symbolizing data structures that shelter human identity."
          },
          {
            id: "el4",
            name: "Minimal Linear Spotlight",
            type: "lighting",
            x: 50,
            y: 80,
            color: "Warm amber glow",
            size: "small",
            description: "Concealed bottom spotlight that defines the raw geometric silhouettes."
          }
        ],
        curatorsNotes: "The balance between brutalist physical material and fluid light projections mirrors the beautiful integration of hardware and deep artificial algorithms."
      }
    };

    return res.json(fallbackLayouts.default);
  }
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const startListening = (port: number): Promise<number> => new Promise((resolve, reject) => {
    const server = app.listen(port, '0.0.0.0', () => {
      resolve(port);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        resolve(startListening(port + 1));
        return;
      }

      reject(error);
    });
  });

  const port = await startListening(DEFAULT_PORT);
  console.log(`Server running at http://0.0.0.0:${port}`);
}

startServer();
