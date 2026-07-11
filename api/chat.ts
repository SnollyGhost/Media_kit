import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { NAFYAD_INFO, getSystemInstruction } from '../src/lib/ai-prompt';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  try {
    const { messages, userMessage, currentAge, dateStr } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ status: 'error', message: 'GEMINI_API_KEY is not configured in Vercel environment variables.' });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let response: any = null;
    let lastError: any = null;

    const withTimeout = (promise: Promise<any>, ms: number, errorMessage: string) => {
      let timer: any;
      const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(errorMessage)), ms);
      });
      return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
    };

    for (const model of modelsToTry) {
      try {
        response = await withTimeout(
          ai.models.generateContent({
            model,
            contents: [
              ...messages.map((m: any) => ({
                role: m.role,
                parts: [{ text: m.content }],
              })),
              { role: "user", parts: [{ text: userMessage }] },
            ],
            config: {
              systemInstruction: getSystemInstruction(dateStr, currentAge),
              temperature: 0.4,
            },
          }),
          5000,
          `Request to model ${model} timed out after 5 seconds`
        );
        if (response) {
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} failed or timed out, trying next fallback...`, err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("All model fallback options failed.");
    }

    const reply = response.text || "I'm sorry, I couldn't process that. Can you try again?";
    return res.status(200).json({ status: 'ok', reply });
  } catch (error: any) {
    console.error('SERVERLESS GEMINI ERROR:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
