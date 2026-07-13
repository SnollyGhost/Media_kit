import type { VercelRequest, VercelResponse } from '@vercel/node';
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
      return res.status(200).json({ status: 'error', message: 'GEMINI_API_KEY is not configured in Vercel environment variables.' });
    }

    const systemPrompt = getSystemInstruction(dateStr, currentAge);

    // We prioritize gemini-3.1-flash-lite first for ultra-low-latency and high reliability on Vercel,
    // falling back to gemini-3.5-flash if needed.
    const modelsToTry = ["gemini-3.1-flash-lite", "gemini-3.5-flash"];
    let reply = "";
    let lastError: any = null;

    // Construct the payload content array cleanly
    const contents = [
      ...(messages || []).map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: [{ text: m.content || '' }]
      })),
      { role: "user", parts: [{ text: userMessage || '' }] }
    ];

    const payload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.4
      }
    };

    // Try models with clean AbortController timeouts to avoid hanging sockets on Vercel.
    for (const model of modelsToTry) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout per model

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "aistudio-build"
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Google API responded with ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResult) {
          reply = textResult;
          break; // Success!
        } else {
          throw new Error(`Empty response candidates or invalid structure: ${JSON.stringify(data)}`);
        }
      } catch (err: any) {
        clearTimeout(timeoutId);
        const errName = err.name === 'AbortError' ? 'TimeoutError' : err.name;
        console.warn(`Model ${model} failed or timed out (${errName}):`, err.message);
        lastError = err;
      }
    }

    if (!reply) {
      throw lastError || new Error("All model fallback options failed.");
    }

    return res.status(200).json({ status: 'ok', reply });
  } catch (error: any) {
    console.error('SERVERLESS GEMINI ERROR:', error);
    return res.status(200).json({ status: 'error', message: error.message || 'An unknown error occurred.' });
  }
}

