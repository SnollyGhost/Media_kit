import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

console.log("Server starting. SMTP_USER defined:", !!process.env.SMTP_USER);
console.log("SMTP_PASS defined:", !!process.env.SMTP_PASS);

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("WARNING: SMTP credentials missing. Dashboard notifications will fail.");
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim(),
    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
  },
});

// API route for inquiry notifications
app.post("/api/notify", async (req, res) => {
  const { name, email, phone, company, package: pkg, message, preferredMethod } = req.body;

  console.log(`Processing inquiry from: ${email}`);

  // Validate environment on the fly for better debugging
  const user = (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

  if (!pass) {
    console.error("Configuration Error: SMTP_PASS environment variable is missing.");
    return res.status(500).json({ 
      status: "error", 
      message: "Server configuration missing (SMTP_PASS)",
      hint: "Go to Project Settings > Secrets and add 'SMTP_PASS' with your Google App Password (16 characters)."
    });
  }

  const mailOptions = {
    from: `"Web Inquiry" <${user}>`,
    to: "nafyaddachasa91@gmail.com",
    subject: `New Mission Brief: ${name} (${pkg})`,
    text: `
      --- NEW INQUIRY RECEIVED ---
      
      Client Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Contact Method: ${preferredMethod}
      Entity/Company: ${company || 'N/A'}
      Selected Project: ${pkg}
      
      Brief Message:
      ${message || 'No description provided.'}
      
      --------------------------
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #8A2BE2;">New Mission Brief Received</h2>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Contact:</strong> ${preferredMethod.toUpperCase()}</p>
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

  try {
    // Re-verify transporter to handle potential timeout issues in serverless
    await transporter.verify();
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    res.status(200).json({ status: "ok", message: "Notification sent", messageId: info.messageId });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to send notification", 
      error: error.message,
      // Provide hint for Gmail users
      hint: error.message.includes('Username and Password not accepted') 
        ? "Ensure you are using a Gmail 'App Password', not your regular login password. Also verify 'Less Secure Apps' settings if applicable." 
        : "Check Vercel environment variables and SMTP port/service settings."
    });
  }
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export default app;
