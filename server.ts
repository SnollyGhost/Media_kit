import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

console.log("Server starting. SMTP_USER defined:", !!process.env.SMTP_USER);
console.log("SMTP_PASS defined:", !!process.env.SMTP_PASS);

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("WARNING: SMTP credentials missing. Dashboard notifications will fail.");
}

// Email transporter helper
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  const user = (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }
  return { transporter, user, pass };
}

// API route for inquiry notifications
app.post("/api/notify", async (req, res) => {
  try {
    const { name, email, phone, company, package: pkg, message, preferredMethod } = req.body;
    const { transporter, user, pass } = getTransporter();

    console.log(`Processing inquiry from: ${email}`);

    if (!pass) {
      return res.status(500).json({ 
        status: "error", 
        message: "SMTP_PASS is not configured in Vercel Environment Variables.",
        hint: "Go to Vercel Dashboard > Settings > Environment Variables and add SMTP_PASS."
      });
    }

    const mailOptions = {
      from: `"Web Inquiry" <${user}>`,
      to: "nafyaddachasa91@gmail.com",
      subject: `New Mission Brief: ${name} (${pkg})`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #8A2BE2;">New Mission Brief Received</h2>
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Preferred Contact:</strong> ${preferredMethod?.toUpperCase()}</p>
          <p><strong>Entity/Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Project:</strong> ${pkg}</p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Brief Details:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
            ${message ? message.replace(/\n/g, '<br/>') : 'No description provided.'}
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return res.status(200).json({ status: "ok", message: "Notification sent", messageId: info.messageId });

  } catch (error: any) {
    console.error("Route Error:", error);
    return res.status(500).json({ 
      status: "error", 
      message: "Server failed to process notification", 
      error: error.message 
    });
  }
});

// Global Error Handler to prevent HTML error pages on Vercel
app.use((err: any, req: any, res: any, next: any) => {
  console.error("FATAL ERROR:", err);
  res.status(500).json({ 
    status: "error", 
    message: "Internal Server Error", 
    error: err.message 
  });
});

// Health check to verify API routing on Vercel
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    env: {
      smtpUserSet: !!process.env.SMTP_USER,
      smtpPassSet: !!process.env.SMTP_PASS,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only start listening if we are not on Vercel
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

// Start local server if not in a serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}

export default app;
