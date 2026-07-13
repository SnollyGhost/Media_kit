import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { MediaKitPDFDoc } from "./src/components/MediaKitPDFDoc";
import { CVPDFDoc } from "./src/components/CVPDFDoc";
import { GoogleGenAI } from "@google/genai";
import { getSystemInstruction } from "./src/lib/ai-prompt";

// Helper to convert images to Base64 safely
const getBase64Image = (assetRelativePath: string) => {
  try {
    const fullPath = path.join(process.cwd(), assetRelativePath);
    if (fs.existsSync(fullPath)) {
      const bitmap = fs.readFileSync(fullPath);
      const ext = path.extname(fullPath).toLowerCase().substring(1);
      const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
      return `data:${mime};base64,${bitmap.toString('base64')}`;
    }
  } catch (error) {
    console.error(`Error reading ${assetRelativePath}:`, error);
  }
  return undefined;
};

// Try to load .env in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());

// Transporter cache
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  const user = (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

  if (!transporter && pass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }
  return { transporter, user, pass };
}

// Chatbot API Endpoint (Secure server-side proxy)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage, currentAge, dateStr } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ status: "error", message: "GEMINI_API_KEY is not configured in local environment variables." });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // We prioritize gemini-3.1-flash-lite first for ultra-low-latency and high reliability on Vercel
    // falling back to gemini-3.5-flash if needed.
    const modelsToTry = ["gemini-3.1-flash-lite", "gemini-3.5-flash"];
    let response: any = null;
    let lastError: any = null;

    const withTimeout = (promise: Promise<any>, ms: number, errorMessage: string) => {
      let timer: any;
      const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(errorMessage)), ms);
      });
      return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
    };

    // Vercel serverless function execution budget is 10s.
    // Setting a 4.5s timeout per model ensures that if the first model fails or hangs,
    // the second model still has 4.5s to respond before Vercel kills the function.
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
          4500,
          `Request to model ${model} timed out after 4.5 seconds`
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
    return res.json({ status: "ok", reply });
  } catch (error: any) {
    console.error("Gemini API local server error:", error);
    return res.status(200).json({ status: "error", message: error.message });
  }
});

// Health Check (Local/Preview)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: {
      userSet: !!process.env.SMTP_USER,
      passSet: !!process.env.SMTP_PASS,
      isLocal: !process.env.VERCEL
    }
  });
});

// PDF Portfolio Generation
app.get("/api/portfolio.pdf", async (req, res) => {
  try {
    const images = {
      creatorImg: getBase64Image('src/assets/creator.webp'),
      bybit: getBase64Image('src/assets/bybit.webp'),
      ehudAi: getBase64Image('src/assets/EhudAI.webp'),
      huluPay: getBase64Image('src/assets/huluPay.webp'),
      hawi: getBase64Image('src/assets/hawi.webp'),
      auctionEthiopia: getBase64Image('src/assets/auction_ethiopia.svg'),
    };

    const stream = await renderToStream(React.createElement(MediaKitPDFDoc, { images }));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=NafTech_Creator_Portfolio.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Professional CV PDF Generation
app.get("/api/cv.pdf", async (req, res) => {
  try {
    const stream = await renderToStream(React.createElement(CVPDFDoc));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Naftech_Nafyad_Dachasa_CV.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("CV PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Notify endpoint (Local/Preview)
app.post("/api/notify", async (req, res) => {
  try {
    const name = escapeHtml(req.body.name || '');
    const email = escapeHtml(req.body.email || '');
    const phone = escapeHtml(req.body.phone || '');
    const company = escapeHtml(req.body.company || '');
    const pkg = escapeHtml(req.body.package || '');
    const message = escapeHtml(req.body.message || '');
    
    const { transporter, user, pass } = getTransporter();

    if (!pass) {
      return res.status(500).json({ status: "error", message: "SMTP_PASS missing" });
    }

    if (!transporter) {
      return res.status(500).json({ status: "error", message: "Transporter init failed" });
    }

    const mailOptions = {
      from: `"NafTech Local" <${user}>`,
      to: "nafyaddachasa91@gmail.com",
      subject: `⚡️ Local Brief from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPackage: ${pkg}\nMessage: ${message}`,
      html: `<h3>Local Brief</h3><p><strong>From:</strong> ${name} (${email})</p><p><strong>Project:</strong> ${pkg}</p><p><strong>Message:</strong> ${message}</p>`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("Local notify error:", error);
    return res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = 3000;

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Local dev/preview with Vite
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Failed to start Vite middleware:", e);
    }
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

bootstrap();

export default app;
