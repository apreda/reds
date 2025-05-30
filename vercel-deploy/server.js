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

// Initialize OpenAI SDK with API key
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  // No baseURL specified to use default OpenAI endpoint
});

// Rewrite API endpoint
app.post('/rewrite', async (req, res) => {
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
      model: 'gpt-3.5-turbo',  // Using OpenAI's fastest model for quick responses
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    res.status(200).json({ email: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling Deepseek API:', error);
    res.status(500).json({ error: 'Failed to process rant' });
  }
});

// Send email API endpoint
app.post('/send', async (req, res) => {
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
      from: `"${senderName} via Dear Castellini" <${process.env.EMAIL_USER}>`,
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

// Helper function to format targets for prompt
const formatTargets = (targets) => {
  if (!targets || targets.length === 0) return 'Not specified';
  if (targets.length === 1) return targets[0];
  if (targets.length === 2) return `${targets[0]} and ${targets[1]}`;
  
  const lastTarget = targets[targets.length - 1];
  const otherTargets = targets.slice(0, -1).join(', ');
  return `${otherTargets}, and ${lastTarget}`;
};

// Handle structured form submissions
app.post('/rewrite-structured', async (req, res) => {
  const { formData } = req.body;

  if (!formData || !formData.mainComplaint) {
    return res.status(400).json({ error: 'Main complaint is required' });
  }

  try {
    const formattedTargets = formatTargets(formData.complaintTarget);
    
    const prompt = `
    You're a passionate Cincinnati Reds fan who wants to write a respectful but firm letter 
    to the ownership/management of the team. Create a professional email from the following structured input:
    
    Main Complaint: ${formData.mainComplaint}
    Offensive Complaint: ${formData.offensiveComplaint || 'Not provided'}
    Defensive Complaint: ${formData.defensiveComplaint || 'Not provided'}
    Why Frustration Occurred: ${formData.frustrationReason || 'Not provided'}
    Directed Towards: ${formattedTargets}
    ${formData.signature ? `Signature: ${formData.signature}` : ''}
    Anonymous: ${formData.anonymous ? 'Yes' : 'No'}
    
    Instructions:
    - Maintain a respectful but firm tone
    - Be specific about the issues mentioned
    - Focus primarily on the main complaint
    - Include specific details from other fields where relevant
    - Format as a professional email
    - If the user provided a signature and isn't anonymous, include it at the end
    - If the user chose to remain anonymous, don't include identifying information
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Using OpenAI's fastest model for quick responses
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    res.status(200).json({ email: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error processing structured form:', error);
    res.status(500).json({ error: 'Failed to process structured form' });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
