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

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
    let response: any = null;
    let lastError: any = null;

    const withTimeout = (promise: Promise<any>, ms: number, errorMessage: string) => {
      let timer: any;
      const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(errorMessage)), ms);
      });
      return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
    };

    // Try gemini-3.5-flash first with a 7-second timeout.
    try {
      response = await withTimeout(
        ai.models.generateContent({
          model: "gemini-3.5-flash",
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
        7000,
        "Request to gemini-3.5-flash timed out after 7 seconds"
      );
    } catch (err: any) {
      console.warn("Primary model gemini-3.5-flash failed or timed out, trying low-latency fallback gemini-3.1-flash-lite...", err);
      lastError = err;
      
      // Stage 2: Fallback to the ultra-low-latency gemini-3.1-flash-lite
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
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
        });
      } catch (fallbackErr: any) {
        console.error("Fallback model gemini-3.1-flash-lite also failed:", fallbackErr);
        lastError = fallbackErr;
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
