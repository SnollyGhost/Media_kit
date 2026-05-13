import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, userMessage, systemContext } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'AI_CONFIG_MISSING', message: 'GEMINI_API_KEY is not set on the server.' });
  }

  try {
    const genAI = new GoogleGenAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Use a stable model name
    });

    const result = await model.generateContent({
      contents: [
        ...messages.map((m: any) => ({ 
          role: m.role, 
          parts: [{ text: m.content }] 
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 500,
      },
      systemInstruction: systemContext
    });

    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'AI_ERROR', message: error.message });
  }
}
