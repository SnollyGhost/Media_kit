import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// Try to load .env only in local dev
if (!process.env.VERCEL) {
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

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    env: {
      userSet: !!process.env.SMTP_USER,
      passSet: !!process.env.SMTP_PASS,
      isProd: process.env.NODE_ENV === "production"
    }
  });
});

// Notify endpoint
app.post("/api/notify", async (req, res) => {
  try {
    const { name, email, phone, company, package: pkg, message, preferredMethod } = req.body;
    const { transporter, user, pass } = getTransporter();

    if (!pass) {
      return res.status(500).json({ 
        status: "error", 
        message: "SMTP_PASS not found in environment." 
      });
    }

    if (!transporter) {
      return res.status(500).json({ status: "error", message: "Failed to create mail transporter" });
    }

    const mailOptions = {
      from: `"NafTech" <${user}>`,
      to: "nafyaddachasa91@gmail.com",
      subject: `⚡️ Brief from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPackage: ${pkg}\nMessage: ${message}`,
      html: `<h3>New Brief</h3><p><strong>From:</strong> ${name} (${email})</p><p><strong>Project:</strong> ${pkg}</p><p><strong>Message:</strong> ${message}</p>`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "ok" });
  } catch (error: any) {
    return res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = 3000;

async function bootstrap() {
  if (!process.env.VERCEL) {
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
}

bootstrap();

export default app;
