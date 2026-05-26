import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { MediaKitPDFDoc } from "./src/components/MediaKitPDFDoc";
import { FurniturePDFDoc } from "./src/components/FurniturePDFDoc";
import { ShineVisionPDFDoc } from "./src/components/ShineVisionPDFDoc";
import { Packer } from "docx";
import { createShineVisionDocx } from "./src/components/ShineVisionDocxDoc";

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
    const stream = await renderToStream(React.createElement(MediaKitPDFDoc));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=NafTech_Portfolio.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Furniture PDF Generation
app.get("/api/furniture-mediakit.pdf", async (req, res) => {
  try {
    const stream = await renderToStream(React.createElement(FurniturePDFDoc));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=NafTech_Furniture_MediaKit.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("Furniture PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Shine Vision Strategy PDF Generation
app.get("/api/shine-vision-strategy.pdf", async (req, res) => {
  try {
    const stream = await renderToStream(React.createElement(ShineVisionPDFDoc));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Shine_Vision_Center_Content_Strategy.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("Shine Vision PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Shine Vision Strategy DOCX Generation
app.get("/api/shine-vision-strategy.docx", async (req, res) => {
  try {
    const doc = createShineVisionDocx();
    const buffer = await Packer.toBuffer(doc);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=Shine_Vision_Center_Content_Strategy.docx');
    
    res.send(buffer);
  } catch (error: any) {
    console.error("Shine Vision DOCX Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Notify endpoint (Local/Preview)
app.post("/api/notify", async (req, res) => {
  try {
    const { name, email, phone, company, package: pkg, message, preferredMethod } = req.body;
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
