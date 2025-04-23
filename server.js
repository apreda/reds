// server.js - Express server to handle API requests
import express from 'express';
import { OpenAI } from 'openai';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI SDK with the Deepseek API key and base URL
const openai = new OpenAI({ 
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'  // Deepseek API endpoint
});

// Rewrite API endpoint - support both /rewrite and /api/rewrite paths
app.post(['/rewrite', '/api/rewrite'], async (req, res) => {
  const { rant } = req.body;

  if (!rant) {
    return res.status(400).json({ error: 'Rant content is required' });
  }

  try {
    const prompt = `
    You're a passionate Reds fan who also happens to write really good, thoughtful emails. 
    Take this raw rant and turn it into a well-crafted but emotionally honest letter 
    to the owner of the Cincinnati Reds. Keep the tone respectful but firm.
    
    Rant:
    ${rant}
    
    Email:
    `;

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8
    });

    res.status(200).json({ email: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling Deepseek API:', error);
    res.status(500).json({ error: 'Failed to process rant' });
  }
});

// Send email API endpoint - support both /send and /api/send paths
app.post(['/send', '/api/send'], async (req, res) => {
  const { emailText, senderName, senderEmail } = req.body;

  if (!emailText || !senderName || !senderEmail) {
    return res.status(400).json({ error: 'Email text, sender name, and sender email are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: `"${senderName} via Dear Castelli" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'owner@reds.com',
      subject: 'A Message From a Passionate Reds Fan',
      text: emailText,
      replyTo: senderEmail
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
