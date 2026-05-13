import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load local env vars if present
try {
  dotenv.config();
} catch (e) {
  console.log("Dotenv skipped");
}

const app = express();
app.use(express.json());

// Debug logs for Vercel deployment verification
console.log("Server Initialization...");
console.log("SMTP_USER:", process.env.SMTP_USER ? "Defined" : "MISSING");
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Defined" : "MISSING");

// Email transporter lazy initializer
let transporterInstance: nodemailer.Transporter | null = null;

function getEmailConfig() {
  const user = (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  
  if (!transporterInstance && pass) {
    transporterInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      pool: true, // Use pooling for better performance in serverless
      maxConnections: 1,
      maxMessages: 5
    });
  }
  return { transporter: transporterInstance, user, pass };
}

// Health Check with details
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      userSet: !!process.env.SMTP_USER,
      passSet: !!process.env.SMTP_PASS,
      isVercel: !!process.env.VERCEL,
      nodeEnv: process.env.NODE_ENV
    },
    path: req.path
  });
});

// Primary Contact Notification API
app.post("/api/notify", async (req, res) => {
  const { name, email, phone, company, package: pkg, message, preferredMethod } = req.body;
  const { transporter, user, pass } = getEmailConfig();

  console.log(`[API] Processing nudge from ${email}`);

  if (!pass) {
    console.error("[CRITICAL] SMTP_PASS missing in environment.");
    return res.status(500).json({
      status: "error",
      message: "Server configuration missing (SMTP_PASS)",
      hint: "Add SMTP_PASS to Vercel Environment Variables. Use a Google App Password."
    });
  }

  if (!transporter) {
    return res.status(500).json({
      status: "error",
      message: "Transporter failed to initialize"
    });
  }

  try {
    const briefText = `NEW BRIEF RECEIVED:
    --------------------
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Method: ${preferredMethod}
    Company: ${company || 'N/A'}
    Project: ${pkg}
    Brief: ${message || 'N/A'}
    --------------------`;

    const htmlContent = `
      <div style="font-family: sans-serif; background: #030303; color: white; padding: 40px; border-radius: 20px;">
        <h2 style="color: #9333ea; font-size: 24px; margin-bottom: 20px;">Mission Brief Received</h2>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <p><strong>Identity:</strong> ${name}</p>
          <p><strong>Official POC:</strong> ${email}</p>
          <p><strong>Signal Number:</strong> ${phone}</p>
          <p><strong>Channel:</strong> ${preferredMethod?.toUpperCase()}</p>
          <p><strong>Project:</strong> ${pkg}</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px;">BRIEF DETAILS:</p>
            <p>${message || 'No description provided.'}</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"NafTech Briefs" <${user}>`,
      to: "nafyaddachasa91@gmail.com",
      replyTo: email,
      subject: `⚡️ [NEW BRIEF] ${name} - ${pkg}`,
      text: briefText,
      html: htmlContent
    });

    console.log(`[SUCCESS] Email sent for ${email}`);
    return res.status(200).json({ status: "ok", message: "Inquiry transmitted" });

  } catch (error: any) {
    console.error("[MAIL ERROR]", error);
    return res.status(500).json({ 
      status: "error", 
      message: "SMTP carrier rejected transmission", 
      error: error.message 
    });
  }
});

// Final Error Boundary
app.use((err: any, req: any, res: any, next: any) => {
  console.error("[EXPRESS ERROR]", err);
  res.status(500).json({ 
    status: "error", 
    message: "Internal runtime failure", 
    details: err.message 
  });
});

// Server boot logic
async function bootstrap() {
  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd && !isVercel) {
    // Development mode with Vite
    console.log("Detected local environment. Booting Vite...");
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Vite failed to load:", e);
    }
  } else if (!isVercel) {
    // Standalone production build (not Vercel)
    console.log("Detected standalone production mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to port if not on Vercel
  if (!isVercel) {
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Production server operational on port ${PORT}`);
    });
  }
}

// Start only if not imported as a module (avoids conflicts on some platforms)
if (!process.env.VERCEL) {
  bootstrap();
}

export default app;
